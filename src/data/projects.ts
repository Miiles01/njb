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
            "imagenes-preview/6E812A4C-4BC6-4099-825E-618A91AEE912.webp",
            "imagenes-preview/70891831-6EA7-430A-A7AF-1412597E5498.webp",
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
            "https://youtube.com/shorts/HkINsy8Zz4Y",
            "imagenes-preview/IMG_3201.webp",
            "imagenes-preview/IMG_3204.webp",
            "https://youtube.com/shorts/S46AV32pfwE",
            "imagenes-preview/imagen-pequena-2/whatsapp-image.jpeg",
            "IMG_3200.webp",
            "IMG_3202.webp",
            "IMG_3203.webp",
            "logo-original.webp",
            "portrait.webp",
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
            "imagenes-preview/PHOTO-2025-04-30-17-51-16.jpg",
            "imagenes-preview/00c6a52b-08e3-40b9-a765-74f0a6c1bfd2-1.webp",
            "imagenes-preview/02d772d1-4029-4f98-8e16-3bb0cdf50495.jpg",
            "30ed5067-d17f-4230-8369-1bd282ba9c44-1.webp",
            "3485530d-4d23-4df9-965c-b8daecd174af.jpg",
            "img-2178-1.webp",
            "IMG_2692.PNG",
            "screenshot-preview.png"
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
            "imagenes-preview/pexels-restaurant.webp",
            "imagenes-preview/frame-restaurant.png",
            "imagenes-preview/image-68.webp",
            "1f8086c6-29ff-4506-ba2b-db0a6f5c50b9.webp",
            "https://youtube.com/shorts/6Fvouem_lqE",
            "4b1d397e-9012-4f48-ba04-e7e867715ceb.webp",
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
            "https://youtu.be/JhNdb-imGVs",
            "imagenes-preview/screenshot-2.webp",
            "screenshot-1.webp",
            "https://youtube.com/shorts/vcn__HrDl-8",
            "https://youtube.com/shorts/gQrDKUFQwkk",
            "https://youtube.com/shorts/_4lzcmTDq8o",
            "https://youtube.com/shorts/IuzRfMrCtxs",
            "039BCB4C-2224-49AB-B297-83C9D100EC36.webp",
            "5E7A9C66-3D16-4B2E-897C-36ED2AB38FD1.webp",
            "7dd166ce-ea15-4ff0-aa9f-8b81b972e281.jpg"
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
            "imagenes-preview/CFCFE098-B813-457F-AF6A-AACE6D8D0956.webp",
            "imagenes-preview/A06BFBCB-522A-484D-BDC8-D7243858EAD2.webp",
            "imagenes-preview/69e3a06d-2a2b-471f-9e25-16bd90ecb40f.webp",
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
