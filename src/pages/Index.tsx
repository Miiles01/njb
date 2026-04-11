import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone, Check, Download, User, ArrowRight, Users, TrendingUp, Target, Globe, BarChart3, Video, Settings2, Sparkles, Rocket, ShieldCheck, AlertCircle, Megaphone, PieChart, Crosshair, Flame, Store, Briefcase, Utensils, Home, Calendar } from "lucide-react";
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
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const tagline = t('hero.tagline');

  // Motion Trail State & Refs
  const images = [
    '/lovabol/1f8086c6-29ff-4506-ba2b-db0a6f5c50b9.png',
    '/lovabol/6E812A4C-4BC6-4099-825E-618A91AEE912.png',
    '/lovabol/4b1d397e-9012-4f48-ba04-e7e867715ceb.png',
    '/lovabol/image%20525.png',
    '/lovabol/E500D044-AA01-4071-B412-0793BC5B0BA6.png',
    '/lovabol/PHOTO-2025-04-30-17-51-16.jpg',
    '/lovabol/3859ff89-14e3-4f24-82c6-f707ed3b7637.png',
    '/lovabol/WhatsApp%20Image%202026-04-07%20at%2023.25.26.jpeg'
  ];
  
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const cacheMousePos = useRef({ x: 0, y: 0 });
  const threshold = 80;
  const currentImg = useRef(0);
  const zIndexVal = useRef(1);

  const heroTitle = t('hero.title');
  const heroTagline = tagline;

  useLayoutEffect(() => {
    if (!taglineRef.current || !titleRef.current) return;
    
    // We target the individual spans for the entry animation
    const titleChars = titleRef.current.querySelectorAll('.hero-title-char');
    const taglineWords = taglineRef.current.querySelectorAll('.hero-tagline-word');

    // NJB Title Animation
    gsap.from(titleChars, {
      y: 50,
      opacity: 0,
      stagger: 0.03,
      duration: 0.6,
      ease: "back.out(1.7)",
      delay: 0.2
    });

    // Tagline Animation
    gsap.from(taglineWords, {
      opacity: 0,
      y: 15,
      stagger: 0.06,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.8
    });

    // Mouse Move Logic for Trail (kept as is)
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const getDistance = (p1: {x:number, y:number}, p2: {x:number, y:number}) => {
      return Math.hypot(p2.x - p1.x, p2.y - p1.y);
    };

    const render = () => {
      const distance = getDistance(mousePos.current, lastMousePos.current);
      
      cacheMousePos.current.x = gsap.utils.interpolate(cacheMousePos.current.x, mousePos.current.x, 0.1);
      cacheMousePos.current.y = gsap.utils.interpolate(cacheMousePos.current.y, mousePos.current.y, 0.1);

      if (distance > threshold) {
        showNextImage();
        lastMousePos.current = { ...mousePos.current };
      }
      requestAnimationFrame(render);
    };

    const showNextImage = () => {
      const img = imgRefs.current[currentImg.current];
      if (!img) return;

      zIndexVal.current++;
      gsap.killTweensOf(img);
      const tl = gsap.timeline();
      
      tl.set(img, {
        startAt: { opacity: 0, scale: 1 },
        opacity: 1,
        scale: 1,
        zIndex: zIndexVal.current,
        x: mousePos.current.x - img.offsetWidth / 2,
        y: mousePos.current.y - img.offsetHeight / 2,
      })
      .to(img, {
        duration: 1.2,
        ease: "expo.out",
        opacity: 0,
        scale: 0.2,
      });

      currentImg.current = (currentImg.current + 1) % images.length;
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [heroTagline, language, images.length]);

  return (
    <section 
      ref={sectionRef}
      key={language} 
      className="relative md:min-h-[100vh] flex flex-col justify-center md:justify-between items-center md:items-stretch gap-6 md:gap-0 pt-24 pb-8 md:py-32 px-12 md:px-24 overflow-hidden bg-white"
    >
      {/* Motion Trail Container */}
      <div className="absolute inset-0 pointer-events-none z-[50]">
        {images.map((src, i) => (
          <div
            key={i}
            ref={el => imgRefs.current[i] = el}
            className="absolute opacity-0 w-32 md:w-48 aspect-square will-change-transform"
          >
            <img 
              src={src} 
              alt="" 
              className="w-full h-full object-cover rounded-md" 
            />
          </div>
        ))}
      </div>

      <div
        className="relative z-10 w-full flex md:justify-start justify-center pt-8 md:pt-0"
      >
        <h1 
          ref={titleRef}
          className="text-[35vw] md:text-[25vw] font-heading font-medium leading-[0.8] tracking-tighter select-none cursor-default text-black mix-blend-difference flex"
        >
          {heroTitle.split("").map((char, i) => (
            <motion.span
              key={i}
              className="hero-title-char inline-block whitespace-pre"
              whileHover={{ y: -30 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {char}
            </motion.span>
          ))}
        </h1>
      </div>

      <div className="w-full flex md:justify-end justify-center pb-8 md:pb-0 relative z-10">
        <p
          ref={taglineRef}
          className="hero-tagline max-w-sm md:max-w-xl text-2xl md:text-5xl font-heading font-medium md:leading-[1.1] leading-tight text-center md:text-right select-none text-black mix-blend-difference flex flex-wrap justify-center md:justify-end gap-x-[0.3em]"
        >
          {heroTagline.split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="hero-tagline-word inline-block whitespace-nowrap"
              whileHover={{ y: -15 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>
      <div id="vision-trigger" className="absolute bottom-0 w-full h-1" />
    </section>
  );
};

const ExpandingImage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const isMobile = window.innerWidth < 768;

  useLayoutEffect(() => {
    if (!containerRef.current || !boxRef.current) return;

    gsap.fromTo(boxRef.current, {
      width: isMobile ? "95%" : "50%",
      height: isMobile ? "70vh" : "50vh",
      borderRadius: isMobile ? "1.2rem" : "2rem",
    }, {
      width: "100%",
      height: "100vh",
      borderRadius: "0rem",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });
  }, [isMobile]);

  return (
    <section ref={containerRef} className="relative h-[100vh] md:h-[120vh] flex items-center justify-center bg-white overflow-hidden">
      <div 
        ref={boxRef}
        className="bg-zinc-100 flex items-center justify-center overflow-hidden rounded-[2rem]"
      >
        <img 
          src="/proyectos/Original/portada-1.webp" 
          alt="Original Portfolio" 
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

const CompanyValue = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const textRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!textRef.current || !sectionRef.current) return;
    
    // Scoped context for animations
    const ctx = gsap.context(() => {
      const split = new SplitType(textRef.current!, { types: 'words' });
      
      gsap.from(split.words, {
        opacity: 0,
        y: 15,
        stagger: 0.06,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          once: true
        }
      });
    }, sectionRef);

    // Background transition — targets the parent wrapper
    const wrapperEl = document.getElementById("color-transition-wrapper");
    if (wrapperEl) {
      gsap.to(wrapperEl, {
        backgroundColor: "#000000",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "60% center",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(".company-value-text", {
        color: "#ffffff",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "60% center",
          end: "bottom top",
          scrub: true,
        }
      });
    }

    return () => {
      ctx.revert();
    };
  }, [t]);

  return (
    <section ref={sectionRef} className="py-12 md:pt-64 md:pb-32 flex items-center justify-center px-6">
      <div className="container mx-auto max-w-4xl text-center space-y-12">
        <p 
          key={t('intro.text')}
          ref={textRef}
          className="company-value-text text-2xl md:text-3xl font-heading font-light leading-relaxed text-black"
        >
          {t('intro.text')}
        </p>
        
        <div className="flex flex-col items-center gap-4">
          <motion.button
            onClick={() => navigate('/contacto')}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-premium-expansion px-10 py-5 md:px-14 md:py-7 font-heading font-medium text-xl md:text-2xl transition-all gap-4 group rounded-full"
          >
            <Calendar size={28} className="transition-transform group-hover:scale-110" />
            <span className="relative z-10">{t('intro.cta')}</span>
          </motion.button>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="company-value-text text-sm md:text-base font-heading font-light tracking-wide text-black"
          >
            {t('intro.subtext')}
          </motion.span>
        </div>
      </div>
    </section>
  );
};

const Mission = () => {
  const { t, language } = useLanguage();
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, { types: "words" });
    
    gsap.set(split.words, { color: "rgba(255,255,255,0.15)" });

    gsap.to(split.words, {
      color: "#fff",
      stagger: 0.1,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "bottom 30%",
        scrub: true,
      },
    });

    return () => split.revert();
  }, [language]);

  return (
    <section id="vision" className="pt-32 md:pt-64 pb-16 md:pb-24 px-6 bg-transparent overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <h2 
          ref={textRef}
          className="text-4xl md:text-7xl font-heading font-medium leading-tight tracking-tighter text-white text-center max-w-5xl mx-auto"
        >
          {t('mission.text')}
        </h2>
      </div>
    </section>
  );
};

const ProblemCards = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  const cards = [
    { title: t('problem.title1'), icon: Users },
    { title: t('problem.title2'), icon: TrendingUp },
    { title: t('problem.title3'), icon: Target }
  ];

  return (
    <section ref={containerRef} className="text-white pt-8 md:pt-16 pb-16 md:pb-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-10 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col items-center text-center gap-6 group hover:bg-white/10 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <card.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-heading font-light tracking-tight opacity-90">
                {card.title}
              </h3>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-2xl md:text-3xl font-heading font-light leading-relaxed max-w-3xl mx-auto opacity-70">
            {t('problem.conclusion')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectMagazine = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);

  const projectImages = [
    { src: "/lovabol/1f8086c6-29ff-4506-ba2b-db0a6f5c50b9.png", alt: "Lovabol" },
    { src: "/lovabol/6E812A4C-4BC6-4099-825E-618A91AEE912.png", alt: "Lovabol" },
    { src: "/lovabol/4b1d397e-9012-4f48-ba04-e7e867715ceb.png", alt: "Lovabol" },
    { src: "/proyectos/Tularosa/mockup-de-comida.webp", alt: "Tularosa Mockup" },
    { src: "/lovabol/image%20525.png", alt: "Lovabol" },
    { src: "/lovabol/E500D044-AA01-4071-B412-0793BC5B0BA6.png", alt: "Lovabol" },
    { src: "/proyectos/Original/isotipo.webp", alt: "Original Logo" },
    { src: "/lovabol/PHOTO-2025-04-30-17-51-16.jpg", alt: "Lovabol" },
    { src: "/lovabol/3859ff89-14e3-4f24-82c6-f707ed3b7637.png", alt: "Lovabol" },
    { src: "/lovabol/WhatsApp%20Image%202026-04-07%20at%2023.25.26.jpeg", alt: "Lovabol" },
  ];

  useLayoutEffect(() => {
    if (!containerRef.current || !cardsRef.current) return;

    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 767px)",
      isDesktop: "(min-width: 768px)"
    }, (context) => {
      const { isMobile } = context.conditions as any;
      const cards = cardsRef.current!.querySelectorAll('.magazine-card');
      const totalCards = cards.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "+=1500px" : "+=2500px",
          pin: true,
          scrub: 1,
          onEnter: () => {
            gsap.to(containerRef.current, { backgroundColor: "#ffffff", duration: 0.5 });
            gsap.to(".magazine-text", { color: "#000000", opacity: 1, duration: 0.5 });
          },
          onLeaveBack: () => {
            gsap.to(containerRef.current, { backgroundColor: "#000000", duration: 0.5 });
            gsap.to(".magazine-text", { color: "#ffffff", duration: 0.5 });
          }
        }
      });

      // Heading animation
      tl.fromTo(".magazine-text", {
        y: 50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2
      }, 0);

      // Cards fanning out
      cards.forEach((card, i) => {
        const spreadAngle = isMobile ? 6 : 12;
        const spreadX = isMobile ? 25 : 80;
        
        const angle = (i - (totalCards - 1) / 2) * spreadAngle;
        const xOffset = (i - (totalCards - 1) / 2) * spreadX;
        
        tl.fromTo(card, {
          x: 0,
          y: isMobile ? 30 : 0,
          z: -1000,
          rotationY: 0,
          rotationZ: 0,
          opacity: 1,
          scale: 0.9
        }, {
          x: xOffset,
          y: 0,
          z: 0,
          rotationY: angle,
          rotationZ: angle * 0.2,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out"
        }, 0.2 + (i * 0.05));
      });

      // Push back for depth at the end
      tl.to(cardsRef.current, {
        z: isMobile ? -100 : -200,
        duration: 0.3
      }, "-=0.2");

      return () => {
        // cleanup split type if any (none here)
      };
    });

    return () => {
      mm.revert();
    };
  }, [language]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100vh] md:min-h-[130vh] bg-white flex flex-col items-center justify-center overflow-hidden perspective-1000 pt-24 md:pt-32 pb-24 z-30 isolate"
    >
      <div className="absolute top-16 md:top-32 left-0 w-full text-center z-20 px-4 md:px-0">
        <h2 className="magazine-text opacity-0 text-4xl md:text-7xl font-heading font-medium tracking-tighter text-black mb-4">
          {t('grid.title')}
        </h2>
        <div className="magazine-text opacity-0 mt-6 md:mt-8">
          <a 
            href="/trabajo" 
            className="group inline-flex items-center gap-4 px-6 md:px-8 py-2.5 md:py-3 bg-white text-black border border-black/10 rounded-full font-heading font-medium hover:bg-black hover:text-white transition-all text-sm md:text-base overflow-hidden"
          >
            {t('grid.button')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <div 
        ref={cardsRef} 
        className="relative w-full h-[50vh] md:h-[65vh] flex items-center justify-center transform-style-3d preserve-3d mt-24 md:mt-48"
      >
        {projectImages.map((img, i) => (
          <div 
            key={i}
            className="magazine-card absolute w-[130px] md:w-[320px] aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden bg-white preserve-3d will-change-transform"
          >
            <img 
              src={img.src} 
              alt={img.alt} 
              className="w-full h-full object-cover transition-all duration-700" 
            />
          </div>
        ))}
      </div>
    </section>
  );
};

const StackedValue = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const panels = gsap.utils.toArray(".stacked-panel");
      const lastPanel = panels[panels.length - 1];
      
      panels.forEach((panel: any, i) => {
        const inner = panel.querySelector(".stacked-inner");
        if (!inner) return;

        const panelHeight = inner.offsetHeight;
        const windowHeight = window.innerHeight;
        const difference = panelHeight - windowHeight;
        const fakeScrollRatio = difference > 0 ? (difference / (difference + windowHeight)) : 0;

        if (fakeScrollRatio) {
          panel.style.marginBottom = (panelHeight * fakeScrollRatio) + "px";
        }

        const isLast = panel === lastPanel;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "bottom bottom",
            end: () => fakeScrollRatio ? `+=${panelHeight}` : "bottom top",
            pinSpacing: false,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true
          }
        });

        if (fakeScrollRatio) {
          tl.to(inner, {
            yPercent: -100, 
            y: windowHeight, 
            duration: 1 / (1 - fakeScrollRatio) - 1, 
            ease: "none"
          });
        }

        if (!isLast) {
          tl.fromTo(panel, 
            { scale: 1, opacity: 1 }, 
            { scale: 0.7, opacity: 0.5, duration: 0.9, ease: "none" }
          )
          .to(panel, { opacity: 0, duration: 0.1 });
        }
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden px-4 md:px-8 py-8 flex flex-col gap-4 md:gap-0">
      {/* 1. Clientes */}
      <section className="stacked-panel md:h-[calc(100vh-4rem)] flex items-start justify-center bg-white z-[1] overflow-hidden border border-zinc-200/50 rounded-[24px] md:rounded-[40px] shadow-sm">
        <div className="stacked-inner max-w-4xl w-full text-center py-10 md:py-20 px-4 md:px-8">
          <div className="flex justify-center mb-6 md:mb-10 pt-4">
            <Globe className="w-10 h-10 md:w-12 md:h-12 text-black/10" />
          </div>
          <h2 className="text-2xl md:text-6xl font-heading font-medium mb-4 md:mb-12 dynamic-text">{t('stacked.clientes.title')}</h2>
          <p className="text-base md:text-2xl text-muted-foreground mb-6 md:mb-12">{t('stacked.clientes.subtitle')}</p>
          <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-16 mb-6 md:mb-16">
            <div className="text-xl md:text-4xl font-heading tracking-tight underline underline-offset-8 decoration-black/5">{t('stacked.clientes.item1')}</div>
            <div className="text-xl md:text-4xl font-heading tracking-tight underline underline-offset-8 decoration-black/5">{t('stacked.clientes.item2')}</div>
            <div className="text-xl md:text-4xl font-heading tracking-tight underline underline-offset-8 decoration-black/5">{t('stacked.clientes.item3')}</div>
          </div>
          <div className="flex items-center justify-center gap-3 text-base md:text-xl font-heading font-medium text-black/80">
            <span>{t('stacked.clientes.footer')}</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </div>
        </div>
      </section>

      {/* 2. Resultados */}
      <section className="stacked-panel md:h-[calc(100vh-4rem)] flex items-start justify-center bg-black text-white z-[2] overflow-hidden border border-white/10 rounded-[24px] md:rounded-[40px] shadow-2xl">
        <div className="stacked-inner max-w-4xl w-full text-center py-10 md:py-20 px-4 md:px-8">
          <div className="flex justify-center mb-6 md:mb-10 pt-4">
            <BarChart3 className="w-10 h-10 md:w-12 md:h-12 text-white/10" />
          </div>
          <h2 className="text-2xl md:text-6xl font-heading font-medium mb-6 md:mb-12 text-white">{t('stacked.resultados.title')}</h2>
          <p className="text-base md:text-2xl text-white/70 mb-6 md:mb-12">{t('stacked.resultados.subtitle')}</p>
          <ul className="text-left max-w-2xl mx-auto space-y-4 md:space-y-6">
            {[
              t('stacked.resultados.item1'),
              t('stacked.resultados.item2'),
              t('stacked.resultados.item3'),
              t('stacked.resultados.item4'),
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-base md:text-2xl border-l-2 border-white/20 pl-4 md:pl-6">
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 md:mt-12 p-6 md:p-12 border-2 border-dashed border-white/10 rounded-[24px] md:rounded-[40px] bg-white/5 mx-auto max-w-2xl">
            <div className="flex items-center justify-center gap-3 text-base md:text-xl text-white/50">
              <span>{t('stacked.resultados.footer')}</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6 md:mt-8 opacity-10">
              <div className="aspect-video bg-white/10 rounded-2xl"></div>
              <div className="aspect-video bg-white/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Contenido */}
      <section className="stacked-panel md:h-[calc(100vh-4rem)] flex items-start justify-center bg-white z-[3] overflow-hidden border border-zinc-200/50 rounded-[24px] md:rounded-[40px] shadow-sm">
        <div className="stacked-inner max-w-4xl w-full text-center py-10 md:py-20 px-4 md:px-8">
          <div className="flex justify-center mb-6 md:mb-10 pt-4">
            <Video className="w-10 h-10 md:w-12 md:h-12 text-black/10" />
          </div>
          <h2 className="text-2xl md:text-6xl font-heading font-medium mb-6 md:mb-12 dynamic-text">{t('stacked.contenido.title')}</h2>
          <p className="text-base md:text-2xl text-muted-foreground mb-6 md:mb-12">{t('stacked.contenido.subtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-left max-w-3xl mx-auto">
            {[t('stacked.contenido.item1'), t('stacked.contenido.item2'), t('stacked.contenido.item3'), t('stacked.contenido.item4')].map((item, i) => (
              <div key={i} className="p-5 md:p-8 rounded-[20px] md:rounded-[30px] bg-secondary/5 border border-border/10">
                <span className="text-base md:text-2xl font-heading font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Proceso */}
      <section className="stacked-panel md:h-[calc(100vh-4rem)] flex items-start justify-center bg-zinc-50 z-[4] overflow-hidden border border-zinc-200/50 rounded-[24px] md:rounded-[40px] shadow-sm">
        <div className="stacked-inner max-w-4xl w-full py-10 md:py-20 px-4 md:px-8">
          <div className="flex justify-center mb-6 md:mb-10 pt-4">
            <Settings2 className="w-10 h-10 md:w-12 md:h-12 text-black/10" />
          </div>
          <h2 className="text-2xl md:text-6xl font-heading font-medium mb-8 md:mb-16 text-center dynamic-text">{t('stacked.proceso.title')}</h2>
          <div className="space-y-6 md:space-y-12 max-w-2xl mx-auto">
            {[
              t('stacked.proceso.item1'),
              t('stacked.proceso.item2'),
              t('stacked.proceso.item3'),
              t('stacked.proceso.item4'),
              t('stacked.proceso.item5'),
            ].map((item, i) => (
              <div key={i} className="flex gap-4 md:gap-8 items-center border-b border-black/5 pb-6 md:pb-8 last:border-0">
                <span className="text-4xl md:text-7xl font-heading font-bold text-black/5">{i + 1}</span>
                <span className="text-base md:text-3xl font-heading font-medium text-black/80">{item.replace(`${i+1}. `, '')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Solution = () => {
  const { t, language } = useLanguage();
  const descriptionRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!descriptionRef.current) return;

    const split = new SplitType(descriptionRef.current, { types: "words" });
    
    gsap.set(split.words, { color: "rgba(255,255,255,0.15)" });

    gsap.to(split.words, {
      color: "#fff",
      stagger: 0.1,
      scrollTrigger: {
        trigger: descriptionRef.current,
        start: "top 80%",
        end: "bottom 40%",
        scrub: true,
      },
    });

    return () => split.revert();
  }, [language]);

  const items = [
    { key: 'solution.item1', icon: Video },
    { key: 'solution.item2', icon: Megaphone, bestseller: true },
    { key: 'solution.item3', icon: PieChart },
    { key: 'solution.item4', icon: Crosshair },
    { key: 'solution.item5', icon: Mail }
  ];

  return (
    <section className="py-32 md:py-64 px-6 bg-black text-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 text-xs md:text-sm font-heading font-medium tracking-widest mb-8"
          >
            <Rocket size={14} className="text-white" />
            {t('solution.title')}
          </motion.div>
          <h2 
            ref={descriptionRef}
            className="text-4xl md:text-7xl font-heading font-medium tracking-tighter mb-8 max-w-4xl leading-tight"
          >
            {t('solution.description')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`p-8 md:p-12 rounded-[40px] border transition-all duration-300 group relative overflow-hidden flex flex-col justify-between min-h-[320px] shadow-2xl ${
                item.bestseller 
                ? 'bg-white text-black border-white ring-4 ring-white/10' 
                : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex justify-between items-start mb-12">
                <div className={`p-4 rounded-2xl ${item.bestseller ? 'bg-black/5' : 'bg-white/10'}`}>
                  <item.icon size={32} className={item.bestseller ? 'text-black' : 'text-white'} />
                </div>
                {item.bestseller && (
                  <span className="px-4 py-1.5 bg-black text-white text-[10px] tracking-widest font-heading font-medium rounded-full animate-pulse flex items-center gap-1.5">
                    <Flame size={12} className="text-white fill-white" />
                    {t('solution.bestseller')}
                  </span>
                )}
              </div>
              
              <div>
                <h3 className="text-2xl md:text-3xl font-heading font-medium leading-tight">
                  {t(item.key)}
                </h3>
              </div>

              {/* Decorative light effect for the bestseller card */}
              {item.bestseller && (
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-black/5 rounded-full blur-3xl group-hover:bg-black/10 transition-colors" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Focuses = () => {
  const { t } = useLanguage();
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useLayoutEffect(() => {
    if (!textRef.current) return;
    
    // We use a small delay or a setTimeout to ensure the DOM is ready and translations are loaded
    const ctx = gsap.context(() => {
      const split = new SplitType(textRef.current!, { types: 'words' });
      
      gsap.from(split.words, {
        opacity: 0, 
        y: 15,
        stagger: 0.06, 
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
        }
      });
    }, textRef);

    return () => ctx.revert();
  }, [t]);

  const focuses = [
    { key: 'focuses.item1', icon: Store },
    { key: 'focuses.item2', icon: Briefcase },
    { key: 'focuses.item3', icon: Utensils },
    { key: 'focuses.item4', icon: Home },
    { key: 'focuses.item5', icon: User },
    { key: 'focuses.item6', icon: Rocket },
  ];

  return (
    <section className="pt-32 pb-32 md:pt-64 md:pb-32 px-6 bg-transparent">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 text-xs md:text-sm font-heading font-medium tracking-widest mb-8 dynamic-text"
          >
            <Globe size={14} className="dynamic-text" />
            {t('focuses.title')}
          </motion.div>
          <h2 
            ref={textRef}
            className="text-3xl md:text-5xl font-heading font-medium mb-8 dynamic-text max-w-3xl mx-auto leading-tight"
          >
            {t('focuses.subtitle')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {focuses.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-8 md:p-12 rounded-[32px] border border-black/5 bg-white dynamic-text text-left transition-all duration-500 hover:!bg-black hover:!border-black flex flex-col justify-between min-h-[160px] md:min-h-[200px] group cursor-pointer shadow-sm hover:shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center mb-6 group-hover:!bg-white/10 transition-all duration-500">
                <item.icon size={24} className="dynamic-text opacity-50 group-hover:!text-white group-hover:opacity-100 transition-all duration-500" />
              </div>
              <span className="font-heading font-medium text-lg md:text-xl leading-tight group-hover:!text-white transition-colors duration-500">
                {t(item.key)}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 font-heading font-medium tracking-tight text-xl dynamic-text opacity-80"
        >
          {t('focuses.footer')}
        </motion.p>
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
          <p className="font-heading font-light text-foreground/80 leading-relaxed mb-8 text-sm md:text-base">{item.text[language as 'es' | 'en' | 'fr']}</p>
          <div className="flex items-center gap-4">
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-medium truncate">{item.name}</span>
              <span className="text-[10px] md:text-xs text-muted-foreground truncate opacity-70 tracking-wide">{item.role[language as 'es' | 'en' | 'fr']}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="testimonials" className="bg-white py-48 md:py-80 px-6 relative z-[10] overflow-hidden">
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

    </section>
  );
};




const ContactLink = ({ label, value, href, icon: Icon, showTooltip = true, variant = 'light' }: any) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isDark = variant === 'dark';

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
        className={`inline-flex items-center gap-4 px-8 py-5 rounded-2xl transition-all border font-heading font-medium text-lg ${
          isDark
            ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white/70 hover:text-white'
            : 'bg-secondary/10 hover:bg-secondary/20 border-border/5 dynamic-text'
        }`}
      >
        <Icon size={20} className={isDark ? 'text-white/70' : 'dynamic-text'} />
        {label}
        {copied && <Check size={16} className="text-green-500 ml-2" />}
      </motion.a>

      <AnimatePresence>
        {hovered && showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 px-4 py-2 text-xs rounded-lg whitespace-nowrap pointer-events-none z-50 shadow-xl ${
              isDark ? 'bg-white text-black' : 'bg-black text-white'
            }`}
          >
            <div className={`absolute top-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${isDark ? 'bg-white' : 'bg-black'}`} />
            {copied ? t('common.copied') : t('common.copy')}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
// Animated SVG illustrations for the Offer cards
const StrategyIllustration = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    if (!svgRef.current) return;
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".chart-line", { strokeDasharray: 600, strokeDashoffset: 600 });
      gsap.set(".data-dot", { opacity: 0, scale: 0, transformOrigin: "center center" });
      gsap.set(".chart-bar", { scaleY: 0, transformOrigin: "bottom center" });
      gsap.set(".grid-line", { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 80%",
          once: true,
        }
      });

      tl.to(".grid-line", { opacity: 1, stagger: 0.05, duration: 0.3 })
        .to(".chart-bar", { scaleY: 1, stagger: 0.06, duration: 0.4, ease: "power2.out" }, "-=0.1")
        .to(".chart-line", { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, "-=0.5")
        .to(".data-dot", { opacity: 1, scale: 1, stagger: 0.1, duration: 0.3, ease: "back.out(2)" }, "-=0.8");
    }, svgRef);

    return () => ctx.revert();
  }, []);

  const bars = [40, 70, 55, 90, 80, 120, 110, 150];
  const dots = [
    { cx: 44, cy: 165 }, { cx: 72, cy: 140 }, { cx: 100, cy: 150 },
    { cx: 128, cy: 120 }, { cx: 156, cy: 130 }, { cx: 184, cy: 90 },
    { cx: 212, cy: 100 }, { cx: 240, cy: 60 }
  ];

  return (
    <svg ref={svgRef} viewBox="0 0 280 200" className="w-full h-auto">
      {/* Background grid */}
      {[...Array(6)].map((_, i) => (
        <line key={`g${i}`} className="grid-line" x1="20" y1={30 + i * 30} x2="260" y2={30 + i * 30}
          stroke="#e4e4e7" strokeWidth="0.5" strokeDasharray="4,4" />
      ))}
      {/* Rising bar chart */}
      {bars.map((h, i) => (
        <rect key={i} className="chart-bar" x={35 + i * 28} y={200 - h} width="18" height={h} rx="4"
          fill={i >= 6 ? "#000" : "#e4e4e7"} />
      ))}
      {/* Trend line */}
      <path className="chart-line" d="M44 165 L72 140 L100 150 L128 120 L156 130 L184 90 L212 100 L240 60"
        fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
      {/* Data dots */}
      {dots.map((d, i) => (
        <circle key={i} className="data-dot" cx={d.cx} cy={d.cy} r="4" fill="#000" />
      ))}
    </svg>
  );
};


const ScaleIllustration = () => (
  <motion.svg
    viewBox="0 0 280 200"
    className="w-full h-auto"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    {/* Browser window frame */}
    <motion.rect x="30" y="20" width="220" height="160" rx="12" fill="none" stroke="#e4e4e7" strokeWidth="1.5"
      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.8 }}
    />
    <motion.rect x="30" y="20" width="220" height="30" rx="12" fill="#fafafa" stroke="#e4e4e7" strokeWidth="1.5"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }} transition={{ delay: 0.3 }}
    />
    {/* Browser dots */}
    {[52, 68, 84].map((cx, i) => (
      <motion.circle key={i} cx={cx} cy="35" r="3.5"
        fill={["#ef4444", "#eab308", "#22c55e"][i]}
        initial={{ scale: 0 }} whileInView={{ scale: 1 }}
        viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
      />
    ))}
    {/* Content blocks */}
    {[{y: 65, w: 140}, {y: 85, w: 100}, {y: 105, w: 180}, {y: 125, w: 120}].map((b, i) => (
      <motion.rect key={i} x="50" y={b.y} width={b.w} height="10" rx="3" fill="#e4e4e7"
        initial={{ width: 0 }} whileInView={{ width: b.w }}
        viewport={{ once: true }} transition={{ delay: 0.7 + i * 0.12, duration: 0.4 }}
      />
    ))}
    {/* Floating phone */}
    <motion.g
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      <rect x="190" y="90" width="50" height="80" rx="8" fill="white" stroke="#d4d4d8" strokeWidth="1" />
      <rect x="197" y="102" width="36" height="4" rx="1.5" fill="#e4e4e7" />
      <rect x="197" y="112" width="24" height="4" rx="1.5" fill="#e4e4e7" />
      <rect x="197" y="122" width="30" height="4" rx="1.5" fill="#e4e4e7" />
      <circle cx="215" cy="160" r="4" fill="#e4e4e7" />
    </motion.g>
    {/* Cursor */}
    <motion.path d="M160 130 L160 148 L167 142 L175 155" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }} transition={{ delay: 1.6 }}
    />
  </motion.svg>
);

const Offer = () => {
  const { t } = useLanguage();

  const card1Items = [
    t('offer.card1.item1'),
    t('offer.card1.item2'),
    t('offer.card1.item3'),
    t('offer.card1.item4'),
    t('offer.card1.item5'),
    t('offer.card1.item6'),
  ];

  const card2Items = [
    t('offer.card2.item1'),
    t('offer.card2.item2'),
    t('offer.card2.item3'),
  ];

  return (
    <section className="py-32 md:py-48 px-6 bg-white relative z-[10]">
      <div className="container mx-auto max-w-6xl">
        {/* Title */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-heading font-medium tracking-tight dynamic-text max-w-3xl mx-auto leading-tight">
            {t('offer.title')}
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 - Strategy */}
          <motion.div
            className="bg-white rounded-[32px] border border-zinc-200/60 p-8 md:p-10 flex flex-col shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-shadow duration-500"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-zinc-50 rounded-[24px] p-6 mb-8 overflow-hidden">
              <StrategyIllustration />
            </div>
            <h3 className="text-xl md:text-2xl font-heading font-medium mb-6 dynamic-text">
              {t('offer.card1.title')}
            </h3>
            <ul className="space-y-4 flex-1">
              {card1Items.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-black flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-base md:text-lg text-zinc-700 font-light">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Card 2 - Scale */}
          <motion.div
            className="bg-white rounded-[32px] border border-zinc-200/60 p-8 md:p-10 flex flex-col shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-shadow duration-500"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="bg-zinc-50 rounded-[24px] p-6 mb-8 overflow-hidden">
              <ScaleIllustration />
            </div>
            <h3 className="text-xl md:text-2xl font-heading font-medium mb-6 dynamic-text">
              {t('offer.card2.title')}
            </h3>
            <ul className="space-y-4 flex-1">
              {card2Items.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-black flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-base md:text-lg text-zinc-700 font-light">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Footer notes */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 text-base md:text-lg font-heading font-medium text-black/80">
            <ArrowRight className="w-5 h-5" />
            <span>{t('offer.footer.commitment')}</span>
          </div>
          <div className="flex items-center gap-3 text-base md:text-lg font-heading font-medium text-amber-600">
            <AlertCircle className="w-5 h-5" />
            <span>{t('offer.footer.limited')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ConnectingFooter = () => {
  const { t } = useLanguage();
  const title = t('footer.headline');
  const letters = title.split("");

  return (
    <section id="connect" className="pt-16 md:pt-32 pb-8 px-4 md:px-8 relative bg-white overflow-hidden">
      <div id="connect-trigger" className="absolute top-0 left-0 w-full h-1" />
      
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
                variant="dark"
              />
              <ContactLink
                label="+1 (514) 718-0228"
                value="+15147180228"
                href="tel:+15147180228"
                icon={Phone}
                variant="dark"
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


const Index = () => {
  useLayoutEffect(() => {
    // 1. Initial State
    gsap.set(document.documentElement, { "--color": "#ffffff" });
    gsap.set(".dynamic-text", { color: "#000000" });

    const doc = document.documentElement;

    // DEFINITIVE COLOR TRIGGERS (Using state-based callbacks for 100% stability)

    // BLACK -> WHITE (Transition out of Mission)
    ScrollTrigger.create({
      trigger: "#vision",
      start: "bottom 80%",
      onEnter: () => {
        gsap.to(doc, { "--color": "#ffffff", duration: 0.5 });
        gsap.to(".dynamic-text", { color: "#000000", duration: 0.5 });
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
    <div className="min-h-screen bg-white">
      <AccordionNavbar />
      <Hero />
      <ExpandingImage />
      <div id="color-transition-wrapper" className="bg-white">
        <CompanyValue />
        <Mission />
        <ProblemCards />
        <Solution />
      </div>
      <ProjectMagazine />
      <Focuses />
      <StackedValue />
      <Offer />
      <Testimonials />
      <ConnectingFooter />
    </div>
  );
};

export default Index;
