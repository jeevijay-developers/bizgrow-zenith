import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Check, Cake, Clock, Calendar, 
  Bell, Star, BarChart3, Heart, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import bakeryMockup from "@/assets/solution-bakery-mockup.png";

const features = [
  { icon: Cake, title: "Product Showcase", description: "Beautiful displays for cakes, pastries & breads" },
  { icon: Calendar, title: "Pre-Orders", description: "Accept custom cake orders with dates" },
  { icon: Clock, title: "Fresh Batch Alerts", description: "Notify customers when fresh items arrive" },
  { icon: Star, title: "Customer Favorites", description: "Track and promote bestselling items" },
  { icon: MessageSquare, title: "Custom Requests", description: "Receive special orders via WhatsApp" },
  { icon: Bell, title: "Daily Specials", description: "Promote today's special bakes" },
];

const benefits = [
  "Showcase cakes with multiple photo angles",
  "Accept pre-orders for birthdays & events",
  "Set different prices for sizes and flavors",
  "Track daily production and sales",
  "Send new batch notifications to customers",
  "Manage peak hour rush with order queue"
];

const BakeryStorePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(284,100%,8%)]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-36 sm:w-48 md:w-72 h-36 sm:h-48 md:h-72 bg-accent/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <Cake className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Bakeries & Confectioneries
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Your Bakery,{" "}
                <span className="text-gradient">Online & Fresh</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 mb-6 sm:mb-8 max-w-xl">
                Showcase your delicious creations, accept pre-orders, and delight 
                customers with fresh batch notifications.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/join" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 sm:px-8 gap-2 h-11 sm:h-12 md:h-14 text-sm sm:text-base w-full sm:w-auto">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mt-6 lg:mt-0"
            >
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img src={bakeryMockup} alt="Bakery Dashboard" className="w-full h-auto" />
              </div>
              
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white rounded-lg sm:rounded-xl p-2.5 sm:p-4 shadow-xl hidden sm:block"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 fill-red-500" />
                  <span className="font-semibold text-xs sm:text-sm">45 Pre-orders Today</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Baked for <span className="text-primary">Bakery Success</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              Features that help bakeries serve customers better.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-5 md:p-6 hover:shadow-lg hover:border-primary/20 transition-all group"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                Why Bakers Love{" "}
                <span className="text-primary">BizGrow 360</span>
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2.5 sm:gap-3"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                    </div>
                    <span className="text-sm sm:text-base md:text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 sm:mt-8">
                <Link to="/join" className="inline-block w-full sm:w-auto">
                  <Button size="lg" className="gap-2 w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base">
                    Get Started Free
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-6 lg:mt-0"
            >
              {[
                { icon: Cake, value: "5K+", label: "Bakeries" },
                { icon: Calendar, value: "100K+", label: "Pre-orders" },
                { icon: Star, value: "4.9", label: "Avg Rating" },
                { icon: BarChart3, value: "55%", label: "More Orders" },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 sm:p-5 md:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm border">
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary mx-auto mb-1.5 sm:mb-2" />
                  <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
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

export default BakeryStorePage;