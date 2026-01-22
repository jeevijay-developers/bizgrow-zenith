import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { getCategoryConfig } from "@/config/categoryConfig";

interface CategoryTipsProps {
  storeCategory?: string | null;
}

export function CategoryTips({ storeCategory }: CategoryTipsProps) {
  const categoryConfig = getCategoryConfig(storeCategory);
  const tips = categoryConfig.tips;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-card rounded-xl border border-border p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${categoryConfig.theme.gradient} flex items-center justify-center`}>
          <Lightbulb className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold">Tips for {categoryConfig.label}</h3>
          <p className="text-xs text-muted-foreground">Grow your business</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${categoryConfig.theme.gradient} flex items-center justify-center flex-shrink-0`}>
              <tip.icon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{tip.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{tip.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
