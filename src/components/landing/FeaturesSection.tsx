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
  Zap
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Digital Catalogue",
    description: "Beautiful, shareable product catalogue as a PWA. Customers browse and order seamlessly.",
    highlight: "Share via WhatsApp",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: BrainCircuit,
    title: "AI Product Upload",
    description: "Upload a photo or type a name — our AI recognizes products and auto-fills all details.",
    highlight: "Powered by AI",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Orders",
    description: "Receive orders directly on WhatsApp with instant notifications and customer details.",
    highlight: "Real-time Alerts",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Package,
    title: "Smart Inventory",
    description: "Auto-deduct on sales, low stock alerts, and batch tracking. Never run out of bestsellers.",
    highlight: "Auto-sync",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Receipt,
    title: "Billing & Receipts",
    description: "Generate GST-compliant invoices, share digitally via WhatsApp, and track transactions.",
    highlight: "GST Ready",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Customer CRM",
    description: "Track customer history, identify loyal buyers, and build lasting relationships.",
    highlight: "Loyalty Insights",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    description: "Real-time dashboards showing sales trends, top products, and revenue insights.",
    highlight: "Data-driven",
    color: "from-teal-500 to-green-500",
  },
  {
    icon: Globe,
    title: "Multi-language",
    description: "Use BizGrow 360 in Hindi, English, and regional languages. Made for Bharat.",
    highlight: "हिंदी में उपलब्ध",
    color: "from-fuchsia-500 to-purple-500",
  },
];

const additionalFeatures = [
  { icon: Truck, text: "Delivery Management" },
  { icon: Shield, text: "Secure Payments" },
  { icon: Smartphone, text: "Mobile App" },
  { icon: Zap, text: "Instant Setup" },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background" id="features">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-1.5 mb-4">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-accent-foreground text-sm font-bold">Powerful Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display">
            Everything You Need to
            <span className="text-primary block">Run Your Business</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            From product listing to billing, we've got every aspect of your retail 
            business covered with intelligent automation.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-card rounded-2xl p-5 md:p-6 border border-border hover:border-transparent transition-all duration-300 hover:shadow-xl overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
              
              {/* Highlight Badge */}
              <span className={`inline-block px-2.5 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${feature.color} mb-4`}>
                {feature.highlight}
              </span>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Features Bar */}
        <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-6 border border-border">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <span className="text-sm font-medium text-muted-foreground">Also includes:</span>
            {additionalFeatures.map((feature) => (
              <div key={feature.text} className="flex items-center gap-2">
                <feature.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
