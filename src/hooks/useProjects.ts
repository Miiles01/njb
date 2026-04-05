import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type Project = Tables<"projects">;
export type ProjectImage = Tables<"project_images">;
export type ProjectWithImages = Project & { project_images: ProjectImage[] };

export const usePublishedProjects = () =>
  useQuery({
    queryKey: ["projects", "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*, project_images(*)")
        .eq("published", true)
        .order("sort_order");
      if (error) throw error;
      return data as ProjectWithImages[];
    },
  });

export const useAllProjects = () =>
  useQuery({
    queryKey: ["projects", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*, project_images(*)")
        .order("sort_order");
      if (error) throw error;
      return data as ProjectWithImages[];
    },
  });

export const useProject = (slug: string) =>
  useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*, project_images(*)")
        .eq("slug", slug)
        .single();
      if (error) throw error;
      return data as ProjectWithImages;
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
  const { data } = supabase.storage.from("project-images").getPublicUrl(storagePath);
  return data.publicUrl;
};
