import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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

export type Permission = 
  | 'backend_access'
  | 'inquiries'
  | 'products'
  | 'site_images'
  | 'gallery'
  | 'customer_service'
  | 'blog'
  | 'user_management';

export const ALL_PERMISSIONS: { key: Permission; label: string; description: string }[] = [
  { key: 'backend_access', label: '后台访问', description: '允许访问管理后台' },
  { key: 'inquiries', label: '询盘管理', description: '查看和管理客户询盘' },
  { key: 'products', label: '产品管理', description: '管理产品和分类' },
  { key: 'site_images', label: '配图管理', description: '管理网站配图' },
  { key: 'gallery', label: '图库管理', description: '管理素材图库' },
  { key: 'customer_service', label: '客服管理', description: '查看和回复客户消息' },
  { key: 'blog', label: '博客管理', description: '管理博客文章' },
  { key: 'user_management', label: '用户管理', description: '管理用户权限（仅管理员）' },
];

export const useUserPermissions = (userId?: string) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPermissions = useCallback(async () => {
    if (!userId) {
      setPermissions([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await withTimeout(
        Promise.resolve(
          supabase
            .from("user_permissions")
            .select("permission")
            .eq("user_id", userId)
        ) as Promise<any>,
        8000,
        "[useUserPermissions] fetchPermissions"
      );

      if (error) {
        console.error("[useUserPermissions] fetch error:", error);
        setPermissions([]);
      } else {
        setPermissions((data || []).map(d => d.permission as Permission));
      }
    } catch (err) {
      console.error("[useUserPermissions] unexpected error:", err);
      setPermissions([]);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  const hasPermission = useCallback((permission: Permission): boolean => {
    return permissions.includes(permission);
  }, [permissions]);

  return { permissions, isLoading, hasPermission, refetch: fetchPermissions };
};

/**
 * Current user's module permissions.
 *
 * Renders instantly from the local access cache and refreshes in the
 * background. A slow or failing backend query never hides modules the user
 * already had, and never logs anyone out.
 */
export const useCurrentUserPermissions = (knownUserId?: string, waitForKnownUser = false) => {
  const [user, setUser] = useState<{ id: string } | null>(knownUserId ? { id: knownUserId } : null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasStaffRole, setHasStaffRole] = useState(false);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkFailed, setCheckFailed] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    if (waitForKnownUser && !knownUserId) {
      setIsLoading(true);
      return () => {
        mountedRef.current = false;
      };
    }

    const applyCache = (userId: string) => {
      const cached = readAccessCache(userId);
      if (!cached) return false;
      setIsAdmin(cached.isAdmin);
      setHasStaffRole(cached.isStaff);
      setPermissions(
        cached.isAdmin
          ? ALL_PERMISSIONS.map((p) => p.key)
          : (cached.permissions as Permission[])
      );
      return true;
    };

    const refresh = async (userId: string) => {
      try {
        const [adminRes, staffRes, permRes] = await Promise.all([
          supabase.rpc("has_role", { _user_id: userId, _role: "admin" }),
          supabase.rpc("has_role", { _user_id: userId, _role: "staff" }),
          supabase.from("user_permissions").select("permission").eq("user_id", userId),
        ]);

        if (adminRes.error || staffRes.error) throw adminRes.error || staffRes.error;
        if (!mountedRef.current) return;

        const hasAdminRole = adminRes.data === true;
        const hasStaffRoleValue = staffRes.data === true;
        const granted = ((permRes.data || []) as { permission: string }[]).map(
          (d) => d.permission as Permission
        );

        setIsAdmin(hasAdminRole);
        setHasStaffRole(hasStaffRoleValue);
        setPermissions(hasAdminRole ? ALL_PERMISSIONS.map((p) => p.key) : granted);
        setCheckFailed(false);

        writeAccessCache({
          userId,
          isAdmin: hasAdminRole,
          isStaff: hasStaffRoleValue,
          permissions: granted,
        });
      } catch (error) {
        console.warn("[useCurrentUserPermissions] background refresh failed:", error);
        if (mountedRef.current) setCheckFailed(!readAccessCache(userId));
      }
    };

    const start = (userId?: string) => {
      if (!mountedRef.current) return;
      if (!userId) {
        setUser(null);
        setIsAdmin(false);
        setHasStaffRole(false);
        setPermissions([]);
        setIsLoading(false);
        return;
      }
      setUser({ id: userId });
      applyCache(userId);
      setIsLoading(false);
      void refresh(userId);
    };

    if (knownUserId) {
      start(knownUserId);
    } else {
      supabase.auth
        .getSession()
        .then(({ data }) => start(data.session?.user.id))
        .catch(() => {
          if (mountedRef.current) setIsLoading(false);
        });
    }

    if (knownUserId) {
      return () => {
        mountedRef.current = false;
      };
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mountedRef.current) return;

      if (event === "SIGNED_OUT") {
        start(undefined);
      } else if (event === "SIGNED_IN" && session?.user) {
        start(session.user.id);
      }
    });

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
    };
  }, [knownUserId, waitForKnownUser]);

  const hasPermission = useCallback((permission: Permission): boolean => {
    if (isAdmin) return true;
    return permissions.includes(permission);
  }, [isAdmin, permissions]);

  const canAccessBackend = useCallback((): boolean => {
    return isAdmin || hasStaffRole || permissions.includes('backend_access');
  }, [isAdmin, hasStaffRole, permissions]);

  return { 
    user, 
    isAdmin, 
    hasStaffRole,
    permissions, 
    isLoading, 
    checkFailed,
    hasPermission, 
    canAccessBackend 
  };
};
