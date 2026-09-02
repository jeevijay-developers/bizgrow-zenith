import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, TrendingUp, Clock, IndianRupee, FileText, Smartphone, ChartBar, XCircle, CheckCircle } from "lucide-react";
import beforeAfterImage from "@/assets/before-after-transform.jpg";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { CarouselDots } from "@/components/ui/carousel-dots";
import { EyebrowTag } from "@/components/ui/eyebrow-tag";

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
          <EyebrowTag icon={TrendingUp} tone="positive" className="mb-6">Store Transformation</EyebrowTag>
          <h2 className="font-ledger text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-ledger-ink mb-6">
            From Khaata to
            <span className="block mt-2">Smart Business</span>
          </h2>
          <p className="font-grotesk text-lg md:text-xl text-ledger-ink/65 max-w-2xl mx-auto">
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
          <div className="relative rounded-2xl overflow-hidden shadow-ledger border border-ledger-rule">
            <img
              src={beforeAfterImage}
              alt="Store transformation - Before and After"
              className="w-full aspect-video object-cover"
            />
            {/* Overlay Labels */}
            <div className="absolute inset-0 flex">
              <div className="w-1/2 flex items-end p-6">
                <div className="bg-ledger-ink/80 backdrop-blur-sm text-ledger-paper px-4 py-2 rounded-lg font-grotesk font-semibold flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> BEFORE
                </div>
              </div>
              <div className="w-1/2 flex items-end justify-end p-6">
                <div className="bg-ledger-sage backdrop-blur-sm text-ledger-paper px-4 py-2 rounded-lg font-grotesk font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> AFTER
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transformation Metrics - Mobile Carousel */}
        <div className="sm:hidden">
          <Carousel opts={{ align: "start" }} setApi={setApi}>
            <CarouselContent>
              {transformMetrics.map((metric) => (
                <CarouselItem key={metric.label} className="basis-[85%] h-auto">
                  <TransformMetricCard metric={metric} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <CarouselDots api={api} />
        </div>

        {/* Transformation Metrics - Grid (tablet & up) */}
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
              <TransformMetricCard metric={metric} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TransformMetricCard = ({ metric }: { metric: (typeof transformMetrics)[number] }) => (
  <div className="h-full flex flex-col bg-white border border-ledger-rule rounded-2xl p-6 text-center shadow-ledger-sm">
    <div className="w-12 h-12 mx-auto mb-4 rounded-xl border border-ledger-rule flex items-center justify-center">
      <metric.icon className="w-6 h-6 text-ledger-ink/70" />
    </div>

    <p className="text-sm font-grotesk text-ledger-ink/60 mb-2">{metric.label}</p>

    <div className="flex-1 flex items-center justify-center flex-wrap gap-x-3 gap-y-1 mb-3">
      <span className="text-sm font-grotesk text-ledger-ink/40 line-through">{metric.before}</span>
      <ArrowRight className="w-4 h-4 text-ledger-ink/40 shrink-0" />
      <span className="text-sm font-grotesk font-semibold text-ledger-sage">{metric.after}</span>
    </div>

    <div className="inline-flex items-center gap-1 bg-ledger-sage/10 text-ledger-sage border border-ledger-sage/20 text-xs font-grotesk font-semibold px-3 py-1 rounded-full mx-auto">
      <TrendingUp className="w-3 h-3" />
      {metric.improvement}
    </div>
  </div>
);

export default TransformationSection;
