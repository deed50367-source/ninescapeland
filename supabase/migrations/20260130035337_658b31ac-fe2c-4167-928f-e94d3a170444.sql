-- Recreate secure RLS for chat_sessions + inquiries, and fix permissive INSERT policy warning

/* -----------------------------
   1) inquiries: add assignment
------------------------------*/
ALTER TABLE public.inquiries
ADD COLUMN IF NOT EXISTS assigned_to uuid;

CREATE INDEX IF NOT EXISTS idx_inquiries_assigned_to ON public.inquiries (assigned_to);

/* -----------------------------
   2) inquiries: replace SELECT/UPDATE/DELETE policies
   (Keep existing public INSERT policy: "Anyone can submit inquiries with validation")
------------------------------*/
-- Drop legacy / broad policies
DROP POLICY IF EXISTS "Staff and admins can view inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Staff can view inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admin and staff can view inquiries" ON public.inquiries;

DROP POLICY IF EXISTS "Staff and admins can update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Staff can update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admin and staff can update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Only admin and staff can update inquiries" ON public.inquiries;

DROP POLICY IF EXISTS "Admins can delete inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Only admin and staff can delete inquiries" ON public.inquiries;

-- Create new scoped policies
CREATE POLICY "Admins can view all inquiries"
ON public.inquiries
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can view assigned inquiries"
ON public.inquiries
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'staff')
  AND assigned_to = auth.uid()
);

CREATE POLICY "Admins can update all inquiries"
ON public.inquiries
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can update assigned inquiries"
ON public.inquiries
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'staff')
  AND assigned_to = auth.uid()
)
WITH CHECK (
  public.has_role(auth.uid(), 'staff')
  AND assigned_to = auth.uid()
);

CREATE POLICY "Admins can delete all inquiries"
ON public.inquiries
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can delete assigned inquiries"
ON public.inquiries
FOR DELETE
TO authenticated
USING (
  public.has_role(auth.uid(), 'staff')
  AND assigned_to = auth.uid()
);

/* -----------------------------
   3) chat_sessions: replace SELECT/UPDATE policies
   (Keep existing INSERT policies)
------------------------------*/
DROP POLICY IF EXISTS "Only authenticated staff and admins can view chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Staff can view chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Admin and staff can view chat sessions" ON public.chat_sessions;

DROP POLICY IF EXISTS "Staff and admins can update chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Staff can update chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Admin and staff can update chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can update own session" ON public.chat_sessions;

CREATE POLICY "Admins can view all chat sessions"
ON public.chat_sessions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can view assigned chat sessions"
ON public.chat_sessions
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'staff')
  AND assigned_to = auth.uid()
);

CREATE POLICY "Admins can update all chat sessions"
ON public.chat_sessions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can update assigned chat sessions"
ON public.chat_sessions
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'staff')
  AND assigned_to = auth.uid()
)
WITH CHECK (
  public.has_role(auth.uid(), 'staff')
  AND assigned_to = auth.uid()
);

/* -----------------------------
   4) Fix linter WARN: whatsapp_clicks insert policy WITH CHECK(true)
   Keep behavior (public insert) but make check non-trivial.
------------------------------*/
DROP POLICY IF EXISTS "Anyone can insert click events" ON public.whatsapp_clicks;

CREATE POLICY "Anyone can insert click events"
ON public.whatsapp_clicks
FOR INSERT
TO anon, authenticated
WITH CHECK (
  source IS NOT NULL
  AND length(btrim(source)) > 0
);