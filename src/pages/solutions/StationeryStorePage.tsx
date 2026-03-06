import { Link } from "react-router-dom";
import { 
  ArrowRight, Check, BookOpen, Package, TrendingUp, 
  Bell, Clock, BarChart3, Truck, MessageSquare, Tag, Users, PenTool, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const features = [
  { icon: BookOpen, title: "Book & Supplies Inventory", description: "Track notebooks, pens, art supplies & office stationery" },
  { icon: Tag, title: "School Season Ready", description: "Manage bulk orders during school opening seasons" },
  { icon: MessageSquare, title: "WhatsApp Orders", description: "Receive orders from schools and offices via WhatsApp" },
  { icon: Layers, title: "Category Management", description: "Organize by type — writing, art, office, school supplies" },
  { icon: BarChart3, title: "Sales Analytics", description: "Track seasonal demand and best-selling products" },
  { icon: Bell, title: "Stock Alerts", description: "Get alerts for popular items running low" },
];

const benefits = [
  "Manage books, notebooks, pens & office supplies",
  "Handle bulk school orders during season openings",
  "Quick billing for walk-in customers",
  "Organize products by brand — Classmate, Camlin, Doms",
  "Track seasonal demand patterns",
  "Bulk upload products with Excel import"
];

const StationeryStorePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(284,100%,8%)]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-36 sm:w-48 md:w-72 h-36 sm:h-48 md:h-72 bg-accent/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-400 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <PenTool className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Stationery & Book Stores
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Digitize Your{" "}
                <span className="text-gradient">Stationery Store</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 mb-6 sm:mb-8 max-w-xl">
                From managing books and supplies to handling bulk school orders — 
                run your stationery store efficiently with BizGrow 360.
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
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 p-8 sm:p-12 flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 sm:w-24 sm:h-24 text-indigo-400 mx-auto mb-4" />
                  <p className="text-white/80 text-lg sm:text-xl font-semibold">Stationery Dashboard</p>
                  <p className="text-white/50 text-sm mt-2">Manage inventory, school orders & billing</p>
                </div>
              </div>
              
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white rounded-lg sm:rounded-xl p-2.5 sm:p-4 shadow-xl hidden sm:block">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs sm:text-sm">Sales Up</p>
                    <p className="text-[10px] sm:text-xs text-indigo-600">+22% this month</p>
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
              Built for <span className="text-primary">Stationery Stores</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              Features designed specifically for stationery and book store management.
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
                Why Stationery Store Owners Love{" "}
                <span className="text-primary">BizGrow 360</span>
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
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
                { icon: Users, value: "1.5K+", label: "Stationery Stores" },
                { icon: Package, value: "800K+", label: "Products Listed" },
                { icon: TrendingUp, value: "28%", label: "Sales Increase" },
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

export default StationeryStorePage;
