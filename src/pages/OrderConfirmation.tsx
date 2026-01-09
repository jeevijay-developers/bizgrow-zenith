import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Package, MessageCircle, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-card rounded-3xl border shadow-xl p-8 text-center space-y-6"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center mx-auto"
        >
          <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-500" />
        </motion.div>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Order Placed!</h1>
          <p className="text-muted-foreground mt-2">
            Your order has been successfully placed and the seller has been notified.
          </p>
        </div>

        {/* Order ID */}
        <div className="bg-muted/50 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Order ID</p>
          <p className="font-mono font-semibold text-foreground">
            {orderId ? `#${orderId.slice(0, 8).toUpperCase()}` : "#XXXXXXXX"}
          </p>
        </div>

        {/* Info */}
        <div className="space-y-3 text-left">
          <div className="flex items-start gap-3">
            <Package className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">What's next?</p>
              <p className="text-sm text-muted-foreground">
                The seller will confirm your order and contact you on WhatsApp.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-medium">Stay connected</p>
              <p className="text-sm text-muted-foreground">
                Keep your WhatsApp active to receive order updates.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-4">
          <Button
            className="w-full gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Button>
          <Link to="/">
            <Button variant="outline" className="w-full gap-2">
              <Home className="w-4 h-4" />
              Go to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;