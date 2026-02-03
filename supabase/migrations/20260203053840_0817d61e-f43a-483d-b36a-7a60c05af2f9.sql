-- Recreate chat_sessions_public view with security_invoker enabled
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

-- Grant minimal permissions - authenticated users inherit RLS from base table
GRANT SELECT ON public.chat_sessions_public TO authenticated;

-- Revoke from anon to prevent public access
REVOKE ALL ON public.chat_sessions_public FROM anon;

COMMENT ON VIEW public.chat_sessions_public IS 'Public view of chat sessions with security_invoker=on. Access is controlled by chat_sessions RLS policies.';