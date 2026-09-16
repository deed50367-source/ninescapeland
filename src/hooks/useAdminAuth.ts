import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { clearAccessCache, readAccessCache, writeAccessCache } from "@/lib/adminAccessCache";

/**
 * Session + role state for the admin backend.
 *
 * Design rules (stability first):
 * - The session comes from local storage only (no getUser() round-trip), so
 *   slow auth responses can never delay or invalidate a valid login.
 * - Roles render instantly from the local access cache; the backend role query
 *   runs in the background and only ever upgrades/refreshes the cache.
 * - Nothing except an explicit SIGNED_OUT clears the login state.
 */
export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasAdminRole, setHasAdminRole] = useState(false);
  const [hasStaffRole, setHasStaffRole] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [checkFailed, setCheckFailed] = useState(false);

  const mountedRef = useRef(true);

  const applyCache = useCallback((userId: string): boolean => {
    const cached = readAccessCache(userId);
    if (!cached) return false;
    setHasAdminRole(cached.isAdmin);
    setHasStaffRole(cached.isStaff);
    setIsAdmin(cached.isAdmin || cached.isStaff || cached.permissions.includes("backend_access"));
    return true;
  }, []);

  const refreshRoles = useCallback(async (userId: string) => {
    try {
      const [admin, staff, backend] = await Promise.all([
        supabase.rpc("has_role", { _user_id: userId, _role: "admin" }),
        supabase.rpc("has_role", { _user_id: userId, _role: "staff" }),
        supabase.rpc("has_permission", { _user_id: userId, _permission: "backend_access" }),
      ]);
      if (admin.error || staff.error || backend.error) {
        throw admin.error || staff.error || backend.error;
      }
      if (!mountedRef.current) return;

      const isAdminRole = admin.data === true;
      const isStaffRole = staff.data === true;
      setHasAdminRole(isAdminRole);
      setHasStaffRole(isStaffRole);
      setIsAdmin(isAdminRole || isStaffRole || backend.data === true);
      setCheckFailed(false);

      const cached = readAccessCache(userId);
      writeAccessCache({
        userId,
        isAdmin: isAdminRole,
        isStaff: isStaffRole,
        permissions: cached?.permissions ?? (backend.data === true ? ["backend_access"] : []),
      });
    } catch (err) {
      console.warn("[useAdminAuth] background role refresh failed:", err);
      if (mountedRef.current) setCheckFailed(!readAccessCache(userId));
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    const hydrate = (session: { user: User } | null) => {
      if (!mountedRef.current) return;
      if (!session?.user) {
        setIsLoading(false);
        return;
      }
      setUser(session.user);
      applyCache(session.user.id);
      // Never block the UI on the backend: render now, verify in background.
      setIsLoading(false);
      void refreshRoles(session.user.id);
    };

    supabase.auth
      .getSession()
      .then(({ data }) => hydrate(data.session))
      .catch((err) => {
        console.warn("[useAdminAuth] getSession failed, keeping current state:", err);
        if (mountedRef.current) setIsLoading(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mountedRef.current) return;

      if (event === "SIGNED_OUT") {
        clearAccessCache();
        setUser(null);
        setIsAdmin(false);
        setHasAdminRole(false);
        setHasStaffRole(false);
        setCheckFailed(false);
        setIsLoading(false);
        return;
      }

      if (session?.user) {
        setUser(session.user);
        applyCache(session.user.id);
        setIsLoading(false);
        if (event === "SIGNED_IN") void refreshRoles(session.user.id);
      }
    });

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
    };
  }, [applyCache, refreshRoles]);

  const signOut = useCallback(async () => {
    clearAccessCache();
    await supabase.auth.signOut();
  }, []);

  return { user, isAdmin, hasAdminRole, hasStaffRole, isLoading, checkFailed, signOut };
};
