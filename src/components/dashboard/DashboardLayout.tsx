import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useRealtimeOrders } from "@/hooks/useRealtimeOrders";
import { useDesktopNotifications } from "@/hooks/useDesktopNotifications";
import { useEffect } from "react";
import { toast } from "sonner";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardLayout() {
  const { user } = useAuth();
  const { 
    permission, 
    isSupported, 
    requestPermission, 
    sendNotification 
  } = useDesktopNotifications();

  const { data: store } = useQuery({
    queryKey: ["user-store", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await supabase
        .from("stores")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user?.id,
  });

  // Prompt for desktop notification permission on first visit
  useEffect(() => {
    if (isSupported && permission === "default" && store?.id) {
      // Show permission prompt after a short delay
      const timer = setTimeout(() => {
        toast.info("Enable Desktop Notifications", {
          description: "Get instant alerts when new orders arrive, even when this tab is in the background.",
          duration: 10000,
          action: {
            label: "Enable",
            onClick: async () => {
              const result = await requestPermission();
              if (result === "granted") {
                toast.success("Desktop notifications enabled!", {
                  description: "You'll now receive alerts for new orders.",
                });
              } else if (result === "denied") {
                toast.error("Notifications blocked", {
                  description: "You can enable them in your browser settings.",
                });
              }
            },
          },
        });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isSupported, permission, store?.id, requestPermission]);

  // Enable real-time order notifications with sound and desktop notifications globally
  useRealtimeOrders({
    storeId: store?.id,
    enabled: !!store?.id,
    playSound: true,
    sendDesktopNotification: permission === "granted" ? sendNotification : undefined,
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader 
            storeName={store?.name || "My Store"} 
            storeId={store?.id}
            notificationPermission={permission}
            onRequestNotificationPermission={requestPermission}
          />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet context={{ store }} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
