import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, ArrowRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import logoDarkBg from "@/assets/logo-dark-bg.png";
import ScheduleDemoModal from "./ScheduleDemoModal";
import { RippleButton } from "@/components/ui/ripple-button";

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
      { label: "Kirana Stores", href: "/solutions/kirana" },
      { label: "Bakeries", href: "/solutions/bakery" },
      { label: "Clothing", href: "/solutions/clothing" },
      { label: "Electronics", href: "/solutions/electronics" },
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

  return (
    <footer className="relative overflow-hidden">
      {/* Schedule Demo Modal */}
      <ScheduleDemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />

      {/* CTA Section */}
      <div className="bg-primary relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-[80px]" />
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4 font-display">
              Ready to Grow Your Business?
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8">
              Join thousands of Indian retailers who trust BizGrow 360 to manage their stores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join">
                <RippleButton className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 h-14 text-lg shadow-lg">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </RippleButton>
              </Link>
              <RippleButton
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-14 px-8 text-lg"
                onClick={() => setShowDemoModal(true)}
              >
                Schedule Demo
              </RippleButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-foreground text-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <Link to="/" className="inline-block mb-4">
                <img src={logoDarkBg} alt="BizGrow 360" className="h-10 w-auto" />
              </Link>
              <p className="text-background/60 mb-6 text-sm leading-relaxed max-w-xs">
                Empowering Indian retailers with AI-powered tools to grow their business digitally.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2.5 text-sm mb-6">
                <a href="#" className="flex items-center gap-2 text-background/60 hover:text-accent transition-colors">
                  <MapPin className="w-4 h-4 text-accent shrink-0" />
                  <span>Bangalore, Karnataka</span>
                </a>
                <a href="tel:+919876543210" className="flex items-center gap-2 text-background/60 hover:text-accent transition-colors">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <span>+91 98765 43210</span>
                </a>
                <a href="mailto:hello@bizgrow360.com" className="flex items-center gap-2 text-background/60 hover:text-accent transition-colors">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <span>hello@bizgrow360.com</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-background/10 border border-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-background mb-4 text-sm">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-background/60 hover:text-accent transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10">
          <div className="container mx-auto px-4 py-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-background/40 text-sm text-center sm:text-left flex items-center gap-1 flex-wrap justify-center">
                © {new Date().getFullYear()} BizGrow 360. Made with 
                <Heart className="w-3.5 h-3.5 text-destructive fill-destructive inline-block mx-0.5" /> 
                in India
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a href="#" className="text-background/40 hover:text-accent transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-background/40 hover:text-accent transition-colors">
                  Terms
                </a>
                <a href="#" className="text-background/40 hover:text-accent transition-colors">
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
