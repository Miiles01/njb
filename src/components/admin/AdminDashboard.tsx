import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAllProjects, useDeleteProject, getImageUrl } from "@/hooks/useProjects";
import type { ProjectWithImages } from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";
import { Plus, LogOut, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import AnalyticsSection from "@/components/admin/AnalyticsSection";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
};

const AdminDashboard = ({
  onEditProject,
  onNewProject,
}: {
  onEditProject: (project: ProjectWithImages) => void;
  onNewProject: () => void;
}) => {
  const { user, signOut } = useAuth();
  const { data: projects, isLoading } = useAllProjects();
  const deleteProject = useDeleteProject();
  const name = user?.user_metadata?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "User";

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <span className="text-sm font-medium tracking-tight">Panel</span>
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-xs gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" />
                Ver sitio
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-xs gap-1.5">
              <LogOut className="h-3.5 w-3.5" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-20">
        {/* Greeting */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-medium tracking-tighter leading-[1.1]">
            Hola, {name}
          </h1>
          <p className="text-4xl md:text-6xl font-heading font-light tracking-tighter leading-[1.1] text-muted-foreground">
            {getGreeting()}
          </p>
        </div>

        {/* Analytics */}
        <div className="mb-12">
          <AnalyticsSection />
        </div>

        {/* New project button */}
        <div className="mb-8">
          <Button
            onClick={onNewProject}
            className="rounded-full px-6 h-11 text-sm font-medium gap-2"
          >
            <Plus className="h-4 w-4" />
            Nuevo
          </Button>
        </div>

        {/* Projects grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : !projects?.length ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground mb-6 text-lg">No hay proyectos aún</p>
            <Button onClick={onNewProject} variant="outline" className="rounded-full px-6">
              <Plus className="h-4 w-4 mr-2" />
              Crear primer proyecto
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => {
              const cover = project.project_images?.find((i) => i.image_type === "cover");
              return (
                <button
                  key={project.id}
                  onClick={() => onEditProject(project)}
                  className="group relative text-left"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted transition-transform duration-300 group-hover:scale-[0.98]">
                    {cover ? (
                      <img
                        src={getImageUrl(cover.storage_path)}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-muted-foreground/40 text-sm">Sin imagen</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <h3 className="text-sm font-medium truncate">{project.title}</h3>
                    {!project.published && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                        Borrador
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
