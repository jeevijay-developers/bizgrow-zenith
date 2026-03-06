import { Link } from "react-router-dom";
import { 
  ArrowRight, Check, Pill, Package, TrendingUp, 
  Bell, Clock, BarChart3, Truck, MessageSquare, Tag, Users, Receipt, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const features = [
  { icon: Pill, title: "Medicine Inventory", description: "Track medicines with expiry dates, batch numbers & stock levels" },
  { icon: Receipt, title: "Prescription Management", description: "Store and manage customer prescriptions digitally" },
  { icon: MessageSquare, title: "WhatsApp Orders", description: "Receive medicine orders via WhatsApp instantly" },
  { icon: ShieldCheck, title: "Expiry Tracking", description: "Get alerts before medicines expire to reduce waste" },
  { icon: BarChart3, title: "Sales Analytics", description: "Track best-selling medicines and purchase patterns" },
  { icon: Bell, title: "Restock Alerts", description: "Never run out of essential medicines" },
];

const benefits = [
  "Manage medicines, OTC products, and health devices",
  "Track expiry dates with automated alerts",
  "Store digital prescriptions for customers",
  "Quick billing with medicine search and suggestions",
  "Organize by category — tablets, syrups, injections",
  "Maintain customer purchase history for repeat orders"
];

const PharmacyStorePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(284,100%,8%)]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-36 sm:w-48 md:w-72 h-36 sm:h-48 md:h-72 bg-accent/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-400 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <Pill className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Pharmacy & Medical Stores
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Digitize Your{" "}
                <span className="text-gradient">Pharmacy</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 mb-6 sm:mb-8 max-w-xl">
                From tracking medicine expiry to managing prescriptions — 
                run your pharmacy smarter with BizGrow 360.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/join" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 sm:px-8 gap-2 h-11 sm:h-12 md:h-14 text-sm sm:text-base w-full sm:w-auto">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative mt-6 lg:mt-0">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 p-8 sm:p-12 flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
                <div className="text-center">
                  <Pill className="w-16 h-16 sm:w-24 sm:h-24 text-teal-400 mx-auto mb-4" />
                  <p className="text-white/80 text-lg sm:text-xl font-semibold">Pharmacy Dashboard</p>
                  <p className="text-white/50 text-sm mt-2">Manage medicines, prescriptions & deliveries</p>
                </div>
              </div>
              
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white rounded-lg sm:rounded-xl p-2.5 sm:p-4 shadow-xl hidden sm:block">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs sm:text-sm">Sales Up</p>
                    <p className="text-[10px] sm:text-xs text-teal-600">+25% this month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Built for <span className="text-primary">Pharmacies</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              Features designed specifically for pharmacy and medical store management.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-5 md:p-6 hover:shadow-lg hover:border-primary/20 transition-all group"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                Why Pharmacy Owners Love{" "}
                <span className="text-primary">BizGrow 360</span>
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600" />
                    </div>
                    <span className="text-sm sm:text-base md:text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 sm:mt-8">
                <Link to="/join" className="inline-block w-full sm:w-auto">
                  <Button size="lg" className="gap-2 w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base">
                    Get Started Free
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-6 lg:mt-0">
              {[
                { icon: Users, value: "3K+", label: "Pharmacies" },
                { icon: Package, value: "2M+", label: "Medicines Listed" },
                { icon: TrendingUp, value: "30%", label: "Sales Increase" },
                { icon: Clock, value: "2hrs", label: "Saved Daily" },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 sm:p-5 md:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm border">
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary mx-auto mb-1.5 sm:mb-2" />
                  <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PharmacyStorePage;
