-- Drop all existing SELECT policies on inquiries to eliminate conflicts
DROP POLICY IF EXISTS "Only admin and staff can view inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Only authenticated staff and admins can view inquiries" ON public.inquiries;

-- Create a single, clear SELECT policy
CREATE POLICY "Staff and admins can view inquiries" 
ON public.inquiries 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND (
    public.has_role(auth.uid(), 'admin') 
    OR public.has_role(auth.uid(), 'staff')
  )
);