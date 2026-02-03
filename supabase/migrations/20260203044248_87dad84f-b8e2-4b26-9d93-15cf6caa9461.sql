
-- Fix #1: Ensure chat_sessions_public view has proper security
-- Revoke access from anonymous users and ensure only authenticated staff/admin can access
REVOKE ALL ON public.chat_sessions_public FROM anon;
GRANT SELECT ON public.chat_sessions_public TO authenticated;

-- Fix #2: Create a restricted view for staff that excludes sensitive metadata (IP, location, device info)
-- Staff should only see session management data, not privacy-sensitive customer tracking data
CREATE OR REPLACE VIEW public.chat_sessions_staff
WITH (security_invoker = on) AS
SELECT 
    id,
    session_id,
    status,
    assigned_to,
    notes,
    created_at,
    updated_at,
    last_message_at,
    customer_language,
    page_url,
    referrer
    -- Excludes: customer_ip, customer_country, customer_city, customer_device, customer_browser, customer_os, customer_timezone
FROM public.chat_sessions
WHERE has_role(auth.uid(), 'staff'::app_role) AND assigned_to = auth.uid();

-- Grant access to authenticated users (RLS will still apply via security_invoker)
GRANT SELECT ON public.chat_sessions_staff TO authenticated;

-- Update RLS: Remove direct staff access to base table (they must use the restricted view)
DROP POLICY IF EXISTS "Staff can view assigned chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Staff can update assigned chat sessions" ON public.chat_sessions;

-- Re-create staff update policy (they still need to update status, notes, etc.)
CREATE POLICY "Staff can update assigned chat sessions via restricted fields"
ON public.chat_sessions
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'staff'::app_role) AND assigned_to = auth.uid())
WITH CHECK (has_role(auth.uid(), 'staff'::app_role) AND assigned_to = auth.uid());

-- Note: Staff SELECT is now only through chat_sessions_staff view, not the base table
-- Admins retain full access through existing "Admins can view all chat sessions" policy
