-- Create user_permissions table for granular access control
CREATE TABLE public.user_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  permission text NOT NULL,
  granted_by uuid,
  granted_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, permission)
);

-- Available permissions:
-- 'backend_access' - Can access admin backend at all
-- 'inquiries' - Can view/manage inquiries
-- 'products' - Can view/manage products
-- 'site_images' - Can view/manage site images
-- 'gallery' - Can view/manage gallery
-- 'customer_service' - Can view/manage customer service chats
-- 'blog' - Can view/manage blog posts
-- 'user_management' - Can manage user permissions (admin only)

-- Enable RLS
ALTER TABLE public.user_permissions ENABLE ROW LEVEL SECURITY;

-- Users can view their own permissions
CREATE POLICY "Users can view own permissions"
ON public.user_permissions
FOR SELECT
USING (auth.uid() = user_id);

-- Admins can manage all permissions
CREATE POLICY "Admins can manage permissions"
ON public.user_permissions
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create function to check if user has a specific permission
CREATE OR REPLACE FUNCTION public.has_permission(_user_id uuid, _permission text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  -- Admins have all permissions
  SELECT CASE 
    WHEN has_role(_user_id, 'admin'::app_role) THEN true
    ELSE EXISTS (
      SELECT 1
      FROM public.user_permissions
      WHERE user_id = _user_id
        AND permission = _permission
    )
  END
$$;

-- Create index for faster lookups
CREATE INDEX idx_user_permissions_user_id ON public.user_permissions(user_id);
CREATE INDEX idx_user_permissions_permission ON public.user_permissions(permission);