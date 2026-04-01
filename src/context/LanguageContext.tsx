import React, { createContext, useContext, useState } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    es: {
        // Navbar
        'nav.work': 'Trabajo',
        'nav.contact': 'Contacto',
        'nav.language': 'Idioma',
        'nav.home': 'Inicio',
        'nav.about': 'Sobre',
        'nav.menu': 'Menú',
        'nav.close': 'Cerrar',
        'common.copy': 'Copiar',
        'common.copied': 'Copiado',
        'common.industry': 'Industria',
        'common.role': 'Qué hice',
        'common.description': 'Sobre el proyecto',
        'common.next': 'Siguiente proyecto',
        'common.viewProject': 'Ver proyecto',

        // Contact
        'contact.title': 'Contacto',
        'contact.subtitle': 'Hablemos sobre tu próximo proyecto.',

        // Work
        'work.title': 'Proyectos',
        'work.subtitle': 'Pienso con propósito para marcas que buscan autenticidad y escalabilidad.',

        // Projects
        'proj.miiles.subtitle': 'Plataforma de gestión de talento y reclutamiento inteligente.',
        'proj.colorfit.subtitle': 'Identidad visual y branding para marca de moda contemporánea.',
        'proj.naabi.subtitle': 'Diseño de experiencia y branding para productos de bienestar natural.',
        'proj.jambu.subtitle': 'Rediseño de identidad y packaging inspirado en la selva amazónica.',
        'proj.tularosa.subtitle': 'Estrategia visual y comunicación para hospitality y gastronomía.',
        'proj.erp.subtitle': 'Consultoría de marca y diseño de interfaz para ERP de alto rendimiento.',
        'proj.marvic.subtitle': 'Branding sofisticado para servicios de consultoría estratégica.',
        'proj.original.subtitle': 'Dirección de arte y diseño web para agencia creativa digital.',

        // Naabi Kanabi Project Details
        'proj.naabi.details.industry': 'Bienestar y Productos Naturales',
        'proj.naabi.details.role': 'Branding, Diseño de Packaging y Estrategia UX',
        'proj.naabi.details.description': 'Para Naabi Kanabi, desarrollé una identidad visual que comunica pureza y conexión con la naturaleza. El proyecto incluyó el diseño detallado de empaques para sus líneas de productos de bienestar, así como una arquitectura web optimizada para educar al consumidor sobre los beneficios de sus extractos naturales.',

        // Tularosa Project Details
        'proj.tularosa.details.industry': 'Hospitalidad y Gastronomía',
        'proj.tularosa.details.role': 'Estrategia Visual y Diseño de Identidad',
        'proj.tularosa.details.description': 'Trabajé con Tularosa en la creación de una experiencia visual sofisticada y acogedora. El enfoque principal fue capturar la esencia de su propuesta gastronómica a través de una paleta de colores terrosos y una tipografía elegante, aplicada en todos los puntos de contacto, desde menús físicos hasta su presencia digital.',

        // Erpxtender Project Details
        'proj.erp.details.industry': 'Software y Consultoría IT',
        'proj.erp.details.role': 'Diseño de Interfaz (UI) y Consultoría de Marca',
        'proj.erp.details.description': 'Rediseñé la interfaz del ERP de Erpxtender para mejorar la usabilidad y la eficiencia operativa. El desafío fue simplificar flujos de trabajo complejos y presentar grandes volúmenes de datos de una manera visualmente clara y moderna, fortaleciendo la imagen de la marca como líder en tecnología empresarial.',

        // Mar & Vic Project Details
        'proj.marvic.details.industry': 'Consultoría Estratégica',
        'proj.marvic.details.role': 'Identidad de Marca y Diseño Corporativo',
        'proj.marvic.details.description': 'Creé una identidad corporativa que refleja profesionalismo y visión estratégica para Mar & Vic. El branding fue diseñado para transmitir confianza y solidez a sus clientes de alto nivel, utilizando una estética minimalista y elementos visuales que sugieren crecimiento y claridad organizacional.',

        // Original Project Details
        'proj.original.details.industry': 'Agencia Creativa Digital',
        'proj.original.details.role': 'Dirección de Arte y Diseño Web',
        'proj.original.details.description': 'Como parte de Original, lideré la dirección de arte y el diseño de su plataforma digital. El proyecto se centró en mostrar el portafolio creativo de la agencia mediante una experiencia web inmersiva, utilizando animaciones fluidas y una disposición tipográfica audaz que destaca su capacidad de innovación.',

        // Colorfit Project Details
        'proj.colorfit.details.industry': 'Moda y Retail',
        'proj.colorfit.details.role': 'Branding y Diseño de Experiencia de Marca',
        'proj.colorfit.details.description': 'Para Colorfit, desarrollé una marca vibrante y moderna que resuena con un público joven. El proyecto abarcó desde el diseño del logotipo hasta la creación de un sistema visual coherente para sus campañas de redes sociales y su tienda en línea, enfocándose en la versatilidad y la expresión personal.',

        // Jambú Project Details
        'proj.jambu.details.industry': 'Cuidado Personal y Cosmética',
        'proj.jambu.details.role': 'Rediseño de Identidad y Packaging',
        'proj.jambu.details.description': 'Inspirado en la riqueza de la selva amazónica, rediseñé la identidad de Jambú. El nuevo sistema visual y el packaging utilizan texturas orgánicas e ilustraciones botánicas para resaltar el origen natural de sus ingredientes, logrando un posicionamiento premium en el mercado de la cosmética natural.',

        // Miiles Project Details
        'proj.miiles.details.industry': 'Inteligencia Artificial y Consultoría de Ventas',
        'proj.miiles.details.role': 'Embudos de Ventas, Estrategia de Identidad de Marca y Automatización con IA',
        'proj.miiles.details.description': 'Lideré la creación de esta marca en la frontera de la tecnología, enfocándome en el desarrollo de soluciones de venta escalables mediante Vibecoding y prospección en frío (Cold Outreach). Diseñé una arquitectura de embudos de alta conversión apoyada por agentes de IA conversacional que gestionan la interacción inicial con el prospecto.\n\nMi rol fue integral: desde el branding completo y las relaciones públicas hasta la implementación de una red de afiliados para expansión en marketplaces. Apliqué estrategias de crecimiento orgánico y pagado mediante CTAs estratégicos, eventos de activación y campañas con influencers, logrando posicionar a Miiles como una solución innovadora en el mercado de la automatización comercial.',

        // Hero
        'hero.title': 'Soy Manu',
        'hero.cv': 'Descargar CV tradicional',

        // Mission
        'mission.title': 'Mi Visión',
        'mission.text': 'Mi misión es ayudar a las personas a desarrollar su autenticidad y mejorar su productividad',

        // Focuses
        'focuses.title': 'Mis principales enfoques',
        'focuses.item1': 'Ventas',
        'focuses.item2': 'Redes Sociales',
        'focuses.item3': 'Customer Experience',
        'focuses.item4': 'Funnels',
        'focuses.item5': 'CRM',
        'focuses.item6': 'Vibe Coding',
        'focuses.item7': 'Branding',
        'focuses.item8': 'Automatización con IA',

        // Sticky Grid
        'grid.title': 'Mis Proyectos',
        'grid.subtitle': 'Estos han sido los proyectos en los que he participado.',
        'grid.button': 'Ver todo mi trabajo',

        // Testimonials
        'test.title': '¿Qué dicen sobre mí?',
        'test.subtitle': 'Testimonios',
        'test.button': 'Ver todas las reseñas',

        // Experience
        'exp.title': 'Experiencia',
        'exp.subtitle': 'Trayectoria profesional y formación académica.',
        'edu.title': 'Educación',
        'edu.unam': 'Universidad Nacional Autónoma de México',
        'edu.admin': 'Administración, Marketing',
        'edu.grade': 'Grado: Segundo año',
        'edu.skills': 'Planes de Proyecto, Networking y +2 habilidades',

        // Footer
        'footer.headline': 'Hagámoslo',
        'footer.subline': 'Hablemos pronto',
        'footer.linkedin': 'LinkedIn',
        'footer.copyright': '© 2026 Manuel Herrera',

        // NotFound
        'notfound.title': '404',
        'notfound.text': '¡Ups! Página no encontrada',
        'notfound.button': 'Volver al Inicio',

        // Participation
        'projects.participation.title': 'Mi participación',
        'proj.part.funnels': 'Embudos de Ventas',
        'proj.part.strategy': 'Estrategia de Identidad de Marca',
        'proj.part.ai': 'Automatización con IA',
    },
    en: {
        // Navbar
        'nav.work': 'Work',
        'nav.contact': 'Contact',
        'nav.language': 'Language',
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.menu': 'Menu',
        'nav.close': 'Close',
        'common.copy': 'Copy',
        'common.copied': 'Copied',
        'common.industry': 'Industry',
        'common.role': 'What I did',
        'common.description': 'About the project',
        'common.next': 'Next project',
        'common.viewProject': 'View project',

        // Contact
        'contact.title': 'Contact',
        'contact.subtitle': 'Let\'s talk about your next project.',

        // Work
        'work.title': 'Projects',
        'work.subtitle': 'I think with purpose for brands seeking authenticity and scalability.',

        // Projects
        'proj.miiles.subtitle': 'Intelligent talent management and recruitment platform.',
        'proj.colorfit.subtitle': 'Visual identity and branding for a contemporary fashion brand.',
        'proj.naabi.subtitle': 'Experience design and branding for natural wellness products.',
        'proj.jambu.subtitle': 'Identity and packaging redesign inspired by the Amazon jungle.',
        'proj.tularosa.subtitle': 'Visual strategy and communication for hospitality and gastronomy.',
        'proj.erp.subtitle': 'Brand consultancy and interface design for high-performance ERP.',
        'proj.marvic.subtitle': 'Sophisticated branding for strategic consulting services.',
        'proj.original.subtitle': 'Art direction and web design for digital creative agency.',

        // Naabi Kanabi Project Details
        'proj.naabi.details.industry': 'Wellness and Natural Products',
        'proj.naabi.details.role': 'Branding, Packaging Design, and UX Strategy',
        'proj.naabi.details.description': 'For Naabi Kanabi, I developed a visual identity that communicates purity and connection with nature. The project included the detailed design of packaging for their wellness product lines, as well as an optimized web architecture to educate consumers on the benefits of their natural extracts.',

        // Tularosa Project Details
        'proj.tularosa.details.industry': 'Hospitality and Gastronomy',
        'proj.tularosa.details.role': 'Visual Strategy and Identity Design',
        'proj.tularosa.details.description': 'I worked with Tularosa to create a sophisticated and welcoming visual experience. The core focus was to capture the essence of their culinary offerings through an earthy color palette and elegant typography, applied across all touchpoints, from physical menus to their digital presence.',

        // Erpxtender Project Details
        'proj.erp.details.industry': 'Software and IT Consulting',
        'proj.erp.details.role': 'Interface Design (UI) and Brand Consulting',
        'proj.erp.details.description': "I redesigned Erpxtender's ERP interface to improve usability and operational efficiency. The challenge was to simplify complex workflows and present large volumes of data in a visually clear and modern way, strengthening the brand's image as a leader in business technology.",

        // Mar & Vic Project Details
        'proj.marvic.details.industry': 'Strategic Consulting',
        'proj.marvic.details.role': 'Brand Identity and Corporate Design',
        'proj.marvic.details.description': 'I created a corporate identity that reflects professionalism and strategic vision for Mar & Vic. The branding was designed to convey trust and solidity to their high-level clients, using a minimalist aesthetic and visual elements that suggest organizational growth and clarity.',

        // Original Project Details
        'proj.original.details.industry': 'Digital Creative Agency',
        'proj.original.details.role': 'Art Direction and Web Design',
        'proj.original.details.description': "As part of Original, I led the art direction and design of their digital platform. The project focused on showcasing the agency's creative portfolio through an immersive web experience, using smooth animations and a bold typographic layout that highlights their innovation capacity.",

        // Colorfit Project Details
        'proj.colorfit.details.industry': 'Fashion and Retail',
        'proj.colorfit.details.role': 'Branding and Brand Experience Design',
        'proj.colorfit.details.description': 'For Colorfit, I developed a vibrant and modern brand that resonates with a young audience. The project spanned from logo design to the creation of a consistent visual system for their social media campaigns and online store, focusing on versatility and personal expression.',

        // Jambú Project Details
        'proj.jambu.details.industry': 'Personal Care and Cosmetics',
        'proj.jambu.details.role': 'Identity and Packaging Redesign',
        'proj.jambu.details.description': 'Inspired by the richness of the Amazon jungle, I redesigned Jambú’s identity. The new visual system and packaging use organic textures and botanical illustrations to highlight the natural origin of their ingredients, achieving premium positioning in the natural cosmetics market.',

        // Miiles Project Details
        'proj.miiles.details.industry': 'Artificial Intelligence and Sales Consulting',
        'proj.miiles.details.role': 'Sales Funnels, Brand Identity Strategy, and AI Automation',
        'proj.miiles.details.description': 'I led the creation of this brand at the edge of technology, focusing on the development of scalable sales solutions through Vibecoding and Cold Outreach. I designed a high-conversion funnel architecture supported by conversational AI agents that manage the initial interaction with the prospect.\n\nMy role was integral: from full branding and PR to the implementation of an affiliate network for marketplace expansion. I applied organic and paid growth strategies through strategic CTAs, activation events, and influencer campaigns, positioning Miiles as an innovative solution in the commercial automation market.',

        // Hero
        'hero.title': 'I\'m Manu',
        'hero.cv': 'Download traditional CV',

        // Mission
        'mission.title': 'My Vision',
        'mission.text': 'My mission is to help people develop their authenticity and improve their productivity',

        // Focuses
        'focuses.title': 'My main focuses',
        'focuses.item1': 'Sales',
        'focuses.item2': 'Social Media',
        'focuses.item3': 'Customer Experience',
        'focuses.item4': 'Funnels',
        'focuses.item5': 'CRM',
        'focuses.item6': 'Vibe Coding',
        'focuses.item7': 'Branding',
        'focuses.item8': 'AI Automation',

        // Sticky Grid
        'grid.title': 'My Projects',
        'grid.subtitle': 'These are the projects I have participated in.',
        'grid.button': 'View all my work',

        // Testimonials
        'test.title': 'What they say about me?',
        'test.subtitle': 'Testimonials',
        'test.button': 'View all reviews',

        // Experience
        'exp.title': 'Experience',
        'exp.subtitle': 'Professional background and academic training.',
        'edu.title': 'Education',
        'edu.unam': 'National Autonomous University of Mexico',
        'edu.admin': 'Business Administration, Marketing',
        'edu.grade': 'Grade: Second year',
        'edu.skills': 'Project Plans, Networking and +2 skills',

        // Footer
        'footer.headline': 'Let\'s do it',
        'footer.subline': 'Talk soon',
        'footer.linkedin': 'LinkedIn',
        'footer.copyright': '© 2026 Manuel Herrera',

        // NotFound
        'notfound.title': '404',
        'notfound.text': 'Oops! Page not found',
        'notfound.button': 'Return to Home',

        // Participation
        'projects.participation.title': 'My participation',
        'proj.part.funnels': 'Sales Funnels',
        'proj.part.strategy': 'Brand Identity Strategy',
        'proj.part.ai': 'AI Automation',
    }
};

// More complex experience data needs careful mapping
export const experienceEs = [
    {
        company: "Miiles Creative Studio",
        duration: "Contrato · 2 años 8 meses",
        roles: [
            {
                title: "Brand Manager",
                period: "Abril 2025 - Febrero 2026 · 11 meses",
                location: "México · Híbrido",
                details: [
                    "Estrategia de Marketing con IA y Optimización de Funnels: Planificación y ejecución de funnels de marketing impulsados por IA, estrategias de posicionamiento y sistemas de conversión, integrando análisis de datos, flujos de trabajo de \"vibe coding\" y automatización con IA utilizando herramientas avanzadas como Lovable, Base44, Antigravity, Zapier, y Make.",
                    "Posicionamiento de Producto con IA y Storytelling: Desarrollo de estrategias de posicionamiento y marcos narrativos para productos de IA, traduciendo capacidades complejas de IA en propuestas de valor claras a través de storytelling, insights basados en datos y estrategias de marketing enfocadas al crecimiento."
                ]
            },
            {
                title: "Marketing Project Manager",
                period: "Febrero 2024 - Abril 2025 · 1 año 3 meses",
                details: [
                    "Gestión de Proyectos y Estrategias Digitales: Planificación y ejecución de estrategias de marketing digital, SEO & SEM, y growth marketing, usando Google Ads, Facebook Ads, y LinkedIn Ads.",
                    "Análisis de Datos e Inteligencia de Negocios: Optimización de campañas con Google Analytics, SEMrush, Tableau, y Power BI. Implementación de pruebas A/B y estrategias de conversión.",
                    "Contenido y Redes Sociales: Estrategias de marketing de contenidos e influencer marketing en Instagram, LinkedIn, TikTok, y YouTube."
                ],
                skills: "Customer Experience, Media Strategy y +4 habilidades"
            },
            {
                title: "Junior Marketer",
                period: "Julio 2023 - Enero 2024 · 7 meses",
                location: "Remoto",
                details: [
                    "Estrategias de Retención: Implementación de flujos automatizados en Klaviyo y ActiveCampaign para aumentar el LTV y reducir el churn rate.",
                    "Campañas Outbound: Desarrollo de campañas multicanal usando GoHighLevel e Instantly, optimizando la conversión de leads calificados (SQL).",
                    "Entregabilidad: Configuración de registros DMARC, DKIM y TXT para asegurar la entrega en bandeja de entrada."
                ]
            }
        ]
    },
    {
        company: "Fiverr",
        duration: "5 años 7 meses",
        location: "Remoto",
        roles: [
            {
                title: "Digital Specialist",
                period: "Marzo 2020 - Septiembre 2024 · 4 años 7 meses",
                details: [
                    "Branding y Estrategia: Creación de identidades visuales alineadas con la propuesta de valor, optimizando el posicionamiento en el mercado.",
                    "Multimedia: Creación de contenido visual con Adobe Creative Suite, Figma, y Canva para campañas digitales.",
                    "Growth Marketing: Desarrollo de estrategias de contenidos en Instagram, Facebook, LinkedIn, y TikTok."
                ],
                skills: "Digital Marketing Media, Google Analytics y +1 habilidad"
            },
            {
                title: "Branding Freelancer",
                period: "Marzo 2019 - Febrero 2020 · 1 año",
                details: [
                    "Localización de Campañas: Adaptación de mensajes y experiencias de usuario para asegurar resonancia cultural en LATAM.",
                    "Conciencia Orgánica: Activación de comunidades locales e influencers para aumentar el alcance sin inversión en medios pagados.",
                    "Estética Minimalista: Supervisión de contenido narrativo con énfasis en branding emocional y storytelling visual."
                ]
            }
        ]
    },
    {
        company: "BRIX Agency",
        duration: "Jornada completa",
        roles: [
            {
                title: "Product Designer",
                period: "Febrero 2023 - Mayo 2023 · 4 mos",
                location: "Estados Unidos · Remoto",
                details: [
                    "Diseño UX/UI: Creación y optimización de interfaces intuitivas en Figma para una experiencia fluida.",
                    "Desarrollo Web: Colaboración técnica para asegurar la correcta implementación de diseños.",
                    "Investigación: Análisis de usuarios y pruebas de usabilidad para mejorar accesibilidad y conversión."
                ],
                skills: "Customer Experience"
            }
        ]
    },
    {
        company: "Educación",
        roles: [
            {
                title: "Universidad Nacional Autónoma de México",
                period: "Administración, Marketing",
                location: "2022 – Presente",
                details: ["Segundo año académico."],
                skills: "Planes de Proyecto, Networking y +2 habilidades"
            }
        ]
    },
    {
        company: "Idiomas",
        roles: [
            {
                title: "Español",
                period: "Nativo"
            },
            {
                title: "Inglés",
                period: "Profesional"
            }
        ]
    }
];

export const experienceEn = [
    {
        company: "Miiles Creative Studio",
        duration: "Contract · 2 yrs 8 mos",
        roles: [
            {
                title: "Brand Manager",
                period: "Apr 2025 - Feb 2026 · 11 mos",
                location: "Mexico · Hybrid",
                details: [
                    "AI Marketing Strategy & Funnel Optimization: Planning and execution of AI-driven marketing funnels, positioning strategies and conversion systems, integrating data analytics, vibe coding workflows and AI-powered automation using advanced tools such as Lovable, Base44, Antigravity, Zapier, and Make.",
                    "AI Product Positioning & Storytelling: Development of positioning strategies and narrative frameworks for AI products, translating complex AI capabilities into clear value propositions through storytelling, data-driven insights and growth-focused marketing strategies."
                ]
            },
            {
                title: "Marketing Project Manager",
                period: "Feb 2024 - Apr 2025 · 1 yr 3 mos",
                details: [
                    "Project Management and Digital Strategies: Planning and execution of digital marketing strategies, SEO & SEM, and growth marketing, using Google Ads, Facebook Ads, and LinkedIn Ads.",
                    "Data Analysis and Business Intelligence: Campaign optimization with Google Analytics, SEMrush, Tableau, and Power BI. Implementation of A/B testing and conversion strategies.",
                    "Content Marketing and Social Media: Content marketing and influencer marketing strategies on Instagram, LinkedIn, TikTok, and YouTube."
                ],
                skills: "Customer Experience, Media Strategy and +4 skills"
            },
            {
                title: "Junior Marketer",
                period: "Jul 2023 - Jan 2024 · 7 mos",
                location: "Remote",
                details: [
                    "Execution of retention and lifecycle marketing strategies: Implementation of automated flows on platforms like Klaviyo and ActiveCampaign to increase LTV and reduce churn rate.",
                    "Management of full-funnel and outbound campaigns: Development of multichannel campaigns using platforms like GoHighLevel and Instantly, optimizing the conversion of qualified leads (SQL).",
                    "Domain reputation and deliverability optimization: Configuration of DMARC, DKIM, and TXT records to ensure proper inbox delivery of email campaigns."
                ]
            }
        ]
    },
    {
        company: "Fiverr",
        duration: "5 yrs 7 mos",
        location: "Remote",
        roles: [
            {
                title: "Digital Specialist",
                period: "Mar 2020 - Sep 2024 · 4 yrs 7 mos",
                details: [
                    "Branding and Brand Strategy: Creation of visual identities aligned with the client’s value proposition, optimizing their market positioning.",
                    "Graphic Design and Multimedia: Creation of visual content with Adobe Creative Suite, Figma, and Canva, including materials for digital campaigns and branding.",
                    "Content Management and Creation: Development of content marketing strategies and campaigns on Instagram, Facebook, LinkedIn, and TikTok, applying growth marketing techniques."
                ],
                skills: "Digital Marketing Media, Google Analytics and +1 skill"
            },
            {
                title: "Branding Freelancer",
                period: "Freelance · Mar 2019 - Feb 2020 · 1 yr",
                details: [
                    "Campaign localization for new markets: Adaptation of messaging, visual assets, and user experiences to ensure cultural resonance and brand positioning in specific regions such as LATAM.",
                    "Organic awareness and advocacy strategies: Activation of local communities and influencers through strategic collaborations to increase reach and engagement without relying on paid media.",
                    "Creative focused on minimalist aesthetics: Supervision of visual and narrative content with an emphasis on emotional branding, storytelling, and visual consistency across platforms like Instagram and TikTok."
                ]
            }
        ]
    },
    {
        company: "BRIX Agency",
        duration: "Full-time",
        roles: [
            {
                title: "Product Designer",
                period: "Feb 2023 - May 2023 · 4 mos",
                location: "United States · Remote",
                details: [
                    "UX/UI Design: Creation and optimization of intuitive and attractive interfaces in Figma, ensuring a smooth user experience.",
                    "Web Development: Collaboration with development teams to ensure the correct implementation of designs on digital platforms.",
                    "Research and Prototyping: User analysis and usability testing to improve accessibility and conversion."
                ],
                skills: "Customer Experience"
            }
        ]
    },
    {
        company: "Education",
        roles: [
            {
                title: "National Autonomous University of Mexico",
                period: "Business Administration, Marketing",
                location: "2022 – Present",
                details: ["Second year academic."],
                skills: "Project Plans, Networking and +2 skills"
            }
        ]
    },
    {
        company: "Languages",
        roles: [
            {
                title: "Spanish",
                period: "Native"
            },
            {
                title: "English",
                period: "Professional"
            }
        ]
    }
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);


export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('language');
        return (saved as Language) || 'es';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: string) => {
        return (translations[language] as any)[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
