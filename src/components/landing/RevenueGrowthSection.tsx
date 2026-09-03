import { motion } from "framer-motion";
import { TrendingUp, IndianRupee, Users, ShoppingBag, BarChart3 } from "lucide-react";

const growthData = [
  { month: "Month 1", value: 50000, growth: "Baseline" },
  { month: "Month 2", value: 65000, growth: "+30%" },
  { month: "Month 3", value: 85000, growth: "+70%" },
  { month: "Month 4", value: 110000, growth: "+120%" },
  { month: "Month 5", value: 135000, growth: "+170%" },
  { month: "Month 6", value: 165000, growth: "+230%" },
];

const avgMetrics = [
  { icon: IndianRupee, value: "₹1.5L", label: "Avg Monthly Revenue", growth: "+230%" },
  { icon: Users, value: "200+", label: "Monthly Customers", growth: "+180%" },
  { icon: ShoppingBag, value: "450+", label: "Monthly Orders", growth: "+320%" },
];

const RevenueGrowthSection = () => {
  const maxValue = Math.max(...growthData.map(d => d.value));

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-[5%] w-72 h-72 bg-green-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6">
            <BarChart3 className="w-4 h-4 text-green-500" />
            <span className="text-sm font-semibold text-green-600">Revenue Growth</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-display">
            Watch Your Business
            <span className="text-green-500 block mt-2">Grow 3X in 6 Months</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Average revenue growth of our partner stores after switching to BizGrow 360
          </p>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-foreground text-lg">Monthly Revenue Growth</h3>
              <div className="flex items-center gap-2 text-green-500">
                <TrendingUp className="w-5 h-5" />
                <span className="font-bold">+230%</span>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between gap-2 md:gap-4 h-64 mb-4">
              {growthData.map((data, index) => (
                <motion.div
                  key={data.month}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(data.value / maxValue) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex-1 relative group cursor-pointer"
                >
                  <div 
                    className={`absolute bottom-0 inset-x-0 rounded-t-lg transition-colors ${
                      index === growthData.length - 1 
                        ? "bg-gradient-to-t from-green-600 to-green-400" 
                        : "bg-gradient-to-t from-primary/80 to-primary/60 group-hover:from-primary group-hover:to-primary/80"
                    }`}
                    style={{ height: "100%" }}
                  />
                  {/* Tooltip */}
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    ₹{(data.value / 1000).toFixed(0)}K
                    <br />
                    <span className="text-green-400">{data.growth}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between">
              {growthData.map((data) => (
                <div key={data.month} className="flex-1 text-center">
                  <p className="text-xs text-muted-foreground">{data.month}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Metrics */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {avgMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:border-green-500/30 hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-green-500/10 flex items-center justify-center">
                <metric.icon className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{metric.value}</p>
              <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
              <span className="inline-flex items-center gap-1 bg-green-500/10 text-green-600 text-xs font-bold px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" />
                {metric.growth}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RevenueGrowthSection;
