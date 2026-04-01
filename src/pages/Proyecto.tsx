import React, { useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import AccordionNavbar from "@/components/AccordionNavbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

/* ── Project Data ── */
interface ProjectImage {
  src: string;
  alt: string;
  aspect?: "wide" | "tall" | "square"; // wide = 16:9, tall = 4:5, square = 1:1
}

interface ProjectContent {
  title: string;
  industry: { es: string; en: string };
  role: { es: string; en: string };
  description: { es: string; en: string };
  strategy?: { es: string; en: string };
  folder: string;
  images: ProjectImage[];
}

const projectData: Record<string, ProjectContent> = {
  original: {
    title: "Original — Salon de Barbier",
    industry: {
      es: "Barbería y Cuidado Personal Masculino",
      en: "Barbershop & Men's Grooming",
    },
    role: {
      es: "Embudos de Ventas y Estrategia de Identidad de Marca",
      en: "Sales Funnels & Brand Identity Strategy",
    },
    description: {
      es: "Conceptualizamos y ejecutamos una estrategia de marca diseñada para romper la saturación del mercado de barberías, creando una identidad visual única con su respectivo manual de directrices. Desarrollamos una plataforma web orientada 100% a resultados, implementando un layout de embudo (funnel) optimizado que guía al usuario desde el descubrimiento hasta la reserva automática mediante un sistema integrado. Para potenciar la conversión, realizamos la edición fotográfica profesional de los servicios, utilizando el impacto visual y la prueba social como motores principales de atracción de nuevos clientes y fidelización de los actuales.",
      en: "We conceptualized and executed a brand strategy designed to break through the saturated barbershop market, creating a unique visual identity with its respective guidelines manual. We developed a results-oriented web platform, implementing an optimized funnel layout that guides the user from discovery to automatic booking through an integrated system. To boost conversion, we performed professional photo editing of services, using visual impact and social proof as the main drivers for attracting new clients and retaining existing ones.",
    },
    strategy: {
      es: "El gran reto fue posicionar a Original lejos del estereotipo clásico de barbería de barrio. Se conceptualizó la marca como un punto de encuentro premium para el «cuidado personal integral». A nivel de infraestructura (funnel), se diagramó un flujo que elimina fricciones: en lugar de obligar al usuario a leer menús largos, diseñamos un proceso visual donde en un máximo de 3 clics logran el agendamiento y pago, optimizando así el Customer Lifetime Value (LTV).",
      en: "The main challenge was positioning Original far from the classic neighborhood barbershop stereotype. The brand was conceptualized as a premium meeting point for «comprehensive personal care». At the infrastructure level (funnel), a frictionless flow was diagrammed: instead of forcing the user to read long menus, we designed a visual process where within a maximum of 3 clicks they achieve booking and payment, optimizing Customer Lifetime Value (LTV)."
    },
    folder: "Original",
    images: [
      { src: "portada-1.webp", alt: "Original — Cover", aspect: "wide" },
      { src: "isotipo.webp", alt: "Original — Isotipo", aspect: "wide" },
      { src: "fotos-instagram.webp", alt: "Original — Instagram", aspect: "wide" },
      { src: "landing-page-1.webp", alt: "Original — Landing Page 1", aspect: "wide" },
      { src: "landing-page-2.webp", alt: "Original — Landing Page 2", aspect: "wide" },
    ],
  },
  tularosa: {
    title: "Tularosa",
    industry: {
      es: "Gastronomía",
      en: "Gastronomy",
    },
    role: {
      es: "Embudos de Ventas y Estrategia de Identidad de Marca",
      en: "Sales Funnels & Brand Identity Strategy",
    },
    description: {
      es: "Para Tularosa, el objetivo fue llevar un negocio gastronómico al siguiente nivel de digitalización mediante la creación de una plataforma web optimizada para resultados. Diseñamos un layout especializado en embudos de venta (funnel design) que integra un sistema de reservaciones estratégico, reduciendo la fricción en el proceso de conversión del usuario. Además de refinar la base visual de la marca mediante la creación de activos gráficos y manuales de identidad, realizamos la dirección y edición fotográfica profesional de alimentos. Este enfoque en el \"apetito visual\" fue clave para diferenciar la propuesta de Tularosa en un mercado altamente competitivo, logrando una presencia online que no solo es estética, sino funcional y orientada a la generación de reservas.",
      en: "For Tularosa, the goal was to take a gastronomic business to the next level of digitalization by creating a results-optimized web platform. We designed a specialized funnel layout that integrates a strategic reservation system, reducing friction in the user conversion process. Beyond refining the brand's visual foundation through creating graphic assets and identity manuals, we performed professional food photography direction and editing. This focus on \"visual appetite\" was key to differentiating Tularosa's proposition in a highly competitive market, achieving an online presence that is not only aesthetic but functional and oriented toward generating reservations.",
    },
    strategy: {
      es: "La industria restaurantera suele pecar de tener menús en PDF estáticos y flujos de reserva complicados. La estrategia fue diseñar el funnel pensando 100% en la tasa de «Reserva Directa». Creamos la arquitectura UX/UI de modo que la fotografía culinaria jugara agresivamente con la psicología del apetito, y a la par programamos incentivos visuales directos hacia la mesa. No hicimos solo una página; definimos un motor de ocupación diaria.",
      en: "The restaurant industry often suffers from static PDF menus and complicated reservation flows. The strategy was to design the funnel thinking 100% on the «Direct Reservation» rate. We created the UX/UI architecture so that the culinary photography aggressively played with appetite psychology, while programming direct visual incentives towards booking tables. We didn't just build a page; we defined a daily occupancy engine."
    },
    folder: "Tularosa",
    images: [
      { src: "portada-1.webp", alt: "Tularosa — Cover", aspect: "wide" },
      { src: "portada-2.webp", alt: "Tularosa — Cover 2", aspect: "wide" },
      { src: "mockup-de-comida.webp", alt: "Tularosa — Food Mockup", aspect: "wide" },
      { src: "frase-publicitaria-1.webp", alt: "Tularosa — Tagline 1", aspect: "wide" },
      { src: "frase-publicitaria-2.webp", alt: "Tularosa — Tagline 2", aspect: "wide" },
      { src: "frase-publicitaria-3.webp", alt: "Tularosa — Tagline 3", aspect: "wide" },
      { src: "publicidad-de-exterior.webp", alt: "Tularosa — Outdoor Advertising", aspect: "wide" },
    ],
  },
};

/* ── Fade-in animation variant ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

/* ── Full-width image block ── */
const ProjectImage = ({ src, alt, index }: { src: string; alt: string; index: number }) => (
  <motion.div
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={fadeUp}
    className="w-full overflow-hidden rounded-2xl md:rounded-3xl bg-secondary/5"
  >
    <img
      src={src}
      alt={alt}
      loading={index < 2 ? "eager" : "lazy"}
      decoding="async"
      className="w-full h-auto object-cover"
    />
  </motion.div>
);

/* ── Main Component ── */
const Proyecto = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const project = slug ? projectData[slug] : undefined;

  if (!project) return <Navigate to="/trabajo" replace />;

  const basePath = `/proyectos/${project.folder}/`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AccordionNavbar />

      <main className="flex-1 pt-28 md:pt-36 pb-24">

        {/* Header */}
        <header className="px-6 md:px-12 lg:px-20 container mx-auto mb-16 md:mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-6xl md:text-8xl lg:text-[8vw] font-heading font-medium tracking-tighter leading-none mb-8"
          >
            {project.title}
          </motion.h1>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid md:grid-cols-2 gap-8 md:gap-16 max-w-4xl"
          >
            <div>
              <p className="text-xs tracking-widest text-muted-foreground mb-2 font-heading">
                {language === "es" ? "Industria" : "Industry"}
              </p>
              <p className="text-lg font-heading font-light leading-relaxed">
                {project.industry[language]}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-muted-foreground mb-2 font-heading">
                {language === "es" ? "Qué hicimos" : "What we did"}
              </p>
              <p className="text-lg font-heading font-light leading-relaxed">
                {project.role[language]}
              </p>
            </div>
          </motion.div>
        </header>

        {/* Cover image — full bleed */}
        <div className="px-4 md:px-8 lg:px-12 mb-8">
          <ProjectImage src={basePath + project.images[0].src} alt={project.images[0].alt} index={0} />
        </div>

        {/* Description block */}
        <div className="px-6 md:px-12 lg:px-20 container mx-auto my-20 md:my-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="text-xs tracking-widest text-muted-foreground mb-4 font-heading">
              {language === "es" ? "Sobre el proyecto" : "About the project"}
            </p>
            <p className="text-xl md:text-2xl font-heading font-light leading-relaxed text-foreground/80">
              {project.description[language]}
            </p>
          </motion.div>
        </div>

        {/* Image gallery — single columns and strategy block break */}
        <div className="space-y-6 md:space-y-8">
          {project.images.slice(1).map((img, idx) => {
            const realIdx = idx + 1;

            return (
              <React.Fragment key={realIdx}>
                {/* Full-width image */}
                <div className="px-4 md:px-8 lg:px-12">
                  <ProjectImage src={basePath + img.src} alt={img.alt} index={realIdx} />
                </div>

                {/* Render strategy right after the first gallery image */}
                {idx === 0 && project.strategy && (
                  <div className="px-6 md:px-12 lg:px-20 container mx-auto my-20 md:my-32">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      className="max-w-3xl pt-8"
                    >
                      <p className="text-xs tracking-widest text-muted-foreground mb-4 font-heading">
                        {language === "es" ? "Qué se hizo / Planificación Funcional" : "Strategy / Action Plan"}
                      </p>
                      <p className="text-xl md:text-2xl font-heading font-light leading-relaxed text-foreground/80">
                        {project.strategy[language]}
                      </p>
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Back to projects */}
        <div className="px-6 md:px-12 lg:px-20 container mx-auto mt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-3 text-2xl md:text-3xl font-heading font-medium tracking-tight hover:opacity-60 transition-opacity"
            >
              <ArrowLeft size={24} />
              {language === "es" ? "Volver a proyectos" : "Back to projects"}
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Proyecto;
