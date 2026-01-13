import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { UploadProgress, UploadItem } from "@/components/UploadProgress";
import { 
  FolderPlus, 
  Upload, 
  Folder, 
  Image as ImageIcon, 
  ArrowLeft, 
  Trash2, 
  Copy, 
  Check,
  Grid,
  List,
  Search,
  X,
  LogOut,
  LogIn,
  FolderUp
} from "lucide-react";
import { toast } from "sonner";

interface AssetFolder {
  id: string;
  name: string;
  parent_id: string | null;
  created_at: string;
}

interface Asset {
  id: string;
  folder_id: string | null;
  file_name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  width: number | null;
  height: number | null;
  created_at: string;
}

const AssetGallery = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { localizedPath } = useLocalizedPath();
  const { user, isAdmin, isLoading: authLoading, signOut } = useAdminAuth();
  const [folders, setFolders] = useState<AssetFolder[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [folderPath, setFolderPath] = useState<AssetFolder[]>([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Upload progress state
  const [uploadItems, setUploadItems] = useState<UploadItem[]>([]);
  const [isUploadMinimized, setIsUploadMinimized] = useState(false);
  const uploadCancelledRef = useRef(false);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const handleSignOut = async () => {
    await signOut();
    toast.success("已退出登录");
  };

  const fetchFolders = useCallback(async () => {
    let query = supabase
      .from("asset_folders")
      .select("*")
      .order("name");

    if (currentFolderId) {
      query = query.eq("parent_id", currentFolderId);
    } else {
      query = query.is("parent_id", null);
    }

    const { data, error } = await query;

    if (!error && data) {
      setFolders(data);
    }
  }, [currentFolderId]);

  const fetchAssets = useCallback(async () => {
    let query = supabase
      .from("assets")
      .select("*")
      .order("created_at", { ascending: false });

    if (currentFolderId) {
      query = query.eq("folder_id", currentFolderId);
    } else {
      query = query.is("folder_id", null);
    }

    const { data, error } = await query;

    if (!error && data) {
      setAssets(data);
    }
  }, [currentFolderId]);

  const fetchFolderPath = useCallback(async () => {
    if (!currentFolderId) {
      setFolderPath([]);
      return;
    }

    const path: AssetFolder[] = [];
    let folderId: string | null = currentFolderId;

    while (folderId) {
      const { data, error } = await supabase
        .from("asset_folders")
        .select("*")
        .eq("id", folderId)
        .single();

      if (error || !data) break;

      path.unshift(data);
      folderId = data.parent_id;
    }

    setFolderPath(path);
  }, [currentFolderId]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchFolders(), fetchAssets(), fetchFolderPath()]);
      setIsLoading(false);
    };
    loadData();
  }, [fetchFolders, fetchAssets, fetchFolderPath]);

  const createFolder = async () => {
    if (!newFolderName.trim()) return;

    const { error } = await supabase.from("asset_folders").insert({
      name: newFolderName.trim(),
      parent_id: currentFolderId,
    });

    if (error) {
      toast.error("创建文件夹失败");
      console.error(error);
    } else {
      toast.success("文件夹创建成功");
      setNewFolderName("");
      setIsCreateFolderOpen(false);
      fetchFolders();
    }
  };

  const deleteFolder = async (folderId: string) => {
    if (!confirm("确定要删除此文件夹吗？文件夹内的所有内容都将被删除。")) return;

    const { error } = await supabase
      .from("asset_folders")
      .delete()
      .eq("id", folderId);

    if (error) {
      toast.error("删除文件夹失败");
      console.error(error);
    } else {
      toast.success("文件夹已删除");
      fetchFolders();
    }
  };

  // Helper to get or create folder by path segments
  const getOrCreateFolderByPath = async (
    pathSegments: string[],
    baseParentId: string | null
  ): Promise<string | null> => {
    let parentId = baseParentId;

    for (const segment of pathSegments) {
      if (!segment) continue;

      // Check if folder exists
      const { data: existing } = await supabase
        .from("asset_folders")
        .select("id")
        .eq("name", segment)
        .eq("parent_id", parentId ?? "")
        .maybeSingle();

      if (existing) {
        parentId = existing.id;
      } else {
        // Create folder
        const { data: newFolder, error } = await supabase
          .from("asset_folders")
          .insert({ name: segment, parent_id: parentId })
          .select("id")
          .single();

        if (error || !newFolder) {
          console.error("Failed to create folder:", segment, error);
          return null;
        }
        parentId = newFolder.id;
      }
    }

    return parentId;
  };

  // Upload a single file with progress tracking
  const uploadSingleFile = async (
    file: File,
    itemId: string,
    targetFolderId: string | null,
    relativePath?: string
  ): Promise<boolean> => {
    if (uploadCancelledRef.current) return false;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const folderPrefix = targetFolderId || "root";
    const filePath = `${folderPrefix}/${fileName}`;

    // Update status to uploading
    setUploadItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, status: "uploading" as const, progress: 0 } : item
      )
    );

    try {
      // Upload with XMLHttpRequest for progress tracking
      const { data: uploadData, error: uploadError } = await new Promise<{
        data: any;
        error: any;
      }>((resolve) => {
        const xhr = new XMLHttpRequest();
        
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadItems((prev) =>
              prev.map((item) =>
                item.id === itemId ? { ...item, progress } : item
              )
            );
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({ data: { path: filePath }, error: null });
          } else {
            resolve({ data: null, error: new Error(`Upload failed: ${xhr.status}`) });
          }
        };

        xhr.onerror = () => {
          resolve({ data: null, error: new Error("Network error") });
        };

        // Get presigned URL and upload
        supabase.storage
          .from("assets")
          .upload(filePath, file, { upsert: false })
          .then(({ data, error }) => {
            if (error) {
              resolve({ data: null, error });
            } else {
              resolve({ data, error: null });
            }
          });
      });

      // Simpler approach: just use Supabase upload directly with progress simulation
      const { error: storageError } = await supabase.storage
        .from("assets")
        .upload(filePath, file);

      if (storageError) {
        throw storageError;
      }

      // Get image dimensions if it's an image
      let width: number | null = null;
      let height: number | null = null;

      if (file.type.startsWith("image/")) {
        const img = new window.Image();
        const url = URL.createObjectURL(file);
        await new Promise<void>((resolve) => {
          img.onload = () => {
            width = img.width;
            height = img.height;
            URL.revokeObjectURL(url);
            resolve();
          };
          img.onerror = () => resolve();
          img.src = url;
        });
      }

      // Insert asset record
      const { error: insertError } = await supabase.from("assets").insert({
        folder_id: targetFolderId,
        file_name: relativePath || file.name,
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
        width,
        height,
      });

      if (insertError) {
        throw insertError;
      }

      // Mark as success
      setUploadItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, status: "success" as const, progress: 100 } : item
        )
      );

      return true;
    } catch (error: any) {
      setUploadItems((prev) =>
        prev.map((item) =>
          item.id === itemId
            ? { ...item, status: "error" as const, error: error.message }
            : item
        )
      );
      return false;
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    uploadCancelledRef.current = false;
    setIsUploading(true);
    setIsUploadMinimized(false);

    // Create upload items
    const items: UploadItem[] = Array.from(files).map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
      file,
      status: "pending" as const,
      progress: 0,
    }));

    setUploadItems(items);

    // Process files sequentially
    for (const item of items) {
      if (uploadCancelledRef.current) break;
      await uploadSingleFile(item.file, item.id, currentFolderId);
    }

    setIsUploading(false);
    fetchAssets();
    fetchFolders();
    e.target.value = "";
  };

  const handleFolderUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    uploadCancelledRef.current = false;
    setIsUploading(true);
    setIsUploadMinimized(false);

    // Create upload items with relative paths
    const items: UploadItem[] = Array.from(files).map((file) => {
      const relativePath = (file as any).webkitRelativePath || file.name;
      return {
        id: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
        file,
        relativePath,
        status: "pending" as const,
        progress: 0,
      };
    });

    setUploadItems(items);

    // Group files by folder path
    const folderCache = new Map<string, string | null>();

    for (const item of items) {
      if (uploadCancelledRef.current) break;

      const pathParts = (item.relativePath || item.file.name).split("/");
      const fileName = pathParts.pop() || item.file.name;
      const folderPathStr = pathParts.join("/");

      let targetFolderId = currentFolderId;

      if (pathParts.length > 0) {
        // Check cache
        if (folderCache.has(folderPathStr)) {
          targetFolderId = folderCache.get(folderPathStr) || currentFolderId;
        } else {
          // Create folder structure
          targetFolderId = await getOrCreateFolderByPath(pathParts, currentFolderId);
          folderCache.set(folderPathStr, targetFolderId);
        }
      }

      await uploadSingleFile(item.file, item.id, targetFolderId, item.relativePath);
    }

    setIsUploading(false);
    fetchAssets();
    fetchFolders();
    e.target.value = "";
  };

  const handleCancelUpload = () => {
    uploadCancelledRef.current = true;
    toast.info("上传已取消");
  };

  const clearUploadItems = () => {
    setUploadItems([]);
  };

  const deleteAsset = async (asset: Asset) => {
    if (!confirm("确定要删除此文件吗？")) return;

    const { error: storageError } = await supabase.storage
      .from("assets")
      .remove([asset.file_path]);

    if (storageError) {
      toast.error("删除文件失败");
      console.error(storageError);
      return;
    }

    const { error: dbError } = await supabase
      .from("assets")
      .delete()
      .eq("id", asset.id);

    if (dbError) {
      toast.error("删除记录失败");
      console.error(dbError);
    } else {
      toast.success("文件已删除");
      fetchAssets();
      setSelectedAsset(null);
    }
  };

  const getAssetUrl = (filePath: string) => {
    const { data } = supabase.storage.from("assets").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast.success("链接已复制");
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "-";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const filteredAssets = assets.filter((asset) =>
    asset.file_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Redirect to login if not admin
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate(localizedPath("/admin-login"));
    }
  }, [authLoading, isAdmin, navigate, localizedPath]);

  if (authLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container-wide py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              素材图库
            </h1>
            <p className="text-muted-foreground mt-1">
              {isAdmin ? "管理和组织公司所有图片素材" : "浏览公司图片素材（登录管理员账号可编辑）"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin ? (
              <>
                <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <FolderPlus className="w-4 h-4 mr-2" />
                      新建文件夹
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>新建文件夹</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <Input
                        placeholder="文件夹名称"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && createFolder()}
                      />
                      <Button onClick={createFolder} className="w-full">
                        创建
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="default" size="sm" disabled={isUploading} asChild>
                  <label className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    批量上传
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                  </label>
                </Button>

                <Button variant="outline" size="sm" disabled={isUploading} asChild>
                  <label className="cursor-pointer">
                    <FolderUp className="w-4 h-4 mr-2" />
                    上传文件夹
                    <input
                      ref={folderInputRef}
                      type="file"
                      // @ts-ignore - webkitdirectory is not in types
                      webkitdirectory=""
                      // @ts-ignore
                      directory=""
                      multiple
                      className="hidden"
                      onChange={handleFolderUpload}
                      disabled={isUploading}
                    />
                  </label>
                </Button>

                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  退出
                </Button>
              </>
            ) : (
              <Button variant="default" size="sm" asChild>
                <Link to={localizedPath("/admin-login")}>
                  <LogIn className="w-4 h-4 mr-2" />
                  管理员登录
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Breadcrumb & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => setCurrentFolderId(null)}
              className="text-primary hover:underline font-medium"
            >
              根目录
            </button>
            {folderPath.map((folder, index) => (
              <span key={folder.id} className="flex items-center gap-2">
                <span className="text-muted-foreground">/</span>
                <button
                  onClick={() => setCurrentFolderId(folder.id)}
                  className={`hover:underline ${
                    index === folderPath.length - 1
                      ? "text-foreground font-medium"
                      : "text-primary"
                  }`}
                >
                  {folder.name}
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="搜索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            <div className="flex border rounded-md">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Back Button */}
        {currentFolderId && (
          <button
            onClick={() => {
              const parentFolder = folderPath[folderPath.length - 2];
              setCurrentFolderId(parentFolder?.id || null);
            }}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回上级
          </button>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Folders */}
            {filteredFolders.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-4">文件夹</h2>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                      : "space-y-2"
                  }
                >
                  {filteredFolders.map((folder) => (
                    <div
                      key={folder.id}
                      className={`group relative ${
                        viewMode === "grid"
                          ? "bg-card border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                          : "bg-card border rounded-lg p-3 flex items-center justify-between hover:shadow-md transition-shadow"
                      }`}
                      onClick={() => setCurrentFolderId(folder.id)}
                    >
                      <div
                        className={
                          viewMode === "grid"
                            ? "flex flex-col items-center gap-2"
                            : "flex items-center gap-3"
                        }
                      >
                        <Folder className="w-12 h-12 text-primary" />
                        <span className="text-sm font-medium truncate max-w-full">
                          {folder.name}
                        </span>
                      </div>
                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFolder(folder.id);
                          }}
                          className="absolute top-2 right-2 p-1 bg-destructive/10 text-destructive rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assets */}
            {filteredAssets.length > 0 ? (
              <div>
                <h2 className="text-lg font-medium mb-4">
                  文件 ({filteredAssets.length})
                </h2>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                      : "space-y-2"
                  }
                >
                  {filteredAssets.map((asset) => {
                    const url = getAssetUrl(asset.file_path);
                    return (
                      <div
                        key={asset.id}
                        className={`group relative ${
                          viewMode === "grid"
                            ? "bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                            : "bg-card border rounded-lg p-3 flex items-center justify-between hover:shadow-md transition-shadow"
                        }`}
                        onClick={() => setSelectedAsset(asset)}
                      >
                        {viewMode === "grid" ? (
                          <>
                            <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                              {asset.mime_type?.startsWith("image/") ? (
                                <img
                                  src={url}
                                  alt={asset.file_name}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <ImageIcon className="w-12 h-12 text-muted-foreground" />
                              )}
                            </div>
                            <div className="p-2">
                              <p className="text-xs truncate">{asset.file_name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(asset.file_size)}
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-muted rounded flex items-center justify-center overflow-hidden">
                                {asset.mime_type?.startsWith("image/") ? (
                                  <img
                                    src={url}
                                    alt={asset.file_name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                ) : (
                                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {asset.file_name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {formatFileSize(asset.file_size)}
                                  {asset.width && asset.height && (
                                    <span className="ml-2">
                                      {asset.width}×{asset.height}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyUrl(url);
                                }}
                                className="p-2 hover:bg-muted rounded transition-colors"
                              >
                                {copiedUrl === url ? (
                                  <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                              {isAdmin && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteAsset(asset);
                                  }}
                                  className="p-2 hover:bg-destructive/10 text-destructive rounded transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </>
                        )}
                        {viewMode === "grid" && (
                          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyUrl(url);
                              }}
                              className="p-1.5 bg-background/80 backdrop-blur rounded"
                            >
                              {copiedUrl === url ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                            {isAdmin && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteAsset(asset);
                                }}
                                className="p-1.5 bg-destructive/80 text-destructive-foreground rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              filteredFolders.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <ImageIcon className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">暂无文件</h3>
                  <p className="text-muted-foreground mb-4">
                    {isAdmin ? '点击"批量上传"或"上传文件夹"按钮添加素材' : "此文件夹暂无内容"}
                  </p>
                  {isAdmin && (
                    <div className="flex gap-2">
                      <Button asChild>
                        <label className="cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          批量上传
                          <input
                            type="file"
                            multiple
                            accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </Button>
                      <Button variant="outline" asChild>
                        <label className="cursor-pointer">
                          <FolderUp className="w-4 h-4 mr-2" />
                          上传文件夹
                          <input
                            type="file"
                            // @ts-ignore
                            webkitdirectory=""
                            // @ts-ignore
                            directory=""
                            multiple
                            className="hidden"
                            onChange={handleFolderUpload}
                          />
                        </label>
                      </Button>
                    </div>
                  )}
                </div>
              )
            )}
          </>
        )}
      </main>

      {/* Asset Preview Dialog */}
      <Dialog open={!!selectedAsset} onOpenChange={() => setSelectedAsset(null)}>
        <DialogContent className="max-w-4xl">
          {selectedAsset && (
            <>
              <DialogHeader>
                <DialogTitle className="truncate pr-8">
                  {selectedAsset.file_name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-muted rounded-lg overflow-hidden flex items-center justify-center max-h-[60vh]">
                  {selectedAsset.mime_type?.startsWith("image/") ? (
                    <img
                      src={getAssetUrl(selectedAsset.file_path)}
                      alt={selectedAsset.file_name}
                      className="max-w-full max-h-[60vh] object-contain"
                    />
                  ) : (
                    <div className="py-20">
                      <ImageIcon className="w-20 h-20 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">文件大小：</span>
                    <span className="ml-2">
                      {formatFileSize(selectedAsset.file_size)}
                    </span>
                  </div>
                  {selectedAsset.width && selectedAsset.height && (
                    <div>
                      <span className="text-muted-foreground">尺寸：</span>
                      <span className="ml-2">
                        {selectedAsset.width} × {selectedAsset.height}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">类型：</span>
                    <span className="ml-2">{selectedAsset.mime_type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">上传时间：</span>
                    <span className="ml-2">
                      {new Date(selectedAsset.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      copyUrl(getAssetUrl(selectedAsset.file_path))
                    }
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    复制链接
                  </Button>
                  {isAdmin && (
                    <Button
                      variant="destructive"
                      onClick={() => deleteAsset(selectedAsset)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      删除
                    </Button>
                  )}
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">文件链接：</p>
                  <code className="text-xs break-all">
                    {getAssetUrl(selectedAsset.file_path)}
                  </code>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Upload Progress Panel */}
      <UploadProgress
        items={uploadItems}
        onClose={clearUploadItems}
        onCancel={isUploading ? handleCancelUpload : undefined}
        isMinimized={isUploadMinimized}
        onToggleMinimize={() => setIsUploadMinimized(!isUploadMinimized)}
      />

      <Footer />
    </div>
  );
};

export default AssetGallery;
