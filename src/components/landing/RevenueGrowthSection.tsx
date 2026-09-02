import { motion } from "framer-motion";
import { useState } from "react";
import { TrendingUp, IndianRupee, Users, ShoppingBag, BarChart3 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { CarouselDots } from "@/components/ui/carousel-dots";

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
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section className="py-20 md:py-28 bg-ledger-paper relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 border border-ledger-rule rounded-full px-4 py-2 mb-6">
            <BarChart3 className="w-4 h-4 text-ledger-sage" strokeWidth={1.75} />
            <span className="text-sm font-grotesk font-medium text-ledger-ink/75">Revenue Growth</span>
          </div>
          <h2 className="font-ledger text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-ledger-ink mb-6">
            Watch Your Business
            <span className="block mt-2">Grow 3X in 6 Months</span>
          </h2>
          <p className="font-grotesk text-lg md:text-xl text-ledger-ink/65 max-w-2xl mx-auto">
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
          <div className="bg-white border border-ledger-rule rounded-2xl p-6 md:p-8 shadow-ledger-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-ledger font-medium text-ledger-ink text-lg">Monthly Revenue Growth</h3>
              <div className="flex items-center gap-2 text-ledger-sage">
                <TrendingUp className="w-5 h-5" strokeWidth={1.75} />
                <span className="font-grotesk font-semibold">+230%</span>
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
                        ? "bg-ledger-sage"
                        : "bg-ledger-ink/60 group-hover:bg-ledger-ink/80"
                    }`}
                    style={{ height: "100%" }}
                  />
                  {/* Tooltip */}
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-ledger-ink text-ledger-paper text-xs font-grotesk font-semibold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    ₹{(data.value / 1000).toFixed(0)}K
                    <br />
                    <span className="text-ledger-paper/70">{data.growth}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between">
              {growthData.map((data) => (
                <div key={data.month} className="flex-1 text-center">
                  <p className="text-xs font-grotesk text-ledger-ink/55">{data.month}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Metrics - Mobile Carousel */}
        <div className="sm:hidden">
          <Carousel opts={{ align: "start" }} setApi={setApi}>
            <CarouselContent>
              {avgMetrics.map((metric) => (
                <CarouselItem key={metric.label} className="basis-[85%]">
                  <AvgMetricCard metric={metric} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <CarouselDots api={api} />
        </div>

        {/* Metrics - Grid (tablet & up) */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {avgMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <AvgMetricCard metric={metric} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AvgMetricCard = ({ metric }: { metric: (typeof avgMetrics)[number] }) => (
  <div className="bg-white border border-ledger-rule rounded-2xl p-6 text-center shadow-ledger-sm">
    <div className="w-12 h-12 mx-auto mb-3 rounded-xl border border-ledger-rule bg-ledger-paper flex items-center justify-center">
      <metric.icon className="w-6 h-6 text-ledger-ink/70" strokeWidth={1.75} />
    </div>
    <p className="font-ledger text-3xl font-medium text-ledger-ink mb-1">{metric.value}</p>
    <p className="text-sm font-grotesk text-ledger-ink/60 mb-2">{metric.label}</p>
    <span className="inline-flex items-center gap-1 border border-ledger-sage/30 text-ledger-sage text-xs font-grotesk font-semibold px-2 py-1 rounded-full">
      <TrendingUp className="w-3 h-3" strokeWidth={1.75} />
      {metric.growth}
    </span>
  </div>
);

export default RevenueGrowthSection;
