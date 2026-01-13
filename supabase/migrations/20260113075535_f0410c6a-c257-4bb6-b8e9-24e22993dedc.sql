-- Fix case_studies table: Add admin-only write policies
CREATE POLICY "Admins can insert case studies"
ON public.case_studies
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update case studies"
ON public.case_studies
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete case studies"
ON public.case_studies
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));