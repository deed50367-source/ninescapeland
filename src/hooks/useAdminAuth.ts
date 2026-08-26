import { useCallback, useEffect, useState } from "react";
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

  const checkAdminRole = useCallback(async (userId: string): Promise<{ canAccess: boolean; isAdminRole: boolean; isStaffRole: boolean }> => {
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
        setCheckFailed(false);
        return result;
      } catch (err) {
        console.error("[useAdminAuth] role check failed (attempt " + (attempt + 1) + "):", err);
      }
    }

    setCheckFailed(true);
    return { canAccess: false, isAdminRole: false, isStaffRole: false };
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
      try {
        const { data: { session } } = await withTimeout(
          supabase.auth.getSession(),
          8000,
          "[useAdminAuth] getSession"
        );
        
        if (!mounted) return;
        
        if (!session?.user) {
          clearAuthState();
          setIsLoading(false);
          return;
        }

        setUser(session.user);
        
        const roleState = await checkAdminRole(session.user.id);
        
        if (!mounted) return;
        
        setIsAdmin(roleState.canAccess);
        setHasAdminRole(roleState.isAdminRole);
        setHasStaffRole(roleState.isStaffRole);
        setIsLoading(false);
      } catch (error) {
        console.error("[useAdminAuth] init error:", error);
        if (mounted) {
          clearAuthState();
          setIsLoading(false);
        }
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      if (event === "SIGNED_OUT") {
        clearAuthState();
        setIsLoading(false);
      } else if (event === "SIGNED_IN") {
        // Only handle SIGNED_IN, not TOKEN_REFRESHED or other events
        if (session?.user) {
          setUser(session.user);
          // Don't set isLoading=true here to avoid unmounting active UI
          const roleState = await checkAdminRole(session.user.id);
          if (mounted) {
            setIsAdmin(roleState.canAccess);
            setHasAdminRole(roleState.isAdminRole);
            setHasStaffRole(roleState.isStaffRole);
            setIsLoading(false);
          }
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [checkAdminRole, clearAuthState]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return { user, isAdmin, hasAdminRole, hasStaffRole, isLoading, checkFailed, signOut };
};

