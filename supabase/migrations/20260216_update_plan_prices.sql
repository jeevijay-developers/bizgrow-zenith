-- Update subscription plan prices

-- Update Starter plan price from 499 to 999
UPDATE subscription_plans
SET price = 999
WHERE name = 'starter';

-- Update Pro plan price from 999 to 1499
UPDATE subscription_plans
SET price = 1499
WHERE name = 'pro';
