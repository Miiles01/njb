import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";
import AccordionNavbar from "@/components/AccordionNavbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { usePublishedProjects, getImageUrl } from "@/hooks/useProjects";
import type { ProjectWithImages } from "@/hooks/useProjects";
import FloatingProjectInfo from "@/components/FloatingProjectInfo";
import type { Participation } from "@/data/projects";

const getLangField = (project: ProjectWithImages, field: string, lang: string): string => {
  const key = `${field}_${lang}` as keyof ProjectWithImages;
  return (project[key] as string) || (project[`${field}_es` as keyof ProjectWithImages] as string) || "";
};

const ProjectSection = ({
  project,
  lang,
  onProjectClick,
}: {
  project: ProjectWithImages;
  lang: string;
  onProjectClick: (slug: string) => void;
}) => {
  const { t } = useLanguage();
  const cover = project.project_images?.find((i) => i.image_type === "cover");
  const secondary = project.project_images
    ?.filter((i) => i.image_type === "secondary")
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, 2);
  
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <div className="mb-32">
      {/* Main Cover */}
      <Link
        to={`/proyecto/${project.slug}`}
        className="block w-full mb-8"
        onClick={() => onProjectClick(project.slug)}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="aspect-[16/9] w-full overflow-hidden rounded-[2rem] bg-secondary/5 group relative"
        >
          {cover && (() => {
            const src = getImageUrl(cover.storage_path);
            const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(src);
            const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");

            if (isYouTube) {
              let youtubeId = "";
              const isShort = src.includes("/shorts/");
              if (isShort) {
                youtubeId = src.split("/shorts/")[1].split("?")[0];
              } else if (src.includes("v=")) {
                youtubeId = src.split("v=")[1].split("&")[0];
              } else {
                youtubeId = src.split("/").pop()?.split("?")[0] || "";
              }

              return (
                <div className="w-full h-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3`}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none object-cover ${
                      isShort ? "w-[115%] h-[316%]" : "w-[105%] h-[105%]"
                    }`}
                    title={project.title}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
              );
            }

            if (isVideo) {
              return (
                <video
                  ref={videoRef}
                  src={src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01] ${project.slug === "marca-deportiva" ? "object-bottom" : ""}`}
                />
              );
            }

            return (
              <img
                src={src}
                alt={cover.alt_text || project.title}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${project.slug === "marca-deportiva" ? "object-bottom" : ""}`}
              />
            );
          })()}
        </motion.div>
      </Link>

      {/* Secondary Images */}
      {secondary && secondary.length > 0 && (
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {secondary.map((img, idx) => (
            <Link key={img.id} to={`/proyecto/${project.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * (idx + 1) }}
                className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-secondary/5"
              >
                <img
                  src={getImageUrl(img.storage_path)}
                  alt={img.alt_text || `${project.title} detail ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </Link>
          ))}
        </div>
      )}

      {/* Info */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="px-4"
      >
        <Link to={`/proyecto/${project.slug}`} className="group">
          <h3 className="text-3xl font-heading font-medium tracking-tighter mb-2 group-hover:text-blue-600 transition-colors">
            {t(`proj.${project.slug}.title`)}
          </h3>
        </Link>
        <p className="text-lg font-heading font-light opacity-60 max-w-xl">
          {t(getLangField(project, "subtitle", lang))}
        </p>
      </motion.div>
    </div>
  );
};

const Trabajo = () => {
  const { language, t } = useLanguage();
  const { track } = useAnalytics();
  const { data: projects, isLoading } = usePublishedProjects();

  const handleProjectClick = (slug: string) => {
    track("project_click", { projectSlug: slug, pagePath: "/trabajo" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pt-32 md:pt-40">
      <AccordionNavbar />

      <main className="flex-1 px-6 md:px-12 lg:px-20 container mx-auto">
        {/* Header */}
        <section className="mb-24 md:mb-40">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-heading font-light tracking-tight max-w-2xl mb-8 opacity-80"
          >
            {t("work.subtitle")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-7xl md:text-[10vw] font-heading font-medium tracking-tighter leading-none"
          >
            {t("work.title")}
          </motion.h1>
        </section>

        {/* Project List */}
        <section className="pb-20">
          {isLoading ? (
            <div className="space-y-32">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-8">
                  <div className="aspect-[16/9] rounded-[2rem] bg-muted animate-pulse" />
                  <div className="h-8 w-48 bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
          ) : (
            projects?.map((project) => (
              <ProjectSection
                key={project.id}
                project={project}
                lang={language}
                onProjectClick={handleProjectClick}
              />
            ))
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Trabajo;
