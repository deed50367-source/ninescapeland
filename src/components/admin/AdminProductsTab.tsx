import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Loader2,
  Image as ImageIcon,
  FolderOpen,
  X,
  GripVertical,
  Star,
  Eye,
  EyeOff,
  Package,
  Tags,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import GalleryPicker from "./GalleryPicker";
import { exportToExcel, productExportColumns, categoryExportColumns } from "@/utils/excelExport";

interface ProductCategory {
  id: string;
  name: string;
  name_en: string | null;
  name_ar: string | null;
  name_de: string | null;
  name_es: string | null;
  name_pt: string | null;
  name_fr: string | null;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}

interface Product {
  id: string;
  category_id: string | null;
  name: string;
  name_en: string | null;
  name_ar: string | null;
  name_de: string | null;
  name_es: string | null;
  name_pt: string | null;
  name_fr: string | null;
  slug: string;
  short_description: string | null;
  description: string | null;
  description_en: string | null;
  description_ar: string | null;
  description_de: string | null;
  description_es: string | null;
  description_pt: string | null;
  description_fr: string | null;
  featured_image: string | null;
  gallery_images: string[];
  price_min: number | null;
  price_max: number | null;
  price_unit: string | null;
  specifications: Record<string, string>;
  features: string[];
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  sort_order: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  category?: ProductCategory;
}

interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  sku: string | null;
  price: number | null;
  specifications: Record<string, string>;
  image_url: string | null;
  stock_quantity: number;
  is_active: boolean;
  sort_order: number;
}

const AdminProductsTab = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Product dialog state
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    name_en: "",
    name_ar: "",
    name_de: "",
    name_es: "",
    name_pt: "",
    name_fr: "",
    slug: "",
    category_id: "",
    short_description: "",
    description: "",
    description_en: "",
    description_ar: "",
    description_de: "",
    description_es: "",
    description_pt: "",
    description_fr: "",
    featured_image: "",
    gallery_images: [] as string[],
    price_min: "",
    price_max: "",
    price_unit: "USD",
    specifications: {} as Record<string, string>,
    features: [] as string[],
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    sort_order: 0,
    is_featured: false,
    is_active: true,
  });

  // Category dialog state
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    name_en: "",
    name_ar: "",
    name_de: "",
    name_es: "",
    name_pt: "",
    name_fr: "",
    slug: "",
    description: "",
    image_url: "",
    sort_order: 0,
    is_active: true,
  });

  // Gallery picker state
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryTarget, setGalleryTarget] = useState<"featured" | "gallery" | "category">("featured");

  // Spec editor state
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [newFeature, setNewFeature] = useState("");

  // Variant state
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [isVariantDialogOpen, setIsVariantDialogOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(null);
  const [variantForm, setVariantForm] = useState({
    name: "",
    sku: "",
    price: "",
    specifications: {} as Record<string, string>,
    image_url: "",
    stock_quantity: 0,
    is_active: true,
    sort_order: 0,
  });

  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from("product_categories")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data) setCategories(data);
  }, []);

  const fetchProducts = useCallback(async () => {
    let query = supabase
      .from("products")
      .select("*, category:product_categories(*)")
      .order("sort_order", { ascending: true });

    if (selectedCategory !== "all") {
      query = query.eq("category_id", selectedCategory);
    }

    const { data, error } = await query;
    if (!error && data) {
      setProducts(data.map(p => ({
        ...p,
        gallery_images: p.gallery_images || [],
        specifications: p.specifications as Record<string, string> || {},
        features: p.features || [],
      })));
    }
  }, [selectedCategory]);

  const fetchVariants = useCallback(async (productId: string) => {
    const { data, error } = await supabase
      .from("product_variants")
      .select("*")
      .eq("product_id", productId)
      .order("sort_order", { ascending: true });
    if (!error && data) {
      setVariants(data.map(v => ({
        ...v,
        specifications: v.specifications as Record<string, string> || {},
      })));
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchCategories(), fetchProducts()]);
      setIsLoading(false);
    };
    loadData();
  }, [fetchCategories, fetchProducts]);

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  // Category handlers
  const openCategoryDialog = (category?: ProductCategory) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({
        name: category.name,
        name_en: category.name_en || "",
        name_ar: category.name_ar || "",
        name_de: category.name_de || "",
        name_es: category.name_es || "",
        name_pt: category.name_pt || "",
        name_fr: category.name_fr || "",
        slug: category.slug,
        description: category.description || "",
        image_url: category.image_url || "",
        sort_order: category.sort_order,
        is_active: category.is_active,
      });
    } else {
      setEditingCategory(null);
      setCategoryForm({
        name: "",
        name_en: "",
        name_ar: "",
        name_de: "",
        name_es: "",
        name_pt: "",
        name_fr: "",
        slug: "",
        description: "",
        image_url: "",
        sort_order: 0,
        is_active: true,
      });
    }
    setIsCategoryDialogOpen(true);
  };

  const saveCategory = async () => {
    if (!categoryForm.name || !categoryForm.slug) {
      toast.error("请填写分类名称和URL别名");
      return;
    }

    const categoryData = {
      name: categoryForm.name,
      name_en: categoryForm.name_en || null,
      name_ar: categoryForm.name_ar || null,
      name_de: categoryForm.name_de || null,
      name_es: categoryForm.name_es || null,
      name_pt: categoryForm.name_pt || null,
      name_fr: categoryForm.name_fr || null,
      slug: categoryForm.slug,
      description: categoryForm.description || null,
      image_url: categoryForm.image_url || null,
      sort_order: categoryForm.sort_order,
      is_active: categoryForm.is_active,
    };

    if (editingCategory) {
      const { error } = await supabase
        .from("product_categories")
        .update(categoryData)
        .eq("id", editingCategory.id);
      if (error) {
        toast.error("更新失败");
        return;
      }
      toast.success("分类已更新");
    } else {
      const { error } = await supabase
        .from("product_categories")
        .insert(categoryData);
      if (error) {
        toast.error("创建失败");
        return;
      }
      toast.success("分类已创建");
    }

    setIsCategoryDialogOpen(false);
    fetchCategories();
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("确定要删除此分类吗？")) return;
    const { error } = await supabase
      .from("product_categories")
      .delete()
      .eq("id", id);
    if (error) {
      toast.error("删除失败");
      return;
    }
    toast.success("分类已删除");
    fetchCategories();
  };

  // Product handlers
  const openProductDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        name_en: product.name_en || "",
        name_ar: product.name_ar || "",
        name_de: product.name_de || "",
        name_es: product.name_es || "",
        name_pt: product.name_pt || "",
        name_fr: product.name_fr || "",
        slug: product.slug,
        category_id: product.category_id || "",
        short_description: product.short_description || "",
        description: product.description || "",
        description_en: product.description_en || "",
        description_ar: product.description_ar || "",
        description_de: product.description_de || "",
        description_es: product.description_es || "",
        description_pt: product.description_pt || "",
        description_fr: product.description_fr || "",
        featured_image: product.featured_image || "",
        gallery_images: product.gallery_images || [],
        price_min: product.price_min?.toString() || "",
        price_max: product.price_max?.toString() || "",
        price_unit: product.price_unit || "USD",
        specifications: product.specifications || {},
        features: product.features || [],
        seo_title: product.seo_title || "",
        seo_description: product.seo_description || "",
        seo_keywords: product.seo_keywords || "",
        sort_order: product.sort_order,
        is_featured: product.is_featured,
        is_active: product.is_active,
      });
      fetchVariants(product.id);
    } else {
      setEditingProduct(null);
      setProductForm({
        name: "",
        name_en: "",
        name_ar: "",
        name_de: "",
        name_es: "",
        name_pt: "",
        name_fr: "",
        slug: "",
        category_id: "",
        short_description: "",
        description: "",
        description_en: "",
        description_ar: "",
        description_de: "",
        description_es: "",
        description_pt: "",
        description_fr: "",
        featured_image: "",
        gallery_images: [],
        price_min: "",
        price_max: "",
        price_unit: "USD",
        specifications: {},
        features: [],
        seo_title: "",
        seo_description: "",
        seo_keywords: "",
        sort_order: 0,
        is_featured: false,
        is_active: true,
      });
      setVariants([]);
    }
    setIsProductDialogOpen(true);
  };

  const saveProduct = async () => {
    if (!productForm.name || !productForm.slug) {
      toast.error("请填写产品名称和URL别名");
      return;
    }

    const productData = {
      name: productForm.name,
      name_en: productForm.name_en || null,
      name_ar: productForm.name_ar || null,
      name_de: productForm.name_de || null,
      name_es: productForm.name_es || null,
      name_pt: productForm.name_pt || null,
      slug: productForm.slug,
      category_id: productForm.category_id || null,
      short_description: productForm.short_description || null,
      description: productForm.description || null,
      description_en: productForm.description_en || null,
      description_ar: productForm.description_ar || null,
      description_de: productForm.description_de || null,
      description_es: productForm.description_es || null,
      description_pt: productForm.description_pt || null,
      description_fr: productForm.description_fr || null,
      featured_image: productForm.featured_image || null,
      gallery_images: productForm.gallery_images,
      price_min: productForm.price_min ? parseFloat(productForm.price_min) : null,
      price_max: productForm.price_max ? parseFloat(productForm.price_max) : null,
      price_unit: productForm.price_unit,
      specifications: productForm.specifications,
      features: productForm.features,
      seo_title: productForm.seo_title || null,
      seo_description: productForm.seo_description || null,
      seo_keywords: productForm.seo_keywords || null,
      sort_order: productForm.sort_order,
      is_featured: productForm.is_featured,
      is_active: productForm.is_active,
    };

    if (editingProduct) {
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingProduct.id);
      if (error) {
        toast.error("更新失败");
        return;
      }
      toast.success("产品已更新");
    } else {
      const { error } = await supabase
        .from("products")
        .insert(productData);
      if (error) {
        toast.error("创建失败");
        return;
      }
      toast.success("产品已创建");
    }

    setIsProductDialogOpen(false);
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("确定要删除此产品吗？相关变体也会被删除。")) return;
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);
    if (error) {
      toast.error("删除失败");
      return;
    }
    toast.success("产品已删除");
    fetchProducts();
  };

  const toggleProductActive = async (product: Product) => {
    const { error } = await supabase
      .from("products")
      .update({ is_active: !product.is_active })
      .eq("id", product.id);
    if (!error) {
      fetchProducts();
      toast.success(product.is_active ? "产品已下架" : "产品已上架");
    }
  };

  const toggleProductFeatured = async (product: Product) => {
    const { error } = await supabase
      .from("products")
      .update({ is_featured: !product.is_featured })
      .eq("id", product.id);
    if (!error) {
      fetchProducts();
      toast.success(product.is_featured ? "已取消推荐" : "已设为推荐");
    }
  };

  // Spec handlers
  const addSpec = () => {
    if (!newSpecKey.trim()) return;
    setProductForm({
      ...productForm,
      specifications: {
        ...productForm.specifications,
        [newSpecKey.trim()]: newSpecValue.trim(),
      },
    });
    setNewSpecKey("");
    setNewSpecValue("");
  };

  const removeSpec = (key: string) => {
    const newSpecs = { ...productForm.specifications };
    delete newSpecs[key];
    setProductForm({ ...productForm, specifications: newSpecs });
  };

  // Feature handlers
  const addFeature = () => {
    if (!newFeature.trim()) return;
    setProductForm({
      ...productForm,
      features: [...productForm.features, newFeature.trim()],
    });
    setNewFeature("");
  };

  const removeFeature = (index: number) => {
    setProductForm({
      ...productForm,
      features: productForm.features.filter((_, i) => i !== index),
    });
  };

  // Gallery image handlers
  const handleGallerySelect = (url: string) => {
    if (galleryTarget === "featured") {
      setProductForm({ ...productForm, featured_image: url });
    } else if (galleryTarget === "gallery") {
      setProductForm({
        ...productForm,
        gallery_images: [...productForm.gallery_images, url],
      });
    } else if (galleryTarget === "category") {
      setCategoryForm({ ...categoryForm, image_url: url });
    }
    setIsGalleryOpen(false);
  };

  const removeGalleryImage = (index: number) => {
    setProductForm({
      ...productForm,
      gallery_images: productForm.gallery_images.filter((_, i) => i !== index),
    });
  };

  // Variant handlers
  const openVariantDialog = (variant?: ProductVariant) => {
    if (variant) {
      setEditingVariant(variant);
      setVariantForm({
        name: variant.name,
        sku: variant.sku || "",
        price: variant.price?.toString() || "",
        specifications: variant.specifications || {},
        image_url: variant.image_url || "",
        stock_quantity: variant.stock_quantity,
        is_active: variant.is_active,
        sort_order: variant.sort_order,
      });
    } else {
      setEditingVariant(null);
      setVariantForm({
        name: "",
        sku: "",
        price: "",
        specifications: {},
        image_url: "",
        stock_quantity: 0,
        is_active: true,
        sort_order: 0,
      });
    }
    setIsVariantDialogOpen(true);
  };

  const saveVariant = async () => {
    if (!variantForm.name || !editingProduct) {
      toast.error("请填写变体名称");
      return;
    }

    const variantData = {
      product_id: editingProduct.id,
      name: variantForm.name,
      sku: variantForm.sku || null,
      price: variantForm.price ? parseFloat(variantForm.price) : null,
      specifications: variantForm.specifications,
      image_url: variantForm.image_url || null,
      stock_quantity: variantForm.stock_quantity,
      is_active: variantForm.is_active,
      sort_order: variantForm.sort_order,
    };

    if (editingVariant) {
      const { error } = await supabase
        .from("product_variants")
        .update(variantData)
        .eq("id", editingVariant.id);
      if (error) {
        toast.error("更新失败");
        return;
      }
      toast.success("变体已更新");
    } else {
      const { error } = await supabase
        .from("product_variants")
        .insert(variantData);
      if (error) {
        toast.error("创建失败");
        return;
      }
      toast.success("变体已创建");
    }

    setIsVariantDialogOpen(false);
    fetchVariants(editingProduct.id);
  };

  const deleteVariant = async (id: string) => {
    if (!confirm("确定要删除此变体吗？")) return;
    const { error } = await supabase
      .from("product_variants")
      .delete()
      .eq("id", id);
    if (error) {
      toast.error("删除失败");
      return;
    }
    toast.success("变体已删除");
    if (editingProduct) fetchVariants(editingProduct.id);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name_en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportProducts = async () => {
    if (filteredProducts.length === 0) {
      toast.error("No products to export");
      return;
    }
    try {
      await exportToExcel(filteredProducts, productExportColumns, {
        filename: 'products',
        sheetName: 'Products'
      });
      toast.success(`Exported ${filteredProducts.length} products`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error("Export failed");
    }
  };

  const handleExportCategories = async () => {
    if (categories.length === 0) {
      toast.error("No categories to export");
      return;
    }
    try {
      await exportToExcel(categories, categoryExportColumns, {
        filename: 'product_categories',
        sheetName: 'Categories'
      });
      toast.success(`Exported ${categories.length} categories`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error("Export failed");
    }
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
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            产品列表
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Tags className="w-4 h-4" />
            分类管理
          </TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button onClick={() => openProductDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                添加产品
              </Button>
              <Button onClick={handleExportProducts} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                导出Excel
              </Button>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部分类</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="搜索产品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">图片</TableHead>
                  <TableHead>产品名称</TableHead>
                  <TableHead>分类</TableHead>
                  <TableHead>价格</TableHead>
                  <TableHead className="w-24">状态</TableHead>
                  <TableHead className="w-32">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.featured_image ? (
                        <img
                          src={product.featured_image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.slug}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.category?.name || (
                        <span className="text-muted-foreground">未分类</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {product.price_min || product.price_max ? (
                        <span>
                          {product.price_min && `${product.price_unit} ${product.price_min}`}
                          {product.price_min && product.price_max && " - "}
                          {product.price_max && `${product.price_max}`}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">询价</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => toggleProductFeatured(product)}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              product.is_featured
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => toggleProductActive(product)}
                        >
                          {product.is_active ? (
                            <Eye className="w-4 h-4 text-green-500" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openProductDialog(product)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => deleteProduct(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      暂无产品
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button onClick={() => openCategoryDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                添加分类
              </Button>
              <Button onClick={handleExportCategories} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                导出Excel
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className={!category.is_active ? "opacity-60" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {category.image_url ? (
                        <img
                          src={category.image_url}
                          alt={category.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                          <Tags className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-base">{category.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{category.slug}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openCategoryDialog(category)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => deleteCategory(category.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant={category.is_active ? "default" : "secondary"}>
                      {category.is_active ? "启用" : "禁用"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      排序: {category.sort_order}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Product Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "编辑产品" : "添加产品"}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="basic">基本信息</TabsTrigger>
              <TabsTrigger value="i18n">多语言</TabsTrigger>
              <TabsTrigger value="media">图片媒体</TabsTrigger>
              <TabsTrigger value="specs">规格参数</TabsTrigger>
              <TabsTrigger value="variants">产品变体</TabsTrigger>
              <TabsTrigger value="seo">SEO设置</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>产品名称 (中文) *</Label>
                  <Input
                    value={productForm.name}
                    onChange={(e) => {
                      setProductForm({
                        ...productForm,
                        name: e.target.value,
                        slug: productForm.slug || generateSlug(e.target.value),
                      });
                    }}
                    placeholder="输入产品名称"
                  />
                </div>
                <div className="space-y-2">
                  <Label>产品名称 (英文)</Label>
                  <Input
                    value={productForm.name_en}
                    onChange={(e) =>
                      setProductForm({ ...productForm, name_en: e.target.value })
                    }
                    placeholder="Product name in English"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>URL别名 *</Label>
                  <Input
                    value={productForm.slug}
                    onChange={(e) =>
                      setProductForm({ ...productForm, slug: e.target.value })
                    }
                    placeholder="product-slug"
                  />
                </div>
                <div className="space-y-2">
                  <Label>所属分类</Label>
                  <Select
                    value={productForm.category_id}
                    onValueChange={(value) =>
                      setProductForm({ ...productForm, category_id: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>简短描述</Label>
                <Textarea
                  value={productForm.short_description}
                  onChange={(e) =>
                    setProductForm({ ...productForm, short_description: e.target.value })
                  }
                  placeholder="简要描述产品特点"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>详细描述</Label>
                <Textarea
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm({ ...productForm, description: e.target.value })
                  }
                  placeholder="详细产品介绍"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>最低价格</Label>
                  <Input
                    type="number"
                    value={productForm.price_min}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price_min: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>最高价格</Label>
                  <Input
                    type="number"
                    value={productForm.price_max}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price_max: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>货币单位</Label>
                  <Select
                    value={productForm.price_unit}
                    onValueChange={(value) =>
                      setProductForm({ ...productForm, price_unit: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="CNY">CNY</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>排序 (越小越靠前)</Label>
                  <Input
                    type="number"
                    value={productForm.sort_order}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        sort_order: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-6 pt-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={productForm.is_active}
                      onCheckedChange={(checked) =>
                        setProductForm({ ...productForm, is_active: checked })
                      }
                    />
                    <Label>启用</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={productForm.is_featured}
                      onCheckedChange={(checked) =>
                        setProductForm({ ...productForm, is_featured: checked })
                      }
                    />
                    <Label>推荐</Label>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="i18n" className="space-y-4 mt-4">
              <div className="bg-muted/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-muted-foreground">
                  在此编辑各语言版本的产品名称和描述。如果某语言字段留空，将自动使用英文或中文内容。
                </p>
              </div>

              <div className="space-y-6">
                {/* Arabic */}
                <div className="border rounded-lg p-4 space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    🇸🇦 阿拉伯语 (Arabic)
                  </h4>
                  <div className="space-y-2">
                    <Label>产品名称 (阿拉伯语)</Label>
                    <Input
                      value={productForm.name_ar}
                      onChange={(e) =>
                        setProductForm({ ...productForm, name_ar: e.target.value })
                      }
                      placeholder="اسم المنتج"
                      dir="rtl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>产品描述 (阿拉伯语)</Label>
                    <Textarea
                      value={productForm.description_ar}
                      onChange={(e) =>
                        setProductForm({ ...productForm, description_ar: e.target.value })
                      }
                      placeholder="وصف المنتج..."
                      rows={3}
                      dir="rtl"
                    />
                  </div>
                </div>

                {/* German */}
                <div className="border rounded-lg p-4 space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    🇩🇪 德语 (German)
                  </h4>
                  <div className="space-y-2">
                    <Label>产品名称 (德语)</Label>
                    <Input
                      value={productForm.name_de}
                      onChange={(e) =>
                        setProductForm({ ...productForm, name_de: e.target.value })
                      }
                      placeholder="Produktname"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>产品描述 (德语)</Label>
                    <Textarea
                      value={productForm.description_de}
                      onChange={(e) =>
                        setProductForm({ ...productForm, description_de: e.target.value })
                      }
                      placeholder="Produktbeschreibung..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Spanish */}
                <div className="border rounded-lg p-4 space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    🇪🇸 西班牙语 (Spanish)
                  </h4>
                  <div className="space-y-2">
                    <Label>产品名称 (西班牙语)</Label>
                    <Input
                      value={productForm.name_es}
                      onChange={(e) =>
                        setProductForm({ ...productForm, name_es: e.target.value })
                      }
                      placeholder="Nombre del producto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>产品描述 (西班牙语)</Label>
                    <Textarea
                      value={productForm.description_es}
                      onChange={(e) =>
                        setProductForm({ ...productForm, description_es: e.target.value })
                      }
                      placeholder="Descripción del producto..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Portuguese */}
                <div className="border rounded-lg p-4 space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    🇧🇷 葡萄牙语 (Portuguese)
                  </h4>
                  <div className="space-y-2">
                    <Label>产品名称 (葡萄牙语)</Label>
                    <Input
                      value={productForm.name_pt}
                      onChange={(e) =>
                        setProductForm({ ...productForm, name_pt: e.target.value })
                      }
                      placeholder="Nome do produto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>产品描述 (葡萄牙语)</Label>
                    <Textarea
                      value={productForm.description_pt}
                      onChange={(e) =>
                        setProductForm({ ...productForm, description_pt: e.target.value })
                      }
                      placeholder="Descrição do produto..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* French */}
                <div className="border rounded-lg p-4 space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    🇫🇷 法语 (French)
                  </h4>
                  <div className="space-y-2">
                    <Label>产品名称 (法语)</Label>
                    <Input
                      value={productForm.name_fr}
                      onChange={(e) =>
                        setProductForm({ ...productForm, name_fr: e.target.value })
                      }
                      placeholder="Nom du produit"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>产品描述 (法语)</Label>
                    <Textarea
                      value={productForm.description_fr}
                      onChange={(e) =>
                        setProductForm({ ...productForm, description_fr: e.target.value })
                      }
                      placeholder="Description du produit..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>主图</Label>
                <div className="flex items-start gap-4">
                  {productForm.featured_image ? (
                    <div className="relative">
                      <img
                        src={productForm.featured_image}
                        alt="Featured"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() =>
                          setProductForm({ ...productForm, featured_image: "" })
                        }
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="w-32 h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                      onClick={() => {
                        setGalleryTarget("featured");
                        setIsGalleryOpen(true);
                      }}
                    >
                      <FolderOpen className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground mt-2">
                        从图库选择
                      </span>
                    </div>
                  )}
                  {productForm.featured_image && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setGalleryTarget("featured");
                        setIsGalleryOpen(true);
                      }}
                    >
                      更换图片
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>产品图库</Label>
                <div className="flex flex-wrap gap-4">
                  {productForm.gallery_images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => removeGalleryImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  <div
                    className="w-24 h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => {
                      setGalleryTarget("gallery");
                      setIsGalleryOpen(true);
                    }}
                  >
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>规格参数</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="参数名"
                    value={newSpecKey}
                    onChange={(e) => setNewSpecKey(e.target.value)}
                    className="w-40"
                  />
                  <Input
                    placeholder="参数值"
                    value={newSpecValue}
                    onChange={(e) => setNewSpecValue(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={addSpec}>添加</Button>
                </div>
                <div className="space-y-2 mt-4">
                  {Object.entries(productForm.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center gap-2 bg-muted/50 rounded-lg p-2"
                    >
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium min-w-[120px]">{key}</span>
                      <span className="flex-1 text-muted-foreground">{value}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeSpec(key)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>产品特性</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="添加产品特性"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addFeature()}
                    className="flex-1"
                  />
                  <Button onClick={addFeature}>添加</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {productForm.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      {feature}
                      <button
                        onClick={() => removeFeature(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="variants" className="space-y-4 mt-4">
              {!editingProduct ? (
                <p className="text-center text-muted-foreground py-8">
                  请先保存产品后再添加变体
                </p>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <Label>产品变体</Label>
                    <Button size="sm" onClick={() => openVariantDialog()}>
                      <Plus className="w-4 h-4 mr-2" />
                      添加变体
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="flex items-center justify-between bg-muted/50 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-3">
                          {variant.image_url ? (
                            <img
                              src={variant.image_url}
                              alt={variant.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{variant.name}</p>
                            {variant.sku && (
                              <p className="text-sm text-muted-foreground">
                                SKU: {variant.sku}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {variant.price && (
                            <span className="text-sm">
                              {productForm.price_unit} {variant.price}
                            </span>
                          )}
                          <Badge variant={variant.is_active ? "default" : "secondary"}>
                            {variant.is_active ? "启用" : "禁用"}
                          </Badge>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => openVariantDialog(variant)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => deleteVariant(variant.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {variants.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        暂无变体，点击上方按钮添加
                      </p>
                    )}
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="seo" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>SEO标题</Label>
                <Input
                  value={productForm.seo_title}
                  onChange={(e) =>
                    setProductForm({ ...productForm, seo_title: e.target.value })
                  }
                  placeholder="搜索引擎显示的标题"
                />
                <p className="text-xs text-muted-foreground">
                  建议60字符以内，留空则使用产品名称
                </p>
              </div>

              <div className="space-y-2">
                <Label>SEO描述</Label>
                <Textarea
                  value={productForm.seo_description}
                  onChange={(e) =>
                    setProductForm({ ...productForm, seo_description: e.target.value })
                  }
                  placeholder="搜索引擎显示的描述"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  建议160字符以内，留空则使用简短描述
                </p>
              </div>

              <div className="space-y-2">
                <Label>SEO关键词</Label>
                <Input
                  value={productForm.seo_keywords}
                  onChange={(e) =>
                    setProductForm({ ...productForm, seo_keywords: e.target.value })
                  }
                  placeholder="关键词，用英文逗号分隔"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsProductDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={saveProduct}>保存</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "编辑分类" : "添加分类"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>分类名称 (中文) *</Label>
                <Input
                  value={categoryForm.name}
                  onChange={(e) => {
                    setCategoryForm({
                      ...categoryForm,
                      name: e.target.value,
                      slug: categoryForm.slug || generateSlug(e.target.value),
                    });
                  }}
                  placeholder="输入分类名称"
                />
              </div>
              <div className="space-y-2">
                <Label>分类名称 (英文)</Label>
                <Input
                  value={categoryForm.name_en}
                  onChange={(e) =>
                    setCategoryForm({ ...categoryForm, name_en: e.target.value })
                  }
                  placeholder="Category name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>URL别名 *</Label>
              <Input
                value={categoryForm.slug}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, slug: e.target.value })
                }
                placeholder="category-slug"
              />
            </div>

            {/* Multi-language category names */}
            <div className="border rounded-lg p-4 space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground">其他语言名称 (可选)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">🇸🇦 阿拉伯语</Label>
                  <Input
                    value={categoryForm.name_ar}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, name_ar: e.target.value })
                    }
                    placeholder="اسم الفئة"
                    dir="rtl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">🇩🇪 德语</Label>
                  <Input
                    value={categoryForm.name_de}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, name_de: e.target.value })
                    }
                    placeholder="Kategoriename"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">🇪🇸 西班牙语</Label>
                  <Input
                    value={categoryForm.name_es}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, name_es: e.target.value })
                    }
                    placeholder="Nombre de categoría"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">🇧🇷 葡萄牙语</Label>
                  <Input
                    value={categoryForm.name_pt}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, name_pt: e.target.value })
                    }
                    placeholder="Nome da categoria"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>分类描述</Label>
              <Textarea
                value={categoryForm.description}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, description: e.target.value })
                }
                placeholder="分类描述"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>分类图片</Label>
              <div className="flex items-center gap-4">
                {categoryForm.image_url ? (
                  <div className="relative">
                    <img
                      src={categoryForm.image_url}
                      alt="Category"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() =>
                        setCategoryForm({ ...categoryForm, image_url: "" })
                      }
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="w-20 h-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => {
                      setGalleryTarget("category");
                      setIsGalleryOpen(true);
                    }}
                  >
                    <FolderOpen className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
                {categoryForm.image_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setGalleryTarget("category");
                      setIsGalleryOpen(true);
                    }}
                  >
                    更换
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>排序</Label>
                <Input
                  type="number"
                  value={categoryForm.sort_order}
                  onChange={(e) =>
                    setCategoryForm({
                      ...categoryForm,
                      sort_order: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch
                  checked={categoryForm.is_active}
                  onCheckedChange={(checked) =>
                    setCategoryForm({ ...categoryForm, is_active: checked })
                  }
                />
                <Label>启用</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={saveCategory}>保存</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Variant Dialog */}
      <Dialog open={isVariantDialogOpen} onOpenChange={setIsVariantDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingVariant ? "编辑变体" : "添加变体"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>变体名称 *</Label>
                <Input
                  value={variantForm.name}
                  onChange={(e) =>
                    setVariantForm({ ...variantForm, name: e.target.value })
                  }
                  placeholder="如：大号、红色"
                />
              </div>
              <div className="space-y-2">
                <Label>SKU</Label>
                <Input
                  value={variantForm.sku}
                  onChange={(e) =>
                    setVariantForm({ ...variantForm, sku: e.target.value })
                  }
                  placeholder="产品编号"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>价格</Label>
                <Input
                  type="number"
                  value={variantForm.price}
                  onChange={(e) =>
                    setVariantForm({ ...variantForm, price: e.target.value })
                  }
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label>库存</Label>
                <Input
                  type="number"
                  value={variantForm.stock_quantity}
                  onChange={(e) =>
                    setVariantForm({
                      ...variantForm,
                      stock_quantity: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={variantForm.is_active}
                onCheckedChange={(checked) =>
                  setVariantForm({ ...variantForm, is_active: checked })
                }
              />
              <Label>启用</Label>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsVariantDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={saveVariant}>保存</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Gallery Picker */}
      <GalleryPicker
        open={isGalleryOpen}
        onOpenChange={setIsGalleryOpen}
        onSelect={handleGallerySelect}
      />
    </div>
  );
};

export default AdminProductsTab;