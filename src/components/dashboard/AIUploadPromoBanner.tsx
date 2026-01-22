import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Camera, Zap, ArrowRight, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIUploadPromoBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary via-primary/90 to-purple-600 p-4 sm:p-5"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-primary-foreground/5"
            style={{
              left: `${20 + i * 15}%`,
              top: `${-20 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Animated icon */}
          <motion.div
            className="hidden sm:flex w-14 h-14 rounded-xl bg-primary-foreground/20 backdrop-blur-sm items-center justify-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Camera className="w-7 h-7 text-primary-foreground" />
          </motion.div>

          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
              <motion.div
                className="flex items-center gap-1.5 bg-primary-foreground/20 px-2 py-0.5 rounded-full text-xs font-medium text-primary-foreground"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-3 h-3" />
                10x Faster
              </motion.div>
              <motion.div
                className="flex items-center gap-1.5 bg-primary-foreground/20 px-2 py-0.5 rounded-full text-xs font-medium text-primary-foreground"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Wand2 className="w-3 h-3" />
                Auto Enhance
              </motion.div>
            </div>
            <h3 className="text-lg font-bold text-primary-foreground">
              Try AI Product Upload
            </h3>
            <p className="text-sm text-primary-foreground/80">
              Snap a photo → AI extracts details → Done! The fastest way to add products.
            </p>
          </div>
        </div>

        <Link to="/dashboard/ai-upload">
          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2 shadow-lg group"
          >
            <Zap className="w-4 h-4" />
            Try AI Upload
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Animated sparkles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${10 + i * 25}%`,
            top: `${20 + (i % 2) * 50}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          <Sparkles className="w-4 h-4 text-primary-foreground/40" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AIUploadPromoBanner;
