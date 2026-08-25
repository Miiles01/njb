const fs = require('fs');
let content = fs.readFileSync('src/pages/Work.tsx', 'utf8');
content = content.replace(/import \{ Upload,  Card/, 'import { Card');
content = content.replace(/import \{([\s\S]*?)Trash2([\s\S]*?)\} from "lucide-react";/, 'import { Upload, $1Trash2$2} from "lucide-react";');
fs.writeFileSync('src/pages/Work.tsx', content);
