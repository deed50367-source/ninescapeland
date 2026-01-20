-- Fix chat_sessions security issue: prevent anonymous users from reading session data
-- Drop existing problematic INSERT policies
DROP POLICY IF EXISTS "Authenticated users can create chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Anon users can create chat sessions" ON public.chat_sessions;

-- Create a single INSERT policy that allows anyone to create sessions but restricts columns
-- Anonymous users can insert their own session data for chat functionality
CREATE POLICY "Anyone can create chat sessions"
ON public.chat_sessions
FOR INSERT
WITH CHECK (
  -- Only allow setting non-sensitive session metadata during insert
  status = 'new' 
  AND assigned_to IS NULL 
  AND notes IS NULL
);

-- Ensure SELECT is properly restricted - anonymous users cannot read ANY session data
-- The existing policy "Only staff and admins can view chat sessions" handles this correctly