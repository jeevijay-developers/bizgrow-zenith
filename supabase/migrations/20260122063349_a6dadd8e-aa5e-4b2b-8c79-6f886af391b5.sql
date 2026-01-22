-- Create table to store AI-generated category images (reusable across stores)
CREATE TABLE public.category_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_name TEXT NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.category_images ENABLE ROW LEVEL SECURITY;

-- Anyone can view category images (they're shared resources)
CREATE POLICY "Anyone can view category images"
ON public.category_images
FOR SELECT
USING (true);

-- Only authenticated users can insert new category images
CREATE POLICY "Authenticated users can insert category images"
ON public.category_images
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_category_images_updated_at
BEFORE UPDATE ON public.category_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();