import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";

// AI-generated category images
import kiranaImg from "@/assets/categories-ai/kirana.png";
import bakeryImg from "@/assets/categories-ai/bakery.png";
import dairyImg from "@/assets/categories-ai/dairy.png";
import clothingImg from "@/assets/categories-ai/clothing.png";
import cosmeticsImg from "@/assets/categories-ai/cosmetics.png";
import electronicsImg from "@/assets/categories-ai/electronics.png";
import fruitsVegetablesImg from "@/assets/categories-ai/fruits-vegetables.png";
import electricalImg from "@/assets/categories-ai/electrical.png";
import pharmacyImg from "@/assets/categories-ai/pharmacy.png";
import stationeryImg from "@/assets/categories-ai/stationery.png";
import hardwareImg from "@/assets/categories-ai/hardware.png";
import otherImg from "@/assets/categories-ai/other.png";

const storeTypes = [
  { image: kiranaImg, title: "Kirana Store", description: "Daily essentials & groceries", products: "500+", color: "bg-orange-50", href: "/solutions/kirana" },
  { image: bakeryImg, title: "Bakery", description: "Fresh bakes & confectionery", products: "200+", color: "bg-amber-50", href: "/solutions/bakery" },
  { image: dairyImg, title: "Dairy Shop", description: "Milk & dairy products", products: "100+", color: "bg-sky-50", href: "/solutions/dairy" },
  { image: clothingImg, title: "Clothing Store", description: "Fashion & apparel", products: "1000+", color: "bg-pink-50", href: "/solutions/clothing" },
  { image: cosmeticsImg, title: "Cosmetics", description: "Beauty & skincare", products: "300+", color: "bg-rose-50", href: "/solutions/cosmetics" },
  { image: electronicsImg, title: "Electronics", description: "Gadgets & phones", products: "500+", color: "bg-slate-50", href: "/solutions/electronics" },
  { image: fruitsVegetablesImg, title: "Fruits & Vegetables", description: "Fresh produce daily", products: "150+", color: "bg-green-50", href: "/solutions/fruits-vegetables" },
  { image: electricalImg, title: "Electrical Supplies", description: "Wires & equipment", products: "400+", color: "bg-yellow-50", href: "#" },
  { image: pharmacyImg, title: "Pharmacy", description: "Health & medicine", products: "600+", color: "bg-teal-50", href: "#" },
  { image: stationeryImg, title: "Stationery", description: "Books & office supplies", products: "350+", color: "bg-indigo-50", href: "#" },
  { image: hardwareImg, title: "Hardware", description: "Tools & equipment", products: "450+", color: "bg-gray-50", href: "#" },
  { image: otherImg, title: "Other Retail", description: "Specialty stores", products: "Unlimited", color: "bg-purple-50", href: "#" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const StoreTypesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/30 relative overflow-hidden" id="solutions">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-[20%] w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-[10%] w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Made for Every Store</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 font-display">
            Built for Your
            <span className="text-primary block mt-2">Type of Business</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From neighborhood kirana stores to specialty shops, 
            BizGrow 360 adapts to your needs.
          </p>
        </motion.div>

        {/* Store Types Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {storeTypes.map((store) => (
            <motion.div key={store.title} variants={itemVariants}>
              <Link
                to={store.href}
                className={`block ${store.color} border border-border rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full`}
              >
                {/* Category Image */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 mb-3 rounded-xl overflow-hidden bg-white shadow-sm">
                  <img 
                    src={store.image} 
                    alt={store.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {store.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-1">
                  {store.description}
                </p>

                {/* Product Count */}
                <span className="text-xs font-semibold text-primary">
                  {store.products} products
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-3">
            Don't see your business type? <span className="text-primary font-medium">We support all retail categories!</span>
          </p>
          <Link 
            to="/join"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Get Started with Your Store
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StoreTypesSection;
