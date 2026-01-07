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
  Clock
} from "lucide-react";

const DashboardPreview = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(57,0,78,0.03)_0%,_transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
            <LayoutDashboard className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold">Seller Dashboard</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display">
            Manage Everything
            <span className="text-primary block">From One Place</span>
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground">
            A powerful yet simple dashboard designed for busy retailers. 
            Track orders, manage inventory, and grow your business.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Dashboard Header */}
            <div className="bg-primary px-4 md:px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BG</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-white font-semibold text-sm">Sharma General Store</p>
                  <p className="text-white/70 text-xs">Dashboard</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="relative w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full text-xs font-bold flex items-center justify-center text-accent-foreground">3</span>
                </button>
                <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
                  RS
                </div>
              </div>
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div className="hidden md:block w-48 bg-gray-50 border-r border-gray-100 p-4 space-y-1">
                {[
                  { icon: LayoutDashboard, label: "Dashboard", active: true },
                  { icon: Package, label: "Products", badge: "120" },
                  { icon: ShoppingCart, label: "Orders", badge: "5" },
                  { icon: Users, label: "Customers" },
                  { icon: BarChart3, label: "Analytics" },
                ].map((item) => (
                  <button 
                    key={item.label}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      item.active ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        item.active ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Main Content */}
              <div className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6">
                {/* Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {[
                    { label: "Today's Sales", value: "₹12,450", change: "+23%", up: true, icon: TrendingUp },
                    { label: "Total Orders", value: "24", change: "+5", up: true, icon: ShoppingCart },
                    { label: "Products", value: "120", change: "3 low stock", up: false, icon: Package },
                    { label: "Customers", value: "89", change: "+12 new", up: true, icon: Users },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-gray-50 rounded-xl p-3 md:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <stat.icon className="w-4 h-4 text-primary" />
                        </div>
                        <span className={`text-xs flex items-center gap-0.5 ${stat.up ? "text-green-600" : "text-amber-600"}`}>
                          {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-xl md:text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent Orders */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Recent Orders</h4>
                    <button className="text-xs text-primary font-medium">View All →</button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { id: "#1234", customer: "Priya Sharma", items: 3, amount: "₹450", time: "2 min ago", status: "New" },
                      { id: "#1233", customer: "Rahul Verma", items: 5, amount: "₹890", time: "15 min ago", status: "Preparing" },
                      { id: "#1232", customer: "Anita Gupta", items: 2, amount: "₹180", time: "1 hr ago", status: "Delivered" },
                    ].map((order) => (
                      <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
                            {order.customer.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                            <p className="text-xs text-gray-500">{order.items} items • {order.id}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">{order.amount}</p>
                          <div className="flex items-center gap-1 justify-end">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{order.time}</span>
                          </div>
                        </div>
                        <span className={`hidden sm:inline-block text-xs px-2 py-1 rounded-full font-medium ${
                          order.status === "New" ? "bg-green-100 text-green-700" :
                          order.status === "Preparing" ? "bg-amber-100 text-amber-700" :
                          "bg-gray-100 text-gray-600"
                        }`}>
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
          <div className="h-4 bg-gray-200/50 rounded-b-2xl mx-4" />
          <div className="h-4 bg-gray-200/30 rounded-b-2xl mx-8" />
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
