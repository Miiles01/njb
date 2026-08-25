const fs = require('fs');
let content = fs.readFileSync('src/pages/Work.tsx', 'utf8');

const targetStr = `                          <Avatar>
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
                          </div>`;

const replacement = `<div className="relative group/avatar cursor-pointer shrink-0" onClick={() => document.getElementById(\`avatar-upload-\${member.id}\`)?.click()}>
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
                            <p className="text-xs text-muted-foreground">Haz clic en la foto para subir imagen</p>
                          </div>`;

content = content.replace(targetStr, replacement);
fs.writeFileSync('src/pages/Work.tsx', content);
console.log('UI patch applied');
