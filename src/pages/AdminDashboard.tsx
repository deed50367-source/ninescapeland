import { useState } from "react";
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
  ArrowLeft,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

// Import admin components
import AdminGalleryTab from "@/components/admin/AdminGalleryTab";
import AdminCustomerServiceTab from "@/components/admin/AdminCustomerServiceTab";
import AdminBlogTab from "@/components/admin/AdminBlogTab";

const AdminDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAdmin, isLoading: authLoading, signOut } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("gallery");

  const handleSignOut = async () => {
    await signOut();
    toast.success("已退出登录");
    navigate("/admin/login");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">请先登录</h2>
          <p className="text-muted-foreground mb-6">登录后才能进入管理后台</p>
          <Link to="/admin/login">
            <Button>前往登录</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">访问受限</h2>
          <p className="text-muted-foreground mb-6">当前账号（{user.email}）没有管理员权限</p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/admin/login">
              <Button variant="outline">切换账号</Button>
            </Link>
            <Button onClick={handleSignOut}>退出登录</Button>
          </div>
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
            <Link to="/en" className="flex items-center gap-2">
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
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">素材图库</span>
              <span className="sm:hidden">图库</span>
            </TabsTrigger>
            <TabsTrigger value="customer-service" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">在线客服</span>
              <span className="sm:hidden">客服</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">博客文章</span>
              <span className="sm:hidden">博客</span>
            </TabsTrigger>
          </TabsList>

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
