import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AccordionNavbar from "@/components/AccordionNavbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useAnalytics } from "@/hooks/useAnalytics";

import { projectsData, Participation, ProjectData } from "@/data/projects";
import FloatingProjectInfo from "@/components/FloatingProjectInfo";
import { useState } from "react";

const ProjectSection = ({ project, slug, t, onHover, onProjectClick }: { project: ProjectData, slug: string, t: any, onHover: (participation: Participation[] | null) => void, onProjectClick: (slug: string) => void }) => {
    const getPath = (img: string) => `/proyectos/${project.folder}/${img}`;
    const cover = project.images[0];
    const secondary = project.images.slice(1, 3);

    return (
        <div
            className="mb-32"
            onMouseEnter={() => onHover(project.participation || [])}
            onMouseLeave={() => onHover(null)}
        >
            {/* Main Cover */}
            <Link to={`/proyecto/${slug}`} className="block w-full mb-8" onClick={() => onProjectClick(slug)}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="aspect-[16/9] w-full overflow-hidden rounded-[2rem] bg-secondary/5"
                >
                    <img
                        src={getPath(cover)}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                </motion.div>
            </Link>

            {/* Secondary Images & Info */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {secondary.map((img: string, idx: number) => (
                    <Link key={idx} to={`/proyecto/${slug}`}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 * (idx + 1) }}
                            className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-secondary/5"
                        >
                            <img
                                src={getPath(img)}
                                alt={`${project.title} detail ${idx + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* Info */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="px-4"
            >
                <Link to={`/proyecto/${slug}`} className="group">
                    <h3 className="text-3xl font-heading font-medium tracking-tighter mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                </Link>
                <p className="text-lg font-heading font-light opacity-60 max-w-xl">{t(project.subtitleKey)}</p>
            </motion.div>
        </div>
    );
};

const Trabajo = () => {
    const { t } = useLanguage();
    const [hoveredParticipation, setHoveredParticipation] = useState<Participation[] | null>(null);

    return (
        <div className="min-h-screen bg-white flex flex-col pt-32 md:pt-40">
            <FloatingProjectInfo
                participation={hoveredParticipation || []}
                isVisible={hoveredParticipation !== null}
            />
            <AccordionNavbar />

            <main className="flex-1 px-6 md:px-12 lg:px-20 container mx-auto">
                {/* Header */}
                <section className="mb-24 md:mb-40">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl md:text-3xl font-heading font-light tracking-tight max-w-2xl mb-8 opacity-80"
                    >
                        {t('work.subtitle')}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-7xl md:text-[10vw] font-heading font-medium tracking-tighter leading-none"
                    >
                        {t('work.title')}
                    </motion.h1>
                </section>

                {/* Project List */}
                <section className="pb-20">
                    {Object.entries(projectsData).map(([slug, project], idx) => (
                        <ProjectSection
                            key={idx}
                            project={project}
                            slug={slug}
                            t={t}
                            onHover={setHoveredParticipation}
                            onProjectClick={handleProjectClick}
                        />
                    ))}
                </section>
            </main>

            <Footer />
        </div>
    );
};


export default Trabajo;
