import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AdminAuthState {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
}

export const useAdminAuth = () => {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    isAdmin: false,
    isLoading: true,
  });
  
  // Cache admin status to avoid unnecessary re-fetches
  const adminCacheRef = useRef<{ userId: string; isAdmin: boolean } | null>(null);
  const mountedRef = useRef(true);


  const checkAdminRole = async (userId: string): Promise<boolean> => {
    // Return cached value if same user
    if (adminCacheRef.current?.userId === userId) {
      return adminCacheRef.current.isAdmin;
    }

    const { data: roleData, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .single();

    if (error) {
      // Don't cache failures; allow re-check on next render/session change
      if (import.meta.env.DEV) {
        console.warn("[useAdminAuth] role check failed", error);
      }
      return false;
    }

    const isAdmin = !!roleData;
    adminCacheRef.current = { userId, isAdmin };
    return isAdmin;
  };

  useEffect(() => {
    mountedRef.current = true;
    const setFromSession = (sessionUser: User | null) => {
      if (!mountedRef.current) return;

      if (sessionUser) {
        setState({
          user: sessionUser,
          isAdmin: false,
          isLoading: true,
        });
      } else {
        adminCacheRef.current = null;
        setState({
          user: null,
          isAdmin: false,
          isLoading: false,
        });
      }
    };

    // Set up auth state listener FIRST (sync callback)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Ignore token refresh events - they don't change auth state
      if (event === "TOKEN_REFRESHED") return;
      setFromSession(session?.user ?? null);
    });

    // THEN check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setFromSession(session?.user ?? null);
    });

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
    };
  }, []);

  // Fetch admin role whenever user changes (avoid supabase calls inside auth callback)
  useEffect(() => {
    const userId = state.user?.id;
    if (!userId) return;

    let cancelled = false;

    (async () => {
      const isAdmin = await checkAdminRole(userId);
      if (!cancelled && mountedRef.current) {
        setState((prev) => ({
          ...prev,
          isAdmin,
          isLoading: false,
        }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [state.user?.id]);

  const signOut = async () => {
    adminCacheRef.current = null;
    await supabase.auth.signOut();
  };

  return { ...state, signOut };
};
