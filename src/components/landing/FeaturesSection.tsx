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
    <section className="py-20 md:py-32 bg-background relative overflow-hidden" id="features">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-5 py-2 mb-6 border border-accent/20">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-accent-foreground text-sm font-bold">All-in-One Platform</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-display">
            Everything to Run Your
            <span className="text-primary block">Business Smarter</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            From product listing to billing, inventory to analytics — 
            we've got every aspect covered with intelligent automation.
          </p>
        </AnimatedSection>

        {/* Features Grid */}
        <StaggeredContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-16" staggerDelay={100}>
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-card rounded-3xl p-6 border border-border hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden cursor-pointer"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.08] transition-opacity`} />
              
              {/* Highlight Badge */}
              <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${feature.color} mb-4 shadow-lg`}>
                {feature.highlight}
              </span>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover indicator */}
              <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-bold">Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </StaggeredContainer>

        {/* Additional Features Bar */}
        <AnimatedSection className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-8 border border-border mb-12" delay={300}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              <span className="text-base font-bold text-muted-foreground">Also includes:</span>
              {additionalFeatures.map((feature) => (
                <div key={feature.text} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="text-center" delay={400}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Link to="/join">
              <RippleButton size="xl" variant="glow" className="font-bold group">
                Get All Features Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </RippleButton>
            </Link>
            <span className="text-muted-foreground flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              No credit card required
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturesSection;
