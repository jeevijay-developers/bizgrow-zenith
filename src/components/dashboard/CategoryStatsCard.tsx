import { motion } from "framer-motion";
import { getCategoryConfig } from "@/config/categoryConfig";
import { LucideIcon } from "lucide-react";

interface CategoryStatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  statType: "revenue" | "orders" | "products" | "customers";
  storeCategory?: string | null;
  delay?: number;
}

export function CategoryStatsCard({
  title,
  value,
  change,
  changeType,
  statType,
  storeCategory,
  delay = 0,
}: CategoryStatsCardProps) {
  const categoryConfig = getCategoryConfig(storeCategory);
  const Icon = categoryConfig.dashboardIcons[statType];
  
  // Get dynamic label based on category terminology
  const getLabel = () => {
    switch (statType) {
      case "products":
        return categoryConfig.terminology.productPlural.charAt(0).toUpperCase() + 
               categoryConfig.terminology.productPlural.slice(1);
      case "customers":
        return categoryConfig.terminology.customerPlural.charAt(0).toUpperCase() + 
               categoryConfig.terminology.customerPlural.slice(1);
      case "orders":
        return categoryConfig.terminology.orderPlural.charAt(0).toUpperCase() + 
               categoryConfig.terminology.orderPlural.slice(1);
      default:
        return title;
    }
  };

  const iconColors: Record<string, string> = {
    revenue: "bg-green-500/10 text-green-600",
    orders: "bg-blue-500/10 text-blue-600",
    products: `bg-gradient-to-br ${categoryConfig.theme.gradient} text-white`,
    customers: "bg-orange-500/10 text-orange-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">
            {statType === "products" || statType === "customers" || statType === "orders" 
              ? getLabel() 
              : title}
          </p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          <p className={`text-xs ${
            changeType === "positive" ? "text-green-600" :
            changeType === "negative" ? "text-red-600" :
            "text-muted-foreground"
          }`}>
            {change}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl ${iconColors[statType]} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}
