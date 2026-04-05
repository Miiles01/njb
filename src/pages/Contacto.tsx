import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import AccordionNavbar from "@/components/AccordionNavbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useAnalytics } from "@/hooks/useAnalytics";

const Contacto = () => {
  const { t } = useLanguage();
  const { track } = useAnalytics();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track("contact_form_submit", { pagePath: "/contacto" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-heading">
      <AccordionNavbar />
      
      <main className="flex-1 pt-40 pb-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[1400px]">
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            
            {/* Left Column: Massive Heading & Info */}
            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="text-[18vw] lg:text-[12vw] font-medium leading-[0.85] tracking-tighter mb-16 text-black"
              >
                {t('contact.title')}
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="space-y-8"
              >
                <p className="text-2xl md:text-3xl font-light text-zinc-500 max-w-md leading-tight">
                  {t('contact.subtitle')}
                </p>
                
                <div className="flex flex-col gap-4 text-xl md:text-2xl font-medium pt-8">
                  <a href="mailto:info@njb.services" className="hover:text-zinc-500 transition-colors">
                    info@njb.services
                  </a>
                  <a href="tel:+15147180228" className="hover:text-zinc-500 transition-colors">
                    +1 (514) 718-0228
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Black Form Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: "circOut" }}
              className="w-full lg:w-[450px] bg-black text-white p-10 md:p-14 rounded-[40px] shadow-2xl overflow-hidden relative"
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-8 relative z-10"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                        {t('contact.form.email')}
                      </label>
                      <input 
                        required
                        type="email" 
                        id="email"
                        placeholder="hello@example.com"
                        className="w-full bg-transparent border-b border-zinc-800 py-3 text-xl focus:border-white transition-colors outline-none placeholder:text-zinc-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                        {t('contact.form.phone')}
                      </label>
                      <input 
                        required
                        type="tel" 
                        id="phone"
                        placeholder="+33 123 456 789"
                        className="w-full bg-transparent border-b border-zinc-800 py-3 text-xl focus:border-white transition-colors outline-none placeholder:text-zinc-700"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="group relative flex items-center justify-between bg-white text-black py-5 px-8 rounded-full text-lg font-bold mt-8 hover:bg-zinc-200 transition-all overflow-hidden"
                    >
                      <span className="relative z-10">{t('contact.form.send')}</span>
                      <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20"
                  >
                    <Check className="w-16 h-16 text-green-500 mb-6" />
                    <h3 className="text-2xl font-bold mb-2">Success!</h3>
                    <p className="text-zinc-400">{t('contact.form.success')}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative elements for premium feel */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contacto;
