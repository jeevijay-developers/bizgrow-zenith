import { BarChart3, IndianRupee, ShoppingCart, Target, Users } from "lucide-react";

const statCards = [
  { icon: IndianRupee, label: "Total Revenue", value: "₹2,45,678", change: "+23%" },
  { icon: ShoppingCart, label: "Total Orders", value: "1,234", change: "+18%" },
  { icon: Target, label: "Avg Order Value", value: "₹199", change: "+8%" },
  { icon: Users, label: "Customers", value: "856", change: "+12%" },
];

const salesBars = [42, 55, 48, 70, 62, 90, 78];

const AnalyticsHeroVisual = () => (
  <div className="rounded-2xl border border-white/10 bg-white shadow-2xl overflow-hidden">
    {/* Header bar */}
    <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-border bg-muted/40">
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <BarChart3 className="w-3.5 h-3.5 text-primary" />
        </div>
        <span className="text-sm font-semibold text-foreground truncate">Analytics</span>
      </div>
      <span className="text-[11px] text-muted-foreground flex-shrink-0">All Time</span>
    </div>

    <div className="p-4 sm:p-5 space-y-3.5">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-2.5">
        {statCards.map((metric) => (
          <div key={metric.label} className="min-w-0 rounded-xl border border-border bg-card p-3">
            <div className="flex items-center gap-1.5 mb-1.5 min-w-0">
              <metric.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span className="text-[10px] text-muted-foreground truncate">{metric.label}</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
              <span className="text-sm sm:text-base font-bold text-foreground leading-none">{metric.value}</span>
              <span className="text-[10px] font-medium text-success leading-none">{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sales overview */}
      <div className="rounded-xl border border-border bg-card p-3.5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-foreground">Sales Overview</span>
          <span className="text-[10px] font-medium text-success">+23% this month</span>
        </div>
        <div className="flex items-end gap-1.5 h-16">
          {salesBars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-primary to-accent"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* Order sources + top category */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-border bg-card p-3 flex flex-col items-center justify-center">
          <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="hsl(var(--success))"
              strokeWidth="4"
              strokeDasharray="68 32"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[10px] text-muted-foreground mt-1.5 text-center leading-tight">Online vs Walk-in</span>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 flex flex-col justify-center min-w-0">
          <p className="text-[10px] text-muted-foreground mb-1">Top Category</p>
          <p className="text-sm font-bold text-foreground truncate">Groceries</p>
          <p className="text-[10px] text-success font-medium">42% of sales</p>
        </div>
      </div>
    </div>
  </div>
);

export default AnalyticsHeroVisual;
