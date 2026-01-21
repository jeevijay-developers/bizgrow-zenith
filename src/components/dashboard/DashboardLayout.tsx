import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useRealtimeOrders } from "@/hooks/useRealtimeOrders";

export function DashboardLayout() {
  const { user } = useAuth();

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

  // Enable real-time order notifications with sound globally across dashboard
  useRealtimeOrders({
    storeId: store?.id,
    enabled: !!store?.id,
    playSound: true,
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader storeName={store?.name || "My Store"} storeId={store?.id} />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet context={{ store }} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
