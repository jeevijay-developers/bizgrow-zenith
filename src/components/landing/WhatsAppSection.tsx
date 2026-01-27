import { motion } from "framer-motion";
import { MessageSquare, Send, CheckCheck, Bell, ArrowRight, Phone, ShoppingCart, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { RippleButton } from "@/components/ui/ripple-button";

const chatMessages = [
  { type: "customer", message: "Bhaiya, 2kg Aata aur 1L Oil dena", time: "10:30 AM" },
  { type: "system", message: "🛒 Order received! Items: Aata 2kg (₹85), Oil 1L (₹180). Total: ₹265", time: "10:30 AM" },
  { type: "seller", message: "Order ready! Delivery in 30 mins 🚚", time: "10:32 AM" },
  { type: "customer", message: "Shukriya bhaiya! 👍", time: "10:33 AM" },
];

const whatsappFeatures = [
  { 
    icon: ShoppingCart, 
    title: "No App Download", 
    description: "Customers order directly via WhatsApp" 
  },
  { 
    icon: Bell, 
    title: "Instant Alerts", 
    description: "Real-time order notifications" 
  },
  { 
    icon: Clock, 
    title: "Quick Response", 
    description: "Manage orders with one tap" 
  },
  { 
    icon: CheckCheck, 
    title: "Order Tracking", 
    description: "Status updates to customers" 
  },
];

const WhatsAppSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-[5%] w-72 h-72 bg-green-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6">
              <MessageSquare className="w-4 h-4 text-green-500" />
              <span className="text-sm font-semibold text-green-600">WhatsApp Orders</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 font-display">
              Orders via WhatsApp
              <span className="text-green-500 block mt-2">Where Customers Are</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Your customers don't need to download any app. They browse your digital catalogue 
              and order directly on WhatsApp. You manage everything from one dashboard.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {whatsappFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-muted/50 rounded-xl p-4 border border-border hover:border-green-500/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="font-bold text-foreground text-sm">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/join">
                <RippleButton size="lg" className="bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 text-white font-bold h-12 px-6 group">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Enable WhatsApp Orders
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </RippleButton>
              </Link>
            </div>
          </motion.div>

          {/* Right - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            {/* Phone Frame */}
            <div className="relative w-[300px] sm:w-[340px]">
              {/* Phone Body */}
              <div className="bg-gray-900 rounded-[40px] p-2 shadow-2xl">
                {/* Screen */}
                <div className="bg-white rounded-[32px] overflow-hidden">
                  {/* WhatsApp Header */}
                  <div className="bg-green-600 px-4 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-bold text-sm">Sharma Kirana Store</p>
                      <p className="text-white/70 text-xs">Online</p>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="bg-[#e5ddd5] p-3 min-h-[350px] space-y-3">
                    {chatMessages.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.15 }}
                        className={`flex ${msg.type === "customer" ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-lg px-3 py-2 shadow-sm ${
                            msg.type === "customer"
                              ? "bg-white"
                              : msg.type === "system"
                              ? "bg-amber-100"
                              : "bg-green-100"
                          }`}
                        >
                          <p className="text-gray-800 text-sm">{msg.message}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-[10px] text-gray-500">{msg.time}</span>
                            {msg.type !== "customer" && (
                              <CheckCheck className="w-3 h-3 text-blue-500" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Input Area */}
                  <div className="bg-gray-100 px-3 py-2 flex items-center gap-2">
                    <div className="flex-1 bg-white rounded-full px-4 py-2">
                      <p className="text-gray-400 text-sm">Type a message</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <Send className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-8 bg-green-500/20 rounded-[60px] blur-3xl -z-10" />
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -right-4 top-1/4 bg-green-500 text-white rounded-xl px-4 py-2 shadow-xl"
            >
              <p className="text-sm font-bold">New Order! 🔔</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppSection;
