const fs = require('fs');

const file = './src/components/sections/SolutionsSection.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/#1C2035/g, '#FFFFFF');
content = content.replace(/#637087/g, '#E2E8F0');
content = content.replace(/#7460AB/g, 'rgba(226,232,240,0.7)');
content = content.replace(/#E5E7EB/g, 'rgba(255,255,255,0.1)');
content = content.replace(/#8B95A8/g, 'rgba(255,255,255,0.5)');
content = content.replace(/#2F1A73/g, '#FFFFFF');
content = content.replace(/#EDE9FF/g, 'rgba(255,255,255,0.1)');
content = content.replace(/bg-white/g, 'bg-[rgba(255,255,255,0.03)]');
content = content.replace(/#9CA3AF/g, 'rgba(255,255,255,0.4)');

fs.writeFileSync(file, content);

console.log("Fixed SolutionsSection.tsx");
