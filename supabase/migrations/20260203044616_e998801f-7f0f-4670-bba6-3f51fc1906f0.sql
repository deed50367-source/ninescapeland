
-- Create a function for staff to get session metadata without sensitive fields
CREATE OR REPLACE FUNCTION public.get_staff_session_metadata(p_session_id text)
RETURNS TABLE (
  customer_language text,
  page_url text,
  referrer text,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    cs.customer_language,
    cs.page_url,
    cs.referrer,
    cs.created_at
  FROM public.chat_sessions cs
  WHERE cs.session_id = p_session_id
    AND (
      has_role(auth.uid(), 'admin'::app_role) 
      OR (has_role(auth.uid(), 'staff'::app_role) AND cs.assigned_to = auth.uid())
    )
$$;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.get_staff_session_metadata(text) TO authenticated;
