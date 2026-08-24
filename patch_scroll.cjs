const fs = require('fs');
let content = fs.readFileSync('src/pages/Work.tsx', 'utf8');

// Replace absolute inset-0 with h-full overscroll-contain
content = content.replace(
  'absolute inset-0 overflow-y-auto p-6 pb-20',
  'h-full overflow-y-auto overscroll-contain p-6 pb-20'
);

content = content.replace(
  'absolute inset-0 overflow-y-auto p-6 sm:p-10 pt-14 sm:pt-20 pb-32',
  'h-full overflow-y-auto overscroll-contain p-6 sm:p-10 pt-14 sm:pt-20 pb-32'
);

fs.writeFileSync('src/pages/Work.tsx', content);
console.log('Scroll patched!');
