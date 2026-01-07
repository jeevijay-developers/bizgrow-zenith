import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, ArrowRight, Check, Store, MapPin, Building2, Truck, CreditCard,
  Phone, User, MessageCircle, Sparkles, Shield, Clock, Zap, AlertCircle, Loader2, Mail, Lock,
  ShoppingCart, Croissant, Milk, Shirt, Palette, Smartphone, Apple, Lightbulb, Pill, BookOpen, Wrench, Package,
  ChevronRight, BadgeCheck, Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateStep, type JoinFormData } from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logoDarkBg from "@/assets/logo-dark-bg.png";

const storeCategories = [
  { id: "kirana", label: "Kirana Store", Icon: ShoppingCart, desc: "General & grocery" },
  { id: "bakery", label: "Bakery", Icon: Croissant, desc: "Fresh baked goods" },
  { id: "dairy", label: "Dairy Shop", Icon: Milk, desc: "Milk & dairy" },
  { id: "clothing", label: "Clothing", Icon: Shirt, desc: "Fashion & apparel" },
  { id: "cosmetic", label: "Cosmetics", Icon: Palette, desc: "Beauty & skincare" },
  { id: "mobile", label: "Electronics", Icon: Smartphone, desc: "Gadgets & more" },
  { id: "fruits", label: "Fruits & Veggies", Icon: Apple, desc: "Fresh produce" },
  { id: "electrical", label: "Electrical", Icon: Lightbulb, desc: "Electrical goods" },
  { id: "pharmacy", label: "Pharmacy", Icon: Pill, desc: "Health & medicine" },
  { id: "stationery", label: "Stationery", Icon: BookOpen, desc: "Books & supplies" },
  { id: "hardware", label: "Hardware", Icon: Wrench, desc: "Tools & equipment" },
  { id: "other", label: "Other", Icon: Package, desc: "Other retail" },
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

const Join = () => {
  const navigate = useNavigate();
  const { user, signUp } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = user ? 5 : 6;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState<any[]>([]);

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
          setErrors({ email: signUpError.message.includes("already registered") 
            ? "Email already registered" 
            : signUpError.message 
          });
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
        toast.error("Account creation failed");
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
        toast.error("Store creation failed");
        setIsSubmitting(false);
        return;
      }
      
      toast.success("Welcome to BizGrow 360!");
      navigate("/dashboard");
      
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStep = steps[step - 1];
  const StepIcon = currentStep.Icon;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-between p-10 w-full">
          <Link to="/" className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors w-fit">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          
          <div className="space-y-8">
            <img src={logoDarkBg} alt="BizGrow 360" className="h-12" />
            <div>
              <h1 className="text-4xl xl:text-5xl font-bold text-primary-foreground leading-tight">
                Launch your
                <br />
                <span className="text-gradient">digital store</span>
                <br />
                in minutes
              </h1>
              <p className="text-primary-foreground/70 mt-4 text-lg max-w-md">
                Join 10,000+ retailers who've transformed their business with our platform.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                "AI-powered product uploads",
                "WhatsApp order notifications",
                "Beautiful storefront templates",
              ].map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 text-primary-foreground/90"
                >
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-primary-foreground/60 text-sm">
            <Shield className="w-4 h-4" />
            <span>Secure & encrypted</span>
            <span className="mx-2">•</span>
            <Clock className="w-4 h-4" />
            <span>5 minute setup</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <img src={logoDarkBg} alt="BizGrow 360" className="h-8 invert dark:invert-0" />
          <div className="w-5" />
        </header>
        
        <div className="flex-1 flex flex-col max-w-xl mx-auto w-full px-4 py-6 lg:py-10">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.slice(0, totalSteps).map((s, i) => (
                <div key={s.id} className="flex items-center">
                  <motion.div
                    animate={{ 
                      scale: step === s.id ? 1 : 0.9,
                    }}
                    className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      step > s.id 
                        ? "bg-green-500 text-white" 
                        : step === s.id 
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <s.Icon className="w-5 h-5" />
                    )}
                  </motion.div>
                  {i < totalSteps - 1 && (
                    <div className={`w-full h-1 mx-1 rounded-full transition-colors duration-300 ${
                      step > s.id ? "bg-green-500" : "bg-muted"
                    }`} style={{ width: `calc((100vw - 200px) / ${totalSteps})`, maxWidth: '60px' }} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Step {step} of {totalSteps}</p>
                <h2 className="text-xl font-semibold text-foreground">{currentStep.title}</h2>
              </div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <StepIcon className="w-5 h-5 text-accent" />
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1">
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
                    <p className="text-muted-foreground">Tell us about your store</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeName" className="text-sm font-medium">Store Name</Label>
                      <div className="relative">
                        <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="storeName"
                          placeholder="Sharma General Store"
                          value={formData.storeName}
                          onChange={(e) => updateForm("storeName", e.target.value)}
                          className={`pl-10 h-12 ${errors.storeName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        />
                      </div>
                      <ErrorMessage message={errors.storeName} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ownerName" className="text-sm font-medium">Your Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="ownerName"
                          placeholder="Rajesh Sharma"
                          value={formData.ownerName}
                          onChange={(e) => updateForm("ownerName", e.target.value)}
                          className={`pl-10 h-12 ${errors.ownerName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        />
                      </div>
                      <ErrorMessage message={errors.ownerName} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mobile" className="text-sm font-medium">Mobile Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="mobile"
                          placeholder="9876543210"
                          value={formData.mobile}
                          onChange={(e) => updateForm("mobile", e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className={`pl-10 h-12 ${errors.mobile ? "border-red-500 focus-visible:ring-red-500" : ""}`}
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
                        className="w-5 h-5 rounded border-2 border-muted-foreground accent-primary"
                      />
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">WhatsApp same as mobile</span>
                      </div>
                    </label>
                        
                    <AnimatePresence>
                      {!formData.sameAsWhatsapp && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 overflow-hidden"
                        >
                          <Label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp Number</Label>
                          <div className="relative">
                            <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                            <Input
                              id="whatsapp"
                              placeholder="9876543210"
                              value={formData.whatsapp}
                              onChange={(e) => updateForm("whatsapp", e.target.value.replace(/\D/g, '').slice(0, 10))}
                              className={`pl-10 h-12 ${errors.whatsapp ? "border-red-500" : ""}`}
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
                    <p className="text-muted-foreground">Help customers find you</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm font-medium">State</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
                        <select
                          id="state"
                          value={formData.state}
                          onChange={(e) => updateForm("state", e.target.value)}
                          className={`w-full h-12 pl-10 pr-4 rounded-md border bg-background text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring ${
                            errors.state ? "border-red-500 focus:ring-red-500" : "border-input"
                          }`}
                        >
                          <option value="">Select state</option>
                          {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground rotate-90 pointer-events-none" />
                      </div>
                      <ErrorMessage message={errors.state} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium">City / Town</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="city"
                          placeholder="Mumbai, Delhi, Bengaluru..."
                          value={formData.city}
                          onChange={(e) => updateForm("city", e.target.value)}
                          className={`pl-10 h-12 ${errors.city ? "border-red-500" : ""}`}
                        />
                      </div>
                      <ErrorMessage message={errors.city} />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">Local Discovery</p>
                        <p className="text-sm text-muted-foreground">Your location helps customers find you in local search results</p>
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
                    <p className="text-muted-foreground">What do you sell?</p>
                  </div>

                  {errors.category && (
                    <ErrorMessage message={errors.category} />
                  )}

                  <div className="grid grid-cols-3 gap-3">
                    {storeCategories.map((cat, index) => (
                      <motion.button
                        key={cat.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => updateForm("category", cat.id)}
                        className={`relative p-3 rounded-xl text-center transition-all border-2 hover:border-primary/50 ${
                          formData.category === cat.id
                            ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                            : "border-transparent bg-muted/50 hover:bg-muted"
                        }`}
                      >
                        <div className={`w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                          formData.category === cat.id ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}>
                          <cat.Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium text-foreground block truncate">{cat.label}</span>
                        {formData.category === cat.id && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 text-white" />
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
                    <p className="text-muted-foreground">How do customers get orders?</p>
                  </div>

                  {errors.businessMode && (
                    <ErrorMessage message={errors.businessMode} />
                  )}

                  <div className="space-y-3">
                    {businessModes.map((mode, index) => (
                      <motion.button
                        key={mode.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => updateForm("businessMode", mode.id)}
                        className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                          formData.businessMode === mode.id
                            ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                            : "border-transparent bg-muted/50 hover:bg-muted hover:border-muted"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                            formData.businessMode === mode.id ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}>
                            <mode.Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-foreground">{mode.title}</h4>
                              {mode.recommended && (
                                <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                                  Best Choice
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-0.5">{mode.description}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {mode.features.map((f) => (
                                <span key={f} className="text-xs px-2 py-1 rounded-full bg-background text-muted-foreground">
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            formData.businessMode === mode.id 
                              ? "border-primary bg-primary" 
                              : "border-muted-foreground/30"
                          }`}>
                            {formData.businessMode === mode.id && (
                              <Check className="w-4 h-4 text-primary-foreground" />
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
                    <p className="text-muted-foreground">14-day free trial included</p>
                  </div>

                  {errors.plan && (
                    <ErrorMessage message={errors.plan} />
                  )}

                  <div className="space-y-3">
                    {plans.map((plan, index) => (
                      <motion.button
                        key={plan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => updateForm("plan", plan.id)}
                        className={`w-full p-4 rounded-xl text-left transition-all border-2 relative ${
                          formData.plan === plan.id
                            ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                            : plan.popular
                              ? "border-accent/50 bg-accent/5 hover:border-accent"
                              : "border-transparent bg-muted/50 hover:bg-muted"
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-2.5 left-4 px-2 py-0.5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Popular
                          </div>
                        )}
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                            formData.plan === plan.id 
                              ? "bg-primary text-primary-foreground" 
                              : plan.popular 
                                ? "bg-accent text-accent-foreground"
                                : "bg-muted"
                          }`}>
                            <plan.Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-baseline gap-2">
                              <h4 className="font-semibold text-foreground">{plan.name}</h4>
                              <span className="text-xl font-bold text-primary">{plan.price}</span>
                              <span className="text-sm text-muted-foreground">{plan.period}</span>
                            </div>
                            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                              {plan.features.slice(0, 3).map((f) => (
                                <span key={f} className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Check className="w-3 h-3 text-green-500" />
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            formData.plan === plan.id 
                              ? "border-primary bg-primary" 
                              : "border-muted-foreground/30"
                          }`}>
                            {formData.plan === plan.id && (
                              <Check className="w-4 h-4 text-primary-foreground" />
                            )}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <BadgeCheck className="w-5 h-5 text-green-500 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">No card required</span> — Start your 14-day free trial today
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
                    <p className="text-muted-foreground">Almost done! Set up your login</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => updateForm("email", e.target.value)}
                          className={`pl-10 h-12 ${errors.email ? "border-red-500" : ""}`}
                        />
                      </div>
                      <ErrorMessage message={errors.email} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Min 6 characters"
                          value={formData.password}
                          onChange={(e) => updateForm("password", e.target.value)}
                          className={`pl-10 h-12 ${errors.password ? "border-red-500" : ""}`}
                        />
                      </div>
                      <ErrorMessage message={errors.password} />
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 text-center">
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
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 mt-auto border-t border-border">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={step === 1 || isSubmitting}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            
            {step < totalSteps ? (
              <Button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !isStepValid()}
                className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
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
  );
};

export default Join;
