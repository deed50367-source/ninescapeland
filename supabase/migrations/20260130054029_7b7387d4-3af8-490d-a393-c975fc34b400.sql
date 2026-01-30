-- Create a public-safe view that excludes sensitive customer PII
-- This view allows anonymous users to track their own conversations
-- while protecting IP addresses, location, and device fingerprints

CREATE OR REPLACE VIEW public.chat_sessions_public AS
SELECT 
  id,
  session_id,
  status,
  created_at,
  updated_at,
  last_message_at
FROM public.chat_sessions;

-- Grant SELECT access to anonymous and authenticated users
GRANT SELECT ON public.chat_sessions_public TO anon, authenticated;

-- Add comment explaining the view's purpose
COMMENT ON VIEW public.chat_sessions_public IS 'Public-safe view of chat sessions excluding sensitive customer metadata (IP, location, device info). Used by chat widget for session tracking.';