-- Create operation log table for site image configuration changes
CREATE TABLE public.site_image_config_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  config_key TEXT NOT NULL,
  old_image_url TEXT,
  new_image_url TEXT NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  changed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_email TEXT
);

-- Enable RLS
ALTER TABLE public.site_image_config_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view logs
CREATE POLICY "Admins can view image config logs"
  ON public.site_image_config_logs
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can insert logs (triggered by updates)
CREATE POLICY "Admins can insert image config logs"
  ON public.site_image_config_logs
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster queries
CREATE INDEX idx_site_image_config_logs_config_key ON public.site_image_config_logs(config_key);
CREATE INDEX idx_site_image_config_logs_changed_at ON public.site_image_config_logs(changed_at DESC);