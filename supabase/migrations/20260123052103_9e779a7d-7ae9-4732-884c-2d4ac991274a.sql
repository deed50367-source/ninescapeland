-- Drop the problematic SELECT policies on chat_sessions
DROP POLICY IF EXISTS "Staff and admins can view all chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Anonymous users cannot view sessions" ON public.chat_sessions;

-- Create a single, clear SELECT policy that only allows staff and admin
CREATE POLICY "Only staff and admins can view chat sessions"
ON public.chat_sessions
FOR SELECT
USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role)
);