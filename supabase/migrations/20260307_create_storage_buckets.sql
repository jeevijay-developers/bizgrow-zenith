-- Create storage buckets for product images and store media
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('product-images', 'product-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']),
  ('store-media', 'store-media', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']),
  ('store-assets', 'store-assets', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- RLS Policy for store-assets bucket
CREATE POLICY "Authenticated users can upload store assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'store-assets');

CREATE POLICY "Public read access for store assets"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'store-assets');

CREATE POLICY "Authenticated users can update store assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'store-assets');

CREATE POLICY "Authenticated users can delete store assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'store-assets');


-- RLS Policies for product-images bucket
-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- Allow public read access to product images
CREATE POLICY "Public read access for product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- Allow authenticated users to update their own images
CREATE POLICY "Authenticated users can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images');

-- Allow authenticated users to delete their own images
CREATE POLICY "Authenticated users can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');

-- RLS Policies for store-media bucket
-- Allow authenticated users to upload media
CREATE POLICY "Authenticated users can upload store media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'store-media');

-- Allow public read access to store media
CREATE POLICY "Public read access for store media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'store-media');

-- Allow authenticated users to update their own media
CREATE POLICY "Authenticated users can update store media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'store-media');

-- Allow authenticated users to delete their own media
CREATE POLICY "Authenticated users can delete store media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'store-media');
