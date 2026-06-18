const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if(file !== 'node_modules' && file !== '.next') {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts') || dirFile.endsWith('.css')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const files = walkSync('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Reverse specific components first
  if (file.includes('SolutionsSection.tsx')) {
    // Original replacements:
    // #1C2035 -> #FFFFFF
    // #637087 -> #E2E8F0
    // #7460AB -> rgba(226,232,240,0.7)
    // #E5E7EB -> rgba(255,255,255,0.1)
    // #8B95A8 -> rgba(255,255,255,0.5)
    // #2F1A73 -> #FFFFFF
    // #EDE9FF -> rgba(255,255,255,0.1)
    // bg-white -> bg-[rgba(255,255,255,0.03)]
    // #9CA3AF -> rgba(255,255,255,0.4)
    content = content.replace(/#FFFFFF/g, '#1C2035'); // lossy, 2F1A73 is also FFFFFF
    content = content.replace(/text-\[#1C2035\] flex-shrink-0/g, 'text-[#2F1A73] flex-shrink-0');
    content = content.replace(/#E2E8F0/g, '#637087');
    content = content.replace(/rgba\(226,232,240,0\.7\)/g, '#7460AB');
    content = content.replace(/rgba\(255,255,255,0\.1\)/g, '#E5E7EB');
    content = content.replace(/rgba\(255,255,255,0\.5\)/g, '#8B95A8');
    content = content.replace(/bg-\[#1C2035\]/g, 'bg-[#2F1A73]');
    content = content.replace(/bg-\[#E5E7EB\]/g, 'bg-[#EDE9FF]'); // wait
    content = content.replace(/bg-\[rgba\(255,255,255,0\.03\)\]/g, 'bg-white');
    content = content.replace(/rgba\(255,255,255,0\.4\)/g, '#9CA3AF');
    
    // Fix the pills text color which might have become 1C2035
    content = content.replace(/text-\[#1C2035\] bg-\[#E5E7EB\]/g, 'text-[#2F1A73] bg-[#EDE9FF]');
  } else if (file.includes('ProductFeaturesSection.tsx')) {
    // Original replacements:
    // #4F36B4 -> #FFFFFF
    // #7460AB -> #E2E8F0/70
    // #1C2035 -> #FFFFFF
    // #637087 -> #E2E8F0
    // #2F1A73 -> #FFFFFF
    content = content.replace(/#FFFFFF/g, '#1C2035');
    content = content.replace(/text-\[#1C2035\]\">\{highlight\}/g, 'text-[#4F36B4]">{highlight}');
    content = content.replace(/#E2E8F0\/70/g, '#7460AB');
    content = content.replace(/#E2E8F0/g, '#637087');
    content = content.replace(/text-\[#1C2035\] flex-shrink-0/g, 'text-[#2F1A73] flex-shrink-0');
  } else if (file.includes('BookingSection.tsx')) {
    content = content.replace(/bg-\[#040814\]/g, 'bg-white');
    content = content.replace(/bg-transparent/g, 'bg-white');
    // Revert card background
    content = content.replace(/background: "rgba\(255, 255, 255, 0\.03\)",\n\s*border: "1px solid rgba\(255, 255, 255, 0\.05\)",/g, 'background: "#fff",');
    content = content.replace(/boxShadow: "0 8px 60px rgba\(0,0,0,0\.4\)"/g, 'boxShadow:\n            "0 8px 60px rgba(30,58,138,0.10), 0 1.5px 8px rgba(30,58,138,0.06)"');
    // Revert left sidebar gradient
    content = content.replace(/linear-gradient\(170deg, #1E293B 0%, #020617 100%\)/g, 'linear-gradient(170deg, #1E3A8A 0%, #0A1128 100%)');
    
    // Now reverse the global changes for BookingSection
    content = content.replace(/#040814/gi, '#FDFBF7');
    content = content.replace(/#E2E8F0/gi, '#0A1128');
    content = content.replace(/#FFFFFF/gi, '#1E3A8A');
  } else {
    // Generic global revert
    content = content.replace(/#040814/gi, '#FDFBF7');
    content = content.replace(/#E2E8F0/gi, '#0A1128');
    
    // Revert button text/bg flips
    content = content.replace(/bg-\[#FFFFFF\](.*?)text-\[#FDFBF7\]/g, 'bg-[#1E3A8A]$1text-white');
    content = content.replace(/text-\[#FDFBF7\](.*?)bg-\[#FFFFFF\]/g, 'text-white$1bg-[#1E3A8A]');
    content = content.replace(/hover:bg-\[#FFFFFF\](.*?)hover:text-\[#FDFBF7\]/g, 'hover:bg-[#1E3A8A]$1hover:text-[#FDFBF7]');
    
    content = content.replace(/#FFFFFF/gi, '#1E3A8A');
  }
  
  // Fix lowercase hex issues if any
  content = content.replace(/#ffffff/g, '#1E3A8A');

  fs.writeFileSync(file, content);
});

console.log("Colors reverted in all files.");
