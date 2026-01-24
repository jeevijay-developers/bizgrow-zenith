import { forwardRef } from "react";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { RippleButton } from "@/components/ui/ripple-button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/hooks/useScrollAnimation";

const CTASection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="py-16 md:py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <AnimatedSection className="relative max-w-4xl mx-auto">
          {/* Background Decoration */}
          <div className="absolute inset-0 gradient-primary rounded-2xl md:rounded-3xl opacity-95" />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/30 rounded-full blur-3xl hidden md:block" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl hidden md:block" />

          {/* Content */}
          <div className="relative z-10 text-center px-6 py-12 md:px-8 md:py-16 lg:py-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 md:mb-6 font-display">
              Ready to Grow Your
              <span className="text-gradient block mt-1">Business Digitally?</span>
            </h2>
            
            <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 md:mb-10 px-2">
              Join thousands of Indian retailers who are already using BizGrow 360 
              to manage their business smarter, faster, and better.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 md:mb-12 px-4 sm:px-0">
              <Link to="/join" className="w-full sm:w-auto">
                <RippleButton size="lg" variant="glow-accent" className="font-bold group w-full sm:w-auto h-12 sm:h-14">
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </RippleButton>
              </Link>
              <RippleButton size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-12 sm:h-14 w-full sm:w-auto">
                Schedule a Demo
              </RippleButton>
            </div>

            {/* Contact Options */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-primary-foreground/80">
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-primary-foreground transition-colors text-sm md:text-base">
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                <span>+91 98765 43210</span>
              </a>
              <span className="hidden sm:block">•</span>
              <a href="mailto:hello@bizgrow360.com" className="flex items-center gap-2 hover:text-primary-foreground transition-colors text-sm md:text-base">
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
                <span>hello@bizgrow360.com</span>
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
});

CTASection.displayName = "CTASection";

export default CTASection;