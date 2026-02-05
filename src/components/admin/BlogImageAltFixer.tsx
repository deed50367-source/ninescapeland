 import { useState } from "react";
 import { supabase } from "@/integrations/supabase/client";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { ScrollArea } from "@/components/ui/scroll-area";
 import { Loader2, Image as ImageIcon, Check, AlertTriangle, Search } from "lucide-react";
 import { toast } from "sonner";
 
 interface ImageInfo {
   src: string;
   alt: string;
   index: number;
 }
 
 interface PostWithImages {
   id: string;
   title: string;
   slug: string;
   language: string;
   images: ImageInfo[];
   content: string;
 }
 
 const LANGUAGES: Record<string, { name: string; flag: string }> = {
   en: { name: 'English', flag: '🇺🇸' },
   ar: { name: 'العربية', flag: '🇸🇦' },
   de: { name: 'Deutsch', flag: '🇩🇪' },
   es: { name: 'Español', flag: '🇪🇸' },
   pt: { name: 'Português', flag: '🇧🇷' },
 };
 
 const BlogImageAltFixer = () => {
   const [isScanning, setIsScanning] = useState(false);
   const [postsWithIssues, setPostsWithIssues] = useState<PostWithImages[]>([]);
   const [editingPost, setEditingPost] = useState<string | null>(null);
   const [altTexts, setAltTexts] = useState<Record<string, Record<number, string>>>({});
   const [isSaving, setIsSaving] = useState(false);
   const [hasScanned, setHasScanned] = useState(false);
 
   const extractImagesFromContent = (content: string): ImageInfo[] => {
     const images: ImageInfo[] = [];
     const imgRegex = /<img[^>]*>/gi;
     let match;
     let index = 0;
 
     while ((match = imgRegex.exec(content)) !== null) {
       const imgTag = match[0];
       const srcMatch = imgTag.match(/src=["']([^"']+)["']/i);
       const altMatch = imgTag.match(/alt=["']([^"']*)["']/i);
       
       const src = srcMatch ? srcMatch[1] : '';
       const alt = altMatch ? altMatch[1] : '';
       
       // Only include images with missing or empty alt
       if (!alt || alt.trim() === '') {
         images.push({ src, alt, index });
       }
       index++;
     }
 
     return images;
   };
 
   const scanPosts = async () => {
     setIsScanning(true);
     setHasScanned(true);
     
     try {
       const { data, error } = await supabase
         .from("blog_posts")
         .select("id, title, slug, language, content")
         .eq("status", "published")
         .not("content", "is", null);
 
       if (error) throw error;
 
       const postsWithMissingAlt: PostWithImages[] = [];
 
       for (const post of data || []) {
         if (!post.content) continue;
         
         const images = extractImagesFromContent(post.content);
         if (images.length > 0) {
           postsWithMissingAlt.push({
             id: post.id,
             title: post.title,
             slug: post.slug,
             language: post.language,
             images,
             content: post.content
           });
         }
       }
 
       setPostsWithIssues(postsWithMissingAlt);
       
       if (postsWithMissingAlt.length === 0) {
         toast.success("所有图片都已有 Alt 描述！");
       } else {
         toast.info(`发现 ${postsWithMissingAlt.length} 篇文章共 ${postsWithMissingAlt.reduce((sum, p) => sum + p.images.length, 0)} 张图片缺少 Alt`);
       }
     } catch (error: any) {
       console.error("Error scanning posts:", error);
       toast.error("扫描失败: " + error.message);
     } finally {
       setIsScanning(false);
     }
   };
 
   const handleAltChange = (postId: string, imageIndex: number, value: string) => {
     setAltTexts(prev => ({
       ...prev,
       [postId]: {
         ...(prev[postId] || {}),
         [imageIndex]: value
       }
     }));
   };
 
   const saveAltTexts = async (post: PostWithImages) => {
     const postAltTexts = altTexts[post.id];
     if (!postAltTexts || Object.keys(postAltTexts).length === 0) {
       toast.error("请至少输入一个 Alt 描述");
       return;
     }
 
     setIsSaving(true);
 
     try {
       let updatedContent = post.content;
       let imgIndex = 0;
       
       // Replace img tags with updated alt attributes
       updatedContent = updatedContent.replace(/<img([^>]*)>/gi, (match, attrs) => {
         const currentIndex = imgIndex++;
         const newAlt = postAltTexts[currentIndex];
         
         if (newAlt !== undefined && newAlt.trim() !== '') {
           // Check if alt attribute exists
           if (/alt=["'][^"']*["']/i.test(attrs)) {
             // Replace existing alt
             attrs = attrs.replace(/alt=["'][^"']*["']/i, `alt="${newAlt.trim()}"`);
           } else {
             // Add alt attribute
             attrs = attrs.trim() + ` alt="${newAlt.trim()}"`;
           }
         }
         
         return `<img${attrs}>`;
       });
 
       const { error } = await supabase
         .from("blog_posts")
         .update({ content: updatedContent })
         .eq("id", post.id);
 
       if (error) throw error;
 
       toast.success(`"${post.title}" 的图片 Alt 已更新`);
       
       // Remove fixed post from list
       setPostsWithIssues(prev => prev.filter(p => p.id !== post.id));
       setAltTexts(prev => {
         const newAltTexts = { ...prev };
         delete newAltTexts[post.id];
         return newAltTexts;
       });
       setEditingPost(null);
     } catch (error: any) {
       console.error("Error saving alt texts:", error);
       toast.error("保存失败: " + error.message);
     } finally {
       setIsSaving(false);
     }
   };
 
   return (
     <div className="space-y-6">
       <div className="flex items-center justify-between">
         <div>
           <h3 className="text-lg font-semibold">图片 Alt 属性修复工具</h3>
           <p className="text-sm text-muted-foreground">
             扫描并修复博客文章中缺少 Alt 描述的图片，提升 SEO 和无障碍访问
           </p>
         </div>
         <Button onClick={scanPosts} disabled={isScanning}>
           {isScanning ? (
             <>
               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
               扫描中...
             </>
           ) : (
             <>
               <Search className="w-4 h-4 mr-2" />
               扫描文章
             </>
           )}
         </Button>
       </div>
 
       {hasScanned && postsWithIssues.length === 0 && !isScanning && (
         <Card className="border-success/50 bg-success/5">
           <CardContent className="flex items-center gap-3 py-6">
             <Check className="w-8 h-8 text-success" />
             <div>
               <p className="font-medium">所有图片都已有 Alt 描述</p>
               <p className="text-sm text-muted-foreground">太棒了！您的博客图片都符合 SEO 最佳实践</p>
             </div>
           </CardContent>
         </Card>
       )}
 
       {postsWithIssues.length > 0 && (
         <div className="space-y-4">
           <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
             <AlertTriangle className="w-5 h-5" />
             <span className="font-medium">
               发现 {postsWithIssues.length} 篇文章的 {postsWithIssues.reduce((sum, p) => sum + p.images.length, 0)} 张图片缺少 Alt 描述
             </span>
           </div>
 
           <ScrollArea className="h-[500px]">
             <div className="space-y-4 pr-4">
               {postsWithIssues.map(post => (
                 <Card key={post.id}>
                   <CardHeader className="pb-3">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                         <CardTitle className="text-base">{post.title}</CardTitle>
                         <Badge variant="outline">
                           {LANGUAGES[post.language]?.flag} {LANGUAGES[post.language]?.name}
                         </Badge>
                         <Badge variant="secondary">
                           {post.images.length} 张图片
                         </Badge>
                       </div>
                       <Button
                         variant="outline"
                         size="sm"
                         onClick={() => setEditingPost(editingPost === post.id ? null : post.id)}
                       >
                         {editingPost === post.id ? "收起" : "展开修复"}
                       </Button>
                     </div>
                   </CardHeader>
 
                   {editingPost === post.id && (
                     <CardContent className="pt-0">
                       <div className="space-y-4">
                         {post.images.map((img, idx) => (
                           <div key={idx} className="flex gap-4 items-start p-3 bg-muted/50 rounded-lg">
                             <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                               <img 
                                 src={img.src} 
                                 alt="Preview" 
                                 className="w-full h-full object-cover"
                                 onError={(e) => {
                                   (e.target as HTMLImageElement).src = '/placeholder.svg';
                                 }}
                               />
                             </div>
                             <div className="flex-1 space-y-2">
                               <p className="text-xs text-muted-foreground truncate max-w-md">
                                 {img.src}
                               </p>
                               <Input
                                 placeholder="输入图片描述，例如：儿童在蹦床公园玩耍"
                                 value={altTexts[post.id]?.[img.index] || ''}
                                 onChange={(e) => handleAltChange(post.id, img.index, e.target.value)}
                               />
                               <p className="text-xs text-muted-foreground">
                                 请简洁描述图片内容，帮助搜索引擎和视障用户理解
                               </p>
                             </div>
                           </div>
                         ))}
 
                         <div className="flex justify-end gap-2">
                           <Button
                             variant="outline"
                             onClick={() => setEditingPost(null)}
                           >
                             取消
                           </Button>
                           <Button
                             onClick={() => saveAltTexts(post)}
                             disabled={isSaving}
                           >
                             {isSaving ? (
                               <>
                                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                 保存中...
                               </>
                             ) : (
                               <>
                                 <Check className="w-4 h-4 mr-2" />
                                 保存 Alt 描述
                               </>
                             )}
                           </Button>
                         </div>
                       </div>
                     </CardContent>
                   )}
                 </Card>
               ))}
             </div>
           </ScrollArea>
         </div>
       )}
 
       {!hasScanned && (
         <Card className="border-dashed">
           <CardContent className="flex flex-col items-center justify-center py-12">
             <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
             <p className="text-muted-foreground text-center">
               点击"扫描文章"按钮检查缺少 Alt 描述的图片
             </p>
           </CardContent>
         </Card>
       )}
     </div>
   );
 };
 
 export default BlogImageAltFixer;