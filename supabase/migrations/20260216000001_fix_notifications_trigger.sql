-- Fix: Drop trigger that references non-existent updated_at column
-- This trigger was causing UPDATE operations on notifications table to fail

DROP TRIGGER IF EXISTS update_notifications_updated_at ON notifications;

-- Note: If you need to track when notifications are updated in the future,
-- you should first add the updated_at column to the notifications table:
-- ALTER TABLE notifications ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
-- Then recreate the trigger.
