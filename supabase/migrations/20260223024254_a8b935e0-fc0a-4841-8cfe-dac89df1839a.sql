
-- Create a secure function that returns only country + timestamp from recent inquiries (no PII exposed)
CREATE OR REPLACE FUNCTION public.get_recent_inquiry_countries()
RETURNS TABLE(country text, created_at timestamp with time zone)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT country, created_at
  FROM public.inquiries
  WHERE created_at > now() - interval '7 days'
  ORDER BY created_at DESC
  LIMIT 10;
$$;

-- Grant execute to anon and authenticated
GRANT EXECUTE ON FUNCTION public.get_recent_inquiry_countries() TO anon;
GRANT EXECUTE ON FUNCTION public.get_recent_inquiry_countries() TO authenticated;
