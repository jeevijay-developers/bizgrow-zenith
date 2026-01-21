import { Link, useLocation } from "react-router-dom";
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
import { useAuth } from "@/hooks/useAuth";
import logoDarkBg from "@/assets/logo-dark-bg.png";
import logoLightBg from "@/assets/logo-light-bg.png";

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
  { title: "AI Upload", url: "/dashboard/ai-upload", icon: ImagePlus },
  { title: "WhatsApp", url: "/dashboard/whatsapp", icon: MessageCircle },
  { title: "Delivery", url: "/dashboard/delivery", icon: Truck },
];

const settingsNavItems = [
  { title: "Store Settings", url: "/dashboard/store-settings", icon: Store },
  { title: "Billing", url: "/dashboard/billing", icon: CreditCard },
  { title: "Notifications", url: "/dashboard/notifications", icon: Bell },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const { signOut } = useAuth();
  const collapsed = state === "collapsed";

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
