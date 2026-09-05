import { motion } from "framer-motion";
import { MessageSquare, CheckCheck, Bell, ArrowRight, ShoppingCart, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { RippleButton } from "@/components/ui/ripple-button";
import { MobileCarousel } from "@/components/ui/mobile-carousel";
import { BizgrowTag } from "@/components/ui/bizgrow-tag";
import whatsappMerchantImg from "@/assets/whatsapp-orders-merchant.jpg";

const whatsappFeatures = [
  { 
    icon: ShoppingCart, 
    title: "No App Download", 
    description: "Customers order directly via WhatsApp" 
  },
  { 
    icon: Bell, 
    title: "Instant Alerts", 
    description: "Real-time order notifications" 
  },
  { 
    icon: Clock, 
    title: "Quick Response", 
    description: "Manage orders with one tap" 
  },
  { 
    icon: CheckCheck, 
    title: "Order Tracking", 
    description: "Status updates to customers" 
  },
];

const WhatsAppVisual = () => (
  <div className="relative mx-auto max-w-[330px] sm:max-w-[370px] lg:max-w-[410px]">
    {/* Ambient Background Glow */}
    <div className="absolute -inset-4 bg-gradient-to-tr from-green-500/20 via-primary/15 to-emerald-500/20 rounded-[36px] blur-2xl -z-10" />

    {/* Main Image Container */}
    <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden border-2 border-border/80 shadow-2xl bg-card aspect-[4/5] max-h-[520px] w-full">
      <img
        src={whatsappMerchantImg}
        alt="Store merchant managing WhatsApp orders on BizGrow 360"
        className="w-full h-full object-cover object-[center_28%] block"
      />

      {/* Floating Top Badge */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 right-4 bg-green-600/95 backdrop-blur-md text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20"
      >
        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
        <span>New Order!</span>
        <Bell className="w-3.5 h-3.5" />
      </motion.div>
    </div>
  </div>
);

const WhatsAppSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-[5%] w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full min-w-0">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full min-w-0 max-w-full text-center sm:text-left"
          >
            <div className="mb-6">
              <BizgrowTag icon={MessageSquare}>WhatsApp Orders</BizgrowTag>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 font-display break-words">
              Orders via WhatsApp
              <span className="text-gold block mt-2">Where Customers Are</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed break-words">
              Your customers don't need to download any app. They browse your digital catalogue 
              and order directly on WhatsApp. You manage everything from one dashboard.
            </p>

            {/* Mobile Visual */}
            <div className="block lg:hidden mb-8 w-full min-w-0">
              <WhatsAppVisual />
            </div>

            {/* Feature Grid - Desktop */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-4 mb-8 text-left">
              {whatsappFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-muted/50 rounded-xl p-4 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-bold text-foreground text-sm">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Feature Carousel - Mobile */}
            <div className="sm:hidden mb-8 text-left w-full min-w-0">
              <MobileCarousel slideClassName="w-[42%]" slidesToScroll={1} gapClassName="gap-3">
                {whatsappFeatures.map((feature) => (
                  <div
                    key={feature.title}
                    className="bg-muted/50 rounded-xl p-4 border border-border h-full flex flex-col justify-start"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2.5">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <p className="font-bold text-foreground text-sm mb-0.5">{feature.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </MobileCarousel>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <Link to="/join">
                <RippleButton size="lg" className="btn-gradient-accent text-accent-foreground font-bold h-12 px-6 group">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Enable WhatsApp Orders
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </RippleButton>
              </Link>
            </div>
          </motion.div>

          {/* Right - Image Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden lg:flex relative justify-center w-full min-w-0"
          >
            <WhatsAppVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppSection;
