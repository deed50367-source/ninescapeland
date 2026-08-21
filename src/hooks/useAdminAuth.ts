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
  const [isLoading, setIsLoading] = useState(true);
  const [checkFailed, setCheckFailed] = useState(false);

  const checkAdminRole = useCallback(async (userId: string): Promise<boolean> => {
    // Use the security-definer has_role() function: it bypasses RLS quirks
    // and returns a plain boolean, so a signed-in admin is always recognised.
    const probe = async () => {
      const [admin, staff] = await Promise.all([
        supabase.rpc("has_role", { _user_id: userId, _role: "admin" }),
        supabase.rpc("has_role", { _user_id: userId, _role: "staff" }),
      ]);
      if (admin.error || staff.error) throw admin.error || staff.error;
      return admin.data === true || staff.data === true;
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
    return false;
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
          setUser(null);
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        setUser(session.user);
        
        const hasRole = await checkAdminRole(session.user.id);
        
        if (!mounted) return;
        
        setIsAdmin(hasRole);
        setIsLoading(false);
      } catch (error) {
        console.error("[useAdminAuth] init error:", error);
        if (mounted) {
          setUser(null);
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      if (event === "SIGNED_OUT") {
        setUser(null);
        setIsAdmin(false);
        setIsLoading(false);
      } else if (event === "SIGNED_IN") {
        // Only handle SIGNED_IN, not TOKEN_REFRESHED or other events
        if (session?.user) {
          setUser(session.user);
          // Don't set isLoading=true here to avoid unmounting active UI
          const hasRole = await checkAdminRole(session.user.id);
          if (mounted) {
            setIsAdmin(hasRole);
            setIsLoading(false);
          }
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [checkAdminRole]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return { user, isAdmin, isLoading, checkFailed, signOut };
};

