import { motion } from "framer-motion";
import { BarChart3, TrendingUp, IndianRupee, ShoppingCart, Users, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOutletContext } from "react-router-dom";

interface DashboardContext {
  store: {
    id: string;
    name: string;
  } | null;
}

const AnalyticsPage = () => {
  const { store } = useOutletContext<DashboardContext>();

  // Fetch order stats
  const { data: orderStats, isLoading: ordersLoading } = useQuery({
    queryKey: ["analytics-orders", store?.id],
    queryFn: async () => {
      if (!store?.id) return { total: 0, revenue: 0, avgOrderValue: 0 };
      
      const { data: orders } = await supabase
        .from("orders")
        .select("total_amount, status")
        .eq("store_id", store.id);
      
      const allOrders = orders || [];
      const totalRevenue = allOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
      const avgOrderValue = allOrders.length > 0 ? Math.round(totalRevenue / allOrders.length) : 0;
      
      return {
        total: allOrders.length,
        revenue: totalRevenue,
        avgOrderValue,
        delivered: allOrders.filter(o => o.status === "delivered").length
      };
    },
    enabled: !!store?.id,
  });

  // Fetch customer count
  const { data: customerCount = 0 } = useQuery({
    queryKey: ["analytics-customers", store?.id],
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

  // Fetch products by category
  const { data: categoryData = [] } = useQuery({
    queryKey: ["analytics-categories", store?.id],
    queryFn: async () => {
      if (!store?.id) return [];
      const { data: products } = await supabase
        .from("products")
        .select("category")
        .eq("store_id", store.id);
      
      if (!products || products.length === 0) return [];
      
      // Group by category
      const categoryCount: Record<string, number> = {};
      products.forEach(p => {
        const cat = p.category || "Others";
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      });
      
      const colors = ["hsl(var(--primary))", "#10b981", "#f59e0b", "#6366f1", "#8b5cf6", "#ec4899"];
      const total = products.length;
      
      return Object.entries(categoryCount).map(([name, count], idx) => ({
        name,
        value: Math.round((count / total) * 100),
        color: colors[idx % colors.length]
      }));
    },
    enabled: !!store?.id,
  });

  // Fetch top products
  const { data: topProducts = [] } = useQuery({
    queryKey: ["analytics-top-products", store?.id],
    queryFn: async () => {
      if (!store?.id) return [];
      const { data: products } = await supabase
        .from("products")
        .select("name, stock_quantity")
        .eq("store_id", store.id)
        .order("created_at", { ascending: false })
        .limit(5);
      
      // Since we don't have sales data, show products by stock as placeholder
      return (products || []).map(p => ({
        name: p.name.length > 15 ? p.name.slice(0, 15) + "..." : p.name,
        sales: p.stock_quantity || 0
      }));
    },
    enabled: !!store?.id,
  });

  if (ordersLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track your store performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="w-4 h-4" />
            All Time
          </Button>
          <Button variant="outline" size="sm">Export</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={`₹${(orderStats?.revenue || 0).toLocaleString()}`}
          change={orderStats?.total ? `From ${orderStats.total} orders` : "No orders yet"}
          changeType={orderStats?.revenue ? "positive" : "neutral"}
          icon={IndianRupee}
          iconColor="bg-green-500/10 text-green-600"
        />
        <StatsCard
          title="Total Orders"
          value={String(orderStats?.total || 0)}
          change={orderStats?.delivered ? `${orderStats.delivered} delivered` : "No deliveries yet"}
          changeType={orderStats?.total ? "positive" : "neutral"}
          icon={ShoppingCart}
          iconColor="bg-blue-500/10 text-blue-600"
        />
        <StatsCard
          title="Avg Order Value"
          value={`₹${orderStats?.avgOrderValue || 0}`}
          change="Per order"
          changeType="neutral"
          icon={TrendingUp}
          iconColor="bg-purple-500/10 text-purple-600"
        />
        <StatsCard
          title="Total Customers"
          value={String(customerCount)}
          change={customerCount > 0 ? "Active customers" : "No customers yet"}
          changeType={customerCount > 0 ? "positive" : "neutral"}
          icon={Users}
          iconColor="bg-orange-500/10 text-orange-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <SalesChart />

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <h3 className="text-lg font-semibold mb-2">Products by Category</h3>
          <p className="text-sm text-muted-foreground mb-6">Distribution of your catalogue</p>
          
          {categoryData.length === 0 ? (
            <div className="h-[250px] flex items-center justify-center text-muted-foreground">
              No products to analyze
            </div>
          ) : (
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Share"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <h3 className="text-lg font-semibold mb-2">Products Inventory</h3>
          <p className="text-sm text-muted-foreground mb-6">By stock quantity</p>
          
          {topProducts.length === 0 ? (
            <div className="h-[250px] flex items-center justify-center text-muted-foreground">
              No products to display
            </div>
          ) : (
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    width={100}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>

        {/* Performance Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <h3 className="text-lg font-semibold mb-6">Performance Summary</h3>
          
          <div className="space-y-4">
            {[
              { 
                label: "Order Completion Rate", 
                value: orderStats?.total ? `${Math.round(((orderStats?.delivered || 0) / orderStats.total) * 100)}%` : "0%", 
                progress: orderStats?.total ? Math.round(((orderStats?.delivered || 0) / orderStats.total) * 100) : 0 
              },
              { 
                label: "Customer Growth", 
                value: `${customerCount} customers`, 
                progress: Math.min(customerCount * 10, 100) 
              },
              { 
                label: "Catalogue Size", 
                value: `${categoryData.length > 0 ? "Active" : "Empty"}`, 
                progress: categoryData.length > 0 ? 100 : 0 
              },
              { 
                label: "Store Activity", 
                value: orderStats?.total ? "Active" : "Getting started", 
                progress: orderStats?.total ? 100 : 25 
              },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
