const fs = require('fs');
let content = fs.readFileSync('src/pages/Work.tsx', 'utf8');

const saveTeamRegex = /const saveTeam = \(newTeam: TeamMember\[\]\) => \{\s*setTeam\(newTeam\);\s*localStorage\.setItem\("njb_work_team", JSON\.stringify\(newTeam\)\);\s*\};/m;
const saveTeamFixed = `const saveTeam = (newTeam: TeamMember[]) => {
    setTeam(newTeam);
    localStorage.setItem("njb_work_team", JSON.stringify(newTeam));
    fetch('/api.php?action=sync_team', { method: 'POST', body: JSON.stringify({ team: newTeam }) }).catch(e => console.error(e));
  };`;

if (saveTeamRegex.test(content)) {
    content = content.replace(saveTeamRegex, saveTeamFixed);
    fs.writeFileSync('src/pages/Work.tsx', content);
    console.log("Fixed saveTeam");
} else {
    console.log("Regex not matched");
}
