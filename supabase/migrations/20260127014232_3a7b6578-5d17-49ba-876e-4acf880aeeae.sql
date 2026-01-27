-- Add SEO fields to blog_posts table
ALTER TABLE public.blog_posts
ADD COLUMN IF NOT EXISTS seo_title TEXT,
ADD COLUMN IF NOT EXISTS seo_description TEXT,
ADD COLUMN IF NOT EXISTS seo_keywords TEXT;