import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Plus, CheckSquare, User, Flag, Folder, Users, GripVertical, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

type Status = "Nuevas" | "Activas" | "Finalizadas";
type Priority = "Alta" | "Media" | "Baja";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TeamMember {
  id: string;
  name: string;
  avatarUrl: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string | null;
  priority: Priority;
  project: string;
  status: Status;
  checklists: ChecklistItem[];
  order: number;
}

const PASSWORD = "NBJWORK565712";

const defaultTeam: TeamMember[] = [
  { id: "m1", name: "Michael", avatarUrl: "" },
  { id: "m2", name: "Arturo", avatarUrl: "" },
  { id: "m3", name: "Manuel", avatarUrl: "" },
];

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Diseño de Homepage",
    description: "Crear wireframes para la nueva página de inicio considerando la experiencia de usuario.",
    assigneeId: "m1",
    priority: "Alta",
    project: "NJB Redesign",
    status: "Activas",
    order: 0,
    checklists: [
      { id: "c1", text: "Wireframe mobile", completed: true },
      { id: "c2", text: "Wireframe desktop", completed: false }
    ]
  },
  {
    id: "2",
    title: "Revisión de Textos",
    description: "Corregir ortografía y gramática en la sección Nosotros.",
    assigneeId: "m2",
    priority: "Media",
    project: "Copywriting",
    status: "Nuevas",
    order: 0,
    checklists: []
  },
  {
    id: "3",
    title: "Implementar Footer",
    description: "Maquetar el footer usando React y Tailwind CSS.",
    assigneeId: "m3",
    priority: "Baja",
    project: "Frontend",
    status: "Finalizadas",
    order: 0,
    checklists: [
      { id: "c3", text: "Links sociales", completed: true },
      { id: "c4", text: "Formulario newsletter", completed: true }
    ]
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Forms state
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "", description: "", assigneeId: null, priority: "Media", project: "", status: "Nuevas"
  });
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("njb_work_auth");
    if (auth === "true") setIsAuthenticated(true);
    
    const savedTasks = localStorage.getItem("njb_work_tasks");
    setTasks(savedTasks ? JSON.parse(savedTasks) : initialTasks);

    const savedTeam = localStorage.getItem("njb_work_team");
    setTeam(savedTeam ? JSON.parse(savedTeam) : defaultTeam);
  }, []);

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
    // Slight delay to prevent immediate drag-end visual glitch
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
    // Only set indicator to 0 if dragging over empty space in a column
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
    
    // Remove from old position
    newTasks.splice(draggedIndex, 1);
    
    // Get tasks in target column before insertion
    const targetColumnTasks = newTasks
      .filter(t => t.status === status)
      .sort((a, b) => a.order - b.order);

    // Adjust target index if dropping in same column and moved down
    if (dropIndicator && tasks[draggedIndex].status === status && dropIndicator.index > targetColumnTasks.length) {
       targetIndex = targetColumnTasks.length;
    }

    targetColumnTasks.splice(targetIndex, 0, taskToMove);

    // Reassign orders for the target column
    targetColumnTasks.forEach((t, i) => {
      t.order = i;
      const globalIndex = newTasks.findIndex(nt => nt.id === t.id);
      if(globalIndex !== -1) newTasks[globalIndex] = t;
    });

    // Add back the moved task if it wasn't in newTasks (since we spliced it)
    if (!newTasks.find(t => t.id === taskToMove.id)) {
        newTasks.push(taskToMove);
    }
    
    // Final sorting and ordering pass for safety
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
  const handleCreateTask = () => {
    if (!newTask.title) return toast.error("El título es obligatorio");
    
    const columnTasks = tasks.filter(t => t.status === (newTask.status || "Nuevas"));
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title || "",
      description: newTask.description || "",
      assigneeId: newTask.assigneeId || null,
      priority: (newTask.priority as Priority) || "Media",
      project: newTask.project || "General",
      status: (newTask.status as Status) || "Nuevas",
      checklists: [],
      order: columnTasks.length
    };

    saveTasks([...tasks, task]);
    setIsDialogOpen(false);
    setNewTask({ title: "", description: "", assigneeId: null, priority: "Media", project: "", status: "Nuevas" });
    toast.success("Tarea creada");
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
      case "Alta": return "bg-red-500/10 text-red-500";
      case "Media": return "bg-yellow-500/10 text-yellow-600";
      case "Baja": return "bg-green-500/10 text-green-600";
      default: return "bg-slate-500/10 text-slate-500";
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
          
          <div className="flex items-center gap-3">
            {/* Users Sidebar */}
            <Sheet open={isUsersOpen} onOpenChange={setIsUsersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Users className="w-4 h-4" />
                  Equipo
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Gestión de Equipo</SheetTitle>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div className="flex gap-2">
                    <Input placeholder="Nuevo miembro..." value={newUserName} onChange={e => setNewUserName(e.target.value)} />
                    <Button onClick={handleAddUser} size="icon"><Plus className="w-4 h-4" /></Button>
                  </div>
                  <div className="space-y-4">
                    {team.map(member => (
                      <div key={member.id} className="flex items-center gap-4 p-3 rounded-xl border border-border/50">
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
                              className="h-7 text-xs" 
                              value={member.avatarUrl}
                              onChange={e => handleUpdateAvatar(member.id, e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* New Task Modal */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Nueva Tarea
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] border-none shadow-xl">
                <DialogHeader>
                  <DialogTitle className="font-medium">Crear Nueva Tarea</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Título</label>
                    <Input value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} placeholder="Ej. Diseño de logo" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Descripción</label>
                    <Textarea value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} placeholder="Detalles..." className="resize-none" rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Asignado a</label>
                      <Select value={newTask.assigneeId || "none"} onValueChange={(val) => setNewTask({...newTask, assigneeId: val === "none" ? null : val})}>
                        <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Sin Asignar</SelectItem>
                          {team.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Prioridad</label>
                      <Select value={newTask.priority} onValueChange={(val) => setNewTask({...newTask, priority: val as Priority})}>
                        <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Alta">Alta</SelectItem>
                          <SelectItem value="Media">Media</SelectItem>
                          <SelectItem value="Baja">Baja</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Proyecto (Etiqueta)</label>
                    <Input value={newTask.project} onChange={e => setNewTask({...newTask, project: e.target.value})} placeholder="Ej. Rediseño Web" />
                  </div>
                  <Button className="w-full mt-4" onClick={handleCreateTask}>Crear Tarea</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div 
              key={column}
              onDragOver={(e) => handleDragOverColumn(e, column)}
              onDrop={(e) => handleDrop(e, column)}
              className="flex flex-col gap-4 bg-muted/30 rounded-2xl p-4 min-h-[500px]"
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
                        className={`bg-white dark:bg-card p-4 rounded-xl shadow-sm border border-border/50 cursor-grab active:cursor-grabbing hover:shadow-md transition-all group space-y-4`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="space-y-1">
                            <div className="flex flex-wrap gap-2 mb-2">
                              {task.project && (
                                <span className="inline-flex items-center gap-1 text-[10px] tracking-wider font-medium bg-primary/5 text-primary py-0.5 px-2 rounded-full">
                                  <Folder className="w-3 h-3" />
                                  {task.project}
                                </span>
                              )}
                              <span className={`inline-flex items-center gap-1 text-[10px] tracking-wider font-medium py-0.5 px-2 rounded-full ${getPriorityColor(task.priority)}`}>
                                <Flag className="w-3 h-3" />
                                {task.priority}
                              </span>
                            </div>
                            <h4 className="font-medium leading-tight">{task.title}</h4>
                          </div>
                        </div>
                        
                        {task.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {task.description}
                          </p>
                        )}

                        {task.checklists && task.checklists.length > 0 && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CheckSquare className="w-3.5 h-3.5" />
                            <span>
                              {task.checklists.filter(c => c.completed).length}/{task.checklists.length}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {assignee ? (
                              <Avatar className="w-7 h-7">
                                <AvatarImage src={assignee.avatarUrl} />
                                <AvatarFallback className="text-[10px]">{assignee.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                                <User className="w-4 h-4" />
                              </div>
                            )}
                            <span className="text-xs font-medium">{assignee ? assignee.name : "Sin Asignar"}</span>
                          </div>
                        </div>
                      </div>

                      {isDropTargetBelow && (
                        <div className="h-1 bg-primary rounded-full w-full absolute -bottom-1.5 z-10" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Details Sidebar */}
      <Sheet open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          {selectedTask && (
            <div className="space-y-6 pt-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`inline-flex items-center gap-1 text-[10px] tracking-wider font-medium py-0.5 px-2 rounded-full ${getPriorityColor(selectedTask.priority)}`}>
                    <Flag className="w-3 h-3" />
                    {selectedTask.priority}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] tracking-wider font-medium bg-primary/5 text-primary py-0.5 px-2 rounded-full">
                    <Folder className="w-3 h-3" />
                    {selectedTask.project}
                  </span>
                </div>
                <SheetTitle className="text-2xl leading-tight">{selectedTask.title}</SheetTitle>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Descripción</h4>
                  <p className="text-sm leading-relaxed">
                    {selectedTask.description || "No hay descripción proporcionada."}
                  </p>
                </div>

                <div className="space-y-3 pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <CheckSquare className="w-4 h-4" />
                    Checklist
                  </h4>
                  {selectedTask.checklists.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">No hay tareas pendientes en checklist.</p>
                  ) : (
                    <div className="space-y-3 bg-muted/30 p-4 rounded-xl">
                      {selectedTask.checklists.map(item => (
                        <div key={item.id} className="flex items-start gap-3">
                          <Checkbox 
                            id={item.id} 
                            checked={item.completed}
                            onCheckedChange={() => toggleChecklist(selectedTask.id, item.id)}
                            className="mt-0.5"
                          />
                          <label 
                            htmlFor={item.id}
                            className={`text-sm leading-tight cursor-pointer ${item.completed ? 'text-muted-foreground line-through' : ''}`}
                          >
                            {item.text}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <h4 className="text-sm font-medium text-muted-foreground w-20">Asignado:</h4>
                  <div className="flex items-center gap-2">
                    {getAssignee(selectedTask.assigneeId) ? (
                      <>
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={getAssignee(selectedTask.assigneeId)?.avatarUrl} />
                          <AvatarFallback>{getAssignee(selectedTask.assigneeId)?.name.substring(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{getAssignee(selectedTask.assigneeId)?.name}</span>
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">Sin asignar</span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
