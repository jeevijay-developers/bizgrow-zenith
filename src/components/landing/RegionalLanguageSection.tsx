import { motion } from "framer-motion";
import { useState } from "react";
import { Globe, Mic, MessageCircle, ArrowRight, Check, Volume2 } from "lucide-react";
import { HiFlag } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { RippleButton } from "@/components/ui/ripple-button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { CarouselDots } from "@/components/ui/carousel-dots";

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
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 border border-ledger-rule rounded-full px-4 py-2 mb-6">
            <Globe className="w-4 h-4 text-ledger-ink/60" strokeWidth={1.75} />
            <span className="text-sm font-grotesk font-medium text-ledger-ink/75">Regional Languages</span>
          </div>
          <h2 className="font-ledger text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-ledger-ink mb-6">
            Apni Bhasha Mein
            <span className="block mt-2">Business Chalao</span>
          </h2>
          <p className="font-grotesk text-lg md:text-xl text-ledger-ink/65 max-w-2xl mx-auto">
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
              className="bg-white border border-ledger-rule rounded-xl px-4 py-3 flex items-center gap-3 hover:border-ledger-ink/30 transition-colors group cursor-pointer"
            >
              <span className="text-2xl flex items-center justify-center">
                {lang.useIcon ? <HiFlag className="w-6 h-6 text-ledger-ink/50" /> : <Globe className="w-6 h-6 text-ledger-ink/50" />}
              </span>
              <div>
                <p className={`font-medium text-ledger-ink ${lang.code === "hi" || lang.code === "mr" ? "font-devanagari" : "font-grotesk"}`}>{lang.name}</p>
                <p className="text-xs font-grotesk text-ledger-ink/55">{lang.english}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features - Mobile Carousel */}
        <div className="md:hidden mb-12">
          <Carousel opts={{ align: "start" }} setApi={setApi}>
            <CarouselContent>
              {languageFeatures.map((feature) => (
                <CarouselItem key={feature.title} className="basis-[85%]">
                  <LanguageFeatureCard feature={feature} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <CarouselDots api={api} />
        </div>

        {/* Features - Grid (desktop) */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {languageFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <LanguageFeatureCard feature={feature} />
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
            <RippleButton size="lg" className="bg-ledger-ink text-ledger-paper hover:bg-ledger-marigold hover:text-ledger-ink font-grotesk font-semibold rounded-md h-14 px-8 group">
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

const LanguageFeatureCard = ({ feature }: { feature: (typeof languageFeatures)[number] }) => (
  <div className="bg-ledger-paper border border-ledger-rule rounded-2xl p-6 text-center shadow-ledger-sm">
    <div className="w-14 h-14 mx-auto mb-4 rounded-xl border border-ledger-rule bg-white flex items-center justify-center">
      <feature.icon className="w-7 h-7 text-ledger-ink/70" strokeWidth={1.75} />
    </div>
    <h3 className="font-ledger font-medium text-ledger-ink text-lg mb-2">{feature.title}</h3>
    <p className="text-sm font-grotesk text-ledger-ink/60">{feature.description}</p>
  </div>
);

export default RegionalLanguageSection;
