-- Remove the redundant SELECT policy with USING false (it's redundant since we have a proper staff/admin policy)
DROP POLICY IF EXISTS "Deny anonymous access to inquiries" ON public.inquiries;

-- The existing policies are sufficient:
-- 1. "Staff and admins can view inquiries" - SELECT for staff/admin only
-- 2. "Anyone can submit inquiries with validation" - INSERT with proper field validation
-- 3. "Staff and admins can update inquiries" - UPDATE for staff/admin
-- 4. "Admins can delete inquiries" - DELETE for admin only

-- No additional policies needed - the current setup properly:
-- - Blocks anonymous/regular user SELECT access (no matching policy = denied)
-- - Allows anonymous INSERT with required field validation
-- - Restricts UPDATE/DELETE to authorized roles