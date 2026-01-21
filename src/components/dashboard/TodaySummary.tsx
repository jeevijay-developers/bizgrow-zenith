import { motion } from "framer-motion";
import { 
  TrendingUp, TrendingDown, IndianRupee, ShoppingBag, 
  Package, Clock, ArrowUpRight, Minus 
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface TodaySummaryProps {
  storeId: string;
}

export function TodaySummary({ storeId }: TodaySummaryProps) {
  const { data: summary, isLoading } = useQuery({
    queryKey: ["today-summary", storeId],
    queryFn: async () => {
      const now = new Date();
      const todayStart = new Date(now);
      todayStart.setHours(0, 0, 0, 0);
      
      const yesterdayStart = new Date(todayStart);
      yesterdayStart.setDate(yesterdayStart.getDate() - 1);
      
      const yesterdayEnd = new Date(todayStart);
      
      // Fetch today's orders
      const { data: todayOrders } = await supabase
        .from("orders")
        .select("total_amount, items, status, created_at")
        .eq("store_id", storeId)
        .gte("created_at", todayStart.toISOString());
      
      // Fetch yesterday's orders for comparison
      const { data: yesterdayOrders } = await supabase
        .from("orders")
        .select("total_amount")
        .eq("store_id", storeId)
        .gte("created_at", yesterdayStart.toISOString())
        .lt("created_at", yesterdayEnd.toISOString());
      
      const orders = todayOrders || [];
      const yOrders = yesterdayOrders || [];
      
      const todayRevenue = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
      const yesterdayRevenue = yOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
      
      const pendingOrders = orders.filter(o => o.status === "pending").length;
      const completedOrders = orders.filter(o => o.status === "delivered" || o.status === "completed").length;
      
      // Calculate top selling product
      const productSales: Record<string, { name: string; quantity: number }> = {};
      orders.forEach(order => {
        const items = order.items as Array<{ name: string; quantity: number }>;
        if (Array.isArray(items)) {
          items.forEach(item => {
            if (!productSales[item.name]) {
              productSales[item.name] = { name: item.name, quantity: 0 };
            }
            productSales[item.name].quantity += item.quantity || 1;
          });
        }
      });
      
      const topProduct = Object.values(productSales).sort((a, b) => b.quantity - a.quantity)[0];
      
      // Revenue change percentage
      let revenueChange = 0;
      if (yesterdayRevenue > 0) {
        revenueChange = ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100;
      } else if (todayRevenue > 0) {
        revenueChange = 100;
      }
      
      return {
        todayRevenue,
        yesterdayRevenue,
        revenueChange,
        totalOrders: orders.length,
        pendingOrders,
        completedOrders,
        topProduct: topProduct?.name || null,
        topProductQty: topProduct?.quantity || 0,
      };
    },
    enabled: !!storeId,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      </motion.div>
    );
  }

  const stats = [
    {
      label: "Today's Revenue",
      value: `₹${(summary?.todayRevenue || 0).toLocaleString()}`,
      subValue: summary?.revenueChange !== 0 ? (
        <span className={`flex items-center gap-1 text-xs ${
          (summary?.revenueChange || 0) > 0 ? "text-green-600" : (summary?.revenueChange || 0) < 0 ? "text-red-500" : "text-muted-foreground"
        }`}>
          {(summary?.revenueChange || 0) > 0 ? (
            <TrendingUp className="w-3 h-3" />
          ) : (summary?.revenueChange || 0) < 0 ? (
            <TrendingDown className="w-3 h-3" />
          ) : (
            <Minus className="w-3 h-3" />
          )}
          {Math.abs(summary?.revenueChange || 0).toFixed(0)}% vs yesterday
        </span>
      ) : (
        <span className="text-xs text-muted-foreground">No change</span>
      ),
      icon: IndianRupee,
      iconBg: "bg-green-500/10 text-green-600",
    },
    {
      label: "Orders Today",
      value: String(summary?.totalOrders || 0),
      subValue: (
        <span className="text-xs text-muted-foreground">
          {summary?.pendingOrders || 0} pending · {summary?.completedOrders || 0} done
        </span>
      ),
      icon: ShoppingBag,
      iconBg: "bg-blue-500/10 text-blue-600",
    },
    {
      label: "Top Selling",
      value: summary?.topProduct || "—",
      subValue: summary?.topProduct ? (
        <span className="text-xs text-muted-foreground">
          {summary.topProductQty} units sold today
        </span>
      ) : (
        <span className="text-xs text-muted-foreground">No sales yet</span>
      ),
      icon: Package,
      iconBg: "bg-purple-500/10 text-purple-600",
    },
    {
      label: "Peak Hour",
      value: getPeakHour(),
      subValue: (
        <span className="text-xs text-muted-foreground">
          Most orders expected
        </span>
      ),
      icon: Clock,
      iconBg: "bg-orange-500/10 text-orange-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card rounded-xl border border-border p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <ArrowUpRight className="w-5 h-5 text-primary" />
          Today's Summary
        </h3>
        <span className="text-xs text-muted-foreground">
          Auto-updates every 30s
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-muted/50 rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.iconBg}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xl font-bold truncate">{stat.value}</p>
            {stat.subValue}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function getPeakHour(): string {
  const hour = new Date().getHours();
  // Typical Indian store peak hours
  if (hour >= 10 && hour < 13) return "10 AM - 1 PM";
  if (hour >= 17 && hour < 21) return "5 PM - 9 PM";
  if (hour < 10) return "10 AM - 1 PM";
  return "5 PM - 9 PM";
}
