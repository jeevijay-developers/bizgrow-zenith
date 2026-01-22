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
import { getCategoryConfig } from "@/config/categoryConfig";
import logoDarkBg from "@/assets/logo-dark-bg.png";

interface DashboardSidebarProps {
  storeCategory?: string | null;
}

const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "POS Billing", url: "/dashboard/pos", icon: Receipt },
  { title: "Orders", url: "/dashboard/orders", icon: ShoppingCart },
  { title: "Products", url: "/dashboard/products", icon: Package },
  { title: "Customers", url: "/dashboard/customers", icon: Users },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
];

const toolsNavItems = [
  { title: "Catalogue Link", url: "/dashboard/catalogue-link", icon: Link2 },
  { title: "Customize Store", url: "/dashboard/customize-store", icon: Sparkles },
  { title: "AI Upload", url: "/dashboard/ai-upload", icon: ImagePlus, isHighlighted: true },
  { title: "WhatsApp", url: "/dashboard/whatsapp", icon: MessageCircle },
  { title: "Delivery", url: "/dashboard/delivery", icon: Truck },
];

const settingsNavItems = [
  { title: "Store Settings", url: "/dashboard/store-settings", icon: Store },
  { title: "Billing", url: "/dashboard/billing", icon: CreditCard },
  { title: "Notifications", url: "/dashboard/notifications", icon: Bell },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar({ storeCategory }: DashboardSidebarProps) {
  const { state } = useSidebar();
  const { signOut } = useAuth();
  const collapsed = state === "collapsed";
  const categoryConfig = getCategoryConfig(storeCategory);
  const CategoryIcon = categoryConfig.icon;

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
        )}
      </SidebarHeader>

      <SidebarContent className="px-2 bg-primary">
        <SidebarGroup>
          <SidebarGroupLabel className={`text-white/70 font-medium ${collapsed ? "sr-only" : ""}`}>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/15 hover:text-white transition-colors"
                      activeClassName="bg-accent text-accent-foreground font-medium"
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={`text-white/70 font-medium ${collapsed ? "sr-only" : ""}`}>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
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
                          {item.isHighlighted && (
                            <motion.div
                              className="ml-auto"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Badge className="bg-amber-500 hover:bg-amber-500 text-[9px] px-1.5 py-0 h-4 font-bold">
                                <Zap className="w-2.5 h-2.5 mr-0.5" />
                                NEW
                              </Badge>
                            </motion.div>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={`text-white/70 font-medium ${collapsed ? "sr-only" : ""}`}>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/15 hover:text-white transition-colors"
                      activeClassName="bg-accent text-accent-foreground font-medium"
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
