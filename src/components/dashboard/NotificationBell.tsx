import { useState, useEffect, useRef } from "react";
import { Bell, ShoppingCart, Package, Users, Settings, Check, X, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string | null;
  is_read: boolean;
  created_at: string;
  data: Record<string, unknown> | null;
}

interface NotificationBellProps {
  storeId: string | undefined;
}

// Audio notification using Web Audio API - more prominent sound
const playNotificationSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    // Create a more prominent notification sound
    const oscillator = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Two-tone notification sound
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.15); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.3); // G5
    
    oscillator2.frequency.setValueAtTime(392, audioContext.currentTime); // G4
    oscillator2.frequency.setValueAtTime(523.25, audioContext.currentTime + 0.15); // C5
    oscillator2.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.3); // E5
    
    gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.type = "sine";
    oscillator2.type = "triangle";
    
    oscillator.start(audioContext.currentTime);
    oscillator2.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    oscillator2.stop(audioContext.currentTime + 0.5);
  } catch (error) {
    console.log("Could not play notification sound:", error);
  }
};

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "new_order":
    case "order":
      return ShoppingCart;
    case "low_stock":
    case "stock":
      return Package;
    case "customer":
      return Users;
    default:
      return Settings;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case "new_order":
    case "order":
      return "bg-blue-500/10 text-blue-500";
    case "low_stock":
    case "stock":
      return "bg-orange-500/10 text-orange-500";
    case "customer":
      return "bg-green-500/10 text-green-500";
    default:
      return "bg-purple-500/10 text-purple-500";
  }
};

export function NotificationBell({ storeId }: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const queryClient = useQueryClient();
  const previousUnreadCount = useRef<number>(0);
  const isFirstLoad = useRef(true);

  // Fetch notifications (only unread for the bell)
  const { data: allNotifications = [] } = useQuery({
    queryKey: ["notifications", storeId],
    queryFn: async () => {
      if (!storeId) return [];
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("store_id", storeId)
        .eq("is_read", false)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data as Notification[];
    },
    enabled: !!storeId,
  });

  const notifications = allNotifications;
  const unreadCount = notifications.length;

  // Play sound when new notification arrives
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      previousUnreadCount.current = unreadCount;
      return;
    }

    // If unread count increased, play sound
    if (unreadCount > previousUnreadCount.current && soundEnabled) {
      playNotificationSound();
    }
    previousUnreadCount.current = unreadCount;
  }, [unreadCount, soundEnabled]);

  // Subscribe to realtime notifications
  useEffect(() => {
    if (!storeId) return;

    const channel = supabase
      .channel(`notifications-bell-${storeId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `store_id=eq.${storeId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["notifications", storeId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [storeId, queryClient]);

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", id);
      if (error) throw error;
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["notifications", storeId] });
      const previous = queryClient.getQueryData<Notification[]>([
        "notifications",
        storeId,
      ]);
      if (previous) {
        // Remove the notification from the list immediately
        queryClient.setQueryData<Notification[]>(
          ["notifications", storeId],
          previous.filter((notification) => notification.id !== id)
        );
      }
      return { previous };
    },
    onError: (error, _id, context) => {
      toast.error("Failed to mark notification as read");
      if (context?.previous) {
        queryClient.setQueryData(
          ["notifications", storeId],
          context.previous
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", storeId] });
    },
  });

  // Mark all as read
  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      if (!storeId) return;
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("store_id", storeId)
        .eq("is_read", false);
      if (error) throw error;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["notifications", storeId] });
      const previous = queryClient.getQueryData<Notification[]>([
        "notifications",
        storeId,
      ]);
      if (previous) {
        // Clear all notifications from the list immediately
        queryClient.setQueryData<Notification[]>(
          ["notifications", storeId],
          []
        );
      }
      return { previous };
    },
    onSuccess: () => {
      toast.success("All notifications marked as read");
    },
    onError: (error, _vars, context) => {
      toast.error("Failed to mark all notifications as read");
      if (context?.previous) {
        queryClient.setQueryData(
          ["notifications", storeId],
          context.previous
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", storeId] });
    },
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-primary/20"
              />
            )}
          </AnimatePresence>
          <Bell className={`w-5 h-5 relative z-10 ${unreadCount > 0 ? 'text-primary' : ''}`} />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1"
            >
              <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            </motion.div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Mute notifications" : "Unmute notifications"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7"
                onClick={() => markAllAsReadMutation.mutate()}
                disabled={markAllAsReadMutation.isPending}
              >
                Mark all read
              </Button>
            )}
          </div>
        </div>
        <ScrollArea className="max-h-80">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                const colorClass = getNotificationColor(notification.type);

                return (
                  <div
                    key={notification.id}
                    className="p-3 flex items-start gap-3 hover:bg-muted/50 transition-colors bg-primary/5"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {notification.title}
                      </p>
                      {notification.message && (
                        <p className="text-xs text-muted-foreground truncate">
                          {notification.message}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(notification.created_at), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0"
                      onClick={() => markAsReadMutation.mutate(notification.id)}
                      disabled={markAsReadMutation.isPending}
                    >
                      <Check className="w-3 h-3" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
        <div className="p-2 border-t">
          <Link to="/dashboard/notifications" onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full text-sm">
              View all notifications
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}