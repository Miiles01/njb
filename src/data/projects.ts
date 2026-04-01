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
    miiles: {
        title: "Miiles",
        folder: "Miiles",
        subtitleKey: "proj.miiles.subtitle",
        industryKey: "proj.miiles.details.industry",
        roleKey: "proj.miiles.details.role",
        descriptionKey: "proj.miiles.details.description",
        images: [
            "portada-1.webp",
            "about-miiles.webp",
            "mockup-app-web.webp",
            "miiles-3.webp",
            "elementos-visuales-y-mockups-de-la-app-web.webp",
            "elementos-visuales.webp",
            "mockup-app-web-2.webp",
            "isotipo.webp",
            "iconos.webp"
        ],
        participation: [
            { icon: "bar", textKey: "proj.part.funnels" },
            { icon: "star", textKey: "proj.part.strategy" },
            { icon: "eye", textKey: "proj.part.ai" }
        ]
    },
    "naabi-kanabi": {
        title: "Naabi Kanabi",
        folder: "Naabi-Kanabi",
        subtitleKey: "proj.naabi.subtitle",
        industryKey: "proj.naabi.details.industry",
        roleKey: "proj.naabi.details.role",
        descriptionKey: "proj.naabi.details.description",
        images: ["portada-1.webp", "naabi-1.webp", "naabi-2.webp"],
        participation: [
            { icon: "bar", textKey: "proj.part.funnels" },
            { icon: "star", textKey: "proj.part.strategy" },
            { icon: "eye", textKey: "proj.part.ai" }
        ]
    },
    tularosa: {
        title: "Tularosa",
        folder: "Tularosa",
        subtitleKey: "proj.tularosa.subtitle",
        industryKey: "proj.tularosa.details.industry",
        roleKey: "proj.tularosa.details.role",
        descriptionKey: "proj.tularosa.details.description",
        images: ["portada-1.webp", "tula-1.webp", "tula-2.webp"],
        participation: [
            { icon: "bar", textKey: "proj.part.funnels" },
            { icon: "star", textKey: "proj.part.strategy" }
        ]
    },
    erpxtender: {
        title: "Erpxtender",
        folder: "Erpxtender",
        subtitleKey: "proj.erp.subtitle",
        industryKey: "proj.erp.details.industry",
        roleKey: "proj.erp.details.role",
        descriptionKey: "proj.erp.details.description",
        images: ["portada-1.webp", "erp-1.webp", "publicidad-exterior.webp"],
        participation: [
            { icon: "bar", textKey: "proj.part.funnels" },
            { icon: "star", textKey: "proj.part.strategy" }
        ]
    },
    "mar-vic": {
        title: "Mar & Vic",
        folder: "Mar-Vic",
        subtitleKey: "proj.marvic.subtitle",
        industryKey: "proj.marvic.details.industry",
        roleKey: "proj.marvic.details.role",
        descriptionKey: "proj.marvic.details.description",
        images: ["portada-1.webp", "mar-1.webp", "mar-2.webp"],
        participation: [
            { icon: "bar", textKey: "proj.part.funnels" },
            { icon: "star", textKey: "proj.part.strategy" },
            { icon: "eye", textKey: "proj.part.ai" }
        ]
    },
    original: {
        title: "Original",
        folder: "Original",
        subtitleKey: "proj.original.subtitle",
        industryKey: "proj.original.details.industry",
        roleKey: "proj.original.details.role",
        descriptionKey: "proj.original.details.description",
        images: ["portada-1.webp", "original-1.webp", "original-2.webp"],
        participation: [
            { icon: "bar", textKey: "proj.part.funnels" },
            { icon: "star", textKey: "proj.part.strategy" }
        ]
    },
    colorfit: {
        title: "Colorfit",
        folder: "Colorfit",
        subtitleKey: "proj.colorfit.subtitle",
        industryKey: "proj.colorfit.details.industry",
        roleKey: "proj.colorfit.details.role",
        descriptionKey: "proj.colorfit.details.description",
        images: ["portada-1.webp", "colorfit-2.webp", "mockup-ropa-2.webp"],
        participation: [
            { icon: "star", textKey: "proj.part.strategy" }
        ]
    },
    jambu: {
        title: "Jambú",
        folder: "Jambu",
        subtitleKey: "proj.jambu.subtitle",
        industryKey: "proj.jambu.details.industry",
        roleKey: "proj.jambu.details.role",
        descriptionKey: "proj.jambu.details.description",
        images: ["portada-1.webp", "packaging.webp", "mockup-del-producto.webp"],
        participation: [
            { icon: "star", textKey: "proj.part.strategy" }
        ]
    }
};

