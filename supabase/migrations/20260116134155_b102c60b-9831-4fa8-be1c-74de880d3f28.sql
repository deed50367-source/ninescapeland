-- Drop the existing overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.inquiries;

-- Create a more restrictive INSERT policy that validates required fields
CREATE POLICY "Anyone can submit inquiries with validation" 
ON public.inquiries 
FOR INSERT 
TO anon, authenticated
WITH CHECK (
  -- Ensure status cannot be manipulated (must be NULL or 'new')
  (status IS NULL OR status = 'new')
  -- Ensure required fields are provided
  AND name IS NOT NULL 
  AND email IS NOT NULL 
  AND country IS NOT NULL 
  AND project_type IS NOT NULL
);