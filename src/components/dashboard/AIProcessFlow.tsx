import { motion } from "framer-motion";
import { Camera, Brain, Sparkles, Wand2, Package, CheckCircle2 } from "lucide-react";

const processSteps = [
  {
    icon: Camera,
    title: "Snap or Upload",
    description: "Take a photo of your products or upload from gallery",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "AI Analyzes",
    description: "Our AI detects products and extracts all details",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Wand2,
    title: "Auto Enhance",
    description: "Images get clean white backgrounds automatically",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Package,
    title: "Add to Catalogue",
    description: "Review, edit if needed, and add to your store",
    color: "from-emerald-500 to-teal-500",
  },
];

const AIProcessFlow = () => {
  return (
    <div className="py-6">
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold mb-2">How It Works</h3>
        <p className="text-sm text-muted-foreground">
          Four simple steps to add products instantly
        </p>
      </div>

      <div className="relative">
        {/* Connection line for desktop */}
        <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 via-amber-500 to-emerald-500 opacity-30" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Step card */}
              <motion.div
                className="bg-card border border-border rounded-xl p-4 text-center relative z-10 h-full"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Step number */}
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                >
                  {index + 1}
                </motion.div>

                {/* Icon container */}
                <motion.div
                  className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                >
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </motion.div>

                <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

              {/* Arrow connector for mobile (between columns) */}
              {index < 3 && index % 2 === 0 && (
                <motion.div
                  className="md:hidden absolute -right-2 top-1/2 -translate-y-1/2 z-20"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 + 0.2 }}
                >
                  <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features list */}
      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[
          "Detects 1000+ product types",
          "Auto-categorization",
          "Price extraction",
          "Clean backgrounds",
        ].map((feature, idx) => (
          <motion.div
            key={feature}
            className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + idx * 0.1 }}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            {feature}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AIProcessFlow;
