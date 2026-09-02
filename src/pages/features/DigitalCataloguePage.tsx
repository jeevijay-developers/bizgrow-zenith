import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Check, Layers, Search, ShoppingCart, Tag, 
  Smartphone, Globe, Share2, QrCode, Star, Zap, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { H1, H2, H3, Lead, Body, Caption } from "@/components/ui/typography";
import { EyebrowTag } from "@/components/ui/eyebrow-tag";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import catalogueMockup from "@/assets/feature-catalogue-mockup.png";

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
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden bg-ledger-ink">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <EyebrowTag icon={Layers} className="mb-6 border-ledger-paper/25 text-ledger-paper/85">
                Digital Catalogue
              </EyebrowTag>
              <H1 className="text-ledger-paper mb-6">
                Your Store,{" "}
                <span className="ledger-highlight">Now Online</span>
              </H1>
              <Lead className="text-ledger-paper/70 mb-8 max-w-xl">
                Create a beautiful, shareable product catalogue in minutes. No coding, no app
                development - just your products, beautifully displayed.
              </Lead>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/join">
                  <Button size="lg" variant="ledger-inverse" className="px-8 gap-2 h-14 text-base w-full sm:w-auto">
                    Create Your Catalogue
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/store/demo">
                  <Button size="lg" variant="ledger-outline-inverse" className="h-14 text-base w-full sm:w-auto">
                    View Demo Store
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
              <div className="relative rounded-2xl overflow-hidden shadow-ledger border border-ledger-paper/10">
                <img
                  src={catalogueMockup}
                  alt="Digital Catalogue Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ledger-ink/50 to-transparent" />
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-ledger-paper rounded-xl p-4 shadow-ledger"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 border border-ledger-rule rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-ledger-sage" />
                  </div>
                  <div>
                    <p className="font-grotesk font-semibold text-ledger-ink text-sm">Live Store</p>
                    <p className="font-grotesk text-ledger-ink/55 text-xs">bizgrow.link/store</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-ledger-paper rounded-xl p-4 shadow-ledger"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-ledger-sage fill-ledger-sage" />
                  <span className="font-grotesk font-semibold text-ledger-ink">1.2k Visitors Today</span>
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
            <H2 className="mb-4">
              Everything You Need for Online Selling
            </H2>
            <Body className="text-lg max-w-2xl mx-auto">
              A complete solution to showcase your products and accept orders - all without building an app.
            </Body>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-ledger-rule shadow-ledger-sm p-6"
              >
                <div className="w-14 h-14 rounded-xl border border-ledger-rule bg-transparent flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-ledger-ink/70" />
                </div>
                <H3 className="mb-2">{feature.title}</H3>
                <Body>{feature.description}</Body>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-ledger-paper">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <H2 className="mb-4">
              Go Live in 3 Simple Steps
            </H2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
                <div className="w-16 h-16 rounded-full bg-ledger-ink text-ledger-paper flex items-center justify-center text-2xl font-ledger font-semibold mx-auto mb-4 shadow-ledger-sm">
                  {item.step}
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-ledger-rule" />
                )}
                <H3 className="mb-2">{item.title}</H3>
                <Body>{item.desc}</Body>
              </motion.div>
            ))}
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
            >
              <H2 className="mb-6">
                Why Retailers Love Digital Catalogue
              </H2>
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
                    <div className="w-6 h-6 rounded-full border border-ledger-sage/30 bg-ledger-sage/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-ledger-sage" />
                    </div>
                    <span className="text-lg font-grotesk text-ledger-ink/80">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/join">
                  <Button size="lg" variant="ledger" className="gap-2">
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
              className="bg-ledger-paper rounded-3xl p-8 border border-ledger-rule"
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Globe, value: "1M+", label: "Store Visits" },
                  { icon: ShoppingCart, value: "50K+", label: "Orders Placed" },
                  { icon: Star, value: "4.9", label: "Average Rating" },
                  { icon: Zap, value: "<2s", label: "Load Time" },
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white border border-ledger-rule shadow-ledger-sm rounded-xl">
                    <stat.icon className="w-8 h-8 text-ledger-ink/70 mx-auto mb-2" />
                    <p className="font-ledger text-xl sm:text-2xl font-semibold text-ledger-ink">{stat.value}</p>
                    <Caption>{stat.label}</Caption>
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