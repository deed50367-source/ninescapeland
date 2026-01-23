-- 为site_image_config添加sort_order字段，支持每个类型多张图片
ALTER TABLE public.site_image_config 
ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;

-- 添加额外的产品图片配置（每个产品4张）
-- 室内游乐场 - 图片2,3,4
INSERT INTO public.site_image_config (config_key, image_url, category, label, description, sort_order)
VALUES 
  ('product.indoorPlayground.2', '', 'product', '室内游乐场', '产品卡片 - 室内游乐场 (图2)', 1),
  ('product.indoorPlayground.3', '', 'product', '室内游乐场', '产品卡片 - 室内游乐场 (图3)', 2),
  ('product.indoorPlayground.4', '', 'product', '室内游乐场', '产品卡片 - 室内游乐场 (图4)', 3);

-- 忍者课程 - 图片2,3,4
INSERT INTO public.site_image_config (config_key, image_url, category, label, description, sort_order)
VALUES 
  ('product.ninjaCourse.2', '', 'product', '忍者课程', '产品卡片 - 忍者课程 (图2)', 1),
  ('product.ninjaCourse.3', '', 'product', '忍者课程', '产品卡片 - 忍者课程 (图3)', 2),
  ('product.ninjaCourse.4', '', 'product', '忍者课程', '产品卡片 - 忍者课程 (图4)', 3);

-- 软体游乐 - 图片2,3,4
INSERT INTO public.site_image_config (config_key, image_url, category, label, description, sort_order)
VALUES 
  ('product.softPlay.2', '', 'product', '软体游乐', '产品卡片 - 软体游乐 (图2)', 1),
  ('product.softPlay.3', '', 'product', '软体游乐', '产品卡片 - 软体游乐 (图3)', 2),
  ('product.softPlay.4', '', 'product', '软体游乐', '产品卡片 - 软体游乐 (图4)', 3);

-- 蹦床公园 - 图片2,3,4
INSERT INTO public.site_image_config (config_key, image_url, category, label, description, sort_order)
VALUES 
  ('product.trampolinePark.2', '', 'product', '蹦床公园', '产品卡片 - 蹦床公园 (图2)', 1),
  ('product.trampolinePark.3', '', 'product', '蹦床公园', '产品卡片 - 蹦床公园 (图3)', 2),
  ('product.trampolinePark.4', '', 'product', '蹦床公园', '产品卡片 - 蹦床公园 (图4)', 3);

-- 更新原有图片的sort_order为0
UPDATE public.site_image_config 
SET sort_order = 0 
WHERE config_key IN ('product.indoorPlayground', 'product.ninjaCourse', 'product.softPlay', 'product.trampolinePark');