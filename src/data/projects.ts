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
    tularosa: {
        title: "Restauration & hôtellerie",
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
    original: {
        title: "Barbería",
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
    }
};

