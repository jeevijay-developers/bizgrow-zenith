import { motion } from "framer-motion";
import { 
  Package, Zap, Star, Shield, Truck, Clock,
  Users, Award, ThumbsUp, CheckCircle2
} from "lucide-react";

interface QuickStatsBarProps {
  productCount: number;
  hasDelivery?: boolean;
  className?: string;
}

const QuickStatsBar = ({ 
  productCount, 
  hasDelivery = true,
  className = ""
}: QuickStatsBarProps) => {
  const stats = [
    { 
      icon: Package, 
      label: `${productCount}+ Products`, 
      color: "from-emerald-500 to-teal-500", 
      bg: "from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500"
    },
    { 
      icon: Shield, 
      label: "Verified Store", 
      color: "from-blue-500 to-indigo-500", 
      bg: "from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10",
      iconBg: "bg-gradient-to-br from-blue-500 to-indigo-500"
    },
    { 
      icon: Star, 
      label: "4.8 ★ Rated", 
      color: "from-amber-500 to-orange-500", 
      bg: "from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10",
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-500"
    },
    ...(hasDelivery ? [{ 
      icon: Truck, 
      label: "Fast Delivery", 
      color: "from-purple-500 to-pink-500", 
      bg: "from-purple-50 to-pink-50 dark:from-purple-500/10 dark:to-pink-500/10",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500"
    }] : []),
    { 
      icon: Clock, 
      label: "Quick Response", 
      color: "from-cyan-500 to-sky-500", 
      bg: "from-cyan-50 to-sky-50 dark:from-cyan-500/10 dark:to-sky-500/10",
      iconBg: "bg-gradient-to-br from-cyan-500 to-sky-500"
    },
    { 
      icon: ThumbsUp, 
      label: "100+ Happy Customers", 
      color: "from-rose-500 to-red-500", 
      bg: "from-rose-50 to-red-50 dark:from-rose-500/10 dark:to-red-500/10",
      iconBg: "bg-gradient-to-br from-rose-500 to-red-500"
    },
  ];

  return (
    <div className={`flex gap-3 overflow-x-auto pb-2 scrollbar-hide ${className}`}>
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className={`flex items-center gap-3 bg-gradient-to-r ${stat.bg} px-4 py-3 rounded-2xl flex-shrink-0 border border-border/50 shadow-sm hover:shadow-md transition-shadow cursor-default`}
        >
          <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center shadow-lg`}>
            <stat.icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-semibold text-foreground whitespace-nowrap">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickStatsBar;
