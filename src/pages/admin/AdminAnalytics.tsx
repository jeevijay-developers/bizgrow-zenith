import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Store, ShoppingCart, IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const AdminAnalytics = () => {
  // Fetch analytics data
  const { data: analyticsData } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const [storesResult, ordersResult, customersResult] = await Promise.all([
        supabase.from("stores").select("created_at"),
        supabase.from("orders").select("created_at, total_amount"),
        supabase.from("customers").select("created_at"),
      ]);

      // Group by month for charts
      const monthlyData: Record<string, { stores: number; orders: number; revenue: number; customers: number }> = {};
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
      months.forEach((month) => {
        monthlyData[month] = { stores: 0, orders: 0, revenue: 0, customers: 0 };
      });

      storesResult.data?.forEach((store) => {
        const month = months[new Date(store.created_at).getMonth()];
        monthlyData[month].stores++;
      });

      ordersResult.data?.forEach((order) => {
        const month = months[new Date(order.created_at).getMonth()];
        monthlyData[month].orders++;
        monthlyData[month].revenue += order.total_amount || 0;
      });

      customersResult.data?.forEach((customer) => {
        const month = months[new Date(customer.created_at).getMonth()];
        monthlyData[month].customers++;
      });

      const chartData = months.map((month) => ({
        name: month,
        ...monthlyData[month],
      }));

      return {
        chartData,
        totals: {
          stores: storesResult.data?.length || 0,
          orders: ordersResult.data?.length || 0,
          revenue: ordersResult.data?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0,
          customers: customersResult.data?.length || 0,
        },
      };
    },
  });

  const chartData = analyticsData?.chartData || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Platform Analytics</h1>
        <p className="text-muted-foreground">Overview of platform performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { title: "Total Stores", value: analyticsData?.totals.stores || 0, icon: Store, color: "text-blue-500" },
          { title: "Total Orders", value: analyticsData?.totals.orders || 0, icon: ShoppingCart, color: "text-green-500" },
          { title: "Total Revenue", value: `₹${(analyticsData?.totals.revenue || 0).toLocaleString()}`, icon: IndianRupee, color: "text-accent" },
          { title: "Total Customers", value: analyticsData?.totals.customers || 0, icon: Users, color: "text-purple-500" },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-muted`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    fill="url(#revenueGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Orders & Stores Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Orders & Store Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="stores" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;