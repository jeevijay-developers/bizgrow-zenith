import { motion, AnimatePresence } from "framer-motion";
import { Home, ShoppingBag, Grid3X3, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

interface BlinkitBottomNavProps {
  cartCount: number;
  cartTotal: number;
  onHomeClick: () => void;
  onCategoriesClick: () => void;
  onCartClick: () => void;
  onWhatsAppClick: () => void;
  showBackToTop: boolean;
  onBackToTop: () => void;
  activeTab?: "home" | "categories" | "cart";
}

const BlinkitBottomNav = ({
  cartCount,
  cartTotal,
  onHomeClick,
  onCategoriesClick,
  onCartClick,
  onWhatsAppClick,
  showBackToTop,
  onBackToTop,
  activeTab = "home",
}: BlinkitBottomNavProps) => {
  return (
    <>
      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBackToTop}
            className="fixed bottom-24 right-4 z-40 p-2.5 bg-background/95 backdrop-blur-md rounded-full shadow-lg border border-border/50 md:hidden"
          >
            <ChevronUp className="h-4 w-4 text-primary" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/50 safe-area-pb md:hidden shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)]"
      >
        {/* Cart Preview Bar */}
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onCartClick}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-primary via-primary to-primary/95 text-primary-foreground"
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </motion.div>
                    <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  </div>
                  <span className="text-xs font-semibold">
                    {cartCount} item{cartCount > 1 ? "s" : ""} · ₹{cartTotal.toFixed(0)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold bg-white/15 px-3 py-1 rounded-full">
                  View Cart
                  <ChevronUp className="h-3 w-3 rotate-90" />
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-around py-2 px-4">
          <NavItem
            icon={Home}
            label="Home"
            isActive={activeTab === "home"}
            onClick={onHomeClick}
          />
          <NavItem
            icon={Grid3X3}
            label="Categories"
            isActive={activeTab === "categories"}
            onClick={onCategoriesClick}
          />
          <NavItem
            icon={ShoppingBag}
            label="Cart"
            isActive={activeTab === "cart"}
            onClick={onCartClick}
            badge={cartCount > 0 ? cartCount : undefined}
          />
          
          {/* WhatsApp FAB */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onWhatsAppClick}
              size="icon"
              title="Message on WhatsApp"
              className="h-11 w-11 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54] shadow-lg -mt-5 border-2 border-background"
            >
              <WhatsAppIcon className="h-5 w-5 text-white" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

const NavItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
  badge,
}: {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: number;
}) => (
  <motion.button
    whileTap={{ scale: 0.92 }}
    onClick={onClick}
    className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all duration-200 ${
      isActive ? "text-primary" : "text-muted-foreground"
    }`}
  >
    <div className="relative">
      <motion.div 
        animate={{ scale: isActive ? 1 : 0.95 }}
        className={`p-1.5 rounded-xl transition-all duration-200 ${
          isActive ? "bg-primary/10" : ""
        }`}
      >
        <Icon className={`h-4 w-4 transition-all ${isActive ? "text-primary" : ""}`} />
      </motion.div>
      {badge !== undefined && (
        <motion.span 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[8px] font-bold min-w-[15px] h-4 px-1 rounded-full flex items-center justify-center shadow-sm"
        >
          {badge > 9 ? "9+" : badge}
        </motion.span>
      )}
    </div>
    <span className={`text-[9px] font-semibold transition-colors ${isActive ? "text-primary" : ""}`}>
      {label}
    </span>
  </motion.button>
);

export default BlinkitBottomNav;
