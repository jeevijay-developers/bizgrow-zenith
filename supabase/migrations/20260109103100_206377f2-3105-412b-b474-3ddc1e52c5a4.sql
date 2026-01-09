-- Create storage bucket for store assets (banners, logos)
INSERT INTO storage.buckets (id, name, public)
VALUES ('store-assets', 'store-assets', true);

-- Create policies for store assets bucket
CREATE POLICY "Anyone can view store assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'store-assets');

CREATE POLICY "Store owners can upload their assets"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'store-assets' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Store owners can update their assets"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'store-assets' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Store owners can delete their assets"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'store-assets' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

-- Create policies for product images bucket
CREATE POLICY "Anyone can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Store owners can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Store owners can update product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Store owners can delete product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);