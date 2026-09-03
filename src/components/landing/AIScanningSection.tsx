import { motion } from "framer-motion";
import { Camera, Sparkles, Zap, Package, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { RippleButton } from "@/components/ui/ripple-button";
import aiScanningDemo from "@/assets/ai-scanning-demo.jpg";

const scanSteps = [
  { step: 1, title: "Point Camera", description: "Open app and point at products", icon: Camera },
  { step: 2, title: "AI Scans", description: "Instant product detection", icon: Sparkles },
  { step: 3, title: "Auto-Fill", description: "Name, price, category auto-filled", icon: Zap },
  { step: 4, title: "Listed!", description: "Products live in seconds", icon: Package },
];

const detectionFeatures = [
  "Detects 1000+ product types",
  "Works in any lighting",
  "Bulk scan from shelf photos",
  "Market price suggestions",
  "Auto-categorization",
  "Hindi/Regional language labels",
];

const AIScanningSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute top-1/3 right-[5%] w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
              <img 
                src={aiScanningDemo} 
                alt="AI Product Scanning Demo"
                className="w-full aspect-video object-cover"
              />
              
              {/* Scanning Animation Overlay */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"
              />
            </div>

            {/* Floating Product Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -right-4 top-1/4 bg-background/95 backdrop-blur-xl border border-border rounded-xl p-4 shadow-xl"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">Tata Salt 1kg</p>
                    <p className="text-xs text-muted-foreground">₹28 • Grocery</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -left-4 bottom-1/4 bg-background/95 backdrop-blur-xl border border-border rounded-xl p-4 shadow-xl"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">AI Detecting...</p>
                    <p className="text-xs text-muted-foreground">5 products found</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">AI Product Detection</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 font-display">
              Snap, Scan,
              <span className="text-primary block mt-2">Sell in Seconds</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Simply point your phone camera at products. Our AI instantly recognizes items, 
              suggests prices from market data, and auto-categorizes everything. 
              <strong className="text-foreground"> No manual typing needed.</strong>
            </p>

            {/* Process Steps */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {scanSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-bold text-foreground">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {detectionFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Link to="/join">
              <RippleButton size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 font-bold h-12 px-6 group">
                Try AI Upload Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </RippleButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIScanningSection;
