import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getCategoryConfig, CategoryConfig } from "@/config/categoryConfig";

interface WelcomeBannerProps {
  storeName: string;
  isNewStore?: boolean;
  storeCategory?: string | null;
}

export function WelcomeBanner({ storeName, isNewStore = false, storeCategory }: WelcomeBannerProps) {
  const hours = new Date().getHours();
  const greeting = hours < 12 ? "Good morning" : hours < 17 ? "Good afternoon" : "Good evening";
  
  const categoryConfig = getCategoryConfig(storeCategory);
  const CategoryIcon = categoryConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${categoryConfig.theme.gradient} p-6 md:p-8`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        {/* Category icon watermark */}
        <div className="absolute right-4 md:right-8 bottom-4 md:bottom-8 opacity-10">
          <CategoryIcon className="w-32 h-32 md:w-48 md:h-48 text-white" strokeWidth={1} />
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <CategoryIcon className="w-4 h-4 text-white" />
            </div>
            <p className="text-white/80 text-sm font-medium">{categoryConfig.label}</p>
          </div>
          <p className="text-white/70 text-sm">{greeting} 👋</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Welcome to {storeName}!
          </h1>
          {isNewStore ? (
            <p className="text-white/80 max-w-md">
              {categoryConfig.welcomeMessage} Start by adding {categoryConfig.terminology.productPlural}.
            </p>
          ) : (
            <p className="text-white/80 max-w-md">
              Here's what's happening with your store today.
            </p>
          )}
        </div>

        {isNewStore && (
          <Link to="/dashboard/ai-upload">
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-white/90 gap-2 shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              Add {categoryConfig.terminology.productPlural.charAt(0).toUpperCase() + categoryConfig.terminology.productPlural.slice(1)} with AI
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
