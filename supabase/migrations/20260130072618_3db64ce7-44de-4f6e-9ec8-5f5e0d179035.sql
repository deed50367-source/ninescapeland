
-- Remove the old policy with redundant auth.uid() check (it may still exist)
DROP POLICY IF EXISTS "Only authenticated staff and admins can view chat messages" ON public.chat_messages;
