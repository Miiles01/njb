import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Globe, ChevronDown } from "lucide-react";

const NavLink = ({ to, children, color, isAnchor = false }: { to: string; children: React.ReactNode, color: any, isAnchor?: boolean }) => {
    if (isAnchor) {
        return (
            <motion.a
                href={to}
                style={{ color }}
                className="text-sm md:text-base font-medium transition-colors px-4 py-2 block hover:opacity-100"
            >
                {children}
            </motion.a>
        );
    }
    return (
        <motion.div style={{ color }}>
            <Link
                to={to}
                className="text-sm md:text-base font-medium transition-colors px-4 py-2 block hover:opacity-100"
            >
                {children}
            </Link>
        </motion.div>
    );
};

const AccordionNavbar = () => {
    const { scrollY } = useScroll();
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();
    const isHome = location.pathname === "/" || location.pathname === "/sobre";
    const [langOpen, setLangOpen] = useState(false);

    // Transform width from 100% to 50% on scroll
    const widthRange = useTransform(scrollY, [0, 100], ["100%", "50%"]);
    const mobileWidthRange = useTransform(scrollY, [0, 100], ["100%", "96%"]);
    const borderRadiusRange = useTransform(scrollY, [0, 100], [0, 50]);
    const topRange = useTransform(scrollY, [0, 100], [0, 20]);
    const paddingRange = useTransform(scrollY, [0, 100], ["24px", "12px"]);

    // Dynamic background and blur (only for home)
    const bgOpacityBase = useTransform(scrollY, [0, 50], [0, 0.8]);
    const blurAmountBase = useTransform(scrollY, [0, 50], [0, 20]);
    const borderOpacityBase = useTransform(scrollY, [0, 50], [0, 0.2]);

    // Dynamic text colors (only for home)
    const textColorBase = useTransform(scrollY, [20, 80], ["#ffffff", "#000000"]);
    const navLinkColorBase = useTransform(scrollY, [20, 80], ["rgba(255, 255, 255, 0.7)", "rgba(0, 0, 0, 0.6)"]);

    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    const springConfig = { stiffness: 400, damping: 40 };
    const animatedDesktopWidth = useSpring(widthRange, springConfig);
    const animatedMobileWidth = useSpring(mobileWidthRange, springConfig);
    const animatedRadius = useSpring(borderRadiusRange, springConfig);
    const animatedTop = useSpring(topRange, springConfig);
    const animatedPadding = useSpring(paddingRange, springConfig);

    // Final dynamic styles - override if not on home
    const backgroundColor = useTransform(bgOpacityBase, (o) => isHome ? `rgba(255, 255, 255, ${o})` : "rgba(255, 255, 255, 0.8)");
    const backdropFilter = useTransform(blurAmountBase, (b) => isHome ? `blur(${b}px)` : "blur(20px)");
    const borderColor = useTransform(borderOpacityBase, (o) => isHome ? `rgba(255, 255, 255, ${o})` : "rgba(255, 255, 255, 0.2)");
    const textColor = useTransform(textColorBase, (c) => isHome ? c : "#000000");
    const navLinkColor = useTransform(navLinkColorBase, (c) => isHome ? c : "rgba(0, 0, 0, 0.6)");

    return (
        <>
            <motion.header
                style={{
                    width: isMobile ? animatedMobileWidth : animatedDesktopWidth,
                    borderRadius: animatedRadius,
                    top: animatedTop,
                    paddingTop: animatedPadding,
                    paddingBottom: animatedPadding,
                    backgroundColor,
                    backdropFilter,
                    borderColor,
                }}
                className="fixed left-1/2 -translate-x-1/2 z-[100] border flex items-center justify-between px-8 md:px-12"
            >
                <motion.div style={{ color: textColor }}>
                    <Link to="/" className="flex items-center group">
                        <span className="text-xl md:text-2xl font-bold tracking-tighter">NJB</span>
                    </Link>
                </motion.div>

                <nav className="hidden md:flex items-center h-full gap-2 md:gap-4">
                    <NavLink to={isHome ? "#vision" : "/#vision"} color={navLinkColor} isAnchor>{t('nav.about')}</NavLink>
                    <NavLink to="/trabajo" color={navLinkColor}>{t('nav.work')}</NavLink>
                    <NavLink to="/contacto" color={navLinkColor}>{t('nav.contact')}</NavLink>

                    {/* Language Switcher */}
                    <div className="relative">
                        <motion.button
                            onClick={() => setLangOpen(!langOpen)}
                            style={{ color: navLinkColor }}
                            className="flex items-center gap-1.5 md:gap-2 text-sm md:text-base font-medium px-4 py-2 hover:opacity-100 transition-opacity"
                        >
                            <span className="hidden sm:inline">{t('nav.language')}</span>
                            <span className="sm:hidden uppercase">{language}</span>
                        </motion.button>

                        <AnimatePresence>
                            {langOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full right-0 mt-4 bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden w-36 py-2"
                                >
                                    <button
                                        onClick={() => { setLanguage('es'); setLangOpen(false); }}
                                        className={`w-full px-5 py-3 text-left text-sm hover:bg-black/5 transition-colors flex items-center justify-between ${language === 'es' ? 'text-black font-semibold' : 'text-black/40 font-normal'}`}
                                    >
                                        Español
                                        {language === 'es' && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                                    </button>
                                    <button
                                        onClick={() => { setLanguage('en'); setLangOpen(false); }}
                                        className={`w-full px-5 py-3 text-left text-sm hover:bg-black/5 transition-colors flex items-center justify-between ${language === 'en' ? 'text-black font-semibold' : 'text-black/40 font-normal'}`}
                                    >
                                        English
                                        {language === 'en' && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </nav>

                {/* Mobile Menu Trigger */}
                <motion.button
                    onClick={() => setMobileMenuOpen(true)}
                    style={{ color: textColor }}
                    className="md:hidden text-lg font-medium tracking-tight px-4 py-2"
                >
                    {t('nav.menu')}
                </motion.button>
            </motion.header>

            {/* Mobile Full-Screen Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="fixed inset-0 min-h-screen bg-white z-[200] flex flex-col pointer-events-auto overflow-y-auto"
                        style={{ width: "100%", top: 0, left: 0, margin: 0, padding: 0 }}
                    >
                        {/* Header of Mobile Menu */}
                        <div className="flex justify-between items-center px-8 py-6 w-full mt-4">
                            <span className="text-xl md:text-2xl font-bold tracking-tighter text-black">NJB</span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-black text-lg font-medium tracking-tight"
                            >
                                {t('nav.close')}
                            </button>
                        </div>
                        
                        {/* Menu Links */}
                        <motion.div 
                            className="flex flex-col mt-20 px-8 space-y-8 perspective-[1000px]"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                                }
                            }}
                        >
                            <motion.div variants={{
                                hidden: { opacity: 0, rotateY: -90, y: 20, transformOrigin: "left center -20px" },
                                visible: { opacity: 1, rotateY: 0, y: 0, transition: { duration: 0.6, ease: "backOut" } }
                            }}>
                                <Link 
                                    to={isHome ? "#vision" : "/#vision"} 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-5xl font-heading font-medium tracking-tighter text-black hover:opacity-70 transition-opacity block"
                                >
                                    {t('nav.about')}
                                </Link>
                            </motion.div>
                            <motion.div variants={{
                                hidden: { opacity: 0, rotateY: -90, y: 20, transformOrigin: "left center -20px" },
                                visible: { opacity: 1, rotateY: 0, y: 0, transition: { duration: 0.6, ease: "backOut" } }
                            }}>
                                <Link 
                                    to="/trabajo" 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-5xl font-heading font-medium tracking-tighter text-black hover:opacity-70 transition-opacity block"
                                >
                                    {t('nav.work')}
                                </Link>
                            </motion.div>
                            <motion.div variants={{
                                hidden: { opacity: 0, rotateY: -90, y: 20, transformOrigin: "left center -20px" },
                                visible: { opacity: 1, rotateY: 0, y: 0, transition: { duration: 0.6, ease: "backOut" } }
                            }}>
                                <Link 
                                    to="/contacto" 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-5xl font-heading font-medium tracking-tighter text-black hover:opacity-70 transition-opacity block"
                                >
                                    {t('nav.contact')}
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Language Toggles */}
                        <div className="mt-auto mb-16 px-8 flex flex-col gap-6">
                            <span className="text-sm tracking-widest opacity-40 font-heading font-medium">
                                {t('nav.language')}
                            </span>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => { setLanguage('es'); setMobileMenuOpen(false); }}
                                    className={`text-xl font-heading font-medium transition-opacity ${language === 'es' ? 'text-black opacity-100' : 'text-black opacity-30'}`}
                                >
                                    ES
                                </button>
                                <button
                                    onClick={() => { setLanguage('en'); setMobileMenuOpen(false); }}
                                    className={`text-xl font-heading font-medium transition-opacity ${language === 'en' ? 'text-black opacity-100' : 'text-black opacity-30'}`}
                                >
                                    EN
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AccordionNavbar;
