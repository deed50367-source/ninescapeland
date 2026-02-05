-- Recreate chat_sessions_staff view with security_invoker enabled
-- This ensures the view inherits RLS policies from the base chat_sessions table

DROP VIEW IF EXISTS public.chat_sessions_staff;

CREATE VIEW public.chat_sessions_staff
WITH (security_invoker = on) AS
SELECT 
    id,
    session_id,
    status,
    assigned_to,
    created_at,
    updated_at,
    last_message_at,
    customer_language,
    notes,
    page_url,
    referrer
    -- Excludes PII fields: customer_ip, customer_country, customer_city, customer_device, customer_browser, customer_os, customer_timezone
FROM public.chat_sessions;

-- Grant access only to authenticated users (staff and admins)
-- The actual access control is handled by the base table's RLS policies
GRANT SELECT ON public.chat_sessions_staff TO authenticated;

-- Revoke all access from anonymous users
REVOKE ALL ON public.chat_sessions_staff FROM anon;

COMMENT ON VIEW public.chat_sessions_staff IS 'Staff view of chat sessions with security_invoker=on. Excludes sensitive PII fields. Access is controlled by chat_sessions RLS policies.';