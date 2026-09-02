import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { CarouselDots } from "@/components/ui/carousel-dots";
import { EyebrowTag } from "@/components/ui/eyebrow-tag";

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
  { image: electricalImg, title: "Electrical Supplies", description: "Wires & equipment", products: "400+", color: "bg-yellow-50", href: "/solutions/electrical" },
  { image: pharmacyImg, title: "Pharmacy", description: "Health & medicine", products: "600+", color: "bg-teal-50", href: "/solutions/pharmacy" },
  { image: stationeryImg, title: "Stationery", description: "Books & office supplies", products: "350+", color: "bg-indigo-50", href: "/solutions/stationery" },
  { image: hardwareImg, title: "Hardware", description: "Tools & equipment", products: "450+", color: "bg-gray-50", href: "/solutions/hardware" },
  { image: otherImg, title: "Other Retail", description: "Specialty stores", products: "Unlimited", color: "bg-purple-50", href: "/solutions/other-retail" },
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
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden" id="solutions">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <EyebrowTag icon={ShoppingBag} className="mb-6">Made for Every Store</EyebrowTag>
          <h2 className="font-ledger text-3xl sm:text-4xl md:text-5xl font-medium text-ledger-ink mb-6">
            Built for Your
            <span className="block mt-2">Type of Business</span>
          </h2>
          <p className="font-grotesk text-lg text-ledger-ink/65">
            From neighborhood kirana stores to specialty shops,
            BizGrow 360 adapts to your needs.
          </p>
        </motion.div>

        {/* Store Types - Mobile Carousel (2 cards at a time) */}
        <div className="sm:hidden">
          <Carousel opts={{ align: "start", slidesToScroll: 2 }} setApi={setApi}>
            <CarouselContent>
              {storeTypes.map((store) => (
                <CarouselItem key={store.title} className="basis-1/2">
                  <StoreTypeCard store={store} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <CarouselDots api={api} />
        </div>

        {/* Store Types Grid (tablet & up) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {storeTypes.map((store) => (
            <motion.div key={store.title} variants={itemVariants}>
              <StoreTypeCard store={store} />
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
          <p className="font-grotesk text-ledger-ink/65 mb-3">
            Don't see your business type? <span className="text-ledger-ink font-medium">We support all retail categories!</span>
          </p>
          <Link
            to="/join"
            className="inline-flex items-center gap-2 text-ledger-ink font-grotesk font-semibold underline decoration-ledger-rule decoration-2 underline-offset-4 hover:decoration-ledger-marigold transition-colors"
          >
            Get Started with Your Store
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const StoreTypeCard = ({ store }: { store: (typeof storeTypes)[number] }) => (
  <Link
    to={store.href}
    className="block bg-ledger-paper border border-ledger-rule rounded-2xl p-4 sm:p-5 hover:shadow-ledger-sm hover:-translate-y-1 transition-all duration-300 group h-full"
  >
    {/* Category Image */}
    <div className="w-14 h-14 sm:w-16 sm:h-16 mb-3 rounded-xl overflow-hidden border border-ledger-rule bg-white">
      <img
        src={store.image}
        alt={store.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
    </div>

    {/* Content */}
    <h3 className="font-ledger text-sm sm:text-base font-medium text-ledger-ink mb-1">
      {store.title}
    </h3>
    <p className="text-xs sm:text-sm font-grotesk text-ledger-ink/60 mb-2 line-clamp-1">
      {store.description}
    </p>

    {/* Product Count */}
    <span className="text-xs font-grotesk font-semibold text-ledger-ink/70">
      {store.products} products
    </span>
  </Link>
);

export default StoreTypesSection;
