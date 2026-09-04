import { motion } from "framer-motion";
import { Star, Users, ShoppingBag, IndianRupee } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Active Stores" },
  { icon: IndianRupee, value: "₹50Cr+", label: "Monthly GMV" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
  { icon: ShoppingBag, value: "5L+", label: "Products Listed" },
];

const TrustStatsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <stat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStatsSection;
