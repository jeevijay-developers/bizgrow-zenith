-- Seed script for Sharma General Store vendors and products
-- Run this in Supabase SQL Editor or via CLI

-- First, find Sharma General Store (replace the WHERE clause if needed)
DO $$
DECLARE
  v_store_id UUID;
  v_user_id UUID;
  v_vendor1_id UUID;
  v_vendor2_id UUID;
  v_vendor3_id UUID;
  v_product1_id UUID;
  v_product2_id UUID;
  v_product3_id UUID;
  v_product4_id UUID;
  v_product5_id UUID;
  v_purchase1_id UUID;
BEGIN
  -- Get Sharma General Store ID (or create if not exists)
  SELECT id, user_id INTO v_store_id, v_user_id
  FROM stores 
  WHERE name ILIKE '%sharma%general%'
  LIMIT 1;

  -- If store doesn't exist, you need to create it first or use an existing store
  IF v_store_id IS NULL THEN
    RAISE NOTICE 'Store not found. Please create "Sharma General Store" first or update the WHERE clause.';
    RETURN;
  END IF;

  RAISE NOTICE 'Found store: % (ID: %)', (SELECT name FROM stores WHERE id = v_store_id), v_store_id;

  -- Insert Products with stock images
  INSERT INTO products (store_id, name, description, price, compare_price, category, image_url, is_available, stock_quantity)
  VALUES
    (v_store_id, 'Lays Classic 52g', 'Crispy potato chips with classic salted flavor', 20.00, 25.00, 'snacks', 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400', true, 150)
  RETURNING id INTO v_product1_id;

  INSERT INTO products (store_id, name, description, price, compare_price, category, image_url, is_available, stock_quantity)
  VALUES
    (v_store_id, 'Amul Taaza Milk 500ml', 'Fresh full cream milk', 28.00, 30.00, 'dairy', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', true, 80)
  RETURNING id INTO v_product2_id;

  INSERT INTO products (store_id, name, description, price, compare_price, category, image_url, is_available, stock_quantity)
  VALUES
    (v_store_id, 'Parle-G Biscuits 200g', 'Iconic glucose biscuits', 20.00, 22.00, 'biscuits', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400', true, 200)
  RETURNING id INTO v_product3_id;

  INSERT INTO products (store_id, name, description, price, compare_price, category, image_url, is_available, stock_quantity)
  VALUES
    (v_store_id, 'Maggi Noodles 70g', '2-minute instant noodles', 14.00, 16.00, 'instant-food', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400', true, 300)
  RETURNING id INTO v_product4_id;

  INSERT INTO products (store_id, name, description, price, compare_price, category, image_url, is_available, stock_quantity)
  VALUES
    (v_store_id, 'Tata Tea Gold 250g', 'Premium blend tea', 110.00, 120.00, 'beverages', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400', true, 50)
  RETURNING id INTO v_product5_id;

  RAISE NOTICE 'Created 5 products';

  -- Insert Vendors
  INSERT INTO vendors (store_id, name, phone, email, address, notes)
  VALUES
    (v_store_id, 'PepsiCo Distributor', '9876543210', 'pepsico@dist.com', 'Sector 18, Noida, UP', 'Primary snacks distributor - Lays, Kurkure, etc.')
  RETURNING id INTO v_vendor1_id;

  INSERT INTO vendors (store_id, name, phone, email, address, notes)
  VALUES
    (v_store_id, 'Amul Dairy Wholesale', '9876543211', 'amul@wholesale.com', 'Anand, Gujarat', 'Milk and dairy products supplier')
  RETURNING id INTO v_vendor2_id;

  INSERT INTO vendors (store_id, name, phone, email, address, notes)
  VALUES
    (v_store_id, 'FMCG Universal Traders', '9876543212', 'fmcg@traders.in', 'Karol Bagh, Delhi', 'Multi-brand FMCG distributor - biscuits, noodles, tea')
  RETURNING id INTO v_vendor3_id;

  RAISE NOTICE 'Created 3 vendors';

  -- Insert Vendor Purchases (linking vendors to products they supply)
  -- Purchase 1: 100 packs of Lays from PepsiCo
  INSERT INTO vendor_purchases (
    store_id, vendor_id, product_id, product_name, quantity, unit_price, total_amount,
    payment_status, paid_amount, remaining_amount, purchase_date, notes
  ) VALUES (
    v_store_id, v_vendor1_id, v_product1_id, 'Lays Classic 52g', 
    100, 15.50, 1550.00, 'paid', 1550.00, 0, CURRENT_DATE - INTERVAL '15 days',
    '1 carton (100 packs)'
  ) RETURNING id INTO v_purchase1_id;

  -- Record the payment
  INSERT INTO vendor_payments (purchase_id, store_id, amount, payment_method, comment)
  VALUES (v_purchase1_id, v_store_id, 1550.00, 'upi', 'Paid via PhonePe');

  -- Purchase 2: 50 bottles of milk from Amul (partial payment)
  INSERT INTO vendor_purchases (
    store_id, vendor_id, product_id, product_name, quantity, unit_price, total_amount,
    payment_status, paid_amount, remaining_amount, purchase_date, notes
  ) VALUES (
    v_store_id, v_vendor2_id, v_product2_id, 'Amul Taaza Milk 500ml',
    50, 24.00, 1200.00, 'partial', 800.00, 400.00, CURRENT_DATE - INTERVAL '10 days',
    'Weekly milk order'
  );

  -- Purchase 3: Mixed order from FMCG trader - Parle-G (unpaid)
  INSERT INTO vendor_purchases (
    store_id, vendor_id, product_id, product_name, quantity, unit_price, total_amount,
    payment_status, paid_amount, remaining_amount, purchase_date, notes
  ) VALUES (
    v_store_id, v_vendor3_id, v_product3_id, 'Parle-G Biscuits 200g',
    150, 16.00, 2400.00, 'unpaid', 0, 2400.00, CURRENT_DATE - INTERVAL '5 days',
    '1 box (150 packs)'
  );

  -- Purchase 4: Maggi from FMCG trader
  INSERT INTO vendor_purchases (
    store_id, vendor_id, product_id, product_name, quantity, unit_price, total_amount,
    payment_status, paid_amount, remaining_amount, purchase_date, notes
  ) VALUES (
    v_store_id, v_vendor3_id, v_product4_id, 'Maggi Noodles 70g',
    200, 11.50, 2300.00, 'paid', 2300.00, 0, CURRENT_DATE - INTERVAL '8 days',
    'Bulk order - 2 cartons'
  );

  -- Purchase 5: Tea from FMCG trader (partial payment)
  INSERT INTO vendor_purchases (
    store_id, vendor_id, product_id, product_name, quantity, unit_price, total_amount,
    payment_status, paid_amount, remaining_amount, purchase_date, notes
  ) VALUES (
    v_store_id, v_vendor3_id, v_product5_id, 'Tata Tea Gold 250g',
    30, 95.00, 2850.00, 'partial', 2000.00, 850.00, CURRENT_DATE - INTERVAL '3 days',
    'Monthly tea stock'
  );

  RAISE NOTICE 'Created 5 vendor purchases';
  RAISE NOTICE 'Seed data complete!';
END $$;
