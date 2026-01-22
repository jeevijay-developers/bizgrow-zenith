import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getCategoryConfig, CategoryQuickAction } from "@/config/categoryConfig";

interface QuickActionsProps {
  storeCategory?: string | null;
}

export function QuickActions({ storeCategory }: QuickActionsProps) {
  const categoryConfig = getCategoryConfig(storeCategory);
  const actions = categoryConfig.quickActions;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="bg-card rounded-xl border border-border p-6"
    >
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <categoryConfig.icon className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Quick Actions</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Common tasks for your {categoryConfig.label.toLowerCase()}
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((action, index) => (
          <Link key={action.title} to={action.href}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-5 h-5" />
              </div>
              <p className="font-medium text-sm">{action.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{action.description}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
