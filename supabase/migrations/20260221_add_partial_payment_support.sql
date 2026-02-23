-- Add partial payment support to invoices table
-- This migration adds columns for tracking full vs partial payments,
-- paid/remaining amounts, and creates a payment history table

-- Step 1: Add new columns to invoices table
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS payment_type TEXT DEFAULT 'full' CHECK (payment_type IN ('full', 'partial'));
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS paid_amount NUMERIC DEFAULT 0 CHECK (paid_amount >= 0);
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS remaining_amount NUMERIC DEFAULT 0 CHECK (remaining_amount >= 0);
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS payment_comment TEXT;

-- Step 2: Update existing invoices to reflect full payment status
-- Set paid_amount = total_amount and remaining_amount = 0 for backward compatibility
UPDATE invoices 
SET 
  payment_type = 'full',
  paid_amount = total_amount,
  remaining_amount = 0
WHERE paid_amount IS NULL OR paid_amount = 0;

-- Step 3: Migrate existing payment_status values
-- 'paid' -> 'completed', keep 'pending' as-is
UPDATE invoices 
SET payment_status = 'completed' 
WHERE payment_status = 'paid';

-- Step 4: Create bill_payments table for tracking payment history
CREATE TABLE IF NOT EXISTS bill_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_bill_payments_invoice_id ON bill_payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_bill_payments_store_id ON bill_payments(store_id);
CREATE INDEX IF NOT EXISTS idx_bill_payments_created_at ON bill_payments(created_at DESC);

-- Enable RLS on bill_payments
ALTER TABLE bill_payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for bill_payments
CREATE POLICY "Store owners can view their bill payments"
  ON bill_payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM stores
      WHERE stores.id = bill_payments.store_id
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Store owners can insert bill payments"
  ON bill_payments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM stores
      WHERE stores.id = bill_payments.store_id
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Store owners can update their bill payments"
  ON bill_payments FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM stores
      WHERE stores.id = bill_payments.store_id
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Store owners can delete their bill payments"
  ON bill_payments FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM stores
      WHERE stores.id = bill_payments.store_id
      AND stores.user_id = auth.uid()
    )
  );

-- Add comment to explain the new payment_status values
COMMENT ON COLUMN invoices.payment_status IS 'Payment status: completed (fully paid), partial (partially paid with remaining balance), pending (awaiting payment)';
COMMENT ON COLUMN invoices.payment_type IS 'Payment type chosen at creation: full or partial';
COMMENT ON COLUMN invoices.paid_amount IS 'Total amount paid so far';
COMMENT ON COLUMN invoices.remaining_amount IS 'Remaining unpaid amount';
COMMENT ON TABLE bill_payments IS 'Tracks individual payment installments for partial payments';
