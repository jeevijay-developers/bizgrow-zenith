-- Create function to auto-create store_customizations with whatsapp when a store is created
CREATE OR REPLACE FUNCTION public.create_store_customization_with_whatsapp()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_whatsapp TEXT;
BEGIN
  -- Get the user's whatsapp from profiles
  SELECT whatsapp INTO user_whatsapp
  FROM public.profiles
  WHERE user_id = NEW.user_id
  LIMIT 1;

  -- Create store_customizations entry with whatsapp_number
  INSERT INTO public.store_customizations (
    store_id,
    whatsapp_number,
    theme_color,
    accent_color,
    show_banner,
    show_offers_section,
    show_categories,
    show_search,
    layout_style
  ) VALUES (
    NEW.id,
    user_whatsapp,
    '#10b981',
    '#f59e0b',
    true,
    true,
    true,
    true,
    'grid'
  )
  ON CONFLICT (store_id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Create trigger to auto-create store customization with whatsapp
DROP TRIGGER IF EXISTS on_store_created ON public.stores;
CREATE TRIGGER on_store_created
  AFTER INSERT ON public.stores
  FOR EACH ROW
  EXECUTE FUNCTION public.create_store_customization_with_whatsapp();

-- Backfill existing stores: create store_customizations with whatsapp for stores that don't have it
INSERT INTO public.store_customizations (
  store_id,
  whatsapp_number,
  theme_color,
  accent_color,
  show_banner,
  show_offers_section,
  show_categories,
  show_search,
  layout_style
)
SELECT 
  s.id as store_id,
  p.whatsapp as whatsapp_number,
  '#10b981',
  '#f59e0b',
  true,
  true,
  true,
  true,
  'grid'
FROM public.stores s
INNER JOIN public.profiles p ON s.user_id = p.user_id
WHERE NOT EXISTS (
  SELECT 1 FROM public.store_customizations sc WHERE sc.store_id = s.id
)
ON CONFLICT (store_id) DO UPDATE SET
  whatsapp_number = EXCLUDED.whatsapp_number;

COMMENT ON FUNCTION public.create_store_customization_with_whatsapp() IS 'Automatically creates store_customizations entry with whatsapp_number from user profile when a new store is created';
