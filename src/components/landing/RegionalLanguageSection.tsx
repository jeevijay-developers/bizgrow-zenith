import { motion } from "framer-motion";
import { Globe, Mic, MessageCircle, ArrowRight, Check, Volume2 } from "lucide-react";
import { HiFlag } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { RippleButton } from "@/components/ui/ripple-button";

const languages = [
  { code: "hi", name: "हिंदी", english: "Hindi", useIcon: true },
  { code: "ta", name: "தமிழ்", english: "Tamil", useIcon: true },
  { code: "te", name: "తెలుగు", english: "Telugu", useIcon: true },
  { code: "kn", name: "ಕನ್ನಡ", english: "Kannada", useIcon: true },
  { code: "ml", name: "മലയാളം", english: "Malayalam", useIcon: true },
  { code: "bn", name: "বাংলা", english: "Bengali", useIcon: true },
  { code: "mr", name: "मराठी", english: "Marathi", useIcon: true },
  { code: "gu", name: "ગુજરાતી", english: "Gujarati", useIcon: true },
  { code: "pa", name: "ਪੰਜਾਬੀ", english: "Punjabi", useIcon: true },
  { code: "or", name: "ଓଡ଼ିଆ", english: "Odia", useIcon: true },
  { code: "en", name: "English", english: "English", useIcon: false },
];

const languageFeatures = [
  { icon: Mic, title: "Voice Commands", description: "Add products by speaking in your language" },
  { icon: MessageCircle, title: "Auto-Translation", description: "Product descriptions in any language" },
  { icon: Volume2, title: "Audio Assistance", description: "App speaks back in your language" },
];

const RegionalLanguageSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-[10%] w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Regional Languages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-display">
            Apni Bhasha Mein
            <span className="text-primary block mt-2">Business Chalao</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Use BizGrow in Hindi, Tamil, Telugu, or any of 10+ Indian languages. 
            No English needed!
          </p>
        </motion.div>

        {/* Languages Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {languages.map((lang, index) => (
            <motion.div
              key={lang.code}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3 hover:border-primary/50 hover:shadow-lg transition-all group cursor-pointer"
            >
              <span className="text-2xl flex items-center justify-center">
                {lang.useIcon ? <HiFlag className="w-6 h-6 text-orange-500" /> : <Globe className="w-6 h-6 text-primary" />}
              </span>
              <div>
                <p className="font-bold text-foreground group-hover:text-primary transition-colors">{lang.name}</p>
                <p className="text-xs text-muted-foreground">{lang.english}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {languageFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/30 hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/join">
            <RippleButton size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 font-bold h-14 px-8 group">
              <Globe className="w-5 h-5 mr-2" />
              Start in Your Language
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </RippleButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RegionalLanguageSection;
