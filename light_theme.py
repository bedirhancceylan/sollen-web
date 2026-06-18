import os
import glob

replacements = {
    # Navbar Specific
    'bg-black/60': 'bg-[#FDFBF7]/80',
    'bg-transparent border-b border-transparent': 'bg-transparent border-b border-transparent',
    'text-white hover:text-zinc-300': 'text-[#1E3A8A] hover:text-[#0A1128]',
    'text-white': 'text-[#1E3A8A]',
    'text-zinc-400': 'text-[#0A1128]/80',
    'text-zinc-500 hover:text-zinc-300': 'text-[#0A1128]/60 hover:text-[#1E3A8A]',
    'text-zinc-500 hover:text-white': 'text-[#0A1128]/60 hover:text-[#1E3A8A]',
    'text-zinc-500': 'text-[#0A1128]/60',
    'text-zinc-300': 'text-[#0A1128]/80',
    'text-zinc-600': 'text-[#0A1128]/50',
    'text-zinc-700': 'text-[#0A1128]/40',
    'text-[#0A1128]/80 hover:text-white': 'text-[#0A1128]/80 hover:text-[#1E3A8A]',
    'text-black bg-white': 'text-white bg-[#1E3A8A]',
    'hover:bg-zinc-200': 'hover:bg-[#0A1128]',
    'border border-white/20 rounded-full hover:bg-white/5': 'border border-[#1E3A8A]/20 rounded-full hover:bg-[#1E3A8A]/5',
    'bg-white/60': 'bg-[#1E3A8A]/60',
    'border-white/10': 'border-[#0A1128]/10',
    'border-white/20': 'border-[#0A1128]/20',
    'border-white/25': 'border-[#0A1128]/25',
    'bg-white/[0.03]': 'bg-[#0A1128]/[0.03]',
    'bg-white/[0.04]': 'bg-[#0A1128]/[0.04]',
    'bg-white/[0.07]': 'bg-[#0A1128]/[0.07]',
    'hover:border-white/25': 'hover:border-[#0A1128]/25',
    'focus:border-white': 'focus:border-[#1E3A8A]',
    'bg-black': 'bg-[#FDFBF7]',
    'rgba(5,5,5,0.95)': 'rgba(253,251,247,0.95)',
    'rgba(10, 17, 40, 0.45)': 'rgba(30, 58, 138, 0.05)',
    'rgba(255, 255, 255, 0.02)': 'rgba(10, 17, 40, 0.01)',
    'color: "#ffffff"': 'color: "#1E3A8A"',
    'color: "#3f3f46"': 'color: "#cbd5e1"',
}

files = glob.glob('src/components/**/*.tsx', recursive=True)

for fpath in files:
    if 'InvertButton.tsx' in fpath or 'PhoneModel.tsx' in fpath or 'StudioLights.tsx' in fpath:
        continue
    
    with open(fpath, 'r') as f:
        content = f.read()
        
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(fpath, 'w') as f:
        f.write(content)

print("Done replacing colors.")
