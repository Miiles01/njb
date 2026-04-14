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
  industry: { es: string; en: string; fr: string };
  role: { es: string; en: string; fr: string };
  description: { es: string; en: string; fr: string };
  strategy?: { es: string; en: string; fr: string };
  folder: string;
  images: ProjectImage[];
}

const projectData: Record<string, ProjectContent> = {
  original: {
    title: "Barbería",
    industry: {
      es: "Barbería y Cuidado Personal Masculino",
      en: "Barbershop & Men's Grooming",
      fr: "Barbier & Soins pour hommes",
    },
    role: {
      es: "Embudos de Ventas y Estrategia de Identidad de Marca",
      en: "Sales Funnels & Brand Identity Strategy",
      fr: "Tunnels de vente & Stratégie d'identité de marque",
    },
    description: {
      es: "Conceptualizamos y ejecutamos una estrategia de marca diseñada para romper la saturación del mercado de barberías, creando una identidad visual única con su respectivo manual de directrices. Desarrollamos una plataforma web orientada 100% a resultados, implementando un layout de embudo (funnel) optimizado que guía al usuario desde el descubrimiento hasta la reserva automática mediante un sistema integrado. Para potenciar la conversión, realizamos la edición fotográfica profesional de los servicios, utilizando el impacto visual y la prueba social como motores principales de atracción de nuevos clientes y fidelización de los actuales.",
      en: "We conceptualized and executed a brand strategy designed to break through the saturated barbershop market, creating a unique visual identity with its respective guidelines manual. We developed a results-oriented web platform, implementing an optimized funnel layout that guides the user from discovery to automatic booking through an integrated system. To boost conversion, we performed professional photo editing of services, using visual impact and social proof as the main drivers for attracting new clients and retaining existing ones.",
      fr: "Nous avons conceptualisé et exécuté une stratégie de marque conçue pour percer le marché saturé des salons de coiffure, en créant une identité visuelle unique avec son manuel de directives respectif. Nous avons développé une plateforme web orientée à 100 % vers les résultats, en mettant en œuvre une mise en page de tunnel (funnel) optimisée qui guide l'utilisateur de la découverte à la réservation automatique via un système intégré.",
    },
    strategy: {
      es: "El gran reto fue posicionar la marca lejos del estereotipo clásico de barbería de barrio. Se conceptualizó como un punto de encuentro premium para el «cuidado personal integral». A nivel de infraestructura (funnel), se diagramó un flujo que elimina fricciones: en lugar de obligar al usuario a leer menús largos, diseñamos un proceso visual donde en un máximo de 3 clics logran el agendamiento y pago, optimizando así el Customer Lifetime Value (LTV).",
      en: "The main challenge was positioning the brand far from the classic neighborhood barbershop stereotype. It was conceptualized as a premium meeting point for «comprehensive personal care». At the infrastructure level (funnel), a frictionless flow was diagrammed: instead of forcing the user to read long menus, we designed a visual process where within a maximum of 3 clicks they achieve booking and payment, optimizing Customer Lifetime Value (LTV).",
      fr: "Le défi majeur était de se positionner loin du stéréotype classique du salon de coiffure de quartier. La marque a été conceptualisée comme un point de rencontre haut de gamme pour les « soins personnels complets ». Au niveau de l'infrastructure, nous avons conçu un flux sans friction : au lieu de forcer l'utilisateur à lire de longs menus, nous avons conçu un processus visuel où, en un maximum de 3 clics, il parvient à réserver et à payer.",
    },
    folder: "Original",
    images: [
      { src: "portada-1.webp", alt: "Original — Cover", aspect: "wide" },
      { src: "original-1.webp", alt: "Original — Style", aspect: "wide" },
      { src: "barberia-new.jpg", alt: "Original — Barbería Experience", aspect: "wide" },
      { src: "isotipo.webp", alt: "Original — Isotipo", aspect: "wide" },
      { src: "fotos-instagram.webp", alt: "Original — Instagram", aspect: "wide" },
      { src: "landing-page-1.webp", alt: "Original — Landing Page 1", aspect: "wide" },
    ],
  },
  tularosa: {
    title: "Restauration & hôtellerie",
    industry: {
      es: "Gastronomía",
      en: "Gastronomy",
      fr: "Gastronomie",
    },
    role: {
      es: "Embudos de Ventas y Estrategia de Identidad de Marca",
      en: "Sales Funnels & Brand Identity Strategy",
      fr: "Tunnels de vente & Stratégie d'identité de marque",
    },
    description: {
      es: "El objetivo fue llevar un negocio gastronómico al siguiente nivel de digitalización mediante la creación de una plataforma web optimizada para resultados. Diseñamos un layout especializado en embudos de venta (funnel design) que integra un sistema de reservaciones estratégico, reduciendo la fricción en el proceso de conversión del usuario. Además de refinar la base visual mediante la creación de activos gráficos y manuales de identidad, realizamos la dirección y edición fotográfica profesional de alimentos. Este enfoque en el \"apetito visual\" fue clave para diferenciar la propuesta en un mercado altamente competitivo, logrando una presencia online que no solo es estética, sino funcional y orientada a la generación de reservas.",
      en: "The goal was to take a gastronomic business to the next level of digitalization by creating a results-optimized web platform. We designed a specialized funnel layout that integrates a strategic reservation system, reducing friction in the user conversion process. Beyond refining the visual foundation through creating graphic assets and identity manuals, we performed professional food photography direction and editing. This focus on \"visual appetite\" was key to differentiating the proposition in a highly competitive market, achieving an online presence that is not only aesthetic but functional and oriented toward generating reservations.",
      fr: "L'objectif était d'amener une entreprise gastronomique au niveau supérieur de numérisation en créant une plateforme web optimisée pour les résultats. Nous avons conçu une mise en page de tunnel spécialisée qui intègre un sistema de réservation stratégique, réduisant les frictions dans le processus de conversion. Cette approche sur l'« appétit visuel » a été la clé pour différencier la proposition.",
    },
    strategy: {
      es: "La industria restaurantera suele pecar de tener menús en PDF estáticos y flujos de reserva complicados. La estrategia fue diseñar el funnel pensando 100% en la tasa de «Reserva Directa». Creamos la arquitectura UX/UI de modo que la fotografía culinaria jugara agresivamente con la psicología del apetito, y a la par programamos incentivos visuales directas hacia la mesa. No hicimos solo una página; definimos un motor de ocupación diaria.",
      en: "The restaurant industry often suffers from static PDF menus and complicated reservation flows. The strategy was to design the funnel thinking 100% on the «Direct Reservation» rate. We created the UX/UI architecture so that the culinary photography aggressively played with appetite psychology, while programming direct visual incentives towards booking tables. We didn't just build a page; we defined a daily occupancy engine.",
      fr: "L'industrie de la restauration souffre souvent de menus PDF statiques et de flux de réservation compliqués. La stratégie consistait à concevoir le tunnel en pensant à 100 % au taux de « réservation directe ». Nous avons créé l'architecture UX/UI de manière à ce que la photographie culinaire joue avec la psychologie de l'appétit, tout en programmant des incitations visuelles directes.",
    },
    folder: "Tularosa",
    images: [
      { src: "portada-1.webp", alt: "Restauration & hôtellerie — Cover", aspect: "wide" },
      { src: "video-1.mp4", alt: "Process — High quality content", aspect: "wide" },
      { src: "video-2.mp4", alt: "Campaign — Motion graphics", aspect: "wide" },
      { src: "portada-2.webp", alt: "Restauration & hôtellerie — Cover 2", aspect: "wide" },
      { src: "mockup-de-comida.webp", alt: "Restauration & hôtellerie — Food Mockup", aspect: "wide" },
      { src: "extra-1.png", alt: "Brand Assets", aspect: "wide" },
      { src: "frase-publicitaria-1.webp", alt: "Restauration & hôtellerie — Tagline 1", aspect: "wide" },
      { src: "publicidad-de-exterior.webp", alt: "Restauration & hôtellerie — Outdoor Advertising", aspect: "wide" },
    ],
  },
  realestate: {
    title: "Real Estate",
    industry: {
      es: "Bienes Raíces / Real Estate",
      en: "Real Estate",
      fr: "Immobilier",
    },
    role: {
      es: "Estrategia de Marca y Lanzamiento de Proyecto",
      en: "Brand Strategy & Project Launch",
      fr: "Stratégie de marque & Lancement de projet",
    },
    description: {
      es: "Desarrollamos la identidad integral para Nayar Estate, enfocándonos en un posicionamiento de lujo y exclusividad. Creamos el manual de identidad, activos de marca y una estrategia visual coherente que eleva la percepción de valor de las propiedades, facilitando la conexión con inversionistas de alto nivel.",
      en: "We developed the comprehensive identity for Nayar Estate, focusing on luxury and exclusivity positioning. We created the identity manual, brand assets, and a coherent visual strategy that elevates the value perception of properties, facilitating connection with high-level investors.",
      fr: "Nous avons développé l'identité complète de Nayar Estate, en nous concentrant sur un positionnement de luxe et d'exclusivité. Nous avons créé le manuel d'identité, les actifs de la marque et une stratégie visuelle cohérente qui rehausse la perception de la valeur des propriétés.",
    },
    folder: "Real-Estate",
    images: [
      { src: "item-1.png", alt: "Nayar Estate — Cover", aspect: "wide" },
      { src: "brandboard.png", alt: "Brand Moodboard", aspect: "wide" },
      { src: "item-3.png", alt: "Visual Assets 3", aspect: "wide" },
      { src: "item-2.png", alt: "Visual Assets 2", aspect: "wide" },
      { src: "logo.png", alt: "Identity Design", aspect: "wide" },
      { src: "portada.jpg", alt: "Nayar Estate — View", aspect: "wide" },
    ],
  },
  sportswear: {
    title: "Sportswear",
    industry: {
      es: "Ropa Deportiva / E-commerce",
      en: "Sportswear & E-commerce",
      fr: "Vêtements de sport & E-commerce",
    },
    role: {
      es: "Dirección de Arte y Optimización de Conversión",
      en: "Art Direction & Conversion Optimization",
      fr: "Direction artistique & Optimisation de la conversion",
    },
    description: {
      es: "Para el sector de ropa deportiva, nos centramos en crear un impacto visual directo que impulse las ventas online. Optimizamos la presentación de productos mediante fotografía de alto impacto y una estructura de navegación orientada a la conversión, logrando una experiencia de compra fluida y aspiracional.",
      en: "For the sportswear sector, we focused on creating a direct visual impact that drives online sales. We optimized product presentation through high-impact photography and a conversion-oriented navigation structure, achieving a seamless and aspirational shopping experience.",
      fr: "Pour le secteur des vêtements de sport, nous nous sommes concentrés sur la création d'un impact visuel direct qui stimule les ventes en ligne. Nous avons optimisé la présentation des produits grâce à une photographie à fort impact.",
    },
    folder: "Sportswear",
    images: [
      { src: "portada.jpg", alt: "Sportswear — Cover", aspect: "wide" },
      { src: "item-1.jpg", alt: "Product Detail 1", aspect: "wide" },
      { src: "item-2.jpg", alt: "Product Detail 2", aspect: "wide" },
      { src: "item-3.webp", alt: "Product Display", aspect: "wide" },
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

/* ── Full-width media block ── */
const ProjectMediaDisplay = ({ src, alt, index }: { src: string; alt: string; index: number }) => {
  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(src);

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className="w-full overflow-hidden rounded-2xl md:rounded-3xl bg-secondary/5"
    >
      {isVideo ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-auto object-cover ${src.includes('Sportswear') ? 'object-bottom' : ''}`}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          className={`w-full h-auto object-cover ${src.includes('Sportswear') ? 'object-bottom' : ''}`}
        />
      )}
    </motion.div>
  );
};

/* ── Main Component ── */
const Proyecto = () => {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const project = slug ? projectData[slug] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <Navigate to="/trabajo" replace />;

  const basePath = `/proyectos/${project.folder}/`;

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
              <p className="text-xs tracking-widest text-muted-foreground mb-2 uppercase">
                {t('common.industry')}
              </p>
              <p className="text-lg md:text-xl font-heading leading-relaxed">
                {project.industry[language]}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-muted-foreground mb-2 uppercase">
                {t('common.role')}
              </p>
              <p className="text-lg md:text-xl font-heading leading-relaxed">
                {project.role[language]}
              </p>
            </div>
          </motion.div>
        </header>

        {/* Cover image — full bleed effect */}
        <div className="px-4 md:px-8 lg:px-12 mb-8">
          <ProjectMediaDisplay src={basePath + project.images[0].src} alt={project.images[0].alt} index={0} />
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
            <p className="text-xs tracking-widest text-muted-foreground mb-4 uppercase">
              {t('common.description')}
            </p>
            <p className="text-xl md:text-3xl font-heading font-light leading-relaxed text-foreground/80">
              {project.description[language]}
            </p>
          </motion.div>
        </div>

        {/* Image gallery */}
        <div className="space-y-6 md:space-y-8">
          {project.images.slice(1).map((img, idx) => {
            const realIdx = idx + 1;
            return (
              <React.Fragment key={realIdx}>
                {/* Full-width image */}
                <div className="px-4 md:px-8 lg:px-12">
                  <ProjectMediaDisplay src={basePath + img.src} alt={img.alt} index={realIdx} />
                </div>

                {/* Render strategy right after the first gallery image if present */}
                {idx === 0 && project.strategy && (
                  <div className="px-6 md:px-12 lg:px-20 container mx-auto my-20 md:my-32">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      className="max-w-3xl border-t border-black/5 pt-12 md:pt-20"
                    >
                      <p className="text-xs tracking-widest text-muted-foreground mb-4 uppercase">
                        {t('proj.details.strategy')}
                      </p>
                      <p className="text-xl md:text-3xl font-heading font-light leading-relaxed text-foreground/80">
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
        <div className="px-6 md:px-12 lg:px-20 container mx-auto mt-32 mb-16">
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="pt-20 border-t border-black/5"
          >
            <button
              onClick={() => navigate('/trabajo')}
              className="group inline-flex items-center gap-4 text-2xl md:text-4xl font-heading font-medium tracking-tighter hover:opacity-100 transition-opacity"
            >
              <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                <ArrowLeft size={20} />
              </div>
              <span>{t('proj.details.backToWork')}</span>
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Proyecto;
