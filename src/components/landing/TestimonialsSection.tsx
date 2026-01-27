import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ramesh Sharma",
    role: "Kirana Store Owner",
    location: "Delhi",
    image: "RS",
    rating: 5,
    text: "BizGrow 360 transformed my small grocery shop. Now customers order on WhatsApp and I never miss a sale. My revenue increased by 40% in just 3 months!",
  },
  {
    name: "Priya Patel",
    role: "Bakery Owner",
    location: "Mumbai",
    image: "PP",
    rating: 5,
    text: "The AI product upload is magical! I just take a photo of my cakes and everything gets listed automatically. Saves me hours every day.",
  },
  {
    name: "Mohammed Iqbal",
    role: "Electronics Shop",
    location: "Bangalore",
    image: "MI",
    rating: 5,
    text: "Managing 500+ products was a nightmare before BizGrow 360. Now everything is organized and I get real-time stock alerts. Best investment I made!",
  },
  {
    name: "Sunita Devi",
    role: "Clothing Boutique",
    location: "Jaipur",
    image: "SD",
    rating: 5,
    text: "My boutique now has a professional online presence. Customers love browsing my collection on their phones. The GST billing feature is a lifesaver!",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/30 relative overflow-hidden">
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
            <span className="text-sm font-semibold text-primary">Customer Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 font-display">
            Loved by Retailers
            <span className="text-primary block mt-2">Across India</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See how thousands of store owners are growing their business with BizGrow 360.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 relative group hover:shadow-lg transition-shadow"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />

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

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: "10,000+", label: "Active Stores" },
            { value: "₹50Cr+", label: "Monthly GMV" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "500K+", label: "Products Listed" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
