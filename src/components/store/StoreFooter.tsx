import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, Lock, CreditCard, Headphones, 
  CheckCircle2, Award, Zap, Heart
} from "lucide-react";

interface StoreFooterProps {
  storeName: string;
  storeAddress?: string | null;
  whatsappNumber?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
}

const StoreFooter = ({
  storeName,
  storeAddress,
  whatsappNumber,
  instagramUrl,
  facebookUrl,
}: StoreFooterProps) => {
  const trustBadges = [
    { icon: Shield, label: "Verified Store", color: "text-blue-500" },
    { icon: Lock, label: "Secure Orders", color: "text-green-500" },
    { icon: CreditCard, label: "COD Available", color: "text-purple-500" },
    { icon: Headphones, label: "24/7 Support", color: "text-orange-500" },
  ];

  return (
    <footer className="mt-16 pb-40 px-4 lg:px-6">
      {/* Trust Badges Section */}
      <div className="mb-8">
        <h3 className="text-sm lg:text-base font-semibold text-muted-foreground text-center mb-4 lg:mb-6">
          Why Shop With Us
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center gap-2 lg:gap-3 p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-muted flex items-center justify-center ${badge.color}`}>
                <badge.icon className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <span className="text-xs lg:text-sm font-medium text-foreground text-center">{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Store Info */}
      <div className="text-center space-y-4 py-6 lg:py-8 border-t border-border/50">
        <div>
          <h4 className="font-bold text-lg lg:text-xl text-foreground">{storeName}</h4>
          {storeAddress && (
            <p className="text-sm lg:text-base text-muted-foreground mt-1">{storeAddress}</p>
          )}
        </div>

        {/* Contact Links */}
        {(whatsappNumber || instagramUrl || facebookUrl) && (
          <div className="flex items-center justify-center gap-4">
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-600 hover:underline flex items-center gap-1"
              >
                <span>💬</span> WhatsApp
              </a>
            )}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-pink-500 hover:underline flex items-center gap-1"
              >
                <span>📸</span> Instagram
              </a>
            )}
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>📘</span> Facebook
              </a>
            )}
          </div>
        )}
      </div>

      {/* Powered By Badge */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center pt-6 border-t border-border/50"
      >
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-border/50">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Powered by</span>
          </div>
          <Link 
            to="/" 
            className="font-bold text-sm bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            BizGrow 360
          </Link>
        </div>
        
        <p className="text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
          Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in India
        </p>
      </motion.div>
    </footer>
  );
};

export default StoreFooter;
