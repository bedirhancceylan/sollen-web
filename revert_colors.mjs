import fs from 'fs/promises';
import path from 'path';

const SRC_DIR = './src';

const colorMap = {
  'var(--color-sollen-primary)': '#1E3A8A',
  'var(--color-sollen-secondary)': '#0A1128',
  'var(--color-sollen-base)': '#FDFBF7',
  'var(--color-sollen-accent-light)': '#7460AB',
  'var(--color-sollen-accent)': '#2F1A73',
  'var(--color-sollen-accent-bg)': '#EDE9FF',
  'var(--color-sollen-text-dark)': '#1C2035',
  'var(--color-sollen-text-muted)': '#637087',
  'var(--color-sollen-text-lighter)': '#8B95A8',
};

const twMap = {
  'sollen-primary': '#1E3A8A',
  'sollen-secondary': '#0A1128',
  'sollen-base': '#FDFBF7',
  'sollen-accent-light': '#7460AB',
  'sollen-accent': '#2F1A73',
  'sollen-accent-bg': '#EDE9FF',
  'sollen-text-dark': '#1C2035',
  'sollen-text-muted': '#637087',
  'sollen-text-lighter': '#8B95A8',
};

async function processFile(filePath) {
  let content = await fs.readFile(filePath, 'utf8');
  let originalContent = content;

  for (const [twClass, hex] of Object.entries(twMap)) {
    // Regex for text-sollen-primary, bg-sollen-primary, etc. We need to replace them back to text-[#1E3A8A]
    // The previous script replaced [#1E3A8A] with sollen-primary. So we just replace sollen-primary with [#1E3A8A].
    const regex = new RegExp(`(?<=text-|bg-|border-|fill-|stroke-)${twClass}`, 'g');
    content = content.replace(regex, `[${hex}]`);
    
    // Also colorMap (inline styles)
    const rawRegex = new RegExp(`"${colorMap[twClass]}"`, 'g');
    content = content.replace(rawRegex, `"${hex}"`);
    
    // Sometimes it just replaced inside template literals or className strings without prefix if we didn't use a lookbehind?
    // Wait, the previous script was:
    // const regex = new RegExp(`\\[${hex}\\]`, 'gi');
    // content = content.replace(regex, twClass);
    // So `[#1E3A8A]` became `sollen-primary`.
    // So to revert, we just replace `sollen-primary` with `[#1E3A8A]`.
    const revertRegex = new RegExp(`\\b${twClass}\\b`, 'g');
    content = content.replace(revertRegex, `[${hex}]`);
  }

  if (content !== originalContent) {
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`Reverted: ${filePath}`);
  }
}

async function walkDir(dir) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = await fs.stat(fullPath);
    if (stat.isDirectory()) {
      await walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      await processFile(fullPath);
    }
  }
}

walkDir(SRC_DIR).catch(console.error);
