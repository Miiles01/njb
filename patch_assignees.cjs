const fs = require('fs');
let content = fs.readFileSync('src/pages/Work.tsx', 'utf8');

// 1. Update Task type
content = content.replace(
  'assigneeId: string | null;',
  'assigneeId?: string | null;\n  assigneeIds?: string[];'
);

// 2. Update default tasks data (not super necessary but good practice)
content = content.replace('assigneeId: "m1",', 'assigneeIds: ["m1"],');
content = content.replace('assigneeId: "m2",', 'assigneeIds: ["m2"],');
content = content.replace('assigneeId: null,', 'assigneeIds: [],');

// 3. Update Kanban Board Card Avatars
const boardCardAvatarOld = `                              <div className="flex -space-x-2">
                                <Avatar className="w-6 h-6 border-2 border-white dark:border-card">
                                  <AvatarImage src={assignee.avatarUrl} />
                                  <AvatarFallback className="text-[10px]">{assignee.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                              </div>`;
const boardCardAvatarNew = `                              <div className="flex -space-x-2">
                                {(() => {
                                   const assignees = (task.assigneeIds || (task.assigneeId ? [task.assigneeId] : [])).map(id => getAssignee(id)).filter(Boolean);
                                   if(assignees.length === 0) return null;
                                   return assignees.map(a => (
                                     <Avatar key={a.id} className="w-6 h-6 border-2 border-white dark:border-card">
                                       <AvatarImage src={a.avatarUrl} />
                                       <AvatarFallback className="text-[10px]">{a.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                     </Avatar>
                                   ));
                                })()}
                              </div>`;

content = content.replace(/const assignee = getAssignee\(task\.assigneeId\);\s*if \(!assignee\) return null;\s*return \(\s*<div className="flex -space-x-2">[\s\S]*?<\/div>\s*\);/, `return (
                              ${boardCardAvatarNew}
                            );`);


// 4. Update Task Details Sidebar Assignment Block
const sidebarAssignOld = `              {/* Assignment */}
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-muted-foreground">Asignado a</span>
                <Select value={selectedTask.assigneeId || "none"} onValueChange={(val) => handleUpdateSelectedTask({ assigneeId: val === "none" ? null : val })}>
                  <SelectTrigger className="w-auto h-8 border-none shadow-none gap-2">
                    {getAssignee(selectedTask.assigneeId) ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={getAssignee(selectedTask.assigneeId)?.avatarUrl} />
                          <AvatarFallback className="text-[10px]">{getAssignee(selectedTask.assigneeId)?.name.substring(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{getAssignee(selectedTask.assigneeId)?.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Sin asignar</span>
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sin Asignar</SelectItem>
                    {team.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>`;

const sidebarAssignNew = `              {/* Assignment */}
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-muted-foreground">Asignado a</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex items-center gap-2 hover:bg-muted/50 p-1.5 rounded-lg transition-colors border-none outline-none">
                      {(() => {
                        const assignees = (selectedTask.assigneeIds || (selectedTask.assigneeId ? [selectedTask.assigneeId] : [])).map(id => getAssignee(id)).filter(Boolean);
                        if (assignees.length === 0) return <span className="text-sm text-muted-foreground">Sin asignar</span>;
                        return (
                          <div className="flex items-center">
                             <div className="flex -space-x-2 mr-2">
                               {assignees.map(a => (
                                 <Avatar key={a.id} className="w-6 h-6 border-2 border-white dark:border-card">
                                   <AvatarImage src={a.avatarUrl} />
                                   <AvatarFallback className="text-[10px]">{a.name.substring(0,2).toUpperCase()}</AvatarFallback>
                                 </Avatar>
                               ))}
                             </div>
                             <span className="text-sm font-medium truncate max-w-[120px]">{assignees.length === 1 ? assignees[0].name : \`\${assignees.length} personas\`}</span>
                          </div>
                        );
                      })()}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2 shadow-xl border-border/50 rounded-xl bg-white dark:bg-card" align="end">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-muted-foreground px-2 mb-2 block uppercase tracking-wider">Miembros del equipo</span>
                      {team.map(m => {
                         const assignees = selectedTask.assigneeIds || (selectedTask.assigneeId ? [selectedTask.assigneeId] : []);
                         const isAssigned = assignees.includes(m.id);
                         return (
                           <button 
                             key={m.id}
                             className="w-full flex items-center justify-between px-2 py-1.5 text-sm rounded-lg hover:bg-muted transition-colors text-left"
                             onClick={() => {
                                let newAssignees = [...assignees];
                                if (isAssigned) newAssignees = newAssignees.filter(id => id !== m.id);
                                else newAssignees.push(m.id);
                                handleUpdateSelectedTask({ assigneeIds: newAssignees });
                             }}
                           >
                             <div className="flex items-center gap-2">
                               <Avatar className="w-6 h-6">
                                 <AvatarImage src={m.avatarUrl} />
                                 <AvatarFallback className="text-[10px]">{m.name.substring(0,2).toUpperCase()}</AvatarFallback>
                               </Avatar>
                               <span className="truncate">{m.name}</span>
                             </div>
                             {isAssigned && <CheckSquare className="w-4 h-4 text-primary" />}
                           </button>
                         )
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>`;

content = content.replace(sidebarAssignOld, sidebarAssignNew);

// Increase overall padding of Task Details Sidebar
content = content.replace(
  '<div className="absolute inset-0 overflow-y-auto p-8 pt-12 pb-24',
  '<div className="absolute inset-0 overflow-y-auto p-6 sm:p-10 pt-14 sm:pt-20 pb-32'
);

fs.writeFileSync('src/pages/Work.tsx', content);
console.log('Assignees patched!');
