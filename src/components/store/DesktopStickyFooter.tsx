import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, ShoppingBag, Grid3X3, ChevronUp, 
  Sparkles, Zap, Shield, Truck, Clock, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

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
                    title="Chat on WhatsApp"
                    className="gap-2 rounded-xl border-[#25D366] bg-[#25D366]/5 hover:bg-[#25D366]/10 hover:border-[#128C7E]"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    <span className="hidden lg:inline text-sm text-[#25D366] font-medium">Chat with us</span>
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
