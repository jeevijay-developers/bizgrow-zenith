import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Check, BarChart3, TrendingUp, PieChart, 
  Users, ShoppingCart, Calendar, Download, Target, 
  Lightbulb, Clock, IndianRupee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import analyticsMockup from "@/assets/feature-analytics-mockup.png";

const features = [
  {
    icon: TrendingUp,
    title: "Sales Trends",
    description: "Track daily, weekly, and monthly sales with beautiful charts."
  },
  {
    icon: ShoppingCart,
    title: "Order Analytics",
    description: "Monitor order volume, average order value, and completion rates."
  },
  {
    icon: Users,
    title: "Customer Insights",
    description: "Understand your customers - new vs returning, spending patterns."
  },
  {
    icon: PieChart,
    title: "Product Performance",
    description: "See your best sellers, slow movers, and category breakdown."
  },
  {
    icon: Calendar,
    title: "Time Analysis",
    description: "Discover your peak hours and busiest days of the week."
  },
  {
    icon: Download,
    title: "Export Reports",
    description: "Download reports in Excel or PDF for accounting and planning."
  }
];

const metrics = [
  { icon: IndianRupee, label: "Total Revenue", value: "₹2,45,678", change: "+23%" },
  { icon: ShoppingCart, label: "Total Orders", value: "1,234", change: "+18%" },
  { icon: Users, label: "Customers", value: "856", change: "+12%" },
  { icon: Target, label: "Avg Order Value", value: "₹199", change: "+8%" }
];

const insights = [
  {
    icon: Lightbulb,
    title: "Peak Hours",
    description: "Most orders come between 6-8 PM. Consider offering flash deals during this time."
  },
  {
    icon: TrendingUp,
    title: "Growing Category",
    description: "Dairy products grew 45% this month. Stock up on milk and butter."
  },
  {
    icon: Users,
    title: "Loyal Customers",
    description: "32% of customers ordered 3+ times. Launch a loyalty program!"
  }
];

const AnalyticsFeaturePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(284,100%,8%)]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-light/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                <BarChart3 className="w-4 h-4" />
                Business Analytics
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Data-Driven{" "}
                <span className="text-gradient">Decisions</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl">
                Understand your business like never before. Track sales, analyze trends, 
                and get AI-powered insights to grow faster.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {metrics.slice(0, 2).map((metric, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <metric.icon className="w-5 h-5 text-accent" />
                      <span className="text-white/60 text-sm">{metric.label}</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-white">{metric.value}</span>
                      <span className="text-green-400 text-sm">{metric.change}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/join">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 gap-2 h-14 text-base w-full sm:w-auto">
                    Start Tracking Free
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src={analyticsMockup} 
                  alt="Analytics Dashboard"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Floating chart */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="font-bold text-lg">+28% Growth</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="py-8 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <metric.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-bold">{metric.value}</p>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-muted-foreground text-sm">{metric.label}</p>
                  <span className="text-green-500 text-xs font-medium">{metric.change}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete <span className="text-primary">Analytics Suite</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              All the metrics and reports you need to understand and grow your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Insights */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Lightbulb className="w-4 h-4" />
              AI-Powered
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Smart <span className="text-primary">Business Insights</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our AI analyzes your data and gives you actionable recommendations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                  <insight.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{insight.title}</h3>
                <p className="text-muted-foreground text-sm">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Everything in{" "}
                <span className="text-primary">One Dashboard</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                No need to juggle multiple tools. Get a complete view of your business 
                performance in a single, beautiful dashboard.
              </p>
              
              <div className="space-y-4">
                {[
                  "Real-time sales and order updates",
                  "Visual charts and graphs",
                  "Compare performance across periods",
                  "Mobile-friendly dashboard",
                  "Export data for accounting",
                  "Daily/weekly email summaries"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link to="/join">
                  <Button size="lg" className="gap-2">
                    Start Tracking Your Business
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 border border-primary/10"
            >
              {/* Mini dashboard preview */}
              <div className="space-y-4">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">Revenue This Week</span>
                    <span className="text-green-500 text-xs">+18%</span>
                  </div>
                  <div className="flex items-end gap-1 h-20">
                    {[40, 55, 45, 70, 65, 85, 75].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t"
                      />
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <Clock className="w-5 h-5 text-primary mb-2" />
                    <p className="text-2xl font-bold">6-8 PM</p>
                    <p className="text-xs text-muted-foreground">Peak Hours</p>
                  </div>
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <Target className="w-5 h-5 text-primary mb-2" />
                    <p className="text-2xl font-bold">₹245</p>
                    <p className="text-xs text-muted-foreground">Avg Order</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AnalyticsFeaturePage;