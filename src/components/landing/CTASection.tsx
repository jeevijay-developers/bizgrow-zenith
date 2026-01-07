import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/hooks/useScrollAnimation";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <AnimatedSection className="relative max-w-4xl mx-auto">
          {/* Background Decoration */}
          <div className="absolute inset-0 gradient-primary rounded-3xl opacity-95" />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10 text-center px-8 py-16 md:py-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 font-display">
              Ready to Grow Your
              <span className="text-gradient block">Business Digitally?</span>
            </h2>
            
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
              Join thousands of Indian retailers who are already using BizGrow 360 
              to manage their business smarter, faster, and better.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/join">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg px-8 py-6 rounded-xl shadow-glow-accent group">
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6 rounded-xl">
                Schedule a Demo
              </Button>
            </div>

            {/* Contact Options */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-foreground/80">
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Phone className="w-5 h-5" />
                <span>+91 98765 43210</span>
              </a>
              <span className="hidden sm:block">•</span>
              <a href="mailto:hello@bizgrow360.com" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Mail className="w-5 h-5" />
                <span>hello@bizgrow360.com</span>
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTASection;
