import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const ContactLink = ({ label, value, href, icon: Icon }: { label: string; value: string; href: string; icon: any }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <motion.a
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(e) => { e.preventDefault(); handleCopy(); }}
        className="inline-flex items-center gap-3 md:gap-4 px-5 md:px-8 py-3 md:py-5 rounded-2xl transition-all border font-heading font-medium text-sm md:text-lg bg-white/5 hover:bg-white/10 border-white/10 text-white/70 hover:text-white"
      >
        <Icon size={18} className="text-white/70" />
        {label}
        {copied && <Check size={16} className="text-green-500 ml-2" />}
      </motion.a>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full mt-3 left-1/2 -translate-x-1/2 px-4 py-2 text-xs rounded-lg whitespace-nowrap pointer-events-none z-50 shadow-xl bg-white text-black"
          >
            <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-white" />
            {copied ? t('common.copied') : t('common.copy')}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  const title = t('footer.headline');
  const letters = title.split("");

  return (
    <section className="pt-16 md:pt-32 pb-8 px-4 md:px-8 relative bg-white overflow-hidden">
      {/* Black container */}
      <div className="bg-black rounded-[24px] md:rounded-[40px] border border-white/10 py-16 md:py-32 px-4 md:px-16 mx-auto max-w-[1400px]">
        <div className="flex flex-col items-center">

          {/* CTA */}
          <motion.div
            className="flex flex-col items-center text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-heading font-medium text-white mb-8 max-w-xl leading-snug">
              {t('footer.cta')}
            </h3>
            <a
              href="/contacto"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-heading font-medium hover:bg-zinc-100 transition-all text-base md:text-lg"
            >
              {t('footer.cta.button')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Subline + Contact */}
          <div className="flex flex-col gap-6 items-center text-center mb-16">
            <h3 className="text-sm font-medium text-white/40">{t('footer.subline')}</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <ContactLink
                label="info@njb.services"
                value="info@njb.services"
                href="mailto:info@njb.services"
                icon={Mail}
              />
              <ContactLink
                label="+1 (514) 718-0228"
                value="+15147180228"
                href="tel:+15147180228"
                icon={Phone}
              />
            </div>
          </div>

          {/* Big headline */}
          <div className="relative flex justify-center w-full">
            <h2 className="text-[12vw] md:text-[15vw] font-heading font-medium tracking-normal md:tracking-tighter leading-none text-white select-none flex cursor-default justify-center w-full">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  whileHover={{ y: -30 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="inline-block whitespace-pre"
                >
                  {letter}
                </motion.span>
              ))}
            </h2>
          </div>

          {/* Copyright */}
          <div className="mt-16 md:mt-24 flex flex-col items-center gap-6 w-full text-center">
            <p className="text-xs text-white/20 font-light uppercase tracking-[0.2em]">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
