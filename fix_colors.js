const fs = require('fs');

const bookingFile = './src/components/sections/BookingSection.tsx';
let content = fs.readFileSync(bookingFile, 'utf8');

// Fix left sidebar gradient and text
content = content.replace(/linear-gradient\(170deg, #FFFFFF 0%, #E2E8F0 100%\)/g, 'linear-gradient(170deg, #1E293B 0%, #020617 100%)');
// Fix card background
content = content.replace(/background: "#fff",/g, 'background: "rgba(255, 255, 255, 0.03)",\n          border: "1px solid rgba(255, 255, 255, 0.05)",');
content = content.replace(/boxShadow:\n.*?"0 8px 60px rgba\(30,58,138,0.10\), 0 1.5px 8px rgba\(30,58,138,0.06\)"/g, 'boxShadow: "0 8px 60px rgba(0,0,0,0.4)"');

// Fix input fields bg-white
content = content.replace(/bg-white/g, 'bg-transparent');

// Fix time slot active state if any
fs.writeFileSync(bookingFile, content);

console.log("Fixed BookingSection.tsx");
