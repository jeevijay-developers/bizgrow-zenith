import { 
  ShoppingBag, 
  Croissant, 
  Milk, 
  Shirt, 
  Sparkles, 
  Smartphone,
  Apple,
  Zap
} from "lucide-react";

const storeTypes = [
  {
    icon: ShoppingBag,
    title: "Kirana Store",
    description: "Manage daily essentials, track inventory, and handle bulk orders effortlessly",
  },
  {
    icon: Croissant,
    title: "Bakery",
    description: "Fresh bakes, custom orders, and daily production tracking made simple",
  },
  {
    icon: Milk,
    title: "Dairy Shop",
    description: "Handle perishables, subscriptions, and daily delivery schedules",
  },
  {
    icon: Shirt,
    title: "Clothing Store",
    description: "Size variants, seasonal collections, and fashion inventory management",
  },
  {
    icon: Sparkles,
    title: "Cosmetics",
    description: "Beauty products with expiry tracking and brand categorization",
  },
  {
    icon: Smartphone,
    title: "Mobile & Electronics",
    description: "Gadgets, accessories, IMEI tracking, and warranty management",
  },
  {
    icon: Apple,
    title: "Fruits & Vegetables",
    description: "Fresh produce with weight-based pricing and daily stock updates",
  },
  {
    icon: Zap,
    title: "Electrical Supplies",
    description: "Wires, switches, and equipment with SKU management",
  },
];

const StoreTypesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background" id="solutions">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-4">
            Built for Every Retailer
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-display">
            Who is BizGrow 360 for?
          </h2>
          <p className="text-lg text-muted-foreground">
            From neighborhood kirana stores to specialty shops, we've designed solutions 
            tailored for every type of Indian retail business.
          </p>
        </div>

        {/* Store Types Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {storeTypes.map((store, index) => (
            <div
              key={store.title}
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <store.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                {store.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {store.description}
              </p>

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Don't see your business type? No worries!
          </p>
          <a 
            href="#" 
            className="inline-flex items-center text-primary font-semibold hover:underline"
          >
            BizGrow 360 works for all retail businesses →
          </a>
        </div>
      </div>
    </section>
  );
};

export default StoreTypesSection;
