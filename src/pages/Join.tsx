import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, ArrowRight, Check, Store, MapPin, Building2, Truck, CreditCard,
  Phone, User, MessageCircle, Sparkles, Shield, Clock, Zap, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RippleButton } from "@/components/ui/ripple-button";
import { validateStep, type JoinFormData } from "@/lib/validations";
import logoDarkBg from "@/assets/logo-dark-bg.png";

const storeCategories = [
  { id: "kirana", label: "Kirana Store", icon: "🛒", desc: "General & grocery items" },
  { id: "bakery", label: "Bakery", icon: "🥐", desc: "Fresh baked goods" },
  { id: "dairy", label: "Dairy Shop", icon: "🥛", desc: "Milk & dairy products" },
  { id: "clothing", label: "Clothing Store", icon: "👕", desc: "Fashion & apparel" },
  { id: "cosmetic", label: "Cosmetics", icon: "💄", desc: "Beauty & skincare" },
  { id: "mobile", label: "Mobile & Electronics", icon: "📱", desc: "Gadgets & accessories" },
  { id: "fruits", label: "Fruits & Vegetables", icon: "🍎", desc: "Fresh produce" },
  { id: "electrical", label: "Electrical Supplies", icon: "⚡", desc: "Electrical goods" },
  { id: "pharmacy", label: "Pharmacy", icon: "💊", desc: "Medicines & health" },
  { id: "stationery", label: "Stationery", icon: "📚", desc: "Books & supplies" },
  { id: "hardware", label: "Hardware", icon: "🔧", desc: "Tools & equipment" },
  { id: "other", label: "Other", icon: "🏪", desc: "Other retail" },
];

const businessModes = [
  {
    id: "shop-only",
    title: "Shop Only (Takeaway)",
    description: "Customers visit your shop and pick up orders. Perfect for walk-in customers.",
    icon: Store,
    features: ["Walk-in customers", "Counter billing", "In-store experience"],
  },
  {
    id: "shop-delivery",
    title: "Shop + Home Delivery",
    description: "Offer both in-store pickup and home delivery to reach more customers.",
    icon: Truck,
    features: ["Home delivery", "Order tracking", "Delivery radius setup"],
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
    icon: Zap,
  },
  { 
    id: "pro", 
    name: "Pro", 
    price: "₹999", 
    period: "/month",
    features: ["Unlimited products", "AI Photo Upload", "Analytics dashboard", "Priority support", "Custom domain"],
    popular: true,
    icon: Sparkles,
  },
  { 
    id: "enterprise", 
    name: "Enterprise", 
    price: "Custom",
    period: "",
    features: ["Multi-store management", "API access", "Dedicated manager", "Custom integrations", "SLA guarantee"],
    icon: Shield,
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
  { id: 1, title: "Identity", icon: Store },
  { id: 2, title: "Location", icon: MapPin },
  { id: 3, title: "Category", icon: Building2 },
  { id: 4, title: "Mode", icon: Truck },
  { id: 5, title: "Plan", icon: CreditCard },
];

const stepVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
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

const Join = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const totalSteps = 5;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState<Partial<JoinFormData>>({
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
  });

  const updateForm = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateCurrentStep = () => {
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
      setStep((prev) => Math.min(prev + 1, totalSteps));
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
    const result = validateStep(step, formData);
    return result.success;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-[hsl(284,100%,8%)] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-light/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-4 md:py-6 relative z-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
          <img src={logoDarkBg} alt="BizGrow 360" className="h-8 md:h-10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 md:py-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Hero text */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 md:mb-8"
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-2">
              Join <span className="text-gradient">BizGrow 360</span>
            </h1>
            <p className="text-primary-foreground/70 text-sm md:text-base">
              Set up your digital store in just 5 minutes
            </p>
          </motion.div>

          {/* Step Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 md:mb-8"
          >
            <div className="flex items-center justify-between max-w-md mx-auto">
              {steps.map((s, index) => (
                <div key={s.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <motion.div 
                      animate={{ 
                        scale: step === s.id ? 1.1 : 1,
                        backgroundColor: step > s.id 
                          ? "hsl(var(--accent))" 
                          : step === s.id 
                            ? "hsl(var(--accent))" 
                            : "hsl(var(--primary-foreground) / 0.1)"
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        step >= s.id ? "shadow-glow-accent" : ""
                      }`}
                    >
                      {step > s.id ? (
                        <Check className="w-5 h-5 text-accent-foreground" />
                      ) : (
                        <s.icon className={`w-5 h-5 ${step === s.id ? "text-accent-foreground" : "text-primary-foreground/50"}`} />
                      )}
                    </motion.div>
                    <span className={`text-xs mt-1.5 hidden md:block transition-colors ${
                      step >= s.id ? "text-primary-foreground" : "text-primary-foreground/40"
                    }`}>
                      {s.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <motion.div 
                      className="w-8 md:w-16 h-0.5 mx-1 md:mx-2"
                      animate={{
                        backgroundColor: step > s.id 
                          ? "hsl(var(--accent))" 
                          : "hsl(var(--primary-foreground) / 0.2)"
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card/95 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl border border-border/50 overflow-hidden"
          >
            <div className="p-6 md:p-8 lg:p-10">
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
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="text-center mb-6 md:mb-8">
                      <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                        <Store className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-card-foreground">Business Identity</h2>
                      <p className="text-muted-foreground mt-1 text-sm md:text-base">Tell us about your store</p>
                    </div>

                    <div className="space-y-4 md:space-y-5">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="storeName" className="flex items-center gap-2">
                            <Store className="w-4 h-4 text-primary" />
                            Store Name *
                          </Label>
                          <Input
                            id="storeName"
                            placeholder="e.g., Sharma General Store"
                            value={formData.storeName}
                            onChange={(e) => updateForm("storeName", e.target.value)}
                            className={`h-11 md:h-12 ${errors.storeName ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          />
                          <ErrorMessage message={errors.storeName} />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="ownerName" className="flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            Owner Name *
                          </Label>
                          <Input
                            id="ownerName"
                            placeholder="e.g., Rajesh Sharma"
                            value={formData.ownerName}
                            onChange={(e) => updateForm("ownerName", e.target.value)}
                            className={`h-11 md:h-12 ${errors.ownerName ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          />
                          <ErrorMessage message={errors.ownerName} />
                        </div>
                      </div>
                      
                      <div className="space-y-1.5">
                        <Label htmlFor="mobile" className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary" />
                          Mobile Number *
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">+91</span>
                          <Input
                            id="mobile"
                            placeholder="9876543210"
                            value={formData.mobile}
                            onChange={(e) => updateForm("mobile", e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className={`h-11 md:h-12 pl-12 ${errors.mobile ? "border-destructive focus-visible:ring-destructive" : ""}`}
                            maxLength={10}
                          />
                        </div>
                        <ErrorMessage message={errors.mobile} />
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="sameAsWhatsapp"
                            checked={formData.sameAsWhatsapp}
                            onChange={(e) => updateForm("sameAsWhatsapp", e.target.checked)}
                            className="w-4 h-4 rounded border-border accent-primary"
                          />
                          <Label htmlFor="sameAsWhatsapp" className="text-sm cursor-pointer">
                            WhatsApp number is same as mobile
                          </Label>
                        </div>
                        
                        <AnimatePresence>
                          {!formData.sameAsWhatsapp && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-1.5 overflow-hidden"
                            >
                              <Label htmlFor="whatsapp" className="flex items-center gap-2">
                                <MessageCircle className="w-4 h-4 text-green-500" />
                                WhatsApp Number *
                              </Label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">+91</span>
                                <Input
                                  id="whatsapp"
                                  placeholder="9876543210"
                                  value={formData.whatsapp}
                                  onChange={(e) => updateForm("whatsapp", e.target.value.replace(/\D/g, '').slice(0, 10))}
                                  className={`h-11 md:h-12 pl-12 ${errors.whatsapp ? "border-destructive focus-visible:ring-destructive" : ""}`}
                                  maxLength={10}
                                />
                              </div>
                              <ErrorMessage message={errors.whatsapp} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
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
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="text-center mb-6 md:mb-8">
                      <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                        <MapPin className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-card-foreground">Store Location</h2>
                      <p className="text-muted-foreground mt-1 text-sm md:text-base">Where is your store located?</p>
                    </div>

                    <div className="space-y-4 md:space-y-5">
                      <div className="space-y-1.5">
                        <Label htmlFor="state">State *</Label>
                        <select
                          id="state"
                          value={formData.state}
                          onChange={(e) => updateForm("state", e.target.value)}
                          className={`w-full h-11 md:h-12 px-4 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                            errors.state ? "border-destructive focus:ring-destructive/50" : "border-input"
                          }`}
                        >
                          <option value="">Select your state</option>
                          {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                        <ErrorMessage message={errors.state} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="city">City / Town *</Label>
                        <Input
                          id="city"
                          placeholder="e.g., Jaipur"
                          value={formData.city}
                          onChange={(e) => updateForm("city", e.target.value)}
                          className={`h-11 md:h-12 ${errors.city ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                        <ErrorMessage message={errors.city} />
                      </div>
                    </div>

                    {/* Location tip */}
                    <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20">
                      <p className="text-sm text-muted-foreground">
                        💡 <strong className="text-foreground">Tip:</strong> Your store location helps customers find you easily in local searches.
                      </p>
                    </div>
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
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="text-center mb-6 md:mb-8">
                      <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                        <Building2 className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-card-foreground">Store Category</h2>
                      <p className="text-muted-foreground mt-1 text-sm md:text-base">What type of products do you sell?</p>
                    </div>

                    {errors.category && (
                      <div className="mb-4">
                        <ErrorMessage message={errors.category} />
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {storeCategories.map((category, index) => (
                        <motion.button
                          key={category.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => updateForm("category", category.id)}
                          className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 group hover:scale-[1.02] ${
                            formData.category === category.id
                              ? "border-primary bg-primary/5 shadow-lg"
                              : "border-border hover:border-primary/50 hover:bg-secondary/50"
                          }`}
                        >
                          <span className="text-2xl md:text-3xl block mb-2">{category.icon}</span>
                          <span className="font-medium text-card-foreground text-sm md:text-base block">{category.label}</span>
                          <span className="text-xs text-muted-foreground hidden md:block">{category.desc}</span>
                          {formData.category === category.id && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                            >
                              <Check className="w-3 h-3 text-primary-foreground" />
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
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="text-center mb-6 md:mb-8">
                      <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                        <Truck className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-card-foreground">Business Mode</h2>
                      <p className="text-muted-foreground mt-1 text-sm md:text-base">How do customers get their orders?</p>
                    </div>

                    {errors.businessMode && (
                      <div className="mb-4">
                        <ErrorMessage message={errors.businessMode} />
                      </div>
                    )}

                    <div className="space-y-4">
                      {businessModes.map((mode, index) => (
                        <motion.button
                          key={mode.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => updateForm("businessMode", mode.id)}
                          className={`w-full p-5 md:p-6 rounded-xl border-2 text-left transition-all relative overflow-hidden group hover:scale-[1.01] ${
                            formData.businessMode === mode.id
                              ? "border-primary bg-primary/5 shadow-lg"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          {mode.recommended && (
                            <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                              Recommended
                            </span>
                          )}
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              formData.businessMode === mode.id ? "bg-primary" : "bg-secondary group-hover:bg-primary/10"
                            }`}>
                              <mode.icon className={`w-6 h-6 md:w-7 md:h-7 ${
                                formData.businessMode === mode.id ? "text-primary-foreground" : "text-primary"
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-card-foreground text-base md:text-lg">{mode.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{mode.description}</p>
                              <div className="flex flex-wrap gap-2 mt-3">
                                {mode.features.map((f) => (
                                  <span key={f} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                              formData.businessMode === mode.id 
                                ? "border-primary bg-primary" 
                                : "border-border"
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
                    custom={direction}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="text-center mb-6 md:mb-8">
                      <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                        <CreditCard className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-card-foreground">Choose Your Plan</h2>
                      <p className="text-muted-foreground mt-1 text-sm md:text-base">All plans include a 14-day free trial</p>
                    </div>

                    {errors.plan && (
                      <div className="mb-4">
                        <ErrorMessage message={errors.plan} />
                      </div>
                    )}

                    <div className="space-y-4">
                      {plans.map((plan, index) => (
                        <motion.button
                          key={plan.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => updateForm("plan", plan.id)}
                          className={`w-full p-5 md:p-6 rounded-xl border-2 text-left transition-all relative overflow-hidden group hover:scale-[1.01] ${
                            formData.plan === plan.id
                              ? "border-primary bg-primary/5 shadow-lg"
                              : plan.popular 
                                ? "border-accent/50 hover:border-accent"
                                : "border-border hover:border-primary/50"
                          }`}
                        >
                          {plan.popular && (
                            <div className="absolute top-0 right-0 bg-gradient-to-r from-accent to-yellow-dark text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-bl-xl flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Most Popular
                            </div>
                          )}
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0 ${
                              formData.plan === plan.id 
                                ? "gradient-primary" 
                                : plan.popular 
                                  ? "gradient-accent" 
                                  : "bg-secondary"
                            }`}>
                              <plan.icon className={`w-6 h-6 md:w-7 md:h-7 ${
                                formData.plan === plan.id || plan.popular ? "text-primary-foreground" : "text-primary"
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline gap-2">
                                <h3 className="font-semibold text-card-foreground text-lg">{plan.name}</h3>
                                <span className="text-2xl md:text-3xl font-bold text-primary">{plan.price}</span>
                                <span className="text-muted-foreground text-sm">{plan.period}</span>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-3">
                                {plan.features.map((f) => (
                                  <span key={f} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full flex items-center gap-1">
                                    <Check className="w-3 h-3 text-green-500" />
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                              formData.plan === plan.id 
                                ? "border-primary bg-primary" 
                                : "border-border"
                            }`}>
                              {formData.plan === plan.id && (
                                <Check className="w-4 h-4 text-primary-foreground" />
                              )}
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {/* Free trial note */}
                    <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                      <Clock className="w-5 h-5 text-green-500 shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">14-day free trial</strong> included with all plans. No credit card required to start.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="gap-2 h-11 md:h-12 px-4 md:px-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>
                
                {step < totalSteps ? (
                  <RippleButton
                    onClick={nextStep}
                    className="bg-primary text-primary-foreground gap-2 h-11 md:h-12 px-6 md:px-8"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </RippleButton>
                ) : (
                  <RippleButton
                    onClick={() => {
                      if (validateCurrentStep()) {
                        // Handle form submission
                        console.log("Form submitted:", formData);
                      }
                    }}
                    className="gradient-accent text-accent-foreground font-bold gap-2 h-11 md:h-12 px-6 md:px-8 shadow-glow-accent"
                  >
                    <Sparkles className="w-4 h-4" />
                    Start Free Trial
                    <ArrowRight className="w-4 h-4" />
                  </RippleButton>
                )}
              </div>
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 text-primary-foreground/60 text-xs md:text-sm"
          >
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Setup in 5 mins</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              <span>24/7 Support</span>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Join;
