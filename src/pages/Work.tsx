import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Plus, CheckSquare, User, Flag, Folder } from "lucide-react";
import { toast } from "sonner";

type Status = "Nuevas" | "Activas" | "Finalizadas";
type Priority = "Alta" | "Media" | "Baja";
type Assignee = "Michael" | "Arturo" | "Manuel" | "Sin Asignar";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: Assignee;
  priority: Priority;
  project: string;
  status: Status;
  checklists: ChecklistItem[];
}

const PASSWORD = "NBJWORK565712";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Diseño de Homepage",
    description: "Crear wireframes para la nueva página de inicio considerando la experiencia de usuario.",
    assignee: "Michael",
    priority: "Alta",
    project: "NJB Redesign",
    status: "Activas",
    checklists: [
      { id: "c1", text: "Wireframe mobile", completed: true },
      { id: "c2", text: "Wireframe desktop", completed: false }
    ]
  },
  {
    id: "2",
    title: "Revisión de Textos",
    description: "Corregir ortografía y gramática en la sección Nosotros.",
    assignee: "Arturo",
    priority: "Media",
    project: "Copywriting",
    status: "Nuevas",
    checklists: []
  },
  {
    id: "3",
    title: "Implementar Footer",
    description: "Maquetar el footer usando React y Tailwind CSS.",
    assignee: "Manuel",
    priority: "Baja",
    project: "Frontend",
    status: "Finalizadas",
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
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  // New task form state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    assignee: "Sin Asignar",
    priority: "Media",
    project: "",
    status: "Nuevas",
    checklists: []
  });

  useEffect(() => {
    const auth = localStorage.getItem("njb_work_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    
    const savedTasks = localStorage.getItem("njb_work_tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(initialTasks);
    }
  }, []);

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

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem("njb_work_tasks", JSON.stringify(newTasks));
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedTaskId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetStatus: Status) => {
    e.preventDefault();
    if (draggedTaskId) {
      const newTasks = tasks.map((task) =>
        task.id === draggedTaskId ? { ...task, status: targetStatus } : task
      );
      saveTasks(newTasks);
      setDraggedTaskId(null);
    }
  };

  const handleCreateTask = () => {
    if (!newTask.title) {
      toast.error("El título es obligatorio");
      return;
    }
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title || "",
      description: newTask.description || "",
      assignee: (newTask.assignee as Assignee) || "Sin Asignar",
      priority: (newTask.priority as Priority) || "Media",
      project: newTask.project || "General",
      status: (newTask.status as Status) || "Nuevas",
      checklists: []
    };

    saveTasks([...tasks, task]);
    setIsDialogOpen(false);
    setNewTask({
      title: "",
      description: "",
      assignee: "Sin Asignar",
      priority: "Media",
      project: "",
      status: "Nuevas",
      checklists: []
    });
    toast.success("Tarea creada");
  };

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
            <p className="text-muted-foreground">Por favor, ingresa la contraseña para acceder al panel de trabajo.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Contraseña"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                Ingresar
              </Button>
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
            <p className="text-muted-foreground mt-1">Gestiona las tareas del equipo NJB</p>
          </div>
          
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
                  <Input 
                    value={newTask.title} 
                    onChange={e => setNewTask({...newTask, title: e.target.value})}
                    placeholder="Ej. Diseño de logo" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Descripción</label>
                  <Textarea 
                    value={newTask.description}
                    onChange={e => setNewTask({...newTask, description: e.target.value})}
                    placeholder="Detalles de la tarea..."
                    className="resize-none"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Asignado a</label>
                    <Select value={newTask.assignee} onValueChange={(val) => setNewTask({...newTask, assignee: val as Assignee})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Michael">Michael</SelectItem>
                        <SelectItem value="Arturo">Arturo</SelectItem>
                        <SelectItem value="Manuel">Manuel</SelectItem>
                        <SelectItem value="Sin Asignar">Sin Asignar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Prioridad</label>
                    <Select value={newTask.priority} onValueChange={(val) => setNewTask({...newTask, priority: val as Priority})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
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
                  <Input 
                    value={newTask.project} 
                    onChange={e => setNewTask({...newTask, project: e.target.value})}
                    placeholder="Ej. Rediseño Web" 
                  />
                </div>
                <Button className="w-full mt-4" onClick={handleCreateTask}>Crear Tarea</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div 
              key={column}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column)}
              className="flex flex-col gap-4 bg-muted/30 rounded-2xl p-4 min-h-[500px]"
            >
              <div className="flex items-center justify-between px-2">
                <h3 className="font-medium text-lg">{column}</h3>
                <span className="bg-background text-muted-foreground text-sm py-1 px-2.5 rounded-full">
                  {tasks.filter(t => t.status === column).length}
                </span>
              </div>
              
              <div className="flex flex-col gap-3">
                {tasks
                  .filter((task) => task.status === column)
                  .map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      className="bg-card p-4 rounded-xl shadow-sm border border-border/50 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow group space-y-4"
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
                          <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                            <User className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-medium">{task.assignee}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
