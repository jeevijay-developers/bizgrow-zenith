import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Check, Sparkles, Camera, Cpu, Clock, 
  Target, Zap, Upload, Brain, Scan, Wand2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import aiMockup from "@/assets/feature-ai-upload-mockup.png";

const features = [
  {
    icon: Camera,
    title: "Snap & Upload",
    description: "Take a photo of any product and our AI instantly recognizes it."
  },
  {
    icon: Brain,
    title: "Smart Recognition",
    description: "AI extracts product name, price, brand, and category automatically."
  },
  {
    icon: Scan,
    title: "Barcode Scanning",
    description: "Scan barcodes for instant product lookup from our database."
  },
  {
    icon: Wand2,
    title: "Auto-Enhancement",
    description: "AI improves image quality and removes backgrounds for you."
  },
  {
    icon: Target,
    title: "95% Accuracy",
    description: "Industry-leading accuracy in product detection and data extraction."
  },
  {
    icon: Clock,
    title: "10x Faster",
    description: "Add products in seconds instead of minutes of manual entry."
  }
];

const steps = [
  {
    number: "01",
    title: "Capture Product",
    description: "Take a clear photo of the product, packaging, or price tag.",
    visual: "📸"
  },
  {
    number: "02", 
    title: "AI Analysis",
    description: "Our neural network analyzes the image in under 5 seconds.",
    visual: "🧠"
  },
  {
    number: "03",
    title: "Review & Edit",
    description: "Verify the extracted details and make any adjustments needed.",
    visual: "✏️"
  },
  {
    number: "04",
    title: "Add to Catalogue",
    description: "One click to add the product to your store catalogue.",
    visual: "✅"
  }
];

const AIUploadFeaturePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(284,100%,8%)]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-10 w-72 h-72 bg-accent/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-light/20 rounded-full blur-3xl" />
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent/50 rounded-full"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 15}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Add Products with{" "}
                <span className="text-gradient">AI Magic</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl">
                Just snap a photo. Our AI extracts product name, price, category, and more - 
                saving you hours of manual data entry.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  { icon: Zap, text: "<5 sec detection" },
                  { icon: Target, text: "95% accuracy" },
                  { icon: Clock, text: "10x faster" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                    <stat.icon className="w-4 h-4 text-accent" />
                    <span className="text-white text-sm font-medium">{stat.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/join">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 gap-2 h-14 text-base w-full sm:w-auto">
                    Try AI Upload Free
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src={aiMockup} 
                  alt="AI Product Upload Interface"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Scanning animation overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="absolute w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
              
              {/* Floating card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Detected!</p>
                    <p className="text-sm text-muted-foreground">Tata Salt 1kg • ₹28</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How AI Works */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How <span className="text-primary">AI Upload</span> Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our advanced neural network processes your images to extract product information accurately.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-card rounded-2xl border border-border p-6 h-full hover:shadow-lg hover:border-primary/20 transition-all">
                  <div className="text-5xl mb-4">{step.visual}</div>
                  <div className="text-primary font-bold text-sm mb-2">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful <span className="text-primary">AI Features</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Manual Entry vs <span className="text-primary">AI Upload</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-muted/50 rounded-2xl p-8 border border-border"
            >
              <h3 className="text-xl font-semibold mb-6 text-muted-foreground">Manual Entry</h3>
              <ul className="space-y-4">
                {[
                  "5-10 minutes per product",
                  "Typos and data errors",
                  "Repetitive and tedious",
                  "No image optimization",
                  "Category guessing"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-500 text-xs">✕</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border-2 border-primary/20"
            >
              <h3 className="text-xl font-semibold mb-6 text-primary">AI Upload</h3>
              <ul className="space-y-4">
                {[
                  "Under 30 seconds per product",
                  "99% data accuracy",
                  "Fun and effortless",
                  "Auto image enhancement",
                  "Smart categorization"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/join">
              <Button size="lg" className="gap-2">
                Start Using AI Upload
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIUploadFeaturePage;