-- Add order_type column to orders table
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS order_type text DEFAULT 'online';

-- Add delivery_mode column if not exists
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivery_mode text DEFAULT 'delivery';

-- Create invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
  store_id uuid NOT NULL,
  invoice_number text NOT NULL UNIQUE,
  customer_name text NOT NULL,
  customer_phone text,
  customer_address text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric NOT NULL DEFAULT 0,
  gst_percentage numeric DEFAULT 0,
  gst_amount numeric DEFAULT 0,
  discount_amount numeric DEFAULT 0,
  discount_percentage numeric DEFAULT 0,
  total_amount numeric NOT NULL DEFAULT 0,
  payment_method text DEFAULT 'cash',
  payment_status text DEFAULT 'paid',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on invoices
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- RLS policies for invoices
CREATE POLICY "Store owners can view their invoices"
ON public.invoices FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.stores
  WHERE stores.id = invoices.store_id
  AND stores.user_id = auth.uid()
));

CREATE POLICY "Store owners can insert invoices"
ON public.invoices FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.stores
  WHERE stores.id = invoices.store_id
  AND stores.user_id = auth.uid()
));

CREATE POLICY "Store owners can update their invoices"
ON public.invoices FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM public.stores
  WHERE stores.id = invoices.store_id
  AND stores.user_id = auth.uid()
));

CREATE POLICY "Store owners can delete their invoices"
ON public.invoices FOR DELETE
USING (EXISTS (
  SELECT 1 FROM public.stores
  WHERE stores.id = invoices.store_id
  AND stores.user_id = auth.uid()
));

-- System can insert invoices (for edge function)
CREATE POLICY "System can insert invoices"
ON public.invoices FOR INSERT
WITH CHECK (true);

-- Enable realtime for orders
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;