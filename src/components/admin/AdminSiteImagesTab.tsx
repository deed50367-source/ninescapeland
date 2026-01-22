import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ImageIcon, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import GalleryPicker from "./GalleryPicker";

interface SiteImageConfig {
  id: string;
  config_key: string;
  image_url: string;
  category: string;
  label: string | null;
  description: string | null;
}

const STORAGE_URL = `https://gianldlquknsdhfpqqfe.supabase.co/storage/v1/object/public/assets`;

const getFullUrl = (filePath: string): string => {
  if (filePath.startsWith('http')) return filePath;
  return `${STORAGE_URL}/${filePath}`;
};

const AdminSiteImagesTab = () => {
  const [configs, setConfigs] = useState<SiteImageConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("hero");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState<SiteImageConfig | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  const fetchConfigs = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("site_image_config")
      .select("*")
      .order("category")
      .order("config_key");
    
    if (error) {
      toast.error("加载配置失败");
      console.error(error);
    } else {
      setConfigs(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const handleSelectImage = async (url: string) => {
    if (!editingConfig) return;
    
    // 从完整URL提取相对路径
    const relativePath = url.replace(`${STORAGE_URL}/`, '');
    
    setSaving(editingConfig.id);
    const { error } = await supabase
      .from("site_image_config")
      .update({ image_url: relativePath })
      .eq("id", editingConfig.id);
    
    if (error) {
      toast.error("保存失败");
      console.error(error);
    } else {
      toast.success("图片已更新");
      setConfigs(prev => 
        prev.map(c => c.id === editingConfig.id ? { ...c, image_url: relativePath } : c)
      );
    }
    setSaving(null);
    setEditingConfig(null);
    setPickerOpen(false);
  };

  const openPicker = (config: SiteImageConfig) => {
    setEditingConfig(config);
    setPickerOpen(true);
  };

  const categories = [
    { value: "hero", label: "页面 Hero", description: "各页面顶部大图背景" },
    { value: "product", label: "产品图片", description: "产品卡片展示图（全景图为主）" },
    { value: "project", label: "项目案例", description: "案例展示图（局部细节为主）" },
    { value: "feature", label: "特性展示", description: "功能特性区块配图" },
  ];

  const filteredConfigs = configs.filter(c => c.category === activeCategory);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">页面配图管理</h2>
          <p className="text-muted-foreground">点击图片更换网站各位置的配图</p>
        </div>
        <Button variant="outline" onClick={fetchConfigs}>
          <RefreshCw className="w-4 h-4 mr-2" />
          刷新
        </Button>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-4">
          {categories.map(cat => (
            <TabsTrigger key={cat.value} value={cat.value}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(cat => (
          <TabsContent key={cat.value} value={cat.value} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{cat.label}</CardTitle>
                <CardDescription>{cat.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredConfigs.map(config => (
                    <div
                      key={config.id}
                      className="group relative border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                      onClick={() => openPicker(config)}
                    >
                      {/* Image Preview */}
                      <div className="aspect-video bg-muted relative">
                        <img
                          src={getFullUrl(config.image_url)}
                          alt={config.label || config.config_key}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                        
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          {saving === config.id ? (
                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                          ) : (
                            <div className="text-center text-white">
                              <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                              <span className="text-sm">点击更换图片</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Label */}
                      <div className="p-3 bg-card">
                        <h4 className="font-medium">{config.label || config.config_key}</h4>
                        {config.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {config.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {filteredConfigs.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                      <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>该分类暂无配置项</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Gallery Picker Dialog */}
      <GalleryPicker
        open={pickerOpen}
        onOpenChange={(open) => {
          setPickerOpen(open);
          if (!open) setEditingConfig(null);
        }}
        onSelect={handleSelectImage}
      />
    </div>
  );
};

export default AdminSiteImagesTab;
