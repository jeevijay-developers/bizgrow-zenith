import { useOutletContext, useNavigate } from "react-router-dom";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategoryConfig } from "@/config/categoryConfig";
import { useState, useEffect } from "react";

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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const context = useOutletContext<DashboardContext>();
  // Grace period to allow a newly-created store to be visible in DB
  const [gracePeriodOver, setGracePeriodOver] = useState(false);
  const [creatingPendingStore, setCreatingPendingStore] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setGracePeriodOver(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch store data, auto-refetch while we're waiting for it to appear
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
    // Poll every 2 s until a store is found (stops automatically once data is truthy)
    refetchInterval: (query) => (!query.state.data ? 2000 : false),
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

  const isLoading = authLoading || storeLoading || creatingPendingStore;

  // When no store is found after the grace period, try to recover from
  // pending store data saved by the Join page (e.g. after email verification detour).
  // Only redirect to /join when there is genuinely nothing to recover.
  useEffect(() => {
    if (!gracePeriodOver || isLoading || store || !user?.id) return;

    const pendingRaw = localStorage.getItem("bizgrow_pending_store");
    if (!pendingRaw) {
      navigate("/join", { replace: true });
      return;
    }

    setCreatingPendingStore(true);
    const createFromPending = async () => {
      try {
        // Check if store already exists (e.g. created during email verification)
        const { data: existing } = await supabase
          .from("stores")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (existing) {
          localStorage.removeItem("bizgrow_pending_store");
          queryClient.invalidateQueries({ queryKey: ["user-store", user.id] });
          return;
        }

        const storeData = JSON.parse(pendingRaw);
        const { error } = await supabase.from("stores").insert({
          user_id: user.id,
          name: storeData.storeName,
          category: storeData.category,
          business_mode: storeData.businessMode,
          state: storeData.state,
          city: storeData.city,
          subscription_status: "trial",
        });

        if (error) {
          // Keep localStorage so the user can retry; send them back to /join
          navigate("/join", { replace: true });
        } else {
          // Only remove after a confirmed successful insert
          localStorage.removeItem("bizgrow_pending_store");
          queryClient.invalidateQueries({ queryKey: ["user-store", user.id] });
        }
      } catch {
        navigate("/join", { replace: true });
      } finally {
        setCreatingPendingStore(false);
      }
    };

    createFromPending();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gracePeriodOver, store, user?.id]);

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
