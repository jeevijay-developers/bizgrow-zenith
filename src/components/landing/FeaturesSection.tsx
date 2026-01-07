import { 
  Layers, 
  BrainCircuit, 
  MessageSquare, 
  Package, 
  Receipt, 
  Users,
  BarChart3,
  Globe
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Digital Catalogue",
    description: "Beautiful, shareable product catalogue as a PWA. Customers browse, add to cart, and order seamlessly.",
    highlight: "Share via WhatsApp",
  },
  {
    icon: BrainCircuit,
    title: "AI Product Upload",
    description: "Upload a photo or type a name — our AI recognizes products and auto-fills all details instantly.",
    highlight: "Powered by AI",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Orders",
    description: "Receive orders directly on WhatsApp with instant notifications, customer details, and order summary.",
    highlight: "Real-time Alerts",
  },
  {
    icon: Package,
    title: "Smart Inventory",
    description: "Auto-deduct on sales, low stock alerts, and batch tracking. Never run out of bestsellers again.",
    highlight: "Auto-sync",
  },
  {
    icon: Receipt,
    title: "Billing & Receipts",
    description: "Generate GST-compliant invoices, share digitally via WhatsApp, and track all transactions.",
    highlight: "GST Ready",
  },
  {
    icon: Users,
    title: "Customer CRM",
    description: "Track customer history, identify loyal buyers, and build lasting relationships with repeat customers.",
    highlight: "Loyalty Insights",
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    description: "Real-time dashboards showing sales trends, top products, peak hours, and revenue insights.",
    highlight: "Data-driven",
  },
  {
    icon: Globe,
    title: "Multi-language",
    description: "Use BizGrow 360 in Hindi, English, and regional languages. Truly made for Bharat.",
    highlight: "हिंदी में उपलब्ध",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/30" id="features">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground rounded-full text-sm font-bold mb-4">
            Powerful Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-display">
            Everything You Need to
            <span className="text-primary block">Run Your Business</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From product listing to billing, we've got every aspect of your retail 
            business covered with intelligent automation.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10"
            >
              {/* Highlight Badge */}
              <span className="absolute -top-3 right-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">
                {feature.highlight}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
