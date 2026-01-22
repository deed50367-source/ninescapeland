import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
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
  Palette
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

const AdminDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAdmin, isLoading: authLoading, signOut } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("inquiries");

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
  if (authLoading) {
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

  // Logged in but not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldX className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">访问受限</h2>
          <p className="text-muted-foreground mb-2">
            当前账号没有管理员权限
          </p>
          <p className="text-sm text-muted-foreground mb-6 bg-muted px-3 py-2 rounded-md">
            {user.email}
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
          <p className="text-xs text-muted-foreground mt-6">
            如需管理员权限，请联系系统管理员
          </p>
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
          <TabsList className="grid w-full max-w-3xl grid-cols-6 mb-6">
            <TabsTrigger value="inquiries" className="flex items-center gap-2">
              <Inbox className="w-4 h-4" />
              <span className="hidden sm:inline">询盘</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">产品</span>
            </TabsTrigger>
            <TabsTrigger value="site-images" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">配图</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">图库</span>
            </TabsTrigger>
            <TabsTrigger value="customer-service" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">客服</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">博客</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries" className="mt-0">
            <AdminInquiriesTab />
          </TabsContent>

          <TabsContent value="products" className="mt-0">
            <AdminProductsTab />
          </TabsContent>

          <TabsContent value="site-images" className="mt-0">
            <AdminSiteImagesTab />
          </TabsContent>

          <TabsContent value="gallery" className="mt-0">
            <AdminGalleryTab />
          </TabsContent>

          <TabsContent value="customer-service" className="mt-0">
            <AdminCustomerServiceTab />
          </TabsContent>

          <TabsContent value="blog" className="mt-0">
            <AdminBlogTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
