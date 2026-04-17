import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { projectsData } from "@/data/projects";

export type Project = Tables<"projects">;
export type ProjectImage = Tables<"project_images">;
export type ProjectWithImages = Project & { project_images: ProjectImage[] };

export const usePublishedProjects = () =>
  useQuery({
    queryKey: ["projects", "published"],
    queryFn: async () => {
      // Transition to local data as requested for better control
      return Object.entries(projectsData).map(([slug, project]) => ({
        id: slug,
        slug,
        title: project.title,
        published: true,
        subtitle_es: project.subtitleKey,
        subtitle_en: project.subtitleKey,
        subtitle_fr: project.subtitleKey,
        industry_es: project.industryKey,
        industry_en: project.industryKey,
        industry_fr: project.industryKey,
        role_es: project.roleKey,
        role_en: project.roleKey,
        role_fr: project.roleKey,
        description_es: project.descriptionKey,
        description_en: project.descriptionKey,
        description_fr: project.descriptionKey,
        sort_order: 0,
        project_images: project.images.map((img, idx) => ({
          id: `${slug}-${idx}`,
          project_id: slug,
          storage_path: img.startsWith("http") ? img : `proyectos/${project.folder}/${img}`,
          image_type: idx === 0 ? "cover" : "secondary",
          sort_order: idx,
          alt_text: project.title,
          created_at: new Date().toISOString()
        }))
      })) as any as ProjectWithImages[];
    },
  });

export const useAllProjects = () => usePublishedProjects();

export const useProject = (slug: string) =>
  useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      const project = projectsData[slug as keyof typeof projectsData];
      if (!project) throw new Error("Project not found");
      
      return {
        id: slug,
        slug,
        title: project.title,
        published: true,
        subtitle_es: project.subtitleKey,
        subtitle_en: project.subtitleKey,
        subtitle_fr: project.subtitleKey,
        industry_es: project.industryKey,
        industry_en: project.industryKey,
        industry_fr: project.industryKey,
        role_es: project.roleKey,
        role_en: project.roleKey,
        role_fr: project.roleKey,
        description_es: project.descriptionKey,
        description_en: project.descriptionKey,
        description_fr: project.descriptionKey,
        sort_order: 0,
        project_images: project.images.map((img, idx) => ({
          id: `${slug}-${idx}`,
          project_id: slug,
          storage_path: img.startsWith("http") ? img : `proyectos/${project.folder}/${img}`,
          image_type: idx === 0 ? "cover" : "secondary",
          sort_order: idx,
          alt_text: project.title,
          created_at: new Date().toISOString()
        }))
      } as any as ProjectWithImages;
    },
    enabled: !!slug,
  });

export const useSaveProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (project: TablesInsert<"projects"> & { id?: string }) => {
      if (project.id) {
        const { id, ...updates } = project;
        const { data, error } = await supabase
          .from("projects")
          .update(updates as TablesUpdate<"projects">)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("projects")
          .insert(project)
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useDeleteProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUploadImage = () =>
  useMutation({
    mutationFn: async ({ file, path }: { file: File; path: string }) => {
      const { error } = await supabase.storage
        .from("project-images")
        .upload(path, file, { upsert: true });
      if (error) throw error;
      const { data: urlData } = supabase.storage
        .from("project-images")
        .getPublicUrl(path);
      return urlData.publicUrl;
    },
  });

export const useSaveProjectImage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (image: TablesInsert<"project_images">) => {
      const { data, error } = await supabase
        .from("project_images")
        .insert(image)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useDeleteProjectImage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("project_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const getImageUrl = (storagePath: string) => {
  if (storagePath.startsWith("http")) return storagePath;
  
  // Local project assets from the public folder
  if (storagePath.includes("proyectos/")) {
    const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
    const cleanPath = storagePath.startsWith("/") ? storagePath : `/${storagePath}`;
    return `${base}${cleanPath}`;
  }

  const { data } = supabase.storage.from("project-images").getPublicUrl(storagePath);
  return data.publicUrl;
};
