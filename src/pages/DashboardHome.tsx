import { motion } from "framer-motion";
import { useOutletContext, Navigate } from "react-router-dom";
import { IndianRupee, ShoppingCart, Package, Users } from "lucide-react";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { LowStockAlert } from "@/components/dashboard/LowStockAlert";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { useAuth } from "@/hooks/useAuth";
import { DashboardStatsSkeleton } from "@/components/ui/skeleton-loaders";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface DashboardContext {
  store: {
    id: string;
    name: string;
    category: string;
    business_mode: string;
  } | null;
}

const DashboardHome = () => {
  const { user, loading: authLoading } = useAuth();
  const context = useOutletContext<DashboardContext>();
  
  // Fetch store data
  const { data: store, isLoading: storeLoading } = useQuery({
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

  // Fetch product count
  const { data: productCount } = useQuery({
    queryKey: ["product-count", store?.id],
    queryFn: async () => {
      if (!store?.id) return 0;
      const { count } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("store_id", store.id);
      return count || 0;
    },
    enabled: !!store?.id,
  });

  const isLoading = authLoading || storeLoading;

  // If no store, redirect to join
  if (!isLoading && !store) {
    return <Navigate to="/join" replace />;
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-32 bg-muted rounded-2xl animate-pulse" />
        <DashboardStatsSkeleton />
      </div>
    );
  }

  const isNewStore = productCount === 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <WelcomeBanner storeName={store?.name || "My Store"} isNewStore={isNewStore} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Today's Revenue"
          value="₹12,450"
          change="+12.5% from yesterday"
          changeType="positive"
          icon={IndianRupee}
          iconColor="bg-green-500/10 text-green-600"
          delay={0.05}
        />
        <StatsCard
          title="Total Orders"
          value="48"
          change="+8 new orders"
          changeType="positive"
          icon={ShoppingCart}
          iconColor="bg-blue-500/10 text-blue-600"
          delay={0.1}
        />
        <StatsCard
          title="Products"
          value={String(productCount || 0)}
          change={isNewStore ? "Add your first product" : "In catalogue"}
          changeType="neutral"
          icon={Package}
          iconColor="bg-purple-500/10 text-purple-600"
          delay={0.15}
        />
        <StatsCard
          title="Customers"
          value="156"
          change="+23 this week"
          changeType="positive"
          icon={Users}
          iconColor="bg-orange-500/10 text-orange-600"
          delay={0.2}
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Sales Chart */}
          <SalesChart />
          
          {/* Recent Orders */}
          <RecentOrders />
        </div>

        <div className="space-y-6">
          {/* Low Stock Alert */}
          <LowStockAlert />

          {/* Store Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <h3 className="font-semibold mb-4">Store Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Store Name</span>
                <span className="font-medium">{store?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium capitalize">{store?.category?.replace("-", " ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mode</span>
                <span className="font-medium capitalize">{store?.business_mode?.replace("-", " + ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">{store?.city}, {store?.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
