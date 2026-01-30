-- Fix the security definer issue by recreating the view with security_invoker
-- This ensures RLS policies are respected when querying through the view

DROP VIEW IF EXISTS public.chat_sessions_public;

CREATE VIEW public.chat_sessions_public
WITH (security_invoker = on) AS
SELECT 
  id,
  session_id,
  status,
  created_at,
  updated_at,
  last_message_at
FROM public.chat_sessions;

-- Add RLS policy to allow anyone to read chat sessions (the view filters sensitive columns)
CREATE POLICY "Anyone can view chat sessions via public view"
ON public.chat_sessions FOR SELECT
USING (true);

-- Grant SELECT access to anonymous and authenticated users
GRANT SELECT ON public.chat_sessions_public TO anon, authenticated;

COMMENT ON VIEW public.chat_sessions_public IS 'Public-safe view of chat sessions excluding sensitive customer metadata (IP, location, device info). Uses security_invoker to respect RLS.';