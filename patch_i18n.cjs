const fs = require('fs');
let content = fs.readFileSync('src/pages/Work.tsx', 'utf8');

const i18nCode = `
const translations = {
  en: {
    boardTitle: "Work Board",
    boardDesc: "Manage NJB tasks and team",
    teamBtn: "Team",
    langBtn: "Language",
    newTask: "New Task",
    addTask: "+ Add Task",
    unassigned: "Unassigned",
    untitled: "Untitled",
    addSubtitle: "Add subtitle...",
    addDesc: "Add description or notes...",
    teamManagement: "Team Management",
    newMember: "New member...",
    priority: "Priority",
    Nuevas: "New",
    Activas: "Active",
    Finalizadas: "Done",
    Alta: "High",
    Media: "Medium",
    Baja: "Low",
    deleteMsg: "Are you sure you want to delete this task?",
    cancel: "Cancel",
    confirm: "Yes, delete",
    members: "Team Members",
    noTags: "No tags",
    customTags: "Custom tags",
    searchTag: "Search tag...",
    create: "Create",
    addIcon: "Icon",
    saveTag: "Save and apply",
    tasksCount: "tasks",
    oneTask: "1 task",
    personsCount: "people"
  },
  es: {
    boardTitle: "Tablero de Trabajo",
    boardDesc: "Gestiona las tareas y el equipo NJB",
    teamBtn: "Equipo",
    langBtn: "Idioma",
    newTask: "Nueva Tarea",
    addTask: "+ Añadir Tarea",
    unassigned: "Sin asignar",
    untitled: "Sin título",
    addSubtitle: "Añadir subtítulo...",
    addDesc: "Añadir descripción o notas...",
    teamManagement: "Gestión de Equipo",
    newMember: "Nuevo miembro...",
    priority: "Prioridad",
    Nuevas: "Nuevas",
    Activas: "Activas",
    Finalizadas: "Finalizadas",
    Alta: "Alta",
    Media: "Media",
    Baja: "Baja",
    deleteMsg: "¿Estás seguro que deseas eliminar esta tarea?",
    cancel: "Cancelar",
    confirm: "Sí, eliminar",
    members: "Miembros del equipo",
    noTags: "Sin etiqueta",
    customTags: "Etiquetas personalizadas",
    searchTag: "Buscar etiqueta...",
    create: "Crear",
    addIcon: "Icono",
    saveTag: "Guardar y aplicar",
    tasksCount: "tareas",
    oneTask: "1 tarea",
    personsCount: "personas"
  },
  fr: {
    boardTitle: "Tableau de Travail",
    boardDesc: "Gérer les tâches et l'équipe NJB",
    teamBtn: "Équipe",
    langBtn: "Langue",
    newTask: "Nouvelle Tâche",
    addTask: "+ Ajouter une Tâche",
    unassigned: "Non assigné",
    untitled: "Sans titre",
    addSubtitle: "Ajouter un sous-titre...",
    addDesc: "Ajouter une description ou des notes...",
    teamManagement: "Gestion de l'Équipe",
    newMember: "Nouveau membre...",
    priority: "Priorité",
    Nuevas: "Nouveau",
    Activas: "Actif",
    Finalizadas: "Terminé",
    Alta: "Haute",
    Media: "Moyenne",
    Baja: "Basse",
    deleteMsg: "Êtes-vous sûr de vouloir supprimer cette tâche ?",
    cancel: "Annuler",
    confirm: "Oui, supprimer",
    members: "Membres de l'équipe",
    noTags: "Sans étiquette",
    customTags: "Étiquettes personnalisées",
    searchTag: "Rechercher une étiquette...",
    create: "Créer",
    addIcon: "Icône",
    saveTag: "Enregistrer et appliquer",
    tasksCount: "tâches",
    oneTask: "1 tâche",
    personsCount: "personnes"
  }
};
`;

// Inject i18nCode after defaultProjects
content = content.replace(/const defaultProjects: ProjectTag\[\] = \[[\s\S]*?\];/m, match => match + '\n' + i18nCode);

// Inject lang state inside Work function
const workFuncStart = /export default function Work\(\) \{/;
const langStateCode = `
  const [lang, setLang] = useState<'en' | 'es' | 'fr'>(() => (localStorage.getItem('njb_lang') as 'en'|'es'|'fr') || 'en');
  const t = (key: keyof typeof translations['en']): string => translations[lang][key] || translations['en'][key];
  useEffect(() => { localStorage.setItem('njb_lang', lang); }, [lang]);
`;
content = content.replace(workFuncStart, match => match + langStateCode);

// Add Language selector dropdown next to Equipo button
const equipoBtnRegex = /<SheetTrigger asChild>\s*<Button variant="outline" className="gap-2">\s*<Users className="w-4 h-4" \/>\s*Equipo\s*<\/Button>\s*<\/SheetTrigger>/m;
const langDropdownCode = `
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" className="gap-2">
      <Globe className="w-4 h-4" />
      {lang.toUpperCase()}
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-32 bg-white dark:bg-card">
    <DropdownMenuItem onClick={() => setLang('en')}>English</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setLang('es')}>Español</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setLang('fr')}>Français</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

<SheetTrigger asChild>
  <Button variant="outline" className="gap-2">
    <Users className="w-4 h-4" />
    {t('teamBtn')}
  </Button>
</SheetTrigger>
`;
content = content.replace(equipoBtnRegex, langDropdownCode);

// Replace hardcoded strings
content = content.replace(/>Tablero de Trabajo<\/h1>/g, '>{t("boardTitle")}</h1>');
content = content.replace(/>Gestiona las tareas y el equipo NJB<\/p>/g, '>{t("boardDesc")}</p>');
content = content.replace(/>Nueva Tarea<\/Button>/g, '>{t("newTask")}</Button>');
content = content.replace(/>\+ Añadir Tarea<\/Button>/g, '>{t("addTask")}</Button>');
content = content.replace(/>Sin asignar<\/span>/g, '>{t("unassigned")}</span>');
content = content.replace(/placeholder="Sin título"/g, 'placeholder={t("untitled")}');
content = content.replace(/placeholder="Añadir subtítulo\.\.\."/g, 'placeholder={t("addSubtitle")}');
content = content.replace(/placeholder="Añadir descripción o notas\.\.\."/g, 'placeholder={t("addDesc")}');
content = content.replace(/>Gestión de Equipo<\/SheetTitle>/g, '>{t("teamManagement")}</SheetTitle>');
content = content.replace(/placeholder="Nuevo miembro\.\.\."/g, 'placeholder={t("newMember")}');
content = content.replace(/>Miembros del equipo<\/span>/g, '>{t("members")}</span>');
content = content.replace(/>Sin etiqueta<\/span>/g, '>{t("noTags")}</span>');
content = content.replace(/>Etiquetas personalizadas<\/span>/g, '>{t("customTags")}</span>');
content = content.replace(/placeholder="Buscar etiqueta\.\.\."/g, 'placeholder={t("searchTag")}');
content = content.replace(/>Crear<\/Button>/g, '>{t("create")}</Button>');
content = content.replace(/>Icono<\/span>/g, '>{t("addIcon")}</span>');
content = content.replace(/>Guardar y aplicar<\/Button>/g, '>{t("saveTag")}</Button>');
content = content.replace(/>Cancelar<\/Button>/g, '>{t("cancel")}</Button>');
content = content.replace(/>Sí, eliminar<\/Button>/g, '>{t("confirm")}</Button>');
content = content.replace(/>¿Estás seguro de que deseas eliminar esta tarea\?<\/p>/g, '>{t("deleteMsg")}</p>');
content = content.replace(/>¿Estás seguro que deseas eliminar esta tarea\?<\/p>/g, '>{t("deleteMsg")}</p>');

// For dynamic status columns (h2 inside loop)
content = content.replace(/<h2 className="font-semibold text-lg flex items-center justify-between">/g, '<h2 className="font-semibold text-lg flex items-center justify-between">');
// Wait, the column name is {column}. I need to change it to {t(column)}
content = content.replace(/\{column\} <span className="text-sm font-normal text-muted-foreground ml-2">/g, "{t(column as any)} <span className=\"text-sm font-normal text-muted-foreground ml-2\">");

// Priority string inside card
// {task.priority} -> {t(task.priority as any)}
content = content.replace(/>\{task\.priority\}<\/span>/g, '>{t(task.priority as any)}</span>');
content = content.replace(/>\{selectedTask\.priority\}<\/span>/g, '>{t(selectedTask.priority as any)}</span>');
// Priority trigger in select
content = content.replace(/<SelectValue \/>/g, '<SelectValue placeholder={t(selectedTask?.priority as any)} />');

// tasks count: \`\${columnTasks.length} tareas\`
content = content.replace(/\{columnTasks\.length\} tareas/g, '{columnTasks.length} {columnTasks.length === 1 ? t("oneTask").split(" ")[1] : t("tasksCount")}');

// persons count: \`\${assignees.length} personas\`
content = content.replace(/\{assignees\.length\} personas/g, '{assignees.length} {t("personsCount")}');


fs.writeFileSync('src/pages/Work.tsx', content);
console.log('I18n patch done!');
