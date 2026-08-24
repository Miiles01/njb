const fs = require('fs');
const content = fs.readFileSync('src/pages/Work.tsx', 'utf8');

const targetStr = `                  <span className="inline-flex items-center gap-1 text-xs font-medium bg-primary/5 text-primary py-1 px-3 rounded-full">
                    <Folder className="w-3 h-3" />
                    {selectedTask.project}
                  </span>`;

const replacement = `                  <Popover open={tagDropdownOpen} onOpenChange={(val) => { setTagDropdownOpen(val); if(!val) { setTagIsCreating(false); setTagSearch(""); } }}>
                    <PopoverTrigger asChild>
                      <button className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/5 hover:bg-primary/10 text-primary py-1 px-3 rounded-full transition-colors cursor-pointer">
                        {(() => {
                           const proj = projects.find(p => p.name === selectedTask.project);
                           const Icon = proj && ICON_MAP[proj.icon] ? ICON_MAP[proj.icon] : Folder;
                           return <Icon className="w-3.5 h-3.5" />;
                        })()}
                        {selectedTask.project || "Sin etiqueta"}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-3 shadow-xl border-border/50 rounded-xl bg-white dark:bg-card" align="start">
                       {!tagIsCreating ? (
                         <div className="space-y-3">
                           <Input 
                             placeholder="Buscar etiqueta..." 
                             value={tagSearch} 
                             onChange={e => setTagSearch(e.target.value)}
                             className="h-8 text-xs bg-muted/30 border-none shadow-none focus-visible:ring-0"
                             autoFocus
                           />
                           <div className="max-h-48 overflow-y-auto space-y-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full">
                             {projects.filter(p => p.name.toLowerCase().includes(tagSearch.toLowerCase())).map(p => {
                                const PIcon = ICON_MAP[p.icon] || Folder;
                                return (
                                  <button 
                                    key={p.id}
                                    onClick={() => {
                                       handleUpdateSelectedTask({ project: p.name });
                                       setTagDropdownOpen(false);
                                    }}
                                    className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg hover:bg-muted/50 transition-colors text-left"
                                  >
                                     <PIcon className="w-4 h-4 text-muted-foreground" />
                                     <span className="truncate">{p.name}</span>
                                  </button>
                                )
                             })}
                             {tagSearch && !projects.find(p => p.name.toLowerCase() === tagSearch.toLowerCase()) && (
                                <button 
                                  onClick={() => setTagIsCreating(true)}
                                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg hover:bg-primary/10 text-primary transition-colors text-left mt-1"
                                >
                                  <Plus className="w-4 h-4" />
                                  Crear "{tagSearch}"
                                </button>
                             )}
                           </div>
                         </div>
                       ) : (
                         <div className="space-y-4">
                           <div className="flex items-center gap-2">
                             <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setTagIsCreating(false)}>
                               <ArrowLeft className="w-3 h-3" />
                             </Button>
                             <span className="text-xs font-medium">Nueva etiqueta</span>
                           </div>
                           <Input 
                             value={tagSearch} 
                             onChange={e => setTagSearch(e.target.value)}
                             className="h-8 text-xs bg-muted/30 border-none shadow-none focus-visible:ring-0"
                             placeholder="Nombre..."
                           />
                           <div>
                             <span className="text-[10px] uppercase text-muted-foreground font-semibold mb-2 block tracking-wider">Icono</span>
                             <div className="grid grid-cols-5 gap-1">
                               {Object.keys(ICON_MAP).map(iconName => {
                                  const IconComp = ICON_MAP[iconName];
                                  return (
                                    <button
                                      key={iconName}
                                      onClick={() => setTagSelectedIcon(iconName)}
                                      className={\`p-1.5 rounded-md flex items-center justify-center transition-colors \${tagSelectedIcon === iconName ? 'bg-primary/20 text-primary' : 'hover:bg-muted text-muted-foreground'}\`}
                                    >
                                      <IconComp className="w-4 h-4" />
                                    </button>
                                  )
                               })}
                             </div>
                           </div>
                           <Button 
                             className="w-full h-8 text-xs" 
                             onClick={() => {
                               if(!tagSearch.trim()) return;
                               const newProj = { id: Date.now().toString(), name: tagSearch, icon: tagSelectedIcon };
                               saveProjects([...projects, newProj]);
                               handleUpdateSelectedTask({ project: tagSearch });
                               setTagIsCreating(false);
                               setTagDropdownOpen(false);
                               setTagSearch("");
                             }}
                           >
                             Guardar y aplicar
                           </Button>
                         </div>
                       )}
                    </PopoverContent>
                  </Popover>`;

if (content.includes(targetStr)) {
  fs.writeFileSync('src/pages/Work.tsx', content.replace(targetStr, replacement));
  console.log("Successfully replaced the UI block");
} else {
  console.log("Target string not found!");
}
