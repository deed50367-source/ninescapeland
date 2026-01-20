-- 创建产品分类表
CREATE TABLE public.product_categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    name_en text,
    name_ar text,
    name_de text,
    name_es text,
    name_pt text,
    slug text NOT NULL UNIQUE,
    description text,
    image_url text,
    sort_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- 创建产品表
CREATE TABLE public.products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id uuid REFERENCES public.product_categories(id) ON DELETE SET NULL,
    name text NOT NULL,
    name_en text,
    name_ar text,
    name_de text,
    name_es text,
    name_pt text,
    slug text NOT NULL UNIQUE,
    short_description text,
    description text,
    description_en text,
    description_ar text,
    description_de text,
    description_es text,
    description_pt text,
    featured_image text,
    gallery_images text[] DEFAULT '{}',
    price_min numeric(10,2),
    price_max numeric(10,2),
    price_unit text DEFAULT 'USD',
    specifications jsonb DEFAULT '{}',
    features text[] DEFAULT '{}',
    seo_title text,
    seo_description text,
    seo_keywords text,
    sort_order integer DEFAULT 0,
    is_featured boolean DEFAULT false,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- 创建产品变体表
CREATE TABLE public.product_variants (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    sku text,
    price numeric(10,2),
    specifications jsonb DEFAULT '{}',
    image_url text,
    stock_quantity integer DEFAULT 0,
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 0,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

-- 公开读取政策
CREATE POLICY "Anyone can view active categories" 
ON public.product_categories 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Anyone can view active products" 
ON public.products 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Anyone can view active variants" 
ON public.product_variants 
FOR SELECT 
USING (is_active = true);

-- 管理员完全访问政策
CREATE POLICY "Admins can manage categories" 
ON public.product_categories 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage products" 
ON public.products 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage variants" 
ON public.product_variants 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 更新时间戳触发器
CREATE TRIGGER update_product_categories_updated_at
BEFORE UPDATE ON public.product_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_product_variants_updated_at
BEFORE UPDATE ON public.product_variants
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 创建索引
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_featured ON public.products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_product_variants_product ON public.product_variants(product_id);