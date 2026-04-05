import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  GripVertical,
  Image as ImageIcon,
  Type,
  MousePointerClick,
  Columns2,
  Upload,
  X,
  ChevronUp,
  ChevronDown,
  Settings2,
  Camera,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { useSaveProject, useUploadImage, useSaveProjectImage, useDeleteProjectImage, getImageUrl } from "@/hooks/useProjects";
import type { ProjectWithImages, ProjectImage } from "@/hooks/useProjects";

/* ── Block Types ── */
export type BlockType = "full-image" | "two-images" | "text" | "button";

export interface ContentBlock {
  id: string;
  type: BlockType;
  // full-image
  imagePath?: string;
  imageAlt?: string;
  // two-images
  leftImagePath?: string;
  leftImageAlt?: string;
  rightImagePath?: string;
  rightImageAlt?: string;
  // text
  heading?: string;
  body?: string;
  // button
  buttonText?: string;
  buttonUrl?: string;
}

const genId = () => Math.random().toString(36).slice(2, 10);

const BLOCK_OPTIONS: { type: BlockType; icon: React.ReactNode; label: string }[] = [
  { type: "full-image", icon: <ImageIcon className="h-5 w-5" />, label: "Imagen completa" },
  { type: "two-images", icon: <Columns2 className="h-5 w-5" />, label: "Dos imágenes" },
  { type: "text", icon: <Type className="h-5 w-5" />, label: "Texto" },
  { type: "button", icon: <MousePointerClick className="h-5 w-5" />, label: "Botón" },
];

/* ── Image Drop Zone ── */
const ImageDropZone = ({
  currentUrl,
  onUpload,
  onRemove,
  aspect = "16/9",
  className = "",
}: {
  currentUrl?: string;
  onUpload: (file: File) => void;
  onRemove?: () => void;
  aspect?: string;
  className?: string;
}) => (
  <div
    className={`relative border-2 border-dashed border-border/60 rounded-xl overflow-hidden bg-muted/20 hover:bg-muted/40 transition-colors ${className}`}
    style={{ aspectRatio: aspect }}
  >
    {currentUrl ? (
      <>
        <img src={currentUrl} alt="" className="w-full h-full object-cover" />
        {onRemove && (
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="absolute top-2 right-2 bg-background/90 backdrop-blur rounded-full p-1.5 hover:bg-destructive hover:text-destructive-foreground transition-colors shadow-sm"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </>
    ) : (
      <label className="flex flex-col items-center justify-center h-full cursor-pointer gap-2">
        <Upload className="h-5 w-5 text-muted-foreground/60" />
        <span className="text-xs text-muted-foreground/60">Subir imagen</span>
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
);

/* ── Single Block Renderer ── */
const BlockCard = ({
  block,
  onUpdate,
  onRemove,
  onMove,
  onImageUpload,
  isFirst,
  isLast,
}: {
  block: ContentBlock;
  onUpdate: (updates: Partial<ContentBlock>) => void;
  onRemove: () => void;
  onMove: (dir: "up" | "down") => void;
  onImageUpload: (file: File, field: string) => void;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const blockLabel = BLOCK_OPTIONS.find((b) => b.type === block.type)?.label ?? block.type;

  return (
    <div className="group relative bg-background border border-border/60 rounded-2xl overflow-hidden hover:border-border transition-colors">
      {/* Block toolbar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-muted/20">
        <GripVertical className="h-4 w-4 text-muted-foreground/40 cursor-grab" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex-1">
          {blockLabel}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onMove("up")}
            disabled={isFirst}
            className="p-1 rounded hover:bg-muted disabled:opacity-20 transition-colors"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onMove("down")}
            disabled={isLast}
            className="p-1 rounded hover:bg-muted disabled:opacity-20 transition-colors"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onRemove}
            className="p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-colors ml-1"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Block content */}
      <div className="p-4">
        {block.type === "full-image" && (
          <ImageDropZone
            currentUrl={block.imagePath ? getImageUrl(block.imagePath) : undefined}
            onUpload={(f) => onImageUpload(f, "imagePath")}
            onRemove={block.imagePath ? () => onUpdate({ imagePath: undefined }) : undefined}
            aspect="16/9"
          />
        )}

        {block.type === "two-images" && (
          <div className="grid grid-cols-2 gap-3">
            <ImageDropZone
              currentUrl={block.leftImagePath ? getImageUrl(block.leftImagePath) : undefined}
              onUpload={(f) => onImageUpload(f, "leftImagePath")}
              onRemove={block.leftImagePath ? () => onUpdate({ leftImagePath: undefined }) : undefined}
              aspect="4/5"
            />
            <ImageDropZone
              currentUrl={block.rightImagePath ? getImageUrl(block.rightImagePath) : undefined}
              onUpload={(f) => onImageUpload(f, "rightImagePath")}
              onRemove={block.rightImagePath ? () => onUpdate({ rightImagePath: undefined }) : undefined}
              aspect="4/5"
            />
          </div>
        )}

        {block.type === "text" && (
          <div className="space-y-3">
            <Input
              value={block.heading ?? ""}
              onChange={(e) => onUpdate({ heading: e.target.value })}
              placeholder="Título (opcional)"
              className="border-0 bg-transparent text-lg font-medium px-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/40"
            />
            <Textarea
              value={block.body ?? ""}
              onChange={(e) => onUpdate({ body: e.target.value })}
              placeholder="Escribe aquí..."
              rows={4}
              className="border-0 bg-transparent resize-none px-0 focus-visible:ring-0 placeholder:text-muted-foreground/40"
            />
          </div>
        )}

        {block.type === "button" && (
          <div className="flex items-center gap-3">
            <Input
              value={block.buttonText ?? ""}
              onChange={(e) => onUpdate({ buttonText: e.target.value })}
              placeholder="Texto del botón"
              className="flex-1"
            />
            <Input
              value={block.buttonUrl ?? ""}
              onChange={(e) => onUpdate({ buttonUrl: e.target.value })}
              placeholder="https://..."
              className="flex-1"
            />
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Add Block Bar ── */
const AddBlockBar = ({ onAdd }: { onAdd: (type: BlockType) => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex justify-center py-2">
      {open ? (
        <div className="flex items-center gap-2 bg-muted/60 backdrop-blur rounded-full px-2 py-1.5 shadow-sm border border-border/40 animate-in fade-in-0 zoom-in-95">
          {BLOCK_OPTIONS.map((opt) => (
            <button
              key={opt.type}
              onClick={() => {
                onAdd(opt.type);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-background transition-colors text-sm"
            >
              {opt.icon}
              <span className="text-xs font-medium">{opt.label}</span>
            </button>
          ))}
          <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-background">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-dashed border-border/50 text-muted-foreground hover:border-border hover:text-foreground transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span className="text-xs font-medium">Agregar bloque</span>
        </button>
      )}
    </div>
  );
};

/* ── Main Editor ── */
const BlockEditor = ({
  project,
  onClose,
}: {
  project?: ProjectWithImages;
  onClose: () => void;
}) => {
  const saveProjectImage = useSaveProjectImage();
  const deleteProjectImage = useDeleteProjectImage();

  // Separate cover and detail images from project_images
  const existingCover = project?.project_images?.find((i) => i.image_type === "cover");
  const existingDetailImages = project?.project_images
    ?.filter((i) => i.image_type === "gallery")
    .sort((a, b) => a.sort_order - b.sort_order) ?? [];

  // Preview images: 1 cover (big) + 2 small previews
  const existingPreviewSmall = project?.project_images
    ?.filter((i) => i.image_type === "preview_small")
    .sort((a, b) => a.sort_order - b.sort_order) ?? [];

  const [coverPath, setCoverPath] = useState<string | undefined>(existingCover?.storage_path);
  const [previewSmall1, setPreviewSmall1] = useState<{ id?: string; path?: string }>( 
    existingPreviewSmall[0] ? { id: existingPreviewSmall[0].id, path: existingPreviewSmall[0].storage_path } : {}
  );
  const [previewSmall2, setPreviewSmall2] = useState<{ id?: string; path?: string }>(
    existingPreviewSmall[1] ? { id: existingPreviewSmall[1].id, path: existingPreviewSmall[1].storage_path } : {}
  );
  const [detailImages, setDetailImages] = useState<{ id?: string; path: string; alt?: string }[]>(
    existingDetailImages.map((img) => ({ id: img.id, path: img.storage_path, alt: img.alt_text ?? "" }))
  );

  const saveProject = useSaveProject();
  const uploadImage = useUploadImage();

  const [form, setForm] = useState({
    title: project?.title ?? "",
    slug: project?.slug ?? "",
    subtitle_en: project?.subtitle_en ?? "",
    industry_en: project?.industry_en ?? "",
    role_en: project?.role_en ?? "",
    description_en: project?.description_en ?? "",
    strategy_en: project?.strategy_en ?? "",
    published: project?.published ?? false,
    sort_order: project?.sort_order ?? 0,
  });

  // Parse existing blocks or initialize defaults from project data
  const parseInitialBlocks = (): ContentBlock[] => {
    const raw = (project as any)?.content_blocks;
    if (raw && Array.isArray(raw) && raw.length > 0) return raw as ContentBlock[];

    // If no blocks exist, create default blocks from existing project data
    if (!project) return [];

    const blocks: ContentBlock[] = [];
    const coverImg = project.project_images?.find((i) => i.image_type === "cover");
    if (coverImg) {
      blocks.push({ id: genId(), type: "full-image", imagePath: coverImg.storage_path });
    }

    if (project.description_en) {
      blocks.push({ id: genId(), type: "text", heading: "Description", body: project.description_en });
    }

    const gallery = project.project_images
      ?.filter((i) => i.image_type === "gallery")
      .sort((a, b) => a.sort_order - b.sort_order) ?? [];
    gallery.forEach((img) => {
      blocks.push({ id: genId(), type: "full-image", imagePath: img.storage_path });
    });

    if (project.strategy_en) {
      blocks.push({ id: genId(), type: "text", heading: "Strategy", body: project.strategy_en });
    }

    return blocks;
  };

  const [blocks, setBlocks] = useState<ContentBlock[]>(parseInitialBlocks);
  const [saving, setSaving] = useState(false);

  const updateField = (key: string, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const autoSlug = (title: string) =>
    title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const addBlock = (type: BlockType) => {
    setBlocks((prev) => [...prev, { id: genId(), type }]);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const removeBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const moveBlock = (id: string, dir: "up" | "down") => {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      if (idx < 0) return prev;
      const target = dir === "up" ? idx - 1 : idx + 1;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const handleImageUpload = async (file: File, blockId: string, field: string) => {
    const slug = form.slug || "draft";
    const path = `${slug}/block-${blockId}-${Date.now()}.${file.name.split(".").pop()}`;
    try {
      await uploadImage.mutateAsync({ file, path });
      updateBlock(blockId, { [field]: path });
      toast.success("Imagen subida");
    } catch (err: any) {
      toast.error(err.message || "Error al subir imagen");
    }
  };

  const handleCoverUpload = async (file: File) => {
    const slug = form.slug || "draft";
    const path = `${slug}/cover-${Date.now()}.${file.name.split(".").pop()}`;
    try {
      await uploadImage.mutateAsync({ file, path });
      setCoverPath(path);
      toast.success("Imagen de preview subida");
    } catch (err: any) {
      toast.error(err.message || "Error al subir imagen");
    }
  };

  const handlePreviewSmallUpload = async (file: File, slot: 1 | 2) => {
    const slug = form.slug || "draft";
    const path = `${slug}/preview-small-${slot}-${Date.now()}.${file.name.split(".").pop()}`;
    try {
      await uploadImage.mutateAsync({ file, path });
      if (slot === 1) setPreviewSmall1({ path });
      else setPreviewSmall2({ path });
      toast.success("Imagen subida");
    } catch (err: any) {
      toast.error(err.message || "Error al subir imagen");
    }
  };

  const handleDetailImageUpload = async (file: File) => {
    const slug = form.slug || "draft";
    const path = `${slug}/detail-${Date.now()}.${file.name.split(".").pop()}`;
    try {
      await uploadImage.mutateAsync({ file, path });
      setDetailImages((prev) => [...prev, { path, alt: "" }]);
      toast.success("Imagen de detalle subida");
    } catch (err: any) {
      toast.error(err.message || "Error al subir imagen");
    }
  };

  const removeDetailImage = async (index: number) => {
    const img = detailImages[index];
    if (img.id) {
      try {
        await deleteProjectImage.mutateAsync(img.id);
      } catch {}
    }
    setDetailImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast.error("Título y slug son requeridos");
      return;
    }
    setSaving(true);
    try {
      const firstTextBlock = blocks.find((b) => b.type === "text");
      const desc = firstTextBlock?.body ?? form.description_en;

      const savedProject = await saveProject.mutateAsync({
        ...form,
        subtitle_es: form.subtitle_en,
        subtitle_fr: form.subtitle_en,
        industry_es: form.industry_en,
        industry_fr: form.industry_en,
        role_es: form.role_en,
        role_fr: form.role_en,
        description_en: desc,
        description_es: desc,
        description_fr: desc,
        strategy_en: form.strategy_en,
        strategy_es: form.strategy_en,
        strategy_fr: form.strategy_en,
        content_blocks: blocks as any,
        ...(project?.id ? { id: project.id } : {}),
      } as any);

      const projectId = savedProject.id;

      // Save cover image if changed
      if (coverPath && coverPath !== existingCover?.storage_path) {
        if (existingCover?.id) {
          await deleteProjectImage.mutateAsync(existingCover.id);
        }
        await saveProjectImage.mutateAsync({
          project_id: projectId,
          storage_path: coverPath,
          image_type: "cover",
          sort_order: 0,
        });
      } else if (!coverPath && existingCover?.id) {
        await deleteProjectImage.mutateAsync(existingCover.id);
      }

      // Save preview small images
      const savePreviewSmall = async (slot: { id?: string; path?: string }, existing: ProjectImage | undefined, sortOrder: number) => {
        if (slot.path && slot.path !== existing?.storage_path) {
          if (existing?.id) await deleteProjectImage.mutateAsync(existing.id);
          await saveProjectImage.mutateAsync({
            project_id: projectId,
            storage_path: slot.path,
            image_type: "preview_small",
            sort_order: sortOrder,
          });
        } else if (!slot.path && existing?.id) {
          await deleteProjectImage.mutateAsync(existing.id);
        }
      };
      await savePreviewSmall(previewSmall1, existingPreviewSmall[0], 1);
      await savePreviewSmall(previewSmall2, existingPreviewSmall[1], 2);

      // Save detail images — remove old ones not present, add new ones
      const oldDetailIds = existingDetailImages.map((i) => i.id);
      const currentIds = detailImages.filter((i) => i.id).map((i) => i.id!);
      for (const oldId of oldDetailIds) {
        if (!currentIds.includes(oldId)) {
          await deleteProjectImage.mutateAsync(oldId);
        }
      }
      for (let i = 0; i < detailImages.length; i++) {
        const img = detailImages[i];
        if (!img.id) {
          await saveProjectImage.mutateAsync({
            project_id: projectId,
            storage_path: img.path,
            image_type: "gallery",
            sort_order: i + 1,
            alt_text: img.alt || "",
          });
        }
      }

      toast.success("Proyecto guardado");
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Error al guardar");
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={onClose} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Proyectos</span>
          </button>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateField("published", !form.published)}
              className="text-xs gap-1.5"
            >
              {form.published ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              {form.published ? "Publicado" : "Borrador"}
            </Button>
            <Button onClick={handleSave} disabled={saving} size="sm" className="rounded-full px-5">
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Project Meta */}
        <div className="mb-10 space-y-6">
          <div className="space-y-2">
            <Input
              value={form.title}
              onChange={(e) => {
                updateField("title", e.target.value);
                if (!project?.id) updateField("slug", autoSlug(e.target.value));
              }}
              placeholder="Nombre del proyecto"
              className="border-0 bg-transparent text-3xl md:text-4xl font-heading font-medium tracking-tighter px-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/30"
            />
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs">/</span>
              <Input
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                placeholder="slug"
                className="border-0 bg-transparent text-xs font-mono px-0 h-auto focus-visible:ring-0 w-48 placeholder:text-muted-foreground/30"
              />
            </div>
          </div>

          {/* Collapsible meta fields */}
          <details className="group">
            <summary className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Settings2 className="h-3.5 w-3.5" />
              <span>Metadatos del proyecto</span>
            </summary>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Subtítulo</label>
                <Input
                  value={form.subtitle_en}
                  onChange={(e) => updateField("subtitle_en", e.target.value)}
                  placeholder="Project subtitle"
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Industria</label>
                <Input
                  value={form.industry_en}
                  onChange={(e) => updateField("industry_en", e.target.value)}
                  placeholder="Industry"
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">What we did</label>
                <Input
                  value={form.role_en}
                  onChange={(e) => updateField("role_en", e.target.value)}
                  placeholder="Role"
                  className="h-9 text-sm"
                />
              </div>
            </div>
          </details>
        </div>

        {/* ═══ SECCIÓN 1: PREVIEW (1 grande + 2 pequeñas) ═══ */}
        <div className="mb-10 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Camera className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Imágenes de Preview</h3>
            <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Portada del proyecto</span>
          </div>
          <p className="text-xs text-muted-foreground">Se muestran en la grilla de proyectos: 1 imagen principal grande y 2 imágenes pequeñas.</p>

          {/* Big cover */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Principal (grande)</label>
            <ImageDropZone
              currentUrl={coverPath ? getImageUrl(coverPath) : undefined}
              onUpload={handleCoverUpload}
              onRemove={coverPath ? () => setCoverPath(undefined) : undefined}
              aspect="16/9"
            />
          </div>

          {/* Two small */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Pequeña 1</label>
              <ImageDropZone
                currentUrl={previewSmall1.path ? getImageUrl(previewSmall1.path) : undefined}
                onUpload={(f) => handlePreviewSmallUpload(f, 1)}
                onRemove={previewSmall1.path ? () => setPreviewSmall1({}) : undefined}
                aspect="4/3"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Pequeña 2</label>
              <ImageDropZone
                currentUrl={previewSmall2.path ? getImageUrl(previewSmall2.path) : undefined}
                onUpload={(f) => handlePreviewSmallUpload(f, 2)}
                onRemove={previewSmall2.path ? () => setPreviewSmall2({}) : undefined}
                aspect="4/3"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 mb-10" />

        {/* ═══ SECCIÓN 2: DETALLE (galería) ═══ */}
        <div className="mb-10 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Imágenes de Detalle</h3>
            <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{detailImages.length} imágenes</span>
          </div>
          <p className="text-xs text-muted-foreground">Se muestran en la página individual del proyecto.</p>

          {detailImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {detailImages.map((img, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted/20 border border-border/40 group">
                  <img src={getImageUrl(img.path)} alt={img.alt || ""} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeDetailImage(idx)}
                    className="absolute top-2 right-2 bg-background/90 backdrop-blur rounded-full p-1.5 hover:bg-destructive hover:text-destructive-foreground transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur rounded-full px-2 py-0.5">
                    <span className="text-[10px] font-medium text-muted-foreground">{idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <label className="flex items-center justify-center gap-2 py-6 border-2 border-dashed border-border/50 rounded-xl cursor-pointer hover:border-border hover:bg-muted/20 transition-colors">
            <Upload className="h-4 w-4 text-muted-foreground/60" />
            <span className="text-xs text-muted-foreground/60">Agregar imagen de detalle</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleDetailImageUpload(f);
              }}
            />
          </label>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 mb-8" />

        {/* Blocks */}
        <div className="space-y-4">
          {blocks.map((block, idx) => (
            <div key={block.id}>
              <BlockCard
                block={block}
                onUpdate={(updates) => updateBlock(block.id, updates)}
                onRemove={() => removeBlock(block.id)}
                onMove={(dir) => moveBlock(block.id, dir)}
                onImageUpload={(file, field) => handleImageUpload(file, block.id, field)}
                isFirst={idx === 0}
                isLast={idx === blocks.length - 1}
              />
            </div>
          ))}
          <AddBlockBar onAdd={addBlock} />
        </div>
      </div>
    </div>
  );
};

export default BlockEditor;
