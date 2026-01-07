import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Store, MapPin, Building2, Truck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoDarkBg from "@/assets/logo-dark-bg.png";

const storeCategories = [
  { id: "kirana", label: "Kirana Store", icon: "🛒" },
  { id: "bakery", label: "Bakery", icon: "🥐" },
  { id: "dairy", label: "Dairy Shop", icon: "🥛" },
  { id: "clothing", label: "Clothing Store", icon: "👕" },
  { id: "cosmetic", label: "Cosmetics", icon: "💄" },
  { id: "mobile", label: "Mobile & Electronics", icon: "📱" },
  { id: "fruits", label: "Fruits & Vegetables", icon: "🍎" },
  { id: "electrical", label: "Electrical Supplies", icon: "⚡" },
];

const businessModes = [
  {
    id: "shop-only",
    title: "Shop Only (Takeaway)",
    description: "Customers visit your shop and pick up orders",
    icon: Store,
  },
  {
    id: "shop-delivery",
    title: "Shop + Home Delivery",
    description: "Both in-store pickup and home delivery available",
    icon: Truck,
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

const Join = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    storeName: "",
    ownerName: "",
    mobile: "",
    whatsapp: "",
    state: "",
    city: "",
    category: "",
    businessMode: "",
    plan: "",
  });

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.storeName && formData.ownerName && formData.mobile && formData.whatsapp;
      case 2:
        return formData.state && formData.city;
      case 3:
        return formData.category;
      case 4:
        return formData.businessMode;
      case 5:
        return formData.plan;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <img src={logoDarkBg} alt="BizGrow 360" className="h-10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary-foreground/80 text-sm">Step {step} of {totalSteps}</span>
              <span className="text-primary-foreground/80 text-sm">{Math.round((step / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-500 rounded-full"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-card rounded-2xl shadow-2xl p-8 md:p-10">
            {/* Step 1: Business Identity */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center">
                    <Store className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold text-card-foreground">Business Identity</h2>
                  <p className="text-muted-foreground mt-2">Tell us about your store</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="storeName">Store Name *</Label>
                    <Input
                      id="storeName"
                      placeholder="e.g., Sharma General Store"
                      value={formData.storeName}
                      onChange={(e) => updateForm("storeName", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerName">Owner Name *</Label>
                    <Input
                      id="ownerName"
                      placeholder="e.g., Rajesh Sharma"
                      value={formData.ownerName}
                      onChange={(e) => updateForm("ownerName", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <Input
                      id="mobile"
                      placeholder="e.g., 9876543210"
                      value={formData.mobile}
                      onChange={(e) => updateForm("mobile", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                    <Input
                      id="whatsapp"
                      placeholder="e.g., 9876543210"
                      value={formData.whatsapp}
                      onChange={(e) => updateForm("whatsapp", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold text-card-foreground">Store Location</h2>
                  <p className="text-muted-foreground mt-2">Where is your store located?</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <select
                      id="state"
                      value={formData.state}
                      onChange={(e) => updateForm("state", e.target.value)}
                      className="w-full mt-1.5 h-10 px-3 rounded-md border border-input bg-background text-foreground"
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="e.g., Jaipur"
                      value={formData.city}
                      onChange={(e) => updateForm("city", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Store Category */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold text-card-foreground">Store Category</h2>
                  <p className="text-muted-foreground mt-2">What type of products do you sell?</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {storeCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => updateForm("category", category.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        formData.category === category.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{category.icon}</span>
                      <span className="font-medium text-card-foreground">{category.label}</span>
                      {formData.category === category.id && (
                        <Check className="w-5 h-5 text-primary absolute top-2 right-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Business Mode */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center">
                    <Truck className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold text-card-foreground">Business Mode</h2>
                  <p className="text-muted-foreground mt-2">How do customers get their orders?</p>
                </div>

                <div className="space-y-4">
                  {businessModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => updateForm("businessMode", mode.id)}
                      className={`w-full p-6 rounded-xl border-2 text-left transition-all flex items-start gap-4 ${
                        formData.businessMode === mode.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        formData.businessMode === mode.id ? "bg-primary" : "bg-secondary"
                      }`}>
                        <mode.icon className={`w-6 h-6 ${
                          formData.businessMode === mode.id ? "text-primary-foreground" : "text-primary"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-card-foreground">{mode.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{mode.description}</p>
                      </div>
                      {formData.businessMode === mode.id && (
                        <Check className="w-6 h-6 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Plan Selection */}
            {step === 5 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center">
                    <CreditCard className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold text-card-foreground">Choose Your Plan</h2>
                  <p className="text-muted-foreground mt-2">Start with a 14-day free trial</p>
                </div>

                <div className="space-y-4">
                  {[
                    { id: "starter", name: "Starter", price: "₹499/mo", features: ["100 products", "Basic features"] },
                    { id: "pro", name: "Pro", price: "₹999/mo", features: ["Unlimited products", "AI Upload", "Analytics"], popular: true },
                    { id: "enterprise", name: "Enterprise", price: "Custom", features: ["Multi-store", "API access", "Priority support"] },
                  ].map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => updateForm("plan", plan.id)}
                      className={`w-full p-6 rounded-xl border-2 text-left transition-all relative ${
                        formData.plan === plan.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-3 right-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                          Recommended
                        </span>
                      )}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-card-foreground text-lg">{plan.name}</h3>
                          <p className="text-2xl font-bold text-primary mt-1">{plan.price}</p>
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {plan.features.map((f) => (
                              <span key={f} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                        {formData.plan === plan.id && (
                          <Check className="w-6 h-6 text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              
              {step < totalSteps ? (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="bg-primary text-primary-foreground gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  disabled={!isStepValid()}
                  className="bg-accent text-accent-foreground font-bold gap-2"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Trust Note */}
          <p className="text-center text-primary-foreground/60 text-sm mt-6">
            🔒 Your data is secure. We never share your information.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Join;
