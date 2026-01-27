import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Clock, IndianRupee, FileText, Smartphone, ChartBar } from "lucide-react";
import beforeAfterImage from "@/assets/before-after-transform.jpg";

const transformMetrics = [
  { 
    icon: TrendingUp, 
    before: "₹50K/month", 
    after: "₹1.5L/month", 
    label: "Average Revenue",
    improvement: "+200%"
  },
  { 
    icon: Clock, 
    before: "4+ hours/day", 
    after: "30 mins/day", 
    label: "Time on Billing",
    improvement: "-85%"
  },
  { 
    icon: IndianRupee, 
    before: "Paper Udhari", 
    after: "Digital Tracking", 
    label: "Credit Management",
    improvement: "100% Accurate"
  },
  { 
    icon: FileText, 
    before: "Manual Bills", 
    after: "GST Compliant", 
    label: "Billing System",
    improvement: "Automated"
  },
];

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
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-semibold text-green-600">Store Transformation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-display">
            From Khaata to
            <span className="text-primary block mt-2">Smart Business</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            See how thousands of stores transformed their business with BizGrow 360
          </p>
        </motion.div>

        {/* Before/After Image */}
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
            {/* Overlay Labels */}
            <div className="absolute inset-0 flex">
              <div className="w-1/2 flex items-end p-6">
                <div className="bg-red-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-bold">
                  ❌ BEFORE
                </div>
              </div>
              <div className="w-1/2 flex items-end justify-end p-6">
                <div className="bg-green-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-bold">
                  ✅ AFTER
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transformation Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {transformMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background border border-border rounded-2xl p-6 text-center hover:shadow-xl hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <metric.icon className="w-6 h-6 text-primary" />
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
              
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-sm text-red-500 line-through">{metric.before}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-green-500">{metric.after}</span>
              </div>
              
              <div className="inline-flex items-center gap-1 bg-green-500/10 text-green-600 text-xs font-bold px-3 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" />
                {metric.improvement}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
