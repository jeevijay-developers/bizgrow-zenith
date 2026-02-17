-- Update subscription plans with correct features and names

-- Update Free plan (previously enterprise)
UPDATE subscription_plans
SET 
  name = 'free',
  price = 0,
  period = 'forever',
  features = '["Up to 10 products", "Basic catalogue", "Email support", "Mobile app access"]'::jsonb,
  is_active = true,
  is_popular = false
WHERE name = 'enterprise' OR (price = 0 AND name != 'free');

-- Update Starter plan
UPDATE subscription_plans
SET 
  features = '["Up to 100 products", "Basic catalogue", "WhatsApp orders", "Email support", "Mobile app access"]'::jsonb,
  price = 999,
  is_active = true,
  is_popular = false
WHERE name = 'starter';

-- Update Pro plan
UPDATE subscription_plans
SET 
  features = '["Unlimited products", "AI Photo Upload", "Analytics dashboard", "Priority support", "Custom domain", "Advanced features"]'::jsonb,
  price = 1499,
  is_active = true,
  is_popular = true
WHERE name = 'pro';

-- Insert plans if they don't exist
INSERT INTO subscription_plans (name, price, period, features, is_active, is_popular)
SELECT 'free', 0, 'forever', '["Up to 10 products", "Basic catalogue", "Email support", "Mobile app access"]'::jsonb, true, false
WHERE NOT EXISTS (SELECT 1 FROM subscription_plans WHERE name = 'free');

INSERT INTO subscription_plans (name, price, period, features, is_active, is_popular)
SELECT 'starter', 999, 'month', '["Up to 100 products", "Basic catalogue", "WhatsApp orders", "Email support", "Mobile app access"]'::jsonb, true, false
WHERE NOT EXISTS (SELECT 1 FROM subscription_plans WHERE name = 'starter');

INSERT INTO subscription_plans (name, price, period, features, is_active, is_popular)
SELECT 'pro', 1499, 'month', '["Unlimited products", "AI Photo Upload", "Analytics dashboard", "Priority support", "Custom domain", "Advanced features"]'::jsonb, true, true
WHERE NOT EXISTS (SELECT 1 FROM subscription_plans WHERE name = 'pro');
