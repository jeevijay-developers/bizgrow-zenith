import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
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
        { label: "Digital Catalogue", href: "#features" },
        { label: "AI Product Upload", href: "#features" },
        { label: "WhatsApp Orders", href: "#features" },
        { label: "Inventory Management", href: "#features" },
      ],
    },
    {
      label: "Solutions",
      href: "#solutions",
      dropdown: [
        { label: "Kirana Stores", href: "#solutions" },
        { label: "Bakeries", href: "#solutions" },
        { label: "Clothing Stores", href: "#solutions" },
        { label: "Electronics", href: "#solutions" },
      ],
    },
    { label: "Pricing", href: "#pricing" },
    { label: "Support", href: "#support" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logoDarkBg} alt="BizGrow 360" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-1 text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
                >
                  {link.label}
                  {link.dropdown && <ChevronDown className="w-4 h-4" />}
                </a>
                
                {link.dropdown && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-2 w-48 animate-fade-in">
                    <div className="bg-card rounded-xl shadow-xl border border-border p-2">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-card-foreground hover:bg-secondary rounded-lg transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Get a Demo
            </Button>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold animate-pulse-glow">
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-primary-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-primary-foreground/10 animate-slide-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/90 hover:text-primary-foreground font-medium py-2 block"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                  {link.dropdown && (
                    <div className="pl-4 mt-2 space-y-2">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="text-primary-foreground/70 hover:text-primary-foreground text-sm block py-1"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-primary-foreground/10">
                <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 w-full">
                  Get a Demo
                </Button>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold w-full">
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
