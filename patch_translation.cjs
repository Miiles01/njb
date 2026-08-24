const fs = require('fs');
let content = fs.readFileSync('src/pages/Work.tsx', 'utf8');

const txtComponentCode = `
const translationCache = new Map<string, string>();
const translateApi = async (text: string, targetLang: string) => {
  if (!text || text.trim() === '') return text;
  if (targetLang === 'es') return text;
  const key = \`\${targetLang}:\${text}\`;
  if (translationCache.has(key)) return translationCache.get(key);
  try {
      const res = await fetch(\`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=\${targetLang}&dt=t&q=\${encodeURIComponent(text)}\`);
      const data = await res.json();
      const translated = data[0].map((arr: any) => arr[0]).join('');
      translationCache.set(key, translated);
      return translated;
  } catch (e) { return text; }
};

const Txt = ({ children, lang }: { children: React.ReactNode, lang: string }) => {
  const text = typeof children === 'string' ? children : '';
  const [val, setVal] = useState(text);

  useEffect(() => {
    if (!text || lang === 'es') { 
        setVal(text); 
        return; 
    }
    let active = true;
    setVal(text);
    translateApi(text, lang).then(res => {
      if (active && res) setVal(res);
    });
    return () => { active = false; };
  }, [text, lang]);

  if (typeof children !== 'string') return <>{children}</>;
  return <>{val}</>;
};
`;

// Insert Txt component after the translations object
content = content.replace(/(const translations = \{[\s\S]*?\};\n)/, match => match + '\n' + txtComponentCode);

// Wrap Kanban card properties with Txt
content = content.replace(/\{task\.project\}/g, '<Txt lang={lang}>{task.project}</Txt>');
content = content.replace(/\{task\.title\}/g, '<Txt lang={lang}>{task.title}</Txt>');
content = content.replace(/\{task\.subtitle\}/g, '<Txt lang={lang}>{task.subtitle}</Txt>');
content = content.replace(/\{task\.description\}/g, '<Txt lang={lang}>{task.description}</Txt>');

// Also update defaultTeam for Arturo's avatar
content = content.replace(/\{ id: "m2", name: "Arturo", avatarUrl: "" \}/, '{ id: "m2", name: "Arturo", avatarUrl: "/avatars/arturo.png" }');

fs.writeFileSync('src/pages/Work.tsx', content);
console.log('Dynamic translation and avatar patched!');
