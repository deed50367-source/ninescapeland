-- 创建页面配图配置表
CREATE TABLE public.site_image_config (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  config_key text NOT NULL UNIQUE,
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  label text,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- 启用 RLS
ALTER TABLE public.site_image_config ENABLE ROW LEVEL SECURITY;

-- 任何人可以读取配置（用于前台显示）
CREATE POLICY "Anyone can view site image config"
ON public.site_image_config
FOR SELECT
USING (true);

-- 只有管理员可以修改
CREATE POLICY "Admins can manage site image config"
ON public.site_image_config
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 创建更新时间触发器
CREATE TRIGGER update_site_image_config_updated_at
BEFORE UPDATE ON public.site_image_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 插入默认配置
INSERT INTO public.site_image_config (config_key, image_url, category, label, description) VALUES
-- Hero 图片
('hero.home', 'e781d029-b8d9-4101-8835-35d1d8938a12/1768294274127-w29hc.jpg', 'hero', '首页 Hero', '首页顶部大图'),
('hero.products', '88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294624727-6ia03.jpg', 'hero', '产品页 Hero', '产品页顶部大图'),
('hero.aboutUs', 'e781d029-b8d9-4101-8835-35d1d8938a12/1768294227826-xtmqbx.jpg', 'hero', '关于我们 Hero', '关于我们页顶部大图'),
('hero.process', '88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294619294-xsbwg.jpg', 'hero', '流程页 Hero', '流程页顶部大图'),
('hero.projects', 'e781d029-b8d9-4101-8835-35d1d8938a12/1768294282861-8dkfa.jpg', 'hero', '项目案例 Hero', '项目案例页顶部大图'),
('hero.faq', 'e781d029-b8d9-4101-8835-35d1d8938a12/1768294287219-kmtl6.jpg', 'hero', 'FAQ Hero', 'FAQ页顶部大图'),
('hero.contact', 'e781d029-b8d9-4101-8835-35d1d8938a12/1768294300068-ysxbww.jpg', 'hero', '联系我们 Hero', '联系我们页顶部大图'),

-- 产品图片（全景图为主）
('product.indoorPlayground', 'adaf5265-c979-48b7-b4c1-808e1e4b87b8/1768294592888-x69bgi.jpg', 'product', '室内游乐场', '产品卡片 - 室内游乐场'),
('product.trampolinePark', '88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294617155-efd0q8.jpg', 'product', '蹦床公园', '产品卡片 - 蹦床公园'),
('product.ninjaCourse', 'root/1768967512755-1708914619333.jpg', 'product', '忍者课程', '产品卡片 - 忍者课程'),
('product.softPlay', 'dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294400190-bx9gha.jpg', 'product', '软体游乐', '产品卡片 - 软体游乐'),

-- 项目案例图片（局部图为主）
('project.bouncePark', '0d55c23f-ae63-47b1-b850-bb97872cf518/1768294349256-ahzwfa.jpg', 'project', '蹦床公园项目', '案例 - 蹦床公园'),
('project.fecCenter', '6e6b4c6d-2efc-446e-a7f4-8e98c91c81cc/1768294529825-ob7ylk.jpg', 'project', 'FEC中心项目', '案例 - 家庭娱乐中心'),
('project.indoorProject', '39a9c37a-1063-4ba6-94d1-4e0cca1123e9/1768294471406-lp0vzf.jpg', 'project', '室内游乐场项目', '案例 - 室内游乐场'),
('project.ninjaProject', 'root/1768967509253-1708914541597.jpg', 'project', '忍者挑战区项目', '案例 - 忍者课程'),

-- 特性区图片
('feature.trampoline', '88de2e3c-c85e-413b-878d-99b0d0aea8ed/1768294621773-h93mw.jpg', 'feature', '蹦床特性区', '特性展示 - 蹦床'),
('feature.ninja', 'root/1768967509253-1708914541597.jpg', 'feature', '忍者特性区', '特性展示 - 忍者');