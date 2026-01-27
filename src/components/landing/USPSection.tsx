import { motion } from "framer-motion";
import { 
  Globe, 
  Sparkles, 
  Image as ImageIcon, 
  MessageSquare,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { RippleButton } from "@/components/ui/ripple-button";

// Import mockup images
import aiUploadMockup from "@/assets/feature-ai-upload-mockup.png";
import whatsappMockup from "@/assets/feature-whatsapp-mockup.png";
import catalogueMockup from "@/assets/feature-catalogue-mockup.png";

const usps = [
  {
    id: "ai-languages",
    icon: Globe,
    title: "AI in 10+ Regional Languages",
    subtitle: "हिंदी, தமிழ், తెలుగు & More",
    description: "Our AI understands and works in Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi, and English. Upload products, create descriptions, and manage your store in your preferred language.",
    features: [
      "Voice commands in regional languages",
      "Auto-translate product descriptions",
      "Customer communication in local language",
      "Multi-language catalogue for customers"
    ],
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
    image: catalogueMockup,
    imagePosition: "right"
  },
  {
    id: "ai-detection",
    icon: Sparkles,
    title: "AI Product Detection",
    subtitle: "Snap → Detect → List in Seconds",
    description: "Simply photograph your products and our AI instantly recognizes items, extracts names, suggests prices based on market data, and auto-categorizes everything. No manual data entry needed.",
    features: [
      "Instant product recognition",
      "Auto-price suggestions from market data",
      "Smart categorization",
      "Bulk upload from shelf photos"
    ],
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-500/10 to-orange-500/10",
    image: aiUploadMockup,
    imagePosition: "left"
  },
  {
    id: "auto-flyer",
    icon: ImageIcon,
    title: "Auto Flyer & Poster Creation",
    subtitle: "Professional Marketing in 1 Click",
    description: "Select products, choose a template, and let AI generate stunning promotional flyers, festival offers, and social media posts. Share directly to WhatsApp, Facebook, and Instagram.",
    features: [
      "100+ festival & offer templates",
      "Auto-pick best product images",
      "Brand colors & logo integration",
      "One-click social media sharing"
    ],
    gradient: "from-pink-500 to-rose-600",
    bgGradient: "from-pink-500/10 to-rose-500/10",
    image: catalogueMockup,
    imagePosition: "right"
  },
  {
    id: "whatsapp-orders",
    icon: MessageSquare,
    title: "WhatsApp Order Management",
    subtitle: "Where Your Customers Already Are",
    description: "Customers browse your digital catalogue and order via WhatsApp. You receive instant notifications, manage orders, and send updates—all without any app downloads for customers.",
    features: [
      "No app download required for customers",
      "Instant order notifications",
      "Order tracking via WhatsApp",
      "Auto-payment reminders"
    ],
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    image: whatsappMockup,
    imagePosition: "left"
  }
];

const USPSection = () => {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-background relative overflow-hidden" id="features">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Powerful Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-display">
            Built for the Modern
            <span className="text-primary block mt-2">Indian Retailer</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Every feature designed to save you time, increase sales, and delight your customers.
          </p>
        </motion.div>

        {/* USP Cards */}
        <div className="space-y-24 md:space-y-32">
          {usps.map((usp, index) => (
            <motion.div
              key={usp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                usp.imagePosition === "left" ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className={`${usp.imagePosition === "left" ? "lg:order-2" : ""}`}>
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${usp.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                  <usp.icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 font-display">
                  {usp.title}
                </h3>
                <p className={`text-lg font-medium bg-gradient-to-r ${usp.gradient} bg-clip-text text-transparent mb-4`}>
                  {usp.subtitle}
                </p>

                {/* Description */}
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {usp.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {usp.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 shrink-0 mt-0.5 bg-gradient-to-br ${usp.gradient} rounded-full text-white p-0.5`} />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link to="/join">
                  <RippleButton className={`bg-gradient-to-r ${usp.gradient} hover:opacity-90 text-white font-semibold px-6 h-12 group`}>
                    Try {usp.title.split(' ')[0]} {usp.title.split(' ')[1]}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </RippleButton>
                </Link>
              </div>

              {/* Image/Mockup */}
              <div className={`${usp.imagePosition === "left" ? "lg:order-1" : ""}`}>
                <motion.div
                  initial={{ opacity: 0, x: usp.imagePosition === "left" ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  {/* Glow effect */}
                  <div className={`absolute -inset-8 bg-gradient-to-r ${usp.bgGradient} rounded-3xl blur-3xl`} />
                  
                  {/* Mockup container */}
                  <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={usp.image} 
                      alt={usp.title}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </div>

                  {/* Floating badge */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute -bottom-4 -right-4 bg-gradient-to-r ${usp.gradient} rounded-xl p-3 shadow-xl`}
                  >
                    <div className="flex items-center gap-2">
                      <usp.icon className="w-5 h-5 text-white" />
                      <span className="text-sm font-bold text-white">Active Now</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPSection;
