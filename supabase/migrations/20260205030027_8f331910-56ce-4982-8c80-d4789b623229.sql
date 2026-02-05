-- Add SELECT policy for staff to view assigned chat sessions
-- This ensures staff can view sessions assigned to them while blocking anonymous access

CREATE POLICY "Staff can view assigned chat sessions"
ON public.chat_sessions
FOR SELECT
USING (
  has_role(auth.uid(), 'staff'::app_role) 
  AND assigned_to = auth.uid()
);

-- Add a comment to document the security model
COMMENT ON TABLE public.chat_sessions IS 'Customer chat sessions with sensitive tracking data. Access restricted to admin (all sessions) and staff (assigned sessions only). Anonymous SELECT is implicitly denied by RLS.';
