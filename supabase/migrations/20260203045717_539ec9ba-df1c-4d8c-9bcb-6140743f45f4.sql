-- Revoke all access from public/anonymous role on chat_sessions_public view
REVOKE ALL ON public.chat_sessions_public FROM anon;
REVOKE ALL ON public.chat_sessions_public FROM public;

-- Grant SELECT only to authenticated users (RLS on base table will further restrict)
GRANT SELECT ON public.chat_sessions_public TO authenticated;

-- Also ensure the staff view is properly secured
REVOKE ALL ON public.chat_sessions_staff FROM anon;
REVOKE ALL ON public.chat_sessions_staff FROM public;
GRANT SELECT ON public.chat_sessions_staff TO authenticated;