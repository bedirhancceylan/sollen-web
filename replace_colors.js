const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const files = walkSync('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace background color #FDFBF7 with #040814
  content = content.replace(/#FDFBF7/g, '#040814');

  // Replace dark body color #0A1128 with #E2E8F0 (off-white)
  content = content.replace(/#0A1128/g, '#E2E8F0');

  // For the brand color #1E3A8A:
  // If it's a background with white text, make it white background with dark text
  content = content.replace(/bg-\[#1E3A8A\](.*?)text-white/g, 'bg-[#FFFFFF]$1text-[#040814]');
  content = content.replace(/text-white(.*?)bg-\[#1E3A8A\]/g, 'text-[#040814]$1bg-[#FFFFFF]');

  // For hover states:
  content = content.replace(/hover:bg-\[#1E3A8A\](.*?)hover:text-\[#040814\]/g, 'hover:bg-[#FFFFFF]$1hover:text-[#040814]');
  content = content.replace(/hover:bg-\[#0A1128\]/g, 'hover:bg-[#E2E8F0]'); // wait #0A1128 is now #E2E8F0, so it's already replaced above.

  // Replace remaining #1E3A8A with #FFFFFF
  content = content.replace(/#1E3A8A/g, '#FFFFFF');

  fs.writeFileSync(file, content);
});

console.log("Colors replaced in all files.");
