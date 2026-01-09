-- Allow public read access to active stores for catalogue viewing
CREATE POLICY "Anyone can view active stores" 
ON public.stores 
FOR SELECT 
USING (is_active = true);

-- Allow public read access to store customizations for active stores
CREATE POLICY "Anyone can view store customizations for active stores" 
ON public.store_customizations 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.stores 
    WHERE stores.id = store_customizations.store_id 
    AND stores.is_active = true
  )
);

-- Allow public read access to available products for active stores
CREATE POLICY "Anyone can view products for active stores" 
ON public.products 
FOR SELECT 
USING (
  is_available = true AND
  EXISTS (
    SELECT 1 FROM public.stores 
    WHERE stores.id = products.store_id 
    AND stores.is_active = true
  )
);

-- Allow public read access to active promotions for active stores
CREATE POLICY "Anyone can view promotions for active stores" 
ON public.store_promotions 
FOR SELECT 
USING (
  is_active = true AND
  EXISTS (
    SELECT 1 FROM public.stores 
    WHERE stores.id = store_promotions.store_id 
    AND stores.is_active = true
  )
);