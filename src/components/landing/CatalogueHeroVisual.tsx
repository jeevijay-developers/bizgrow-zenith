import { motion } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Sparkles,
  Droplets,
  Cookie,
  MessageCircle,
  LayoutDashboard,
  Receipt,
  ShoppingCart,
  Users,
  BarChart3,
  Building2,
  Crown,
  Bell,
  Calculator,
  Link2,
} from "lucide-react";

const sidebarNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "POS Billing", icon: Receipt },
  { label: "Orders", icon: ShoppingCart },
  { label: "Products", icon: ShoppingBag },
  { label: "Customers", icon: Users },
  { label: "Analytics", icon: BarChart3, badge: "HOT" },
  { label: "Vendors", icon: Building2 },
];

const statCards = [
  { label: "Today's Revenue", value: "₹8,450", change: "+23%", icon: Calculator, color: "bg-emerald-100 text-emerald-600" },
  { label: "Orders", value: "24", change: "+6 today", icon: Receipt, color: "bg-blue-100 text-blue-600" },
  { label: "Items", value: "156", change: "In catalogue", icon: ShoppingBag, color: "bg-orange-100 text-orange-600" },
  { label: "Customers", value: "89", change: "Total customers", icon: Users, color: "bg-rose-100 text-rose-600" },
];

const quickActions = [
  { label: "Add Item", desc: "Add grocery item", icon: ShoppingBag, color: "bg-orange-500" },
  { label: "AI Scan", desc: "Scan shelf stock", icon: Sparkles, color: "bg-violet-500" },
  { label: "Credit Book", desc: "Manage udhar", icon: Receipt, color: "bg-amber-500" },
  { label: "Daily Sales", desc: "Today's billing", icon: BarChart3, color: "bg-emerald-500" },
  { label: "Share Store", desc: "Get your store link", icon: Link2, color: "bg-blue-500" },
];

export const CatalogueHeroVisual = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto select-none">
      {/* Ambient background glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-accent/20 via-primary/30 to-purple-600/20 rounded-3xl blur-2xl -z-10" />

      {/* Main Dashboard Window Mockup */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white text-slate-900">
        {/* Browser Top Navigation Bar */}
        <div className="bg-slate-100 px-4 py-2.5 flex items-center justify-between border-b border-slate-200 gap-3">
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm" />
          </div>
          <div className="flex-1 max-w-sm mx-auto bg-white rounded-lg px-3 py-1 text-[11px] sm:text-xs text-slate-500 flex items-center justify-center gap-2 border border-slate-200 truncate">
            <span className="truncate font-mono">app.bizgrow360.com/dashboard</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
            <Bell className="w-3.5 h-3.5" />
            <div className="w-6 h-6 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center">
              UT
            </div>
          </div>
        </div>

        {/* Dashboard Main View Area */}
        <div className="flex min-h-[420px] sm:min-h-[460px]">
          {/* Left Sidebar */}
          <div className="w-[108px] sm:w-[128px] shrink-0 bg-primary text-white p-2 sm:p-2.5 flex flex-col">
            {/* Logo */}
            <div className="flex items-center gap-1.5 mb-3 px-0.5">
              <div className="w-5 h-5 rounded-md bg-accent flex items-center justify-center text-primary font-bold text-[9px] shrink-0">
                B
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold truncate">Biz Grow</span>
            </div>

            {/* Kirana Store pill */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg px-2 py-1.5 mb-1.5 flex items-center gap-1.5">
              <ShoppingBag className="w-3 h-3 shrink-0" />
              <span className="text-[8px] sm:text-[9px] font-semibold truncate">Kirana Store</span>
            </div>

            {/* Pro Plan badge */}
            <div className="bg-white/10 border border-white/10 rounded-lg px-2 py-1.5 mb-3 flex items-center gap-1.5">
              <Crown className="w-3 h-3 text-amber-300 shrink-0" />
              <span className="text-[8px] sm:text-[9px] font-medium text-amber-200 truncate">Pro Plan</span>
            </div>

            {/* Nav items */}
            <div className="space-y-0.5 flex-1">
              {sidebarNavItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[8.5px] sm:text-[10.5px] font-medium transition-colors ${
                    item.active
                      ? "bg-accent text-primary shadow-sm font-semibold"
                      : item.badge
                      ? "bg-white/10 text-white"
                      : "text-white/75"
                  }`}
                >
                  <item.icon className="w-3 h-3 shrink-0" />
                  <span className="truncate flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-[6.5px] font-bold bg-orange-500 text-white px-1 py-0.5 rounded-full shrink-0">
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Main Content */}
          <div className="flex-1 min-w-0 bg-slate-50 p-2.5 sm:p-3.5 space-y-2.5 sm:space-y-3">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 p-2.5 sm:p-3.5">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl translate-x-1/3 -translate-y-1/3" />
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-1">
                  <ShoppingBag className="w-3 h-3 text-white/90" />
                  <span className="text-white/90 text-[9px] sm:text-[10px] font-medium">Kirana Store</span>
                </div>
                <p className="text-white/80 text-[9px] sm:text-[10px] mb-0.5">Good morning 👋</p>
                <h3 className="text-white font-bold text-xs sm:text-sm leading-tight mb-0.5">
                  Welcome Utkarsh!
                </h3>
                <p className="text-white/80 text-[8px] sm:text-[9.5px] leading-snug">
                  Here's what's happening with your store today.
                </p>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              {statCards.map((stat) => (
                <div key={stat.label} className="bg-white rounded-lg border border-slate-200 p-1.5 sm:p-2">
                  <div className="flex items-start justify-between gap-1">
                    <div className="min-w-0">
                      <p className="text-[7.5px] sm:text-[9px] text-slate-500 truncate">{stat.label}</p>
                      <p className="text-[11px] sm:text-sm font-bold text-slate-900">{stat.value}</p>
                      <p className="text-[7px] sm:text-[8px] text-emerald-600 font-medium truncate">{stat.change}</p>
                    </div>
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg ${stat.color} flex items-center justify-center shrink-0`}>
                      <stat.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-slate-200 p-1.5 sm:p-2.5">
              <p className="text-[8px] sm:text-[9.5px] font-semibold text-slate-700 mb-1.5">Quick Actions</p>
              <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
                {quickActions.map((action) => (
                  <div
                    key={action.label}
                    className="rounded-md sm:rounded-lg border border-slate-200 p-1 sm:p-1.5 flex flex-col items-center text-center gap-0.5 sm:gap-1"
                  >
                    <div className={`w-4 h-4 sm:w-6 sm:h-6 rounded sm:rounded-md ${action.color} flex items-center justify-center text-white shrink-0`}>
                      <action.icon className="w-2 h-2 sm:w-3 sm:h-3" />
                    </div>
                    <span className="block text-[6px] sm:text-[6.5px] font-medium text-slate-700 leading-tight truncate w-full">
                      {action.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone Preview Mockup (Overlapping right bottom) */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute -bottom-8 -right-3 sm:-bottom-10 sm:-right-6 w-[190px] sm:w-[220px] rounded-[30px] p-2 bg-slate-950 border-2 border-slate-700/80 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] z-20"
      >
        {/* Dynamic Island / Speaker Pill */}
        <div className="w-16 h-3.5 bg-slate-900 rounded-full mx-auto mb-1.5 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-slate-950 border border-slate-800" />
        </div>

        {/* Phone Screen Container */}
        <div className="bg-slate-900 rounded-[22px] overflow-hidden border border-white/10 text-slate-100 flex flex-col justify-between h-[300px] sm:h-[340px] text-[10px]">
          {/* Storefront Mobile Header */}
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-2.5 border-b border-white/10">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-accent text-slate-950 font-bold text-[9px] flex items-center justify-center">
                  SS
                </div>
                <div>
                  <p className="font-bold text-white text-[11px] leading-tight">Sharma Store</p>
                  <p className="text-[9px] text-slate-400">Delhi • ⭐ 4.9</p>
                </div>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                Open
              </span>
            </div>

            {/* Store Search Input */}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                readOnly
                className="w-full bg-slate-950/80 border border-white/10 rounded-md pl-6 pr-2 py-1 text-[9px] text-slate-300 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Customer Product Feed */}
          <div className="p-2 space-y-1.5 overflow-y-auto flex-1 scrollbar-hide">
            {[
              { name: "Royal Basmati Rice 1kg", price: "₹110", old: "₹130", icon: Sparkles, color: "text-emerald-400 bg-emerald-500/20" },
              { name: "Sunrise Cooking Oil 1L", price: "₹165", old: "₹185", icon: Droplets, color: "text-amber-400 bg-amber-500/20" },
              { name: "Fresh Farm Biscuits", price: "₹35", old: "₹40", icon: Cookie, color: "text-rose-400 bg-rose-500/20" },
            ].map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div key={idx} className="bg-slate-800/80 border border-white/5 rounded-lg p-1.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className={`w-6 h-6 rounded-md ${item.color} flex items-center justify-center shrink-0`}>
                      <ItemIcon className="w-3 h-3" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-white truncate text-[10px] leading-tight">{item.name}</p>
                      <p className="text-amber-300 font-bold text-[10px]">
                        {item.price} <span className="text-slate-400 font-normal line-through text-[8px]">{item.old}</span>
                      </p>
                    </div>
                  </div>
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[9px] px-2 py-0.5 rounded shadow shrink-0">
                    + ADD
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom WhatsApp Order Checkout Bar */}
          <div className="p-2 bg-slate-950 border-t border-white/10">
            <div className="bg-emerald-600 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-white shadow-lg cursor-pointer">
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span className="font-bold text-[10px]">2 Items • ₹275</span>
              </div>
              <span className="font-bold text-[9px] bg-white text-emerald-700 px-1.5 py-0.5 rounded">
                Order ➔
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CatalogueHeroVisual;
