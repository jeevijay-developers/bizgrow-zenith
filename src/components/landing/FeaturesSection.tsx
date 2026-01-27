import { 
  Layers, 
  BrainCircuit, 
  MessageSquare, 
  Package, 
  Receipt, 
  Users,
  BarChart3,
  Globe,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { RippleButton } from "@/components/ui/ripple-button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Layers,
    title: "Digital Catalogue",
    description: "Beautiful online store that works offline. Share with customers via WhatsApp link.",
    color: "bg-violet-500",
  },
  {
    icon: BrainCircuit,
    title: "AI Product Upload",
    description: "Snap a photo of products — AI recognizes and auto-fills all details instantly.",
    color: "bg-amber-500",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Orders",
    description: "Get instant order notifications with customer details directly on WhatsApp.",
    color: "bg-green-500",
  },
  {
    icon: Package,
    title: "Smart Inventory",
    description: "Auto-deduct stock on sales, get low stock alerts, never miss a bestseller.",
    color: "bg-blue-500",
  },
  {
    icon: Receipt,
    title: "GST Billing",
    description: "Generate professional GST invoices, share digitally, track all transactions.",
    color: "bg-rose-500",
  },
  {
    icon: Users,
    title: "Customer CRM",
    description: "Track purchase history, identify VIP customers, send personalized offers.",
    color: "bg-indigo-500",
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    description: "Sales trends, top products, revenue insights — all in beautiful dashboards.",
    color: "bg-teal-500",
  },
  {
    icon: Globe,
    title: "Multi-language",
    description: "Use in Hindi, English, and regional languages. Made for Bharat.",
    color: "bg-purple-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-background relative overflow-hidden" id="features">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-1/2 left-[10%] w-64 h-64 bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-[10%] w-80 h-80 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-semibold text-accent-foreground">All-in-One Platform</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-display">
            Everything You Need to
            <span className="text-primary block mt-2">Run Your Business</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            From product listing to billing, inventory to analytics — 
            we've got every aspect covered.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Icon */}
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/join">
            <RippleButton size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 h-14 text-lg group">
              Get All Features Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </RippleButton>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • Free forever plan available
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
