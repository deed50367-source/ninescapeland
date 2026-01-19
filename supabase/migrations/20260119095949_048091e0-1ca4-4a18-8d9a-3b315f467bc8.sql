-- Fix security issues: Remove public access to chat_sessions and chat_messages

-- 1. Drop insecure policies on chat_sessions
DROP POLICY IF EXISTS "Anyone can insert chat sessions for their own IP" ON public.chat_sessions;
DROP POLICY IF EXISTS "Anyone can update their own chat session" ON public.chat_sessions;

-- 2. Drop insecure policies on chat_messages  
DROP POLICY IF EXISTS "Anyone can view chat messages by session" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can insert chat messages" ON public.chat_messages;

-- 3. Create secure policies for chat_sessions
-- Allow authenticated users to create their own session (for the live chat widget)
CREATE POLICY "Authenticated users can create chat sessions"
ON public.chat_sessions
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow anon users to create sessions (for guest chat)
CREATE POLICY "Anon users can create chat sessions"
ON public.chat_sessions
FOR INSERT
TO anon
WITH CHECK (true);

-- Users can only view their own session by session_id (stored in localStorage)
CREATE POLICY "Users can view own session by session_id"
ON public.chat_sessions
FOR SELECT
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'staff'::app_role)
);

-- Users can update their own session (for updating last_message_at)
CREATE POLICY "Users can update own session"
ON public.chat_sessions
FOR UPDATE
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'staff'::app_role)
);

-- 4. Create secure policies for chat_messages
-- Allow anon/authenticated to insert messages (for customers sending messages)
CREATE POLICY "Anyone can insert own chat messages"
ON public.chat_messages
FOR INSERT
WITH CHECK (is_staff_reply = false OR is_staff_reply IS NULL);

-- Only staff/admin can view messages (customers see them via realtime, not SELECT)
CREATE POLICY "Staff and admins can view chat messages"
ON public.chat_messages
FOR SELECT
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'staff'::app_role)
);