import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
      const { data, error } = await supabase
        .from("user_permissions")
        .select("permission")
        .eq("user_id", userId);

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

export const useCurrentUserPermissions = () => {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (!session?.user) {
          setUser(null);
          setIsAdmin(false);
          setPermissions([]);
          setIsLoading(false);
          return;
        }

        setUser({ id: session.user.id });

        // Check admin role
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .limit(1);

        const hasAdminRole = !!(roleData && roleData.length > 0);
        
        if (!mounted) return;
        setIsAdmin(hasAdminRole);

        // If admin, they have all permissions
        if (hasAdminRole) {
          setPermissions(ALL_PERMISSIONS.map(p => p.key));
          setIsLoading(false);
          return;
        }

        // Fetch user permissions
        const { data: permData } = await supabase
          .from("user_permissions")
          .select("permission")
          .eq("user_id", session.user.id);

        if (!mounted) return;
        setPermissions((permData || []).map(d => d.permission as Permission));
        setIsLoading(false);
      } catch (error) {
        console.error("[useCurrentUserPermissions] error:", error);
        if (mounted) {
          setUser(null);
          setIsAdmin(false);
          setPermissions([]);
          setIsLoading(false);
        }
      }
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      // Only re-init on actual sign in/out, not token refresh
      if (mounted && (event === "SIGNED_IN" || event === "SIGNED_OUT")) {
        init();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const hasPermission = useCallback((permission: Permission): boolean => {
    if (isAdmin) return true;
    return permissions.includes(permission);
  }, [isAdmin, permissions]);

  const canAccessBackend = useCallback((): boolean => {
    return isAdmin || permissions.includes('backend_access');
  }, [isAdmin, permissions]);

  return { 
    user, 
    isAdmin, 
    permissions, 
    isLoading, 
    hasPermission, 
    canAccessBackend 
  };
};
