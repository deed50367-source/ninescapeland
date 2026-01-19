-- Enable realtime for chat_messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;

-- Add staff response tracking
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS replied_by UUID REFERENCES auth.users(id);
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS is_staff_reply BOOLEAN DEFAULT false;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_messages_is_staff ON public.chat_messages(is_staff_reply);

-- Allow staff and admins to view all chat messages
CREATE POLICY "Staff and admins can view all chat messages" 
ON public.chat_messages 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Allow staff and admins to insert replies
CREATE POLICY "Staff and admins can reply to chats" 
ON public.chat_messages 
FOR INSERT 
TO authenticated
WITH CHECK (
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role))
  AND is_staff_reply = true
);

-- Allow staff and admins to update messages (e.g., mark as read)
CREATE POLICY "Staff and admins can update chat messages" 
ON public.chat_messages 
FOR UPDATE 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));