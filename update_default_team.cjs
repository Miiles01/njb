const fs = require('fs');
let content = fs.readFileSync('src/pages/Work.tsx', 'utf8');

const defaultTeamRegex = /const defaultTeam: TeamMember\[\] = \[\s*\{ id: "m1".*?\},\s*\{ id: "m2".*?\}/;
const newDefaultTeam = `const defaultTeam: TeamMember[] = [
  { id: "m1", name: "Michael", avatarUrl: "" },
  { id: "m2", name: "Arturo", avatarUrl: "/avatars/arturo.png" },
  { id: "m3", name: "Pepe", avatarUrl: "" },
  { id: "m4", name: "Ale", avatarUrl: "" }`;

content = content.replace(defaultTeamRegex, newDefaultTeam);

fs.writeFileSync('src/pages/Work.tsx', content);
console.log('Updated default team');
