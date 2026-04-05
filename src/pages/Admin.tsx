import { useState } from "react";
import type { ProjectWithImages } from "@/hooks/useProjects";
import AdminDashboard from "@/components/admin/AdminDashboard";
import BlockEditor from "@/components/admin/BlockEditor";

const Admin = () => {
  const [editingProject, setEditingProject] = useState<ProjectWithImages | "new" | null>(null);

  if (editingProject) {
    return (
      <BlockEditor
        project={editingProject === "new" ? undefined : editingProject}
        onClose={() => setEditingProject(null)}
      />
    );
  }

  return (
    <AdminDashboard
      onEditProject={(project) => setEditingProject(project)}
      onNewProject={() => setEditingProject("new")}
    />
  );
};

export default Admin;
