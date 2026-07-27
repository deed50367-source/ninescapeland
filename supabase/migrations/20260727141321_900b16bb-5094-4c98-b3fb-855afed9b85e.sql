
-- Consolidate duplicate public SELECT policies on storage.objects for 'assets' bucket
DROP POLICY IF EXISTS "Anyone can view assets" ON storage.objects;
DROP POLICY IF EXISTS "Public read assets objects" ON storage.objects;
CREATE POLICY "Public read assets bucket" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'assets');

-- Scope chat_sessions staff insert policy to authenticated
DROP POLICY IF EXISTS "Staff and admins can insert chat sessions" ON public.chat_sessions;
CREATE POLICY "Staff and admins can insert chat sessions" ON public.chat_sessions FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Also scope the staff SELECT policy to authenticated for consistency
DROP POLICY IF EXISTS "Staff can view assigned chat sessions" ON public.chat_sessions;
CREATE POLICY "Staff can view assigned chat sessions" ON public.chat_sessions FOR SELECT TO authenticated USING (has_role(auth.uid(), 'staff'::app_role) AND assigned_to = auth.uid());

-- Scope quick_reply_templates policies to authenticated
DROP POLICY IF EXISTS "Admins can delete templates" ON public.quick_reply_templates;
DROP POLICY IF EXISTS "Staff and admins can insert templates" ON public.quick_reply_templates;
DROP POLICY IF EXISTS "Staff and admins can update templates" ON public.quick_reply_templates;
DROP POLICY IF EXISTS "Staff and admins can view templates" ON public.quick_reply_templates;

CREATE POLICY "Admins can delete templates" ON public.quick_reply_templates FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Staff and admins can insert templates" ON public.quick_reply_templates FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Staff and admins can update templates" ON public.quick_reply_templates FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Staff and admins can view templates" ON public.quick_reply_templates FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
