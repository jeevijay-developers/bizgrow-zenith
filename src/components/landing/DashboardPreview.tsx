import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Bell,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Camera,
  MessageCircle
} from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { RippleButton } from "@/components/ui/ripple-button";
import { Link } from "react-router-dom";

const DashboardPreview = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-5 py-2 mb-6 border border-primary/20">
            <LayoutDashboard className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-bold">Powerful Dashboard</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-display leading-tight">
            Everything You Need,
            <span className="text-primary block">One Beautiful Dashboard</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Track sales, manage orders, monitor inventory — all from a dashboard 
            designed for busy Indian retailers. Simple, fast, and powerful.
          </p>
        </AnimatedSection>

        {/* Main Dashboard Mockup */}
        <AnimatedSection className="max-w-6xl mx-auto relative" delay={150}>
          {/* Glow effect behind dashboard */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 blur-3xl scale-110 opacity-50" />
          
          <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
            {/* Dashboard Header */}
            <div className="bg-gradient-to-r from-primary via-primary to-primary/95 px-6 md:px-8 py-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-white font-bold text-base">Sharma General Store</p>
                  <p className="text-white/70 text-sm">Dashboard • Premium Plan</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="relative w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors">
                  <Bell className="w-5 h-5 text-white" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full text-xs font-bold flex items-center justify-center text-primary animate-pulse">3</span>
                </button>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-amber-400 flex items-center justify-center text-primary font-bold shadow-lg">
                  RS
                </div>
              </div>
            </div>

            <div className="flex">
              {/* Enhanced Sidebar */}
              <div className="hidden md:flex flex-col w-56 bg-gray-50/80 border-r border-gray-100 p-5">
                <div className="space-y-2 flex-1">
                  {[
                    { icon: LayoutDashboard, label: "Dashboard", active: true },
                    { icon: Package, label: "Products", badge: "120", badgeColor: "bg-primary/10 text-primary" },
                    { icon: ShoppingCart, label: "Orders", badge: "5", badgeColor: "bg-green-100 text-green-700" },
                    { icon: Camera, label: "AI Upload", badge: "NEW", badgeColor: "bg-accent text-primary" },
                    { icon: Users, label: "Customers" },
                    { icon: BarChart3, label: "Analytics" },
                    { icon: MessageCircle, label: "WhatsApp" },
                  ].map((item) => (
                    <button 
                      key={item.label}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        item.active 
                          ? "bg-primary text-white shadow-lg shadow-primary/20" 
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          item.active ? "bg-white/20 text-white" : item.badgeColor
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Upgrade card in sidebar */}
                <div className="mt-4 p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border border-primary/20">
                  <Sparkles className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm font-bold text-primary mb-1">Go Premium</p>
                  <p className="text-xs text-muted-foreground">Unlock AI features</p>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-5 md:p-8 space-y-6 bg-gradient-to-br from-gray-50/50 to-white">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-5 md:p-6 text-white relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-x-10 -translate-y-10" />
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <p className="text-white/80 text-sm mb-1">Good morning, Rajesh! 👋</p>
                      <p className="text-xl md:text-2xl font-bold">Your store is doing great today</p>
                    </div>
                    <button className="bg-accent hover:bg-accent/90 text-primary font-bold px-5 py-2.5 rounded-xl text-sm transition-colors inline-flex items-center gap-2 whitespace-nowrap">
                      <Camera className="w-4 h-4" />
                      Add Products
                    </button>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Today's Sales", value: "₹12,450", change: "+23%", up: true, icon: TrendingUp, color: "from-green-500 to-emerald-600" },
                    { label: "Total Orders", value: "24", change: "+5 new", up: true, icon: ShoppingCart, color: "from-blue-500 to-cyan-600" },
                    { label: "Products", value: "120", change: "3 low stock", up: false, icon: Package, color: "from-primary to-purple-600" },
                    { label: "Customers", value: "89", change: "+12 today", up: true, icon: Users, color: "from-amber-500 to-orange-600" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-4 md:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className={`text-xs flex items-center gap-0.5 font-bold px-2 py-1 rounded-full ${
                          stat.up ? "text-green-700 bg-green-100" : "text-amber-700 bg-amber-100"
                        }`}>
                          {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Recent Orders</h4>
                      <p className="text-sm text-gray-500">Real-time order updates</p>
                    </div>
                    <button className="text-sm text-primary font-bold hover:underline flex items-center gap-1">
                      View All <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { id: "#1234", customer: "Priya Sharma", items: 3, amount: "₹450", time: "2 min ago", status: "New", avatar: "PS" },
                      { id: "#1233", customer: "Rahul Verma", items: 5, amount: "₹890", time: "15 min ago", status: "Preparing", avatar: "RV" },
                      { id: "#1232", customer: "Anita Gupta", items: 2, amount: "₹180", time: "1 hr ago", status: "Delivered", avatar: "AG" },
                    ].map((order) => (
                      <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 -mx-2 px-2 rounded-lg transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                            {order.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{order.customer}</p>
                            <p className="text-sm text-gray-500">{order.items} items • {order.id}</p>
                          </div>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="font-bold text-gray-900">{order.amount}</p>
                          <div className="flex items-center gap-1 justify-end text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">{order.time}</span>
                          </div>
                        </div>
                        <span className={`text-xs px-3 py-1.5 rounded-full font-bold ${
                          order.status === "New" ? "bg-green-100 text-green-700" :
                          order.status === "Preparing" ? "bg-amber-100 text-amber-700" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {order.status === "New" && "● "}
                          {order.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative shadows */}
          <div className="h-6 bg-gray-200/40 rounded-b-3xl mx-6 -mt-1" />
          <div className="h-6 bg-gray-200/20 rounded-b-3xl mx-12 -mt-1" />
        </AnimatedSection>

        {/* CTA below dashboard */}
        <AnimatedSection className="text-center mt-16" delay={300}>
          <p className="text-muted-foreground mb-6 text-lg">
            Join <span className="text-primary font-bold">1,000+ retailers</span> already using this dashboard
          </p>
          <Link to="/join">
            <RippleButton size="xl" variant="glow" className="font-bold group">
              Get Your Dashboard Now — It's Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </RippleButton>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default DashboardPreview;
