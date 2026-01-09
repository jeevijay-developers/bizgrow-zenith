import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Sparkles, ShoppingBag, Layers, BarChart3, MessageSquare, Users, HelpCircle, BookOpen, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoDarkBg from "@/assets/logo-dark-bg.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks = [
    {
      label: "Features",
      href: "#features",
      dropdown: [
        { label: "Digital Catalogue", href: "#features", icon: Layers, desc: "Beautiful online store" },
        { label: "AI Product Upload", href: "#features", icon: Sparkles, desc: "Smart recognition" },
        { label: "WhatsApp Orders", href: "#features", icon: MessageSquare, desc: "Instant notifications" },
        { label: "Analytics", href: "#features", icon: BarChart3, desc: "Business insights" },
      ],
    },
    {
      label: "Solutions",
      href: "#solutions",
      dropdown: [
        { label: "Kirana Stores", href: "#solutions", icon: ShoppingBag, desc: "Daily essentials" },
        { label: "Bakeries", href: "#solutions", icon: ShoppingBag, desc: "Fresh bakes" },
        { label: "Clothing Stores", href: "#solutions", icon: ShoppingBag, desc: "Fashion retail" },
        { label: "Electronics", href: "#solutions", icon: ShoppingBag, desc: "Gadgets & more" },
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/98 backdrop-blur-lg border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logoDarkBg} alt="BizGrow 360" className="h-9 md:h-10 w-auto" />
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
                    <div className="bg-primary rounded-xl shadow-2xl border border-white/10 p-2 backdrop-blur-xl">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="flex items-start gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-white/10 transition-colors group"
                        >
                          {item.icon && (
                            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
                              <item.icon className="w-4 h-4 text-accent" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-white">{item.label}</p>
                            {item.desc && <p className="text-xs text-white/60">{item.desc}</p>}
                          </div>
                        </a>
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
                Login
              </Button>
            </Link>
            <Link to="/join">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-5 rounded-lg shadow-lg shadow-accent/20">
                Start Free Trial
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 animate-slide-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-white/5 flex items-center justify-between"
                    onClick={() => !link.dropdown && setIsOpen(false)}
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown className="w-4 h-4" />}
                  </a>
                  {link.dropdown && (
                    <div className="pl-4 mt-1 space-y-1 border-l border-white/10 ml-3">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="text-white/60 hover:text-white text-sm py-1.5 px-3 rounded-lg hover:bg-white/5 flex items-center gap-2"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.icon && <item.icon className="w-4 h-4" />}
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-white/10">
                <Link to="/auth" className="w-full" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 w-full justify-center">
                    Login
                  </Button>
                </Link>
                <Link to="/join" className="w-full" onClick={() => setIsOpen(false)}>
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold w-full">
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
