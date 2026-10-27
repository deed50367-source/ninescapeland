CREATE OR REPLACE FUNCTION public.chat_session_exists(_session_id text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT length(_session_id) BETWEEN 16 AND 128 AND EXISTS (SELECT 1 FROM public.chat_sessions WHERE session_id = _session_id); $$;
REVOKE ALL ON FUNCTION public.chat_session_exists(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.chat_session_exists(text) TO anon, authenticated, service_role;
ALTER POLICY "Anyone can insert own chat messages" ON public.chat_messages TO anon, authenticated WITH CHECK (((is_staff_reply IS NULL) OR (is_staff_reply = false)) AND session_id IS NOT NULL AND length(session_id) BETWEEN 16 AND 128 AND public.chat_session_exists(session_id));