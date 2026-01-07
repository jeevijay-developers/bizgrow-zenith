import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface WelcomeBannerProps {
  storeName: string;
  isNewStore?: boolean;
}

export function WelcomeBanner({ storeName, isNewStore = false }: WelcomeBannerProps) {
  const hours = new Date().getHours();
  const greeting = hours < 12 ? "Good morning" : hours < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-purple-light p-6 md:p-8"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-light/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <p className="text-primary-foreground/70 text-sm">{greeting} 👋</p>
          <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">
            Welcome to {storeName}!
          </h1>
          {isNewStore ? (
            <p className="text-primary-foreground/80 max-w-md">
              Your store is ready! Start by adding products to your catalogue.
            </p>
          ) : (
            <p className="text-primary-foreground/80 max-w-md">
              Here's what's happening with your store today.
            </p>
          )}
        </div>

        {isNewStore && (
          <Link to="/dashboard/ai-upload">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 gap-2 shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              Add Products with AI
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
