import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, ArrowRight, Sparkles, Store, BarChart3, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import logoDarkBg from "@/assets/logo-dark-bg.png";

const Footer = () => {
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
      {/* CTA Section */}
      <div className="bg-gradient-to-br from-primary via-primary to-[hsl(284,100%,8%)] relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-light/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 py-16 md:py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Start Growing Today
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of Indian retailers who are already growing their business with BizGrow 360.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-4 rounded-xl shadow-lg shadow-accent/30 flex items-center gap-2 justify-center w-full sm:w-auto"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/auth">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl flex items-center gap-2 justify-center w-full sm:w-auto"
                >
                  Seller Login
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {features.map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-white/80 text-sm"
              >
                <feature.icon className="w-4 h-4 text-accent" />
                {feature.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[hsl(284,100%,6%)] text-white">
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 lg:col-span-2">
              <Link to="/" className="inline-block mb-6">
                <img src={logoDarkBg} alt="BizGrow 360" className="h-12 w-auto" />
              </Link>
              <p className="text-white/60 mb-6 max-w-sm text-sm sm:text-base leading-relaxed">
                Empowering Indian retailers with AI-powered tools to grow their business 
                digitally. Simple, smart, and made for Bharat.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <a href="#" className="flex items-center gap-3 text-white/60 hover:text-accent transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <span>Bangalore, Karnataka, India</span>
                </a>
                <a href="tel:+919876543210" className="flex items-center gap-3 text-white/60 hover:text-accent transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <span>+91 98765 43210</span>
                </a>
                <a href="mailto:hello@bizgrow360.com" className="flex items-center gap-3 text-white/60 hover:text-accent transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <span>hello@bizgrow360.com</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-white/60 hover:text-accent transition-colors text-sm flex items-center gap-1 group"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/40 text-sm text-center sm:text-left">
                © {new Date().getFullYear()} BizGrow 360. All rights reserved. Made with ❤️ in India
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a href="#" className="text-white/40 hover:text-accent transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-white/40 hover:text-accent transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-white/40 hover:text-accent transition-colors">
                  Cookie Policy
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