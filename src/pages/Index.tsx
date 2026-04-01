import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Check, Download, User, ArrowRight } from "lucide-react";
import { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AccordionNavbar from "@/components/AccordionNavbar";
import { useLanguage } from "@/context/LanguageContext";
import { testimonials, Testimonial } from "@/data/testimonials";

gsap.registerPlugin(ScrollTrigger);

// Custom Modern LinkedIn Icon (The "In" logo without square container)
const LinkedinModern = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.125 2.062 2.062 0 010 4.125zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Hero = () => {
  const { t } = useLanguage();
  const titleText = t('hero.title');
  const letters = titleText.split("");

  return (
    <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:32px_32px]" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <h1 className="text-[20vw] md:text-[25vw] font-heading font-medium mb-12 leading-[0.85] tracking-tighter dynamic-text flex justify-center flex-wrap select-none cursor-default">
          {letters.map((letter, i) => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "backOut", delay: 0.5 + i * 0.03 }}
              className="inline-block"
            >
              <motion.span
                whileHover={{ y: -30, color: "rgba(0, 0, 0, 0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="inline-block whitespace-pre"
              >
                {letter}
              </motion.span>
            </motion.div>
          ))}
        </h1>
      </motion.div>
      <div id="vision-trigger" className="absolute bottom-0 w-full h-1" />
    </section>
  );
};

const Mission = () => {
  const { t } = useLanguage();
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, { types: "words" });
    gsap.set(split.words, { color: "rgba(0,0,0,0.15)" });

    gsap.to(split.words, {
      color: "#000000",
      stagger: 0.1,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      }
    });

    return () => split.revert();
  }, [t]);

  return (
    <section id="vision" className="py-32 md:py-64 px-6 bg-transparent">
      <div className="container mx-auto max-w-7xl">
        <p
          ref={textRef}
          className="font-heading font-medium text-3xl md:text-7xl lg:text-8xl leading-[1.2] md:leading-[2] tracking-tight text-center dynamic-text"
        >
          {t('mission.text')}
        </p>
      </div>
    </section>
  );
};

const Focuses = () => {
  const { t } = useLanguage();
  const focuses = [
    t('focuses.item1'), t('focuses.item2'), t('focuses.item3'), t('focuses.item4'),
    t('focuses.item5'), t('focuses.item6'), t('focuses.item7'), t('focuses.item8')
  ];

  return (
    <section className="py-32 px-6 bg-transparent">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-heading font-medium mb-16 text-center dynamic-text">{t('focuses.title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {focuses.map((focus, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[30px] border border-border/10 bg-secondary/5 dynamic-text text-center hover:bg-secondary/10 transition-colors flex items-center justify-center font-heading font-medium"
            >
              {focus}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { t, language } = useLanguage();
  const h2Ref = useRef<HTMLHeadingElement>(null);

  const half = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, half);
  const row2 = testimonials.slice(half);

  useLayoutEffect(() => {
    if (!h2Ref.current) return;
    const split = new SplitType(h2Ref.current, { types: "chars" });
    gsap.from(split.chars, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: h2Ref.current,
        start: "top 85%",
      }
    });
    return () => split.revert();
  }, []);

  const renderRow = (data: Testimonial[], reverse: boolean) => (
    <div className={`flex w-max shrink-0 gap-6 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} hover:[animation-play-state:paused] pr-6`}>
      {[...data, ...data].map((item, idx) => (
        <div key={`${idx}`} className="w-[300px] md:w-[450px] shrink-0 bg-white/70 backdrop-blur-md border border-zinc-200/50 rounded-[32px] p-8 md:p-10 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col justify-between">
          <p className="font-heading font-light text-foreground/80 leading-relaxed mb-8 text-sm md:text-base">{item.text[language as 'es' | 'en']}</p>
          <div className="flex items-center gap-4">
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-medium truncate">{item.name}</span>
              <span className="text-[10px] md:text-xs text-muted-foreground truncate opacity-70 tracking-wide">{item.role[language as 'es' | 'en']}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="testimonials" className="pt-48 pb-32 md:pt-80 md:pb-64 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 mb-16 md:mb-24 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 ref={h2Ref} className="text-4xl md:text-6xl font-heading font-medium mb-4 tracking-tight dynamic-text">
            {t('test.title')}
          </h2>
          <p className="dynamic-text opacity-50 font-light text-lg tracking-widest">{t('test.subtitle')}</p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-6 md:gap-8 relative w-full left-0">
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="flex w-full overflow-hidden">
          {renderRow(row1, false)}
        </div>
        
        <div className="flex w-full overflow-hidden">
          {renderRow(row2, true)}
        </div>
      </div>

      <div className="container mx-auto px-6 mt-20 md:mt-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a 
            href="https://www.linkedin.com/in/manuel-herrera-perfil/details/recommendations/?detailScreenTabIndex=0" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group inline-flex items-center gap-4 px-8 py-3.5 bg-white border border-black/10 text-black rounded-full font-heading font-medium hover:bg-black/5 transition-all text-sm md:text-base relative overflow-hidden"
          >
            {t('test.button')}
            <span className="p-2 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
              <ArrowRight size={16} className="text-black group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};




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
        onClick={showTooltip ? (e) => { e.preventDefault(); handleCopy(); } : undefined}
        className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-secondary/10 hover:bg-secondary/20 transition-all border border-border/5 font-heading font-medium text-lg dynamic-text"
      >
        <Icon size={20} className="dynamic-text" />
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

const ConnectingFooter = () => {
  const { t } = useLanguage();
  const title = t('footer.headline');
  const letters = title.split("");

  return (
    <section id="connect" className="pt-32 md:pt-64 pb-16 px-6 relative bg-transparent overflow-hidden">
      <div id="connect-trigger" className="absolute top-0 left-0 w-full h-1" />
      <div className="container mx-auto max-w-7xl flex flex-col items-center">

        <div className="flex flex-col gap-6 items-center text-center mb-16">
          <h3 className="text-sm font-medium opacity-60 dynamic-text">{t('footer.subline')}</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <ContactLink
              label={t('footer.linkedin')}
              value="https://www.linkedin.com/in/manuel-herrera-perfil"
              href="https://www.linkedin.com/in/manuel-herrera-perfil"
              icon={LinkedinModern}
              showTooltip={false}
            />
            <ContactLink
              label="contmanuel77@gmail.com"
              value="contmanuel77@gmail.com"
              href="mailto:contmanuel77@gmail.com"
              icon={Mail}
            />
            <ContactLink
              label="+52 5610168992"
              value="+52 5610168992"
              href="tel:+525610168992"
              icon={Phone}
            />
          </div>
        </div>

        <div className="relative flex justify-center w-full">
          <h2 className="text-[12vw] md:text-[15vw] font-heading font-medium tracking-tighter leading-none dynamic-text select-none flex cursor-default justify-center w-full">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                whileHover={{ y: -30, color: "#154FD1" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </h2>
        </div>

        <div className="mt-24 pt-12 flex flex-col items-center gap-6 w-full text-center">
          <p className="text-xs opacity-40 font-light uppercase tracking-[0.2em] dynamic-text">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  useLayoutEffect(() => {
    // 1. Initial State
    gsap.set(document.documentElement, { "--color": "#ffffff" });
    gsap.set(".dynamic-text", { color: "#000000" });

    const doc = document.documentElement;

    // DEFINITIVE COLOR TRIGGERS (Using state-based callbacks for 100% stability)

    // BLUE -> WHITE
    ScrollTrigger.create({
      trigger: "#vision",
      start: "top 80%",
      onEnter: () => {
        gsap.to(doc, { "--color": "#ffffff", duration: 1 });
        gsap.to(".dynamic-text", { color: "#000000", duration: 1 });
      },
      onLeaveBack: () => {
        gsap.to(doc, { "--color": "#ffffff", duration: 1 });
        gsap.to(".dynamic-text", { color: "#000000", duration: 1 });
      }
    });





    // FINAL FALLBACK: Ensure white at the end of scroll
    ScrollTrigger.create({
      trigger: "body",
      start: "bottom bottom",
      onEnter: () => {
        gsap.to(doc, { "--color": "#ffffff", duration: 0.5 });
        gsap.to(".dynamic-text", { color: "#000000", duration: 0.5 });
      }
    });

    // REFRESH AFTER ALL COMPONENTS RENDER
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 2000);
    const timer3 = setTimeout(() => ScrollTrigger.refresh(), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="min-h-screen">
      <AccordionNavbar />
      <Hero />
      <Mission />
      <Focuses />
      <Testimonials />
      <ConnectingFooter />
    </div>
  );
};

export default Index;
