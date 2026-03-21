import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MobileBottomNav } from "@/components/dashboard/MobileBottomNav";
import { PWAInstallPrompt } from "@/components/dashboard/PWAInstallPrompt";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useRealtimeOrders } from "@/hooks/useRealtimeOrders";
import { useDesktopNotifications } from "@/hooks/useDesktopNotifications";
import { useEffect } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

export function DashboardLayout() {
  const location = useLocation();
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
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden lg:block">
          <DashboardSidebar storeCategory={store?.category} />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader 
            storeName={store?.name || "My Store"} 
            storeId={store?.id}
            notificationPermission={permission}
            onRequestNotificationPermission={requestPermission}
          />
          <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide p-4 md:p-6 pb-20 lg:pb-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <Outlet context={{ store }} />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
        {/* PWA Install Prompt */}
        <PWAInstallPrompt />
      </div>
    </SidebarProvider>
  );
}
