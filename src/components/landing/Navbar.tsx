import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, Sparkles, ShoppingBag, Layers, BarChart3, MessageSquare, HelpCircle, BookOpen, Phone, Store, Shirt, Smartphone, Leaf, Cake, Milk } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoDarkBg from "@/assets/logo-dark-bg.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const navLinks = [
    {
      label: "Features",
      href: "#features",
      dropdown: [
        { label: "Digital Catalogue", href: "/features/digital-catalogue", icon: Layers, desc: "Beautiful online store" },
        { label: "AI Product Upload", href: "/features/ai-upload", icon: Sparkles, desc: "Smart recognition" },
        { label: "WhatsApp Orders", href: "/features/whatsapp-orders", icon: MessageSquare, desc: "Instant notifications" },
        { label: "Analytics", href: "/features/analytics", icon: BarChart3, desc: "Business insights" },
      ],
    },
    {
      label: "Solutions",
      href: "#solutions",
      dropdown: [
        { label: "Kirana Stores", href: "/solutions/kirana", icon: ShoppingBag, desc: "Daily essentials" },
        { label: "Bakeries", href: "/solutions/bakery", icon: Cake, desc: "Fresh bakes" },
        { label: "Dairy Shops", href: "/solutions/dairy", icon: Milk, desc: "Milk & products" },
        { label: "Clothing Stores", href: "/solutions/clothing", icon: Shirt, desc: "Fashion retail" },
        { label: "Electronics", href: "/solutions/electronics", icon: Smartphone, desc: "Gadgets & more" },
        { label: "Cosmetics", href: "/solutions/cosmetics", icon: Sparkles, desc: "Beauty products" },
        { label: "Mobile Shops", href: "/solutions/mobile", icon: Smartphone, desc: "Phones & accessories" },
        { label: "Fruits & Vegetables", href: "/solutions/fruits-vegetables", icon: Leaf, desc: "Fresh produce" },
      ],
    },
    { label: "Pricing", href: "#pricing" },
    {
      label: "Resources",
      href: "#",
      dropdown: [
        { label: "Help Center", href: "#", icon: HelpCircle, desc: "FAQs & guides" },
        { label: "Blog", href: "#", icon: BookOpen, desc: "Tips & updates" },
        { label: "Contact Us", href: "#", icon: Phone, desc: "Get support" },
      ],
    },
  ];

  const toggleMobileDropdown = (label: string) => {
    setMobileExpanded(prev => prev === label ? null : label);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src={logoDarkBg} alt="BizGrow 360" className="h-8 sm:h-9 md:h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-1 text-white/80 hover:text-white transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white/5"
                >
                  {link.label}
                  {link.dropdown && <ChevronDown className="w-4 h-4" />}
                </a>
                
                {link.dropdown && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-2 w-64 animate-fade-in z-50">
                    <div className="bg-white rounded-xl shadow-2xl border border-border p-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="flex items-start gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-muted transition-colors group"
                        >
                          {item.icon && (
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                              <item.icon className="w-4 h-4 text-primary" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-foreground">{item.label}</p>
                            {item.desc && <p className="text-xs text-muted-foreground">{item.desc}</p>}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <Link to="/auth">
              <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                Seller Login
              </Button>
            </Link>
            <Link to="/join">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-5 rounded-lg shadow-lg shadow-accent/20">
                Start Free Trial
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button - Enhanced visibility */}
          <button
            className="lg:hidden text-white p-3 hover:bg-white/20 rounded-xl transition-colors bg-white/15 border border-white/25 active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu - Fixed positioning and improved visibility */}
        {isOpen && (
          <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-primary z-[60] overflow-y-auto overscroll-contain">
            <div className="flex flex-col p-4 pb-24">
              {/* Navigation Links */}
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    {link.dropdown ? (
                      <>
                        <button
                          onClick={() => toggleMobileDropdown(link.label)}
                          className="w-full text-white font-medium py-3.5 px-4 rounded-xl hover:bg-white/15 flex items-center justify-between active:bg-white/20 transition-colors"
                        >
                          <span className="text-base">{link.label}</span>
                          <ChevronRight className={`w-5 h-5 text-white transition-transform duration-200 ${mobileExpanded === link.label ? 'rotate-90' : ''}`} />
                        </button>
                        {mobileExpanded === link.label && (
                          <div className="ml-4 mt-1 mb-2 space-y-1 border-l-2 border-accent/50 pl-4 bg-white/5 rounded-r-xl py-3 animate-fade-in">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.label}
                                to={item.href}
                                className="text-white/90 hover:text-white text-sm py-3 px-4 rounded-lg hover:bg-white/10 flex items-center gap-3 active:bg-white/15 transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {item.icon && (
                                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                                    <item.icon className="w-4 h-4 text-accent" />
                                  </div>
                                )}
                                <div>
                                  <span className="font-medium block">{item.label}</span>
                                  {item.desc && <p className="text-xs text-white/60 mt-0.5">{item.desc}</p>}
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <a
                        href={link.href}
                        className="text-white font-medium py-3.5 px-4 rounded-xl hover:bg-white/15 flex items-center text-base active:bg-white/20 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile CTAs */}
              <div className="flex flex-col gap-3 pt-6 mt-6 border-t border-white/20">
                <Link to="/auth" className="w-full" onClick={() => setIsOpen(false)}>
                  <Button 
                    variant="outline" 
                    className="border-white/30 text-white hover:bg-white/15 hover:text-white w-full justify-center font-semibold h-12 text-base"
                  >
                    Seller Login
                  </Button>
                </Link>
                <Link to="/join" className="w-full" onClick={() => setIsOpen(false)}>
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold w-full shadow-lg h-12 text-base">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;