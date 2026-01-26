-- Drop the existing SELECT policy that allows any authenticated user
DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON public.inquiries;

-- Create a new SELECT policy that only allows admin and staff roles
CREATE POLICY "Only admin and staff can view inquiries" 
ON public.inquiries 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role IN ('admin', 'staff')
  )
);

-- Ensure UPDATE policy also restricts to admin/staff only
DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON public.inquiries;

CREATE POLICY "Only admin and staff can update inquiries" 
ON public.inquiries 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role IN ('admin', 'staff')
  )
);

-- Ensure DELETE policy also restricts to admin/staff only
DROP POLICY IF EXISTS "Authenticated users can delete inquiries" ON public.inquiries;

CREATE POLICY "Only admin and staff can delete inquiries" 
ON public.inquiries 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role IN ('admin', 'staff')
  )
);