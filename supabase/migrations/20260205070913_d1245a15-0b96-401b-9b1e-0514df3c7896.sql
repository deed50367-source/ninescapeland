-- Add French language columns to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS name_fr TEXT,
ADD COLUMN IF NOT EXISTS description_fr TEXT;

-- Add French language columns to product_categories table
ALTER TABLE public.product_categories 
ADD COLUMN IF NOT EXISTS name_fr TEXT;

-- Add French language column to blog_posts for reference (blog already supports dynamic language field)
-- No changes needed for blog_posts as it uses a 'language' field to store the language code