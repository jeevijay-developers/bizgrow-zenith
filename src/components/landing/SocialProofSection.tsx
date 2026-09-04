import { motion } from "framer-motion";
import { Star, Quote, TrendingUp } from "lucide-react";
import { MobileCarousel } from "@/components/ui/mobile-carousel";

const testimonials = [
  {
    name: "Ramesh Sharma",
    role: "Kirana Store Owner",
    location: "Delhi",
    image: "RS",
    rating: 5,
    text: "The AI product upload is magical! I photographed 200 products and everything was listed in 30 minutes. Earlier it would take me 2 days!",
    highlight: "200 products in 30 mins",
  },
  {
    name: "Priya Patel",
    role: "Bakery Owner",
    location: "Mumbai",
    image: "PP",
    rating: 5,
    text: "I use the flyer creator daily. Just select products, pick a template, and boom — professional Diwali offers, Holi specials, everything ready in seconds!",
    highlight: "Daily flyer creation",
  },
  {
    name: "Mohammed Iqbal",
    role: "Electronics Shop",
    location: "Bangalore",
    image: "MI",
    rating: 5,
    text: "Being able to use the app in Kannada made everything so easy. My staff now manages orders without any confusion. Revenue up 40%!",
    highlight: "40% revenue increase",
  },
  {
    name: "Sunita Devi",
    role: "Clothing Boutique",
    location: "Jaipur",
    image: "SD",
    rating: 5,
    text: "My customers love ordering on WhatsApp. No app downloads needed — they just browse and order. My online sales are now 60% of total!",
    highlight: "60% online sales",
  },
];

const SocialProofSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-[5%] w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-[5%] w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 font-display">
            Real Results from
            <span className="text-gold block mt-2">Real Retailers</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See how thousands of store owners are transforming their businesses with BizGrow 360.
          </p>
        </motion.div>

        {/* Mobile Testimonials Carousel */}
        <div className="md:hidden">
          <MobileCarousel slideClassName="w-[90%]">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-card border border-border rounded-2xl p-6 relative h-full flex flex-col justify-between"
              >
                <div>
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />

                  <div className="inline-flex items-center gap-1 bg-accent/20 text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">
                    <TrendingUp className="w-3 h-3" />
                    {testimonial.highlight}
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>

                  <p className="text-foreground leading-relaxed mb-6 text-sm">
                    "{testimonial.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </MobileCarousel>
        </div>

        {/* Desktop Testimonials Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 relative group hover:shadow-xl hover:border-primary/20 transition-all"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />

              {/* Highlight Badge */}
              <div className="inline-flex items-center gap-1 bg-accent/20 text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">
                <TrendingUp className="w-3 h-3" />
                {testimonial.highlight}
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.image}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
