const fs = require('fs');
let content = fs.readFileSync('src/pages/Work.tsx', 'utf8');

// 1. Fix the template literal for personsCount
content = content.replace(/\`\$\{assignees\.length\} \{t\("personsCount"\)\}\`/g, '\`${assignees.length} ${t("personsCount")}\`');

// 2. Add missing translations to the dictionary
const enReplacement = `    personsCount: "people",
    deleteTaskBtn: "Delete Task",
    deleteTaskDesc: "Are you sure you want to delete this task? This action cannot be undone.",
    checklistPlaceholder: "Write a task and press Enter...",
    delete: "Delete"`;

const esReplacement = `    personsCount: "personas",
    deleteTaskBtn: "Eliminar Tarea",
    deleteTaskDesc: "¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer.",
    checklistPlaceholder: "Escribe una tarea y presiona Enter...",
    delete: "Eliminar"`;

const frReplacement = `    personsCount: "personnes",
    deleteTaskBtn: "Supprimer la tâche",
    deleteTaskDesc: "Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action est irréversible.",
    checklistPlaceholder: "Écrivez une tâche et appuyez sur Entrée...",
    delete: "Supprimer"`;

content = content.replace(/    personsCount: "people"/, enReplacement);
content = content.replace(/    personsCount: "personas"/, esReplacement);
content = content.replace(/    personsCount: "personnes"/, frReplacement);

// 3. Replace the text in JSX
content = content.replace(/>Eliminar Tarea<\/DialogTitle>/g, '>{t("deleteTaskBtn")}</DialogTitle>');
content = content.replace(/>Eliminar Tarea<\/Button>/g, '>{t("deleteTaskBtn")}</Button>');
content = content.replace(/>¿Estás seguro de que quieres eliminar esta tarea\? Esta acción no se puede deshacer\.<\/p>/g, '>{t("deleteTaskDesc")}</p>');
content = content.replace(/placeholder="Escribe una tarea y presiona Enter\.\.\."/g, 'placeholder={t("checklistPlaceholder")}');
content = content.replace(/>Eliminar<\/Button>/g, '>{t("delete")}</Button>');

fs.writeFileSync('src/pages/Work.tsx', content);
console.log('Fixed missing translations');
