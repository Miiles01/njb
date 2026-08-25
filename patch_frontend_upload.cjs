const fs = require('fs');
let content = fs.readFileSync('src/pages/Work.tsx', 'utf8');

// 1. Ensure `Upload` icon is imported from `lucide-react`
if (!content.includes('Upload,')) {
    content = content.replace(/import \{([\s\S]*?)Trash2,/, 'import { Upload, $1Trash2,');
}

// 2. Add handleAvatarUpload inside the component
const uploadLogic = `
  const handleAvatarUpload = async (userId: string, file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('userId', userId);
    
    try {
        const res = await fetch('/api.php?action=upload_avatar', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.success) {
            handleUpdateAvatar(userId, data.url);
        } else {
            toast.error(data.error || "Error al subir la foto");
        }
    } catch (e) {
        toast.error("Error de conexión");
    }
  };

  const getSortedTasksByStatus = (status: Status) => {`;
content = content.replace(/const getSortedTasksByStatus = \(status: Status\) => \{/, uploadLogic);

// 3. Replace the UI for the team member rendering in the Sheet
const oldMemberJSX = /<Avatar className="w-10 h-10 border-2 border-white dark:border-card">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/m;
const newMemberJSX = `<div className="relative group/avatar cursor-pointer shrink-0" onClick={() => document.getElementById(\`avatar-upload-\${member.id}\`)?.click()}>
                            <Avatar className="w-10 h-10 border-2 border-white dark:border-card group-hover/avatar:opacity-70 transition-opacity">
                              <AvatarImage src={member.avatarUrl} />
                              <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 bg-black/40 rounded-full transition-opacity">
                              <Upload className="w-4 h-4 text-white" />
                            </div>
                            <input 
                              id={\`avatar-upload-\${member.id}\`}
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleAvatarUpload(member.id, e.target.files[0]);
                                }
                              }}
                            />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">Haz clic en la foto para cambiarla</p>
                          </div>
                        </div>`;
content = content.replace(oldMemberJSX, newMemberJSX);

fs.writeFileSync('src/pages/Work.tsx', content);
