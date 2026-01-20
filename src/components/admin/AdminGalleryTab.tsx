import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UploadProgress, UploadItem } from "@/components/UploadProgress";
import { compressImage, generateThumbnail, isCompressibleImage } from "@/utils/imageCompression";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FolderPlus, Upload, Folder, Image as ImageIcon, ArrowLeft, Trash2, Copy, Check,
  Grid, List, Search, X, FolderUp, ImagePlus, Loader2, Pencil
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

const AdminGalleryTab = () => {
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
  const [uploadItems, setUploadItems] = useState<UploadItem[]>([]);
  const [isUploadMinimized, setIsUploadMinimized] = useState(false);
  const uploadCancelledRef = useRef(false);
  const folderInputRef = useRef<HTMLInputElement>(null);
  
  // Rename states
  const [isRenameFolderOpen, setIsRenameFolderOpen] = useState(false);
  const [isRenameAssetOpen, setIsRenameAssetOpen] = useState(false);
  const [renamingFolder, setRenamingFolder] = useState<AssetFolder | null>(null);
  const [renamingAsset, setRenamingAsset] = useState<Asset | null>(null);
  const [newName, setNewName] = useState("");

  const fetchFolders = useCallback(async () => {
    let query = supabase.from("asset_folders").select("*").order("name");
    if (currentFolderId) {
      query = query.eq("parent_id", currentFolderId);
    } else {
      query = query.is("parent_id", null);
    }
    const { data, error } = await query;
    if (!error && data) setFolders(data);
  }, [currentFolderId]);

  const fetchAssets = useCallback(async () => {
    let query = supabase.from("assets").select("*").order("created_at", { ascending: false });
    if (currentFolderId) {
      query = query.eq("folder_id", currentFolderId);
    } else {
      query = query.is("folder_id", null);
    }
    const { data, error } = await query;
    if (!error && data) setAssets(data);
  }, [currentFolderId]);

  const fetchFolderPath = useCallback(async () => {
    if (!currentFolderId) { setFolderPath([]); return; }
    const path: AssetFolder[] = [];
    let folderId: string | null = currentFolderId;
    while (folderId) {
      const { data, error } = await supabase.from("asset_folders").select("*").eq("id", folderId).single();
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
    const { error } = await supabase.from("asset_folders").insert({ name: newFolderName.trim(), parent_id: currentFolderId });
    if (error) { toast.error("Failed to create folder"); } 
    else { toast.success("Folder created successfully"); setNewFolderName(""); setIsCreateFolderOpen(false); fetchFolders(); }
  };

  const renameFolder = async () => {
    if (!renamingFolder || !newName.trim()) return;
    const { error } = await supabase.from("asset_folders").update({ name: newName.trim() }).eq("id", renamingFolder.id);
    if (error) { 
      toast.error("Failed to rename folder"); 
    } else { 
      toast.success("Folder renamed successfully"); 
      setNewName(""); 
      setRenamingFolder(null);
      setIsRenameFolderOpen(false); 
      fetchFolders();
      fetchFolderPath();
    }
  };

  const renameAsset = async () => {
    if (!renamingAsset || !newName.trim()) return;
    const { error } = await supabase.from("assets").update({ file_name: newName.trim() }).eq("id", renamingAsset.id);
    if (error) { 
      toast.error("Failed to rename file"); 
    } else { 
      toast.success("File renamed successfully"); 
      setNewName(""); 
      setRenamingAsset(null);
      setIsRenameAssetOpen(false); 
      fetchAssets();
    }
  };

  const openRenameFolder = (folder: AssetFolder, e: React.MouseEvent) => {
    e.stopPropagation();
    setRenamingFolder(folder);
    setNewName(folder.name);
    setIsRenameFolderOpen(true);
  };

  const openRenameAsset = (asset: Asset, e: React.MouseEvent) => {
    e.stopPropagation();
    setRenamingAsset(asset);
    // Remove extension for editing, will preserve original extension
    const lastDotIndex = asset.file_name.lastIndexOf(".");
    const nameWithoutExt = lastDotIndex > 0 ? asset.file_name.substring(0, lastDotIndex) : asset.file_name;
    setNewName(nameWithoutExt);
    setIsRenameAssetOpen(true);
  };

  const getFileExtension = (fileName: string) => {
    const lastDotIndex = fileName.lastIndexOf(".");
    return lastDotIndex > 0 ? fileName.substring(lastDotIndex) : "";
  };

  const handleRenameAssetSubmit = async () => {
    if (!renamingAsset || !newName.trim()) return;
    const extension = getFileExtension(renamingAsset.file_name);
    const finalName = newName.trim() + extension;
    const { error } = await supabase.from("assets").update({ file_name: finalName }).eq("id", renamingAsset.id);
    if (error) { 
      toast.error("Failed to rename file"); 
    } else { 
      toast.success("File renamed successfully"); 
      setNewName(""); 
      setRenamingAsset(null);
      setIsRenameAssetOpen(false); 
      fetchAssets();
    }
  };

  const deleteAsset = async (asset: Asset) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    await supabase.storage.from("assets").remove([asset.file_path]);
    await supabase.from("assets").delete().eq("id", asset.id);
    toast.success("File deleted");
    fetchAssets();
    setSelectedAsset(null);
  };

  const deleteFolder = async (folderId: string) => {
    if (!confirm("Are you sure you want to delete this folder?")) return;
    await supabase.from("asset_folders").delete().eq("id", folderId);
    toast.success("Folder deleted");
    fetchFolders();
  };

  const getAssetUrl = (filePath: string) => {
    const { data } = supabase.storage.from("assets").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const getThumbnailUrl = (filePath: string) => {
    const parts = filePath.split("/");
    const fileName = parts.pop() || "";
    const folderPath = parts.join("/");
    const thumbPath = folderPath ? `${folderPath}/thumb_${fileName}` : `thumb_${fileName}`;
    const { data } = supabase.storage.from("assets").getPublicUrl(thumbPath);
    return data.publicUrl;
  };

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast.success("Link copied");
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "-";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);
    
    for (const file of Array.from(files)) {
      const filePath = `${currentFolderId || "root"}/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("assets").upload(filePath, file);
      if (!error) {
        await supabase.from("assets").insert({
          folder_id: currentFolderId,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type
        });
      }
    }
    
    setIsUploading(false);
    fetchAssets();
    toast.success("Upload complete");
    e.target.value = "";
  };

  const filteredAssets = assets.filter(a => a.file_name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredFolders = folders.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm"><FolderPlus className="w-4 h-4 mr-2" />New Folder</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New Folder</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-4">
                <Input placeholder="Folder name" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && createFolder()} />
                <Button onClick={createFolder} className="w-full">Create</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="default" size="sm" disabled={isUploading} asChild>
            <label className="cursor-pointer"><Upload className="w-4 h-4 mr-2" />Upload Files<input type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFileUpload} disabled={isUploading} /></label>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
          </div>
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}><Grid className="w-4 h-4" /></Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}><List className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button onClick={() => setCurrentFolderId(null)} className={`hover:text-primary ${!currentFolderId ? "font-medium" : "text-muted-foreground"}`}>Root</button>
        {folderPath.map((folder, i) => (
          <div key={folder.id} className="flex items-center gap-2">
            <span className="text-muted-foreground">/</span>
            <button onClick={() => setCurrentFolderId(folder.id)} className={`hover:text-primary ${i === folderPath.length - 1 ? "font-medium" : "text-muted-foreground"}`}>{folder.name}</button>
          </div>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4" : "space-y-2"}>
          {filteredFolders.map((folder) => (
            <div key={folder.id} className={`group relative ${viewMode === "grid" ? "aspect-square" : "flex items-center gap-3 p-3"} bg-card border rounded-lg hover:shadow-md transition-shadow cursor-pointer`} onClick={() => setCurrentFolderId(folder.id)}>
              <Folder className={`${viewMode === "grid" ? "w-12 h-12 mx-auto mt-6" : "w-6 h-6"} text-primary`} />
              <span className={`${viewMode === "grid" ? "block text-center mt-2 px-2" : ""} text-sm font-medium truncate`}>{folder.name}</span>
              <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => openRenameFolder(folder, e)}><Pencil className="w-3 h-3" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); deleteFolder(folder.id); }}><Trash2 className="w-3 h-3 text-destructive" /></Button>
              </div>
            </div>
          ))}
          {filteredAssets.map((asset) => (
            <div key={asset.id} className={`group relative ${viewMode === "grid" ? "aspect-square" : "flex items-center gap-3 p-3"} bg-card border rounded-lg hover:shadow-md transition-shadow overflow-hidden`}>
              {asset.mime_type?.startsWith("image/") ? (
                <img src={getThumbnailUrl(asset.file_path)} alt={asset.file_name} className={`${viewMode === "grid" ? "w-full h-full object-cover" : "w-12 h-12 object-cover rounded"}`} onError={(e) => { e.currentTarget.src = getAssetUrl(asset.file_path); }} />
              ) : (
                <div className={`${viewMode === "grid" ? "w-full h-full" : "w-12 h-12"} flex items-center justify-center bg-muted`}><ImageIcon className="w-8 h-8 text-muted-foreground" /></div>
              )}
              <div className={viewMode === "list" ? "flex-1 min-w-0" : "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2"}>
                <p className={`text-sm truncate ${viewMode === "grid" ? "text-white" : ""}`}>{asset.file_name}</p>
                {viewMode === "list" && <p className="text-xs text-muted-foreground">{formatFileSize(asset.file_size)}</p>}
              </div>
              <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100">
                <Button variant="secondary" size="icon" className="h-7 w-7" onClick={(e) => openRenameAsset(asset, e)}><Pencil className="w-3 h-3" /></Button>
                <Button variant="secondary" size="icon" className="h-7 w-7" onClick={() => copyUrl(getAssetUrl(asset.file_path))}>{copiedUrl === getAssetUrl(asset.file_path) ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}</Button>
                <Button variant="secondary" size="icon" className="h-7 w-7" onClick={() => deleteAsset(asset)}><Trash2 className="w-3 h-3 text-destructive" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && filteredFolders.length === 0 && filteredAssets.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>This folder is empty</p>
        </div>
      )}

      {uploadItems.length > 0 && (
        <UploadProgress 
          items={uploadItems} 
          isMinimized={isUploadMinimized} 
          onToggleMinimize={() => setIsUploadMinimized(!isUploadMinimized)} 
          onCancel={() => { uploadCancelledRef.current = true; }} 
          onClose={() => setUploadItems([])}
        />
      )}

      {/* Rename Folder Dialog */}
      <Dialog open={isRenameFolderOpen} onOpenChange={setIsRenameFolderOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Rename Folder</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-4">
            <Input 
              placeholder="New folder name" 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              onKeyDown={(e) => e.key === "Enter" && renameFolder()} 
              autoFocus
            />
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsRenameFolderOpen(false)} className="flex-1">Cancel</Button>
              <Button onClick={renameFolder} className="flex-1">Rename</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rename Asset Dialog */}
      <Dialog open={isRenameAssetOpen} onOpenChange={setIsRenameAssetOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Rename File</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <Input 
                placeholder="New file name" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
                onKeyDown={(e) => e.key === "Enter" && handleRenameAssetSubmit()} 
                autoFocus
                className="flex-1"
              />
              {renamingAsset && (
                <span className="text-sm text-muted-foreground">{getFileExtension(renamingAsset.file_name)}</span>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsRenameAssetOpen(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleRenameAssetSubmit} className="flex-1">Rename</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGalleryTab;