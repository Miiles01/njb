import React, { createContext, useContext, useState } from 'react';

type Language = 'es' | 'en' | 'fr';

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
        'common.role': 'Qué hicimos',
        'common.description': 'Sobre el proyecto',
        'common.next': 'Siguiente proyecto',
        'common.viewProject': 'Ver proyecto',

        // Contact
        'contact.title': 'Contacto',
        'contact.subtitle': 'Cuéntanos sobre tu próximo proyecto.',
        'contact.form.email': 'Tu Correo Electrónico',
        'contact.form.phone': 'Tu Número de Teléfono',
        'contact.form.send': 'Enviar Mensaje',
        'contact.form.success': '¡Gracias! Nos pondremos en contacto pronto.',

        // Work
        'work.title': 'Proyectos',
        'work.subtitle': 'Pensamos con propósito para marcas que buscan autenticidad y escalabilidad.',

        // Projects
        'proj.tularosa.subtitle': 'Estrategia visual y comunicación para el sector de hôtellerie y gastronomía.',
        'proj.original.subtitle': 'Dirección de arte y diseño web para agencia creativa digital.',

        // Project Details
        'proj.details.strategy': 'Planificación Funcional',
        'proj.details.backToWork': 'Volver a proyectos',

        // Tularosa Project Details (Legacy - kept for safety but using newer dynamic fields in Proyecto.tsx)
        'proj.tularosa.details.industry': 'Hospitalidad y Gastronomía',
        'proj.tularosa.details.role': 'Estrategia Visual y Diseño de Identidad',
        'proj.tularosa.details.description': 'Trabajamos en la creación de una experiencia visual sofisticada y acogedora para el sector hospitality. El enfoque principal fue capturar la esencia de la propuesta gastronómica a través de una paleta de colores terrosos y una tipografía elegante, aplicada en todos los puntos de contacto, desde menús físicos hasta presencia digital.',

        // Original Project Details (Legacy)
        'proj.original.details.industry': 'Agencia Creativa Digital',
        'proj.original.details.role': 'Dirección de Arte y Diseño Web',
        'proj.original.details.description': 'Como parte de Original, lideramos la dirección de arte y el diseño de su plataforma digital. El proyecto se centró en mostrar el portafolio creativo de la agencia mediante una experiencia web inmersiva, utilizando animaciones fluidas y una disposición tipográfica audaz que destaca su capacidad de innovación.',

        // Hero
        'hero.title': 'NJB',
        'hero.tagline': 'No hacemos marketing. Generamos ingresos.',
        'intro.text': 'Ayudamos a empresas a aumentar sus ingresos con contenido, publicidad y estrategias que realmente convierten.',
        'intro.cta': 'Obtén tu auditoría + sesión de contenido gratis',
        'intro.subtext': 'Sin compromiso',

        // Mission
        'mission.title': 'Nuestra Visión',
        'mission.text': 'La mayoría de las empresas publican contenido… pero no generan resultados.',
        'problem.title1': 'Sin leads constantes',
        'problem.title2': 'Poco o nada de retorno de inversión',
        'problem.title3': 'Sin estrategia clara',
        'problem.conclusion': 'Porque se enfocan en la visibilidad en lugar de la conversión.',

        // Focuses (now Industrias)
        'focuses.title': 'Industrias',
        'focuses.subtitle': 'Acompañamos a empresas de diversos sectores que quieren crecer y escalar.',
        'focuses.footer': 'Si tienes un negocio, podemos hacerlo crecer.',
        'focuses.item1': 'Negocios locales',
        'focuses.item2': 'Servicios profesionales',
        'focuses.item3': 'Restauración y hotelería',
        'focuses.item4': 'Inmobiliaria',
        'focuses.item5': 'Marcas personales',
        'focuses.item6': 'Startups y nuevos proyectos',

        // Stacked Value Section
        'stacked.clientes.title': 'Clientes',
        'stacked.clientes.subtitle': 'Trabajamos con empresas a través de:',
        'stacked.clientes.item1': 'Canadá',
        'stacked.clientes.item2': 'Estados Unidos',
        'stacked.clientes.item3': 'México',
        'stacked.clientes.footer': 'Ayudándoles a desarrollarse localmente y escalar internacionalmente.',
        'stacked.resultados.title': 'Resultados',
        'stacked.resultados.subtitle': 'Cifras reales. Crecimiento concreto.',
        'stacked.resultados.item1': '+18 conversiones = $570 generados (inicio de campaña)',
        'stacked.resultados.item2': 'Aumento de reservas y engagement',
        'stacked.resultados.item3': 'Mejor retención de clientes gracias al mailing',
        'stacked.resultados.item4': 'Experiencia multi-mercado',
        'stacked.resultados.footer': '',
        'stacked.contenido.title': 'Contenido',
        'stacked.contenido.subtitle': 'La gente no compra publicidad. Compra lo que ve.',
        'stacked.contenido.item1': 'Video cinematográfico',
        'stacked.contenido.item2': 'Drone',
        'stacked.contenido.item3': 'Storytelling',
        'stacked.contenido.item4': 'Contenido optimizado para redes sociales',
        'stacked.proceso.title': 'Proceso',
        'stacked.proceso.item1': '1. Análisis y estrategia',
        'stacked.proceso.item2': '2. Creación de contenido',
        'stacked.proceso.item3': '3. Lanzamiento de campañas',
        'stacked.proceso.item4': '4. Implementación del sistema de mailing',
        'stacked.proceso.item5': '5. Optimización y escalamiento',

        // Sticky Grid
        'grid.title': 'Nuestros Proyectos',
        'grid.subtitle': 'Estos han sido los proyectos en los que hemos participado.',
        'grid.button': 'Ver todo nuestro trabajo',

        // Testimonials
        'test.title': '¿Qué dicen sobre nosotros?',
        'test.subtitle': 'Testimonios',
        'test.button': 'Ver todas las reseñas',
        'test.item1': '“Comenzamos a tener clientes reales gracias a NJB”',
        'test.item2': '“La mejor decisión para nuestro marketing”',

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
        'footer.cta': 'Reserva tu consulta gratuita ahora',
        'footer.cta.button': 'Reservar ahora',
        'footer.linkedin': 'LinkedIn',
        'footer.copyright': '© 2026 NJB',

        // NotFound
        'notfound.title': '404',
        'notfound.text': '¡Ups! Página no encontrada',
        'notfound.button': 'Volver al Inicio',

        // Participation
        'projects.participation.title': 'Nuestra participación',
        'proj.part.funnels': 'Embudos de Ventas',
        'proj.part.strategy': 'Estrategia de Identidad de Marca',
        'proj.part.ai': 'Automatización con IA',

        // Offer Section
        'offer.title': 'Comienza con una estrategia + sesión de contenido gratis',
        'offer.card1.title': 'Vamos a:',
        'offer.card1.item1': 'Analizar tu marketing actual',
        'offer.card1.item2': 'Identificar oportunidades de crecimiento',
        'offer.card1.item3': 'Crear contenido para tus redes sociales',
        'offer.card1.item4': 'Mostrarte cómo aumentar tus ingresos',
        'offer.card1.item5': 'Darte una visión clara de cómo usar Google Ads para generar leads y ventas',
        'offer.card1.item6': 'Mostrarte cómo fidelizar a tus clientes con un sistema de mailing eficaz',
        'offer.card2.title': 'Y si quieres ir más allá con nosotros, también ofrecemos:',
        'offer.card2.item1': 'Creación de sitios web y e-commerce',
        'offer.card2.item2': 'Desarrollo de aplicaciones',
        'offer.card2.item3': 'SEO (posicionamiento)',
        'offer.footer.commitment': 'Sin compromiso',
        'offer.footer.limited': 'Cupos limitados cada mes',
        // Solution Section (Added)
        'solution.title': 'Solución',
        'solution.subtitle': 'Contenido + Publicidad + Estrategia',
        'solution.description': 'Combinamos contenido + publicidad + estrategia para transformar la atención en ingresos.',
        'solution.item1': 'Contenido que convierte (video, reels, UGC)',
        'solution.item2': 'Publicidad (Meta & Google Ads)',
        'solution.item3': 'Seguimiento de conversiones (resultados reales, no "likes")',
        'solution.item4': 'Posicionamiento estratégico adaptado a tu mercado',
        'solution.item5': 'Email marketing (fidelización y aumento del valor del cliente)',
        'solution.bestseller': 'Más vendido',
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
        'common.role': 'What we did',
        'common.description': 'About the project',
        'common.next': 'Next project',
        'common.viewProject': 'View project',

        // Contact
        'contact.title': 'Contact',
        'contact.subtitle': 'Let\'s talk about your next project.',
        'contact.form.email': 'Your Email Address',
        'contact.form.phone': 'Your Phone Number',
        'contact.form.send': 'Send Message',
        'contact.form.success': 'Thank you! We will get in touch soon.',

        // Work
        'work.title': 'Projects',
        'work.subtitle': 'We think with purpose for brands seeking authenticity and scalability.',

        // Projects
        'proj.tularosa.subtitle': 'Visual strategy and communication for the hospitality and gastronomy sector.',
        'proj.original.subtitle': 'Art direction and web design for digital creative agency.',

        // Project Details
        'proj.details.strategy': 'Action Plan',
        'proj.details.backToWork': 'Back to projects',

        // Tularosa Project Details
        'proj.tularosa.details.industry': 'Hospitality and Gastronomy',
        'proj.tularosa.details.role': 'Visual Strategy and Identity Design',
        'proj.tularosa.details.description': 'We worked on creating a sophisticated and welcoming visual experience for the hospitality sector. The core focus was to capture the essence of the culinary offerings through an earthy color palette and elegant typography, applied across all touchpoints, from physical menus to digital presence.',

        // Original Project Details
        'proj.original.details.industry': 'Digital Creative Agency',
        'proj.original.details.role': 'Art Direction and Web Design',
        'proj.original.details.description': "As part of Original, we led the art direction and design of their digital platform. The project focused on showcasing the agency's creative portfolio through an immersive web experience, using smooth animations and a bold typographic layout that highlights their innovation capacity.",

        // Hero
        'hero.title': 'NJB',
        'hero.tagline': 'We don’t do marketing. We generate revenue.',
        'intro.text': 'We help companies increase their revenue with content, advertising, and strategies that actually convert.',
        'intro.cta': 'Get your audit + free content session',
        'intro.subtext': 'No commitment',

        // Mission
        'mission.title': 'Our Vision',
        'mission.text': 'Most companies post content… but don’t generate results.',
        'problem.title1': 'No consistent leads',
        'problem.title2': 'Little or no return on investment',
        'problem.title3': 'No clear strategy',
        'problem.conclusion': 'Because they focus on visibility instead of conversion.',

        // Focuses (now Industries)
        'focuses.title': 'Industries',
        'focuses.subtitle': 'We support companies in multiple sectors looking to grow and scale.',
        'focuses.footer': 'If you have a business, we can make it grow.',
        'focuses.item1': 'Local businesses',
        'focuses.item2': 'Professional services',
        'focuses.item3': 'Dining & Hospitality',
        'focuses.item4': 'Real Estate',
        'focuses.item5': 'Personal brands',
        'focuses.item6': 'Startups & new projects',

        // Stacked Value Section
        'stacked.clientes.title': 'Clients',
        'stacked.clientes.subtitle': 'We work with companies across:',
        'stacked.clientes.item1': 'Canada',
        'stacked.clientes.item2': 'United States',
        'stacked.clientes.item3': 'Mexico',
        'stacked.clientes.footer': 'Helping them develop locally and scale internationally.',
        'stacked.resultados.title': 'Results',
        'stacked.resultados.subtitle': 'Real numbers. Concrete growth.',
        'stacked.resultados.item1': '+18 conversions = $570 generated (campaign start)',
        'stacked.resultados.item2': 'Increase in bookings and engagement',
        'stacked.resultados.item3': 'Better customer retention through mailing',
        'stacked.resultados.item4': 'Multi-market experience',
        'stacked.resultados.footer': '',
        'stacked.contenido.title': 'Content',
        'stacked.contenido.subtitle': 'People don’t buy advertising. They buy what they see.',
        'stacked.contenido.item1': 'Cinematic video',
        'stacked.contenido.item2': 'Drone shots',
        'stacked.contenido.item3': 'Storytelling',
        'stacked.contenido.item4': 'Social media optimized content',
        'stacked.proceso.title': 'Process',
        'stacked.proceso.item1': '1. Analysis & strategy',
        'stacked.proceso.item2': '2. Content creation',
        'stacked.proceso.item3': '3. Campaign launch',
        'stacked.proceso.item4': '4. Mailing system setup',
        'stacked.proceso.item5': '5. Optimization & scaling',

        // Sticky Grid
        'grid.title': 'Our Projects',
        'grid.subtitle': 'These are the projects we have participated in.',
        'grid.button': 'View all our work',

        // Testimonials
        'test.title': 'What they say about us?',
        'test.subtitle': 'Testimonials',
        'test.button': 'View all reviews',
        'test.item1': '“We started getting real clients thanks to NJB”',
        'test.item2': '“The best decision for our marketing”',

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
        'footer.cta': 'Book your free consultation now',
        'footer.cta.button': 'Book now',
        'footer.linkedin': 'LinkedIn',
        'footer.copyright': '© 2026 NJB',

        // NotFound
        'notfound.title': '404',
        'notfound.text': 'Oops! Page not found',
        'notfound.button': 'Return to Home',

        // Participation
        'projects.participation.title': 'Our participation',
        'proj.part.funnels': 'Sales Funnels',
        'proj.part.strategy': 'Brand Identity Strategy',
        'proj.part.ai': 'AI Automation',

        // Offer Section
        'offer.title': 'Start with a strategy + free content session',
        'offer.card1.title': 'We will:',
        'offer.card1.item1': 'Analyze your current marketing',
        'offer.card1.item2': 'Identify growth opportunities',
        'offer.card1.item3': 'Create content for your social networks',
        'offer.card1.item4': 'Show you how to increase your revenue',
        'offer.card1.item5': 'Give you a clear vision of how to use Google Ads to generate leads and sales',
        'offer.card1.item6': 'Show you how to retain your customers with an effective mailing system',
        'offer.card2.title': 'And if you want to go further with us, we also offer:',
        'offer.card2.item1': 'Websites & e-commerce creation',
        'offer.card2.item2': 'App development',
        'offer.card2.item3': 'SEO (positioning)',
        'offer.footer.commitment': 'No commitment',
        'offer.footer.limited': 'Limited slots each month',
        // Solution Section (Added)
        'solution.title': 'Solution',
        'solution.subtitle': 'Content + Advertising + Strategy',
        'solution.description': 'We combine content + advertising + strategy to transform attention into revenue.',
        'solution.item1': 'Content that converts (video, reels, UGC)',
        'solution.item2': 'Advertising (Meta & Google Ads)',
        'solution.item3': 'Conversion tracking (real results, not "likes")',
        'solution.item4': 'Strategic positioning adapted to your market',
        'solution.item5': 'Email marketing (loyalty & customer value increase)',
        'solution.bestseller': 'Bestseller',
    },
    fr: {
        // Navbar
        'nav.work': 'Projets',
        'nav.contact': 'Contact',
        'nav.language': 'Langue',
        'nav.home': 'Accueil',
        'nav.about': 'À propos',
        'nav.menu': 'Menu',
        'nav.close': 'Fermer',
        'common.copy': 'Copier',
        'common.copied': 'Copié',
        'common.industry': 'Secteur',
        'common.role': 'Notre rôle',
        'common.description': 'À propos du projet',
        'common.next': 'Projet suivant',
        'common.viewProject': 'Voir le projet',

        // Contact
        'contact.title': 'Contact',
        'contact.subtitle': 'Parlez-nous de votre prochain projet.',
        'contact.form.email': 'Votre Adresse Email',
        'contact.form.phone': 'Votre Numéro de Téléphone',
        'contact.form.send': 'Envoyer le Message',
        'contact.form.success': 'Merci ! Nous vous contacterons bientôt.',

        // Work
        'work.title': 'Projets',
        'work.subtitle': 'Nous réfléchissons avec un but précis pour les marques qui recherchent l\'authenticité et l\'évolutivité.',

        // Projects
        'proj.tularosa.subtitle': 'Stratégie visuelle et communication pour le secteur de l\'hôtellerie et de la gastronomie.',
        'proj.original.subtitle': 'Direction artistique et design web pour une agence créative numérique.',

        // Project Details
        'proj.details.strategy': 'Plan d\'action',
        'proj.details.backToWork': 'Retour aux projets',

        // Tularosa Project Details
        'proj.tularosa.details.industry': 'Hôtellerie et Gastronomie',
        'proj.tularosa.details.role': 'Stratégie visuelle et conception d\'identité',
        'proj.tularosa.details.description': 'Nous avons travaillé à la création d\'une expérience visuelle sophistiquée et accueillante para le secteur de l\'hôtellerie. L\'objectif principal était de capturer l\'essence de l\'offre culinaire à travers une palette de couleurs terreuses et une typographie élégante, appliquée sur tous les points de contacto.',

        // Original Project Details
        'proj.original.details.industry': 'Agence Créative Numérique',
        'proj.original.details.role': 'Direction artistique et design web',
        'proj.original.details.description': 'Dans le cadre d\'Original, nous avons dirigé la direction artistique et la conception de leur plateforme numérique. Le projet s\'est concentré sur la présentation du portefeuille créatif de l\'agence à travers une expérience web immersive.',

        // Hero
        'hero.title': 'NJB',
        'hero.tagline': 'On ne fait pas du marketing. On génère du chiffre d’affaires.',
        'intro.text': 'Nous aidons les entreprises à augmenter leurs revenus grâce à du contenu, de la publicité et des stratégies qui convertissent vraiment.',
        'intro.cta': 'Obtiens ton audit + séance de contenu gratuite',
        'intro.subtext': 'Aucun engagement',

        // Mission
        'mission.title': 'Notre Vision',
        'mission.text': 'La majorité des entreprises publient du contenu… mais ne génèrent pas de résultats.',
        'problem.title1': 'Pas de leads constants',
        'problem.title2': 'Peu ou pas de retour sur investissement',
        'problem.title3': 'Aucune stratégie claire',
        'problem.conclusion': 'Parce qu’elles se concentrent sur la visibilité au lieu de la conversion.',

        // Focuses (now Industries)
        'focuses.title': 'Industries',
        'focuses.subtitle': 'Nous accompagnons des entreprises dans plusieurs secteurs qui veulent croître et scaler.',
        'focuses.footer': 'Si tu as un business, on peut le faire grandir.',
        'focuses.item1': 'Entreprises locales',
        'focuses.item2': 'Services professionnels',
        'focuses.item3': 'Restauration & hôtellerie',
        'focuses.item4': 'Immobilier',
        'focuses.item5': 'Marques personnelles',
        'focuses.item6': 'Startups & nouveaux projets',

        // Stacked Value Section
        'stacked.clientes.title': 'Clients',
        'stacked.clientes.subtitle': 'Nous travaillons avec des entreprises à travers :',
        'stacked.clientes.item1': 'Canada',
        'stacked.clientes.item2': 'États-Unis',
        'stacked.clientes.item3': 'Mexique',
        'stacked.clientes.footer': 'En les aidant à se développer localement et à scaler à l’international.',
        'stacked.resultados.title': 'Résultats',
        'stacked.resultados.subtitle': 'Des chiffres réels. Une croissance concrète.',
        'stacked.resultados.item1': '+18 conversions = 570$ générés (début de campagne)',
        'stacked.resultados.item2': 'Augmentation des réservations et de l’engagement',
        'stacked.resultados.item3': 'Meilleure rétention client grâce au mailing',
        'stacked.resultados.item4': 'Expérience multi-marchés',
        'stacked.resultados.footer': '',
        'stacked.contenido.title': 'Contenu',
        'stacked.contenido.subtitle': 'Les gens n’achètent pas de la pub. Ils achètent ce qu’ils voient.',
        'stacked.contenido.item1': 'Vidéo cinématographique',
        'stacked.contenido.item2': 'Drone',
        'stacked.contenido.item3': 'Storytelling',
        'stacked.contenido.item4': 'Contenu optimisé pour les réseaux sociaux',
        'stacked.proceso.title': 'Processus',
        'stacked.proceso.item1': '1. Analyse & stratégie',
        'stacked.proceso.item2': '2. Création de contenu',
        'stacked.proceso.item3': '3. Lancement des campagnes',
        'stacked.proceso.item4': '4. Mise en place du système de mailing',
        'stacked.proceso.item5': '5. Optimisation & scaling',

        // Sticky Grid
        'grid.title': 'Nos Projets',
        'grid.subtitle': 'Voici les projets auxquels nous avons participé.',
        'grid.button': 'Voir tout notre travail',

        // Testimonials
        'test.title': 'Que disent-ils de nous ?',
        'test.subtitle': 'Témoignages',
        'test.button': 'Voir tous les avis',
        'test.item1': '“On a commencé à avoir de vrais clients grâce à NJB”',
        'test.item2': '“La meilleure décision pour notre marketing”',

        // Experience
        'exp.title': 'Expérience',
        'exp.subtitle': 'Parcours professionnel et formation académique.',
        'edu.title': 'Éducation',
        'edu.unam': 'Université nationale autonome du Mexique',
        'edu.admin': 'Administration, Marketing',
        'edu.grade': 'Niveau : Deuxième année',
        'edu.skills': 'Plans de projet, réseautage et +2 compétences',

        // Footer
        'footer.headline': 'Faisons-le',
        'footer.subline': 'À bientôt',
        'footer.cta': 'Réserve ta consultation gratuite dès maintenant',
        'footer.cta.button': 'Planifier maintenant',
        'footer.linkedin': 'LinkedIn',
        'footer.copyright': '© 2026 NJB',

        // NotFound
        'notfound.title': '404',
        'notfound.text': 'Oups ! Page non trouvée',
        'notfound.button': 'Retour à l\'accueil',

        // Participation
        'projects.participation.title': 'Notre participation',
        'proj.part.funnels': 'Tunnels de vente',
        'proj.part.strategy': 'Stratégie d\'identité de marque',
        'proj.part.ai': 'Automatisation avec IA',

        // Offer Section
        'offer.title': 'Commence avec une stratégie + séance de contenu gratuite',
        'offer.card1.title': 'On va :',
        'offer.card1.item1': 'Analyser ton marketing actuel',
        'offer.card1.item2': 'Identifier les opportunités de croissance',
        'offer.card1.item3': 'Créer du contenu pour tes réseaux sociaux',
        'offer.card1.item4': 'Te montrer comment augmenter tes revenus',
        'offer.card1.item5': 'Te donner une vision claire de comment utiliser Google Ads pour générer des leads et des ventes',
        'offer.card1.item6': 'Te montrer comment fidéliser tes clients avec un système de mailing efficace',
        'offer.card2.title': 'Et si tu veux aller plus loin avec nous, on offre aussi :',
        'offer.card2.item1': 'Création de sites web & e-commerce',
        'offer.card2.item2': 'Développement d’applications',
        'offer.card2.item3': 'SEO (référencement)',
        'offer.footer.commitment': 'Aucun engagement',
        'offer.footer.limited': 'Places limitées chaque mois',
        // Solution Section (Added)
        'solution.title': 'Solution',
        'solution.subtitle': 'Contenu + Publicité + Stratégie',
        'solution.description': 'On combine contenu + publicité + stratégie pour transformer l’attention en revenus.',
        'solution.item1': 'Contenu qui convertit (vidéo, reels, UGC)',
        'solution.item2': 'Publicité (Meta & Google Ads)',
        'solution.item3': 'Suivi des conversions (résultats réels, pas des “likes”)',
        'solution.item4': 'Positionnement stratégique adapté à ton marché',
        'solution.item5': 'Email marketing (fidélisation & augmentation de la valeur client)',
        'solution.bestseller': 'Le plus vendu',
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

export const experienceFr = [
    {
        company: "Miiles Creative Studio",
        duration: "Contrat · 2 ans 8 mois",
        roles: [
            {
                title: "Brand Manager",
                period: "Avril 2025 - Février 2026 · 11 mois",
                location: "Mexique · Hybride",
                details: [
                    "Stratégie de marketing IA et optimisation des tunnels : planification et exécution de tunnels de marketing basés sur l'IA, stratégies de positionnement et systèmes de conversion.",
                    "Positionnement de produit IA et Storytelling : développement de stratégies de positionnement et de cadres narratifs pour les produits d'IA."
                ]
            }
        ]
    },
    {
        company: "Idiomes",
        roles: [
            { title: "Espagnol", period: "Natif" },
            { title: "Anglais", period: "Professionnel" },
            { title: "Français", period: "Courant" }
        ]
    }
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('language');
        return (saved as Language) || 'fr';
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
