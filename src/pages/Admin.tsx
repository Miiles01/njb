import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAllProjects, useSaveProject, useDeleteProject, useUploadImage, useSaveProjectImage, useDeleteProjectImage, getImageUrl } from "@/hooks/useProjects";
import type { ProjectWithImages } from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, LogOut, Eye, EyeOff, GripVertical, ArrowLeft, Upload, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ImageUploader = ({
  label,
  currentUrl,
  onUpload,
  onRemove,
  aspect = "16/9",
}: {
  label: string;
  currentUrl?: string;
  onUpload: (file: File) => void;
  onRemove?: () => void;
  aspect?: string;
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-foreground">{label}</label>
    <div
      className={`relative border-2 border-dashed border-border rounded-xl overflow-hidden bg-muted/30`}
      style={{ aspectRatio: aspect }}
    >
      {currentUrl ? (
        <>
          <img src={currentUrl} alt="" className="w-full h-full object-cover" />
          {onRemove && (
            <button
              onClick={onRemove}
              className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 hover:opacity-80"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </>
      ) : (
        <label className="flex flex-col items-center justify-center h-full cursor-pointer hover:bg-muted/50 transition-colors">
          <Upload className="h-6 w-6 text-muted-foreground mb-2" />
          <span className="text-xs text-muted-foreground">Subir imagen</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onUpload(f);
            }}
          />
        </label>
      )}
    </div>
  </div>
);

const ProjectEditor = ({
  project,
  onClose,
}: {
  project?: ProjectWithImages;
  onClose: () => void;
}) => {
  const saveProject = useSaveProject();
  const uploadImage = useUploadImage();
  const saveProjectImage = useSaveProjectImage();
  const deleteProjectImage = useDeleteProjectImage();

  const [form, setForm] = useState({
    title: project?.title ?? "",
    slug: project?.slug ?? "",
    subtitle_es: project?.subtitle_es ?? "",
    subtitle_en: project?.subtitle_en ?? "",
    subtitle_fr: project?.subtitle_fr ?? "",
    industry_es: project?.industry_es ?? "",
    industry_en: project?.industry_en ?? "",
    industry_fr: project?.industry_fr ?? "",
    role_es: project?.role_es ?? "",
    role_en: project?.role_en ?? "",
    role_fr: project?.role_fr ?? "",
    description_es: project?.description_es ?? "",
    description_en: project?.description_en ?? "",
    description_fr: project?.description_fr ?? "",
    strategy_es: project?.strategy_es ?? "",
    strategy_en: project?.strategy_en ?? "",
    strategy_fr: project?.strategy_fr ?? "",
    published: project?.published ?? false,
    sort_order: project?.sort_order ?? 0,
  });

  const images = project?.project_images ?? [];
  const coverImage = images.find((i) => i.image_type === "cover");
  const secondaryImages = images.filter((i) => i.image_type === "secondary").sort((a, b) => a.sort_order - b.sort_order);
  const galleryImages = images.filter((i) => i.image_type === "gallery").sort((a, b) => a.sort_order - b.sort_order);

  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "detail">("preview");

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast.error("Título y slug son requeridos");
      return;
    }
    setSaving(true);
    try {
      await saveProject.mutateAsync({
        ...form,
        ...(project?.id ? { id: project.id } : {}),
      });
      toast.success("Proyecto guardado");
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Error al guardar");
    }
    setSaving(false);
  };

  const handleImageUpload = async (file: File, type: "cover" | "secondary" | "gallery", sortOrder = 0) => {
    if (!project?.id) {
      toast.error("Guarda el proyecto primero antes de subir imágenes");
      return;
    }
    try {
      const path = `${project.slug}/${type}-${sortOrder}-${Date.now()}.${file.name.split(".").pop()}`;
      const url = await uploadImage.mutateAsync({ file, path });
      await saveProjectImage.mutateAsync({
        project_id: project.id,
        image_type: type,
        storage_path: path,
        sort_order: sortOrder,
      });
      toast.success("Imagen subida");
    } catch (err: any) {
      toast.error(err.message || "Error al subir imagen");
    }
  };

  const handleRemoveImage = async (imageId: string) => {
    try {
      await deleteProjectImage.mutateAsync(imageId);
      toast.success("Imagen eliminada");
    } catch (err: any) {
      toast.error(err.message || "Error al eliminar");
    }
  };

  const updateField = (key: string, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const autoSlug = (title: string) =>
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onClose} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Volver</span>
        </button>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateField("published", !form.published)}
          >
            {form.published ? <Eye className="h-4 w-4 mr-1" /> : <EyeOff className="h-4 w-4 mr-1" />}
            {form.published ? "Publicado" : "Borrador"}
          </Button>
          <Button onClick={handleSave} disabled={saving} size="sm">
            {saving ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>

      {/* Title & Slug */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Título</label>
          <Input
            value={form.title}
            onChange={(e) => {
              updateField("title", e.target.value);
              if (!project?.id) updateField("slug", autoSlug(e.target.value));
            }}
            placeholder="Nombre del proyecto"
            className="h-12 text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Slug (URL)</label>
          <Input
            value={form.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            placeholder="nombre-del-proyecto"
            className="h-12 font-mono text-sm"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {(["preview", "detail"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "preview" ? "📸 Preview (Trabajo)" : "📄 Detalle (Proyecto)"}
          </button>
        ))}
      </div>

      {activeTab === "preview" && (
        <div className="space-y-8">
          <p className="text-sm text-muted-foreground">
            Estas imágenes y textos aparecen en la página de <strong>Trabajo</strong> como vista previa del proyecto.
          </p>

          {/* Cover Image */}
          <ImageUploader
            label="Imagen principal (16:9)"
            currentUrl={coverImage ? getImageUrl(coverImage.storage_path) : undefined}
            onUpload={(f) => handleImageUpload(f, "cover", 0)}
            onRemove={coverImage ? () => handleRemoveImage(coverImage.id) : undefined}
            aspect="16/9"
          />

          {/* Secondary Images */}
          <div className="grid grid-cols-2 gap-4">
            {[0, 1].map((idx) => {
              const img = secondaryImages[idx];
              return (
                <ImageUploader
                  key={idx}
                  label={`Imagen secundaria ${idx + 1} (4:5)`}
                  currentUrl={img ? getImageUrl(img.storage_path) : undefined}
                  onUpload={(f) => handleImageUpload(f, "secondary", idx)}
                  onRemove={img ? () => handleRemoveImage(img.id) : undefined}
                  aspect="4/5"
                />
              );
            })}
          </div>

          {/* Subtitle */}
          <div className="space-y-4">
            <h3 className="font-medium">Subtítulo</h3>
            <div className="grid grid-cols-3 gap-4">
              {(["es", "en", "fr"] as const).map((lang) => (
                <div key={lang} className="space-y-1">
                  <label className="text-xs text-muted-foreground uppercase">{lang}</label>
                  <Input
                    value={(form as any)[`subtitle_${lang}`]}
                    onChange={(e) => updateField(`subtitle_${lang}`, e.target.value)}
                    placeholder={`Subtítulo (${lang})`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "detail" && (
        <div className="space-y-8">
          <p className="text-sm text-muted-foreground">
            Este contenido aparece cuando el usuario hace clic en el proyecto.
          </p>

          {/* Industry */}
          <div className="space-y-4">
            <h3 className="font-medium">Industria</h3>
            <div className="grid grid-cols-3 gap-4">
              {(["es", "en", "fr"] as const).map((lang) => (
                <div key={lang} className="space-y-1">
                  <label className="text-xs text-muted-foreground uppercase">{lang}</label>
                  <Input
                    value={(form as any)[`industry_${lang}`]}
                    onChange={(e) => updateField(`industry_${lang}`, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Role */}
          <div className="space-y-4">
            <h3 className="font-medium">Qué hicimos</h3>
            <div className="grid grid-cols-3 gap-4">
              {(["es", "en", "fr"] as const).map((lang) => (
                <div key={lang} className="space-y-1">
                  <label className="text-xs text-muted-foreground uppercase">{lang}</label>
                  <Input
                    value={(form as any)[`role_${lang}`]}
                    onChange={(e) => updateField(`role_${lang}`, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="font-medium">Descripción</h3>
            <div className="grid grid-cols-3 gap-4">
              {(["es", "en", "fr"] as const).map((lang) => (
                <div key={lang} className="space-y-1">
                  <label className="text-xs text-muted-foreground uppercase">{lang}</label>
                  <Textarea
                    value={(form as any)[`description_${lang}`]}
                    onChange={(e) => updateField(`description_${lang}`, e.target.value)}
                    rows={4}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Strategy */}
          <div className="space-y-4">
            <h3 className="font-medium">Planificación Funcional (opcional)</h3>
            <div className="grid grid-cols-3 gap-4">
              {(["es", "en", "fr"] as const).map((lang) => (
                <div key={lang} className="space-y-1">
                  <label className="text-xs text-muted-foreground uppercase">{lang}</label>
                  <Textarea
                    value={(form as any)[`strategy_${lang}`] ?? ""}
                    onChange={(e) => updateField(`strategy_${lang}`, e.target.value)}
                    rows={4}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Images */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Galería de imágenes</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {galleryImages.map((img, idx) => (
                <ImageUploader
                  key={img.id}
                  label={`Imagen ${idx + 1}`}
                  currentUrl={getImageUrl(img.storage_path)}
                  onUpload={() => {}}
                  onRemove={() => handleRemoveImage(img.id)}
                  aspect="4/3"
                />
              ))}
              <ImageUploader
                label="Agregar imagen"
                onUpload={(f) => handleImageUpload(f, "gallery", galleryImages.length)}
                aspect="4/3"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Admin = () => {
  const { user, signOut } = useAuth();
  const { data: projects, isLoading } = useAllProjects();
  const deleteProject = useDeleteProject();
  const [editingProject, setEditingProject] = useState<ProjectWithImages | "new" | null>(null);

  if (editingProject) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <ProjectEditor
            project={editingProject === "new" ? undefined : editingProject}
            onClose={() => setEditingProject(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-heading font-medium tracking-tighter">
              Bienvenido 👋
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {user?.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm">
                Ver sitio
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-1" />
              Salir
            </Button>
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-medium tracking-tight">
              Proyectos
            </h2>
            <Button onClick={() => setEditingProject("new")} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Nuevo proyecto
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Cargando...</div>
          ) : !projects?.length ? (
            <div className="text-center py-12 border border-dashed border-border rounded-2xl">
              <p className="text-muted-foreground mb-4">No hay proyectos aún</p>
              <Button onClick={() => setEditingProject("new")} variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Crear primer proyecto
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((project) => {
                const cover = project.project_images?.find((i) => i.image_type === "cover");
                return (
                  <div
                    key={project.id}
                    className="flex items-center gap-4 p-4 border border-border rounded-xl hover:bg-muted/30 transition-colors group"
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground/40" />
                    <div className="h-14 w-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {cover && (
                        <img
                          src={getImageUrl(cover.storage_path)}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium truncate">{project.title}</h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            project.published
                              ? "bg-green-100 text-green-700"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {project.published ? "Publicado" : "Borrador"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        /{project.slug} · {project.project_images?.length ?? 0} imágenes
                      </p>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingProject(project)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          if (confirm("¿Eliminar este proyecto?")) {
                            deleteProject.mutate(project.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
