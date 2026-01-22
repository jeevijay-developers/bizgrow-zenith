import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, Sparkles, Wand2, Brain, Scan, ImageIcon, 
  CheckCircle2, Loader2, Zap
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface AIProcessingLoaderProps {
  state: "uploading" | "processing" | "enhancing";
  uploadProgress: number;
  uploadedImages: string[];
}

const processingSteps = [
  { id: "upload", label: "Uploading images", icon: Upload },
  { id: "scan", label: "Scanning products", icon: Scan },
  { id: "detect", label: "AI detecting items", icon: Brain },
  { id: "extract", label: "Extracting details", icon: Sparkles },
  { id: "enhance", label: "Enhancing images", icon: Wand2 },
];

const AIProcessingLoader = ({ state, uploadProgress, uploadedImages }: AIProcessingLoaderProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [pulseIndex, setPulseIndex] = useState(0);

  // Determine active step based on state
  useEffect(() => {
    if (state === "uploading") {
      setCurrentStep(0);
      setProgressValue(uploadProgress * 0.2); // 0-20%
    } else if (state === "processing") {
      // Cycle through steps 1-3
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          const next = prev < 3 ? prev + 1 : 1;
          return next;
        });
      }, 2000);
      
      // Animate progress 20-70%
      const progressInterval = setInterval(() => {
        setProgressValue(prev => Math.min(prev + 2, 70));
      }, 200);
      
      return () => {
        clearInterval(interval);
        clearInterval(progressInterval);
      };
    } else if (state === "enhancing") {
      setCurrentStep(4);
      // Animate progress 70-95%
      const progressInterval = setInterval(() => {
        setProgressValue(prev => Math.min(prev + 1.5, 95));
      }, 150);
      
      return () => clearInterval(progressInterval);
    }
  }, [state, uploadProgress]);

  // Pulse animation for scanning effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex(prev => (prev + 1) % 4);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const getStatusText = () => {
    switch (state) {
      case "uploading":
        return "Preparing your images...";
      case "processing":
        return "AI is analyzing your products...";
      case "enhancing":
        return "Creating professional backgrounds...";
      default:
        return "Processing...";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-card rounded-2xl border border-border overflow-hidden"
    >
      {/* Animated gradient header */}
      <div className="relative h-32 sm:h-40 bg-gradient-to-br from-primary via-primary/80 to-purple-600 overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-foreground/20 rounded-full"
              initial={{
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                scale: 0
              }}
              animate={{ 
                y: [null, "-20%"],
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
        
        {/* Central animated icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="relative"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Outer ring */}
            <motion.div
              className="absolute -inset-6 rounded-full border-2 border-primary-foreground/20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -inset-10 rounded-full border border-primary-foreground/10"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            
            {/* Icon container */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={state}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  {state === "uploading" && (
                    <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground" />
                  )}
                  {state === "processing" && (
                    <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground" />
                  )}
                  {state === "enhancing" && (
                    <Wand2 className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Scanning line effect */}
        {state === "processing" && (
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-foreground to-transparent"
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Status text */}
        <div className="text-center">
          <motion.h3 
            className="text-lg sm:text-xl font-semibold mb-1"
            key={state}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {getStatusText()}
          </motion.h3>
          <p className="text-sm text-muted-foreground">
            This usually takes 5-10 seconds
          </p>
        </div>

        {/* Preview images with scanning effect */}
        {uploadedImages.length > 0 && (
          <div className="flex justify-center gap-3 flex-wrap">
            {uploadedImages.slice(0, 4).map((url, idx) => (
              <motion.div
                key={idx}
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <img 
                  src={url} 
                  alt={`Upload ${idx + 1}`}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-primary/30"
                />
                {/* Scanning overlay */}
                {state === "processing" && (
                  <motion.div
                    className="absolute inset-0 rounded-xl overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: pulseIndex === idx ? 1 : 0 }}
                  >
                    <div className="absolute inset-0 bg-primary/20" />
                    <motion.div
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                      animate={{ top: ["0%", "100%"] }}
                      transition={{ duration: 0.8, ease: "linear" }}
                    />
                  </motion.div>
                )}
                {/* Completed checkmark for enhancing */}
                {state === "enhancing" && idx < pulseIndex && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                  </motion.div>
                )}
              </motion.div>
            ))}
            {uploadedImages.length > 4 && (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-muted flex items-center justify-center text-sm font-medium border-2 border-dashed border-border">
                +{uploadedImages.length - 4}
              </div>
            )}
          </div>
        )}

        {/* Steps indicator */}
        <div className="space-y-3">
          {processingSteps.map((step, idx) => {
            const isActive = currentStep === idx;
            const isCompleted = currentStep > idx;
            const StepIcon = step.icon;
            
            return (
              <motion.div
                key={step.id}
                className={`flex items-center gap-3 p-2.5 rounded-lg transition-all ${
                  isActive 
                    ? "bg-primary/10 border border-primary/30" 
                    : isCompleted 
                      ? "bg-green-500/10" 
                      : "opacity-50"
                }`}
                animate={isActive ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : isCompleted 
                      ? "bg-emerald-500 text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isActive ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <StepIcon className="w-4 h-4" />
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  isActive ? "text-primary" : isCompleted ? "text-emerald-600" : "text-muted-foreground"
                }`}>
                  {step.label}
                </span>
                {isActive && (
                  <div className="ml-auto flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progressValue)}%</span>
          </div>
          <div className="relative">
            <Progress value={progressValue} className="h-2" />
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/30 to-transparent rounded-full"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

        {/* Fun fact */}
        <motion.div 
          className="bg-muted/50 rounded-lg p-3 flex items-start gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Zap className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Did you know?</span> Our AI can detect over 
            1000+ product types and automatically categorize them for your store.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AIProcessingLoader;
