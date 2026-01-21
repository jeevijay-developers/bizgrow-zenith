import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection, StaggeredContainer } from "@/hooks/useScrollAnimation";

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
  {
    image: kiranaImg,
    title: "Kirana Store",
    description: "Daily essentials, groceries & FMCG products",
    products: "500+ Products",
    color: "from-orange-500 to-amber-500",
  },
  {
    image: bakeryImg,
    title: "Bakery",
    description: "Fresh bakes, custom orders & daily specials",
    products: "200+ Products",
    color: "from-amber-500 to-yellow-500",
  },
  {
    image: dairyImg,
    title: "Dairy Shop",
    description: "Milk, paneer, curd & dairy products",
    products: "100+ Products",
    color: "from-blue-400 to-cyan-400",
  },
  {
    image: clothingImg,
    title: "Clothing Store",
    description: "Fashion, apparel & accessories",
    products: "1000+ Products",
    color: "from-pink-500 to-rose-500",
  },
  {
    image: cosmeticsImg,
    title: "Cosmetics",
    description: "Beauty, skincare & personal care",
    products: "300+ Products",
    color: "from-purple-500 to-violet-500",
  },
  {
    image: electronicsImg,
    title: "Mobile & Electronics",
    description: "Phones, gadgets & accessories",
    products: "500+ Products",
    color: "from-slate-600 to-gray-700",
  },
  {
    image: fruitsVegetablesImg,
    title: "Fruits & Vegetables",
    description: "Fresh produce & seasonal items",
    products: "150+ Products",
    color: "from-green-500 to-emerald-500",
  },
  {
    image: electricalImg,
    title: "Electrical Supplies",
    description: "Wires, switches & equipment",
    products: "400+ Products",
    color: "from-yellow-500 to-orange-500",
  },
  {
    image: pharmacyImg,
    title: "Pharmacy",
    description: "Health, medicine & wellness",
    products: "600+ Products",
    color: "from-teal-500 to-cyan-500",
  },
  {
    image: stationeryImg,
    title: "Stationery",
    description: "Books, supplies & office items",
    products: "350+ Products",
    color: "from-indigo-500 to-blue-500",
  },
  {
    image: hardwareImg,
    title: "Hardware",
    description: "Tools, equipment & supplies",
    products: "450+ Products",
    color: "from-gray-600 to-slate-600",
  },
  {
    image: otherImg,
    title: "Other Retail",
    description: "Gift shops, specialty stores & more",
    products: "Unlimited",
    color: "from-rose-500 to-pink-500",
  },
];

const StoreTypesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30" id="solutions">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold">Built for Every Retailer</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-display">
            Perfect for Your
            <span className="text-primary block">Business Type</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            From neighborhood kirana stores to specialty shops, BizGrow 360 adapts 
            to your specific business needs.
          </p>
        </AnimatedSection>

        {/* Store Types Grid */}
        <StaggeredContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4" staggerDelay={80}>
          {storeTypes.map((store) => (
            <div
              key={store.title}
              className="group relative bg-card rounded-2xl p-4 md:p-5 border border-border hover:border-transparent transition-all duration-300 hover:shadow-xl cursor-pointer overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${store.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              {/* Category Image */}
              <div className="w-16 h-16 md:w-20 md:h-20 mb-3 rounded-xl overflow-hidden bg-muted/50 flex items-center justify-center">
                <img 
                  src={store.image} 
                  alt={store.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <h3 className="text-base md:text-lg font-semibold text-card-foreground mb-1">
                {store.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2">
                {store.description}
              </p>

              {/* Product Count Badge */}
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${store.color}`}>
                {store.products}
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          ))}
        </StaggeredContainer>

        {/* CTA */}
        <AnimatedSection className="text-center mt-10" delay={300}>
          <p className="text-muted-foreground mb-4 text-sm md:text-base">
            Don't see your business type? <span className="text-primary font-medium">We support all retail categories!</span>
          </p>
          <Link 
            to="/join"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Get Started with Your Store
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default StoreTypesSection;
