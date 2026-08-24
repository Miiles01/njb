import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Plus, CheckSquare, User, Flag, Folder, Users, GripVertical, Image as ImageIcon, Link as LinkIcon, ExternalLink, X, Trash2, Book, Globe, Smartphone, Video, Search, Hash, Megaphone, Palette, Code, PenTool, Layout, Type, ArrowLeft } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Book, Globe, Smartphone, Video, Search, Folder, Hash, Megaphone, Palette, Code, PenTool, Layout, Type
};

type ProjectTag = { id: string; name: string; icon: string; color?: string; };
const defaultProjects: ProjectTag[] = [
  { id: '1', name: 'Manual de identidad', icon: 'Book' },
  { id: '2', name: 'Página web', icon: 'Globe' },
  { id: '3', name: 'Contenido para redes sociales', icon: 'Smartphone' },
  { id: '4', name: 'Edición de video', icon: 'Video' },
  { id: '5', name: 'Investigación', icon: 'Search' }
];
import { toast } from "sonner";

type Status = "Nuevas" | "Activas" | "Finalizadas";
type Priority = "Alta" | "Media" | "Baja";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskLink {
  id: string;
  url: string;
  label: string;
}

interface TaskImage {
  id: string;
  url: string;
}

interface TeamMember {
  id: string;
  name: string;
  avatarUrl: string;
}

interface Task {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  assigneeId?: string | null;
  assigneeIds?: string[];
  priority: Priority;
  project: string;
  status: Status;
  checklists: ChecklistItem[];
  links: TaskLink[];
  images: TaskImage[];
  order: number;
}

const PASSWORD = "NBJWORK565712";

const defaultTeam: TeamMember[] = [
  { id: "m1", name: "Michael", avatarUrl: "" },
  { id: "m2", name: "Arturo", avatarUrl: "" },
  { id: "m3", name: "Manuel", avatarUrl: "/avatars/manuel.jpg" },
];

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Diseño de Homepage",
    subtitle: "Revisión UX/UI",
    description: "Crear wireframes para la nueva página de inicio considerando la experiencia de usuario.",
    assigneeIds: ["m1"],
    priority: "Alta",
    project: "NJB Redesign",
    status: "Activas",
    order: 0,
    checklists: [
      { id: "c1", text: "Wireframe mobile", completed: true },
      { id: "c2", text: "Wireframe desktop", completed: false }
    ],
    links: [],
    images: []
  },
  {
    id: "2",
    title: "Revisión de Textos",
    description: "Corregir ortografía y gramática en la sección Nosotros.",
    assigneeIds: ["m2"],
    priority: "Media",
    project: "Copywriting",
    status: "Nuevas",
    order: 0,
    checklists: [],
    links: [],
    images: []
  }
];

export default function Work() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  
  // Drag and drop state
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dropIndicator, setDropIndicator] = useState<{status: Status, index: number} | null>(null);

  // Modals state
    const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Forms state
    const [newUserName, setNewUserName] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(500);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [addingBlock, setAddingBlock] = useState<'checklist' | 'link' | 'image' | null>(null);
  const [projects, setProjects] = useState<ProjectTag[]>(() => {
    const saved = localStorage.getItem("njb_work_projects");
    return saved ? JSON.parse(saved) : defaultProjects;
  });
  const saveProjects = (newProjects: ProjectTag[]) => {
    setProjects(newProjects);
    localStorage.setItem("njb_work_projects", JSON.stringify(newProjects));
  };
  
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const [tagIsCreating, setTagIsCreating] = useState(false);
  const [tagSelectedIcon, setTagSelectedIcon] = useState('Folder');

  useEffect(() => {
    const auth = localStorage.getItem("njb_work_auth");
    if (auth === "true") setIsAuthenticated(true);
    
    const savedTasks = localStorage.getItem("njb_work_tasks");
    setTasks(savedTasks ? JSON.parse(savedTasks) : initialTasks);

    const savedTeam = localStorage.getItem("njb_work_team");
    if (savedTeam) {
        const parsed = JSON.parse(savedTeam);
        const updated = parsed.map((m: TeamMember) => m.name === 'Manuel' && !m.avatarUrl ? { ...m, avatarUrl: '/avatars/manuel.jpg' } : m);
        setTeam(updated);
        localStorage.setItem("njb_work_team", JSON.stringify(updated));
    } else {
        setTeam(defaultTeam);
    }
  }, []);

  useEffect(() => {
    if (!selectedTask) return;
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (!file) continue;
          
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const MAX_WIDTH = 1200;
              const MAX_HEIGHT = 1200;
              let width = img.width;
              let height = img.height;

              if (width > height) {
                if (width > MAX_WIDTH) {
                  height *= MAX_WIDTH / width;
                  width = MAX_WIDTH;
                }
              } else {
                if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height;
                  height = MAX_HEIGHT;
                }
              }
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              ctx?.drawImage(img, 0, 0, width, height);
              const base64 = canvas.toDataURL('image/jpeg', 0.8);
              
              setSelectedTask(prev => {
                if (!prev) return prev;
                const newImages = [...(prev.images || []), { id: Date.now().toString(), url: base64 }];
                const updatedTask = { ...prev, images: newImages };
                
                setTasks(currentTasks => {
                  const newTasks = currentTasks.map(t => t.id === updatedTask.id ? updatedTask : t);
                  localStorage.setItem("njb_work_tasks", JSON.stringify(newTasks));
                  return newTasks;
                });
                
                return updatedTask;
              });
              toast.success("Imagen pegada exitosamente");
            };
            img.src = event.target?.result as string;
          };
          reader.readAsDataURL(file);
          break;
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [selectedTask]);

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem("njb_work_tasks", JSON.stringify(newTasks));
  };

  const saveTeam = (newTeam: TeamMember[]) => {
    setTeam(newTeam);
    localStorage.setItem("njb_work_team", JSON.stringify(newTeam));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("njb_work_auth", "true");
      toast.success("Acceso concedido");
    } else {
      toast.error("Contraseña incorrecta");
    }
  };

  // Drag and Drop
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedTaskId(id);
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => {
      const el = document.getElementById(`task-${id}`);
      if (el) el.style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent, id: string) => {
    const el = document.getElementById(`task-${id}`);
    if (el) el.style.opacity = '1';
    setDraggedTaskId(null);
    setDropIndicator(null);
  };

  const handleDragOverCard = (e: React.DragEvent, status: Status, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const isBottom = e.clientY > rect.top + rect.height / 2;
    setDropIndicator({ status, index: isBottom ? index + 1 : index });
  };

  const handleDragOverColumn = (e: React.DragEvent, status: Status) => {
    e.preventDefault();
    const columnTasks = getSortedTasksByStatus(status);
    if (columnTasks.length === 0) {
      setDropIndicator({ status, index: 0 });
    }
  };

  const handleDrop = (e: React.DragEvent, status: Status) => {
    e.preventDefault();
    if (!draggedTaskId) return;

    let targetIndex = dropIndicator ? dropIndicator.index : 0;
    
    let newTasks = [...tasks];
    const draggedIndex = newTasks.findIndex(t => t.id === draggedTaskId);
    if (draggedIndex === -1) return;
    
    const taskToMove = { ...newTasks[draggedIndex], status };
    
    newTasks.splice(draggedIndex, 1);
    
    const targetColumnTasks = newTasks
      .filter(t => t.status === status)
      .sort((a, b) => a.order - b.order);

    if (dropIndicator && tasks[draggedIndex].status === status && dropIndicator.index > targetColumnTasks.length) {
       targetIndex = targetColumnTasks.length;
    }

    targetColumnTasks.splice(targetIndex, 0, taskToMove);

    targetColumnTasks.forEach((t, i) => {
      t.order = i;
      const globalIndex = newTasks.findIndex(nt => nt.id === t.id);
      if(globalIndex !== -1) newTasks[globalIndex] = t;
    });

    if (!newTasks.find(t => t.id === taskToMove.id)) {
        newTasks.push(taskToMove);
    }
    
    columns.forEach(col => {
        const colTasks = newTasks.filter(t => t.status === col).sort((a, b) => a.order - b.order);
        colTasks.forEach((t, i) => {
            const idx = newTasks.findIndex(nt => nt.id === t.id);
            if(idx !== -1) newTasks[idx].order = i;
        });
    });

    saveTasks(newTasks);
    setDraggedTaskId(null);
    setDropIndicator(null);
  };

  // Tasks Management
  const handleCreateTask = (defaultStatus: Status = "Nuevas") => {
    const columnTasks = tasks.filter(t => t.status === defaultStatus);
    const emptyTask: Task = {
      id: Date.now().toString(),
      title: "",
      subtitle: "",
      description: "",
      assigneeIds: [],
      priority: "Baja",
      project: "",
      status: defaultStatus,
      checklists: [],
      links: [],
      images: [],
      order: columnTasks.length
    };
    saveTasks([...tasks, emptyTask]);
    setSelectedTask(emptyTask);
  };

  const handleUpdateSelectedTask = (updates: Partial<Task>) => {
    if (!selectedTask) return;
    const updatedTask = { ...selectedTask, ...updates };
    setSelectedTask(updatedTask);
    saveTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const toggleChecklist = (taskId: string, checklistId: string) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          checklists: t.checklists.map(c => c.id === checklistId ? { ...c, completed: !c.completed } : c)
        };
      }
      return t;
    });
    saveTasks(updated);
    if (selectedTask?.id === taskId) {
      setSelectedTask(updated.find(t => t.id === taskId) || null);
    }
  };

  const removeLink = (linkId: string) => {
    if (!selectedTask) return;
    handleUpdateSelectedTask({ links: selectedTask.links?.filter(l => l.id !== linkId) || [] });
  };

  const removeImage = (imgId: string) => {
    if (!selectedTask) return;
    handleUpdateSelectedTask({ images: selectedTask.images?.filter(i => i.id !== imgId) || [] });
  };

  // User Management
  const handleAddUser = () => {
    if (!newUserName) return;
    const newUser: TeamMember = { id: `m${Date.now()}`, name: newUserName, avatarUrl: "" };
    saveTeam([...team, newUser]);
    setNewUserName("");
    toast.success("Usuario añadido");
  };

  const handleUpdateAvatar = (userId: string, url: string) => {
    saveTeam(team.map(u => u.id === userId ? { ...u, avatarUrl: url } : u));
    toast.success("Avatar actualizado");
  };

  const getSortedTasksByStatus = (status: Status) => {
    return tasks.filter(t => t.status === status).sort((a, b) => a.order - b.order);
  };

  const getAssignee = (id: string | null) => team.find(m => m.id === id);

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "Alta": return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      case "Media": return "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20";
      case "Baja": return "bg-green-500/10 text-green-600 hover:bg-green-500/20";
      default: return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20";
    }
  };

  const columns: Status[] = ["Nuevas", "Activas", "Finalizadas"];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-2xl bg-card">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-normal">Acceso Restringido</CardTitle>
            <p className="text-muted-foreground">Ingresa la contraseña para acceder al panel de trabajo.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input type="password" placeholder="Contraseña" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} />
              <Button type="submit" className="w-full">Ingresar</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-medium tracking-tight">Tablero de Trabajo</h1>
            <p className="text-muted-foreground mt-1">Gestiona las tareas y el equipo NJB</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Users Sidebar */}
            <Sheet modal={false} open={isUsersOpen} onOpenChange={setIsUsersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Users className="w-4 h-4" />
                  Equipo
                </Button>
              </SheetTrigger>
              <SheetContent hideOverlay className="bg-white dark:bg-card border-l shadow-2xl p-0">
                <div className="h-full overflow-y-auto overscroll-contain p-6 pb-20 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full">
                  <SheetHeader className="mb-6">
                    <SheetTitle>Gestión de Equipo</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6">
                    <div className="flex gap-2">
                      <Input placeholder="Nuevo miembro..." value={newUserName} onChange={e => setNewUserName(e.target.value)} />
                      <Button onClick={handleAddUser} size="icon"><Plus className="w-4 h-4" /></Button>
                    </div>
                    <div className="space-y-4">
                      {team.map(member => (
                        <div key={member.id} className="flex items-center gap-4 p-3 rounded-xl bg-muted/20">
                          <Avatar>
                            <AvatarImage src={member.avatarUrl} />
                            <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">{member.name}</p>
                            <div className="flex items-center gap-2">
                              <ImageIcon className="w-3 h-3 text-muted-foreground" />
                              <Input 
                                placeholder="URL de foto" 
                                className="h-7 text-xs bg-transparent border-none shadow-none px-0 focus-visible:ring-0" 
                                value={member.avatarUrl}
                                onChange={e => handleUpdateAvatar(member.id, e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* New Task Button */}
            <Button className="gap-2" onClick={() => handleCreateTask()}>
              <Plus className="w-4 h-4" />
              Nueva Tarea
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex flex-col lg:flex-row lg:grid lg:grid-cols-3 gap-6 overflow-x-auto pb-4 snap-x">
          {columns.map((column) => (
            <div 
              key={column}
              onDragOver={(e) => handleDragOverColumn(e, column)}
              onDrop={(e) => handleDrop(e, column)}
              className="flex flex-col gap-4 bg-muted/30 rounded-2xl p-4 min-w-[85vw] sm:min-w-[350px] lg:min-w-0 flex-shrink-0 snap-center min-h-[70vh] lg:min-h-[500px]"
            >
              <div className="flex items-center justify-between px-2">
                <h3 className="font-medium text-lg">{column}</h3>
                <span className="bg-background text-muted-foreground text-sm py-1 px-2.5 rounded-full">
                  {tasks.filter(t => t.status === column).length}
                </span>
              </div>
              
              <div className="flex flex-col gap-3 relative">
                {dropIndicator?.column === column && dropIndicator.index === 0 && (
                  <div className="h-1 bg-primary rounded-full w-full absolute top-0 -mt-1.5 z-10" />
                )}
                
                {getSortedTasksByStatus(column).map((task, index) => {
                  const assignee = getAssignee(task.assigneeId);
                  const isDropTargetAbove = dropIndicator?.status === column && dropIndicator.index === index;
                  const isDropTargetBelow = dropIndicator?.status === column && dropIndicator.index === index + 1;
                  
                  return (
                    <div key={task.id} className="relative">
                      {isDropTargetAbove && (
                        <div className="h-1 bg-primary rounded-full w-full absolute -top-1.5 z-10" />
                      )}
                      
                      <div
                        id={`task-${task.id}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        onDragEnd={(e) => handleDragEnd(e, task.id)}
                        onDragOver={(e) => handleDragOverCard(e, column, index)}
                        onClick={() => setSelectedTask(task)}
                        className={`bg-white dark:bg-card p-4 rounded-xl shadow-sm border border-border/50 cursor-grab active:cursor-grabbing hover:shadow-md transition-all group space-y-4 relative overflow-hidden`}
                      >
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => { e.stopPropagation(); setTaskToDelete(task.id); }}
                          className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10 z-20 bg-white/50 dark:bg-card/50 backdrop-blur-sm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                        <div className="flex justify-between items-start gap-2">
                          <div className="space-y-1">
                            <div className="flex flex-wrap gap-2 mb-2">
                              {task.project && (
                                <span className="inline-flex items-center gap-1 text-[10px] tracking-wider font-medium bg-primary/5 text-primary py-0.5 px-2 rounded-full">
                                  {(() => {
                                     const proj = projects.find(p => p.name === task.project);
                                     const Icon = proj && ICON_MAP[proj.icon] ? ICON_MAP[proj.icon] : Folder;
                                     return <Icon className="w-2.5 h-2.5" />;
                                  })()}
                                  {task.project}
                                </span>
                              )}
                              <span className={`inline-flex items-center gap-1 text-[10px] tracking-wider font-medium py-0.5 px-2 rounded-full ${getPriorityColor(task.priority)}`}>
                                <Flag className="w-3 h-3" />
                                {task.priority}
                              </span>
                            </div>
                            <h4 className="font-medium leading-tight">{task.title}</h4>
                            {task.subtitle && <p className="text-xs text-muted-foreground">{task.subtitle}</p>}
                          </div>
                        </div>
                        
                        {task.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {task.description}
                          </p>
                        )}



                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {(() => {
                               const assignees = (task.assigneeIds || (task.assigneeId ? [task.assigneeId] : [])).map(id => getAssignee(id)).filter(Boolean);
                               if (assignees.length === 0) {
                                 return (
                                   <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                                     <User className="w-4 h-4" />
                                   </div>
                                 );
                               }
                               return (
                                 <div className="flex -space-x-2">
                                   {assignees.map(a => (
                                     <Avatar key={a!.id} className="w-7 h-7 border-2 border-white dark:border-card">
                                       <AvatarImage src={a!.avatarUrl} />
                                       <AvatarFallback className="text-[10px]">{a!.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                     </Avatar>
                                   ))}
                                 </div>
                               );
                            })()}
                            <span className="text-xs font-medium">
                              {(() => {
                                const assignees = (task.assigneeIds || (task.assigneeId ? [task.assigneeId] : [])).map(id => getAssignee(id)).filter(Boolean);
                                return assignees.length > 0 ? assignees.map(a => a?.name).join(", ") : "Sin Asignar";
                              })()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {isDropTargetBelow && (
                        <div className="h-1 bg-primary rounded-full w-full absolute -bottom-1.5 z-10" />
                      )}
                    </div>
                  );
                })}
                <Button 
                  variant="ghost" 
                  className="w-full mt-2 justify-start text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  onClick={() => handleCreateTask(column)}
                >
                  <Plus className="w-4 h-4 mr-2" /> Añadir Tarea
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!taskToDelete} onOpenChange={(open) => !open && setTaskToDelete(null)}>
        <DialogContent className="sm:max-w-[425px] border-none shadow-xl bg-white dark:bg-card">
          <DialogHeader>
            <DialogTitle className="font-medium text-destructive flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Eliminar Tarea
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              ¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setTaskToDelete(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={() => {
                if (taskToDelete) {
                  const newTasks = tasks.filter(t => t.id !== taskToDelete);
                  saveTasks(newTasks);
                  if (selectedTask?.id === taskToDelete) setSelectedTask(null);
                  toast.success("Tarea eliminada");
                }
                setTaskToDelete(null);
            }}>Eliminar</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Task Details Sidebar */}
      <Sheet modal={false} open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
        <SheetContent 
          hideOverlay 
          className="p-0 bg-white dark:bg-card border-l shadow-2xl transition-none"
          style={{ maxWidth: `${sidebarWidth}px`, width: '100%' }}
        >
          {/* Resize handle */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-primary/50 active:bg-primary z-50 transition-colors"
            onMouseDown={(e) => {
              e.preventDefault();
              const startX = e.clientX;
              const startWidth = sidebarWidth;
              const onMouseMove = (moveEvent: MouseEvent) => {
                  const newWidth = startWidth + (startX - moveEvent.clientX);
                  setSidebarWidth(Math.max(320, Math.min(newWidth, window.innerWidth - 50)));
              };
              const onMouseUp = () => {
                  document.removeEventListener("mousemove", onMouseMove);
                  document.removeEventListener("mouseup", onMouseUp);
              };
              document.addEventListener("mousemove", onMouseMove);
              document.addEventListener("mouseup", onMouseUp);
            }}
          />

          <div className="h-full overflow-y-auto overscroll-contain p-6 sm:p-10 pt-14 sm:pt-20 pb-32 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full">
          {selectedTask && (
            <div className="space-y-8">
              
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Select value={selectedTask.priority} onValueChange={(val: Priority) => handleUpdateSelectedTask({ priority: val })}>
                    <SelectTrigger className={`h-7 px-3 text-xs w-auto border-none shadow-none rounded-full ${getPriorityColor(selectedTask.priority)}`}>
                      <Flag className="w-3 h-3 mr-1" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alta">Alta</SelectItem>
                      <SelectItem value="Media">Media</SelectItem>
                      <SelectItem value="Baja">Baja</SelectItem>
                    </SelectContent>
                  </Select>

                  <Popover open={tagDropdownOpen} onOpenChange={(val) => { setTagDropdownOpen(val); if(!val) { setTagIsCreating(false); setTagSearch(""); } }}>
                    <PopoverTrigger asChild>
                      <button className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/5 hover:bg-primary/10 text-primary py-1 px-3 rounded-full transition-colors cursor-pointer">
                        {(() => {
                           const proj = projects.find(p => p.name === selectedTask.project);
                           const Icon = proj && ICON_MAP[proj.icon] ? ICON_MAP[proj.icon] : Folder;
                           return <Icon className="w-3.5 h-3.5" />;
                        })()}
                        {selectedTask.project || "Sin etiqueta"}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-3 shadow-xl border-border/50 rounded-xl bg-white dark:bg-card" align="start">
                       {!tagIsCreating ? (
                         <div className="space-y-3">
                           <Input 
                             placeholder="Buscar etiqueta..." 
                             value={tagSearch} 
                             onChange={e => setTagSearch(e.target.value)}
                             className="h-8 text-xs bg-muted/30 border-none shadow-none focus-visible:ring-0"
                             autoFocus
                           />
                           <div className="max-h-48 overflow-y-auto space-y-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full">
                             {projects.filter(p => p.name.toLowerCase().includes(tagSearch.toLowerCase())).map(p => {
                                const PIcon = ICON_MAP[p.icon] || Folder;
                                return (
                                  <button 
                                    key={p.id}
                                    onClick={() => {
                                       handleUpdateSelectedTask({ project: p.name });
                                       setTagDropdownOpen(false);
                                    }}
                                    className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg hover:bg-muted/50 transition-colors text-left"
                                  >
                                     <PIcon className="w-4 h-4 text-muted-foreground" />
                                     <span className="truncate">{p.name}</span>
                                  </button>
                                )
                             })}
                             {tagSearch && !projects.find(p => p.name.toLowerCase() === tagSearch.toLowerCase()) && (
                                <button 
                                  onClick={() => setTagIsCreating(true)}
                                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg hover:bg-primary/10 text-primary transition-colors text-left mt-1"
                                >
                                  <Plus className="w-4 h-4" />
                                  Crear "{tagSearch}"
                                </button>
                             )}
                           </div>
                         </div>
                       ) : (
                         <div className="space-y-4">
                           <div className="flex items-center gap-2">
                             <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setTagIsCreating(false)}>
                               <ArrowLeft className="w-3 h-3" />
                             </Button>
                             <span className="text-xs font-medium">Nueva etiqueta</span>
                           </div>
                           <Input 
                             value={tagSearch} 
                             onChange={e => setTagSearch(e.target.value)}
                             className="h-8 text-xs bg-muted/30 border-none shadow-none focus-visible:ring-0"
                             placeholder="Nombre..."
                           />
                           <div>
                             <span className="text-[10px] uppercase text-muted-foreground font-semibold mb-2 block tracking-wider">Icono</span>
                             <div className="grid grid-cols-5 gap-1">
                               {Object.keys(ICON_MAP).map(iconName => {
                                  const IconComp = ICON_MAP[iconName];
                                  return (
                                    <button
                                      key={iconName}
                                      onClick={() => setTagSelectedIcon(iconName)}
                                      className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${tagSelectedIcon === iconName ? 'bg-primary/20 text-primary' : 'hover:bg-muted text-muted-foreground'}`}
                                    >
                                      <IconComp className="w-4 h-4" />
                                    </button>
                                  )
                               })}
                             </div>
                           </div>
                           <Button 
                             className="w-full h-8 text-xs" 
                             onClick={() => {
                               if(!tagSearch.trim()) return;
                               const newProj = { id: Date.now().toString(), name: tagSearch, icon: tagSelectedIcon };
                               saveProjects([...projects, newProj]);
                               handleUpdateSelectedTask({ project: tagSearch });
                               setTagIsCreating(false);
                               setTagDropdownOpen(false);
                               setTagSearch("");
                             }}
                           >
                             Guardar y aplicar
                           </Button>
                         </div>
                       )}
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-1">
                  <SheetTitle className="sr-only">Detalles de Tarea</SheetTitle>
                  <input 
                    value={selectedTask.title} 
                    onChange={(e) => handleUpdateSelectedTask({ title: e.target.value })} 
                    placeholder="Sin título"
                    className="w-full text-3xl font-bold bg-transparent border-none outline-none focus:ring-0 px-0 placeholder:text-muted-foreground/30 transition-all text-foreground"
                  />
                  <input 
                    value={selectedTask.subtitle || ''} 
                    onChange={(e) => handleUpdateSelectedTask({ subtitle: e.target.value })} 
                    placeholder="Añadir subtítulo..."
                    className="w-full text-sm font-medium text-muted-foreground bg-transparent border-none outline-none focus:ring-0 px-0 placeholder:text-muted-foreground/30 transition-all"
                  />
                </div>
              </div>

              {/* Assignment */}
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-muted-foreground">Asignado a</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex items-center gap-2 hover:bg-muted/50 p-1.5 rounded-lg transition-colors border-none outline-none">
                      {(() => {
                        const assignees = (selectedTask.assigneeIds || (selectedTask.assigneeId ? [selectedTask.assigneeId] : [])).map(id => getAssignee(id)).filter(Boolean);
                        if (assignees.length === 0) return <span className="text-sm text-muted-foreground">Sin asignar</span>;
                        return (
                          <div className="flex items-center">
                             <div className="flex -space-x-2 mr-2">
                               {assignees.map(a => (
                                 <Avatar key={a.id} className="w-6 h-6 border-2 border-white dark:border-card">
                                   <AvatarImage src={a.avatarUrl} />
                                   <AvatarFallback className="text-[10px]">{a.name.substring(0,2).toUpperCase()}</AvatarFallback>
                                 </Avatar>
                               ))}
                             </div>
                             <span className="text-sm font-medium truncate max-w-[120px]">{assignees.length === 1 ? assignees[0].name : `${assignees.length} personas`}</span>
                          </div>
                        );
                      })()}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2 shadow-xl border-border/50 rounded-xl bg-white dark:bg-card" align="end">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-muted-foreground px-2 mb-2 block uppercase tracking-wider">Miembros del equipo</span>
                      {team.map(m => {
                         const assignees = selectedTask.assigneeIds || (selectedTask.assigneeId ? [selectedTask.assigneeId] : []);
                         const isAssigned = assignees.includes(m.id);
                         return (
                           <button 
                             key={m.id}
                             className="w-full flex items-center justify-between px-2 py-1.5 text-sm rounded-lg hover:bg-muted transition-colors text-left"
                             onClick={() => {
                                let newAssignees = [...assignees];
                                if (isAssigned) newAssignees = newAssignees.filter(id => id !== m.id);
                                else newAssignees.push(m.id);
                                handleUpdateSelectedTask({ assigneeIds: newAssignees });
                             }}
                           >
                             <div className="flex items-center gap-2">
                               <Avatar className="w-6 h-6">
                                 <AvatarImage src={m.avatarUrl} />
                                 <AvatarFallback className="text-[10px]">{m.name.substring(0,2).toUpperCase()}</AvatarFallback>
                               </Avatar>
                               <span className="truncate">{m.name}</span>
                             </div>
                             {isAssigned && <CheckSquare className="w-4 h-4 text-primary" />}
                           </button>
                         )
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Description */}
              <div className="space-y-4 pt-4">
                <textarea 
                  value={selectedTask.description || ''}
                  onChange={(e) => {
                     e.target.style.height = 'auto';
                     e.target.style.height = e.target.scrollHeight + 'px';
                     handleUpdateSelectedTask({ description: e.target.value });
                  }}
                  onFocus={(e) => {
                     e.target.style.height = 'auto';
                     e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  ref={(el) => {
                     if (el) {
                       el.style.height = 'auto';
                       el.style.height = el.scrollHeight + 'px';
                     }
                  }}
                  placeholder="Añadir descripción o notas..."
                  className="w-full text-base leading-relaxed bg-transparent border-none outline-none focus:ring-0 px-0 resize-none overflow-hidden placeholder:text-muted-foreground/40 min-h-[40px] text-foreground"
                />

                {/* Blocks Stream */}
                <div className="space-y-1">
                  
                  {/* Checklist Blocks */}
                  {selectedTask.checklists?.map(item => (
                    <div key={item.id} className="flex items-start gap-3 group/block py-1">
                      <Checkbox 
                        id={`sheet-${item.id}`} 
                        checked={item.completed}
                        onCheckedChange={() => toggleChecklist(selectedTask.id, item.id)}
                        className="mt-1"
                      />
                      <input 
                        value={item.text}
                        onChange={(e) => {
                           handleUpdateSelectedTask({
                              checklists: selectedTask.checklists.map(c => c.id === item.id ? { ...c, text: e.target.value } : c)
                           });
                        }}
                        className={`text-sm leading-relaxed flex-1 bg-transparent border-none outline-none focus:ring-0 px-0 shadow-none ${item.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}
                      />
                      <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover/block:opacity-100 transition-opacity" onClick={() => handleUpdateSelectedTask({ checklists: selectedTask.checklists.filter(c => c.id !== item.id) })}>
                        <X className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}

                  {/* Image Blocks */}
                  {selectedTask.images?.map(img => (
                    <div key={img.id} className="relative group/block rounded-xl overflow-hidden bg-muted my-4">
                      <img src={img.url} alt="Adjunto" className="w-full h-auto object-cover max-h-[500px]" />
                      <div className="absolute top-2 right-2 opacity-0 group-hover/block:opacity-100 transition-opacity">
                        <Button variant="secondary" size="icon" className="h-8 w-8 shadow-md" onClick={() => removeImage(img.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Link Blocks */}
                  {selectedTask.links?.map(link => (
                    <div key={link.id} className="flex items-center justify-between group/block bg-muted/20 p-2 rounded-lg border border-border/30 hover:bg-muted/40 transition-colors my-2">
                      <a href={link.url} target="_blank" rel="noreferrer" className="text-sm font-medium hover:underline flex items-center gap-3 truncate max-w-[90%]">
                        <div className="w-8 h-8 rounded bg-background flex items-center justify-center flex-shrink-0 shadow-sm border border-border/50">
                           <LinkIcon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="truncate">{link.label || link.url}</span>
                      </a>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover/block:opacity-100 transition-opacity" onClick={() => removeLink(link.id)}>
                        <X className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}

                </div>

                {/* The "+" Add Block Menu */}
                <div className="pt-4 flex flex-col gap-2">
                   <div className="flex items-center gap-2 group/add">
                     <DropdownMenu>
                       <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon" className="h-6 w-6 rounded-sm text-muted-foreground opacity-40 hover:opacity-100 hover:bg-muted">
                           <Plus className="h-4 w-4" />
                         </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="start" className="w-48 shadow-xl border-border/50">
                         <DropdownMenuItem onClick={() => setAddingBlock('checklist')} className="gap-2 cursor-pointer py-2">
                           <CheckSquare className="w-4 h-4 text-muted-foreground" /> Tarea (To-do)
                         </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => setAddingBlock('image')} className="gap-2 cursor-pointer py-2">
                           <ImageIcon className="w-4 h-4 text-muted-foreground" /> Imagen
                         </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => setAddingBlock('link')} className="gap-2 cursor-pointer py-2">
                           <LinkIcon className="w-4 h-4 text-muted-foreground" /> Enlace Web
                         </DropdownMenuItem>
                       </DropdownMenuContent>
                     </DropdownMenu>
                     <span className="text-sm text-muted-foreground opacity-0 group-hover/add:opacity-50 select-none transition-opacity">Añadir un bloque...</span>
                   </div>

                   {/* Inline Adding Forms */}
                   {addingBlock === 'checklist' && (
                     <div className="flex items-start gap-3 mt-1 animate-in fade-in slide-in-from-top-1">
                       <Checkbox disabled className="mt-1 opacity-50" />
                       <Input 
                          autoFocus 
                          placeholder="Escribe una tarea y presiona Enter..." 
                          className="h-auto py-0 text-sm flex-1 bg-transparent border-none focus-visible:ring-0 px-0 shadow-none text-foreground" 
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const input = e.currentTarget;
                              if(input.value.trim()) {
                                handleUpdateSelectedTask({ checklists: [...(selectedTask.checklists || []), { id: Date.now().toString(), text: input.value, completed: false }] });
                                input.value = '';
                              } else {
                                setAddingBlock(null);
                              }
                            }
                            if (e.key === 'Escape') setAddingBlock(null);
                          }}
                          onBlur={(e) => {
                             if (!e.target.value.trim()) setAddingBlock(null);
                          }}
                       />
                     </div>
                   )}
                   {addingBlock === 'image' && (
                     <div className="flex gap-2 items-center mt-2 p-2 bg-muted/30 rounded-lg border border-border/50 animate-in fade-in zoom-in-95">
                       <Input autoFocus placeholder="Pega la URL de la imagen y presiona Enter..." className="h-8 text-sm flex-1 bg-transparent border-none focus-visible:ring-0 shadow-none" 
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const input = e.currentTarget;
                              if(input.value.trim()) {
                                handleUpdateSelectedTask({ images: [...(selectedTask.images || []), { id: Date.now().toString(), url: input.value }] });
                                setAddingBlock(null);
                              }
                            }
                            if (e.key === 'Escape') setAddingBlock(null);
                          }}
                       />
                       <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setAddingBlock(null)}><X className="w-4 h-4" /></Button>
                     </div>
                   )}
                   {addingBlock === 'link' && (
                     <div className="flex gap-2 items-center mt-2 p-2 bg-muted/30 rounded-lg border border-border/50 animate-in fade-in zoom-in-95">
                       <Input autoFocus placeholder="URL..." id="new-link-url" className="h-8 text-xs flex-1 border-none bg-transparent shadow-none" />
                       <Input placeholder="Título (Opcional)" id="new-link-label" className="h-8 text-xs flex-1 border-none bg-transparent shadow-none" onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                              const urlInput = document.getElementById('new-link-url');
                              const labelInput = document.getElementById('new-link-label');
                              if(urlInput.value.trim()) {
                                handleUpdateSelectedTask({ links: [...(selectedTask.links || []), { id: Date.now().toString(), url: urlInput.value, label: labelInput.value }] });
                                setAddingBlock(null);
                              }
                           }
                           if (e.key === 'Escape') setAddingBlock(null);
                       }}/>
                       <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setAddingBlock(null)}><X className="w-4 h-4" /></Button>
                     </div>
                   )}
                </div>
              </div>


              <div className="pt-4 flex justify-end">
                <Button variant="ghost" className="text-destructive hover:bg-destructive hover:text-destructive-foreground gap-2 transition-colors" onClick={() => setTaskToDelete(selectedTask.id)}>
                   <Trash2 className="w-4 h-4" />
                   Eliminar Tarea
                </Button>
              </div>

            </div>
          )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
