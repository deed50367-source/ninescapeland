import { useState, useEffect, useRef, useCallback } from "react";
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

  const checkAdminRole = useCallback(async (userId: string): Promise<boolean> => {
    // Return cached value if same user
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

      const isAdmin = data && data.length > 0;
      adminCacheRef.current = { userId, isAdmin };
      return isAdmin;
    } catch (err) {
      console.error("[useAdminAuth] unexpected error", err);
      return false;
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    mountedRef.current = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mountedRef.current) return;

        if (session?.user) {
          const isAdmin = await checkAdminRole(session.user.id);
          
          if (!mountedRef.current) return;
          
          setState({
            user: session.user,
            isAdmin,
            isLoading: false,
          });
        } else {
          setState({
            user: null,
            isAdmin: false,
            isLoading: false,
          });
        }
      } catch (err) {
        console.error("[useAdminAuth] init error", err);
        if (mountedRef.current) {
          setState({
            user: null,
            isAdmin: false,
            isLoading: false,
          });
        }
      }
    };

    initializeAuth();

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Only respond to actual auth changes, ignore token refresh and initial session
      if (event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") {
        return;
      }

      if (!mountedRef.current) return;

      if (event === "SIGNED_OUT") {
        adminCacheRef.current = null;
        setState({
          user: null,
          isAdmin: false,
          isLoading: false,
        });
        return;
      }

      if (event === "SIGNED_IN" && session?.user) {
        setState(prev => ({ ...prev, isLoading: true }));
        
        const isAdmin = await checkAdminRole(session.user.id);
        
        if (mountedRef.current) {
          setState({
            user: session.user,
            isAdmin,
            isLoading: false,
          });
        }
      }
    });

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
    };
  }, [checkAdminRole]);

  const signOut = useCallback(async () => {
    adminCacheRef.current = null;
    await supabase.auth.signOut();
  }, []);

  return { ...state, signOut };
};
