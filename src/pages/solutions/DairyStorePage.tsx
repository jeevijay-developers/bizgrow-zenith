import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Check, Milk, Clock, Calendar, 
  Bell, RefreshCw, BarChart3, Truck, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import dairyMockup from "@/assets/solution-dairy-mockup.png";

const features = [
  { icon: Milk, title: "Fresh Products", description: "Manage milk, cheese, butter, paneer & more" },
  { icon: Calendar, title: "Subscriptions", description: "Daily/weekly delivery subscriptions" },
  { icon: Clock, title: "Freshness Tracking", description: "Monitor expiry dates and freshness" },
  { icon: Truck, title: "Route Planning", description: "Optimize delivery routes for freshness" },
  { icon: RefreshCw, title: "Auto Restock", description: "Smart inventory replenishment alerts" },
  { icon: Bell, title: "Delivery Alerts", description: "Notify customers about deliveries" },
];

const benefits = [
  "Manage subscription-based daily deliveries",
  "Track product freshness and expiry dates",
  "Multiple delivery slots - morning & evening",
  "Handle pause/resume subscriptions easily",
  "Credit management for regular customers",
  "Real-time stock updates for perishables"
];

const DairyStorePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(284,100%,8%)]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-400/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Milk className="w-4 h-4" />
                Dairy & Milk Delivery
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Fresh Dairy,{" "}
                <span className="text-gradient">Smart Delivery</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl">
                Manage subscriptions, track freshness, and deliver dairy products 
                to your customers' doorsteps on time, every time.
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
                <img src={dairyMockup} alt="Dairy Store Dashboard" className="w-full h-auto" />
              </div>
              
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Active Subscriptions</p>
                    <p className="text-xs text-blue-600">2,500+ customers</p>
                  </div>
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
              Built for <span className="text-primary">Dairy Business</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Features designed for freshness and timely delivery.
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
                Why Dairy Owners Love{" "}
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
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-blue-600" />
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
                { icon: Milk, value: "3K+", label: "Dairy Shops" },
                { icon: Calendar, value: "50K+", label: "Subscriptions" },
                { icon: Truck, value: "99%", label: "On-time Delivery" },
                { icon: BarChart3, value: "0%", label: "Wastage Reduced" },
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

export default DairyStorePage;
