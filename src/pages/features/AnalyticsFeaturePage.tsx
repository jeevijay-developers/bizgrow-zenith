import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Check, BarChart3, TrendingUp, PieChart, 
  Users, ShoppingCart, Calendar, Download, Target, 
  Lightbulb, Clock, IndianRupee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { H1, H2, H3, Lead, Body, Caption } from "@/components/ui/typography";
import { EyebrowTag } from "@/components/ui/eyebrow-tag";
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
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden bg-ledger-ink">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <EyebrowTag icon={BarChart3} className="mb-6 border-ledger-paper/25 text-ledger-paper/85">
                Business Analytics
              </EyebrowTag>
              <H1 className="text-ledger-paper mb-6">
                Data-Driven{" "}
                <span className="ledger-highlight">Decisions</span>
              </H1>
              <Lead className="text-ledger-paper/70 mb-8 max-w-xl">
                Understand your business like never before. Track sales, analyze trends,
                and get AI-powered insights to grow faster.
              </Lead>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {metrics.slice(0, 2).map((metric, i) => (
                  <div key={i} className="border border-ledger-paper/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <metric.icon className="w-5 h-5 text-ledger-paper/70" />
                      <span className="text-ledger-paper/60 text-sm font-grotesk">{metric.label}</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="font-ledger text-2xl font-semibold text-ledger-paper">{metric.value}</span>
                      <span className="text-ledger-sage text-sm font-grotesk">{metric.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/join">
                  <Button size="lg" variant="ledger-inverse" className="px-8 gap-2 h-14 text-base w-full sm:w-auto">
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
              <div className="relative rounded-2xl overflow-hidden shadow-ledger border border-ledger-paper/10">
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
                className="absolute -bottom-4 -left-4 bg-ledger-paper rounded-xl p-4 shadow-ledger"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 border border-ledger-rule rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-ledger-sage" />
                  </div>
                  <div>
                    <p className="font-grotesk text-ledger-ink/55 text-sm">This Month</p>
                    <p className="font-grotesk font-semibold text-ledger-ink text-lg">+28% Growth</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="py-8 bg-white border-y border-ledger-rule">
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
                <metric.icon className="w-6 h-6 text-ledger-ink/70 mx-auto mb-2" />
                <p className="font-ledger text-xl sm:text-2xl md:text-3xl font-semibold text-ledger-ink">{metric.value}</p>
                <div className="flex items-center justify-center gap-2">
                  <Caption>{metric.label}</Caption>
                  <span className="text-ledger-sage text-xs font-grotesk font-medium">{metric.change}</span>
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
            <H2 className="mb-4">
              Complete Analytics Suite
            </H2>
            <Body className="text-lg max-w-2xl mx-auto">
              All the metrics and reports you need to understand and grow your business.
            </Body>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-ledger-rule shadow-ledger-sm p-6"
              >
                <div className="w-14 h-14 rounded-xl border border-ledger-rule bg-transparent flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-ledger-ink/70" />
                </div>
                <H3 className="mb-2">{feature.title}</H3>
                <Body>{feature.description}</Body>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Insights */}
      <section className="py-16 md:py-24 bg-ledger-paper">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <EyebrowTag icon={Lightbulb} className="mb-4">AI-Powered</EyebrowTag>
            <H2 className="mb-4">
              Smart Business Insights
            </H2>
            <Body className="text-lg max-w-2xl mx-auto">
              Our AI analyzes your data and gives you actionable recommendations.
            </Body>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-white rounded-2xl border border-ledger-rule shadow-ledger-sm p-6"
              >
                <div className="w-12 h-12 rounded-xl border border-ledger-rule bg-transparent flex items-center justify-center mb-4">
                  <insight.icon className="w-6 h-6 text-ledger-ink/70" />
                </div>
                <H3 className="mb-2">{insight.title}</H3>
                <p className="font-grotesk text-ledger-ink/65 text-sm">{insight.description}</p>
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
              <H2 className="mb-6">
                Everything in One Dashboard
              </H2>
              <Body className="text-lg mb-8">
                No need to juggle multiple tools. Get a complete view of your business
                performance in a single, beautiful dashboard.
              </Body>

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
                    <div className="w-6 h-6 rounded-full border border-ledger-sage/30 bg-ledger-sage/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-ledger-sage" />
                    </div>
                    <span className="font-grotesk text-ledger-ink/80">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/join">
                  <Button size="lg" variant="ledger" className="gap-2">
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
              className="bg-ledger-paper rounded-3xl p-8 border border-ledger-rule"
            >
              {/* Mini dashboard preview */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-ledger-rule">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-grotesk font-medium text-ledger-ink">Revenue This Week</span>
                    <span className="text-ledger-sage text-xs font-grotesk">+18%</span>
                  </div>
                  <div className="flex items-end gap-1 h-20">
                    {[40, 55, 45, 70, 65, 85, 75].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex-1 bg-ledger-ink rounded-t"
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-ledger-rule">
                    <Clock className="w-5 h-5 text-ledger-ink/70 mb-2" />
                    <p className="font-ledger text-xl sm:text-2xl font-semibold text-ledger-ink">6-8 PM</p>
                    <Caption>Peak Hours</Caption>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-ledger-rule">
                    <Target className="w-5 h-5 text-ledger-ink/70 mb-2" />
                    <p className="font-ledger text-xl sm:text-2xl font-semibold text-ledger-ink">₹245</p>
                    <Caption>Avg Order</Caption>
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