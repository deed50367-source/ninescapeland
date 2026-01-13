-- Create storage bucket for assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('assets', 'assets', true);

-- Create folders table for organizing assets
CREATE TABLE public.asset_folders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  parent_id UUID REFERENCES public.asset_folders(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create assets metadata table
CREATE TABLE public.assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  folder_id UUID REFERENCES public.asset_folders(id) ON DELETE SET NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.asset_folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

-- RLS policies for asset_folders - public read, admin write
CREATE POLICY "Anyone can view folders"
ON public.asset_folders
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage folders"
ON public.asset_folders
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for assets - public read, admin write
CREATE POLICY "Anyone can view assets"
ON public.assets
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage assets"
ON public.assets
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Storage policies for assets bucket
CREATE POLICY "Anyone can view assets"
ON storage.objects
FOR SELECT
USING (bucket_id = 'assets');

CREATE POLICY "Admins can upload assets"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'assets' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update assets"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'assets' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete assets"
ON storage.objects
FOR DELETE
USING (bucket_id = 'assets' AND has_role(auth.uid(), 'admin'::app_role));

-- Add triggers for updated_at
CREATE TRIGGER update_asset_folders_updated_at
BEFORE UPDATE ON public.asset_folders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_assets_updated_at
BEFORE UPDATE ON public.assets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();