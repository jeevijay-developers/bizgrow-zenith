import { motion } from "framer-motion";
import { Plus, ImagePlus, Share2, MessageCircle, QrCode, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "Add Product",
    description: "Add new product manually",
    icon: Plus,
    color: "bg-primary text-primary-foreground",
    href: "/dashboard/products/new",
  },
  {
    title: "AI Upload",
    description: "Snap & auto-fill products",
    icon: ImagePlus,
    color: "bg-gradient-to-br from-violet-500 to-purple-600 text-white",
    href: "/dashboard/ai-upload",
  },
  {
    title: "Share Store",
    description: "Get your store link",
    icon: Share2,
    color: "bg-gradient-to-br from-blue-500 to-cyan-500 text-white",
    href: "/dashboard/store-settings",
  },
  {
    title: "WhatsApp",
    description: "Manage order notifications",
    icon: MessageCircle,
    color: "bg-gradient-to-br from-green-500 to-emerald-500 text-white",
    href: "/dashboard/whatsapp",
  },
  {
    title: "QR Code",
    description: "Generate store QR",
    icon: QrCode,
    color: "bg-gradient-to-br from-orange-500 to-amber-500 text-white",
    href: "/dashboard/store-settings",
  },
  {
    title: "Settings",
    description: "Configure your store",
    icon: Settings,
    color: "bg-muted text-foreground",
    href: "/dashboard/settings",
  },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="bg-card rounded-xl border border-border p-6"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
        <p className="text-sm text-muted-foreground">Common tasks at your fingertips</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {actions.map((action, index) => (
          <Link key={action.title} to={action.href}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-5 h-5" />
              </div>
              <p className="font-medium text-sm">{action.title}</p>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
