import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Link2,
  Menu,
  Receipt,
  Plus,
  ImagePlus,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const primaryNavItems = [
  { title: "Home", url: "/dashboard", icon: LayoutDashboard },
  { title: "Orders", url: "/dashboard/orders", icon: ShoppingCart },
  { title: "Products", url: "/dashboard/products", icon: Package },
  { title: "Share", url: "/dashboard/catalogue-link", icon: Link2 },
];

const quickActions = [
  { title: "Add Product", url: "/dashboard/products", icon: Plus, color: "bg-blue-500" },
  { title: "AI Upload", url: "/dashboard/ai-upload", icon: ImagePlus, color: "bg-amber-500" },
  { title: "POS Billing", url: "/dashboard/pos", icon: Receipt, color: "bg-green-500" },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3, color: "bg-purple-500" },
];

const moreMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "POS Billing", url: "/dashboard/pos", icon: Receipt },
  { title: "Orders", url: "/dashboard/orders", icon: ShoppingCart },
  { title: "Products", url: "/dashboard/products", icon: Package },
  { title: "AI Upload", url: "/dashboard/ai-upload", icon: ImagePlus },
  { title: "Catalogue Link", url: "/dashboard/catalogue-link", icon: Link2 },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
];

export function MobileBottomNav() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (url: string) => {
    if (url === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(url);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border safe-area-pb">
      <div className="flex items-center justify-around h-16 px-2">
        {primaryNavItems.map((item) => {
          const active = isActive(item.url);
          return (
            <Link
              key={item.title}
              to={item.url}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-xl transition-all min-w-[60px]",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                {active && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -inset-2 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <item.icon className={cn("w-5 h-5 relative z-10", active && "text-primary")} />
              </div>
              <span className={cn(
                "text-[10px] font-medium relative z-10",
                active && "text-primary"
              )}>
                {item.title}
              </span>
            </Link>
          );
        })}

        {/* More Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-xl text-muted-foreground hover:text-foreground transition-all min-w-[60px]">
              <Menu className="w-5 h-5" />
              <span className="text-[10px] font-medium">More</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto max-h-[70vh] rounded-t-2xl">
            <SheetHeader className="pb-4">
              <SheetTitle className="text-left">Quick Actions</SheetTitle>
            </SheetHeader>
            
            {/* Quick Actions Grid */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  to={action.url}
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg",
                    action.color
                  )}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-center">{action.title}</span>
                </Link>
              ))}
            </div>

            {/* All Menu Items */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground mb-3">All Modules</p>
              <div className="grid grid-cols-2 gap-2">
                {moreMenuItems.map((item) => {
                  const active = isActive(item.url);
                  return (
                    <Link
                      key={item.title}
                      to={item.url}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl transition-all",
                        active
                          ? "bg-primary/10 text-primary"
                          : "bg-muted/50 text-foreground hover:bg-muted"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
