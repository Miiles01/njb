import { motion } from "framer-motion";
import AccordionNavbar from "@/components/AccordionNavbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const Contacto = () => {
    const { t } = useLanguage();
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <AccordionNavbar />
            <section className="pt-40 px-6 pb-20 flex-1">
                <div className="container mx-auto max-w-5xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-heading font-medium tracking-tighter mb-12"
                    >
                        {t('contact.title')}
                    </motion.h1>
                    <p className="text-xl md:text-2xl font-heading font-light opacity-60 mb-12">
                        {t('contact.subtitle')}
                    </p>
                    <div className="flex flex-col gap-6">
                        <a href="mailto:contmanuel77@gmail.com" className="text-xl sm:text-3xl md:text-5xl font-heading font-medium hover:text-blue-600 transition-colors break-all">
                            contmanuel77@gmail.com
                        </a>
                        <a href="tel:+525610168992" className="text-xl sm:text-3xl md:text-5xl font-heading font-medium hover:text-blue-600 transition-colors">
                            +52 5610168992
                        </a>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Contacto;
