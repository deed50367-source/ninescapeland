import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ImageIcon, RefreshCw, History, Clock, User } from "lucide-react";
import { toast } from "sonner";
import GalleryPicker from "./GalleryPicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

interface SiteImageConfig {
  id: string;
  config_key: string;
  image_url: string;
  category: string;
  label: string | null;
  description: string | null;
}

interface ImageConfigLog {
  id: string;
  config_key: string;
  old_image_url: string | null;
  new_image_url: string;
  changed_by: string | null;
  changed_at: string;
  user_email: string | null;
}

const STORAGE_URL = `https://gianldlquknsdhfpqqfe.supabase.co/storage/v1/object/public/assets`;

const getFullUrl = (filePath: string): string => {
  if (!filePath) return '/placeholder.svg';
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
  const [logsOpen, setLogsOpen] = useState(false);
  const [logs, setLogs] = useState<ImageConfigLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);

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

  const fetchLogs = async () => {
    setLogsLoading(true);
    const { data, error } = await supabase
      .from("site_image_config_logs")
      .select("*")
      .order("changed_at", { ascending: false })
      .limit(50);
    
    if (error) {
      toast.error("加载日志失败");
      console.error(error);
    } else {
      setLogs(data || []);
    }
    setLogsLoading(false);
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const handleSelectImage = async (url: string) => {
    if (!editingConfig) return;
    
    // 从完整URL提取相对路径
    const relativePath = url.replace(`${STORAGE_URL}/`, '');
    const oldImageUrl = editingConfig.image_url;
    
    setSaving(editingConfig.id);
    
    // 获取当前用户信息
    const { data: { user } } = await supabase.auth.getUser();
    
    // 更新配置
    const { error: updateError } = await supabase
      .from("site_image_config")
      .update({ image_url: relativePath })
      .eq("id", editingConfig.id);
    
    if (updateError) {
      toast.error("保存失败");
      console.error(updateError);
      setSaving(null);
      return;
    }
    
    // 记录操作日志
    const { error: logError } = await supabase
      .from("site_image_config_logs")
      .insert({
        config_key: editingConfig.config_key,
        old_image_url: oldImageUrl,
        new_image_url: relativePath,
        changed_by: user?.id,
        user_email: user?.email,
      });
    
    if (logError) {
      console.error("日志记录失败:", logError);
      // 不阻塞主流程
    }
    
    toast.success("图片已更新");
    setConfigs(prev => 
      prev.map(c => c.id === editingConfig.id ? { ...c, image_url: relativePath } : c)
    );
    
    setSaving(null);
    setEditingConfig(null);
    setPickerOpen(false);
  };

  const openPicker = (config: SiteImageConfig) => {
    setEditingConfig(config);
    setPickerOpen(true);
  };

  const openLogs = () => {
    setLogsOpen(true);
    fetchLogs();
  };

  const categories = [
    { value: "hero", label: "页面 Hero", description: "各页面顶部大图背景" },
    { value: "product", label: "产品图片", description: "产品卡片展示图（全景图为主）" },
    { value: "project", label: "项目案例", description: "案例展示图（局部细节为主）" },
    { value: "feature", label: "特性展示", description: "功能特性区块配图" },
  ];

  const filteredConfigs = configs.filter(c => c.category === activeCategory);

  // 对产品图片按类型分组
  const groupedProductConfigs = () => {
    if (activeCategory !== 'product') return null;
    
    const groups: Record<string, SiteImageConfig[]> = {};
    filteredConfigs.forEach(config => {
      // 提取产品类型，例如 product.indoorPlayground.2 -> indoorPlayground
      const parts = config.config_key.split('.');
      const productType = parts[1];
      if (!groups[productType]) {
        groups[productType] = [];
      }
      groups[productType].push(config);
    });
    
    // 按 sort_order 排序每个组内的图片
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => {
        const aOrder = a.config_key.includes('.') ? parseInt(a.config_key.split('.')[2] || '0') : 0;
        const bOrder = b.config_key.includes('.') ? parseInt(b.config_key.split('.')[2] || '0') : 0;
        return aOrder - bOrder;
      });
    });
    
    return groups;
  };

  const productGroups = groupedProductConfigs();

  const productTypeLabels: Record<string, string> = {
    indoorPlayground: '室内游乐场',
    ninjaCourse: '忍者课程',
    softPlay: '软体游乐',
    trampolinePark: '蹦床公园',
  };

  // 根据config_key获取label
  const getLabelForKey = (key: string) => {
    const config = configs.find(c => c.config_key === key);
    return config?.label || key;
  };
  
  // 获取图片序号标签
  const getImageOrderLabel = (configKey: string) => {
    const parts = configKey.split('.');
    if (parts.length === 3) {
      return `图${parts[2]}`;
    }
    return '图1';
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">页面配图管理</h2>
          <p className="text-muted-foreground">点击图片更换网站各位置的配图</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={openLogs}>
            <History className="w-4 h-4 mr-2" />
            操作日志
          </Button>
          <Button variant="outline" onClick={fetchConfigs}>
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新
          </Button>
        </div>
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
                {/* 产品图片按类型分组显示 */}
                {cat.value === 'product' && productGroups ? (
                  <div className="space-y-8">
                    {Object.entries(productGroups).map(([productType, images]) => (
                      <div key={productType}>
                        <h3 className="text-lg font-semibold mb-4 text-primary">
                          {productTypeLabels[productType] || productType}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {images.map(config => (
                            <div
                              key={config.id}
                              className="group relative border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                              onClick={() => openPicker(config)}
                            >
                              {/* Image Preview */}
                              <div className="aspect-video bg-muted relative">
                                {config.image_url ? (
                                  <img
                                    src={getFullUrl(config.image_url)}
                                    alt={config.label || config.config_key}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src = '/placeholder.svg';
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                    <ImageIcon className="w-8 h-8 opacity-30" />
                                  </div>
                                )}
                                
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  {saving === config.id ? (
                                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                                  ) : (
                                    <div className="text-center text-white">
                                      <ImageIcon className="w-6 h-6 mx-auto mb-1" />
                                      <span className="text-xs">点击更换</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Label */}
                              <div className="p-2 bg-card text-center">
                                <span className="text-sm font-medium">{getImageOrderLabel(config.config_key)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* 其他分类保持原有布局 */
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
                )}
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

      {/* Logs Dialog */}
      <Dialog open={logsOpen} onOpenChange={setLogsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>配图更换记录</DialogTitle>
            <DialogDescription>
              查看最近50条配图更换操作记录
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[500px] pr-4">
            {logsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : logs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>暂无操作记录</p>
              </div>
            ) : (
              <div className="space-y-4">
                {logs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{getLabelForKey(log.config_key)}</h4>
                        <code className="text-xs text-muted-foreground">{log.config_key}</code>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {format(new Date(log.changed_at), "yyyy-MM-dd HH:mm:ss")}
                        </div>
                        {log.user_email && (
                          <div className="flex items-center gap-1 mt-1">
                            <User className="w-3 h-3" />
                            {log.user_email}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">旧图片</p>
                        <div className="aspect-video bg-muted rounded overflow-hidden">
                          {log.old_image_url ? (
                            <img
                              src={getFullUrl(log.old_image_url)}
                              alt="旧图片"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder.svg';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                              无
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">新图片</p>
                        <div className="aspect-video bg-muted rounded overflow-hidden">
                          <img
                            src={getFullUrl(log.new_image_url)}
                            alt="新图片"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder.svg';
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSiteImagesTab;
