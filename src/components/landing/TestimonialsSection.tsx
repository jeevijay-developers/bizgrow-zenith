import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Kirana Store Owner",
    location: "Jaipur, Rajasthan",
    image: "RS",
    quote: "BizGrow 360 ne meri dukan ko digital bana diya. Ab customers WhatsApp pe order karte hain aur mera business 40% badh gaya!",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Bakery Owner", 
    location: "Ahmedabad, Gujarat",
    image: "PP",
    quote: "The AI product upload is amazing! I just click a photo and it adds all product details automatically. Saves me hours every day.",
    rating: 5,
  },
  {
    name: "Mohammed Irfan",
    role: "Mobile Shop Owner",
    location: "Hyderabad, Telangana",
    image: "MI",
    quote: "Inventory tracking and GST billing have become so easy. I can focus on customers instead of paperwork. Best investment!",
    rating: 5,
  },
  {
    name: "Sunita Devi",
    role: "Clothing Store Owner",
    location: "Lucknow, UP",
    image: "SD",
    quote: "Hindi mein available hone se sab kuch samajhna aasan ho gaya. Meri beti bhi ab dukan manage karti hai easily!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-display">
            Loved by
            <span className="text-primary"> Retailers Across India</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See how BizGrow 360 is transforming small businesses every day.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-card-foreground text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {testimonial.image}
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
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border max-w-4xl mx-auto">
          {[
            { value: "1,000+", label: "Active Retailers" },
            { value: "50,000+", label: "Orders Processed" },
            { value: "4.8/5", label: "Average Rating" },
            { value: "15+", label: "States Covered" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
