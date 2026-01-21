-- Fix the notifications INSERT policy to be more restrictive
-- Only allow inserts from edge functions (service role) or authenticated store owners
DROP POLICY IF EXISTS "System can insert notifications" ON public.notifications;

CREATE POLICY "System and store owners can insert notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (
  -- Allow if inserting for own store
  EXISTS (
    SELECT 1 FROM stores 
    WHERE stores.id = notifications.store_id 
    AND stores.user_id = auth.uid()
  )
  -- Service role bypasses RLS anyway, so edge functions will still work
);