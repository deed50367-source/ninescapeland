import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, UserCheck, UserX, Shield, RefreshCw } from "lucide-react";
import { ALL_PERMISSIONS, Permission } from "@/hooks/useUserPermissions";

interface UserWithPermissions {
  id: string;
  email: string;
  created_at: string;
  role?: string;
  permissions: Permission[];
}

const AdminUsersTab = () => {
  const [users, setUsers] = useState<UserWithPermissions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingUserId, setSavingUserId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Get all users from user_roles (registered users)
      const { data: rolesData, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role, created_at");

      if (rolesError) {
        console.error("Error fetching roles:", rolesError);
        toast.error("获取用户列表失败");
        return;
      }

      // Get all permissions
      const { data: permsData, error: permsError } = await supabase
        .from("user_permissions")
        .select("user_id, permission");

      if (permsError) {
        console.error("Error fetching permissions:", permsError);
      }

      // Build permissions map
      const permissionsMap: Record<string, Permission[]> = {};
      (permsData || []).forEach(p => {
        if (!permissionsMap[p.user_id]) {
          permissionsMap[p.user_id] = [];
        }
        permissionsMap[p.user_id].push(p.permission as Permission);
      });

      // Build email map - we'll use user_id prefix as fallback
      // Build users list - use user_id as identifier since we can't access auth.users
      const usersList: UserWithPermissions[] = rolesData.map(role => ({
        id: role.user_id,
        email: `用户 ${role.user_id.slice(0, 8)}...`,
        created_at: role.created_at,
        role: role.role,
        permissions: permissionsMap[role.user_id] || [],
      }));

      // Sort by created_at desc
      usersList.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      setUsers(usersList);
    } catch (error) {
      console.error("Error:", error);
      toast.error("获取用户列表失败");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const togglePermission = async (userId: string, permission: Permission, hasPermission: boolean) => {
    setSavingUserId(userId);
    try {
      if (hasPermission) {
        // Remove permission
        const { error } = await supabase
          .from("user_permissions")
          .delete()
          .eq("user_id", userId)
          .eq("permission", permission);

        if (error) throw error;
        
        setUsers(prev => prev.map(u => 
          u.id === userId 
            ? { ...u, permissions: u.permissions.filter(p => p !== permission) }
            : u
        ));
        toast.success("权限已移除");
      } else {
        // Add permission
        const { error } = await supabase
          .from("user_permissions")
          .insert({ user_id: userId, permission });

        if (error) throw error;
        
        setUsers(prev => prev.map(u => 
          u.id === userId 
            ? { ...u, permissions: [...u.permissions, permission] }
            : u
        ));
        toast.success("权限已添加");
      }
    } catch (error) {
      console.error("Error toggling permission:", error);
      toast.error("操作失败");
    } finally {
      setSavingUserId(null);
    }
  };

  const grantAllPermissions = async (userId: string) => {
    setSavingUserId(userId);
    try {
      const permissionsToGrant = ALL_PERMISSIONS
        .filter(p => p.key !== 'user_management') // Don't auto-grant user management
        .map(p => ({ user_id: userId, permission: p.key }));

      const { error } = await supabase
        .from("user_permissions")
        .upsert(permissionsToGrant, { onConflict: 'user_id,permission' });

      if (error) throw error;

      setUsers(prev => prev.map(u => 
        u.id === userId 
          ? { ...u, permissions: ALL_PERMISSIONS.filter(p => p.key !== 'user_management').map(p => p.key) }
          : u
      ));
      toast.success("已授予所有权限");
    } catch (error) {
      console.error("Error granting all permissions:", error);
      toast.error("操作失败");
    } finally {
      setSavingUserId(null);
    }
  };

  const revokeAllPermissions = async (userId: string) => {
    setSavingUserId(userId);
    try {
      const { error } = await supabase
        .from("user_permissions")
        .delete()
        .eq("user_id", userId);

      if (error) throw error;

      setUsers(prev => prev.map(u => 
        u.id === userId 
          ? { ...u, permissions: [] }
          : u
      ));
      toast.success("已移除所有权限");
    } catch (error) {
      console.error("Error revoking permissions:", error);
      toast.error("操作失败");
    } finally {
      setSavingUserId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">用户权限管理</h2>
          <p className="text-sm text-muted-foreground">
            管理注册用户的后台访问权限
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchUsers}>
          <RefreshCw className="w-4 h-4 mr-2" />
          刷新
        </Button>
      </div>

      {users.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">暂无注册用户</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {users.map(user => (
            <Card key={user.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-base font-medium">
                      {user.email}
                    </CardTitle>
                    {user.role === 'admin' && (
                      <Badge variant="default" className="bg-primary">
                        <Shield className="w-3 h-3 mr-1" />
                        管理员
                      </Badge>
                    )}
                    {user.role === 'staff' && (
                      <Badge variant="secondary">员工</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {user.role !== 'admin' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => grantAllPermissions(user.id)}
                          disabled={savingUserId === user.id}
                        >
                          <UserCheck className="w-4 h-4 mr-1" />
                          全部授权
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => revokeAllPermissions(user.id)}
                          disabled={savingUserId === user.id}
                        >
                          <UserX className="w-4 h-4 mr-1" />
                          全部移除
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  注册时间: {new Date(user.created_at).toLocaleString('zh-CN')}
                </p>
              </CardHeader>
              <CardContent>
                {user.role === 'admin' ? (
                  <p className="text-sm text-muted-foreground">
                    管理员拥有所有权限
                  </p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {ALL_PERMISSIONS.map(perm => (
                      <label
                        key={perm.key}
                        className="flex items-start gap-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={user.permissions.includes(perm.key)}
                          onCheckedChange={() => 
                            togglePermission(user.id, perm.key, user.permissions.includes(perm.key))
                          }
                          disabled={savingUserId === user.id}
                        />
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium leading-none">
                            {perm.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {perm.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsersTab;
