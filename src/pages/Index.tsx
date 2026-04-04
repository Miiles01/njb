import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Check, Download, User, ArrowRight, Users, TrendingUp, Target } from "lucide-react";
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
    '/user_uploads/1.png',
    '/user_uploads/2.png',
    '/user_uploads/3.png',
    '/user_uploads/4.png',
    '/user_uploads/5.png',
    '/user_uploads/6.png',
    '/user_uploads/7.png',
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
      className="relative min-h-[100vh] flex flex-col justify-between py-12 md:py-32 px-12 md:px-24 overflow-hidden bg-white"
    >
      {/* Motion Trail Container */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {images.map((src, i) => (
          <div
            key={i}
            ref={el => imgRefs.current[i] = el}
            className="absolute opacity-0 w-32 md:w-48 h-auto will-change-transform"
          >
            <img 
              src={src} 
              alt="" 
              className="w-full h-auto object-contain" 
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

  useLayoutEffect(() => {
    if (!containerRef.current || !boxRef.current) return;

    gsap.fromTo(boxRef.current, {
      width: "50%",
      height: "50vh",
      borderRadius: "2rem",
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
  }, []);

  return (
    <section ref={containerRef} className="relative h-[120vh] flex items-center justify-center bg-white overflow-hidden">
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
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!textRef.current) return;
    
    // Using a scope context to avoid selector issues
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
    }, textRef); // Correctly scoped to the element

    return () => ctx.revert();
  }, [t]); // Depend on t to re-run when language changes

  return (
    <section className="py-24 md:pt-64 md:pb-32 bg-white flex items-center justify-center px-6">
      <div className="container mx-auto max-w-4xl text-center space-y-12">
        <p 
          key={t('intro.text')} // Force re-render on language change
          ref={textRef}
          className="text-2xl md:text-3xl font-heading font-light leading-relaxed text-black"
        >
          {t('intro.text')}
        </p>
        
        <div className="flex flex-col items-center gap-4">
          <motion.a
            href="#connect"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-black text-white rounded-full font-heading font-medium text-lg hover:shadow-xl transition-all"
          >
            {t('intro.cta')}
          </motion.a>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-sm md:text-base font-heading font-light tracking-wide text-black"
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
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !horizontalRef.current || !textRef.current) return;

    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 768px)",
      isDesktop: "(min-width: 769px)"
    }, (context) => {
      const { isMobile } = context.conditions as any;
      
      // Split text into characters
      const split = new SplitType(textRef.current!, { types: "chars,words" });
      
      // Calculate scroll distance exactly based on content width
      const scrollDistance = horizontalRef.current!.scrollWidth - window.innerWidth;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollDistance + (isMobile ? 1000 : 2000)}`,
          pin: true,
          scrub: 1,
          onEnter: () => {
            gsap.to(sectionRef.current, { backgroundColor: "#000000", duration: 0.5 });
            gsap.to(textRef.current, { color: "#ffffff", duration: 0.5 });
          },
          onLeaveBack: () => {
            gsap.to(sectionRef.current, { backgroundColor: "#ffffff", duration: 0.5 });
            gsap.to(textRef.current, { color: "#000000", duration: 0.5 });
          },
        }
      });

      // Horizontal movement tween - using exact pixel calculation
      const scrollTween = gsap.to(horizontalRef.current, {
        x: -scrollDistance,
        ease: "none"
      });
      
      tl.add(scrollTween);

      // Stabilized character animations - Pieces from above and below
      split.chars.forEach((char, i) => {
        gsap.from(char, {
          y: i % 2 === 0 ? -200 : 200, // More distance for assembly
          opacity: 0,
          rotateX: 80,
          rotateY: i % 2 === 0 ? 15 : -15, // Subtle Y rotation for organic feel
          scale: 0.8,
          filter: "blur(4px)", // Sharp to clear effect
          ease: "back.out(2.5)",
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: "left 98%",
            end: "left 48%",
            scrub: true
          }
        });
      });

      return () => {
        split.revert();
      };
    }, sectionRef.current); // Use current of the ref for the scope

    return () => {
      mm.revert();
    };
  }, [language]);

  return (
    <section 
      id="vision" 
      ref={sectionRef} 
      className="relative min-h-[100vh] bg-white transition-colors duration-500 overflow-hidden flex items-center perspective-1000"
    >
      <div 
        ref={horizontalRef} 
        className="flex h-full items-center whitespace-nowrap will-change-transform"
        style={{ 
          paddingLeft: '50vw', 
          paddingRight: '50vw',
          width: 'max-content'
        }}
      >
        <h2 
          key={language}
          ref={textRef} 
          className="text-[14vw] md:text-[11vw] font-heading font-medium leading-none tracking-tighter text-black transition-colors duration-500"
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
    <section ref={containerRef} className="bg-black text-white py-32 px-6">
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
          <p className="text-2xl md:text-3xl font-heading font-light leading-relaxed max-w-3xl mx-auto opacity-70 italic">
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
    { src: "/proyectos/Original/portada-1.webp", alt: "Original Cover" },
    { src: "/proyectos/Tularosa/portada-1.webp", alt: "Tularosa Cover" },
    { src: "/proyectos/Original/fotos-instagram.webp", alt: "Original Social" },
    { src: "/proyectos/Tularosa/mockup-de-comida.webp", alt: "Tularosa Mockup" },
    { src: "/proyectos/Original/landing-page-1.webp", alt: "Original Web" },
    { src: "/proyectos/Tularosa/frase-publicitaria-1.webp", alt: "Tularosa Brand" },
    { src: "/proyectos/Original/isotipo.webp", alt: "Original Logo" },
    { src: "/proyectos/Tularosa/publicidad-de-exterior.webp", alt: "Tularosa Ads" },
  ];

  useLayoutEffect(() => {
    if (!containerRef.current || !cardsRef.current) return;

    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 768px)",
      isDesktop: "(min-width: 769px)"
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
        const spreadAngle = isMobile ? 8 : 12;
        const spreadX = isMobile ? 40 : 80;
        
        const angle = (i - (totalCards - 1) / 2) * spreadAngle;
        const xOffset = (i - (totalCards - 1) / 2) * spreadX;
        
        tl.fromTo(card, {
          x: 0,
          y: isMobile ? 50 : 0,
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
      className="relative h-screen bg-white flex flex-col items-center justify-center overflow-hidden perspective-1000 pt-32 z-30 isolate"
    >
      <div className="absolute top-32 left-0 w-full text-center z-20">
        <h2 className="magazine-text opacity-0 text-5xl md:text-7xl font-heading font-medium tracking-tighter text-black mb-4">
          {t('grid.title')}
        </h2>
        <div className="magazine-text opacity-0 mt-8">
          <a 
            href="/trabajo" 
            className="group inline-flex items-center gap-4 px-8 py-3 bg-white text-black border border-black/10 rounded-full font-heading font-medium hover:bg-black hover:text-white transition-all text-sm md:text-base overflow-hidden"
          >
            {t('grid.button')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <div 
        ref={cardsRef} 
        className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center transform-style-3d preserve-3d mt-20 md:mt-40"
      >
        {projectImages.map((img, i) => (
          <div 
            key={i}
            className="magazine-card absolute w-[160px] md:w-[320px] aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden bg-white preserve-3d will-change-transform"
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
              value=""
              href={undefined}
              icon={LinkedinModern}
              showTooltip={false}
            />
            <ContactLink
              label="njb@gmail.com"
              value="njb@gmail.com"
              href="mailto:njb@gmail.com"
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
          <h2 className="text-[12vw] md:text-[15vw] font-heading font-medium tracking-normal md:tracking-tighter leading-none dynamic-text select-none flex cursor-default justify-center w-full">
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
      <CompanyValue />
      <Mission />
      <ProblemCards />
      <ProjectMagazine />
      <Focuses />
      <Testimonials />
      <ConnectingFooter />
    </div>
  );
};

export default Index;
