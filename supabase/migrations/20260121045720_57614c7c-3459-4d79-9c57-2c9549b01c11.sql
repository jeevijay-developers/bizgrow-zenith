-- Drop the overly permissive system insert policy
DROP POLICY IF EXISTS "System can insert invoices" ON public.invoices;