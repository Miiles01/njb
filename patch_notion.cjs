const fs = require('fs');
const content = fs.readFileSync('src/pages/Work.tsx', 'utf8');

const replacement = `              {/* Description */}
              <div className="space-y-4 pt-4">
                <textarea 
                  value={selectedTask.description || ''}
                  onChange={(e) => {
                     e.target.style.height = 'auto';
                     e.target.style.height = e.target.scrollHeight + 'px';
                     handleUpdateSelectedTask({ description: e.target.value });
                  }}
                  onFocus={(e) => {
                     e.target.style.height = 'auto';
                     e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  placeholder="Añadir descripción o notas..."
                  className="w-full text-base leading-relaxed bg-transparent border-none outline-none focus:ring-0 px-0 resize-none overflow-hidden placeholder:text-muted-foreground/40 min-h-[40px] text-foreground"
                />

                {/* Blocks Stream */}
                <div className="space-y-1">
                  
                  {/* Checklist Blocks */}
                  {selectedTask.checklists?.map(item => (
                    <div key={item.id} className="flex items-start gap-3 group/block py-1">
                      <Checkbox 
                        id={\`sheet-\${item.id}\`} 
                        checked={item.completed}
                        onCheckedChange={() => toggleChecklist(selectedTask.id, item.id)}
                        className="mt-1"
                      />
                      <input 
                        value={item.text}
                        onChange={(e) => {
                           handleUpdateSelectedTask({
                              checklists: selectedTask.checklists.map(c => c.id === item.id ? { ...c, text: e.target.value } : c)
                           });
                        }}
                        className={\`text-sm leading-relaxed flex-1 bg-transparent border-none outline-none focus:ring-0 px-0 shadow-none \${item.completed ? 'text-muted-foreground line-through' : 'text-foreground'}\`}
                      />
                      <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover/block:opacity-100 transition-opacity" onClick={() => handleUpdateSelectedTask({ checklists: selectedTask.checklists.filter(c => c.id !== item.id) })}>
                        <X className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}

                  {/* Image Blocks */}
                  {selectedTask.images?.map(img => (
                    <div key={img.id} className="relative group/block rounded-xl overflow-hidden bg-muted my-4">
                      <img src={img.url} alt="Adjunto" className="w-full h-auto object-cover max-h-[500px]" />
                      <div className="absolute top-2 right-2 opacity-0 group-hover/block:opacity-100 transition-opacity">
                        <Button variant="secondary" size="icon" className="h-8 w-8 shadow-md" onClick={() => removeImage(img.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Link Blocks */}
                  {selectedTask.links?.map(link => (
                    <div key={link.id} className="flex items-center justify-between group/block bg-muted/20 p-2 rounded-lg border border-border/30 hover:bg-muted/40 transition-colors my-2">
                      <a href={link.url} target="_blank" rel="noreferrer" className="text-sm font-medium hover:underline flex items-center gap-3 truncate max-w-[90%]">
                        <div className="w-8 h-8 rounded bg-background flex items-center justify-center flex-shrink-0 shadow-sm border border-border/50">
                           <LinkIcon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="truncate">{link.label || link.url}</span>
                      </a>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover/block:opacity-100 transition-opacity" onClick={() => removeLink(link.id)}>
                        <X className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}

                </div>

                {/* The "+" Add Block Menu */}
                <div className="pt-4 flex flex-col gap-2">
                   <div className="flex items-center gap-2 group/add">
                     <DropdownMenu>
                       <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon" className="h-6 w-6 rounded-sm text-muted-foreground opacity-40 hover:opacity-100 hover:bg-muted">
                           <Plus className="h-4 w-4" />
                         </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="start" className="w-48 shadow-xl border-border/50">
                         <DropdownMenuItem onClick={() => setAddingBlock('checklist')} className="gap-2 cursor-pointer py-2">
                           <CheckSquare className="w-4 h-4 text-muted-foreground" /> Tarea (To-do)
                         </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => setAddingBlock('image')} className="gap-2 cursor-pointer py-2">
                           <ImageIcon className="w-4 h-4 text-muted-foreground" /> Imagen
                         </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => setAddingBlock('link')} className="gap-2 cursor-pointer py-2">
                           <LinkIcon className="w-4 h-4 text-muted-foreground" /> Enlace Web
                         </DropdownMenuItem>
                       </DropdownMenuContent>
                     </DropdownMenu>
                     <span className="text-sm text-muted-foreground opacity-0 group-hover/add:opacity-50 select-none transition-opacity">Añadir un bloque...</span>
                   </div>

                   {/* Inline Adding Forms */}
                   {addingBlock === 'checklist' && (
                     <div className="flex items-start gap-3 mt-1 animate-in fade-in slide-in-from-top-1">
                       <Checkbox disabled className="mt-1 opacity-50" />
                       <Input 
                          autoFocus 
                          placeholder="Escribe una tarea y presiona Enter..." 
                          className="h-auto py-0 text-sm flex-1 bg-transparent border-none focus-visible:ring-0 px-0 shadow-none text-foreground" 
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const input = e.currentTarget;
                              if(input.value.trim()) {
                                handleUpdateSelectedTask({ checklists: [...(selectedTask.checklists || []), { id: Date.now().toString(), text: input.value, completed: false }] });
                                input.value = '';
                              } else {
                                setAddingBlock(null);
                              }
                            }
                            if (e.key === 'Escape') setAddingBlock(null);
                          }}
                          onBlur={(e) => {
                             if (!e.target.value.trim()) setAddingBlock(null);
                          }}
                       />
                     </div>
                   )}
                   {addingBlock === 'image' && (
                     <div className="flex gap-2 items-center mt-2 p-2 bg-muted/30 rounded-lg border border-border/50 animate-in fade-in zoom-in-95">
                       <Input autoFocus placeholder="Pega la URL de la imagen y presiona Enter..." className="h-8 text-sm flex-1 bg-transparent border-none focus-visible:ring-0 shadow-none" 
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const input = e.currentTarget;
                              if(input.value.trim()) {
                                handleUpdateSelectedTask({ images: [...(selectedTask.images || []), { id: Date.now().toString(), url: input.value }] });
                                setAddingBlock(null);
                              }
                            }
                            if (e.key === 'Escape') setAddingBlock(null);
                          }}
                       />
                       <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setAddingBlock(null)}><X className="w-4 h-4" /></Button>
                     </div>
                   )}
                   {addingBlock === 'link' && (
                     <div className="flex gap-2 items-center mt-2 p-2 bg-muted/30 rounded-lg border border-border/50 animate-in fade-in zoom-in-95">
                       <Input autoFocus placeholder="URL..." id="new-link-url" className="h-8 text-xs flex-1 border-none bg-transparent shadow-none" />
                       <Input placeholder="Título (Opcional)" id="new-link-label" className="h-8 text-xs flex-1 border-none bg-transparent shadow-none" onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                              const urlInput = document.getElementById('new-link-url');
                              const labelInput = document.getElementById('new-link-label');
                              if(urlInput.value.trim()) {
                                handleUpdateSelectedTask({ links: [...(selectedTask.links || []), { id: Date.now().toString(), url: urlInput.value, label: labelInput.value }] });
                                setAddingBlock(null);
                              }
                           }
                           if (e.key === 'Escape') setAddingBlock(null);
                       }}/>
                       <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setAddingBlock(null)}><X className="w-4 h-4" /></Button>
                     </div>
                   )}
                </div>
              </div>`;

const searchStart = '              {/* Description */}';
const searchEnd = '                  }}><Plus className="w-4 h-4" /></Button>\n                </div>';

const startIndex = content.indexOf(searchStart);
const endIndex = content.indexOf(searchEnd, startIndex) + searchEnd.length;

if (startIndex !== -1 && endIndex !== -1) {
   const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex);
   fs.writeFileSync('src/pages/Work.tsx', newContent);
   console.log('Successfully patched!');
} else {
   console.log('Could not find boundaries.');
   console.log('Start:', startIndex, 'End:', endIndex);
}
