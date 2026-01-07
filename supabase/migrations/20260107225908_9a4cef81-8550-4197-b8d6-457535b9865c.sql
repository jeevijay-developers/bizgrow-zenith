-- Create orders table
CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id uuid NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_address text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_amount numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  payment_method text DEFAULT 'COD',
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create customers table
CREATE TABLE public.customers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id uuid NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  phone text NOT NULL,
  address text,
  total_orders integer NOT NULL DEFAULT 0,
  total_spent numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'new',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(store_id, phone)
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- RLS policies for orders
CREATE POLICY "Store owners can view their orders"
ON public.orders FOR SELECT
USING (EXISTS (
  SELECT 1 FROM stores WHERE stores.id = orders.store_id AND stores.user_id = auth.uid()
));

CREATE POLICY "Store owners can insert orders"
ON public.orders FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM stores WHERE stores.id = orders.store_id AND stores.user_id = auth.uid()
));

CREATE POLICY "Store owners can update their orders"
ON public.orders FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM stores WHERE stores.id = orders.store_id AND stores.user_id = auth.uid()
));

CREATE POLICY "Store owners can delete their orders"
ON public.orders FOR DELETE
USING (EXISTS (
  SELECT 1 FROM stores WHERE stores.id = orders.store_id AND stores.user_id = auth.uid()
));

-- RLS policies for customers
CREATE POLICY "Store owners can view their customers"
ON public.customers FOR SELECT
USING (EXISTS (
  SELECT 1 FROM stores WHERE stores.id = customers.store_id AND stores.user_id = auth.uid()
));

CREATE POLICY "Store owners can insert customers"
ON public.customers FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM stores WHERE stores.id = customers.store_id AND stores.user_id = auth.uid()
));

CREATE POLICY "Store owners can update their customers"
ON public.customers FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM stores WHERE stores.id = customers.store_id AND stores.user_id = auth.uid()
));

CREATE POLICY "Store owners can delete their customers"
ON public.customers FOR DELETE
USING (EXISTS (
  SELECT 1 FROM stores WHERE stores.id = customers.store_id AND stores.user_id = auth.uid()
));

-- Create triggers for updated_at
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON public.customers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();