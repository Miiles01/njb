export interface Participation {
    icon: "eye" | "bar" | "star";
    textKey: string;
}

export interface ProjectData {
    title: string;
    folder: string;
    subtitleKey: string;
    industryKey: string;
    roleKey: string;
    descriptionKey: string;
    images: string[];
    participation?: Participation[];
}

export const projectsData: Record<string, ProjectData> = {
    bar: {
        title: "Bar",
        folder: "bar",
        subtitleKey: "proj.bar.subtitle",
        industryKey: "proj.bar.industry",
        roleKey: "proj.bar.role",
        descriptionKey: "proj.bar.description",
        images: [
            "https://youtube.com/shorts/0LjbP3K56mI",
            "Imaganes preview/6E812A4C-4BC6-4099-825E-618A91AEE912.webp",
            "Imaganes preview/70891831-6EA7-430A-A7AF-1412597E5498.webp",
            "att_item1.jpg",
            "item4.webp",
            "item6.webp"
        ],
        participation: [
            { icon: "bar", textKey: "proj.part.funnels" },
            { icon: "star", textKey: "proj.part.strategy" }
        ]
    },
    club: {
        title: "Club",
        folder: "club",
        subtitleKey: "proj.club.subtitle",
        industryKey: "proj.club.industry",
        roleKey: "proj.club.role",
        descriptionKey: "proj.club.description",
        images: [
            "logo-original.webp",
            "portrait.webp",
            "card.webp",
            "https://youtube.com/shorts/HkINsy8Zz4Y",
            "https://youtube.com/shorts/S46AV32pfwE",
            "imaganes preview/IMG_3201.webp",
            "imaganes preview/IMG_3204.webp",
            "imaganes preview/Imagen pequen??a 2 /WhatsApp Image 2026-04-12 at 22.49.57.jpeg",
            "IMG_3200.webp",
            "IMG_3202.webp",
            "IMG_3203.webp",
            "https://youtube.com/shorts/sQeNNcK8u1M",
            "https://youtube.com/shorts/Nu1blQSxI8I"
        ],
        participation: [
            { icon: "bar", textKey: "proj.part.funnels" },
            { icon: "star", textKey: "proj.part.strategy" }
        ]
    },
    "marca-deportiva": {
        title: "Marca Deportiva",
        folder: "marca-deportiva",
        subtitleKey: "proj.marca-deportiva.subtitle",
        industryKey: "proj.marca-deportiva.industry",
        roleKey: "proj.marca-deportiva.role",
        descriptionKey: "proj.marca-deportiva.description",
        images: [
            "imagenes preview/PHOTO-2025-04-30-17-51-16.jpg",
            "imagenes preview/00c6a52b-08e3-40b9-a765-74f0a6c1bfd2 (1).webp",
            "imagenes preview/02d772d1-4029-4f98-8e16-3bb0cdf50495.jpg",
            "30ed5067-d17f-4230-8369-1bd282ba9c44 (1).webp",
            "3485530d-4d23-4df9-965c-b8daecd174af.jpg",
            "IMG_2178 (1).webp",
            "IMG_2692.PNG",
            "Screenshot 2026-04-15 at 3.32.49???PM.png"
        ],
        participation: [
            { icon: "bar", textKey: "proj.part.funnels" },
            { icon: "star", textKey: "proj.part.strategy" }
        ]
    },
    restaurante: {
        title: "Restaurante",
        folder: "restaurante",
        subtitleKey: "proj.restaurante.subtitle",
        industryKey: "proj.restaurante.industry",
        roleKey: "proj.restaurante.role",
        descriptionKey: "proj.restaurante.description",
        images: [
            "Imaganes preview/pexels-18393328-27828536 1.webp",
            "Imaganes preview/Frame 2085662328.png",
            "Imaganes preview/image 68.webp",
            "1f8086c6-29ff-4506-ba2b-db0a6f5c50b9.webp",
            "https://youtube.com/shorts/6Fvouem_lqE",
            "4b1d397e-9012-4f48-ba04-e7e867715ceb.webp",
            "790BA540-0EE3-44E8-879C-A048D6786B8A.webp",
            "E500D044-AA01-4071-B412-0793BC5B0BA6.webp",
            "IMG_2600.PNG",
            "att.5KJ8yJtR0DE818Q8Ml3w-YwAuBjrIEEmQjoypFI6yKA.jpg",
            "https://youtube.com/shorts/Fp7cPqzV6as",
            "item4.webp"
        ],
        participation: [
            { icon: "bar", textKey: "proj.part.funnels" },
            { icon: "star", textKey: "proj.part.strategy" }
        ]
    },
    sesiones: {
        title: "Sesiones de Contenido",
        folder: "sesiones-de-contenido",
        subtitleKey: "proj.sesiones.subtitle",
        industryKey: "proj.sesiones.industry",
        roleKey: "proj.sesiones.role",
        descriptionKey: "proj.sesiones.description",
        images: [
            "https://youtube.com/shorts/vcn__HrDl-8",
            "imagenes preview/Screenshot 2026-04-15 at 4.13.06 PM.webp",
            "https://youtube.com/shorts/5t6HArXA0vk",
            "039BCB4C-2224-49AB-B297-83C9D100EC36.webp",
            "1b6d9432-dfac-4b69-b6b7-fb2daf9379b9.jpg",
            "5E7A9C66-3D16-4B2E-897C-36ED2AB38FD1.webp",
            "7dd166ce-ea15-4ff0-aa9f-8b81b972e281.jpg",
            "https://youtube.com/shorts/gQrDKUFQwkk",
            "Screenshot 2026-04-15 at 3.30.00 PM.webp",
            "https://youtube.com/shorts/q0vXdr5mLWE",
            "https://youtube.com/shorts/_4lzcmTDq8o",
            "https://youtube.com/shorts/IuzRfMrCtxs"
        ],
        participation: [
            { icon: "bar", textKey: "proj.part.funnels" },
            { icon: "star", textKey: "proj.part.strategy" }
        ]
    },
    "social-events": {
        title: "Social Events",
        folder: "social-events",
        subtitleKey: "proj.social-events.subtitle",
        industryKey: "proj.social-events.industry",
        roleKey: "proj.social-events.role",
        descriptionKey: "proj.social-events.description",
        images: [
            "imagenes preview/CFCFE098-B813-457F-AF6A-AACE6D8D0956.webp",
            "imagenes preview/A06BFBCB-522A-484D-BDC8-D7243858EAD2.webp",
            "portada.webp",
            "imagenes preview/69e3a06d-2a2b-471f-9e25-16bd90ecb40f.webp",
            "535708FF-AE0A-4563-A289-D22A06C42341.webp"
        ],
        participation: [
            { icon: "bar", textKey: "proj.part.funnels" },
            { icon: "star", textKey: "proj.part.strategy" }
        ]
    },
    realestate: {
        title: "Real Estate",
        folder: "Real-Estate",
        subtitleKey: "proj.realestate.subtitle",
        industryKey: "proj.realestate.industry",
        roleKey: "proj.realestate.role",
        descriptionKey: "proj.realestate.description",
        images: [
            "item-1.png",
            "brandboard.webp",
            "item-3.webp",
            "item-2.webp",
            "logo.webp"
        ],
        participation: [
            { icon: "star", textKey: "proj.part.strategy" },
            { icon: "eye", textKey: "proj.part.visual" }
        ]
    }
};
