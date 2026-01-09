import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, Sparkles, ShoppingBag, Layers, BarChart3, MessageSquare, HelpCircle, BookOpen, Phone, Store } from "lucide-react";
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
        { label: "Bakeries", href: "#solutions", icon: Store, desc: "Fresh bakes" },
        { label: "Clothing Stores", href: "#solutions", icon: ShoppingBag, desc: "Fashion retail" },
        { label: "Electronics", href: "#solutions", icon: Store, desc: "Gadgets & more" },
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
                Seller Login
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
            className="lg:hidden text-white p-2.5 hover:bg-white/20 rounded-lg transition-colors bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-primary z-50 overflow-y-auto animate-slide-up">
            <div className="flex flex-col p-4 pb-8">
              {/* Navigation Links */}
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    {link.dropdown ? (
                      <>
                        <button
                          onClick={() => toggleMobileDropdown(link.label)}
                          className="w-full text-white font-medium py-3 px-4 rounded-lg hover:bg-white/15 flex items-center justify-between"
                        >
                          <span>{link.label}</span>
                          <ChevronRight className={`w-5 h-5 text-white transition-transform ${mobileExpanded === link.label ? 'rotate-90' : ''}`} />
                        </button>
                        {mobileExpanded === link.label && (
                          <div className="ml-4 mt-1 mb-2 space-y-1 border-l-2 border-accent/50 pl-4 bg-white/5 rounded-r-lg py-2">
                            {link.dropdown.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                className="text-white/90 hover:text-white text-sm py-2.5 px-4 rounded-lg hover:bg-white/10 flex items-center gap-3"
                                onClick={() => setIsOpen(false)}
                              >
                                {item.icon && <item.icon className="w-4 h-4 text-accent" />}
                                <div>
                                  <span className="font-medium">{item.label}</span>
                                  {item.desc && <p className="text-xs text-white/60">{item.desc}</p>}
                                </div>
                              </a>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <a
                        href={link.href}
                        className="text-white font-medium py-3 px-4 rounded-lg hover:bg-white/15 flex items-center"
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