-- Create inquiries table to store contact form submissions
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  project_type TEXT NOT NULL,
  message TEXT,
  estimated_area INTEGER,
  estimated_budget TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert inquiries (public contact form)
CREATE POLICY "Anyone can submit inquiries" 
ON public.inquiries 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_inquiries_updated_at
BEFORE UPDATE ON public.inquiries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create case studies table
CREATE TABLE public.case_studies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT,
  project_type TEXT NOT NULL,
  area_sqm INTEGER,
  description TEXT,
  client_testimonial TEXT,
  client_name TEXT,
  images TEXT[], -- Array of image URLs
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for case studies
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Allow public read access to case studies
CREATE POLICY "Anyone can view case studies" 
ON public.case_studies 
FOR SELECT 
USING (true);

-- Insert sample case studies
INSERT INTO public.case_studies (title, country, city, project_type, area_sqm, description, client_testimonial, client_name, featured) VALUES
('Adventure World Trampoline Park', 'United States', 'Los Angeles', 'Trampoline Park', 2500, 'A massive trampoline park featuring 12+ activity zones including ninja courses, foam pits, and slam dunk areas.', 'NinescapeLand delivered exceptional quality and helped us create the most popular entertainment destination in LA!', 'John Smith, CEO', true),
('KidZone Indoor Playground', 'United Kingdom', 'London', 'Indoor Playground', 1800, 'Multi-level themed indoor playground with interactive elements and soft play areas for children of all ages.', 'Professional team, excellent communication, and the equipment quality exceeded our expectations.', 'Sarah Johnson, Owner', true),
('Ninja Warriors Academy', 'Australia', 'Sydney', 'Ninja Course', 1200, 'Competition-grade ninja warrior course with 50+ obstacles and training facilities.', 'The design team understood our vision perfectly. The facility attracts both beginners and professional athletes.', 'Mike Chen, Director', true),
('Happy Kids FEC', 'Canada', 'Toronto', 'Family Entertainment Center', 3500, 'Complete family entertainment center combining trampolines, soft play, and ninja courses under one roof.', 'From design to installation, everything was seamless. Our revenue exceeded projections by 40%!', 'Emily Brown, Manager', true),
('JumpLand Arabia', 'UAE', 'Dubai', 'Trampoline Park', 4000, 'Premium trampoline park with VIP areas and luxury amenities catering to high-end clientele.', 'World-class quality that matches our luxury brand standards. Highly recommended!', 'Ahmed Al-Maktoum', true),
('Kids Paradise', 'Germany', 'Berlin', 'Indoor Playground', 1500, 'European-style indoor playground with educational elements and creative play zones.', 'Safety certifications and quality exceeded EU standards. Perfect partner for our project.', 'Hans Mueller, Owner', false),
('Bounce Factory', 'Singapore', 'Singapore', 'Trampoline Park', 2000, 'Urban trampoline park optimized for limited space with maximum activity variety.', 'Innovative space utilization and modern design. The ROI was achieved in just 8 months!', 'David Tan, CEO', false),
('Adventure Zone Mexico', 'Mexico', 'Mexico City', 'Family Entertainment Center', 2800, 'Vibrant FEC with colorful themes and diverse attractions for the whole family.', 'The team understood Latin American preferences perfectly. Our customers love it!', 'Carlos Rodriguez, Director', false);