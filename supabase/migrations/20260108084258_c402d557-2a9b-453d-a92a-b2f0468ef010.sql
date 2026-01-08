-- Add database constraints for input validation

-- Products table constraints
ALTER TABLE products ADD CONSTRAINT products_price_nonnegative CHECK (price >= 0);
ALTER TABLE products ADD CONSTRAINT products_compare_price_nonnegative CHECK (compare_price IS NULL OR compare_price >= 0);
ALTER TABLE products ADD CONSTRAINT products_stock_nonnegative CHECK (stock_quantity IS NULL OR stock_quantity >= 0);
ALTER TABLE products ADD CONSTRAINT products_name_length CHECK (length(name) <= 255);
ALTER TABLE products ADD CONSTRAINT products_description_length CHECK (description IS NULL OR length(description) <= 2000);
ALTER TABLE products ADD CONSTRAINT products_category_length CHECK (category IS NULL OR length(category) <= 100);

-- Orders table constraints
ALTER TABLE orders ADD CONSTRAINT orders_total_amount_nonnegative CHECK (total_amount >= 0);
ALTER TABLE orders ADD CONSTRAINT orders_customer_name_length CHECK (length(customer_name) <= 255);
ALTER TABLE orders ADD CONSTRAINT orders_customer_phone_length CHECK (length(customer_phone) <= 20);
ALTER TABLE orders ADD CONSTRAINT orders_notes_length CHECK (notes IS NULL OR length(notes) <= 1000);

-- Customers table constraints
ALTER TABLE customers ADD CONSTRAINT customers_name_length CHECK (length(name) <= 255);
ALTER TABLE customers ADD CONSTRAINT customers_phone_length CHECK (length(phone) <= 20);
ALTER TABLE customers ADD CONSTRAINT customers_email_length CHECK (email IS NULL OR length(email) <= 255);
ALTER TABLE customers ADD CONSTRAINT customers_total_orders_nonnegative CHECK (total_orders >= 0);
ALTER TABLE customers ADD CONSTRAINT customers_total_spent_nonnegative CHECK (total_spent >= 0);

-- Stores table constraints
ALTER TABLE stores ADD CONSTRAINT stores_name_length CHECK (length(name) <= 255);
ALTER TABLE stores ADD CONSTRAINT stores_category_length CHECK (length(category) <= 100);
ALTER TABLE stores ADD CONSTRAINT stores_city_length CHECK (length(city) <= 100);
ALTER TABLE stores ADD CONSTRAINT stores_state_length CHECK (length(state) <= 100);