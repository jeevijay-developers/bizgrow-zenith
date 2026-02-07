import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, Lock, CreditCard, Headphones, 
  Zap, Heart, Star, Gift, Truck, Clock,
  MapPin, Phone, Mail, Instagram, Facebook
} from "lucide-react";

interface StoreFooterProps {
  storeName: string;
  storeAddress?: string | null;
  whatsappNumber?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
}

const StoreFooter = ({
  storeName,
  storeAddress,
  whatsappNumber,
  instagramUrl,
  facebookUrl,
}: StoreFooterProps) => {
  const trustBadges = [
    { icon: Shield, label: "Verified Store", subtext: "Trusted Seller", color: "from-blue-500/20 to-blue-600/10" },
    { icon: Lock, label: "Secure Orders", subtext: "Safe Checkout", color: "from-emerald-500/20 to-emerald-600/10" },
    { icon: CreditCard, label: "COD Available", subtext: "Pay on Delivery", color: "from-purple-500/20 to-purple-600/10" },
    { icon: Headphones, label: "Quick Support", subtext: "We're here to help", color: "from-amber-500/20 to-amber-600/10" },
  ];

  const quickFeatures = [
    { icon: Truck, label: "Fast Delivery" },
    { icon: Gift, label: "Special Offers" },
    { icon: Star, label: "Quality Products" },
    { icon: Clock, label: "Same Day Dispatch" },
  ];

  return (
    <footer className="mt-12 md:mt-20 pb-32 md:pb-28">
      {/* Decorative Divider */}
      <div className="relative py-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center">
          <div className="bg-muted px-6 py-2 rounded-full border border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Heart className="w-4 h-4 text-primary fill-primary/20" />
              <span className="text-sm font-medium">Thank you for shopping with us</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Features Strip - Desktop */}
      <div className="hidden md:block mb-10">
        <div className="flex items-center justify-center gap-8 lg:gap-12">
          {quickFeatures.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <feature.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{feature.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className="px-4 lg:px-6 mb-10">
        <h3 className="text-sm lg:text-base font-semibold text-foreground text-center mb-6">
          Why Shop With {storeName}?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className={`relative overflow-hidden flex flex-col items-center gap-2 lg:gap-3 p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-gradient-to-br ${badge.color} border border-border/30 shadow-sm hover:shadow-lg transition-all duration-300`}
            >
              {/* Subtle glow effect */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                <badge.icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
              </div>
              <div className="text-center relative">
                <span className="text-xs lg:text-sm font-semibold text-foreground block">{badge.label}</span>
                <span className="text-[10px] lg:text-xs text-muted-foreground">{badge.subtext}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Store Info Card */}
      <div className="px-4 lg:px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-card via-card to-card/80 rounded-3xl p-6 lg:p-8 border border-border/50 shadow-lg"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Store Details */}
            <div className="text-center lg:text-left">
              <h4 className="font-bold text-xl lg:text-2xl text-foreground mb-2">{storeName}</h4>
              {storeAddress && (
                <p className="text-sm text-muted-foreground flex items-center justify-center lg:justify-start gap-2">
                  <MapPin className="w-4 h-4" />
                  {storeAddress}
                </p>
              )}
            </div>

            {/* Contact Links */}
            {(whatsappNumber || instagramUrl || facebookUrl) && (
              <div className="flex items-center justify-center lg:justify-end gap-3">
                {whatsappNumber && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-colors border border-emerald-500/20"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">WhatsApp</span>
                  </motion.a>
                )}
                {instagramUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-500/10 text-pink-600 hover:bg-pink-500/20 transition-colors border border-pink-500/20"
                  >
                    <Instagram className="w-4 h-4" />
                    <span className="text-sm font-medium">Instagram</span>
                  </motion.a>
                )}
                {facebookUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-colors border border-blue-500/20"
                  >
                    <Facebook className="w-4 h-4" />
                    <span className="text-sm font-medium">Facebook</span>
                  </motion.a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Powered By Badge */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center px-4"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Powered by</span>
          </div>
          <Link 
            to="/" 
            className="font-bold text-sm bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            BizGrow 360
          </Link>
        </div>
        
        <p className="text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1.5">
          Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> in India
        </p>
      </motion.div>
    </footer>
  );
};

export default StoreFooter;
