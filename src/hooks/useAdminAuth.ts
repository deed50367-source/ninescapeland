import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const withTimeout = async <T,>(
  promise: Promise<T>,
  ms: number,
  label: string
): Promise<T> => {
  let timeoutId: number | undefined;
  const timeoutPromise = new Promise<T>((_, reject) => {
    timeoutId = window.setTimeout(() => {
      reject(new Error(`${label} timed out after ${ms}ms`));
    }, ms);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) window.clearTimeout(timeoutId);
  }
};

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasAdminRole, setHasAdminRole] = useState(false);
  const [hasStaffRole, setHasStaffRole] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [checkFailed, setCheckFailed] = useState(false);

  const generationRef = useRef(0);

  const checkAdminRole = useCallback(async (userId: string): Promise<{ canAccess: boolean; isAdminRole: boolean; isStaffRole: boolean; failed: boolean }> => {
    // Use the security-definer has_role() function: it bypasses RLS quirks
    // and returns a plain boolean, so a signed-in admin is always recognised.
    const probe = async () => {
      const [admin, staff] = await Promise.all([
        supabase.rpc("has_role", { _user_id: userId, _role: "admin" }),
        supabase.rpc("has_role", { _user_id: userId, _role: "staff" }),
      ]);
      if (admin.error || staff.error) throw admin.error || staff.error;
      const isAdminRole = admin.data === true;
      const isStaffRole = staff.data === true;
      return { canAccess: isAdminRole || isStaffRole, isAdminRole, isStaffRole };
    };

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const result = await withTimeout(probe(), 8000, "[useAdminAuth] role check");
        return { ...result, failed: false };
      } catch (err) {
        console.error("[useAdminAuth] role check failed (attempt " + (attempt + 1) + "):", err);
      }
    }

    return { canAccess: false, isAdminRole: false, isStaffRole: false, failed: true };
  }, []);

  const clearAuthState = useCallback(() => {
    setUser(null);
    setIsAdmin(false);
    setHasAdminRole(false);
    setHasStaffRole(false);
  }, []);


  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      const generation = ++generationRef.current;
      try {
        const { data: { session } } = await withTimeout(
          supabase.auth.getSession(),
          8000,
          "[useAdminAuth] getSession"
        );
        
        if (!mounted || generation !== generationRef.current) return;
        
        if (!session?.user) {
          clearAuthState();
          setIsLoading(false);
          return;
        }

        setUser(session.user);

        // Revalidate with the auth server when available. A temporary network
        // failure must not destroy a valid locally persisted session.
        try {
          const { data, error } = await withTimeout(
            supabase.auth.getUser(),
            8000,
            "[useAdminAuth] getUser"
          );
          if (!mounted || generation !== generationRef.current) return;
          if (!error && data.user) setUser(data.user);
        } catch (error) {
          console.warn("[useAdminAuth] session revalidation deferred:", error);
        }

        const roleState = await checkAdminRole(session.user.id);
        
        if (!mounted || generation !== generationRef.current) return;
        
        setCheckFailed(roleState.failed);
        if (!roleState.failed) {
          setIsAdmin(roleState.canAccess);
          setHasAdminRole(roleState.isAdminRole);
          setHasStaffRole(roleState.isStaffRole);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("[useAdminAuth] init error:", error);
        if (mounted && generation === generationRef.current) {
          // A timeout is not proof of logout. Keep any known user and offer retry.
          setCheckFailed(true);
          setIsLoading(false);
        }
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      
      if (event === "SIGNED_OUT") {
        generationRef.current += 1;
        clearAuthState();
        setCheckFailed(false);
        setIsLoading(false);
      } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        if (session?.user) {
          const generation = ++generationRef.current;
          setUser(session.user);
          setIsLoading(true);
          window.setTimeout(async () => {
            const roleState = await checkAdminRole(session.user.id);
            if (mounted && generation === generationRef.current) {
              setCheckFailed(roleState.failed);
              if (!roleState.failed) {
                setIsAdmin(roleState.canAccess);
                setHasAdminRole(roleState.isAdminRole);
                setHasStaffRole(roleState.isStaffRole);
              }
              setIsLoading(false);
            }
          }, 0);
        }
      }
    });

    return () => {
      mounted = false;
      generationRef.current += 1;
      subscription.unsubscribe();
    };
  }, [checkAdminRole, clearAuthState]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return { user, isAdmin, hasAdminRole, hasStaffRole, isLoading, checkFailed, signOut };
};

