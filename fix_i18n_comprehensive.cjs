const fs = require('fs');
let content = fs.readFileSync('src/pages/Work.tsx', 'utf8');

// Inject new translations
const enRepl = `    delete: "Delete",
    loginTitle: "Restricted Access",
    loginDesc: "Enter the password to access the board.",
    loginInput: "Password",
    loginBtn: "Enter",
    toastWrongPass: "Incorrect password",
    toastUserAdded: "User added",
    toastAvatarUpdated: "Avatar updated",
    toastTaskDeleted: "Task deleted",
    addBlock: "Add a block...",
    newTagBtn: "New tag",
    assignedTo: "Assigned to"`;
const esRepl = `    delete: "Eliminar",
    loginTitle: "Acceso Restringido",
    loginDesc: "Ingresa la contraseña para acceder al panel de trabajo.",
    loginInput: "Contraseña",
    loginBtn: "Ingresar",
    toastWrongPass: "Contraseña incorrecta",
    toastUserAdded: "Usuario añadido",
    toastAvatarUpdated: "Avatar actualizado",
    toastTaskDeleted: "Tarea eliminada",
    addBlock: "Añadir un bloque...",
    newTagBtn: "Nueva etiqueta",
    assignedTo: "Asignado a"`;
const frRepl = `    delete: "Supprimer",
    loginTitle: "Accès Restreint",
    loginDesc: "Entrez le mot de passe pour accéder au tableau.",
    loginInput: "Mot de passe",
    loginBtn: "Entrer",
    toastWrongPass: "Mot de passe incorrect",
    toastUserAdded: "Utilisateur ajouté",
    toastAvatarUpdated: "Avatar mis à jour",
    toastTaskDeleted: "Tâche supprimée",
    addBlock: "Ajouter un bloc...",
    newTagBtn: "Nouvelle étiquette",
    assignedTo: "Assigné à"`;

content = content.replace(/    delete: "Delete"/, enRepl);
content = content.replace(/    delete: "Eliminar"/, esRepl);
content = content.replace(/    delete: "Supprimer"/, frRepl);

// Replace Spanish UI texts with translation tags

// Toasts
content = content.replace(/toast\.error\("Contraseña incorrecta"\)/g, 'toast.error(t("toastWrongPass"))');
content = content.replace(/toast\.success\("Usuario añadido"\)/g, 'toast.success(t("toastUserAdded"))');
content = content.replace(/toast\.success\("Avatar actualizado"\)/g, 'toast.success(t("toastAvatarUpdated"))');
content = content.replace(/toast\.success\("Tarea eliminada"\)/g, 'toast.success(t("toastTaskDeleted"))');

// Login screen
content = content.replace(/>Acceso Restringido<\/CardTitle>/g, '>{t("loginTitle")}</CardTitle>');
content = content.replace(/>Ingresa la contraseña para acceder al panel de trabajo\.<\/p>/g, '>{t("loginDesc")}</p>');
content = content.replace(/placeholder="Contraseña"/g, 'placeholder={t("loginInput")}');
content = content.replace(/>Ingresar<\/Button>/g, '>{t("loginBtn")}</Button>');

// Bottom "Add Task" button (Añadir Tarea)
content = content.replace(/<Plus className="w-4 h-4 mr-2" \/> Añadir Tarea/g, '<Plus className="w-4 h-4 mr-2" /> {t("addTask").replace("+ ", "")}');

// Top "Nueva Tarea" button
content = content.replace(/<Plus className="w-4 h-4" \/>\s*Nueva Tarea/m, '<Plus className="w-4 h-4" />\n              {t("newTask")}');

// New tag
content = content.replace(/>Nueva etiqueta<\/span>/g, '>{t("newTagBtn")}</span>');

// Assigned to
content = content.replace(/>Asignado a<\/span>/g, '>{t("assignedTo")}</span>');

// Add a block...
content = content.replace(/>Añadir un bloque\.\.\.<\/span>/g, '>{t("addBlock")}</span>');

fs.writeFileSync('src/pages/Work.tsx', content);
console.log('Comprehensive I18n fix done!');
