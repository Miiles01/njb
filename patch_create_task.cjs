const fs = require('fs');
let content = fs.readFileSync('src/pages/Work.tsx', 'utf8');

// 1. Remove Dialog imports (might be used elsewhere? Dialog is used for delete confirmation! So don't remove imports).

// 2. Remove states
content = content.replace(/const \[isDialogOpen, setIsDialogOpen\] = useState\(false\);\n/, '');
content = content.replace(/const \[newTask, setNewTask\] = useState<Partial<Task>>\(\{[\s\S]*?\}\);\n/, '');

// 3. Update handleCreateTask
const oldHandleCreate = `  const handleCreateTask = () => {
    if (!newTask.title) return toast.error("El título es obligatorio");
    
    const columnTasks = tasks.filter(t => t.status === (newTask.status || "Nuevas"));
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title || "",
      subtitle: newTask.subtitle || "",
      description: newTask.description || "",
      assigneeIds: newTask.assigneeId ? [newTask.assigneeId] : [],
      priority: (newTask.priority as Priority) || "Media",
      project: newTask.project || "General",
      status: (newTask.status as Status) || "Nuevas",
      checklists: [],
      links: [],
      images: [],
      order: columnTasks.length
    };

    saveTasks([...tasks, task]);
    setIsDialogOpen(false);
    setNewTask({ title: "", subtitle: "", description: "", assigneeId: null, priority: "Media", project: "", status: "Nuevas" });
  };`;

const newHandleCreate = `  const handleCreateTask = (defaultStatus: Status = "Nuevas") => {
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
  };`;
content = content.replace(oldHandleCreate, newHandleCreate);

// 4. Replace New Task Modal block with a simple button (or nothing if we move it per column)
const newModalRegex = /\{\/\* New Task Modal \*\/\}\s*<Dialog open=\{isDialogOpen\} onOpenChange=\{setIsDialogOpen\}>[\s\S]*?<\/Dialog>/;
const newHeaderButton = `{/* New Task Button */}
            <Button className="gap-2" onClick={() => handleCreateTask()}>
              <Plus className="w-4 h-4" />
              Nueva Tarea
            </Button>`;
content = content.replace(newModalRegex, newHeaderButton);

// 5. Add "+ Añadir Tarea" button to the bottom of each column
const columnEndTarget = `                  );
                })}
              </div>
            </div>
          ))}
        </div>`;
const columnEndReplacement = `                  );
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
        </div>`;
content = content.replace(columnEndTarget, columnEndReplacement);


fs.writeFileSync('src/pages/Work.tsx', content);
console.log('Task creation patched!');
