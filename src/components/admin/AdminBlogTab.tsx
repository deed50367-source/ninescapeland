import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  Search,
  Calendar,
  Loader2,
  FileText,
  Send,
  Image as ImageIcon,
  Settings,
  FileEdit
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import RichTextEditor from "./RichTextEditor";
import GalleryPicker from "./GalleryPicker";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  cover_image: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
}

const AdminBlogTab = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    title_en: "", // English title for slug generation
    slug: "",
    content: "",
    excerpt: "",
    cover_image: "",
    status: "draft",
    seo_title: "",
    seo_description: "",
    seo_keywords: ""
  });

  const fetchPosts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      toast.error("获取文章失败");
    } else {
      setPosts(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Only keep English letters and numbers
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      // Auto-fill SEO title if empty
      seo_title: prev.seo_title || title
    }));
  };

  const handleEnglishTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title_en = e.target.value;
    setFormData(prev => ({
      ...prev,
      title_en,
      slug: generateSlug(title_en)
    }));
  };

  const openEditor = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        title_en: "", // Extract from slug for display
        slug: post.slug,
        content: post.content || "",
        excerpt: post.excerpt || "",
        cover_image: post.cover_image || "",
        status: post.status,
        seo_title: post.seo_title || "",
        seo_description: post.seo_description || "",
        seo_keywords: post.seo_keywords || ""
      });
    } else {
      setEditingPost(null);
      setFormData({
        title: "",
        title_en: "",
        slug: "",
        content: "",
        excerpt: "",
        cover_image: "",
        status: "draft",
        seo_title: "",
        seo_description: "",
        seo_keywords: ""
      });
    }
    setIsEditorOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error("请输入标题");
      return;
    }

    if (!formData.slug.trim()) {
      toast.error("请输入Slug");
      return;
    }

    setIsSaving(true);

    try {
      const postData = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        content: formData.content || null,
        excerpt: formData.excerpt || null,
        cover_image: formData.cover_image || null,
        status: formData.status,
        published_at: formData.status === "published" ? new Date().toISOString() : null,
        seo_title: formData.seo_title || null,
        seo_description: formData.seo_description || null,
        seo_keywords: formData.seo_keywords || null
      };

      if (editingPost) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", editingPost.id);

        if (error) throw error;
        toast.success("文章已更新");
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert(postData);

        if (error) throw error;
        toast.success("文章已创建");
      }

      setIsEditorOpen(false);
      fetchPosts();
    } catch (error: any) {
      console.error("Error saving post:", error);
      if (error.code === "23505") {
        toast.error("Slug已存在，请使用其他名称");
      } else {
        toast.error("保存失败: " + error.message);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`确定要删除 "${post.title}" 吗?`)) return;

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", post.id);

    if (error) {
      toast.error("删除失败: " + error.message);
    } else {
      toast.success("文章已删除");
      fetchPosts();
    }
  };

  const handlePublish = async (post: BlogPost) => {
    const newStatus = post.status === "published" ? "draft" : "published";
    
    const { error } = await supabase
      .from("blog_posts")
      .update({ 
        status: newStatus,
        published_at: newStatus === "published" ? new Date().toISOString() : null
      })
      .eq("id", post.id);

    if (error) {
      toast.error("操作失败: " + error.message);
    } else {
      toast.success(newStatus === "published" ? "文章已发布" : "文章已下架");
      fetchPosts();
    }
  };

  const handleCoverImageSelect = (url: string) => {
    setFormData(prev => ({ ...prev, cover_image: url }));
    setIsGalleryOpen(false);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-success">已发布</Badge>;
      case "draft":
        return <Badge variant="secondary">草稿</Badge>;
      case "archived":
        return <Badge variant="outline">已归档</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="draft">草稿</SelectItem>
              <SelectItem value="published">已发布</SelectItem>
              <SelectItem value="archived">已归档</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => openEditor()}>
          <Plus className="w-4 h-4 mr-2" />
          新建文章
        </Button>
      </div>

      {/* Posts List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filteredPosts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {searchQuery || statusFilter !== "all" ? "未找到匹配的文章" : "暂无文章，点击上方按钮创建"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  {/* Thumbnail */}
                  {post.cover_image && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      <img 
                        src={post.cover_image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{post.title}</h3>
                      {getStatusBadge(post.status)}
                    </div>
                    <p className="text-sm text-muted-foreground truncate mb-2">
                      /{post.slug}
                    </p>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        创建: {format(new Date(post.created_at), "yyyy-MM-dd HH:mm")}
                      </span>
                      {post.published_at && (
                        <span className="flex items-center gap-1">
                          <Send className="w-3 h-3" />
                          发布: {format(new Date(post.published_at), "yyyy-MM-dd HH:mm")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handlePublish(post)}
                      title={post.status === "published" ? "下架" : "发布"}
                    >
                      {post.status === "published" ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditor(post)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(post)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {editingPost ? "编辑文章" : "新建文章"}
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="content" className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <FileEdit className="w-4 h-4" />
                内容编辑
              </TabsTrigger>
              <TabsTrigger value="seo" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                SEO设置
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto py-4">
              <TabsContent value="content" className="mt-0 space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">标题 *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={handleTitleChange}
                      placeholder="文章标题"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title_en">英文标题 (用于生成URL) *</Label>
                    <Input
                      id="title_en"
                      value={formData.title_en}
                      onChange={handleEnglishTitleChange}
                      placeholder="English Title for URL"
                    />
                  </div>
                </div>
                
                {/* Slug Display */}
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL) *</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">/blog/</span>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="article-slug"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    输入英文标题后自动生成，也可手动修改
                  </p>
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                  <Label>封面图片</Label>
                  <div className="flex gap-4 items-start">
                    {formData.cover_image ? (
                      <div className="relative w-40 h-24 rounded-lg overflow-hidden bg-muted">
                        <img 
                          src={formData.cover_image} 
                          alt="Cover" 
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1"
                          onClick={() => setFormData(prev => ({ ...prev, cover_image: "" }))}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="w-40 h-24 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/30">
                        <ImageIcon className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsGalleryOpen(true)}
                    >
                      <ImageIcon className="w-4 h-4 mr-2" />
                      从图库选择
                    </Button>
                  </div>
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <Label htmlFor="excerpt">摘要</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="文章摘要，用于列表显示..."
                    rows={2}
                  />
                </div>

                {/* Rich Text Content */}
                <div className="space-y-2">
                  <Label>文章内容</Label>
                  <RichTextEditor
                    content={formData.content}
                    onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                    placeholder="开始编写文章内容..."
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label>状态</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">草稿</SelectItem>
                      <SelectItem value="published">已发布</SelectItem>
                      <SelectItem value="archived">已归档</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="seo" className="mt-0 space-y-4">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="seo_title">SEO标题</Label>
                      <Input
                        id="seo_title"
                        value={formData.seo_title}
                        onChange={(e) => setFormData(prev => ({ ...prev, seo_title: e.target.value }))}
                        placeholder="搜索引擎显示的标题（建议60字符内）"
                        maxLength={70}
                      />
                      <p className="text-xs text-muted-foreground">
                        {formData.seo_title.length}/70 字符
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seo_description">SEO描述</Label>
                      <Textarea
                        id="seo_description"
                        value={formData.seo_description}
                        onChange={(e) => setFormData(prev => ({ ...prev, seo_description: e.target.value }))}
                        placeholder="搜索引擎显示的描述（建议160字符内）"
                        rows={3}
                        maxLength={200}
                      />
                      <p className="text-xs text-muted-foreground">
                        {formData.seo_description.length}/200 字符
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seo_keywords">SEO关键词</Label>
                      <Input
                        id="seo_keywords"
                        value={formData.seo_keywords}
                        onChange={(e) => setFormData(prev => ({ ...prev, seo_keywords: e.target.value }))}
                        placeholder="关键词，用英文逗号分隔"
                      />
                      <p className="text-xs text-muted-foreground">
                        多个关键词请用英文逗号（,）分隔
                      </p>
                    </div>

                    {/* Preview */}
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">搜索结果预览：</p>
                      <div className="space-y-1">
                        <p className="text-primary text-lg hover:underline cursor-pointer truncate">
                          {formData.seo_title || formData.title || "文章标题"}
                        </p>
                        <p className="text-sm text-success truncate">
                          indoorplaygroundsolution.com/blog/{formData.slug || "article-slug"}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {formData.seo_description || formData.excerpt || "文章描述将显示在这里..."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsEditorOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingPost ? "保存" : "创建"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Gallery Picker for Cover Image */}
      <GalleryPicker
        open={isGalleryOpen}
        onOpenChange={setIsGalleryOpen}
        onSelect={handleCoverImageSelect}
      />
    </div>
  );
};

export default AdminBlogTab;
