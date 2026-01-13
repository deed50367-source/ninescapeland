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

  useEffect(() => {
    mountedRef.current = true;

    const checkAdminRole = async (userId: string): Promise<boolean> => {
      // Return cached value if same user
      if (adminCacheRef.current?.userId === userId) {
        return adminCacheRef.current.isAdmin;
      }

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .single();

      const isAdmin = !!roleData;
      adminCacheRef.current = { userId, isAdmin };
      return isAdmin;
    };

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mountedRef.current) return;

        // Ignore token refresh events - they don't change auth state
        if (event === "TOKEN_REFRESHED") {
          return;
        }

        if (session?.user) {
          const isAdmin = await checkAdminRole(session.user.id);
          if (mountedRef.current) {
            setState({
              user: session.user,
              isAdmin,
              isLoading: false,
            });
          }
        } else {
          adminCacheRef.current = null;
          if (mountedRef.current) {
            setState({
              user: null,
              isAdmin: false,
              isLoading: false,
            });
          }
        }
      }
    );

    // THEN check initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mountedRef.current) return;

      if (session?.user) {
        const isAdmin = await checkAdminRole(session.user.id);
        if (mountedRef.current) {
          setState({
            user: session.user,
            isAdmin,
            isLoading: false,
          });
        }
      } else {
        if (mountedRef.current) {
          setState({
            user: null,
            isAdmin: false,
            isLoading: false,
          });
        }
      }
    });

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    adminCacheRef.current = null;
    await supabase.auth.signOut();
  };

  return { ...state, signOut };
};
