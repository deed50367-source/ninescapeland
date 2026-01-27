-- Add language column to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN language VARCHAR(10) NOT NULL DEFAULT 'en';

-- Create index for faster language-based queries
CREATE INDEX idx_blog_posts_language ON public.blog_posts(language);

-- Add comment for documentation
COMMENT ON COLUMN public.blog_posts.language IS 'Publication language code: en, ar, de, es, pt';