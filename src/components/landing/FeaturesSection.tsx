import { 
  Layers, 
  BrainCircuit, 
  MessageSquare, 
  Package, 
  Receipt, 
  Users,
  BarChart3,
  Globe,
  Truck,
  Shield,
  Smartphone,
  Zap,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { AnimatedSection, StaggeredContainer } from "@/hooks/useScrollAnimation";
import { RippleButton } from "@/components/ui/ripple-button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Layers,
    title: "Digital Catalogue",
    description: "Beautiful PWA store that works offline. Share via WhatsApp link.",
    highlight: "Share Link",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: BrainCircuit,
    title: "AI Product Upload",
    description: "Snap a photo — AI recognizes & auto-fills all product details.",
    highlight: "AI Powered",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Orders",
    description: "Instant order notifications with customer details on WhatsApp.",
    highlight: "Real-time",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Package,
    title: "Smart Inventory",
    description: "Auto-deduct on sales, low stock alerts, never miss a bestseller.",
    highlight: "Auto-sync",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Receipt,
    title: "GST Billing",
    description: "Generate GST invoices, share digitally, track all transactions.",
    highlight: "GST Ready",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Customer CRM",
    description: "Track purchase history, identify VIP customers, send offers.",
    highlight: "Insights",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    description: "Sales trends, top products, revenue insights — all in real-time.",
    highlight: "Data",
    color: "from-teal-500 to-green-500",
  },
  {
    icon: Globe,
    title: "Multi-language",
    description: "Use in Hindi, English, and regional languages. Made for Bharat.",
    highlight: "हिंदी",
    color: "from-fuchsia-500 to-purple-500",
  },
];

const additionalFeatures = [
  { icon: Truck, text: "Delivery Tracking" },
  { icon: Shield, text: "Secure Payments" },
  { icon: Smartphone, text: "Mobile App" },
  { icon: Zap, text: "Instant Setup" },
];

const FeaturesSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden" id="features">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 md:mb-16 lg:mb-20 px-2">
          <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 mb-4 sm:mb-6 border border-accent/20">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
            <span className="text-accent-foreground text-xs sm:text-sm font-bold">All-in-One Platform</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 font-display">
            Everything to Run Your
            <span className="text-primary block mt-1">Business Smarter</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            From product listing to billing, inventory to analytics — 
            we've got every aspect covered with intelligent automation.
          </p>
        </AnimatedSection>

        {/* Features Grid */}
        <StaggeredContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-12 md:mb-16" staggerDelay={100}>
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-border hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden cursor-pointer"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.08] transition-opacity`} />
              
              {/* Highlight Badge */}
              <span className={`inline-block px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-bold text-white rounded-full bg-gradient-to-r ${feature.color} mb-3 sm:mb-4 shadow-lg`}>
                {feature.highlight}
              </span>

              {/* Icon */}
              <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 sm:mb-5 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                <feature.icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-bold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover indicator */}
              <div className="mt-3 sm:mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs sm:text-sm font-bold">Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
          ))}
        </StaggeredContainer>

        {/* Additional Features Bar */}
        <AnimatedSection className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-border mb-8 sm:mb-10 md:mb-12" delay={300}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-10 w-full">
              <span className="col-span-2 sm:col-span-1 text-sm sm:text-base font-bold text-muted-foreground text-center sm:text-left">Also includes:</span>
              {additionalFeatures.map((feature) => (
                <div key={feature.text} className="flex items-center gap-2 justify-center sm:justify-start">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-foreground">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="text-center" delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link to="/join" className="w-full sm:w-auto">
              <RippleButton size="lg" variant="glow" className="font-bold group w-full sm:w-auto h-11 sm:h-12 md:h-14 text-sm sm:text-base">
                Get All Features Free
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </RippleButton>
            </Link>
            <span className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              No credit card required
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturesSection;