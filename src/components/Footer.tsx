import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Check } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const LinkedinModern = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.125 2.062 2.062 0 010 4.125zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const ContactLink = ({ label, value, href, icon: Icon, showTooltip = true }: any) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = () => {
    if (!showTooltip) return;
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
        onClick={showTooltip ? (e: React.MouseEvent) => { e.preventDefault(); handleCopy(); } : undefined}
        className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-secondary/10 hover:bg-secondary/20 transition-all border border-border/5 font-heading font-medium text-lg"
      >
        <Icon size={20} />
        {label}
        {copied && <Check size={16} className="text-green-500 ml-2" />}
      </motion.a>
      <AnimatePresence>
        {hovered && showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full mt-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-black text-white text-xs rounded-lg whitespace-nowrap pointer-events-none z-50 shadow-xl"
          >
            <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
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
    <section className="pt-64 pb-16 px-6 relative bg-transparent overflow-hidden">
      <div className="container mx-auto max-w-7xl flex flex-col items-center">
        <div className="flex flex-col gap-6 items-center text-center mb-16">
          <h3 className="text-sm font-medium opacity-60">{t('footer.subline')}</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <ContactLink
              label={t('footer.linkedin')}
              value=""
              href={undefined}
              icon={LinkedinModern}
              showTooltip={false}
            />
            <ContactLink
              label="info@njb.services"
              value="info@njb.services"
              href="mailto:info@njb.services"
              icon={Mail}
            />
            <ContactLink
              label="+1 (514) 718-0228"
              value="+1 (514) 718-0228"
              href="tel:+15147180228"
              icon={Phone}
            />
          </div>
        </div>

        <div className="relative flex justify-center w-full">
          <h2 className="text-[12vw] md:text-[15vw] font-heading font-medium tracking-normal md:tracking-tighter leading-none select-none flex cursor-default justify-center w-full">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                whileHover={{ y: -30, color: "#154FD1" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="inline-block whitespace-pre"
              >
                {letter}
              </motion.span>
            ))}
          </h2>
        </div>

        <div className="mt-24 pt-12 flex flex-col items-center gap-6 w-full text-center">
          <p className="text-xs opacity-40 font-light uppercase tracking-[0.2em]">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
