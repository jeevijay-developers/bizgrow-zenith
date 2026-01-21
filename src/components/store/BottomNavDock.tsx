import { motion } from "framer-motion";
import { Home, Search, ShoppingCart, MessageCircle, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BottomNavDockProps {
  cartCount: number;
  onHomeClick: () => void;
  onSearchClick: () => void;
  onCartClick: () => void;
  onWhatsAppClick: () => void;
  showBackToTop: boolean;
  onBackToTop: () => void;
}

const BottomNavDock = ({
  cartCount,
  onHomeClick,
  onSearchClick,
  onCartClick,
  onWhatsAppClick,
  showBackToTop,
  onBackToTop,
}: BottomNavDockProps) => {
  return (
    <>
      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={onBackToTop}
          className="fixed bottom-36 right-4 z-40 w-12 h-12 rounded-full bg-card border border-border shadow-xl flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ChevronUp className="w-5 h-5 text-foreground" />
        </motion.button>
      )}

      {/* Bottom Navigation Dock */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
      >
        <div className="bg-card/95 backdrop-blur-xl rounded-2xl border border-border shadow-2xl p-2">
          <div className="flex items-center justify-around">
            {/* Home */}
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-14 w-14 rounded-xl flex flex-col items-center justify-center gap-0.5"
                onClick={onHomeClick}
              >
                <Home className="w-5 h-5 text-foreground" />
                <span className="text-[10px] text-muted-foreground font-medium">Home</span>
              </Button>
            </motion.div>

            {/* Search */}
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-14 w-14 rounded-xl flex flex-col items-center justify-center gap-0.5"
                onClick={onSearchClick}
              >
                <Search className="w-5 h-5 text-foreground" />
                <span className="text-[10px] text-muted-foreground font-medium">Search</span>
              </Button>
            </motion.div>

            {/* Cart - Primary Action */}
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                className="h-16 w-16 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg flex flex-col items-center justify-center gap-0.5 relative -mt-4"
                onClick={onCartClick}
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="text-[10px] font-semibold">Cart</span>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center shadow-md"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
                )}
              </Button>
            </motion.div>

            {/* WhatsApp */}
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-14 w-14 rounded-xl flex flex-col items-center justify-center gap-0.5"
                onClick={onWhatsAppClick}
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-[10px] text-muted-foreground font-medium">Chat</span>
              </Button>
            </motion.div>

            {/* Placeholder for symmetry */}
            <div className="w-14" />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BottomNavDock;
