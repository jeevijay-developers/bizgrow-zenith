import { useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UseRealtimeOrdersOptions {
  storeId: string | undefined;
  enabled?: boolean;
  onNewOrder?: (order: unknown) => void;
  playSound?: boolean;
}

// Audio notification using Web Audio API
const playNotificationSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    // Create a pleasant notification sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (error) {
    console.log("Could not play notification sound:", error);
  }
};

export function useRealtimeOrders({
  storeId,
  enabled = true,
  onNewOrder,
  playSound = true,
}: UseRealtimeOrdersOptions) {
  const queryClient = useQueryClient();
  const isFirstMount = useRef(true);

  const handleNewOrder = useCallback(
    (payload: { new: Record<string, unknown> }) => {
      // Skip the first mount to avoid playing sound on initial load
      if (isFirstMount.current) {
        isFirstMount.current = false;
        return;
      }

      const newOrder = payload.new;
      
      // Play notification sound
      if (playSound) {
        playNotificationSound();
      }

      // Show toast notification
      toast.success("New Order Received!", {
        description: `Order from ${newOrder.customer_name || "Customer"}`,
        duration: 5000,
      });

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["orders", storeId] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats", storeId] });
      queryClient.invalidateQueries({ queryKey: ["recent-orders", storeId] });

      // Call custom callback
      if (onNewOrder) {
        onNewOrder(newOrder);
      }
    },
    [storeId, playSound, onNewOrder, queryClient]
  );

  const handleOrderUpdate = useCallback(
    (payload: { new: Record<string, unknown>; old: Record<string, unknown> }) => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["orders", storeId] });
      
      // Show subtle update notification
      if (payload.old.status !== payload.new.status) {
        toast.info("Order Updated", {
          description: `Order status changed to ${payload.new.status}`,
          duration: 3000,
        });
      }
    },
    [storeId, queryClient]
  );

  useEffect(() => {
    if (!storeId || !enabled) return;

    // Reset first mount flag when storeId changes
    isFirstMount.current = true;

    const channel = supabase
      .channel(`orders-realtime-${storeId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "orders",
          filter: `store_id=eq.${storeId}`,
        },
        handleNewOrder
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `store_id=eq.${storeId}`,
        },
        handleOrderUpdate
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [storeId, enabled, handleNewOrder, handleOrderUpdate]);

  return {
    playNotificationSound,
  };
}
