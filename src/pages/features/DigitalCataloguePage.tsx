import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Check, Layers, Search, ShoppingCart, Tag,
  Smartphone, Globe, QrCode, Star, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileCarousel } from "@/components/ui/mobile-carousel";
import { BizgrowTag } from "@/components/ui/bizgrow-tag";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CatalogueHeroVisual from "@/components/landing/CatalogueHeroVisual";

const features = [
  {
    icon: Layers,
    title: "Beautiful Product Grid",
    description: "Display products in an attractive grid layout with images, prices, and variants."
  },
  {
    icon: Search,
    title: "Smart Search & Filters",
    description: "Help customers find products instantly with category filters and search."
  },
  {
    icon: ShoppingCart,
    title: "Easy Cart & Checkout",
    description: "Smooth add-to-cart experience with WhatsApp checkout integration."
  },
  {
    icon: Tag,
    title: "Offers & Discounts",
    description: "Highlight deals with compare prices, sale badges, and promotional banners."
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Optimized for mobile users - fast, responsive, and touch-friendly."
  },
  {
    icon: QrCode,
    title: "QR Code Sharing",
    description: "Generate QR codes for offline marketing and easy store access."
  }
];

const benefits = [
  "No app download required - works in any browser",
  "Instant updates when you add or edit products",
  "Customers can favorite products for later",
  "Works offline with progressive web app support",
  "SEO optimized for local search visibility",
  "Custom branding with your logo and colors"
];

const DigitalCataloguePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(284,100%,8%)]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
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
                <BizgrowTag icon={Layers}>Digital Catalogue</BizgrowTag>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Your Store,{" "}
                <span className="text-gradient">Now Online</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl sm:mx-0 mx-auto">
                Create a beautiful, shareable product catalogue in minutes. No coding, no app
                development - just your products, beautifully displayed.
              </p>

              {/* Mobile View - Image above the buttons */}
              <div className="block lg:hidden mb-16">
                <CatalogueHeroVisual />
              </div>

              <div className="flex flex-row gap-3 sm:gap-4">
                <Link to="/join" className="flex-1 sm:flex-none">
                  <Button size="lg" className="btn-gradient-accent text-accent-foreground font-bold px-4 sm:px-8 gap-2 h-12 sm:h-14 text-sm sm:text-base w-full sm:w-auto">
                    Create Catalogue
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
                <Link to="/store/demo" className="flex-1 sm:flex-none">
                  <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white h-12 sm:h-14 text-sm sm:text-base w-full sm:w-auto">
                    View Demo Store
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <CatalogueHeroVisual />
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
              Everything You Need for{" "}
              <span className="text-gradient">Online Selling</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A complete solution to showcase your products and accept orders - all without building an app.
            </p>
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
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
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
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </MobileCarousel>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Go Live in <span className="text-gradient">3 Simple Steps</span>
            </h2>
          </motion.div>

          {/* Steps - Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Add Products", desc: "Upload photos, set prices, and organize by categories" },
              { step: "2", title: "Customize Store", desc: "Add your logo, choose colors, and set up your profile" },
              { step: "3", title: "Share & Sell", desc: "Get your unique link and start receiving orders via WhatsApp" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-primary/30">
                  {item.step}
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-primary/20" />
                )}
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Steps - Mobile Carousel */}
          <div className="md:hidden max-w-sm mx-auto">
            <MobileCarousel slideClassName="w-[80%]">
              {[
                { step: "1", title: "Add Products", desc: "Upload photos, set prices, and organize by categories" },
                { step: "2", title: "Customize Store", desc: "Add your logo, choose colors, and set up your profile" },
                { step: "3", title: "Share & Sell", desc: "Get your unique link and start receiving orders via WhatsApp" },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-card rounded-2xl border border-border p-6 text-center shadow-sm h-full"
                >
                  <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-md shadow-primary/20">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </MobileCarousel>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center sm:text-left"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Retailers Love{" "}
                <span className="text-gradient">Digital Catalogue</span>
              </h2>
              <div className="space-y-4 w-fit mx-auto sm:w-auto sm:mx-0">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-lg text-left">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/join">
                  <Button size="lg" className="btn-gradient-accent text-accent-foreground font-bold gap-2">
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
              className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 border border-primary/10"
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Globe, value: "1M+", label: "Store Visits" },
                  { icon: ShoppingCart, value: "50K+", label: "Orders Placed" },
                  { icon: Star, value: "4.9", label: "Average Rating" },
                  { icon: Zap, value: "<2s", label: "Load Time" },
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DigitalCataloguePage;