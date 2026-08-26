-- 1. Allow admins to delete chat sessions
DROP POLICY IF EXISTS "Admins can delete chat sessions" ON public.chat_sessions;
CREATE POLICY "Admins can delete chat sessions"
ON public.chat_sessions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2. Prevent identity spoofing in image config logs
DROP POLICY IF EXISTS "Admins can insert image config logs" ON public.site_image_config_logs;
CREATE POLICY "Admins can insert image config logs"
ON public.site_image_config_logs
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role)
  AND changed_by = auth.uid()
  AND (user_email IS NULL OR user_email = (auth.jwt() ->> 'email'))
);