const fs = require('fs');
const content = fs.readFileSync('src/pages/Work.tsx', 'utf8');

// 1. Add imports
let newContent = content.replace(
  'import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";',
  `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";\nimport { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";`
);

newContent = newContent.replace(
  'import { Lock, Plus, CheckSquare, User, Flag, Folder, Users, GripVertical, Image as ImageIcon, Link as LinkIcon, ExternalLink, X, Trash2 } from "lucide-react";',
  `import { Lock, Plus, CheckSquare, User, Flag, Folder, Users, GripVertical, Image as ImageIcon, Link as LinkIcon, ExternalLink, X, Trash2, Book, Globe, Smartphone, Video, Search, Hash, Megaphone, Palette, Code, PenTool, Layout, Type, ArrowLeft } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Book, Globe, Smartphone, Video, Search, Folder, Hash, Megaphone, Palette, Code, PenTool, Layout, Type
};

type ProjectTag = { id: string; name: string; icon: string; color?: string; };
const defaultProjects: ProjectTag[] = [
  { id: '1', name: 'Manual de identidad', icon: 'Book' },
  { id: '2', name: 'Página web', icon: 'Globe' },
  { id: '3', name: 'Contenido para redes sociales', icon: 'Smartphone' },
  { id: '4', name: 'Edición de video', icon: 'Video' },
  { id: '5', name: 'Investigación', icon: 'Search' }
];`
);

// 2. Add projects state inside Work component
newContent = newContent.replace(
  'const [addingBlock, setAddingBlock] = useState<\'checklist\' | \'link\' | \'image\' | null>(null);',
  `const [addingBlock, setAddingBlock] = useState<'checklist' | 'link' | 'image' | null>(null);
  const [projects, setProjects] = useState<ProjectTag[]>(() => {
    const saved = localStorage.getItem("njb_work_projects");
    return saved ? JSON.parse(saved) : defaultProjects;
  });
  const saveProjects = (newProjects: ProjectTag[]) => {
    setProjects(newProjects);
    localStorage.setItem("njb_work_projects", JSON.stringify(newProjects));
  };
  
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const [tagIsCreating, setTagIsCreating] = useState(false);
  const [tagSelectedIcon, setTagSelectedIcon] = useState('Folder');`
);

fs.writeFileSync('src/pages/Work.tsx', newContent);
console.log('Imports and state added');
