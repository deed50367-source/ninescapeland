
-- 1) Fix the mis-tagged row: the -3 "de" row actually contains Spanish content.
UPDATE public.blog_posts
SET language = 'es'
WHERE id = '0e31eacc-d3c1-478c-86e0-9f7de3cf6336';

-- 2) Record old→new slug mapping for redirects.
INSERT INTO public.blog_slug_redirects (old_slug, new_slug)
SELECT slug, regexp_replace(slug, '-[1-5]$', '')
FROM public.blog_posts
WHERE language <> 'en' AND slug ~ '-[1-5]$'
ON CONFLICT (old_slug) DO NOTHING;

-- 3) Strip the -1..-5 suffix from every non-English post.
UPDATE public.blog_posts
SET slug = regexp_replace(slug, '-[1-5]$', '')
WHERE language <> 'en' AND slug ~ '-[1-5]$';
