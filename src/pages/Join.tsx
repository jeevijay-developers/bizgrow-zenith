/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiSparkles } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, ArrowRight, Check, Store, MapPin, Building2, Truck, CreditCard,
  Phone, User, MessageCircle, Sparkles, Shield, Clock, Zap, AlertCircle, Loader2, Mail, Lock,
  ChevronRight, BadgeCheck, Rocket, Camera, BarChart3, Globe, Bell, Star, PartyPopper
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateStep, type JoinFormData } from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import logoDarkBg from "@/assets/logo-dark-bg.png";

// AI-generated category images
import kiranaImg from "@/assets/categories-ai/kirana.png";
import bakeryImg from "@/assets/categories-ai/bakery.png";
import dairyImg from "@/assets/categories-ai/dairy.png";
import clothingImg from "@/assets/categories-ai/clothing.png";
import cosmeticsImg from "@/assets/categories-ai/cosmetics.png";
import electronicsImg from "@/assets/categories-ai/electronics.png";
import fruitsVegetablesImg from "@/assets/categories-ai/fruits-vegetables.png";
import electricalImg from "@/assets/categories-ai/electrical.png";
import pharmacyImg from "@/assets/categories-ai/pharmacy.png";
import stationeryImg from "@/assets/categories-ai/stationery.png";
import hardwareImg from "@/assets/categories-ai/hardware.png";
import otherImg from "@/assets/categories-ai/other.png";

const storeCategories = [
  { id: "kirana", label: "Kirana Store", image: kiranaImg, desc: "General & grocery" },
  { id: "bakery", label: "Bakery", image: bakeryImg, desc: "Fresh baked goods" },
  { id: "dairy", label: "Dairy Shop", image: dairyImg, desc: "Milk & dairy" },
  { id: "clothing", label: "Clothing", image: clothingImg, desc: "Fashion & apparel" },
  { id: "cosmetic", label: "Cosmetics", image: cosmeticsImg, desc: "Beauty & skincare" },
  { id: "mobile", label: "Electronics", image: electronicsImg, desc: "Gadgets & more" },
  { id: "fruits", label: "Fruits & Veggies", image: fruitsVegetablesImg, desc: "Fresh produce" },
  { id: "electrical", label: "Electrical", image: electricalImg, desc: "Electrical goods" },
  { id: "pharmacy", label: "Pharmacy", image: pharmacyImg, desc: "Health & medicine" },
  { id: "stationery", label: "Stationery", image: stationeryImg, desc: "Books & supplies" },
  { id: "hardware", label: "Hardware", image: hardwareImg, desc: "Tools & equipment" },
  { id: "other", label: "Other", image: otherImg, desc: "Other retail" },
];

const businessModes = [
  {
    id: "shop-only",
    title: "Shop Only",
    subtitle: "Takeaway / Walk-in",
    description: "Customers visit your shop and pick up orders",
    Icon: Store,
    features: ["Walk-in customers", "Counter billing", "In-store pickup"],
  },
  {
    id: "shop-delivery",
    title: "Shop + Delivery",
    subtitle: "Recommended",
    description: "Offer both in-store pickup and home delivery",
    Icon: Truck,
    features: ["Home delivery", "Order tracking", "Wider reach"],
    recommended: true,
  },
];

const plans = [
  { 
    id: "starter", 
    name: "Starter", 
    price: "₹499", 
    period: "/month",
    features: ["Up to 100 products", "Basic catalogue", "WhatsApp orders", "Email support"],
    Icon: Zap,
  },
  { 
    id: "pro", 
    name: "Pro", 
    price: "₹999", 
    period: "/month",
    features: ["Unlimited products", "AI Photo Upload", "Analytics dashboard", "Priority support", "Custom domain"],
    popular: true,
    Icon: Sparkles,
  },
  { 
    id: "enterprise", 
    name: "Enterprise", 
    price: "Custom",
    period: "",
    features: ["Multi-store management", "API access", "Dedicated manager", "Custom integrations"],
    Icon: Shield,
  },
];

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal"
];

const steps = [
  { id: 1, title: "Business", Icon: Store },
  { id: 2, title: "Location", Icon: MapPin },
  { id: 3, title: "Category", Icon: Building2 },
  { id: 4, title: "Delivery", Icon: Truck },
  { id: 5, title: "Plan", Icon: CreditCard },
  { id: 6, title: "Account", Icon: User },
];

// Feature slides for the left panel carousel
const featureSlides = [
  {
    Icon: Camera,
    title: "AI-Powered Uploads",
    description: "Just snap a photo and our AI automatically extracts product details, pricing, and more.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    Icon: Globe,
    title: "Beautiful Storefront",
    description: "Get a professional online store that works on any device. No coding required.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    Icon: Bell,
    title: "WhatsApp Orders",
    description: "Receive instant order notifications on WhatsApp. Never miss a customer again.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    Icon: BarChart3,
    title: "Smart Analytics",
    description: "Track sales, bestsellers, and customer insights with our intuitive dashboard.",
    gradient: "from-orange-500 to-amber-500",
  },
];

const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-red-400 text-sm mt-1 flex items-center gap-1.5"
    >
      <AlertCircle className="w-3.5 h-3.5" />
      {message}
    </motion.p>
  );
};

const stepVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Feature Carousel Component
const FeatureCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featureSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = featureSlides[activeIndex];

  return (
    <div className="w-full">
      {/* Feature Card */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${currentSlide.gradient} flex items-center justify-center mb-4 shadow-lg`}>
              <currentSlide.Icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{currentSlide.title}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{currentSlide.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {featureSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === activeIndex 
                ? "w-8 h-2 bg-accent" 
                : "w-2 h-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Join = () => {
  const navigate = useNavigate();
  const { user, signUp } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = user ? 5 : 6;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState<any[]>([]);

  // Confetti celebration effect
  const triggerConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // Confetti from both sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FF6B35', '#7C3AED', '#10B981', '#F59E0B', '#EC4899'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FF6B35', '#7C3AED', '#10B981', '#F59E0B', '#EC4899'],
      });
    }, 250);
  }, []);

  const [formData, setFormData] = useState<Partial<JoinFormData> & { email?: string; password?: string }>({
    storeName: "",
    ownerName: "",
    mobile: "",
    whatsapp: "",
    sameAsWhatsapp: true,
    state: "",
    city: "",
    category: "",
    businessMode: "",
    plan: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchPlans = async () => {
      const { data } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true);
      if (data) setSubscriptionPlans(data);
    };
    fetchPlans();
  }, []);

  const updateForm = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateCurrentStep = () => {
    if (step === 6 && !user) {
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setErrors({ email: "Please enter a valid email" });
        return false;
      }
      if (!formData.password || formData.password.length < 6) {
        setErrors({ password: "Minimum 6 characters required" });
        return false;
      }
      return true;
    }
    
    const result = validateStep(step, formData);
    if (!result.success) {
      setErrors(result.errors);
      return false;
    }
    setErrors({});
    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (step === 5 && user) {
        handleSubmit();
      } else {
        setStep((prev) => Math.min(prev + 1, totalSteps));
      }
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  };

  const isStepValid = () => {
    if (step === 6) {
      return user || (formData.email && formData.password && formData.password.length >= 6);
    }
    return validateStep(step, formData).success;
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    setIsSubmitting(true);
    
    try {
      let userId = user?.id;
      
      if (!user && formData.email && formData.password) {
        const { error: signUpError } = await signUp(
          formData.email,
          formData.password,
          {
            full_name: formData.ownerName,
            phone: formData.mobile,
            whatsapp: formData.sameAsWhatsapp ? formData.mobile : formData.whatsapp,
          }
        );
        
        if (signUpError) {
          const msg = signUpError.message.toLowerCase();
          // If Supabase sent the email but reported an SMTP warning, treat it as a soft success
          if (msg.includes("confirmation email")) {
            toast.success("Confirmation email sent. Please check your inbox to finish signup.");
            setIsSubmitting(false);
            return;
          }

          setErrors({ email: signUpError.message.includes("already registered") 
            ? "Email already registered" 
            : signUpError.message 
          });
          setIsSubmitting(false);
          return;
        }
        
        // Wait for auth state to update properly
        const waitForSession = (): Promise<string | null> => {
          return new Promise((resolve) => {
            // First check if session is already available
            supabase.auth.getSession().then(({ data }) => {
              if (data.session?.user?.id) {
                resolve(data.session.user.id);
                return;
              }
              
              // If not, listen for auth state change
              const { data: { subscription } } = supabase.auth.onAuthStateChange(
                (event, session) => {
                  if (session?.user?.id) {
                    subscription.unsubscribe();
                    resolve(session.user.id);
                  }
                }
              );
              
              // Timeout after 10 seconds
              setTimeout(() => {
                subscription.unsubscribe();
                resolve(null);
              }, 10000);
            });
          });
        };
        
        userId = await waitForSession();
      }
      
      if (!userId) {
        toast.error("Account creation failed. Please try again.");
        setIsSubmitting(false);
        return;
      }
      
      const selectedPlan = subscriptionPlans.find(p => p.name === formData.plan);
      
      const { error: storeError } = await supabase
        .from('stores')
        .insert({
          user_id: userId,
          name: formData.storeName,
          category: formData.category,
          business_mode: formData.businessMode,
          state: formData.state,
          city: formData.city,
          subscription_plan_id: selectedPlan?.id,
          subscription_status: 'trial',
        });
      
      if (storeError) {
        console.error("Store creation error:", storeError);
        toast.error("Store creation failed. Please try again.");
        setIsSubmitting(false);
        return;
      }
      
      // Show success celebration
      setIsSubmitting(false);
      setShowSuccess(true);
      triggerConfetti();
      
      // Navigate to dashboard after celebration
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 3500);
      
    } catch (error) {
      console.error("Onboarding error:", error);
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const currentStep = steps[step - 1];
  const StepIcon = currentStep.Icon;

  return (
    <>
      {/* Loading Overlay */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center gap-6 text-center px-6"
            >
              {/* Animated Store Icon */}
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Store className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              {/* Text */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Creating your store...</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Setting up your digital storefront. This will only take a moment.
                </p>
              </div>
              
              {/* Progress Steps */}
              <div className="flex items-center gap-3 mt-2">
                {["Account", "Store", "Dashboard"].map((label, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.5, duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.5 + 0.2, type: "spring" }}
                      className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
                    >
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </motion.div>
                    <span className="text-xs text-muted-foreground">{label}</span>
                    {i < 2 && <ChevronRight className="w-3 h-3 text-muted-foreground/50" />}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Celebration Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.4 }}
              className="flex flex-col items-center gap-6 text-center px-6"
            >
              {/* Success Icon with Glow */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <div className="absolute inset-0 w-24 h-24 bg-accent/30 rounded-full blur-xl animate-pulse" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg shadow-accent/30">
                  <PartyPopper className="w-12 h-12 text-accent-foreground" />
                </div>
              </motion.div>
              
              {/* Celebration Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <h2 className="text-3xl font-bold text-foreground flex items-center justify-center gap-2">
                  <HiSparkles className="w-8 h-8 text-accent" /> Congratulations!
                </h2>
                <p className="text-lg text-muted-foreground max-w-sm">
                  Your store <span className="font-semibold text-primary">{formData.storeName}</span> is ready!
                </p>
              </motion.div>
              
              {/* Features Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-3 mt-2"
              >
                {[
                  { icon: Globe, label: "Online Store" },
                  { icon: Camera, label: "AI Uploads" },
                  { icon: BarChart3, label: "Analytics" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full"
                  >
                    <item.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Redirect Notice */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-sm text-muted-foreground mt-4 flex items-center gap-2"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                Taking you to your dashboard...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-[100svh] bg-background flex">
      {/* Left Panel - Branding (Centered) */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] bg-primary relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl translate-x-1/2" />
          <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-purple-light/20 rounded-full blur-3xl -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        {/* Content - Vertically Centered */}
        <div className="relative z-10 flex flex-col w-full h-full p-8 xl:p-12">
          {/* Header */}
          <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors w-fit group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          {/* Center Content */}
          <div className="flex-1 flex flex-col justify-center py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img src={logoDarkBg} alt="BizGrow 360" className="h-10 mb-8" />
              
              <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
                Transform your
                <br />
                <span className="text-gradient">retail business</span>
                <br />
                in minutes
              </h1>
              
              <p className="text-white/60 text-base max-w-sm mb-10">
                Join 10,000+ Indian retailers who've grown their business with our platform.
              </p>

              {/* Feature Carousel */}
              <FeatureCarousel />
            </motion.div>
          </div>
          
          {/* Footer Stats */}
          <div className="flex items-center gap-6 text-white/50 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-white/20 border-2 border-primary flex items-center justify-center">
                    <Star className="w-3 h-3 text-accent" />
                  </div>
                ))}
              </div>
              <span>4.9/5 Rating</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              <span>Secure</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>5 min setup</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form (Centered) */}
      <div className="flex-1 flex flex-col min-h-[100svh] bg-background">
        {/* Mobile Header - Compact */}
        <header className="lg:hidden flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-20">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground p-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <img src={logoDarkBg} alt="BizGrow 360" className="h-7 invert dark:invert-0" />
          <div className="w-7" />
        </header>
        
        {/* Form Container - Centered with proper mobile padding */}
        <div className="flex-1 flex items-start sm:items-center justify-center px-4 py-4 sm:py-6 lg:p-8 overflow-y-auto">
          <div className="w-full max-w-md">
            {/* Progress Steps - Compact on mobile */}
            <div className="mb-5 sm:mb-8">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                {steps.slice(0, totalSteps).map((s, i) => (
                  <div key={s.id} className="flex items-center">
                    <motion.div
                      initial={false}
                      animate={{ 
                        scale: step === s.id ? 1 : 0.85,
                      }}
                      className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 ${
                        step > s.id 
                          ? "bg-green-500 text-white" 
                          : step === s.id 
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step > s.id ? (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <s.Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      )}
                    </motion.div>
                    {i < totalSteps - 1 && (
                      <div className={`w-4 xs:w-6 sm:w-8 md:w-12 h-0.5 mx-0.5 sm:mx-1 rounded-full transition-colors duration-300 ${
                        step > s.id ? "bg-green-500" : "bg-muted"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Step {step} of {totalSteps}</p>
                  <h2 className="text-base sm:text-lg font-semibold text-foreground mt-0.5">{currentStep.title}</h2>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center">
                  <StepIcon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                </div>
              </div>
            </div>

            {/* Form Content */}
            <AnimatePresence mode="wait">
              {/* Step 1: Business Identity */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-foreground">Business Details</h3>
                    <p className="text-muted-foreground text-sm">Tell us about your store</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="storeName" className="text-sm font-medium">Store Name</Label>
                      <div className="relative">
                        <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="storeName"
                          placeholder="Sharma General Store"
                          value={formData.storeName}
                          onChange={(e) => updateForm("storeName", e.target.value)}
                          className={`pl-10 h-11 ${errors.storeName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        />
                      </div>
                      <ErrorMessage message={errors.storeName} />
                    </div>
                    
                    <div className="space-y-1.5">
                      <Label htmlFor="ownerName" className="text-sm font-medium">Your Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="ownerName"
                          placeholder="Rajesh Sharma"
                          value={formData.ownerName}
                          onChange={(e) => updateForm("ownerName", e.target.value)}
                          className={`pl-10 h-11 ${errors.ownerName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        />
                      </div>
                      <ErrorMessage message={errors.ownerName} />
                    </div>
                    
                    <div className="space-y-1.5">
                      <Label htmlFor="mobile" className="text-sm font-medium">Mobile Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="mobile"
                          placeholder="9876543210"
                          value={formData.mobile}
                          onChange={(e) => updateForm("mobile", e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className={`pl-10 h-11 ${errors.mobile ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          maxLength={10}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">+91</span>
                      </div>
                      <ErrorMessage message={errors.mobile} />
                    </div>

                    <label className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.sameAsWhatsapp}
                        onChange={(e) => updateForm("sameAsWhatsapp", e.target.checked)}
                        className="w-4 h-4 rounded border-2 border-muted-foreground accent-green-500"
                      />
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-muted-foreground">WhatsApp same as mobile</span>
                      </div>
                    </label>
                        
                    <AnimatePresence>
                      {!formData.sameAsWhatsapp && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-1.5 overflow-hidden"
                        >
                          <Label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp Number</Label>
                          <div className="relative">
                            <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                            <Input
                              id="whatsapp"
                              placeholder="9876543210"
                              value={formData.whatsapp}
                              onChange={(e) => updateForm("whatsapp", e.target.value.replace(/\D/g, '').slice(0, 10))}
                              className={`pl-10 h-11 ${errors.whatsapp ? "border-red-500" : ""}`}
                              maxLength={10}
                            />
                          </div>
                          <ErrorMessage message={errors.whatsapp} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Location */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-foreground">Store Location</h3>
                    <p className="text-muted-foreground text-sm">Help customers find you</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="state" className="text-sm font-medium">State</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                        <select
                          id="state"
                          value={formData.state}
                          onChange={(e) => updateForm("state", e.target.value)}
                          className={`w-full h-11 pl-10 pr-4 rounded-md border bg-background text-foreground text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring ${
                            errors.state ? "border-red-500 focus:ring-red-500" : "border-input"
                          }`}
                        >
                          <option value="">Select state</option>
                          {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rotate-90 pointer-events-none" />
                      </div>
                      <ErrorMessage message={errors.state} />
                    </div>
                    
                    <div className="space-y-1.5">
                      <Label htmlFor="city" className="text-sm font-medium">City / Town</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="city"
                          placeholder="Mumbai, Delhi, Bengaluru..."
                          value={formData.city}
                          onChange={(e) => updateForm("city", e.target.value)}
                          className={`pl-10 h-11 ${errors.city ? "border-red-500" : ""}`}
                        />
                      </div>
                      <ErrorMessage message={errors.city} />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                    <div className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">Local Discovery</p>
                        <p className="text-xs text-muted-foreground">Your location helps customers find you in search</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Category */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-foreground">Store Category</h3>
                    <p className="text-muted-foreground text-sm">What do you sell?</p>
                  </div>

                  {errors.category && <ErrorMessage message={errors.category} />}

                  <div className="grid grid-cols-3 gap-2">
                    {storeCategories.map((cat, index) => (
                      <motion.button
                        key={cat.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.02 }}
                        onClick={() => updateForm("category", cat.id)}
                        className={`relative p-3 rounded-xl text-center transition-all border-2 ${
                          formData.category === cat.id
                            ? "border-primary bg-primary/5"
                            : "border-transparent bg-muted/50 hover:bg-muted"
                        }`}
                      >
                        <div className={`w-12 h-12 mx-auto mb-1.5 rounded-xl overflow-hidden flex items-center justify-center transition-all ${
                          formData.category === cat.id ? "ring-2 ring-primary ring-offset-2" : ""
                        }`}>
                          <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-medium text-foreground block truncate">{cat.label}</span>
                        {formData.category === cat.id && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                          >
                            <Check className="w-2.5 h-2.5 text-white" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Business Mode */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-foreground">Delivery Mode</h3>
                    <p className="text-muted-foreground text-sm">How do customers get orders?</p>
                  </div>

                  {errors.businessMode && <ErrorMessage message={errors.businessMode} />}

                  <div className="space-y-3">
                    {businessModes.map((mode, index) => (
                      <motion.button
                        key={mode.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => updateForm("businessMode", mode.id)}
                        className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                          formData.businessMode === mode.id
                            ? "border-primary bg-primary/5"
                            : "border-transparent bg-muted/50 hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                            formData.businessMode === mode.id ? "bg-primary text-primary-foreground" : "bg-background"
                          }`}>
                            <mode.Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-foreground text-sm">{mode.title}</h4>
                              {mode.recommended && (
                                <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                                  Best
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">{mode.description}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                            formData.businessMode === mode.id 
                              ? "border-primary bg-primary" 
                              : "border-muted-foreground/30"
                          }`}>
                            {formData.businessMode === mode.id && (
                              <Check className="w-3 h-3 text-primary-foreground" />
                            )}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 5: Plan Selection */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-foreground">Choose Plan</h3>
                    <p className="text-muted-foreground text-sm">14-day free trial included</p>
                  </div>

                  {errors.plan && <ErrorMessage message={errors.plan} />}

                  <div className="space-y-3">
                    {plans.map((plan, index) => (
                      <motion.button
                        key={plan.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => updateForm("plan", plan.id)}
                        className={`w-full p-4 rounded-xl text-left transition-all border-2 relative ${
                          formData.plan === plan.id
                            ? "border-primary bg-primary/5"
                            : plan.popular
                              ? "border-accent/50 bg-accent/5"
                              : "border-transparent bg-muted/50 hover:bg-muted"
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-2 left-4 px-2 py-0.5 bg-accent text-accent-foreground text-xs font-bold rounded-full">
                            Popular
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            formData.plan === plan.id 
                              ? "bg-primary text-primary-foreground" 
                              : plan.popular 
                                ? "bg-accent text-accent-foreground"
                                : "bg-background"
                          }`}>
                            <plan.Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-baseline gap-2">
                              <h4 className="font-semibold text-foreground text-sm">{plan.name}</h4>
                              <span className="text-lg font-bold text-primary">{plan.price}</span>
                              <span className="text-xs text-muted-foreground">{plan.period}</span>
                            </div>
                            <div className="flex flex-wrap gap-x-2 mt-1">
                              {plan.features.slice(0, 2).map((f) => (
                                <span key={f} className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Check className="w-3 h-3 text-green-500" />
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            formData.plan === plan.id 
                              ? "border-primary bg-primary" 
                              : "border-muted-foreground/30"
                          }`}>
                            {formData.plan === plan.id && (
                              <Check className="w-3 h-3 text-primary-foreground" />
                            )}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <BadgeCheck className="w-4 h-4 text-green-500 shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">No card required</span> — Start free today
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Step 6: Account */}
              {step === 6 && !user && (
                <motion.div
                  key="step6"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-foreground">Create Account</h3>
                    <p className="text-muted-foreground text-sm">Almost done! Set up your login</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => updateForm("email", e.target.value)}
                          className={`pl-10 h-11 ${errors.email ? "border-red-500" : ""}`}
                        />
                      </div>
                      <ErrorMessage message={errors.email} />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Min 6 characters"
                          value={formData.password}
                          onChange={(e) => updateForm("password", e.target.value)}
                          className={`pl-10 h-11 ${errors.password ? "border-red-500" : ""}`}
                        />
                      </div>
                      <ErrorMessage message={errors.password} />
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link to="/auth?mode=login" className="text-primary font-medium hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-border">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={step === 1 || isSubmitting}
                className="gap-2 h-10"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              
              {step < totalSteps ? (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="gap-2 h-10 bg-primary hover:bg-primary/90 px-6"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isStepValid()}
                  className="gap-2 h-10 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4" />
                      Launch Store
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Join;
