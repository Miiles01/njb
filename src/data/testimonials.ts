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
    image: "https://media.licdn.com/dms/image/v2/D4E03AQGnfwvp66IqVA/profile-displayphoto-scale_400_400/B4EZmJ9apzKgAg-/0/1758956203328?e=1776297600&v=beta&t=WMfvxoPK751nrwOQ9EIuszYBUUEWshphFxEt4-xBc88",
    text: {
      es: "Tuve la oportunidad de colaborar con Manuel en distintos proyectos; su enfoque profesional siempre fue impecable. Destaca por integrar branding, UX/UI y SEO de forma efectiva.",
      en: "I had the opportunity to collaborate with Manuel on various projects; his professional approach was always impeccable. He stands out for the effective integration of branding, UX/UI, and SEO."
    }
  },
  {
    name: "María Marín",
    role: { 
      es: "Especialista en ventas y marketing", 
      en: "Sales & Marketing Specialist" 
    },
    image: "https://media.licdn.com/dms/image/v2/D5603AQFB_tmY7BJWJQ/profile-displayphoto-shrink_400_400/B56ZYawlSNGUAg-/0/1744205665968?e=1776297600&v=beta&t=B_jkqeve3-ofNRZsGov7_YAOVxrTt_iHXuvCQLJB1Qk",
    text: {
      es: "Compartí clases y proyectos con Manuel durante nuestra formación en Administración. Ha demostrado ser un estudiante responsable, amigable y muy dedicado en lo que hace.",
      en: "I shared classes and projects with Manuel during our Management training. He proved to be a responsible, friendly, and very dedicated student in everything he does."
    }
  },
  {
    name: "Luz Girón",
    role: { 
      es: "Marketing digital y gestión comercial", 
      en: "Digital Marketing & Commercial Management" 
    },
    image: "https://media.licdn.com/dms/image/v2/D4D03AQGLj5najUYS1w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1719978363347?e=1776297600&v=beta&t=jg0xPg6ifEnOYgfjbKsWaDUkmPKRVgoHn6Lo2ByRsXU",
    text: {
      es: "Coincidí con Manuel durante tres semestres en la Licenciatura. Es una persona muy dedicada, enfocada y con una gran capacidad de adaptación profesional.",
      en: "I coincided with Manuel for three semesters in the Bachelor's degree. He is a very dedicated, focused person with a great capacity for professional adaptation."
    }
  },
  {
    name: "Armando García",
    role: { 
      es: "Marketing y análisis estratégico", 
      en: "Marketing & Strategic Analysis" 
    },
    image: "https://media.licdn.com/dms/image/v2/D4E03AQFfutkr7FsmWA/profile-displayphoto-scale_400_400/B4EZx_BBSZGgAg-/0/1771657500455?e=1776297600&v=beta&t=EKw2lmkbKIr42NOh84lXJDvjpQCaXilR5fQrbfQ1fEs",
    text: {
      es: "Trabajar con Manuel fue compartir visión. Es de esas personas que no solo hacen su parte, sino que elevan el estándar de todo el equipo en cada trabajo.",
      en: "Working with Manuel meant sharing a vision. He is one of those people who not only does his part but raises the standard for the entire team in every work."
    }
  },
  {
    name: "Zair López",
    role: { 
      es: "Estrategia de negocio y gestión de proyectos", 
      en: "Business Strategy & Project Management" 
    },
    image: null,
    text: {
      es: "Manuel es un profesional sobresaliente con un talento notable para liderar proyectos de marketing. Su experiencia en UX/UI, SEO y CRM lo convierte en un referente.",
      en: "Manuel is an outstanding professional with a notable talent for leading marketing projects. His experience in UX/UI, SEO, and CRM makes him a benchmark."
    }
  },
  {
    name: "Evelyn Ruiz",
    role: { 
      es: "Recursos humanos y estrategia organizacional", 
      en: "HR & Organizational Strategy" 
    },
    image: "https://media.licdn.com/dms/image/v2/D5603AQELK8D_vnxW3A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1716417234356?e=1776297600&v=beta&t=lzZJ9Xfp2Yxs_gtB9E01ozMnWRde6asj4ZS3wEpW3No",
    text: {
      es: "Trabajar con Manuel fue un acierto. Destaca por transformar ideas en estrategias creativas que generan impacto, ya sea en piezas visuales o campañas digitales.",
      en: "Working with Manuel was a success. He stands out for transforming ideas into creative strategies that generate impact, whether in visual pieces or digital campaigns."
    }
  },
  {
    name: "Noemí Ramos",
    role: { 
      es: "Gestión de talento y análisis organizacional", 
      en: "Talent Management & Organizational Analysis" 
    },
    image: "https://media.licdn.com/dms/image/v2/D5603AQGo9CXWzrLEvg/profile-displayphoto-scale_400_400/B56ZmoS8zTJoAg-/0/1759465164872?e=1776297600&v=beta&t=IuXZY8XM_6PZknGgQtMs0zELpywqtFGKEwewIhuaSsE",
    text: {
      es: "Coincidí con Manuel durante nuestra formación en Administración. Es una persona que deja huella por su actitud, compromiso y gran calidad humana.",
      en: "I coincided with Manuel during our Management training. He is a person who leaves a mark through his attitude, commitment, and great human quality."
    }
  },
  {
    name: "Antonio Memije",
    role: { 
      es: "Desarrollo de negocio e industria musical", 
      en: "Business Development & Music Industry" 
    },
    image: "https://media.licdn.com/dms/image/v2/D4E03AQHjvNuoa6wH7Q/profile-displayphoto-shrink_400_400/B4EZWS_zRSGgAk-/0/1741927954882?e=1776297600&v=beta&t=-FQNX7cYc3DiuuVwgmNJPYHndHQSX0bezL97EWlH3xg",
    text: {
      es: "Manuel se caracteriza por un constante flujo de ideas. Siempre presenta alguna propuesta de negocio innovadora o busca cómo mejorar las existentes.",
      en: "Manuel is characterized by a constant flow of ideas. He always presents an innovative business proposal or looks for ways to improve existing ones."
    }
  },
  {
    name: "Yamel Hernández",
    role: { 
      es: "Finanzas y gestión de recursos", 
      en: "Finance & Resource Management" 
    },
    image: "https://media.licdn.com/dms/image/v2/D4E03AQG3Mtzm2SLBcA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1716355751026?e=1776297600&v=beta&t=ZjhCm_gYtMDTTex-slItU5oo7OGhoFaCYXilO0BrCLo",
    text: {
      es: "He trabajado con Manuel en diversos proyectos; puedo asegurar que es una persona muy creativa que sabe utilizar todos los recursos a su favor.",
      en: "I have worked with Manuel on various projects; I can assure you that he is a very creative person who knows how to use all resources to his advantage."
    }
  },
  {
    name: "Ashley García",
    role: { 
      es: "Marketing y estrategia", 
      en: "Marketing & Strategy" 
    },
    image: "https://media.licdn.com/dms/image/v2/D4D03AQEuodckT_LU1w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1716362539633?e=1776297600&v=beta&t=XVaV0U1bDCXxp2LKwvB-9VpNEvwbUuk_Lgvg_9qIQfU",
    text: {
      es: "Coincidí con Manuel en la universidad y puedo decir con seguridad que es una persona excepcional tanto en lo profesional como en lo personal.",
      en: "I coincided with Manuel at university and I can say with certainty that he is an exceptional person both professionally and personally."
    }
  },
  {
    name: "Sara Díaz",
    role: { 
      es: "Organización y coordinación de proyectos", 
      en: "Project Organization & Coordination" 
    },
    image: "https://media.licdn.com/dms/image/v2/D4E03AQE77JfMusvDoA/profile-displayphoto-scale_400_400/B4EZsEqJ2oIQAg-/0/1765309718864?e=1776297600&v=beta&t=7AQ1XihD9df0kb34JJ9Ug1UcYoXA4NcTby4nHNWqisw",
    text: {
      es: "Trabajar con Manuel en la universidad fue una experiencia enriquecedora. Es sumamente creativo, proactivo y tiene gran capacidad para aportar ideas valiosas.",
      en: "Working with Manuel at university was an enriching experience. He is extremely creative, proactive, and has a great ability to contribute valuable ideas."
    }
  },
  {
    name: "Juan Pablo García",
    role: { 
      es: "Marketing y análisis de datos", 
      en: "Marketing & Data Analysis" 
    },
    image: "https://media.licdn.com/dms/image/v2/D4E03AQGB5_KYTVYfQw/profile-displayphoto-scale_400_400/B4EZhYXyyLGoAg-/0/1753829292102?e=1776297600&v=beta&t=jHg4N7MZgDY2YtRtT8f9Zn-2kEx9XfB3Mo5WzzsT1NQ",
    text: {
      es: "Conocí a Manuel en la universidad; desde entonces destaca su enfoque a resultados, su inteligencia y su gran pasión por el marketing.",
      en: "I met Manuel at university; since then, his results-oriented focus, intelligence, and great passion for marketing have stood out."
    }
  },
  {
    name: "Irais Cortes",
    role: { 
      es: "Marketing digital y contenido", 
      en: "Digital Marketing & Content" 
    },
    image: "https://media.licdn.com/dms/image/v2/D4D03AQE00OIpSjGSRw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718286001303?e=1776297600&v=beta&t=v4zxAS_4Tw9LWx7wI2Ibyh1g025LOettgaNAIwTclQs",
    text: {
      es: "Manuel es una de las personas más creativas que conozco. Tiene un gran talento visual y siempre logra que sus trabajos destaquen por ser diferentes.",
      en: "Manuel is one of the most creative people I know. He has great visual talent and always manages to make his work stand out for being different."
    }
  },
  {
    name: "Melissa Pérez",
    role: { 
      es: "Diseño de producto", 
      en: "Product Design" 
    },
    image: "https://media.licdn.com/dms/image/v2/D4E35AQEqqgFpCUw5Sw/profile-framedphoto-shrink_400_400/B4EZdmdYyuHIAc-/0/1749770669571?e=1775160000&v=beta&t=zrnEqw1kl3qA6CzsKDH84uVi5SZUaZmEWMmWEaqwMN0",
    text: {
      es: "Manuel es súper creativo y detallista. Trabajar con él fue un gusto porque siempre aportaba ideas frescas y estaba abierto a ajustes de diseño.",
      en: "Manuel is super creative and detail-oriented. Working with him was a pleasure because he always brought fresh ideas and was open to design adjustments."
    }
  },
  {
    name: "Brisa Salcedo",
    role: { 
      es: "Estrategia comercial y branding", 
      en: "Commercial Strategy & Branding" 
    },
    image: "https://media.licdn.com/dms/image/v2/D4E03AQHyIqv8LYvBOQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1714325937183?e=1776297600&v=beta&t=SMeTutUjn0T7iTcmL1Ec5SGg4f1C4-ABx7AdBf0OzOs",
    text: {
      es: "He trabajado con Manuel durante la universidad y siempre destacó por su creatividad, excelente trabajo en equipo y sus sólidas habilidades analíticas.",
      en: "I have worked with Manuel during university and he always stood out for his creativity, excellent teamwork, and strong analytical skills."
    }
  },
  {
    name: "Giovan López",
    role: { 
      es: "Marketing digital y e-commerce", 
      en: "Digital Marketing & E-commerce" 
    },
    image: "https://media.licdn.com/dms/image/v2/D4E03AQEo0ffcNAveNA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1716325523460?e=1776297600&v=beta&t=v0noHSYwcycvfBXnxefLdNpuQTzizKZ22QKKSEfredA",
    text: {
      es: "Manuel siempre ha demostrado ser una persona comprometida con su trabajo. Es bastante creativo y, sobre todo, altamente habilidoso en lo que hace.",
      en: "Manuel has always shown himself to be a person committed to his work. He is quite creative and, above all, highly skilled in what he does."
    }
  },
  {
    name: "Angélica Villanueva",
    role: { 
      es: "Gestión de proyectos y operaciones", 
      en: "Project Management & Operations" 
    },
    image: "https://media.licdn.com/dms/image/v2/D4E03AQHPQZN6JYL8_A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1716418063306?e=1776297600&v=beta&t=N9doffBhU-uUBOhWhZyQ8WNFhz-aykTVVxbV3IglAI8",
    text: {
      es: "Trabajar con Manuel en proyectos de marketing fue una experiencia que dejó huella. Su creatividad transformó estrategias completas en ideas innovadoras.",
      en: "Working with Manuel on marketing projects was an experience that left a mark. His creativity transformed complete strategies into innovative ideas."
    }
  },
  {
    name: "David Martín",
    role: { 
      es: "Estrategia empresarial y legal", 
      en: "Business & Legal Strategy" 
    },
    image: "https://media.licdn.com/dms/image/v2/D4D03AQEREQFMv42Hyw/profile-displayphoto-shrink_800_800/B4DZPCaK4mGoAc-/0/1734133460817?e=1776297600&v=beta&t=FQpBDH6Xrt2iY8a36KI26VmU-HuarJMShS35oJSDftc",
    text: {
      es: "Manuel no solo está interesado en generar resultados, sino en establecer una relación estrecha y duradera con sus colaboradores y clientes.",
      en: "Manuel is not only interested in generating results but in establishing a close and lasting relationship with his collaborators and clients."
    }
  },
  {
    name: "Diego Mejía",
    role: { 
      es: "Desarrollo de negocio y marketing", 
      en: "Business Development & Marketing" 
    },
    image: "https://media.licdn.com/dms/image/v2/D5603AQErge2DXhkVNA/profile-displayphoto-shrink_800_800/B56ZVtx4lzHsAk-/0/1741303548971?e=1776297600&v=beta&t=u9gcoOxaTPljbMSoYvOSEPFs9ncMP0tmzKQLcYRmuFo",
    text: {
      es: "Manuel es un excelente colaborador, dispuesto a aportar ideas frescas y soluciones efectivas. Su capacidad para adaptarse al entorno digital es destacable.",
      en: "Manuel is an excellent collaborator, ready to provide fresh ideas and effective solutions. His ability to adapt to the digital environment is remarkable."
    }
  },
  {
    name: "Leonardo Gama",
    role: { 
      es: "Product Manager", 
      en: "Product Manager" 
    },
    image: "https://media.licdn.com/dms/image/v2/D4E03AQGAf2LXBrXvaA/profile-displayphoto-scale_400_400/B4EZhPcrR3HIAg-/0/1753679575449?e=1776297600&v=beta&t=9-DoXy0WN6m-lJySg6ej6rPMRn1uC0s7pMya_7YISV0",
    text: {
      es: "Trabajar con Manuel fue de lo mejor. Su habilidad de diseño le permite generar soluciones creativas rápidas, y su proactividad acelera los objetivos.",
      en: "Working with Manuel was the best. His design skill allows him to generate fast creative solutions, and his proactivity accelerates goals."
    }
  }
];
