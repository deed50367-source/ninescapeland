import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const adminCacheRef = useRef<{ userId: string; isAdmin: boolean } | null>(null);
  const mountedRef = useRef(false);
  const initRef = useRef(false);

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

      const hasRole = data && data.length > 0;
      adminCacheRef.current = { userId, isAdmin: hasRole };
      return hasRole;
    } catch (err) {
      console.error("[useAdminAuth] unexpected error", err);
      return false;
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    
    // Prevent double initialization in strict mode
    if (initRef.current) {
      return;
    }
    initRef.current = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mountedRef.current) return;

        if (session?.user) {
          const hasAdminRole = await checkAdminRole(session.user.id);
          
          if (!mountedRef.current) return;
          
          setUser(session.user);
          setIsAdmin(hasAdminRole);
          setIsLoading(false);
        } else {
          setUser(null);
          setIsAdmin(false);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("[useAdminAuth] init error", err);
        if (mountedRef.current) {
          setUser(null);
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") {
        return;
      }

      if (!mountedRef.current) return;

      if (event === "SIGNED_OUT") {
        adminCacheRef.current = null;
        setUser(null);
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      if (event === "SIGNED_IN" && session?.user) {
        setIsLoading(true);
        
        const hasAdminRole = await checkAdminRole(session.user.id);
        
        if (mountedRef.current) {
          setUser(session.user);
          setIsAdmin(hasAdminRole);
          setIsLoading(false);
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

  return { user, isAdmin, isLoading, signOut };
};
