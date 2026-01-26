-- Fix security issues for sensitive tables

-- 1. Drop and recreate chat_sessions SELECT policy with explicit auth check
DROP POLICY IF EXISTS "Only staff and admins can view chat sessions" ON public.chat_sessions;
CREATE POLICY "Only authenticated staff and admins can view chat sessions"
ON public.chat_sessions
FOR SELECT
USING (
  auth.uid() IS NOT NULL 
  AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role))
);

-- 2. Drop and recreate inquiries SELECT policy with explicit auth check
DROP POLICY IF EXISTS "Staff and admins can view inquiries" ON public.inquiries;
CREATE POLICY "Only authenticated staff and admins can view inquiries"
ON public.inquiries
FOR SELECT
USING (
  auth.uid() IS NOT NULL 
  AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role))
);

-- 3. Fix chat_messages policies - remove confusing "false" policy and update SELECT
DROP POLICY IF EXISTS "Users can view own session messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Staff and admins can view all chat messages" ON public.chat_messages;
CREATE POLICY "Only authenticated staff and admins can view chat messages"
ON public.chat_messages
FOR SELECT
USING (
  auth.uid() IS NOT NULL 
  AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role))
);