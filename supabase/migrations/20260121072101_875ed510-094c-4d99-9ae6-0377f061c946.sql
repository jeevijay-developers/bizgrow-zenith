-- Create demo_requests table for storing schedule demo form submissions
CREATE TABLE public.demo_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_name TEXT,
  business_type TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert demo requests (public form)
CREATE POLICY "Anyone can submit demo request"
ON public.demo_requests
FOR INSERT
WITH CHECK (true);

-- Only super admins can view demo requests
CREATE POLICY "Super admins can view demo requests"
ON public.demo_requests
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM admin_users
  WHERE admin_users.user_id = auth.uid()
  AND admin_users.role = 'super_admin'
));

-- Only super admins can update demo requests
CREATE POLICY "Super admins can update demo requests"
ON public.demo_requests
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM admin_users
  WHERE admin_users.user_id = auth.uid()
  AND admin_users.role = 'super_admin'
));

-- Only super admins can delete demo requests
CREATE POLICY "Super admins can delete demo requests"
ON public.demo_requests
FOR DELETE
USING (EXISTS (
  SELECT 1 FROM admin_users
  WHERE admin_users.user_id = auth.uid()
  AND admin_users.role = 'super_admin'
));

-- Create trigger for updating timestamps
CREATE TRIGGER update_demo_requests_updated_at
BEFORE UPDATE ON public.demo_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();