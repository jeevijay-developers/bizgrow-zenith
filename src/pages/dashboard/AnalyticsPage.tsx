import { motion } from "framer-motion";
import { BarChart3, TrendingUp, IndianRupee, ShoppingCart, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const categoryData = [
  { name: "Groceries", value: 35, color: "hsl(var(--primary))" },
  { name: "Dairy", value: 25, color: "#10b981" },
  { name: "Snacks", value: 20, color: "#f59e0b" },
  { name: "Beverages", value: 15, color: "#6366f1" },
  { name: "Others", value: 5, color: "#8b5cf6" },
];

const topProducts = [
  { name: "Tata Salt", sales: 450 },
  { name: "Amul Butter", sales: 380 },
  { name: "Maggi Noodles", sales: 320 },
  { name: "Fortune Oil", sales: 280 },
  { name: "Parle-G", sales: 250 },
];

const AnalyticsPage = () => {
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
            Last 7 days
          </Button>
          <Button variant="outline" size="sm">Export</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value="₹87,450"
          change="+18.2% from last week"
          changeType="positive"
          icon={IndianRupee}
          iconColor="bg-green-500/10 text-green-600"
        />
        <StatsCard
          title="Total Orders"
          value="342"
          change="+24 orders"
          changeType="positive"
          icon={ShoppingCart}
          iconColor="bg-blue-500/10 text-blue-600"
        />
        <StatsCard
          title="Avg Order Value"
          value="₹256"
          change="+5.3%"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-purple-500/10 text-purple-600"
        />
        <StatsCard
          title="New Customers"
          value="89"
          change="+12 this week"
          changeType="positive"
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
          <h3 className="text-lg font-semibold mb-2">Sales by Category</h3>
          <p className="text-sm text-muted-foreground mb-6">Revenue distribution</p>
          
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
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <h3 className="text-lg font-semibold mb-2">Top Selling Products</h3>
          <p className="text-sm text-muted-foreground mb-6">By units sold</p>
          
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
              { label: "Order Completion Rate", value: "94%", progress: 94 },
              { label: "Customer Satisfaction", value: "4.8/5", progress: 96 },
              { label: "On-time Delivery", value: "89%", progress: 89 },
              { label: "Repeat Customers", value: "67%", progress: 67 },
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
