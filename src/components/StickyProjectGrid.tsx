import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useIsMobile } from "../hooks/use-mobile";
import MobileProjectCarousel from "./MobileProjectCarousel";

gsap.registerPlugin(ScrollTrigger);

const images = [
    { folder: "Colorfit", img: "portada-1.webp" },
    { folder: "Erpxtender", img: "portada-1.webp" },
    { folder: "Jambu", img: "portada-1.webp" },
    { folder: "Mar-Vic", img: "portada-1.webp" },
    { folder: "Miiles", img: "portada-1.webp" },
    { folder: "Naabi-Kanabi", img: "portada-1.webp" },
    { folder: "Original", img: "portada-1.webp" },
    { folder: "Tularosa", img: "portada-1.webp" },
    { folder: "Miiles", img: "mockup-app-web.webp" },
    { folder: "Jambu", img: "packaging.webp" },
    { folder: "Mar-Vic", img: "fotos-publicitarias.webp" },
    { folder: "Colorfit", img: "mockup-tote-bag.webp" },
];

const StickyProjectGrid = () => {
    const { t } = useLanguage();
    const isMobile = useIsMobile();
    const blockRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (isMobile || !blockRef.current || !wrapperRef.current || !gridRef.current) return;

        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray<HTMLElement>(".gallery__item");
            const columns: HTMLElement[][] = [[], [], []];

            items.forEach((item, index) => {
                columns[index % 3].push(item);
            });

            const mainTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: blockRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    pin: wrapperRef.current,
                    scrub: 1,
                    anticipatePin: 1,
                }
            });

            const revealTl = gsap.timeline();
            const wh = window.innerHeight;

            columns.forEach((column, colIndex) => {
                const fromTop = colIndex % 2 === 0;
                revealTl.from(column, {
                    y: wh * (fromTop ? -1.2 : 1.2),
                    stagger: { each: 0.1, from: fromTop ? "end" : "start" },
                    ease: "none",
                }, "reveal");
            });

            const zoomTl = gsap.timeline();
            zoomTl.to(gridRef.current, { scale: 2.05, ease: "power2.inOut" })
                .to(columns[0], { xPercent: -40, ease: "power2.inOut" }, "<")
                .to(columns[2], { xPercent: 40, ease: "power2.inOut" }, "<")
                .to(columns[1], {
                    yPercent: (i) => (i < Math.floor(columns[1].length / 2) ? -40 : 40),
                    ease: "power2.inOut",
                }, "<");

            const uiTl = gsap.timeline();
            uiTl.to([titleRef.current, subtitleRef.current, buttonRef.current], {
                opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out"
            });

            mainTimeline.add(revealTl).add(zoomTl, "-=0.2").add(uiTl, "-=0.3");
        }, blockRef);

        return () => ctx.revert();
    }, [isMobile]);

    if (isMobile) {
        return <MobileProjectCarousel />;
    }

    const getPath = (item: typeof images[0]) => `/proyectos/${item.folder}/${item.img}`;

    return (
        <section id="sticky-grid" ref={blockRef} className="relative h-[450vh] bg-white overflow-hidden">
            <div ref={wrapperRef} className="h-screen w-full flex items-center justify-center overflow-hidden relative">
                <div
                    ref={gridRef}
                    className="gallery__grid grid grid-cols-3 gap-[2.22vw] w-[51.11vw] max-w-[1200px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 will-change-transform"
                >
                    {images.map((item, idx) => (
                        <div key={idx} className="gallery__item w-full aspect-square overflow-hidden rounded-xl bg-secondary/5">
                            <img src={getPath(item)} alt={`Project ${idx}`} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                    ))}
                </div>

                <div className="relative z-10 text-center flex flex-col items-center justify-center w-full max-w-2xl px-8 pointer-events-none">
                    <div className="overflow-hidden mb-6">
                        <h2 ref={titleRef} className="text-4xl md:text-5xl font-heading font-medium tracking-tight text-black leading-tight opacity-0 translate-y-12">
                            {t('grid.title')}
                        </h2>
                    </div>
                    <p ref={subtitleRef} className="text-lg md:text-xl font-light text-black/60 mb-12 opacity-0 translate-y-8 max-w-sm mx-auto leading-relaxed">
                        {t('grid.subtitle')}
                    </p>
                    <div ref={buttonRef} className="opacity-0 translate-y-8 pointer-events-auto">
                        <Link to="/trabajo" className="group inline-flex items-center gap-4 px-8 py-3.5 bg-white border border-black/10 text-black rounded-full font-heading font-medium hover:bg-black/5 transition-all text-sm md:text-base relative overflow-hidden">
                            {t('grid.button')}
                            <span className="p-2 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                                <ArrowRight size={16} className="text-black group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StickyProjectGrid;
