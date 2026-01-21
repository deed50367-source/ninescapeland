-- Add explicit DENY policy for anonymous users on inquiries table
CREATE POLICY "Deny anonymous access to inquiries" 
ON public.inquiries 
FOR SELECT 
TO anon 
USING (false);