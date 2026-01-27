import { 
  Layers, 
  Package, 
  Receipt, 
  Users,
  BarChart3,
  Shield,
  Smartphone,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Layers,
    title: "Digital Catalogue",
    description: "Beautiful online store that works offline. Share with customers via WhatsApp link.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Package,
    title: "Smart Inventory",
    description: "Auto-deduct stock on sales, get low stock alerts, never miss a bestseller.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Receipt,
    title: "GST Billing",
    description: "Generate professional GST invoices, share digitally, track all transactions.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Users,
    title: "Customer CRM",
    description: "Track purchase history, identify VIP customers, send personalized offers.",
    color: "from-indigo-500 to-blue-600",
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    description: "Sales trends, top products, revenue insights — all in beautiful dashboards.",
    color: "from-teal-500 to-emerald-600",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Bank-grade security, daily backups, your data always protected.",
    color: "from-slate-600 to-slate-800",
  },
  {
    icon: Smartphone,
    title: "Works Offline",
    description: "Continue selling even without internet. Syncs automatically when back online.",
    color: "from-orange-500 to-amber-600",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Dedicated support team ready to help you grow your business anytime.",
    color: "from-purple-500 to-violet-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/30 relative overflow-hidden" id="more-features">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-[10%] w-80 h-80 bg-accent/5 rounded-full blur-[120px]" />
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
            <span className="text-sm font-semibold text-accent-foreground">Complete Solution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 font-display">
            Everything Else You Need
            <span className="text-primary block mt-2">Under One Roof</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Beyond our core features, we've got every aspect of your business covered.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
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
      </div>
    </section>
  );
};

export default FeaturesSection;
