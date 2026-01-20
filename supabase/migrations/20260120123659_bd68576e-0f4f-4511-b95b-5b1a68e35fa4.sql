-- Drop existing SELECT policy if it exists (might be RESTRICTIVE instead of PERMISSIVE)
DROP POLICY IF EXISTS "Staff and admins can view inquiries" ON public.inquiries;

-- Create a proper PERMISSIVE SELECT policy for staff and admins only
CREATE POLICY "Staff and admins can view inquiries" 
ON public.inquiries 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));