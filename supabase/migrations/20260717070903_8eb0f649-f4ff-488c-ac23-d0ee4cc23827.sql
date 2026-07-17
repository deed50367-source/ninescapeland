
DROP POLICY IF EXISTS "Anyone can view folders" ON public.asset_folders;
DROP POLICY IF EXISTS "Anyone can view assets" ON public.assets;

CREATE POLICY "Admin and staff can view folders"
ON public.asset_folders
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

CREATE POLICY "Admin and staff can view assets"
ON public.assets
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

REVOKE SELECT ON public.asset_folders FROM anon;
REVOKE SELECT ON public.assets FROM anon;
