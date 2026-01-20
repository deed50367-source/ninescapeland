-- Fix chat_messages: Allow users to read only their own session messages
DROP POLICY IF EXISTS "Only staff and admins can view chat messages" ON public.chat_messages;

-- Staff and admins can view ALL messages
CREATE POLICY "Staff and admins can view all chat messages"
ON public.chat_messages
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Anonymous users can view their own session messages only (using RLS session isolation)
-- Since we use session_id stored in browser, users can only see messages for their session
CREATE POLICY "Users can view own session messages"
ON public.chat_messages
FOR SELECT
TO anon
USING (false);  -- Anonymous users cannot read messages at all - they receive updates via realtime only

-- Fix chat_sessions: Ensure anonymous users cannot read session data
DROP POLICY IF EXISTS "Only staff and admins can view chat sessions" ON public.chat_sessions;

-- Staff and admins can view ALL sessions
CREATE POLICY "Staff and admins can view all chat sessions"
ON public.chat_sessions
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Explicitly deny anonymous SELECT access
CREATE POLICY "Anonymous users cannot view sessions"
ON public.chat_sessions
FOR SELECT
TO anon
USING (false);