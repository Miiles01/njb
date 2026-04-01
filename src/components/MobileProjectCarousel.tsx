import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";

const topRow = [
  { folder: "Colorfit", img: "portada-1.webp" },
  { folder: "Erpxtender", img: "portada-1.webp" },
  { folder: "Jambu", img: "portada-1.webp" },
  { folder: "Mar-Vic", img: "portada-1.webp" },
  { folder: "Miiles", img: "portada-1.webp" },
  { folder: "Naabi-Kanabi", img: "portada-1.webp" },
];

const bottomRow = [
  { folder: "Original", img: "portada-1.webp" },
  { folder: "Tularosa", img: "portada-1.webp" },
  { folder: "Miiles", img: "mockup-app-web.webp" },
  { folder: "Jambu", img: "packaging.webp" },
  { folder: "Mar-Vic", img: "fotos-publicitarias.webp" },
  { folder: "Colorfit", img: "mockup-tote-bag.webp" },
];

const getPath = (item: { folder: string; img: string }) =>
  `/proyectos/${item.folder}/${item.img}`;

const InfiniteRow = ({
  items,
  direction = "left",
}: {
  items: typeof topRow;
  direction?: "left" | "right";
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2;

    const fromX = direction === "left" ? 0 : -totalWidth;
    const toX = direction === "left" ? -totalWidth : 0;

    gsap.set(track, { x: fromX });

    const tween = gsap.to(track, {
      x: toX,
      duration: 25,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [direction]);

  const duplicated = [...items, ...items];

  return (
    <div className="overflow-hidden w-full">
      <div ref={trackRef} className="flex gap-3 w-max">
        {duplicated.map((item, idx) => (
          <div
            key={idx}
            className="w-[45vw] aspect-[4/3] rounded-2xl overflow-hidden bg-secondary/5 shrink-0"
          >
            <img
              src={getPath(item)}
              alt={item.folder}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const MobileProjectCarousel = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white overflow-hidden">
      {/* Top carousel - moves left */}
      <InfiniteRow items={topRow} direction="left" />

      {/* Center text */}
      <div className="text-center px-8 py-12 flex flex-col items-center">
        <h2 className="text-3xl font-heading font-medium tracking-tight text-black leading-tight mb-4">
          {t("grid.title")}
        </h2>
        <p className="text-base font-light text-black/60 mb-8 max-w-xs mx-auto leading-relaxed">
          {t("grid.subtitle")}
        </p>
        <Link
          to="/trabajo"
          className="group inline-flex items-center gap-3 px-7 py-3 bg-white border border-black/10 text-black rounded-full font-heading font-medium hover:bg-black/5 transition-all text-sm"
        >
          {t("grid.button")}
          <span className="p-1.5 bg-secondary/10 rounded-full flex items-center justify-center">
            <ArrowRight
              size={14}
              className="text-black group-hover:translate-x-1 transition-transform duration-300"
            />
          </span>
        </Link>
      </div>

      {/* Bottom carousel - moves right */}
      <InfiniteRow items={bottomRow} direction="right" />
    </section>
  );
};

export default MobileProjectCarousel;
