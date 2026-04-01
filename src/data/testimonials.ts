export interface Testimonial {
  name: string;
  role: { es: string; en: string };
  text: { es: string; en: string };
  image?: string | null;
}

export const testimonials: Testimonial[] = [
  {
    name: "Cecilia Corona",
    role: { 
      es: "Desarrolladora de software (Frontend/Backend, IA, UX/UI)", 
      en: "Software Developer (Frontend/Backend, AI, UX/UI)" 
    },
    text: {
      es: "Tuve la oportunidad de colaborar con NJB en distintos proyectos; su enfoque profesional siempre fue impecable. Destaca por integrar branding, UX/UI y SEO de forma efectiva.",
      en: "I had the opportunity to collaborate with NJB on various projects; their professional approach was always impeccable. They stand out for the effective integration of branding, UX/UI, and SEO."
    }
  },
  {
    name: "María Marín",
    role: { 
      es: "Especialista en ventas y marketing", 
      en: "Sales & Marketing Specialist" 
    },
    text: {
      es: "Compartí clases y proyectos con NJB durante nuestra formación en Administración. Ha demostrado ser un estudiante responsable, amigable y muy dedicado en lo que hace.",
      en: "I shared classes and projects with NJB during our Management training. They proved to be a responsible, friendly, and very dedicated team in everything they do."
    }
  },
  {
    name: "Luz Girón",
    role: { 
      es: "Marketing digital y gestión comercial", 
      en: "Digital Marketing & Commercial Management" 
    },
    text: {
      es: "Coincidí con NJB durante tres semestres en la Licenciatura. Es una persona muy dedicada, enfocada y con una gran capacidad de adaptación profesional.",
      en: "I coincided with NJB for three semesters in the Bachelor's degree. They are a very dedicated, focused team with a great capacity for professional adaptation."
    }
  },
  {
    name: "Armando García",
    role: { 
      es: "Marketing y análisis estratégico", 
      en: "Marketing & Strategic Analysis" 
    },
    text: {
      es: "Trabajar con NJB fue compartir visión. Es de esas personas que no solo hacen su parte, sino que elevan el estándar de todo el equipo en cada trabajo.",
      en: "Working with NJB meant sharing a vision. He is one of those people who not only does his part but raises the standard for the entire team in every work."
    }
  },
  {
    name: "Zair López",
    role: { 
      es: "Estrategia de negocio y gestión de proyectos", 
      en: "Business Strategy & Project Management" 
    },
    text: {
      es: "NJB es un profesional sobresaliente con un talento notable para liderar proyectos de marketing. Su experiencia en UX/UI, SEO y CRM lo convierte en un referente.",
      en: "NJB is an outstanding professional with a notable talent for leading marketing projects. His experience in UX/UI, SEO, and CRM makes him a benchmark."
    }
  },
  {
    name: "Evelyn Ruiz",
    role: { 
      es: "Recursos humanos y estrategia organizacional", 
      en: "HR & Organizational Strategy" 
    },
    text: {
      es: "Trabajar con NJB fue un acierto. Destaca por transformar ideas en estrategias creativas que generan impacto, ya sea en piezas visuales o campañas digitales.",
      en: "Working with NJB was a success. He stands out for transforming ideas into creative strategies that generate impact, whether in visual pieces or digital campaigns."
    }
  },
  {
    name: "Noemí Ramos",
    role: { 
      es: "Gestión de talento y análisis organizacional", 
      en: "Talent Management & Organizational Analysis" 
    },
    text: {
      es: "Coincidí con NJB durante nuestra formación en Administración. Es una persona que deja huella por su actitud, compromiso y gran calidad humana.",
      en: "I coincided with NJB during our Management training. He is a person who leaves a mark through his attitude, commitment, and great human quality."
    }
  },
  {
    name: "Antonio Memije",
    role: { 
      es: "Desarrollo de negocio e industria musical", 
      en: "Business Development & Music Industry" 
    },
    text: {
      es: "NJB se caracteriza por un constante flujo de ideas. Siempre presenta alguna propuesta de negocio innovadora o busca cómo mejorar las existentes.",
      en: "NJB is characterized by a constant flow of ideas. He always presents an innovative business proposal or looks for ways to improve existing ones."
    }
  },
  {
    name: "Yamel Hernández",
    role: { 
      es: "Finanzas y gestión de recursos", 
      en: "Finance & Resource Management" 
    },
    text: {
      es: "He trabajado con NJB en diversos proyectos; puedo asegurar que es una persona muy creativa que sabe utilizar todos los recursos a su favor.",
      en: "I have worked with NJB on various projects; I can assure you that he is a very creative person who knows how to use all resources to his advantage."
    }
  },
  {
    name: "Ashley García",
    role: { 
      es: "Marketing y estrategia", 
      en: "Marketing & Strategy" 
    },
    text: {
      es: "Coincidí con NJB en la universidad y puedo decir con seguridad que es una persona excepcional tanto en lo profesional como en lo personal.",
      en: "I coincided with NJB at university and I can say with certainty that he is an exceptional person both professionally and personally."
    }
  },
  {
    name: "Sara Díaz",
    role: { 
      es: "Organización y coordinación de proyectos", 
      en: "Project Organization & Coordination" 
    },
    text: {
      es: "Trabajar con NJB en la universidad fue una experiencia enriquecedora. Es sumamente creativo, proactivo y tiene gran capacidad para aportar ideas valiosas.",
      en: "Working with NJB at university was an enriching experience. He is extremely creative, proactive, and has a great ability to contribute valuable ideas."
    }
  },
  {
    name: "Juan Pablo García",
    role: { 
      es: "Marketing y análisis de datos", 
      en: "Marketing & Data Analysis" 
    },
    text: {
      es: "Conocí a NJB en la universidad; desde entonces destaca su enfoque a resultados, su inteligencia y su gran pasión por el marketing.",
      en: "I met NJB at university; since then, his results-oriented focus, intelligence, and great passion for marketing have stood out."
    }
  },
  {
    name: "Irais Cortes",
    role: { 
      es: "Marketing digital y contenido", 
      en: "Digital Marketing & Content" 
    },
    text: {
      es: "NJB es una de las personas más creativas que conozco. Tiene un gran talento visual y siempre logra que sus trabajos destaquen por ser diferentes.",
      en: "NJB is one of the most creative people I know. He has great visual talent and always manages to make his work stand out for being different."
    }
  },
  {
    name: "Melissa Pérez",
    role: { 
      es: "Diseño de producto", 
      en: "Product Design" 
    },
    text: {
      es: "NJB es súper creativo y detallista. Trabajar con él fue un gusto porque siempre aportaba ideas frescas y estaba abierto a ajustes de diseño.",
      en: "NJB is super creative and detail-oriented. Working with him was a pleasure because he always brought fresh ideas and was open to design adjustments."
    }
  },
  {
    name: "Brisa Salcedo",
    role: { 
      es: "Estrategia comercial y branding", 
      en: "Commercial Strategy & Branding" 
    },
    text: {
      es: "He trabajado con NJB durante la universidad y siempre destacó por su creatividad, excelente trabajo en equipo y sus sólidas habilidades analíticas.",
      en: "I have worked with NJB during university and he always stood out for his creativity, excellent teamwork, and strong analytical skills."
    }
  },
  {
    name: "Giovan López",
    role: { 
      es: "Marketing digital y e-commerce", 
      en: "Digital Marketing & E-commerce" 
    },
    text: {
      es: "NJB siempre ha demostrado ser una persona comprometida con su trabajo. Es bastante creativo y, sobre todo, altamente habilidoso en lo que hace.",
      en: "NJB has always shown himself to be a person committed to his work. He is quite creative and, above all, highly skilled in what he does."
    }
  },
  {
    name: "Angélica Villanueva",
    role: { 
      es: "Gestión de proyectos y operaciones", 
      en: "Project Management & Operations" 
    },
    text: {
      es: "Trabajar con NJB en proyectos de marketing fue una experiencia que dejó huella. Su creatividad transformó estrategias completas en ideas innovadoras.",
      en: "Working with NJB on marketing projects was an experience that left a mark. His creativity transformed complete strategies into innovative ideas."
    }
  },
  {
    name: "David Martín",
    role: { 
      es: "Estrategia empresarial y legal", 
      en: "Business & Legal Strategy" 
    },
    text: {
      es: "NJB no solo está interesado en generar resultados, sino en establecer una relación estrecha y duradera con sus colaboradores y clientes.",
      en: "NJB is not only interested in generating results but in establishing a close and lasting relationship with his collaborators and clients."
    }
  },
  {
    name: "Diego Mejía",
    role: { 
      es: "Desarrollo de negocio y marketing", 
      en: "Business Development & Marketing" 
    },
    text: {
      es: "NJB es un excelente colaborador, dispuesto a aportar ideas frescas y soluciones efectivas. Su capacidad para adaptarse al entorno digital es destacable.",
      en: "NJB is an excellent collaborator, ready to provide fresh ideas and effective solutions. His ability to adapt to the digital environment is remarkable."
    }
  },
  {
    name: "Leonardo Gama",
    role: { 
      es: "Product Manager", 
      en: "Product Manager" 
    },
    text: {
      es: "Trabajar con NJB fue de lo mejor. Su habilidad de diseño le permite generar soluciones creativas rápidas, y su proactividad acelera los objetivos.",
      en: "Working with NJB was the best. His design skill allows him to generate fast creative solutions, and his proactivity accelerates goals."
    }
  }
];
