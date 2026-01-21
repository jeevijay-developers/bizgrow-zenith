import { motion, AnimatePresence } from "framer-motion";
import { Home, ShoppingBag, Grid3X3, ChevronUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
              className="h-11 w-11 rounded-full bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg -mt-5 border-2 border-background"
            >
              <MessageCircle className="h-4.5 w-4.5 text-primary-foreground" />
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
