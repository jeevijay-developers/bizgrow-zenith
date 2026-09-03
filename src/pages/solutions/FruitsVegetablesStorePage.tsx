import { Link } from "react-router-dom";
import { 
  ArrowRight, Check, Leaf, Clock, Sun, 
  Truck, BarChart3, TrendingUp, Users, Thermometer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import fruitsMockup from "@/assets/solution-fruits-mockup.png";

const features = [
  { icon: Leaf, title: "Fresh Produce", description: "Showcase fruits and vegetables beautifully" },
  { icon: Thermometer, title: "Freshness Tracking", description: "Monitor and display freshness levels" },
  { icon: Sun, title: "Seasonal Items", description: "Highlight seasonal fruits and veggies" },
  { icon: Clock, title: "Daily Pricing", description: "Update prices based on market rates" },
  { icon: Truck, title: "Quick Delivery", description: "Same-day delivery for fresh produce" },
  { icon: TrendingUp, title: "Demand Forecast", description: "Predict what customers will need" },
];

const benefits = [
  "Daily price updates based on mandi rates",
  "Freshness indicators for all produce",
  "Seasonal fruits and vegetables highlights",
  "Weight-based pricing (per kg, per dozen)",
  "Morning fresh stock notifications",
  "Combo packs - weekly vegetable basket"
];

const FruitsVegetablesStorePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(284,100%,8%)]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Fruits & Vegetables
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Fresh Produce,{" "}
                <span className="text-gradient">Fresh Sales</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/70 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                Manage your fruits and vegetable shop with daily pricing, 
                freshness tracking, and quick delivery management.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link to="/join" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 sm:px-8 gap-2 h-12 sm:h-14 text-sm sm:text-base w-full">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img src={fruitsMockup} alt="Fruits & Vegetables Dashboard" className="w-full h-auto" />
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-sm">Fresh Stock Updated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fresh Features for <span className="text-primary">Fresh Business</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tools designed for fruits and vegetables retail.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 hover:shadow-lg hover:border-primary/20 transition-all group"
              >
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center lg:text-left">
                Why Produce Sellers Love{" "}
                <span className="text-primary">BizGrow 360</span>
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start sm:items-center gap-3"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    </div>
                    <span className="text-sm sm:text-base lg:text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 sm:mt-8 text-center lg:text-left">
                <Link to="/join">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {[
                { icon: Leaf, value: "6K+", label: "Produce Shops" },
                { icon: Truck, value: "100K+", label: "Daily Deliveries" },
                { icon: Users, value: "350K+", label: "Customers" },
                { icon: BarChart3, value: "30%", label: "Less Wastage" },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm border">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-1.5 sm:mb-2" />
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

export default FruitsVegetablesStorePage;
