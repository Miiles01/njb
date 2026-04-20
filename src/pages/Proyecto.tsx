import React, { useEffect, useRef } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import AccordionNavbar from "@/components/AccordionNavbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useProject, getImageUrl } from "@/hooks/useProjects";
import type { ProjectWithImages } from "@/hooks/useProjects";

/* ── Fade-in animation variant ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

/* ── Full-width media block ── */
const ProjectMediaDisplay = ({ 
  src, 
  alt, 
  index,
  className = "",
  mediaOverrideClass = ""
}: { 
  src: string; 
  alt: string; 
  index: number;
  className?: string;
  mediaOverrideClass?: string;
}) => {
  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(src);
  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Extract YouTube ID
  let youtubeId = "";
  if (isYouTube) {
    if (src.includes("/shorts/")) {
      youtubeId = src.split("/shorts/")[1].split("?")[0];
    } else if (src.includes("v=")) {
      youtubeId = src.split("v=")[1].split("&")[0];
    } else {
      youtubeId = src.split("/").pop()?.split("?")[0] || "";
    }
  }

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.error("Error playing video:", err));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const isShort = isYouTube && src.includes("/shorts/");

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`w-full overflow-hidden rounded-2xl md:rounded-3xl bg-secondary/5 cursor-pointer group relative ${className}`}
    >
      {isYouTube ? (
        <div className={`w-full ${isShort ? "aspect-[9/16]" : "aspect-[16/9]"}`}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3`}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 pointer-events-none object-cover ${
              isShort 
                ? "w-[115%] h-[115%] -translate-y-[52%]" 
                : "w-full h-full -translate-y-1/2"
            }`}
            title={alt}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      ) : isVideo ? (
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          preload="auto"
          className={mediaOverrideClass || "w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.01]"}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          className={mediaOverrideClass || "w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.01]"}
        />
      )}
    </motion.div>
  );
};

const getLang = (project: ProjectWithImages, field: string, lang: string): string => {
  const key = `${field}_${lang}` as keyof ProjectWithImages;
  return (project[key] as string) || (project[`${field}_es` as keyof ProjectWithImages] as string) || "";
};

/* ── Main Component ── */
const Proyecto = () => {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const { data: project, isLoading } = useProject(slug || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!slug) return <Navigate to="/trabajo" replace />;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <AccordionNavbar />
        <main className="flex-1 pt-28 md:pt-36 pb-24 px-6 md:px-12 lg:px-20 container mx-auto">
          <div className="h-16 w-96 bg-muted animate-pulse rounded mb-8" />
          <div className="aspect-[16/9] bg-muted animate-pulse rounded-3xl mb-8" />
        </main>
      </div>
    );
  }

  if (!project) return <Navigate to="/trabajo" replace />;

  // Sort images by sort_order
  const allImages = [...(project.project_images || [])].sort(
    (a, b) => a.sort_order - b.sort_order
  );
  const coverImage = allImages[0];
  const galleryImages = allImages.slice(1);

  const description = t(getLang(project, "description", language));
  const strategy = t(getLang(project, "strategy", language));
  const industry = t(getLang(project, "industry", language));
  const role = t(getLang(project, "role", language));

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AccordionNavbar />

      <main className="flex-1 pt-28 md:pt-36 pb-24 font-heading font-light">
        {/* Header */}
        <header className="px-6 md:px-12 lg:px-20 container mx-auto mb-16 md:mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-6xl md:text-8xl lg:text-[8vw] font-heading font-medium tracking-tighter leading-none mb-8"
          >
            {t(`proj.${project.slug}.title`) || project.title}
          </motion.h1>

          {/* Meta info ... */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid md:grid-cols-2 gap-8 md:gap-16 max-w-4xl"
          >
            <div>
              <p className="text-xs tracking-widest text-muted-foreground mb-2 uppercase">
                {t("common.industry")}
              </p>
              <p className="text-lg md:text-xl font-heading leading-relaxed">{industry}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-muted-foreground mb-2 uppercase">
                {t("common.role")}
              </p>
              <p className="text-lg md:text-xl font-heading leading-relaxed">{role}</p>
            </div>
          </motion.div>
        </header>

        {/* Cover image */}
        {coverImage && (
          <div className="px-4 md:px-8 lg:px-12 mb-8">
            <ProjectMediaDisplay
              src={getImageUrl(coverImage.storage_path)}
              alt={coverImage.alt_text || project.title}
              index={0}
            />
          </div>
        )}

        {/* Description block */}
        {description && (
          <div className="px-6 md:px-12 lg:px-20 container mx-auto my-20 md:my-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <p className="text-xs tracking-widest text-muted-foreground mb-4 uppercase">
                {t("common.description")}
              </p>
              <p className="text-xl md:text-3xl font-heading font-light leading-relaxed text-foreground/80">
                {description}
              </p>
            </motion.div>
          </div>
        )}

        {/* Image gallery in Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-4 md:px-8 lg:px-12">
          {galleryImages.map((img, idx) => {
            const isLast = idx === galleryImages.length - 1;
            const isDeportivaLast = project.slug === "marca-deportiva" && isLast;
            const isRealEstateFirst = project.slug === "realestate" && idx === 0;
            const isFullWidth = isDeportivaLast || isRealEstateFirst;

            return (
              <React.Fragment key={img.id}>
                <div className={isFullWidth ? "md:col-span-2" : ""}>
                  <ProjectMediaDisplay
                    src={getImageUrl(img.storage_path)}
                    alt={img.alt_text || `${project.title} ${idx + 1}`}
                    index={idx + 1}
                    className={isDeportivaLast ? "flex flex-col items-center justify-end bg-transparent" : ""}
                    mediaOverrideClass={
                      isDeportivaLast 
                        ? "w-full md:w-[85%] h-auto max-h-[85vh] object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.01]" 
                        : ""
                    }
                  />
                </div>

                {/* Strategy block inside grid spanning 2 columns */}
                {idx === 0 && strategy && (
                  <div className="md:col-span-2 py-20 md:py-32">
                    <div className="container mx-auto px-2 md:px-4 lg:px-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="max-w-3xl border-t border-black/5 pt-12 md:pt-20"
                      >
                        <p className="text-xs tracking-widest text-muted-foreground mb-4 uppercase">
                          {t("proj.details.strategy")}
                        </p>
                        <p className="text-xl md:text-3xl font-heading font-light leading-relaxed text-foreground/80">
                          {strategy}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Back to projects */}
        <div className="px-6 md:px-12 lg:px-20 container mx-auto mt-32 mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-20 border-t border-black/5"
          >
            <button
              onClick={() => navigate("/trabajo")}
              className="group inline-flex items-center gap-4 text-2xl md:text-4xl font-heading font-medium tracking-tighter hover:opacity-100 transition-opacity"
            >
              <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                <ArrowLeft size={20} />
              </div>
              <span>{t("proj.details.backToWork")}</span>
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Proyecto;
