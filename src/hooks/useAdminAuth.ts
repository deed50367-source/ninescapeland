import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const adminCacheRef = useRef<{ userId: string; isAdmin: boolean } | null>(null);
  const activeUserIdRef = useRef<string | null>(null);
  const initResolvedRef = useRef(false);

  const checkAdminRole = useCallback(async (userId: string): Promise<boolean> => {
    console.log('[useAdminAuth] Checking admin role for user:', userId);
    if (adminCacheRef.current?.userId === userId) {
      console.log('[useAdminAuth] Using cached role:', adminCacheRef.current.isAdmin);
      return adminCacheRef.current.isAdmin;
    }

    try {
      // Use the security definer function instead of querying user_roles directly
      // This avoids RLS issues on the first login
      console.log('[useAdminAuth] Calling has_role RPC for admin check');
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: userId,
        _role: 'admin'
      });

      console.log('[useAdminAuth] has_role admin result:', { data, error });

      if (error) {
        console.error("[useAdminAuth] has_role check error:", error);
        // Fallback: also check for staff role
        console.log('[useAdminAuth] Trying staff role fallback');
        const { data: staffData, error: staffError } = await supabase.rpc('has_role', {
          _user_id: userId,
          _role: 'staff'
        });
        
        console.log('[useAdminAuth] has_role staff result:', { data: staffData, error: staffError });
        
        if (staffError) {
          console.error("[useAdminAuth] has_role staff check error:", staffError);
          return false;
        }
        
        const hasStaffRole = staffData === true;
        adminCacheRef.current = { userId, isAdmin: hasStaffRole };
        return hasStaffRole;
      }

      const hasAdminRole = data === true;
      
      // If not admin, check for staff role
      if (!hasAdminRole) {
        console.log('[useAdminAuth] Not admin, checking staff role');
        const { data: staffData } = await supabase.rpc('has_role', {
          _user_id: userId,
          _role: 'staff'
        });
        console.log('[useAdminAuth] has_role staff result:', staffData);
        const hasStaffRole = staffData === true;
        adminCacheRef.current = { userId, isAdmin: hasStaffRole };
        console.log('[useAdminAuth] Final result (staff):', hasStaffRole);
        return hasStaffRole;
      }
      
      adminCacheRef.current = { userId, isAdmin: hasAdminRole };
      console.log('[useAdminAuth] Final result (admin):', hasAdminRole);
      return hasAdminRole;
    } catch (err) {
      console.error("[useAdminAuth] unexpected error", err);
      return false;
    }
  }, []);

  const applySession = useCallback(
    async (session: Session | null, isInitialLoad = false) => {
      console.log('[useAdminAuth] applySession called:', { 
        hasSession: !!session, 
        userId: session?.user?.id, 
        isInitialLoad 
      });
      
      const nextUser = session?.user ?? null;

      if (!nextUser) {
        console.log('[useAdminAuth] No user, clearing state');
        activeUserIdRef.current = null;
        adminCacheRef.current = null;
        setUser(null);
        setIsAdmin(false);
        if (isInitialLoad) setIsLoading(false);
        return;
      }

      // Only show loading spinner on initial load, not on token refresh
      activeUserIdRef.current = nextUser.id;
      setUser(nextUser);
      console.log('[useAdminAuth] Set user:', nextUser.email);
      if (isInitialLoad) setIsLoading(true);

      console.log('[useAdminAuth] Checking admin role...');
      const hasAdminRole = await checkAdminRole(nextUser.id);

      // If auth changed while the role check was in-flight, ignore this result.
      console.log('[useAdminAuth] Role check result:', hasAdminRole, 'activeUserId:', activeUserIdRef.current);
      if (activeUserIdRef.current !== nextUser.id) return;

      setIsAdmin(hasAdminRole);
      console.log('[useAdminAuth] Set isAdmin:', hasAdminRole);
      if (isInitialLoad) setIsLoading(false);
      console.log('[useAdminAuth] Set isLoading: false');
    },
    [checkAdminRole]
  );

  useEffect(() => {
    let cancelled = false;

    const safeApply = async (session: Session | null, isInitial = false) => {
      try {
        console.log('[useAdminAuth] safeApply:', { hasSession: !!session, isInitial });
        if (cancelled) return;
        await applySession(session, isInitial);
      } catch (err) {
        console.error("[useAdminAuth] apply session error", err);
        if (!cancelled) {
          activeUserIdRef.current = null;
          adminCacheRef.current = null;
          setUser(null);
          setIsAdmin(false);
          setIsLoading(false);
        }
      } finally {
        if (isInitial) initResolvedRef.current = true;
      }
    };

    // Timeout fallback: if auth doesn't resolve within 5 seconds, stop loading
    const timeoutId = setTimeout(() => {
      if (!initResolvedRef.current && !cancelled) {
        console.warn("[useAdminAuth] Auth initialization timed out, falling back");
        initResolvedRef.current = true;
        setIsLoading(false);
      }
    }, 5000);

    // 1) Subscribe FIRST (prevents missing the initial session event)
    console.log('[useAdminAuth] Setting up auth state listener');
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[useAdminAuth] Auth state change event:', event, 'hasSession:', !!session);
      // Never show the blocking spinner for background token refresh.
      if (event === "TOKEN_REFRESHED") return;

      // If we haven't resolved initial auth state yet, treat *the first* auth event
      // (SIGNED_IN / SIGNED_OUT / USER_UPDATED / INITIAL_SESSION) as an initial load.
      const isInitial = !initResolvedRef.current;

      // After we have a stable initial state, ignore redundant INITIAL_SESSION events.
      if (!isInitial && event === "INITIAL_SESSION") return;

      void safeApply(session, isInitial);
    });

    // 2) Also reconcile from stored session (covers cases where INITIAL_SESSION doesn't fire)
    console.log('[useAdminAuth] Getting initial session');
    supabase.auth
      .getSession()
      .then(({ data }) => {
        console.log('[useAdminAuth] Got session:', !!data.session);
        if (!initResolvedRef.current) {
          safeApply(data.session, true);
        }
      })
      .catch((err) => {
        console.error("[useAdminAuth] getSession error", err);
        if (!cancelled) setIsLoading(false);
        initResolvedRef.current = true;
      });

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, [applySession]);

  const signOut = useCallback(async () => {
    adminCacheRef.current = null;
    activeUserIdRef.current = null;
    await supabase.auth.signOut();
  }, []);

  return { user, isAdmin, isLoading, signOut };
};

