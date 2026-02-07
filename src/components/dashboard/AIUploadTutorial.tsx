import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, Upload, Sparkles, CheckCircle2, ArrowRight, 
  ArrowLeft, X, Wand2, Package, MousePointerClick, Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TutorialStep {
  icon: React.ElementType;
  title: string;
  description: string;
  tip?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    icon: Camera,
    title: "Snap or Upload",
    description: "Take a photo of your products or upload existing images. You can add multiple products at once!",
    tip: "Tip: Good lighting and clear backgrounds help AI detect products better."
  },
  {
    icon: Wand2,
    title: "AI Does the Magic",
    description: "Our AI automatically detects products, extracts names, prices, and categories. It even enhances your images!",
    tip: "Tip: Include price tags in photos for automatic price detection."
  },
  {
    icon: MousePointerClick,
    title: "Review & Edit",
    description: "Check the detected products, edit any details if needed, and choose between original or AI-enhanced images.",
    tip: "Tip: You can add custom categories if the defaults don't fit."
  },
  {
    icon: Package,
    title: "Add to Catalogue",
    description: "Select the products you want and add them to your store catalogue instantly. That's it!",
    tip: "Tip: AI also generates beautiful category images automatically."
  }
];

interface AIUploadTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const AIUploadTutorial = ({ isOpen, onClose, onComplete }: AIUploadTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = tutorialSteps[currentStep];
  const StepIcon = step.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Header with gradient */}
            <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-8 text-primary-foreground overflow-hidden">
              {/* Animated particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary-foreground/20 rounded-full"
                    initial={{ 
                      x: Math.random() * 400, 
                      y: Math.random() * 150,
                      scale: 0 
                    }}
                    animate={{ 
                      y: [null, -50],
                      scale: [0, 1, 0],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      delay: i * 0.5,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  />
                ))}
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">
                  Step {currentStep + 1} of {tutorialSteps.length}
                </span>
              </div>

              {/* Icon and title */}
              <motion.div
                key={currentStep}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                  <StepIcon className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold">{step.title}</h2>
              </motion.div>

              {/* Progress dots */}
              <div className="flex gap-2 mt-6">
                {tutorialSteps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index <= currentStep 
                        ? 'bg-primary-foreground w-8' 
                        : 'bg-primary-foreground/30 w-4'
                    }`}
                    animate={{ 
                      scale: index === currentStep ? [1, 1.1, 1] : 1 
                    }}
                    transition={{ duration: 0.5, repeat: index === currentStep ? Infinity : 0, repeatDelay: 1 }}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <p className="text-foreground/80 text-lg leading-relaxed">
                    {step.description}
                  </p>
                  
                  {step.tip && (
                    <motion.div 
                      className="bg-muted/50 rounded-lg p-4 border border-border"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-sm text-muted-foreground flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        {step.tip}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
                <div>
                  {currentStep > 0 ? (
                    <Button 
                      variant="ghost" 
                      onClick={handlePrev}
                      className="gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost" 
                      onClick={handleSkip}
                      className="text-muted-foreground"
                    >
                      Skip tutorial
                    </Button>
                  )}
                </div>

                <Button 
                  onClick={handleNext}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  {currentStep === tutorialSteps.length - 1 ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Get Started
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIUploadTutorial;
