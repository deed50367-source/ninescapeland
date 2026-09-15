CREATE POLICY "Permitted users can view inquiries"
ON public.inquiries FOR SELECT TO authenticated
USING (public.has_permission(auth.uid(), 'inquiries'));

CREATE POLICY "Permitted users can update inquiries"
ON public.inquiries FOR UPDATE TO authenticated
USING (public.has_permission(auth.uid(), 'inquiries'))
WITH CHECK (public.has_permission(auth.uid(), 'inquiries'));