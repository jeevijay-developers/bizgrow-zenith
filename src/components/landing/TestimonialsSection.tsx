import { Star, Quote, Play } from "lucide-react";
import { AnimatedSection, StaggeredContainer } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Kirana Store Owner",
    location: "Jaipur, Rajasthan",
    initials: "RS",
    quote: "BizGrow 360 ne meri dukan ko digital bana diya. Ab customers WhatsApp pe order karte hain aur mera business 40% badh gaya!",
    rating: 5,
    color: "from-orange-500 to-amber-500",
  },
  {
    name: "Priya Patel",
    role: "Bakery Owner", 
    location: "Ahmedabad, Gujarat",
    initials: "PP",
    quote: "The AI product upload is amazing! I just click a photo and it adds all product details automatically. Saves me hours every day.",
    rating: 5,
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Mohammed Irfan",
    role: "Mobile Shop Owner",
    location: "Hyderabad, Telangana",
    initials: "MI",
    quote: "Inventory tracking and GST billing have become so easy. I can focus on customers instead of paperwork. Best investment!",
    rating: 5,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Sunita Devi",
    role: "Clothing Store Owner",
    location: "Lucknow, UP",
    initials: "SD",
    quote: "Hindi mein available hone se sab kuch samajhna aasan ho gaya. Meri beti bhi ab dukan manage karti hai easily!",
    rating: 5,
    color: "from-violet-500 to-purple-500",
  },
];

const stats = [
  { value: "1,000+", label: "Active Retailers" },
  { value: "50,000+", label: "Orders Processed" },
  { value: "4.8/5", label: "Average Rating" },
  { value: "15+", label: "States Covered" },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-1.5 mb-4">
            <Star className="w-4 h-4 text-green-600 fill-green-600" />
            <span className="text-green-700 text-sm font-semibold">Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display">
            Loved by Retailers
            <span className="text-primary block">Across India</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Join thousands of happy retailers who've transformed their business with BizGrow 360.
          </p>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <StaggeredContainer className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto mb-12" staggerDelay={150}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative bg-card rounded-2xl p-6 border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-xl group"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />

              {/* Rating */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-card-foreground text-base leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </StaggeredContainer>

        {/* Video CTA */}
        <AnimatedSection className="max-w-2xl mx-auto mb-12" delay={200}>
          <div className="relative bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-6 md:p-8 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,208,102,0.1)_0%,_transparent_70%)]" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/20 transition-colors group">
                <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="text-white text-lg font-semibold mb-2">Watch Success Stories</h4>
              <p className="text-white/70 text-sm">See how retailers like you are growing their business</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <StaggeredContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto" staggerDelay={100}>
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </StaggeredContainer>
      </div>
    </section>
  );
};

export default TestimonialsSection;
