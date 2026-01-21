import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, ArrowRight, Sparkles, Store, BarChart3, MessageSquare, Heart, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import logoDarkBg from "@/assets/logo-dark-bg.png";
import ScheduleDemoModal from "./ScheduleDemoModal";

const Footer = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const footerLinks = {
    Product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Integrations", href: "#" },
      { label: "Updates", href: "#" },
    ],
    Solutions: [
      { label: "Kirana Stores", href: "#" },
      { label: "Bakeries", href: "#" },
      { label: "Clothing Stores", href: "#" },
      { label: "Electronics", href: "#" },
    ],
    Resources: [
      { label: "Blog", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Tutorials", href: "#" },
      { label: "API Docs", href: "#" },
    ],
    Company: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Press", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const features = [
    { icon: Store, label: "Digital Catalogue" },
    { icon: Sparkles, label: "AI Upload" },
    { icon: MessageSquare, label: "WhatsApp Orders" },
    { icon: BarChart3, label: "Analytics" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Schedule Demo Modal */}
      <ScheduleDemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />

      {/* CTA Section - Compact */}
      <div className="bg-gradient-to-br from-primary via-primary to-[hsl(284,100%,8%)] relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-light/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 py-10 md:py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-1.5 bg-accent/20 text-accent px-3 py-1.5 rounded-full text-xs font-medium mb-4">
              <Sparkles className="w-3 h-3" />
              Start Growing Today
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to Transform Your Business?
            </h2>
            <p className="text-white/70 text-sm mb-6 max-w-lg mx-auto">
              Join thousands of Indian retailers growing their business with BizGrow 360.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/join">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-3 rounded-lg shadow-lg shadow-accent/30 flex items-center gap-2 justify-center w-full sm:w-auto text-sm"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDemoModal(true)}
                className="border border-white/30 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2 justify-center w-full sm:w-auto text-sm"
              >
                <Calendar className="w-4 h-4" />
                Schedule Demo
              </motion.button>
            </div>
          </motion.div>

          {/* Feature badges - Compact row */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {features.map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-white/80 text-xs"
              >
                <feature.icon className="w-3 h-3 text-accent" />
                {feature.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer - Compact Grid */}
      <div className="bg-[hsl(284,100%,6%)] text-white">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <Link to="/" className="inline-block mb-4">
                <img src={logoDarkBg} alt="BizGrow 360" className="h-10 w-auto" />
              </Link>
              <p className="text-white/60 mb-4 text-sm leading-relaxed max-w-xs">
                Empowering Indian retailers with AI-powered tools to grow digitally.
              </p>
              
              {/* Contact Info - Compact */}
              <div className="space-y-2 text-xs mb-4">
                <a href="#" className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Bangalore, Karnataka</span>
                </a>
                <a href="tel:+919876543210" className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors">
                  <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>+91 98765 43210</span>
                </a>
                <a href="mailto:hello@bizgrow360.com" className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors">
                  <Mail className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>hello@bizgrow360.com</span>
                </a>
              </div>

              {/* Social Links - Compact */}
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
                  >
                    <social.icon className="w-3.5 h-3.5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links Columns - 4 columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-white/60 hover:text-accent transition-colors text-xs flex items-center gap-1 group"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="w-2.5 h-2.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar - Slim */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-white/40 text-xs text-center sm:text-left flex items-center gap-1">
                © {new Date().getFullYear()} BizGrow 360. Made with 
                <Heart className="w-3 h-3 text-destructive fill-destructive" /> 
                in India
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <a href="#" className="text-white/40 hover:text-accent transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-white/40 hover:text-accent transition-colors">
                  Terms
                </a>
                <a href="#" className="text-white/40 hover:text-accent transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
