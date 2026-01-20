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
    if (adminCacheRef.current?.userId === userId) {
      return adminCacheRef.current.isAdmin;
    }

    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .in("role", ["admin", "staff"]);

      if (error) {
        console.error("[useAdminAuth] role check error:", error);
        return false;
      }

      const hasRole = !!(data && data.length > 0);
      adminCacheRef.current = { userId, isAdmin: hasRole };
      return hasRole;
    } catch (err) {
      console.error("[useAdminAuth] unexpected error", err);
      return false;
    }
  }, []);

  const applySession = useCallback(
    async (session: Session | null) => {
      const nextUser = session?.user ?? null;

      if (!nextUser) {
        activeUserIdRef.current = null;
        adminCacheRef.current = null;
        setUser(null);
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      // Keep UI in "verifying" until role check completes.
      activeUserIdRef.current = nextUser.id;
      setUser(nextUser);
      setIsLoading(true);

      const hasAdminRole = await checkAdminRole(nextUser.id);

      // If auth changed while the role check was in-flight, ignore this result.
      if (activeUserIdRef.current !== nextUser.id) return;

      setIsAdmin(hasAdminRole);
      setIsLoading(false);
    },
    [checkAdminRole]
  );

  useEffect(() => {
    let cancelled = false;

    const safeApply = async (session: Session | null, markInitResolved = false) => {
      try {
        if (cancelled) return;
        await applySession(session);
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
        if (markInitResolved) initResolvedRef.current = true;
      }
    };

    // 1) Subscribe FIRST (prevents missing the initial session event)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // After we have a stable initial state, ignore noisy refreshes to avoid flicker.
      if (event === "TOKEN_REFRESHED" && initResolvedRef.current) return;

      // "INITIAL_SESSION" is useful on first load; after init, ignore it.
      if (event === "INITIAL_SESSION") {
        void safeApply(session, true);
        return;
      }

      // For other events (SIGNED_IN / SIGNED_OUT / USER_UPDATED), reconcile.
      void safeApply(session);
    });

    // 2) Also reconcile from stored session (covers cases where INITIAL_SESSION doesn’t fire)
    supabase.auth
      .getSession()
      .then(({ data }) => safeApply(data.session, true))
      .catch((err) => {
        console.error("[useAdminAuth] getSession error", err);
        if (!cancelled) setIsLoading(false);
        initResolvedRef.current = true;
      });

    return () => {
      cancelled = true;
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

