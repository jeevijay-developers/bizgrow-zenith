-- Create store_customizations table for dynamic store appearance
CREATE TABLE public.store_customizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  banner_image_url TEXT,
  banner_text TEXT,
  banner_subtitle TEXT,
  theme_color TEXT DEFAULT '#10b981',
  accent_color TEXT DEFAULT '#f59e0b',
  logo_url TEXT,
  tagline TEXT,
  welcome_message TEXT,
  show_banner BOOLEAN DEFAULT true,
  show_offers_section BOOLEAN DEFAULT true,
  show_categories BOOLEAN DEFAULT true,
  show_search BOOLEAN DEFAULT true,
  whatsapp_number TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  announcement_text TEXT,
  announcement_active BOOLEAN DEFAULT false,
  layout_style TEXT DEFAULT 'grid',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT unique_store_customization UNIQUE(store_id)
);

-- Enable RLS
ALTER TABLE public.store_customizations ENABLE ROW LEVEL SECURITY;

-- Create policies for store owners
CREATE POLICY "Store owners can view their customizations"
ON public.store_customizations
FOR SELECT
USING (
  store_id IN (
    SELECT id FROM public.stores WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Store owners can insert their customizations"
ON public.store_customizations
FOR INSERT
WITH CHECK (
  store_id IN (
    SELECT id FROM public.stores WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Store owners can update their customizations"
ON public.store_customizations
FOR UPDATE
USING (
  store_id IN (
    SELECT id FROM public.stores WHERE user_id = auth.uid()
  )
);

-- Allow public read access for store catalogues
CREATE POLICY "Public can view store customizations"
ON public.store_customizations
FOR SELECT
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_store_customizations_updated_at
BEFORE UPDATE ON public.store_customizations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create promotions/offers table for special offers display
CREATE TABLE public.store_promotions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  discount_percentage INTEGER,
  discount_amount NUMERIC,
  image_url TEXT,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.store_promotions ENABLE ROW LEVEL SECURITY;

-- Create policies for promotions
CREATE POLICY "Store owners can manage their promotions"
ON public.store_promotions
FOR ALL
USING (
  store_id IN (
    SELECT id FROM public.stores WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Public can view active promotions"
ON public.store_promotions
FOR SELECT
USING (is_active = true);

-- Create trigger for updated_at
CREATE TRIGGER update_store_promotions_updated_at
BEFORE UPDATE ON public.store_promotions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();