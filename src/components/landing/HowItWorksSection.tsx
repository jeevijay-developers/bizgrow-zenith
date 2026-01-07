import { UserPlus, Store, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Sign Up",
    description: "Create your account in 2 minutes. Enter your store details, choose your category, and you're ready to go.",
  },
  {
    icon: Store,
    number: "02", 
    title: "Setup Your Store",
    description: "Add products via AI photo upload or our master library. Customize your digital catalogue and share with customers.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Start Selling",
    description: "Receive orders on WhatsApp, manage inventory, generate bills, and watch your business grow digitally.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-4">
            Simple & Easy
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-display">
            Get Started in
            <span className="text-primary"> 3 Simple Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            No technical knowledge required. If you can use WhatsApp, you can use BizGrow 360.
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-accent to-primary" />
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={step.title} className="relative text-center">
                {/* Step Number Badge */}
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                    <step.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-accent-foreground">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow (hidden on last step and mobile) */}
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-24 -right-6 w-6 h-6 text-primary transform translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/join"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-glow-accent hover:scale-105"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
