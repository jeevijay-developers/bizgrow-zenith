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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={onBackToTop}
            className="fixed bottom-24 right-4 z-40 p-3 bg-background rounded-full shadow-lg border border-border md:hidden"
          >
            <ChevronUp className="h-5 w-5 text-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border safe-area-pb md:hidden"
      >
        {/* Cart Preview Bar (when items in cart) */}
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-b border-border overflow-hidden"
            >
              <button
                onClick={onCartClick}
                className="w-full flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {cartCount} item{cartCount > 1 ? "s" : ""} · ₹{cartTotal}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold">
                  View Cart
                  <ChevronUp className="h-4 w-4 rotate-90" />
                </div>
              </button>
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
          <Button
            onClick={onWhatsAppClick}
            size="icon"
            className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg -mt-6"
          >
            <MessageCircle className="h-5 w-5 text-primary-foreground" />
          </Button>
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
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all ${
      isActive ? "text-primary" : "text-muted-foreground"
    }`}
  >
    <div className="relative">
      <div className={`p-1.5 rounded-xl transition-colors ${
        isActive ? "bg-primary/10" : ""
      }`}>
        <Icon className={`h-5 w-5 ${isActive ? "fill-primary/20" : ""}`} />
      </div>
      {badge !== undefined && (
        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </div>
    <span className={`text-[10px] font-medium ${isActive ? "text-primary" : ""}`}>
      {label}
    </span>
  </button>
);

export default BlinkitBottomNav;
