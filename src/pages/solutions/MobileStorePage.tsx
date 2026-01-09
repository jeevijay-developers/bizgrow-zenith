import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Check, Smartphone, Shield, CreditCard, 
  Package, BarChart3, Zap, Users, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import mobileMockup from "@/assets/solution-mobile-mockup.png";

const features = [
  { icon: Smartphone, title: "Device Catalog", description: "Showcase phones with all specs and colors" },
  { icon: FileText, title: "IMEI Tracking", description: "Track every device by unique IMEI" },
  { icon: Shield, title: "Warranty Management", description: "Manage device warranties efficiently" },
  { icon: CreditCard, title: "EMI Calculator", description: "Show financing options to customers" },
  { icon: Package, title: "Accessories Bundling", description: "Create phone + accessories combos" },
  { icon: BarChart3, title: "Brand Analytics", description: "Track sales by brand and model" },
];

const benefits = [
  "Complete smartphone inventory management",
  "IMEI/serial number tracking for each unit",
  "Accessories inventory - cases, chargers, earphones",
  "EMI options display with calculator",
  "Exchange and buyback program support",
  "Warranty tracking with expiry reminders"
];

const MobileStorePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(284,100%,8%)]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-violet-500/20 text-violet-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Smartphone className="w-4 h-4" />
                Mobile Phone Shops
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Mobile Store,{" "}
                <span className="text-gradient">Smart Management</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl">
                Track every phone by IMEI, manage warranties, show EMI options, 
                and run your mobile shop like a pro.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/join">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 gap-2 h-14 text-base w-full sm:w-auto">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img src={mobileMockup} alt="Mobile Store Dashboard" className="w-full h-auto" />
              </div>
              
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-violet-500" />
                  <span className="font-semibold text-sm">25 Phones Sold Today</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for <span className="text-primary">Mobile Retail</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Features designed specifically for phone and accessory shops.
            </p>
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
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Mobile Retailers Love{" "}
                <span className="text-primary">BizGrow 360</span>
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-violet-600" />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link to="/join">
                  <Button size="lg" className="gap-2">
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: Smartphone, value: "7K+", label: "Mobile Shops" },
                { icon: Shield, value: "500K+", label: "Devices Tracked" },
                { icon: Users, value: "400K+", label: "Customers" },
                { icon: BarChart3, value: "50%", label: "Faster Sales" },
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm border">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MobileStorePage;
