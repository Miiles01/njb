export interface Testimonial {
  name: string;
  role: { es: string; en: string; fr: string };
  text: { es: string; en: string; fr: string };
  image?: string | null;
}

export const testimonials: Testimonial[] = [
  {
    name: "Satisfait Client",
    role: { 
      es: "Cliente de NJB", 
      en: "NJB Client",
      fr: "Client NJB"
    },
    text: {
      es: "“Comenzamos a tener clientes reales gracias a NJB”",
      en: "“We started getting real clients thanks to NJB”",
      fr: "“On a commencé à avoir de vrais clients grâce à NJB”"
    }
  },
  {
    name: "Satisfait Client",
    role: { 
      es: "Cliente de NJB", 
      en: "NJB Client",
      fr: "Client NJB"
    },
    text: {
      es: "“La mejor decisión para nuestro marketing”",
      en: "“The best decision for our marketing”",
      fr: "“La meilleure décision pour notre marketing”"
    }
  },
  {
    name: "Cecilia Corona",
    role: { 
      es: "Desarrolladora de software (Frontend/Backend, IA, UX/UI)", 
      en: "Software Developer (Frontend/Backend, AI, UX/UI)",
      fr: "Développeuse logiciel (Frontend/Backend, IA, UX/UI)"
    },
    text: {
      es: "Tuve la oportunidad de colaborar con NJB en distintos proyectos; su enfoque profesional siempre fue impecable. Destaca por integrar branding, UX/UI y SEO de forma efectiva.",
      en: "I had the opportunity to collaborate with NJB on various projects; their professional approach was always impeccable. They stand out for the effective integration of branding, UX/UI, and SEO.",
      fr: "J'ai eu l'occasion de collaborer avec NJB sur divers projets ; leur approche professionnelle a toujours été impeccable. Ils se distinguent par l'intégration efficace du branding, de l'UX/UI et du SEO."
    }
  },
  {
    name: "María Marín",
    role: { 
      es: "Especialista en ventas y marketing", 
      en: "Sales & Marketing Specialist",
      fr: "Spécialiste en ventes et marketing"
    },
    text: {
      es: "Compartí clases y proyectos con NJB durante nuestra formación en Administración. Ha demostrado ser un estudiante responsable, amigable y muy dedicado en lo que hace.",
      en: "I shared classes and projects with NJB during our Management training. They proved to be a responsible, friendly, and very dedicated team in everything they do.",
      fr: "J'ai partagé des cours et des projets avec NJB pendant notre formation en gestion. Ils ont prouvé être une équipe responsable, amicale et très dévouée dans tout ce qu'ils font."
    }
  },
  {
    name: "Luz Girón",
    role: { 
      es: "Marketing digital y gestión comercial", 
      en: "Digital Marketing & Commercial Management",
      fr: "Marketing numérique et gestion commerciale"
    },
    text: {
      es: "Coincidí con NJB durante tres semestres en la Licenciatura. Es una persona muy dedicada, enfocada y con una gran capacidad de adaptación profesional.",
      en: "I coincided with NJB for three semesters in the Bachelor's degree. They are a very dedicated, focused team with a great capacity for professional adaptation.",
      fr: "J'ai coïncidé avec NJB pendant trois semestres en licence. C'est une équipe très dévouée, concentrée et dotée d'une grande capacité d'adaptation professionnelle."
    }
  },
  {
    name: "Armando García",
    role: { 
      es: "Marketing y análisis estratégico", 
      en: "Marketing & Strategic Analysis",
      fr: "Marketing et analyse stratégique"
    },
    text: {
      es: "Trabajar con NJB fue compartir visión. Es de esas personas que no solo hacen su parte, sino que elevan el estándar de todo el equipo en cada trabajo.",
      en: "Working with NJB meant sharing a vision. He is one of those people who not only does his part but raises the standard for the entire team in every work.",
      fr: "Travailler avec NJB signifiait partager une vision. C'est le genre de personne qui ne se contente pas de faire sa part, mais qui élève le niveau de toute l'équipe dans chaque travail."
    }
  },
  {
    name: "Zair López",
    role: { 
      es: "Estrategia de negocio y gestión de proyectos", 
      en: "Business Strategy & Project Management",
      fr: "Stratégie d'entreprise et gestion de projet"
    },
    text: {
      es: "NJB es un profesional sobresaliente con un talento notable para liderar proyectos de marketing. Su experiencia en UX/UI, SEO y CRM lo convierte en un referente.",
      en: "NJB is an outstanding professional with a notable talent for leading marketing projects. His experience in UX/UI, SEO and CRM makes him a benchmark.",
      fr: "NJB est un professionnel exceptionnel doté d'un talent remarquable pour diriger des projets marketing. Son expérience en UX/UI, SEO et CRM en fait une référence."
    }
  },
  {
    name: "Evelyn Ruiz",
    role: { 
      es: "Recursos humanos y estrategia organizacional", 
      en: "HR & Organizational Strategy",
      fr: "RH et stratégie organisationnelle"
    },
    text: {
      es: "Trabajar con NJB fue un acierto. Destaca por transformar ideas en estrategias creativas que generan impacto, ya sea en piezas visuales o campañas digitales.",
      en: "Working with NJB was a success. He stands out for transforming ideas into creative strategies that generate impact, whether in visual pieces or digital campaigns.",
      fr: "Travailler avec NJB a été un succès. Il se distingue par sa capacité à transformer des idées en stratégies créatives qui génèrent un impact, que ce soit par des visuels ou des campagnes numériques."
    }
  },
  {
    name: "Noemí Ramos",
    role: { 
      es: "Gestión de talento y análisis organizacional", 
      en: "Talent Management & Organizational Analysis",
      fr: "Gestion des talents et analyse organisationnelle"
    },
    text: {
      es: "Coincidí con NJB durante nuestra formación en Administración. Es una persona que deja huella por su actitud, compromiso y gran calidad humana.",
      en: "I coincided with NJB during our Management training. He is a person who leaves a mark through his attitude, commitment, and great human quality.",
      fr: "J'ai côtoyé NJB pendant notre formation en gestion. C'est une personne qui marque les esprits par son attitude, son engagement et sa grande qualité humaine."
    }
  },
  {
    name: "Antonio Memije",
    role: { 
      es: "Desarrollo de negocio e industria musical", 
      en: "Business Development & Music Industry",
      fr: "Développement commercial et industrie musicale"
    },
    text: {
      es: "NJB se caracteriza por un constante flujo de ideas. Siempre presenta alguna propuesta de negocio innovadora o busca cómo mejorar las existentes.",
      en: "NJB is characterized by a constant flow of ideas. He always presents an innovative business proposal or looks for ways to improve existing ones.",
      fr: "NJB se caractérise par un flux constant d'idées. Il présente toujours une proposition commerciale innovante ou cherche des moyens d'améliorer celles qui existent."
    }
  },
  {
    name: "Yamel Hernández",
    role: { 
      es: "Finanzas y gestión de recursos", 
      en: "Finance & Resource Management",
      fr: "Finance et gestion des ressources"
    },
    text: {
      es: "He trabajado con NJB en diversos proyectos; puedo asegurar que es una persona muy creativa que sabe utilizar todos los recursos a su favor.",
      en: "I have worked with NJB on various projects; I can assure you that he is a very creative person who knows how to use all resources to his advantage.",
      fr: "J'ai travaillé avec NJB sur divers projets ; je peux vous assurer que c'est une personne très créative qui sait utiliser toutes les ressources à son avantage."
    }
  },
  {
    name: "Ashley García",
    role: { 
      es: "Marketing y estrategia", 
      en: "Marketing & Strategy",
      fr: "Marketing et stratégie"
    },
    text: {
      es: "Coincidí con NJB en la universidad y puedo decir con seguridad que es una persona excepcional tanto en lo profesional como en lo personal.",
      en: "I coincided with NJB at university and I can say with certainty that he is an exceptional person both professionally and personally.",
      fr: "J'ai connu NJB à l'université et je peux affirmer avec certitude que c'est une personne exceptionnelle, tant sur le plan professionnel que personnel."
    }
  }
];
