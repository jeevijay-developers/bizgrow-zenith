import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Check, MessageSquare, Bell, Send, Users, 
  Clock, Smartphone, MessageCircle, CheckCheck, Zap, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import whatsappMockup from "@/assets/feature-whatsapp-mockup.png";

const features = [
  {
    icon: Bell,
    title: "Instant Order Alerts",
    description: "Get WhatsApp notifications the moment a customer places an order."
  },
  {
    icon: Send,
    title: "One-Click Replies",
    description: "Send order confirmations and updates with pre-built message templates."
  },
  {
    icon: Users,
    title: "Customer Database",
    description: "Automatically save customer details for repeat orders and marketing."
  },
  {
    icon: Clock,
    title: "Order Tracking",
    description: "Keep customers updated with delivery status via WhatsApp messages."
  },
  {
    icon: MessageCircle,
    title: "Chat Integration",
    description: "Seamless communication between your dashboard and WhatsApp."
  },
  {
    icon: Shield,
    title: "Verified Business",
    description: "Use WhatsApp Business features for professional customer interactions."
  }
];

const workflow = [
  {
    step: "1",
    title: "Customer Orders",
    description: "Customer browses your catalogue and adds items to cart",
    icon: "🛒"
  },
  {
    step: "2",
    title: "WhatsApp Checkout",
    description: "Order is sent to you via WhatsApp with full details",
    icon: "📱"
  },
  {
    step: "3",
    title: "You Get Notified",
    description: "Instant notification on your phone and dashboard",
    icon: "🔔"
  },
  {
    step: "4",
    title: "Confirm & Fulfill",
    description: "Accept order, prepare items, and update customer",
    icon: "✅"
  }
];

const stats = [
  { value: "2B+", label: "WhatsApp Users in India" },
  { value: "98%", label: "Message Open Rate" },
  { value: "<3s", label: "Avg Response Time" },
  { value: "5x", label: "Higher Engagement" }
];

const WhatsAppOrdersPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(284,100%,8%)]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/15 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <MessageSquare className="w-4 h-4" />
                WhatsApp Integration
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Orders Straight to{" "}
                <span className="text-green-400">WhatsApp</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl">
                No app needed. Customers order from your catalogue and you receive everything 
                on WhatsApp - the app you already use every day.
              </p>
              
              <div className="flex items-center gap-6 mb-8">
                {[
                  { icon: CheckCheck, text: "Instant delivery" },
                  { icon: Smartphone, text: "Works on any phone" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <item.icon className="w-5 h-5 text-green-400" />
                    <span className="text-white/80">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/join">
                  <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 gap-2 h-14 text-base w-full sm:w-auto">
                    Connect WhatsApp
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="#how-it-works">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 text-base w-full sm:w-auto">
                    See How It Works
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src={whatsappMockup} 
                  alt="WhatsApp Orders Interface"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Notification popup */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-xl max-w-[200px]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">New Order!</p>
                    <p className="text-xs text-muted-foreground">₹456 from Priya</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Message bubble */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 bg-green-500 text-white rounded-2xl rounded-br-sm p-3 shadow-xl"
              >
                <p className="text-sm font-medium">Order confirmed! 🎉</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple <span className="text-primary">Order Flow</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From customer browsing to order fulfillment - all through WhatsApp.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflow.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-card rounded-2xl border border-border p-6 text-center hover:shadow-lg hover:border-green-500/20 transition-all h-full">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                {index < workflow.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-green-500/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              WhatsApp <span className="text-primary">Superpowers</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-green-500/20 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Message */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                See What You{" "}
                <span className="text-green-500">Receive</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Every order comes with complete details - customer info, items, address, 
                and payment method. Everything you need to fulfill the order.
              </p>
              
              <div className="space-y-4">
                {[
                  "Customer name & phone number",
                  "Complete order with item details",
                  "Delivery address (if applicable)",
                  "Payment method preference",
                  "Special instructions or notes"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link to="/join">
                  <Button size="lg" className="bg-green-500 hover:bg-green-600 gap-2">
                    Get Started with WhatsApp
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#e5ddd5] rounded-2xl p-6 shadow-xl"
            >
              <div className="bg-[#dcf8c6] rounded-xl rounded-tr-sm p-4 max-w-[85%] ml-auto mb-4 shadow">
                <p className="text-sm font-medium text-gray-800 mb-2">📦 New Order from BizGrow360</p>
                <p className="text-sm text-gray-700 whitespace-pre-line">
{`👤 Customer: Priya Sharma
📱 Phone: +91 98765 43210

🛒 Order Details:
• Tata Salt 1kg x 2 = ₹56
• Amul Butter 500g x 1 = ₹275
• Fortune Oil 1L x 1 = ₹189

💰 Total: ₹520

🏠 Delivery Address:
123, Green Park Colony
Bangalore - 560001

📝 Note: Please deliver before 6 PM`}
                </p>
                <p className="text-xs text-gray-500 text-right mt-2">2:45 PM ✓✓</p>
              </div>
              
              <div className="bg-white rounded-xl rounded-tl-sm p-4 max-w-[70%] shadow">
                <p className="text-sm text-gray-700">Order confirmed! Will deliver by 5 PM 🚚</p>
                <p className="text-xs text-gray-500 text-right mt-2">2:46 PM ✓✓</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhatsAppOrdersPage;