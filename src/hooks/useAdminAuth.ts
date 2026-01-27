import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAdminRole = useCallback(async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .in("role", ["admin", "staff"])
        .limit(1);

      if (error) {
        console.error("[useAdminAuth] role check error:", error);
        return false;
      }

      return !!(data && data.length > 0);
    } catch (err) {
      console.error("[useAdminAuth] unexpected error", err);
      return false;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
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
          setIsLoading(true);
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

  return { user, isAdmin, isLoading, signOut };
};

