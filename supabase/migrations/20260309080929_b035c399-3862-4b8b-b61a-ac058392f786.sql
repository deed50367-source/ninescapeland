-- Create a redirects table for old blog slugs
CREATE TABLE public.blog_slug_redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  old_slug text NOT NULL UNIQUE,
  new_slug text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Allow public read access for redirect lookups
ALTER TABLE public.blog_slug_redirects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read redirects" ON public.blog_slug_redirects FOR SELECT TO anon, authenticated USING (true);

-- Function to shorten slugs and create redirects
DO $$
DECLARE
  slug_mappings text[][] := ARRAY[
    ARRAY['the-value-of-true-quality-defining-the-ninescapeland-authentic-experience-for-modern-play-centers', 'ninescapeland-authentic-quality-experience'],
    ARRAY['ninescapeland-trustworthy-building-safety-quality-and-lasting-partnerships-in-indoor-playgrounds', 'ninescapeland-trustworthy-playground-partner'],
    ARRAY['ninescapeland-amusement-setting-the-benchmark-in-indoor-playground-equipment-manufacturing', 'ninescapeland-playground-equipment-benchmark'],
    ARRAY['indoor-play-sensory-playground-comprehensive-guide-to-design-quality-and-business-impact', 'sensory-playground-design-guide'],
    ARRAY['ninescapeland-direct-the-definitive-guide-to-factory-direct-indoor-playground-solutions', 'ninescapeland-factory-direct-guide'],
    ARRAY['defining-genuine-quality-in-indoor-playground-manufacturing-the-ninescapeland-standard', 'ninescapeland-quality-standard'],
    ARRAY['the-foundation-of-fun-why-a-ninescapeland-trustworthy-partnership-is-your-greatest-asset', 'ninescapeland-trustworthy-partnership'],
    ARRAY['ninescapeland-custom-design-your-solution-for-tailored-indoor-playground-excellence', 'ninescapeland-custom-design-excellence'],
    ARRAY['your-premier-partner-for-indoor-playground-solutions-how-to-contact-ninescapeland', 'contact-ninescapeland-partner'],
    ARRAY['ninescapelands-space-revolutionizing-indoor-playground-design-and-manufacturing', 'ninescapeland-playground-design-revolution'],
    ARRAY['ninescapeland-custom-design-tailored-indoor-playground-solutions-for-operators', 'ninescapeland-custom-playground-operators'],
    ARRAY['inside-the-ninescapeland-factory-a-commitment-to-quality-safety-and-innovation', 'ninescapeland-factory-quality-innovation'],
    ARRAY['the-future-of-play-a-comprehensive-guide-to-ninescapeland-indoor-solutions', 'ninescapeland-indoor-solutions-guide'],
    ARRAY['the-blueprint-for-excellence-a-deep-dive-into-ninescapeland-quality', 'ninescapeland-quality-blueprint'],
    ARRAY['child-care-indoor-preschool-creating-safe-and-engaging-play-spaces', 'indoor-preschool-play-spaces-guide'],
    ARRAY['is-ninescapeland-worth-it-a-comprehensive-evaluation-for-operators', 'ninescapeland-evaluation-guide'],
    ARRAY['how-to-choose-the-right-indoor-playground-equipment-manufacturer', 'choose-playground-equipment-manufacturer'],
    ARRAY['complete-guide-to-ninescapeland-equipment-safety-roi-and-design', 'ninescapeland-equipment-safety-roi-guide']
  ];
  old_base text;
  new_base text;
  r RECORD;
  new_slug_val text;
  i int;
BEGIN
  FOR i IN 1..array_length(slug_mappings, 1) LOOP
    old_base := slug_mappings[i][1];
    new_base := slug_mappings[i][2];
    
    FOR r IN SELECT id, slug FROM blog_posts WHERE slug = old_base OR slug LIKE old_base || '-%' LOOP
      new_slug_val := replace(r.slug, old_base, new_base);
      
      -- Insert redirect from old to new
      INSERT INTO blog_slug_redirects (old_slug, new_slug) 
      VALUES (r.slug, new_slug_val)
      ON CONFLICT (old_slug) DO NOTHING;
      
      -- Update the post slug
      UPDATE blog_posts SET slug = new_slug_val, updated_at = now() WHERE id = r.id;
    END LOOP;
  END LOOP;
END $$;