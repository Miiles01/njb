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
            "Imaganes preview/9A0ADB9E-79CB-4A8C-A066-656C12282E67segment_video_2.mp4",
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
            "A92E605D-9C1C-45C7-9F5D-2DF3A6922A42segment_video_2.mp4",
            "imaganes preview/copy_6A24855D-85A6-4432-98D7-F368AF53BFF3.mp4",
            "imaganes preview/IMG_3201.webp",
            "imaganes preview/IMG_3204.webp",
            "imaganes preview/Imagen pequen??a 2 /WhatsApp Image 2026-04-12 at 22.49.57.jpeg",
            "IMG_3200.webp",
            "IMG_3202.webp",
            "IMG_3203.webp",
            "copy_19BDAE2D-CC38-47F6-9D11-F44486E9D224.mp4",
            "copy_B8A7DBD9-A6E5-41B1-A44E-C5C5FF9974AA.mp4"
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
            "39b4068c-17c9-48e7-81da-575cb550270a.mp4",
            "4b1d397e-9012-4f48-ba04-e7e867715ceb.webp",
            "790BA540-0EE3-44E8-879C-A048D6786B8A.webp",
            "E500D044-AA01-4071-B412-0793BC5B0BA6.webp",
            "IMG_2600.PNG",
            "att.5KJ8yJtR0DE818Q8Ml3w-YwAuBjrIEEmQjoypFI6yKA.jpg",
            "copy_F40763E6-8BB1-4753-B08E-AAF494A1DDE8.mp4",
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
            "imagenes preview/dji_fly_20231129_144126_442_1701321614943_video.mp4",
            "imagenes preview/Screenshot 2026-04-15 at 4.13.06 PM.webp",
            "imagenes preview/dji_fly_20240108_181250_447_1738547042657_video.mp4",
            "039BCB4C-2224-49AB-B297-83C9D100EC36.webp",
            "1b6d9432-dfac-4b69-b6b7-fb2daf9379b9.jpg",
            "5E7A9C66-3D16-4B2E-897C-36ED2AB38FD1.webp",
            "7dd166ce-ea15-4ff0-aa9f-8b81b972e281.jpg",
            "DJI_0831.mp4",
            "Screenshot 2026-04-15 at 3.30.00 PM.webp",
            "dji_fly_20241107_090932_44_1731361663597_video.mp4",
            "dji_fly_20250116_124216_740_1738531672623_video.mp4",
            "dji_fly_20250116_124516_750_1738531599634_video.mp4",
            "dji_fly_20260310_001944_0022_1773351871049_video.mp4"
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
            "portada.webp",
            "imagenes preview/69e3a06d-2a2b-471f-9e25-16bd90ecb40f.webp",
            "imagenes preview/A06BFBCB-522A-484D-BDC8-D7243858EAD2.webp",
            "imagenes preview/CFCFE098-B813-457F-AF6A-AACE6D8D0956.webp",
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
