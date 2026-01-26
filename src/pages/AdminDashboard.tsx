import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useCurrentUserPermissions, Permission } from "@/hooks/useUserPermissions";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Image as ImageIcon, 
  MessageSquare, 
  FileText, 
  LogOut, 
  Loader2,
  ShieldX,
  UserX,
  Inbox,
  Package,
  Palette,
  Users,
  Lock
} from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

// Import admin components
import AdminGalleryTab from "@/components/admin/AdminGalleryTab";
import AdminCustomerServiceTab from "@/components/admin/AdminCustomerServiceTab";
import AdminBlogTab from "@/components/admin/AdminBlogTab";
import AdminInquiriesTab from "@/components/admin/AdminInquiriesTab";
import AdminProductsTab from "@/components/admin/AdminProductsTab";
import AdminSiteImagesTab from "@/components/admin/AdminSiteImagesTab";
import AdminUsersTab from "@/components/admin/AdminUsersTab";

const AdminDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAdmin, isLoading: authLoading, signOut } = useAdminAuth();
  const { permissions, isLoading: permLoading, hasPermission, canAccessBackend } = useCurrentUserPermissions();
  const [activeTab, setActiveTab] = useState("inquiries");

  // Tab configuration with permission requirements
  const tabs = [
    { key: "inquiries", icon: Inbox, label: "询盘", permission: "inquiries" as Permission },
    { key: "products", icon: Package, label: "产品", permission: "products" as Permission },
    { key: "site-images", icon: Palette, label: "配图", permission: "site_images" as Permission },
    { key: "gallery", icon: ImageIcon, label: "图库", permission: "gallery" as Permission },
    { key: "customer-service", icon: MessageSquare, label: "客服", permission: "customer_service" as Permission },
    { key: "blog", icon: FileText, label: "博客", permission: "blog" as Permission },
    { key: "users", icon: Users, label: "用户", permission: "user_management" as Permission },
  ];

  // Get visible tabs based on permissions
  const visibleTabs = tabs.filter(tab => hasPermission(tab.permission));

  // Set initial active tab to first available
  useEffect(() => {
    if (!permLoading && visibleTabs.length > 0 && !visibleTabs.find(t => t.key === activeTab)) {
      setActiveTab(visibleTabs[0].key);
    }
  }, [permLoading, visibleTabs, activeTab]);

  // Auto-redirect to login if not authenticated (after loading completes)
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/admin/login", { replace: true });
    }
  }, [authLoading, user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("已退出登录");
    navigate("/admin/login");
  };

  const handleSwitchAccount = async () => {
    await signOut();
    navigate("/admin/login");
  };

  // Loading state
  if (authLoading || permLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">验证身份中...</p>
        </div>
      </div>
    );
  }

  // Not logged in - show brief message while redirecting
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <UserX className="w-12 h-12 text-muted-foreground" />
          <p className="text-muted-foreground">正在跳转到登录页...</p>
        </div>
      </div>
    );
  }

  // Logged in but no backend access permission (not admin and no backend_access permission)
  if (!isAdmin && !canAccessBackend()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-warning" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">等待授权</h2>
          <p className="text-muted-foreground mb-2">
            您的账号尚未获得后台访问权限
          </p>
          <p className="text-sm text-muted-foreground mb-6 bg-muted px-3 py-2 rounded-md">
            {user.email}
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            请联系管理员授予您相应的访问权限
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="outline" onClick={handleSwitchAccount} className="w-full sm:w-auto">
              切换账号
            </Button>
            <Button onClick={handleSignOut} className="w-full sm:w-auto">
              <LogOut className="w-4 h-4 mr-2" />
              退出登录
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // No visible tabs (has backend access but no specific permissions)
  if (visibleTabs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldX className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">权限不足</h2>
          <p className="text-muted-foreground mb-6">
            您没有任何模块的访问权限，请联系管理员
          </p>
          <Button onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            退出登录
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-8" />
            </Link>
            <span className="text-muted-foreground">/</span>
            <h1 className="text-lg font-semibold">管理后台</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              退出
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full max-w-4xl mb-6`} style={{ gridTemplateColumns: `repeat(${visibleTabs.length}, 1fr)` }}>
            {visibleTabs.map(tab => (
              <TabsTrigger key={tab.key} value={tab.key} className="flex items-center gap-2">
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {hasPermission('inquiries') && (
            <TabsContent value="inquiries" className="mt-0">
              <AdminInquiriesTab />
            </TabsContent>
          )}

          {hasPermission('products') && (
            <TabsContent value="products" className="mt-0">
              <AdminProductsTab />
            </TabsContent>
          )}

          {hasPermission('site_images') && (
            <TabsContent value="site-images" className="mt-0">
              <AdminSiteImagesTab />
            </TabsContent>
          )}

          {hasPermission('gallery') && (
            <TabsContent value="gallery" className="mt-0">
              <AdminGalleryTab />
            </TabsContent>
          )}

          {hasPermission('customer_service') && (
            <TabsContent value="customer-service" className="mt-0">
              <AdminCustomerServiceTab />
            </TabsContent>
          )}

          {hasPermission('blog') && (
            <TabsContent value="blog" className="mt-0">
              <AdminBlogTab />
            </TabsContent>
          )}

          {hasPermission('user_management') && (
            <TabsContent value="users" className="mt-0">
              <AdminUsersTab />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
