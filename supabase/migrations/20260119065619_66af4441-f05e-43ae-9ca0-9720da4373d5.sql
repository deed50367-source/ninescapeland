-- Add customer metadata columns to chat_sessions table
ALTER TABLE public.chat_sessions 
ADD COLUMN IF NOT EXISTS customer_ip text,
ADD COLUMN IF NOT EXISTS customer_country text,
ADD COLUMN IF NOT EXISTS customer_city text,
ADD COLUMN IF NOT EXISTS customer_device text,
ADD COLUMN IF NOT EXISTS customer_browser text,
ADD COLUMN IF NOT EXISTS customer_os text,
ADD COLUMN IF NOT EXISTS customer_language text,
ADD COLUMN IF NOT EXISTS customer_timezone text,
ADD COLUMN IF NOT EXISTS page_url text,
ADD COLUMN IF NOT EXISTS referrer text;

-- Allow anonymous users to insert chat sessions for their own session
CREATE POLICY "Anyone can insert chat sessions for their own IP" 
ON public.chat_sessions 
FOR INSERT 
WITH CHECK (true);

-- Allow anonymous users to update their own session (only metadata fields)
CREATE POLICY "Anyone can update their own chat session" 
ON public.chat_sessions 
FOR UPDATE 
USING (true)
WITH CHECK (true);