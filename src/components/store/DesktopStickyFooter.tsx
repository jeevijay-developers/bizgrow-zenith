import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, ShoppingBag, Grid3X3, ChevronUp, MessageCircle, 
  Sparkles, Zap, Shield, Truck, Clock, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface DesktopStickyFooterProps {
  cartCount: number;
  cartTotal: number;
  onCartClick: () => void;
  onWhatsAppClick: () => void;
  storeName: string;
  showBackToTop: boolean;
  onBackToTop: () => void;
}

const DesktopStickyFooter = ({
  cartCount,
  cartTotal,
  onCartClick,
  onWhatsAppClick,
  storeName,
  showBackToTop,
  onBackToTop,
}: DesktopStickyFooterProps) => {
  const features = [
    { icon: Truck, label: "Free Delivery", subtext: "On orders ₹500+" },
    { icon: Clock, label: "Quick Dispatch", subtext: "Same day shipping" },
    { icon: Shield, label: "Secure Orders", subtext: "100% safe checkout" },
  ];

  return (
    <>
      {/* Back to Top - Desktop */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBackToTop}
            className="hidden md:flex fixed bottom-28 right-8 z-40 p-3 bg-card/95 backdrop-blur-md rounded-full shadow-xl border border-border items-center justify-center hover:bg-card transition-colors"
          >
            <ChevronUp className="h-5 w-5 text-primary" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Desktop Sticky Footer Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="hidden md:block fixed bottom-0 left-0 right-0 z-50"
      >
        {/* Gradient Background */}
        <div className="relative bg-gradient-to-r from-background via-background to-background border-t border-border shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.15)]">
          {/* Decorative top line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between px-6 py-3">
              {/* Left: Feature Badges */}
              <div className="flex items-center gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2.5 group"
                  >
                    <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-xs font-semibold text-foreground">{feature.label}</p>
                      <p className="text-[10px] text-muted-foreground">{feature.subtext}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Center: Powered By */}
              <div className="hidden xl:flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Powered by</span>
                <Link 
                  to="/" 
                  className="font-bold text-sm bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                >
                  BizGrow 360
                </Link>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-3">
                {/* WhatsApp Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    onClick={onWhatsAppClick}
                    className="gap-2 rounded-xl border-primary/30 hover:bg-primary/5 hover:border-primary/50"
                  >
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <span className="hidden lg:inline text-sm">Chat with us</span>
                  </Button>
                </motion.div>

                {/* Cart Button with Animation */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={onCartClick}
                    className={`gap-3 rounded-xl px-5 py-5 shadow-lg transition-all ${
                      cartCount > 0 
                        ? "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary" 
                        : "bg-muted hover:bg-muted/80 text-muted-foreground"
                    }`}
                  >
                    <div className="relative">
                      <ShoppingBag className="w-5 h-5" />
                      {cartCount > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                        >
                          {cartCount > 9 ? "9+" : cartCount}
                        </motion.span>
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold">
                        {cartCount > 0 ? `${cartCount} item${cartCount > 1 ? "s" : ""}` : "Cart Empty"}
                      </p>
                      {cartCount > 0 && (
                        <p className="text-xs opacity-90">₹{cartTotal.toLocaleString()}</p>
                      )}
                    </div>
                    {cartCount > 0 && (
                      <ChevronUp className="w-4 h-4 rotate-90 ml-1" />
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default DesktopStickyFooter;
