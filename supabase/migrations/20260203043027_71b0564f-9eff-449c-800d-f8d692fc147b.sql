-- Drop the existing unique constraint on slug (if exists)
ALTER TABLE public.blog_posts DROP CONSTRAINT IF EXISTS blog_posts_slug_key;

-- Create a new composite unique constraint on (slug, language)
ALTER TABLE public.blog_posts ADD CONSTRAINT blog_posts_slug_language_unique UNIQUE (slug, language);