-- Fix security findings:
-- 1) chat_sessions was publicly readable due to a permissive SELECT policy.
-- 2) chat_sessions_public view should not be readable by anonymous users and must not bypass RLS.

BEGIN;

-- 1) Remove the public SELECT policy that makes the base table publicly readable
DROP POLICY IF EXISTS "Anyone can view chat sessions via public view" ON public.chat_sessions;

-- 2) Ensure the public view does NOT bypass RLS by forcing invoker security
--    (so base-table RLS is evaluated for the calling role)
CREATE OR REPLACE VIEW public.chat_sessions_public
WITH (security_invoker=on) AS
  SELECT
    id,
    session_id,
    status,
    created_at,
    updated_at,
    last_message_at
  FROM public.chat_sessions;

-- 3) Remove anonymous access to the view (staff/admin are authenticated)
REVOKE ALL ON TABLE public.chat_sessions_public FROM anon;
GRANT SELECT ON TABLE public.chat_sessions_public TO authenticated;

COMMIT;
