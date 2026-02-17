import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  MessageCircle,
  Store,
  Bell,
  CreditCard,
  Truck,
  ImagePlus,
  LogOut,
  Link2,
  Sparkles,
  Receipt,
  Zap,
  Lock,
  Crown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { getCategoryConfig } from "@/config/categoryConfig";
import logoDarkBg from "@/assets/logo-dark-bg.png";
import { toast } from "sonner";

interface DashboardSidebarProps {
  storeCategory?: string | null;
}

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  featureKey: string;
  isHighlighted?: boolean;
  badgeText?: string;
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, featureKey: "dashboard" },
  { title: "POS Billing", url: "/dashboard/pos", icon: Receipt, featureKey: "pos" },
  { title: "Orders", url: "/dashboard/orders", icon: ShoppingCart, featureKey: "orders" },
  { title: "Products", url: "/dashboard/products", icon: Package, featureKey: "products" },
  { title: "Customers", url: "/dashboard/customers", icon: Users, featureKey: "customers" },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3, featureKey: "analytics", isHighlighted: true, badgeText: "HOT" },
];

const toolsNavItems: NavItem[] = [
  { title: "Catalogue Link", url: "/dashboard/catalogue-link", icon: Link2, featureKey: "catalogue-link" },
  { title: "Customize Store", url: "/dashboard/customize-store", icon: Sparkles, featureKey: "customize-store" },
  { title: "AI Upload", url: "/dashboard/ai-upload", icon: ImagePlus, featureKey: "ai-upload", isHighlighted: true, badgeText: "NEW" },
  { title: "WhatsApp", url: "/dashboard/whatsapp", icon: MessageCircle, featureKey: "whatsapp" },
  { title: "Delivery", url: "/dashboard/delivery", icon: Truck, featureKey: "delivery" },
];

const settingsNavItems: NavItem[] = [
  { title: "Store Settings", url: "/dashboard/store-settings", icon: Store, featureKey: "store-settings" },
  { title: "Billing", url: "/dashboard/billing", icon: CreditCard, featureKey: "billing" },
  { title: "Notifications", url: "/dashboard/notifications", icon: Bell, featureKey: "notifications" },
  { title: "Settings", url: "/dashboard/settings", icon: Settings, featureKey: "settings" },
];

export function DashboardSidebar({ storeCategory }: DashboardSidebarProps) {
  const { state } = useSidebar();
  const { signOut } = useAuth();
  const { hasFeature, currentPlan } = useSubscription();
  const collapsed = state === "collapsed";
  const categoryConfig = getCategoryConfig(storeCategory);
  const CategoryIcon = categoryConfig.icon;

  const handleLockedFeatureClick = (item: NavItem) => {
    if (!hasFeature(item.featureKey)) {
      toast.error("Upgrade Required", {
        description: `Upgrade to ${item.featureKey === "analytics" ? "Starter" : "Pro"} plan to access ${item.title}`,
        action: {
          label: "Upgrade",
          onClick: () => window.location.href = "/dashboard/billing",
        },
      });
    }
  };

  // Filter items based on subscription, but show locked items with indication
  const filterItems = (items: NavItem[]) => {
    return items.map((item) => ({
      ...item,
      isLocked: !hasFeature(item.featureKey),
    }));
  };

  const filteredMainNavItems = filterItems(mainNavItems);
  const filteredToolsNavItems = filterItems(toolsNavItems);
  const filteredSettingsNavItems = filterItems(settingsNavItems);

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-primary">
      <SidebarHeader className="p-4 bg-primary">
        <Link to="/dashboard" className="flex items-center gap-2">
          <img
            src={logoDarkBg}
            alt="BizGrow 360"
            className={`transition-all duration-300 ${collapsed ? "h-8 w-8 object-contain object-left" : "h-9"}`}
          />
        </Link>
        {/* Category Badge */}
        {!collapsed && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 flex items-center gap-2 px-2 py-1.5 rounded-lg bg-gradient-to-r ${categoryConfig.theme.gradient} bg-opacity-20`}
            >
              <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
                <CategoryIcon className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-medium text-white/90 truncate">{categoryConfig.label}</span>
            </motion.div>
            
            {/* Subscription Plan Badge */}
            <Link to="/dashboard/billing" className="block mt-2">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border transition-colors ${
                  currentPlan === "free" 
                    ? "bg-slate-500/20 border-slate-400/30 hover:bg-slate-500/30" 
                    : currentPlan === "starter"
                    ? "bg-blue-500/20 border-blue-400/30 hover:bg-blue-500/30"
                    : "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400/30 hover:from-amber-500/30 hover:to-orange-500/30"
                }`}
              >
                {currentPlan === "pro" ? (
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Zap className="w-3.5 h-3.5 text-white/70" />
                )}
                <span className="text-xs font-medium text-white/90 capitalize">{currentPlan} Plan</span>
                {currentPlan !== "pro" && (
                  <span className="ml-auto text-[10px] text-white/60">Upgrade</span>
                )}
              </motion.div>
            </Link>
          </>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2 bg-primary">
        <SidebarGroup>
          <SidebarGroupLabel className={`text-white/70 font-medium ${collapsed ? "sr-only" : ""}`}>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMainNavItems.map((item) => {
                const isLocked = 'isLocked' in item && item.isLocked;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild={!isLocked} tooltip={item.title}>
                      {isLocked ? (
                        <button
                          onClick={() => handleLockedFeatureClick(item)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/40 hover:bg-white/10 transition-colors cursor-not-allowed relative w-full"
                        >
                          <item.icon className="w-5 h-5 shrink-0" />
                          {!collapsed && (
                            <>
                              <span>{item.title}</span>
                              <Lock className="w-3.5 h-3.5 ml-auto" />
                            </>
                          )}
                        </button>
                      ) : (
                        <NavLink
                          to={item.url}
                          end={item.url === "/dashboard"}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/15 hover:text-white transition-colors relative ${
                            item.isHighlighted && item.badgeText === "HOT" 
                              ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30" 
                              : ""
                          }`}
                          activeClassName="bg-accent text-accent-foreground font-medium"
                        >
                          <item.icon className={`w-5 h-5 shrink-0 ${item.isHighlighted && item.badgeText === "HOT" ? "text-orange-400" : ""}`} />
                          {!collapsed && (
                            <>
                              <span>{item.title}</span>
                              {item.isHighlighted && item.badgeText && (
                                <motion.div
                                  className="ml-auto"
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <Badge className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-500 hover:to-orange-500 text-[9px] px-1.5 py-0 h-4 font-bold border-0">
                                    <Zap className="w-2.5 h-2.5 mr-0.5" />
                                    {item.badgeText}
                                  </Badge>
                                </motion.div>
                              )}
                            </>
                          )}
                        </NavLink>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={`text-white/70 font-medium ${collapsed ? "sr-only" : ""}`}>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredToolsNavItems.map((item) => {
                const isLocked = 'isLocked' in item && item.isLocked;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild={!isLocked} tooltip={item.title}>
                      {isLocked ? (
                        <button
                          onClick={() => handleLockedFeatureClick(item)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/40 hover:bg-white/10 transition-colors cursor-not-allowed relative w-full"
                        >
                          <item.icon className="w-5 h-5 shrink-0" />
                          {!collapsed && (
                            <>
                              <span>{item.title}</span>
                              <Lock className="w-3.5 h-3.5 ml-auto" />
                            </>
                          )}
                        </button>
                      ) : (
                        <NavLink
                          to={item.url}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/15 hover:text-white transition-colors relative ${
                            item.isHighlighted ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30" : ""
                          }`}
                          activeClassName="bg-accent text-accent-foreground font-medium"
                        >
                          <item.icon className={`w-5 h-5 shrink-0 ${item.isHighlighted ? "text-amber-400" : ""}`} />
                          {!collapsed && (
                            <>
                              <span>{item.title}</span>
                              {item.isHighlighted && item.badgeText && (
                                <motion.div
                                  className="ml-auto"
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <Badge className="bg-amber-500 hover:bg-amber-500 text-[9px] px-1.5 py-0 h-4 font-bold">
                                    <Zap className="w-2.5 h-2.5 mr-0.5" />
                                    {item.badgeText}
                                  </Badge>
                                </motion.div>
                              )}
                            </>
                          )}
                        </NavLink>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={`text-white/70 font-medium ${collapsed ? "sr-only" : ""}`}>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredSettingsNavItems.map((item) => {
                const isLocked = 'isLocked' in item && item.isLocked;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild={!isLocked} tooltip={item.title}>
                      {isLocked ? (
                        <button
                          onClick={() => handleLockedFeatureClick(item)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/40 hover:bg-white/10 transition-colors cursor-not-allowed relative w-full"
                        >
                          <item.icon className="w-5 h-5 shrink-0" />
                          {!collapsed && (
                            <>
                              <span>{item.title}</span>
                              <Lock className="w-3.5 h-3.5 ml-auto" />
                            </>
                          )}
                        </button>
                      ) : (
                        <NavLink
                          to={item.url}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/15 hover:text-white transition-colors"
                          activeClassName="bg-accent text-accent-foreground font-medium"
                        >
                          <item.icon className="w-5 h-5 shrink-0" />
                          {!collapsed && <span>{item.title}</span>}
                        </NavLink>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 bg-primary">
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          onClick={signOut}
          className="w-full justify-start text-white/80 hover:bg-white/15 hover:text-red-300"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
