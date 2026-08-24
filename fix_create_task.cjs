const fs = require('fs');
let content = fs.readFileSync('src/pages/Work.tsx', 'utf8');

const regex = /  const handleCreateTask = \(\) => \{[\s\S]*?toast\.success\("Tarea creada"\);\n  \};/;

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

content = content.replace(regex, newHandleCreate);

// Remove newTask state if it exists
content = content.replace(/const \[newTask, setNewTask\] = useState<Partial<Task>>\(\{[\s\S]*?\}\);\n/, '');

fs.writeFileSync('src/pages/Work.tsx', content);
console.log('Fixed handleCreateTask');
