import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone, Zap, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show prompt after a delay
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem("pwa-prompt-dismissed", "true");
  };

  // Don't show if already dismissed this session
  useEffect(() => {
    if (sessionStorage.getItem("pwa-prompt-dismissed")) {
      setShowPrompt(false);
    }
  }, []);

  if (isInstalled || !showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-20 left-4 right-4 z-50 lg:left-auto lg:right-6 lg:bottom-6 lg:w-80"
      >
        <div className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-4 shadow-2xl border border-white/10">
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>

          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-6 h-6 text-accent" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-sm">
                Install BizGrow App
              </h3>
              <p className="text-xs text-white/70 mt-0.5">
                Get quick access from your home screen
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 text-xs text-white/60">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" /> Faster
            </span>
            <span className="flex items-center gap-1">
              <Bell className="w-3 h-3" /> Notifications
            </span>
            <span className="flex items-center gap-1">
              <Download className="w-3 h-3" /> Offline
            </span>
          </div>

          <Button
            onClick={handleInstall}
            className="w-full mt-3 bg-accent hover:bg-accent/90 text-black font-semibold"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Install Now
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
