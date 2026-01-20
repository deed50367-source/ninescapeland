import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Folder, Image as ImageIcon, ArrowLeft, Search, Loader2, Check } from "lucide-react";

interface AssetFolder {
  id: string;
  name: string;
  parent_id: string | null;
}

interface Asset {
  id: string;
  folder_id: string | null;
  file_name: string;
  file_path: string;
  mime_type: string | null;
}

interface GalleryPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string) => void;
  multiple?: boolean;
}

const GalleryPicker = ({ open, onOpenChange, onSelect, multiple = false }: GalleryPickerProps) => {
  const [folders, setFolders] = useState<AssetFolder[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [folderPath, setFolderPath] = useState<AssetFolder[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

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
    if (!error && data) setAssets(data);
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
    if (!open) return;
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchFolders(), fetchAssets(), fetchFolderPath()]);
      setIsLoading(false);
    };
    loadData();
  }, [open, fetchFolders, fetchAssets, fetchFolderPath]);

  useEffect(() => {
    if (!open) {
      setSelectedAssets([]);
      setCurrentFolderId(null);
      setSearchQuery("");
    }
  }, [open]);

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

  const handleSelect = (asset: Asset) => {
    const url = getAssetUrl(asset.file_path);
    if (multiple) {
      setSelectedAssets((prev) =>
        prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
      );
    } else {
      onSelect(url);
    }
  };

  const handleConfirm = () => {
    if (multiple && selectedAssets.length > 0) {
      selectedAssets.forEach((url) => onSelect(url));
    }
    onOpenChange(false);
  };

  const filteredAssets = assets.filter(
    (a) =>
      a.file_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      a.mime_type?.startsWith("image/")
  );

  const filteredFolders = folders.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>从图库选择图片</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="搜索图片..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => setCurrentFolderId(null)}
              className={`hover:text-primary ${
                !currentFolderId ? "font-medium" : "text-muted-foreground"
              }`}
            >
              图库根目录
            </button>
            {folderPath.map((folder, i) => (
              <div key={folder.id} className="flex items-center gap-2">
                <span className="text-muted-foreground">/</span>
                <button
                  onClick={() => setCurrentFolderId(folder.id)}
                  className={`hover:text-primary ${
                    i === folderPath.length - 1 ? "font-medium" : "text-muted-foreground"
                  }`}
                >
                  {folder.name}
                </button>
              </div>
            ))}
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3 max-h-[400px] overflow-y-auto p-1">
              {/* Back button */}
              {currentFolderId && (
                <div
                  className="aspect-square bg-muted/50 border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => {
                    const parentFolder = folderPath[folderPath.length - 2];
                    setCurrentFolderId(parentFolder?.id || null);
                  }}
                >
                  <ArrowLeft className="w-8 h-8 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-1">返回上级</span>
                </div>
              )}

              {/* Folders */}
              {filteredFolders.map((folder) => (
                <div
                  key={folder.id}
                  className="aspect-square bg-card border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setCurrentFolderId(folder.id)}
                >
                  <Folder className="w-10 h-10 text-primary" />
                  <span className="text-xs text-center mt-2 px-1 truncate w-full">
                    {folder.name}
                  </span>
                </div>
              ))}

              {/* Assets */}
              {filteredAssets.map((asset) => {
                const url = getAssetUrl(asset.file_path);
                const isSelected = selectedAssets.includes(url);
                return (
                  <div
                    key={asset.id}
                    className={`relative aspect-square bg-card border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-all ${
                      isSelected ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleSelect(asset)}
                  >
                    <img
                      src={getThumbnailUrl(asset.file_path)}
                      alt={asset.file_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = url;
                      }}
                    />
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1">
                      <p className="text-xs text-white truncate">{asset.file_name}</p>
                    </div>
                  </div>
                );
              })}

              {filteredFolders.length === 0 &&
                filteredAssets.length === 0 &&
                !currentFolderId && (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>图库为空</p>
                    <p className="text-sm">请先在素材图库中上传图片</p>
                  </div>
                )}
            </div>
          )}

          {/* Actions */}
          {multiple && selectedAssets.length > 0 && (
            <div className="flex items-center justify-between pt-4 border-t">
              <span className="text-sm text-muted-foreground">
                已选择 {selectedAssets.length} 张图片
              </span>
              <Button onClick={handleConfirm}>确认选择</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryPicker;