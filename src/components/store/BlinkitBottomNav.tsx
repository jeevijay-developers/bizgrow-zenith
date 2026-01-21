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
            className="fixed bottom-24 right-4 z-40 p-3 bg-white rounded-full shadow-lg border border-gray-200 md:hidden"
          >
            <ChevronUp className="h-5 w-5 text-gray-700" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-pb md:hidden"
      >
        {/* Cart Preview Bar (when items in cart) */}
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-b border-gray-100 overflow-hidden"
            >
              <button
                onClick={onCartClick}
                className="w-full flex items-center justify-between px-4 py-3 bg-emerald-500 text-white"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-white text-emerald-600 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
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
            className="h-12 w-12 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-lg -mt-6"
          >
            <MessageCircle className="h-5 w-5 text-white" />
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
      isActive ? "text-emerald-600" : "text-gray-500"
    }`}
  >
    <div className="relative">
      <div className={`p-1.5 rounded-xl transition-colors ${
        isActive ? "bg-emerald-50" : ""
      }`}>
        <Icon className={`h-5 w-5 ${isActive ? "fill-emerald-100" : ""}`} />
      </div>
      {badge !== undefined && (
        <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </div>
    <span className={`text-[10px] font-medium ${isActive ? "text-emerald-700" : ""}`}>
      {label}
    </span>
  </button>
);

export default BlinkitBottomNav;
