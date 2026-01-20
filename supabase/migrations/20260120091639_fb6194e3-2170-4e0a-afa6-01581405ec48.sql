-- Fix security issue: Remove any permissive SELECT policies and ensure only staff/admin can read chat data

-- Drop existing SELECT policies on chat_sessions that might be too permissive
DROP POLICY IF EXISTS "Staff and admins can view chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can view own session by session_id" ON public.chat_sessions;

-- Create a single clear SELECT policy for chat_sessions
CREATE POLICY "Only staff and admins can view chat sessions"
ON public.chat_sessions
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'staff'::app_role)
);

-- Drop existing SELECT policies on chat_messages
DROP POLICY IF EXISTS "Staff and admins can view all chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Staff and admins can view chat messages" ON public.chat_messages;

-- Create a single clear SELECT policy for chat_messages
CREATE POLICY "Only staff and admins can view chat messages"
ON public.chat_messages
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'staff'::app_role)
);

-- Ensure anon users cannot SELECT (they can only INSERT their own messages/sessions)
-- The TO authenticated clause above already restricts anon users from SELECT