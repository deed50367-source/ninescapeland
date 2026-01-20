import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AdminAuthState {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  isInitialized: boolean;
}

// Global cache to persist across component re-mounts
const globalAdminCache: { userId: string; isAdmin: boolean } | null = null;
let globalAuthState: AdminAuthState | null = null;

export const useAdminAuth = () => {
  const [state, setState] = useState<AdminAuthState>(() => {
    // Initialize from global cache if available to avoid flash
    if (globalAuthState) {
      return globalAuthState;
    }
    return {
      user: null,
      isAdmin: false,
      isLoading: true,
      isInitialized: false,
    };
  });
  
  // Cache admin status to avoid unnecessary re-fetches
  const adminCacheRef = useRef<{ userId: string; isAdmin: boolean } | null>(globalAdminCache);
  const mountedRef = useRef(true);
  const initRef = useRef(false);

  const checkAdminRole = useCallback(async (userId: string): Promise<boolean> => {
    // Return cached value if same user
    if (adminCacheRef.current?.userId === userId) {
      return adminCacheRef.current.isAdmin;
    }

    try {
      const { data: roleData, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .single();

      if (error) {
        if (import.meta.env.DEV) {
          console.warn("[useAdminAuth] role check failed", error);
        }
        return false;
      }

      const isAdmin = !!roleData;
      adminCacheRef.current = { userId, isAdmin };
      return isAdmin;
    } catch (err) {
      console.error("[useAdminAuth] unexpected error", err);
      return false;
    }
  }, []);

  useEffect(() => {
    // Prevent double initialization in StrictMode
    if (initRef.current) return;
    initRef.current = true;
    mountedRef.current = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mountedRef.current) return;

        if (session?.user) {
          const isAdmin = await checkAdminRole(session.user.id);
          
          if (!mountedRef.current) return;
          
          const newState: AdminAuthState = {
            user: session.user,
            isAdmin,
            isLoading: false,
            isInitialized: true,
          };
          globalAuthState = newState;
          setState(newState);
        } else {
          const newState: AdminAuthState = {
            user: null,
            isAdmin: false,
            isLoading: false,
            isInitialized: true,
          };
          globalAuthState = newState;
          setState(newState);
        }
      } catch (err) {
        console.error("[useAdminAuth] init error", err);
        if (mountedRef.current) {
          setState({
            user: null,
            isAdmin: false,
            isLoading: false,
            isInitialized: true,
          });
        }
      }
    };

    // Set up auth state listener for actual auth changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Ignore events that don't change auth state
      if (event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") return;
      
      if (!mountedRef.current) return;

      if (event === "SIGNED_OUT") {
        adminCacheRef.current = null;
        globalAuthState = null;
        setState({
          user: null,
          isAdmin: false,
          isLoading: false,
          isInitialized: true,
        });
        return;
      }

      if (event === "SIGNED_IN" && session?.user) {
        setState(prev => ({
          ...prev,
          user: session.user,
          isLoading: true,
        }));
        
        const isAdmin = await checkAdminRole(session.user.id);
        
        if (!mountedRef.current) return;
        
        const newState: AdminAuthState = {
          user: session.user,
          isAdmin,
          isLoading: false,
          isInitialized: true,
        };
        globalAuthState = newState;
        setState(newState);
      }
    });

    initializeAuth();

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
    };
  }, [checkAdminRole]);

  const signOut = useCallback(async () => {
    adminCacheRef.current = null;
    globalAuthState = null;
    await supabase.auth.signOut();
  }, []);

  return { ...state, signOut };
};
