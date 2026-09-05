import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Clock, IndianRupee, FileText, CheckCircle2, Zap, Sparkles, XCircle } from "lucide-react";
import beforeAfterImage from "@/assets/before-after-transform.jpg";
import { MobileCarousel } from "@/components/ui/mobile-carousel";
import { BizgrowTag } from "@/components/ui/bizgrow-tag";

const transformMetrics = [
  { 
    icon: TrendingUp, 
    label: "Average Revenue",
    before: "₹50K/month", 
    after: "₹1.5L/month", 
    badge: "+200% Growth",
    badgeIcon: TrendingUp,
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  { 
    icon: Clock, 
    label: "Time on Billing",
    before: "4+ hours/day", 
    after: "30 mins/day", 
    badge: "85% Time Saved",
    badgeIcon: Zap,
    badgeColor: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  },
  { 
    icon: IndianRupee, 
    label: "Credit Management",
    before: "Paper Udhari", 
    after: "Digital Tracking", 
    badge: "100% Accurate",
    badgeIcon: CheckCircle2,
    badgeColor: "bg-purple-500/10 text-purple-700 border-purple-500/20",
  },
  { 
    icon: FileText, 
    label: "Billing System",
    before: "Manual Bills", 
    after: "GST Compliant", 
    badge: "Fully Automated",
    badgeIcon: Sparkles,
    badgeColor: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  },
];

interface MetricCardProps {
  metric: typeof transformMetrics[0];
}

const MetricCard = ({ metric }: MetricCardProps) => {
  const BadgeIcon = metric.badgeIcon;
  const MainIcon = metric.icon;

  return (
    <div className="relative bg-card/90 backdrop-blur-sm border border-border/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group flex flex-col justify-between h-full overflow-hidden">
      {/* Top Subtle Accent Glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent group-hover:via-accent transition-all duration-300" />

      <div>
        {/* Top Row: Icon + Impact Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm shrink-0">
            <MainIcon className="w-5 h-5" />
          </div>
          <span className={`inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full border shrink-0 ${metric.badgeColor}`}>
            <BadgeIcon className="w-3.5 h-3.5 shrink-0" />
            {metric.badge}
          </span>
        </div>

        {/* Metric Title */}
        <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors mb-4 text-left">
          {metric.label}
        </h3>
      </div>

      {/* Before / After Comparison Box */}
      <div className="bg-muted/40 rounded-xl p-3.5 border border-border/60 space-y-2.5 mt-auto">
        {/* Before State */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-destructive/70 shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              Before
            </span>
          </div>
          <span className="text-xs sm:text-sm font-medium text-muted-foreground line-through decoration-destructive/60 text-right">
            {metric.before}
          </span>
        </div>

        {/* Transition Divider */}
        <div className="relative flex items-center justify-center py-0.5">
          <div className="w-full h-px bg-border/70" />
          <div className="absolute bg-card border border-border/80 rounded-full p-1 text-primary shadow-xs group-hover:scale-110 transition-transform">
            <ArrowRight className="w-2.5 h-2.5" />
          </div>
        </div>

        {/* After State */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-bizgrow-yellow-dark">
              After
            </span>
          </div>
          <span className="text-xs sm:text-sm font-extrabold text-foreground text-right">
            {metric.after}
          </span>
        </div>
      </div>
    </div>
  );
};

const TransformationSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-[10%] w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="mb-6">
            <BizgrowTag icon={TrendingUp}>Store Transformation</BizgrowTag>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-display">
            From Khaata to
            <span className="text-gold block mt-2">Smart Business</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            See how thousands of stores transformed their business with BizGrow 360
          </p>
        </motion.div>

        {/* Before/After Image with Overlay Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
            <img
              src={beforeAfterImage}
              alt="Store transformation - Before and After"
              className="w-full aspect-video object-cover"
            />

            {/* Before Tag */}
            <div className="absolute bottom-[2%] sm:bottom-[2%] md:bottom-[2.5%] left-[25%] -translate-x-1/2 z-20 w-[32%] sm:w-[34%] md:w-[30%] max-w-[260px]">
              <div className="w-full flex items-center justify-center gap-1.5 sm:gap-2.5 bg-primary text-white border sm:border-2 border-white/20 px-2 sm:px-6 py-1.5 sm:py-4 md:py-5 rounded-lg sm:rounded-2xl shadow-2xl backdrop-blur-md">
                <XCircle className="w-3 h-3 sm:w-5 sm:h-5 text-white shrink-0" />
                <span className="text-[10px] sm:text-sm md:text-base font-extrabold uppercase tracking-wider sm:tracking-widest">
                  BEFORE
                </span>
              </div>
            </div>

            {/* After Tag */}
            <div className="absolute bottom-[2%] sm:bottom-[2%] md:bottom-[2.5%] left-[75%] -translate-x-1/2 z-20 w-[32%] sm:w-[34%] md:w-[30%] max-w-[260px]">
              <div className="w-full flex items-center justify-center gap-1.5 sm:gap-2.5 bg-[#cea300] text-black border sm:border-2 border-black/10 px-2 sm:px-6 py-1.5 sm:py-4 md:py-5 rounded-lg sm:rounded-2xl shadow-2xl backdrop-blur-md">
                <CheckCircle2 className="w-3 h-3 sm:w-5 sm:h-5 text-black shrink-0" />
                <span className="text-[10px] sm:text-sm md:text-base font-black uppercase tracking-wider sm:tracking-widest text-black">
                  AFTER
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transformation Metrics - Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {transformMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <MetricCard metric={metric} />
            </motion.div>
          ))}
        </div>

        {/* Transformation Metrics - Mobile Carousel */}
        <div className="sm:hidden max-w-6xl mx-auto">
          <MobileCarousel slideClassName="w-[80%]">
            {transformMetrics.map((metric) => (
              <div key={metric.label} className="h-full py-1">
                <MetricCard metric={metric} />
              </div>
            ))}
          </MobileCarousel>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;

