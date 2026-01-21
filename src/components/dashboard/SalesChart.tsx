import { useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOutletContext } from "react-router-dom";
import { format, subDays, startOfDay, endOfDay, eachDayOfInterval, subMonths, startOfMonth, eachMonthOfInterval } from "date-fns";
import { Loader2 } from "lucide-react";

interface DashboardContext {
  store: {
    id: string;
    name: string;
  } | null;
}

type TimeRange = "week" | "month" | "year";

interface SalesChartProps {
  storeId?: string;
}

export function SalesChart({ storeId: propStoreId }: SalesChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("week");
  
  // Try to get store from context, fallback to prop
  let contextStoreId: string | undefined;
  try {
    const context = useOutletContext<DashboardContext>();
    contextStoreId = context?.store?.id;
  } catch {
    // Not in outlet context
  }
  
  const storeId = propStoreId || contextStoreId;

  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ["sales-chart", storeId, timeRange],
    queryFn: async () => {
      if (!storeId) return [];

      const now = new Date();
      let startDate: Date;
      let dateFormat: string;
      let intervals: Date[];

      if (timeRange === "week") {
        startDate = subDays(now, 6);
        dateFormat = "EEE"; // Mon, Tue, etc.
        intervals = eachDayOfInterval({ start: startDate, end: now });
      } else if (timeRange === "month") {
        startDate = subDays(now, 29);
        dateFormat = "MMM d"; // Jan 1, etc.
        intervals = eachDayOfInterval({ start: startDate, end: now });
      } else {
        startDate = subMonths(now, 11);
        dateFormat = "MMM"; // Jan, Feb, etc.
        intervals = eachMonthOfInterval({ start: startOfMonth(startDate), end: startOfMonth(now) });
      }

      // Fetch orders within the date range
      const { data: orders } = await supabase
        .from("orders")
        .select("total_amount, created_at")
        .eq("store_id", storeId)
        .gte("created_at", startOfDay(startDate).toISOString())
        .lte("created_at", endOfDay(now).toISOString());

      const allOrders = orders || [];

      // Group orders by interval
      if (timeRange === "year") {
        // Group by month for year view
        const monthlyData: Record<string, { sales: number; orders: number }> = {};
        
        intervals.forEach(date => {
          const key = format(date, "yyyy-MM");
          monthlyData[key] = { sales: 0, orders: 0 };
        });

        allOrders.forEach(order => {
          const key = format(new Date(order.created_at), "yyyy-MM");
          if (monthlyData[key]) {
            monthlyData[key].sales += order.total_amount || 0;
            monthlyData[key].orders += 1;
          }
        });

        return intervals.map(date => {
          const key = format(date, "yyyy-MM");
          return {
            name: format(date, dateFormat),
            sales: Math.round(monthlyData[key]?.sales || 0),
            orders: monthlyData[key]?.orders || 0,
          };
        });
      } else {
        // Group by day for week/month view
        const dailyData: Record<string, { sales: number; orders: number }> = {};
        
        intervals.forEach(date => {
          const key = format(date, "yyyy-MM-dd");
          dailyData[key] = { sales: 0, orders: 0 };
        });

        allOrders.forEach(order => {
          const key = format(new Date(order.created_at), "yyyy-MM-dd");
          if (dailyData[key]) {
            dailyData[key].sales += order.total_amount || 0;
            dailyData[key].orders += 1;
          }
        });

        return intervals.map(date => {
          const key = format(date, "yyyy-MM-dd");
          return {
            name: format(date, dateFormat),
            sales: Math.round(dailyData[key]?.sales || 0),
            orders: dailyData[key]?.orders || 0,
          };
        });
      }
    },
    enabled: !!storeId,
  });

  const totalSales = chartData.reduce((sum, d) => sum + d.sales, 0);
  const totalOrders = chartData.reduce((sum, d) => sum + d.orders, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-card rounded-xl border border-border p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold">Sales Overview</h3>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-sm text-muted-foreground">
              ₹{totalSales.toLocaleString()} from {totalOrders} orders
            </p>
          </div>
        </div>
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          <Button 
            variant={timeRange === "week" ? "default" : "ghost"} 
            size="sm" 
            className="text-xs h-7"
            onClick={() => setTimeRange("week")}
          >
            Week
          </Button>
          <Button 
            variant={timeRange === "month" ? "default" : "ghost"} 
            size="sm" 
            className="text-xs h-7"
            onClick={() => setTimeRange("month")}
          >
            Month
          </Button>
          <Button 
            variant={timeRange === "year" ? "default" : "ghost"} 
            size="sm" 
            className="text-xs h-7"
            onClick={() => setTimeRange("year")}
          >
            Year
          </Button>
        </div>
      </div>
      
      <div className="h-[250px]">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : chartData.length === 0 || totalSales === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <p className="text-sm">No sales data for this period</p>
            <p className="text-xs mt-1">Orders will show up here once placed</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                formatter={(value: number, name: string) => [
                  name === "sales" ? `₹${value.toLocaleString()}` : value,
                  name === "sales" ? "Sales" : "Orders"
                ]}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}
