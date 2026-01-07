import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, ArrowRight, Check, Store, MapPin, Building2, Truck, CreditCard,
  Phone, User, MessageCircle, Sparkles, Shield, Clock, Zap, AlertCircle, Loader2, Mail, Lock,
  Rocket, Star, Gift, Crown, TrendingUp, Package, ShoppingBag, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RippleButton } from "@/components/ui/ripple-button";
import { validateStep, type JoinFormData } from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logoDarkBg from "@/assets/logo-dark-bg.png";

const storeCategories = [
  { id: "kirana", label: "Kirana Store", icon: "🛒", desc: "General & grocery items", color: "from-orange-500 to-amber-500" },
  { id: "bakery", label: "Bakery", icon: "🥐", desc: "Fresh baked goods", color: "from-amber-400 to-yellow-500" },
  { id: "dairy", label: "Dairy Shop", icon: "🥛", desc: "Milk & dairy products", color: "from-blue-400 to-cyan-400" },
  { id: "clothing", label: "Clothing Store", icon: "👕", desc: "Fashion & apparel", color: "from-pink-500 to-rose-500" },
  { id: "cosmetic", label: "Cosmetics", icon: "💄", desc: "Beauty & skincare", color: "from-fuchsia-500 to-pink-500" },
  { id: "mobile", label: "Mobile & Electronics", icon: "📱", desc: "Gadgets & accessories", color: "from-violet-500 to-purple-500" },
  { id: "fruits", label: "Fruits & Vegetables", icon: "🍎", desc: "Fresh produce", color: "from-green-500 to-emerald-500" },
  { id: "electrical", label: "Electrical Supplies", icon: "⚡", desc: "Electrical goods", color: "from-yellow-500 to-orange-500" },
  { id: "pharmacy", label: "Pharmacy", icon: "💊", desc: "Medicines & health", color: "from-teal-500 to-cyan-500" },
  { id: "stationery", label: "Stationery", icon: "📚", desc: "Books & supplies", color: "from-indigo-500 to-blue-500" },
  { id: "hardware", label: "Hardware", icon: "🔧", desc: "Tools & equipment", color: "from-slate-500 to-gray-600" },
  { id: "other", label: "Other", icon: "🏪", desc: "Other retail", color: "from-purple-500 to-indigo-500" },
];

const businessModes = [
  {
    id: "shop-only",
    title: "Shop Only (Takeaway)",
    description: "Customers visit your shop and pick up orders. Perfect for walk-in customers.",
    icon: Store,
    features: ["Walk-in customers", "Counter billing", "In-store experience"],
    illustration: "🏪",
  },
  {
    id: "shop-delivery",
    title: "Shop + Home Delivery",
    description: "Offer both in-store pickup and home delivery to reach more customers.",
    icon: Truck,
    features: ["Home delivery", "Order tracking", "Delivery radius setup"],
    recommended: true,
    illustration: "🚚",
  },
];

const plans = [
  { 
    id: "starter", 
    name: "Starter", 
    price: "₹499", 
    period: "/month",
    features: ["Up to 100 products", "Basic catalogue", "WhatsApp orders", "Email support"],
    icon: Zap,
    gradient: "from-slate-600 to-gray-700",
    emoji: "🚀",
  },
  { 
    id: "pro", 
    name: "Pro", 
    price: "₹999", 
    period: "/month",
    features: ["Unlimited products", "AI Photo Upload", "Analytics dashboard", "Priority support", "Custom domain"],
    popular: true,
    icon: Sparkles,
    gradient: "from-accent via-yellow-400 to-amber-400",
    emoji: "⭐",
  },
  { 
    id: "enterprise", 
    name: "Enterprise", 
    price: "Custom",
    period: "",
    features: ["Multi-store management", "API access", "Dedicated manager", "Custom integrations", "SLA guarantee"],
    icon: Shield,
    gradient: "from-purple-600 to-indigo-600",
    emoji: "👑",
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
  { id: 1, title: "Identity", icon: Store, emoji: "🏪" },
  { id: 2, title: "Location", icon: MapPin, emoji: "📍" },
  { id: 3, title: "Category", icon: Building2, emoji: "🏬" },
  { id: 4, title: "Mode", icon: Truck, emoji: "🚀" },
  { id: 5, title: "Plan", icon: CreditCard, emoji: "💳" },
  { id: 6, title: "Account", icon: User, emoji: "👤" },
];

// Floating particles component
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full bg-accent/30"
        initial={{ 
          x: Math.random() * window.innerWidth, 
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.5
        }}
        animate={{ 
          y: [null, Math.random() * -200 - 100],
          opacity: [0.3, 0.8, 0]
        }}
        transition={{ 
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          delay: Math.random() * 5
        }}
      />
    ))}
  </div>
);

// Animated background shapes
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Large glowing orbs */}
    <motion.div 
      className="absolute -top-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.3, 0.2]
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div 
      className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-light/15 rounded-full blur-3xl"
      animate={{ 
        scale: [1, 1.3, 1],
        opacity: [0.15, 0.25, 0.15]
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    />
    <motion.div 
      className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-2xl"
      animate={{ 
        x: [0, 50, 0],
        y: [0, -30, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
    
    {/* Grid pattern overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
  </div>
);

// Step progress ring
const StepProgressRing = ({ current, total }: { current: number; total: number }) => {
  const progress = (current / total) * 100;
  const circumference = 2 * Math.PI * 45;
  
  return (
    <div className="relative w-28 h-28 mx-auto mb-6">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--primary-foreground) / 0.1)"
          strokeWidth="6"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          key={current}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-bold text-primary-foreground"
        >
          {current}
        </motion.span>
        <span className="text-xs text-primary-foreground/60">of {total}</span>
      </div>
    </div>
  );
};

// Error message component
const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-destructive text-sm mt-1.5 flex items-center gap-1"
    >
      <AlertCircle className="w-3.5 h-3.5" />
      {message}
    </motion.p>
  );
};

// Animated step icon
const AnimatedStepIcon = ({ emoji, title }: { emoji: string; title: string }) => (
  <motion.div 
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
    className="relative"
  >
    <div className="w-20 h-20 mx-auto mb-4 rounded-3xl gradient-accent flex items-center justify-center shadow-glow-accent relative overflow-hidden">
      <motion.span 
        className="text-4xl relative z-10"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {emoji}
      </motion.span>
      {/* Shine effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      />
    </div>
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-sm text-primary-foreground/60 text-center"
    >
      Step {steps.findIndex(s => s.title === title) + 1}
    </motion.p>
  </motion.div>
);

const stepVariants = {
  initial: { opacity: 0, x: 100, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -100, scale: 0.95 },
};

const Join = () => {
  const navigate = useNavigate();
  const { user, signUp } = useAuth();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const totalSteps = user ? 5 : 6;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState<any[]>([]);

  const [formData, setFormData] = useState<Partial<JoinFormData> & { email?: string; password?: string }>({
    storeName: "",
    ownerName: "",
    mobile: "",
    whatsapp: "",
    sameAsWhatsapp: false,
    state: "",
    city: "",
    category: "",
    businessMode: "",
    plan: "",
    email: "",
    password: "",
  });

  // Fetch subscription plans
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
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateCurrentStep = () => {
    if (step === 6) {
      if (!user) {
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          setErrors({ email: "Please enter a valid email address" });
          return false;
        }
        if (!formData.password || formData.password.length < 6) {
          setErrors({ password: "Password must be at least 6 characters" });
          return false;
        }
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
      setDirection(1);
      if (step === 5 && user) {
        handleSubmit();
      } else {
        setStep((prev) => Math.min(prev + 1, totalSteps));
      }
      setTouched({});
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
    setTouched({});
  };

  const isStepValid = () => {
    if (step === 6) {
      return user || (formData.email && formData.password && formData.password.length >= 6);
    }
    const result = validateStep(step, formData);
    return result.success;
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
          if (signUpError.message.includes("already registered")) {
            setErrors({ email: "This email is already registered. Please login instead." });
          } else {
            setErrors({ email: signUpError.message });
          }
          setIsSubmitting(false);
          return;
        }
        
        const { data: sessionData } = await supabase.auth.getSession();
        userId = sessionData.session?.user?.id;
        
        if (!userId) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          const { data: retrySession } = await supabase.auth.getSession();
          userId = retrySession.session?.user?.id;
        }
      }
      
      if (!userId) {
        toast.error("Failed to create account. Please try again.");
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
        toast.error("Failed to create store. Please try again.");
        setIsSubmitting(false);
        return;
      }
      
      toast.success("🎉 Store created successfully! Welcome to BizGrow 360!");
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepData = steps[step - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-[hsl(284,100%,8%)] relative overflow-hidden">
      <AnimatedBackground />
      <FloatingParticles />

      {/* Header */}
      <header className="container mx-auto px-4 py-4 md:py-6 relative z-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors group">
            <motion.div whileHover={{ x: -5 }} transition={{ type: "spring" }}>
              <ArrowLeft className="w-5 h-5" />
            </motion.div>
            <span className="hidden sm:inline font-medium">Back to Home</span>
          </Link>
          <motion.img 
            src={logoDarkBg} 
            alt="BizGrow 360" 
            className="h-8 md:h-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 md:py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero text with animated emoji */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-5xl mb-4"
            >
              🚀
            </motion.div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3">
              Join <span className="text-gradient">BizGrow 360</span>
            </h1>
            <p className="text-primary-foreground/70 text-base md:text-lg max-w-md mx-auto">
              Set up your digital store in just 5 minutes and start growing your business
            </p>
          </motion.div>

          {/* Progress Ring */}
          <StepProgressRing current={step} total={totalSteps} />

          {/* Step Pills */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {steps.slice(0, totalSteps).map((s) => (
              <motion.div
                key={s.id}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all cursor-pointer ${
                  step === s.id 
                    ? "bg-accent text-accent-foreground font-semibold shadow-glow-accent" 
                    : step > s.id 
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : "bg-primary-foreground/10 text-primary-foreground/50"
                }`}
              >
                {step > s.id ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{s.emoji}</span>
                )}
                <span className="hidden md:inline">{s.title}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Form Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="bg-card/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 overflow-hidden relative"
          >
            {/* Card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="p-6 md:p-8 lg:p-10 relative">
              <AnimatePresence mode="wait" custom={direction}>
                {/* Step 1: Business Identity */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <AnimatedStepIcon emoji={currentStepData.emoji} title={currentStepData.title} />
                    <div className="text-center mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-card-foreground">
                        Tell us about your <span className="text-gradient">business</span>
                      </h2>
                      <p className="text-muted-foreground mt-2">Let's start with the basics</p>
                    </div>

                    <div className="space-y-5 max-w-lg mx-auto">
                      <div className="grid md:grid-cols-2 gap-4">
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="storeName" className="flex items-center gap-2 text-base">
                            <Store className="w-4 h-4 text-accent" />
                            Store Name
                          </Label>
                          <Input
                            id="storeName"
                            placeholder="e.g., Sharma General Store"
                            value={formData.storeName}
                            onChange={(e) => updateForm("storeName", e.target.value)}
                            className={`h-12 text-base bg-secondary/50 border-2 transition-all ${
                              errors.storeName ? "border-destructive" : "border-transparent focus:border-accent"
                            }`}
                          />
                          <ErrorMessage message={errors.storeName} />
                        </motion.div>
                        
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="ownerName" className="flex items-center gap-2 text-base">
                            <User className="w-4 h-4 text-accent" />
                            Owner Name
                          </Label>
                          <Input
                            id="ownerName"
                            placeholder="e.g., Rajesh Sharma"
                            value={formData.ownerName}
                            onChange={(e) => updateForm("ownerName", e.target.value)}
                            className={`h-12 text-base bg-secondary/50 border-2 transition-all ${
                              errors.ownerName ? "border-destructive" : "border-transparent focus:border-accent"
                            }`}
                          />
                          <ErrorMessage message={errors.ownerName} />
                        </motion.div>
                      </div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="mobile" className="flex items-center gap-2 text-base">
                          <Phone className="w-4 h-4 text-accent" />
                          Mobile Number
                        </Label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium flex items-center gap-1">
                            🇮🇳 +91
                          </span>
                          <Input
                            id="mobile"
                            placeholder="9876543210"
                            value={formData.mobile}
                            onChange={(e) => updateForm("mobile", e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className={`h-12 text-base pl-20 bg-secondary/50 border-2 transition-all ${
                              errors.mobile ? "border-destructive" : "border-transparent focus:border-accent"
                            }`}
                            maxLength={10}
                          />
                        </div>
                        <ErrorMessage message={errors.mobile} />
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-3"
                      >
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={formData.sameAsWhatsapp}
                              onChange={(e) => updateForm("sameAsWhatsapp", e.target.checked)}
                              className="sr-only"
                            />
                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                              formData.sameAsWhatsapp 
                                ? "bg-green-500 border-green-500" 
                                : "border-border group-hover:border-green-500/50"
                            }`}>
                              {formData.sameAsWhatsapp && <Check className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                          <span className="flex items-center gap-2 text-sm">
                            <MessageCircle className="w-4 h-4 text-green-500" />
                            WhatsApp number is same as mobile
                          </span>
                        </label>
                        
                        <AnimatePresence>
                          {!formData.sameAsWhatsapp && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-2 pt-2">
                                <Label htmlFor="whatsapp" className="flex items-center gap-2 text-base">
                                  <MessageCircle className="w-4 h-4 text-green-500" />
                                  WhatsApp Number
                                </Label>
                                <div className="relative">
                                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium flex items-center gap-1">
                                    🇮🇳 +91
                                  </span>
                                  <Input
                                    id="whatsapp"
                                    placeholder="9876543210"
                                    value={formData.whatsapp}
                                    onChange={(e) => updateForm("whatsapp", e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    className={`h-12 text-base pl-20 bg-secondary/50 border-2 transition-all ${
                                      errors.whatsapp ? "border-destructive" : "border-transparent focus:border-green-500"
                                    }`}
                                    maxLength={10}
                                  />
                                </div>
                                <ErrorMessage message={errors.whatsapp} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Location */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <AnimatedStepIcon emoji={currentStepData.emoji} title={currentStepData.title} />
                    <div className="text-center mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-card-foreground">
                        Where's your <span className="text-gradient">store</span> located?
                      </h2>
                      <p className="text-muted-foreground mt-2">Help customers find you easily</p>
                    </div>

                    <div className="space-y-5 max-w-lg mx-auto">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="state" className="flex items-center gap-2 text-base">
                          <MapPin className="w-4 h-4 text-accent" />
                          State
                        </Label>
                        <select
                          id="state"
                          value={formData.state}
                          onChange={(e) => updateForm("state", e.target.value)}
                          className={`w-full h-12 px-4 rounded-xl bg-secondary/50 text-foreground border-2 transition-all focus:outline-none ${
                            errors.state ? "border-destructive" : "border-transparent focus:border-accent"
                          }`}
                        >
                          <option value="">Select your state</option>
                          {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                        <ErrorMessage message={errors.state} />
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="city" className="flex items-center gap-2 text-base">
                          <Building2 className="w-4 h-4 text-accent" />
                          City / Town
                        </Label>
                        <Input
                          id="city"
                          placeholder="e.g., Jaipur, Mumbai, Bengaluru"
                          value={formData.city}
                          onChange={(e) => updateForm("city", e.target.value)}
                          className={`h-12 text-base bg-secondary/50 border-2 transition-all ${
                            errors.city ? "border-destructive" : "border-transparent focus:border-accent"
                          }`}
                        />
                        <ErrorMessage message={errors.city} />
                      </motion.div>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 max-w-lg mx-auto"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">💡</div>
                        <div>
                          <p className="font-medium text-card-foreground">Pro Tip!</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Your location helps customers discover you in local searches and maps.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Step 3: Store Category */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={direction}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <AnimatedStepIcon emoji={currentStepData.emoji} title={currentStepData.title} />
                    <div className="text-center mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-card-foreground">
                        What do you <span className="text-gradient">sell</span>?
                      </h2>
                      <p className="text-muted-foreground mt-2">Choose your store category</p>
                    </div>

                    {errors.category && (
                      <div className="mb-4 text-center">
                        <ErrorMessage message={errors.category} />
                      </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {storeCategories.map((category, index) => (
                        <motion.button
                          key={category.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.03, type: "spring" }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateForm("category", category.id)}
                          className={`relative p-4 rounded-2xl text-center transition-all group ${
                            formData.category === category.id
                              ? "bg-gradient-to-br " + category.color + " shadow-lg shadow-accent/20"
                              : "bg-secondary/50 hover:bg-secondary"
                          }`}
                        >
                          <motion.span 
                            className="text-4xl block mb-2"
                            animate={formData.category === category.id ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.3 }}
                          >
                            {category.icon}
                          </motion.span>
                          <span className={`font-medium text-sm block ${
                            formData.category === category.id ? "text-white" : "text-card-foreground"
                          }`}>
                            {category.label}
                          </span>
                          {formData.category === category.id && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
                            >
                              <Check className="w-4 h-4 text-green-500" />
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
                    custom={direction}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <AnimatedStepIcon emoji={currentStepData.emoji} title={currentStepData.title} />
                    <div className="text-center mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-card-foreground">
                        How do customers get <span className="text-gradient">orders</span>?
                      </h2>
                      <p className="text-muted-foreground mt-2">Choose your business model</p>
                    </div>

                    {errors.businessMode && (
                      <div className="mb-4 text-center">
                        <ErrorMessage message={errors.businessMode} />
                      </div>
                    )}

                    <div className="space-y-4 max-w-2xl mx-auto">
                      {businessModes.map((mode, index) => (
                        <motion.button
                          key={mode.id}
                          initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15, type: "spring" }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => updateForm("businessMode", mode.id)}
                          className={`w-full p-6 rounded-2xl text-left transition-all relative overflow-hidden ${
                            formData.businessMode === mode.id
                              ? "bg-gradient-to-r from-primary to-primary/80 shadow-xl shadow-primary/30"
                              : "bg-secondary/50 hover:bg-secondary"
                          }`}
                        >
                          {mode.recommended && (
                            <motion.span 
                              initial={{ x: 100 }}
                              animate={{ x: 0 }}
                              className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold px-4 py-2 rounded-bl-2xl flex items-center gap-1"
                            >
                              <Star className="w-3 h-3" />
                              Recommended
                            </motion.span>
                          )}
                          <div className="flex items-center gap-5">
                            <motion.div 
                              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl ${
                                formData.businessMode === mode.id ? "bg-white/20" : "bg-accent/10"
                              }`}
                              animate={formData.businessMode === mode.id ? { rotate: [0, 5, -5, 0] } : {}}
                              transition={{ duration: 0.5 }}
                            >
                              {mode.illustration}
                            </motion.div>
                            <div className="flex-1">
                              <h3 className={`font-bold text-lg ${
                                formData.businessMode === mode.id ? "text-primary-foreground" : "text-card-foreground"
                              }`}>
                                {mode.title}
                              </h3>
                              <p className={`text-sm mt-1 ${
                                formData.businessMode === mode.id ? "text-primary-foreground/80" : "text-muted-foreground"
                              }`}>
                                {mode.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-3">
                                {mode.features.map((f) => (
                                  <span 
                                    key={f} 
                                    className={`text-xs px-3 py-1 rounded-full ${
                                      formData.businessMode === mode.id 
                                        ? "bg-white/20 text-primary-foreground" 
                                        : "bg-background text-muted-foreground"
                                    }`}
                                  >
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              formData.businessMode === mode.id 
                                ? "border-accent bg-accent" 
                                : "border-border"
                            }`}>
                              {formData.businessMode === mode.id && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                  <Check className="w-5 h-5 text-accent-foreground" />
                                </motion.div>
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
                    custom={direction}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <AnimatedStepIcon emoji={currentStepData.emoji} title={currentStepData.title} />
                    <div className="text-center mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-card-foreground">
                        Choose your <span className="text-gradient">plan</span>
                      </h2>
                      <p className="text-muted-foreground mt-2">All plans include a 14-day free trial 🎁</p>
                    </div>

                    {errors.plan && (
                      <div className="mb-4 text-center">
                        <ErrorMessage message={errors.plan} />
                      </div>
                    )}

                    <div className="grid md:grid-cols-3 gap-4">
                      {plans.map((plan, index) => (
                        <motion.button
                          key={plan.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, type: "spring" }}
                          whileHover={{ scale: 1.03, y: -10 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => updateForm("plan", plan.id)}
                          className={`relative p-6 rounded-2xl text-left transition-all overflow-hidden ${
                            formData.plan === plan.id
                              ? "ring-2 ring-accent shadow-xl shadow-accent/30"
                              : plan.popular
                                ? "ring-2 ring-accent/30 hover:ring-accent/60"
                                : "bg-secondary/50 hover:bg-secondary"
                          } ${formData.plan === plan.id ? "bg-gradient-to-br " + plan.gradient : ""}`}
                        >
                          {plan.popular && (
                            <motion.div 
                              initial={{ y: -50 }}
                              animate={{ y: 0 }}
                              className="absolute -top-1 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg"
                            >
                              <Sparkles className="w-3 h-3" />
                              Most Popular
                            </motion.div>
                          )}
                          
                          <div className="text-center pt-4">
                            <motion.span 
                              className="text-5xl block mb-3"
                              animate={{ rotate: formData.plan === plan.id ? [0, 360] : 0 }}
                              transition={{ duration: 0.5 }}
                            >
                              {plan.emoji}
                            </motion.span>
                            <h3 className={`font-bold text-xl ${
                              formData.plan === plan.id ? "text-white" : "text-card-foreground"
                            }`}>
                              {plan.name}
                            </h3>
                            <div className="mt-2 mb-4">
                              <span className={`text-3xl font-bold ${
                                formData.plan === plan.id ? "text-white" : "text-primary"
                              }`}>
                                {plan.price}
                              </span>
                              <span className={`text-sm ${
                                formData.plan === plan.id ? "text-white/70" : "text-muted-foreground"
                              }`}>
                                {plan.period}
                              </span>
                            </div>
                            
                            <div className="space-y-2 text-left">
                              {plan.features.map((f) => (
                                <div 
                                  key={f} 
                                  className={`flex items-center gap-2 text-sm ${
                                    formData.plan === plan.id ? "text-white/90" : "text-muted-foreground"
                                  }`}
                                >
                                  <Check className={`w-4 h-4 shrink-0 ${
                                    formData.plan === plan.id ? "text-white" : "text-green-500"
                                  }`} />
                                  {f}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {formData.plan === plan.id && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                            >
                              <Check className="w-5 h-5 text-green-500" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20 flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                        <Gift className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-card-foreground">14-Day Free Trial</p>
                        <p className="text-sm text-muted-foreground">
                          Try all features free. No credit card required to start!
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Step 6: Account Creation */}
                {step === 6 && !user && (
                  <motion.div
                    key="step6"
                    custom={direction}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <AnimatedStepIcon emoji={currentStepData.emoji} title={currentStepData.title} />
                    <div className="text-center mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-card-foreground">
                        Create your <span className="text-gradient">account</span>
                      </h2>
                      <p className="text-muted-foreground mt-2">Almost there! Just one more step 🎉</p>
                    </div>

                    <div className="space-y-5 max-w-md mx-auto">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="email" className="flex items-center gap-2 text-base">
                          <Mail className="w-4 h-4 text-accent" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => updateForm("email", e.target.value)}
                          className={`h-12 text-base bg-secondary/50 border-2 transition-all ${
                            errors.email ? "border-destructive" : "border-transparent focus:border-accent"
                          }`}
                        />
                        <ErrorMessage message={errors.email} />
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="password" className="flex items-center gap-2 text-base">
                          <Lock className="w-4 h-4 text-accent" />
                          Password
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a password (min 6 characters)"
                          value={formData.password}
                          onChange={(e) => updateForm("password", e.target.value)}
                          className={`h-12 text-base bg-secondary/50 border-2 transition-all ${
                            errors.password ? "border-destructive" : "border-transparent focus:border-accent"
                          }`}
                        />
                        <ErrorMessage message={errors.password} />
                      </motion.div>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-8 p-5 rounded-2xl bg-secondary/50 border border-border max-w-md mx-auto text-center"
                    >
                      <p className="text-muted-foreground">
                        Already have an account?{" "}
                        <Link to="/auth?mode=login&redirect=/join" className="text-primary font-semibold hover:underline">
                          Sign in here →
                        </Link>
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-between items-center mt-10 pt-6 border-t border-border"
              >
                <Button
                  variant="ghost"
                  onClick={prevStep}
                  disabled={step === 1 || isSubmitting}
                  className="gap-2 h-12 px-6 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>
                
                {step < totalSteps ? (
                  <RippleButton
                    onClick={nextStep}
                    className="gradient-accent text-accent-foreground font-bold gap-2 h-12 px-8 shadow-glow-accent"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </RippleButton>
                ) : (
                  <RippleButton
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isStepValid()}
                    className="gradient-accent text-accent-foreground font-bold gap-2 h-12 px-8 shadow-glow-accent disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating Store...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5" />
                        Launch My Store
                        <Sparkles className="w-4 h-4" />
                      </>
                    )}
                  </RippleButton>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8"
          >
            {[
              { icon: Shield, text: "256-bit Secure", color: "text-green-400" },
              { icon: Clock, text: "5 min setup", color: "text-accent" },
              { icon: Heart, text: "24/7 Support", color: "text-pink-400" },
              { icon: TrendingUp, text: "10K+ Stores", color: "text-blue-400" },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-2 text-primary-foreground/70 text-sm"
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Join;
