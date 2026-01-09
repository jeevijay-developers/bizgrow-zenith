-- Create admin_users table for platform administrators
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'support',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Super admins can view all admin users
CREATE POLICY "Admins can view admin users"
ON public.admin_users
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM admin_users au WHERE au.user_id = auth.uid() AND au.role = 'super_admin'
  )
);

-- Super admins can manage admin users
CREATE POLICY "Super admins can manage admin users"
ON public.admin_users
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM admin_users au WHERE au.user_id = auth.uid() AND au.role = 'super_admin'
  )
);

-- Create notifications table for seller notifications
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  user_id UUID,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Store owners can view their notifications
CREATE POLICY "Store owners can view their notifications"
ON public.notifications
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM stores WHERE stores.id = notifications.store_id AND stores.user_id = auth.uid()
  )
);

-- Store owners can update their notifications (mark as read)
CREATE POLICY "Store owners can update their notifications"
ON public.notifications
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM stores WHERE stores.id = notifications.store_id AND stores.user_id = auth.uid()
  )
);

-- Store owners can delete their notifications
CREATE POLICY "Store owners can delete their notifications"
ON public.notifications
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM stores WHERE stores.id = notifications.store_id AND stores.user_id = auth.uid()
  )
);

-- System can insert notifications (for triggers/edge functions)
CREATE POLICY "System can insert notifications"
ON public.notifications
FOR INSERT
WITH CHECK (true);

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- Add RLS policy for public order creation (customer checkout)
CREATE POLICY "Public can insert orders with valid store_id"
ON public.orders
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM stores WHERE stores.id = orders.store_id AND stores.is_active = true
  )
);

-- Add RLS policy for public customer creation
CREATE POLICY "Public can insert customers with valid store_id"
ON public.customers
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM stores WHERE stores.id = customers.store_id AND stores.is_active = true
  )
);

-- Update products RLS to allow public view (already exists but ensuring it works)
-- Products from active stores should be viewable by anyone (for store catalogue)

-- Create trigger to update updated_at on notifications (using existing function)
CREATE TRIGGER update_notifications_updated_at
BEFORE UPDATE ON public.notifications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();