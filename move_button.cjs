const fs = require('fs');
let content = fs.readFileSync('src/pages/Work.tsx', 'utf8');

// 1. Remove the button from the bottom
const buttonRegex = /                <Button \n                  variant="ghost" \n                  className="w-full mt-2 justify-start text-muted-foreground hover:bg-muted\/50 hover:text-foreground"\n                  onClick=\{\(\) => handleCreateTask\(column\)\}\n                >\n                  <Plus className="w-4 h-4 mr-2" \/> \{t\("addTask"\)\.replace\("\+ ", ""\)\}\n                <\/Button>\n/m;

if (buttonRegex.test(content)) {
    content = content.replace(buttonRegex, '');
} else {
    console.log('Button not found at the bottom');
}

// 2. Insert it at the top, just inside the flex column list
const listStartRegex = /              <div className="flex flex-col gap-3 relative">\n/;
const newButtonHtml = `              <div className="flex flex-col gap-3 relative">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  onClick={() => handleCreateTask(column)}
                >
                  <Plus className="w-4 h-4 mr-2" /> {t("addTask").replace("+ ", "")}
                </Button>\n`;

content = content.replace(listStartRegex, newButtonHtml);

fs.writeFileSync('src/pages/Work.tsx', content);
console.log('Button moved to top!');
