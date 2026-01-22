-- Create a table for tracking WhatsApp click events
CREATE TABLE public.whatsapp_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source TEXT NOT NULL, -- e.g., 'floating_cta', 'header', 'footer', 'mobile_nav'
  page_url TEXT, -- current page URL
  referrer TEXT, -- referrer URL
  user_agent TEXT, -- browser user agent
  language TEXT, -- current language
  country TEXT, -- detected country if available
  session_id TEXT, -- optional session identifier
  metadata JSONB DEFAULT '{}'::jsonb -- additional metadata
);

-- Enable Row Level Security
ALTER TABLE public.whatsapp_clicks ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert click events (anonymous tracking)
CREATE POLICY "Anyone can insert click events"
ON public.whatsapp_clicks
FOR INSERT
WITH CHECK (true);

-- Only staff and admins can view click analytics
CREATE POLICY "Staff and admins can view click analytics"
ON public.whatsapp_clicks
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Only admins can delete click events
CREATE POLICY "Admins can delete click events"
ON public.whatsapp_clicks
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster queries by source and date
CREATE INDEX idx_whatsapp_clicks_source ON public.whatsapp_clicks(source);
CREATE INDEX idx_whatsapp_clicks_created_at ON public.whatsapp_clicks(created_at DESC);