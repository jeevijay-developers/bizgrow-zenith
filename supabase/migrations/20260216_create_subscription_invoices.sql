-- Create subscription_invoices table
CREATE TABLE IF NOT EXISTS subscription_invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  subscription_plan_id UUID REFERENCES subscription_plans(id),
  invoice_number TEXT NOT NULL UNIQUE,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, failed, refunded
  payment_method TEXT,
  transaction_id TEXT,
  billing_period_start TIMESTAMPTZ,
  billing_period_end TIMESTAMPTZ,
  due_date TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  invoice_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_subscription_invoices_store_id ON subscription_invoices(store_id);
CREATE INDEX IF NOT EXISTS idx_subscription_invoices_status ON subscription_invoices(status);
CREATE INDEX IF NOT EXISTS idx_subscription_invoices_created_at ON subscription_invoices(created_at DESC);

-- Enable RLS
ALTER TABLE subscription_invoices ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Store owners can view their subscription invoices"
  ON subscription_invoices FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM stores
      WHERE stores.id = subscription_invoices.store_id
      AND stores.user_id = auth.uid()
    )
  );

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_subscription_invoices_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER subscription_invoices_updated_at
  BEFORE UPDATE ON subscription_invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_subscription_invoices_updated_at();
