const fs = require('fs');
let content = fs.readFileSync('src/pages/Work.tsx', 'utf8');

// Update data loading in useEffect
const oldUseEffect = /  useEffect\(\(\) => \{\n    const auth = localStorage\.getItem\("njb_work_auth"\);\n[\s\S]*?    \}\n  \}, \[\]\);/m;

const newUseEffect = `  useEffect(() => {
    const auth = localStorage.getItem("njb_work_auth");
    if (auth === "true") setIsAuthenticated(true);
    
    fetch('/api.php?action=get_all')
      .then(r => r.json())
      .then(data => {
        if (data.tasks && data.tasks.length > 0) setTasks(data.tasks);
        else {
           const savedTasks = localStorage.getItem("njb_work_tasks");
           setTasks(savedTasks ? JSON.parse(savedTasks) : initialTasks);
        }
        
        if (data.team && data.team.length > 0) setTeam(data.team);
        else {
           const savedTeam = localStorage.getItem("njb_work_team");
           setTeam(savedTeam ? JSON.parse(savedTeam) : defaultTeam);
        }
        
        if (data.projects && data.projects.length > 0) setProjects(data.projects);
      })
      .catch(e => {
        console.error("No se pudo conectar a la base de datos, usando memoria local.", e);
        const savedTasks = localStorage.getItem("njb_work_tasks");
        setTasks(savedTasks ? JSON.parse(savedTasks) : initialTasks);
        const savedTeam = localStorage.getItem("njb_work_team");
        if (savedTeam) setTeam(JSON.parse(savedTeam));
        else setTeam(defaultTeam);
      });
  }, []);`;

content = content.replace(oldUseEffect, newUseEffect);

// Update saveTasks
const oldSaveTasks = `  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem("njb_work_tasks", JSON.stringify(newTasks));
  };`;

const newSaveTasks = `  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem("njb_work_tasks", JSON.stringify(newTasks));
    fetch('/api.php?action=sync_tasks', { method: 'POST', body: JSON.stringify({ tasks: newTasks }) }).catch(e => console.error(e));
  };`;
content = content.replace(oldSaveTasks, newSaveTasks);

// Update delete_task
const oldDeleteTask = /const newTasks = tasks\.filter\(t => t\.id !== taskToDelete\);\n\s*saveTasks\(newTasks\);/;
const newDeleteTask = `const newTasks = tasks.filter(t => t.id !== taskToDelete);
                  saveTasks(newTasks);
                  fetch('/api.php?action=delete_task', { method: 'POST', body: JSON.stringify({ id: taskToDelete }) }).catch(e=>console.error(e));`;
content = content.replace(oldDeleteTask, newDeleteTask);

// Update saveProjects
const oldSaveProjects = `  const saveProjects = (newProjects: ProjectTag[]) => {
    setProjects(newProjects);
    localStorage.setItem("njb_work_projects", JSON.stringify(newProjects));
  };`;
const newSaveProjects = `  const saveProjects = (newProjects: ProjectTag[]) => {
    setProjects(newProjects);
    localStorage.setItem("njb_work_projects", JSON.stringify(newProjects));
    fetch('/api.php?action=sync_projects', { method: 'POST', body: JSON.stringify({ projects: newProjects }) }).catch(e => console.error(e));
  };`;
content = content.replace(oldSaveProjects, newSaveProjects);

fs.writeFileSync('src/pages/Work.tsx', content);
console.log('React API integration patched!');
