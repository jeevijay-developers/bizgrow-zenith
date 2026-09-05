import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Check, Sparkles, Camera, Cpu, Clock, 
  Target, Zap, Upload, Brain, Scan, Wand2, Pencil, CheckCircle, Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileCarousel } from "@/components/ui/mobile-carousel";
import { BizgrowTag } from "@/components/ui/bizgrow-tag";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

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
    IconComponent: Camera
  },
  {
    number: "02", 
    title: "AI Analysis",
    description: "Our neural network analyzes the image in under 5 seconds.",
    IconComponent: Brain
  },
  {
    number: "03",
    title: "Review & Edit",
    description: "Verify the extracted details and make any adjustments needed.",
    IconComponent: Pencil
  },
  {
    number: "04",
    title: "Add to Catalogue",
    description: "One click to add the product to your store catalogue.",
    IconComponent: CheckCircle
  }
];

const heroWorkflowSteps = [
  { number: 1, title: "Snap or upload", description: "Take a photo or upload from gallery", icon: Camera, color: "from-[#4aa0f5] to-[#2b76c7] shadow-[#378add]/30" },
  { number: 2, title: "AI analyzes", description: "Detects products and extracts details", icon: Sparkles, color: "from-[#968fe5] to-[#635ac7] shadow-[#7f77dd]/30" },
  { number: 3, title: "Auto enhance", description: "Clean white backgrounds automatically", icon: Wand2, color: "from-[#d68d25] to-[#9e5e0b] shadow-[#ba7517]/30" },
  { number: 4, title: "Add to catalogue", description: "Review and add to your store", icon: Package, color: "from-[#78b32f] to-[#4e7c17] shadow-[#639922]/30" },
];

const HeroWorkflowPreview = () => (
  <div className="rounded-[22px] border border-[#c9c5f5] bg-gradient-to-br from-[#fbfaff] to-[#f2f1fc] p-5 shadow-[0_18px_35px_-24px_rgba(31,21,81,0.45)] sm:p-8">
    <div className="relative mb-9 grid grid-cols-2 gap-y-7 sm:mb-12 sm:grid-cols-4 sm:gap-y-0">
      <div className="absolute left-[12%] right-[12%] top-8 hidden h-0.5 bg-gradient-to-r from-[#378add] via-[#9a75a8] to-[#639922] opacity-30 sm:block" />
      {heroWorkflowSteps.map((step) => (
        <div key={step.number} className="relative z-10 flex flex-col items-center px-1 text-center sm:px-2">
          <div className="relative transition-transform duration-200 hover:-translate-y-0.5">
            <div className={`flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br shadow-lg ${step.color}`}><step.icon className="h-6 w-6 text-white" strokeWidth={2} /></div>
            <span className="absolute right-0 top-0 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white bg-[#18072d] text-xs font-semibold text-white">{step.number}</span>
          </div>
          <p className="mt-4 text-sm font-semibold text-[#111827] sm:text-[15px]">{step.title}</p>
          <p className="mt-1 max-w-[145px] text-xs leading-snug text-[#61708a] sm:text-[13px]">{step.description}</p>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      {[ ["<5 sec", "Instant detection"], ["Clean BG", "Auto enhancement"], ["10x faster", "Time saved"] ].map(([value, label]) => (
        <div key={label} className="rounded-xl border border-black/[0.04] bg-white px-1 py-4 text-center shadow-[0_6px_14px_rgba(29,25,70,0.06)] sm:rounded-2xl sm:px-4 sm:py-6"><p className="text-base font-bold text-[#111827] sm:text-2xl">{value}</p><p className="mt-1.5 text-[8px] font-medium uppercase tracking-[0.35px] text-[#61708a] sm:mt-2 sm:text-xs sm:tracking-[0.5px]">{label}</p></div>
      ))}
    </div>
  </div>
);

const AIUploadFeaturePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(284,100%,8%)]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-10 w-72 h-72 bg-accent/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
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
              className="text-center sm:text-left"
            >
              <div className="mb-6 flex justify-center sm:justify-start">
                <BizgrowTag icon={Sparkles}>AI-Powered</BizgrowTag>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Add Products with{" "}
                <span className="text-gradient">AI Magic</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl sm:mx-0 mx-auto">
                Just snap a photo. Our AI extracts product name, price, category, and more -
                saving you hours of manual data entry.
              </p>

              <div className="flex flex-wrap gap-4 mb-8 justify-center sm:justify-start">
                {[
                  { icon: Zap, text: "<5 sec detection" },
                  { icon: Target, text: "95% accuracy" },
                  { icon: Clock, text: "10x faster" },
                ].map((stat, i) => (
                  <BizgrowTag key={i} icon={stat.icon}>
                    {stat.text}
                  </BizgrowTag>
                ))}
              </div>

              {/* Mobile-only workflow preview, positioned directly above the CTA. */}
              <div className="mb-8 lg:hidden">
                <HeroWorkflowPreview />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                <Link to="/join">
                  <Button size="lg" className="btn-gradient-accent text-accent-foreground font-bold px-8 gap-2 h-14 text-base">
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
              className="relative hidden lg:block"
            >
              <HeroWorkflowPreview />
              
              {/* Floating card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="hidden"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Detected!</p>
                    <p className="text-sm text-muted-foreground">Tata Salt 1kg — ₹28</p>
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
              How <span className="text-gradient">AI Upload</span> Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our advanced neural network processes your images to extract product information accurately.
            </p>
          </motion.div>

          {/* Steps - Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div className="w-14 h-14 mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                    <step.IconComponent className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/30" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Steps - Mobile Carousel */}
          <div className="md:hidden">
            <MobileCarousel slideClassName="w-[80%]">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="bg-card rounded-2xl border border-border p-6 h-full shadow-sm"
                >
                  <div className="w-12 h-12 mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                    <step.IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1.5">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </MobileCarousel>
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
              Powerful <span className="text-gradient">AI Features</span>
            </h2>
          </motion.div>

          {/* Features - Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* Features - Mobile Carousel */}
          <div className="md:hidden">
            <MobileCarousel slideClassName="w-[80%]">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-card rounded-2xl border border-border p-6 shadow-sm h-full flex flex-col justify-start"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1.5">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </MobileCarousel>
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
              Manual Entry vs <span className="text-gradient">AI Upload</span>
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
                    <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center">
                      <span className="text-destructive text-xs">✕</span>
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
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link to="/join">
              <Button size="lg" className="btn-gradient-accent text-accent-foreground font-bold gap-2">
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
