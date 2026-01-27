import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Check, Sparkles, Palette, Star, 
  Heart, TrendingUp, BarChart3, Users, Gift
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import cosmeticsMockup from "@/assets/solution-cosmetics-mockup.png";

const features = [
  { icon: Sparkles, title: "Beauty Catalog", description: "Stunning showcase for skincare & makeup" },
  { icon: Palette, title: "Shade Variants", description: "Display all color options beautifully" },
  { icon: Star, title: "Reviews & Ratings", description: "Build trust with customer reviews" },
  { icon: Heart, title: "Bestsellers", description: "Highlight popular products automatically" },
  { icon: Gift, title: "Gift Sets", description: "Create and sell combo packages" },
  { icon: TrendingUp, title: "Trending Products", description: "Showcase what's hot right now" },
];

const benefits = [
  "Showcase makeup, skincare, and beauty products",
  "Display shade variants with color swatches",
  "Ingredients and usage instructions",
  "Customer reviews and ratings",
  "Create beauty bundles and gift sets",
  "Highlight new arrivals and bestsellers"
];

const CosmeticsStorePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(284,100%,8%)]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Cosmetics & Beauty
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Beauty Business,{" "}
                <span className="text-gradient">Beautifully Online</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/70 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                Create a stunning online presence for your beauty store with 
                shade variants, reviews, and gorgeous product displays.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link to="/join" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 sm:px-8 gap-2 h-12 sm:h-14 text-sm sm:text-base w-full">
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
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img src={cosmeticsMockup} alt="Cosmetics Store Dashboard" className="w-full h-auto" />
              </div>
              
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <span className="font-semibold text-sm">5.2k Favorites</span>
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
              Made for <span className="text-primary">Beauty Business</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Features designed for cosmetics and beauty retail.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 hover:shadow-lg hover:border-primary/20 transition-all group"
              >
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center lg:text-left">
                Why Beauty Retailers Love{" "}
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
                    className="flex items-start sm:items-center gap-3"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-rose-600" />
                    </div>
                    <span className="text-sm sm:text-base lg:text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 sm:mt-8 text-center lg:text-left">
                <Link to="/join">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
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
              className="grid grid-cols-2 gap-3 sm:gap-6"
            >
              {[
                { icon: Sparkles, value: "4K+", label: "Beauty Stores" },
                { icon: Users, value: "200K+", label: "Beauty Lovers" },
                { icon: Star, value: "4.8", label: "Avg Rating" },
                { icon: BarChart3, value: "70%", label: "More Orders" },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm border">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-1.5 sm:mb-2" />
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

export default CosmeticsStorePage;
