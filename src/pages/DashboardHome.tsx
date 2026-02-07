import { useOutletContext, Navigate } from "react-router-dom";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { CategoryStatsCard } from "@/components/dashboard/CategoryStatsCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { LowStockAlert } from "@/components/dashboard/LowStockAlert";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { TodaySummary } from "@/components/dashboard/TodaySummary";
import { CategoryTips } from "@/components/dashboard/CategoryTips";
import { useAuth } from "@/hooks/useAuth";
import { DashboardStatsSkeleton } from "@/components/ui/skeleton-loaders";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { getCategoryConfig } from "@/config/categoryConfig";

interface DashboardContext {
  store: {
    id: string;
    name: string;
    category: string;
    business_mode: string;
    city?: string;
    state?: string;
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

  // Get category config for terminology
  const categoryConfig = getCategoryConfig(store?.category);

  // Fetch product count
  const { data: productCount = 0 } = useQuery({
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

  // Fetch order stats
  const { data: orderStats } = useQuery({
    queryKey: ["order-stats", store?.id],
    queryFn: async () => {
      if (!store?.id) return { total: 0, todayRevenue: 0, newOrders: 0 };
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Get all orders
      const { data: orders } = await supabase
        .from("orders")
        .select("total_amount, created_at, status")
        .eq("store_id", store.id);
      
      const allOrders = orders || [];
      const todayOrders = allOrders.filter(o => new Date(o.created_at) >= today);
      const todayRevenue = todayOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
      
      return {
        total: allOrders.length,
        todayRevenue,
        newOrders: todayOrders.length
      };
    },
    enabled: !!store?.id,
  });

  // Fetch customer count
  const { data: customerCount = 0 } = useQuery({
    queryKey: ["customer-count", store?.id],
    queryFn: async () => {
      if (!store?.id) return 0;
      const { count } = await supabase
        .from("customers")
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
      {/* Welcome Banner - Category Themed */}
      <WelcomeBanner 
        storeName={store?.name || "My Store"} 
        isNewStore={isNewStore}
        storeCategory={store?.category}
      />

      {/* Stats Grid - Category Themed */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <CategoryStatsCard
          title="Today's Revenue"
          value={`₹${(orderStats?.todayRevenue || 0).toLocaleString()}`}
          change={orderStats?.newOrders ? `+${orderStats.newOrders} ${categoryConfig.terminology.orderPlural} today` : `No ${categoryConfig.terminology.orderPlural} yet`}
          changeType={orderStats?.todayRevenue ? "positive" : "neutral"}
          statType="revenue"
          storeCategory={store?.category}
          delay={0.05}
        />
        <CategoryStatsCard
          title={`Total ${categoryConfig.terminology.orderPlural}`}
          value={String(orderStats?.total || 0)}
          change={orderStats?.newOrders ? `+${orderStats.newOrders} today` : `No ${categoryConfig.terminology.orderPlural} yet`}
          changeType={orderStats?.newOrders ? "positive" : "neutral"}
          statType="orders"
          storeCategory={store?.category}
          delay={0.1}
        />
        <CategoryStatsCard
          title={categoryConfig.terminology.productPlural}
          value={String(productCount)}
          change={isNewStore ? `Add your first ${categoryConfig.terminology.product}` : "In catalogue"}
          changeType="neutral"
          statType="products"
          storeCategory={store?.category}
          delay={0.15}
        />
        <CategoryStatsCard
          title={categoryConfig.terminology.customerPlural}
          value={String(customerCount)}
          change={customerCount === 0 ? `No ${categoryConfig.terminology.customerPlural} yet` : `Total ${categoryConfig.terminology.customerPlural}`}
          changeType="neutral"
          statType="customers"
          storeCategory={store?.category}
          delay={0.2}
        />
      </div>

      {/* Quick Actions - Category Specific */}
      <QuickActions storeCategory={store?.category} />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Sales Chart */}
          <SalesChart />
          
          {/* Recent Orders */}
          <RecentOrders />
        </div>

        <div className="space-y-6">
          {/* Today's Summary */}
          {store?.id && <TodaySummary storeId={store.id} />}
          
          {/* Category Tips */}
          <CategoryTips storeCategory={store?.category} />
          
          {/* Low Stock Alert */}
          <LowStockAlert />

          {/* Store Info Card - Category Themed */}
          <div
            className="bg-card rounded-xl border border-border overflow-hidden"
          >
            {/* Category header */}
            <div className={`bg-gradient-to-r ${categoryConfig.theme.gradient} p-4`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <categoryConfig.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Store Info</h3>
                  <p className="text-xs text-white/80">{categoryConfig.label}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Store Name</span>
                <span className="font-medium">{store?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{categoryConfig.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mode</span>
                <span className="font-medium capitalize">{(store?.business_mode || "").replace("-", " + ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">{store?.city || "N/A"}, {store?.state || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
