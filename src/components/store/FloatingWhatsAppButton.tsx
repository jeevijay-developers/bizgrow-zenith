import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface FloatingWhatsAppButtonProps {
  whatsappNumber: string | null | undefined;
  storeName: string;
  className?: string;
}

const FloatingWhatsAppButton = ({
  whatsappNumber,
  storeName,
  className = "",
}: FloatingWhatsAppButtonProps) => {
  if (!whatsappNumber) return null;

  const handleClick = () => {
    const phone = whatsappNumber.replace(/\D/g, "");
    const message = `Hi! I'm browsing ${storeName}. Can you help me with my order?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className={`hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl items-center justify-center transition-colors ${className}`}
    >
      <MessageCircle className="w-6 h-6" />
      
      {/* Pulse Animation */}
      <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-card text-foreground text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap border border-border">
          Chat on WhatsApp
        </div>
      </div>
    </motion.button>
  );
};

export default FloatingWhatsAppButton;
