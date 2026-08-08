import fs from 'fs';
import path from 'path';

const map = {
  'bg-[#F9F8F3]': 'bg-slate-50',
  'text-[#F9F8F3]': 'text-white',
  'from-[#F9F8F3]': 'from-slate-50',
  'to-[#F9F8F3]': 'to-slate-50',
  'bg-[#F3F0E6]': 'bg-white',
  'from-[#F3F0E6]': 'from-white',
  'to-[#F3F0E6]': 'to-white',
  'text-[#1C1B18]': 'text-slate-900',
  'bg-[#1C1B18]': 'bg-slate-900',
  'border-[#1C1B18]': 'border-slate-900',
  'text-[#5C5953]': 'text-slate-500',
  'bg-[#5C5953]': 'bg-slate-500',
  'text-[#0F4C3A]': 'text-indigo-600',
  'bg-[#0F4C3A]': 'bg-indigo-600',
  'border-[#0F4C3A]': 'border-indigo-600',
  'border-[#0F4C3A]/20': 'border-indigo-600/20',
  'bg-[#E6F0EC]': 'bg-indigo-50',
  'text-[#A37D4C]': 'text-sky-500',
  'bg-[#A37D4C]': 'bg-sky-500',
  'border-[#A37D4C]': 'border-sky-500',
  'border-[#A37D4C]/30': 'border-sky-500/30',
  'border-[#E6E3D8]': 'border-slate-200',
  'border-[#E6E3D8]/60': 'border-slate-200/60',
  'border-[#2C2A26]': 'border-slate-800',
  'bg-[#2C2A26]': 'bg-slate-800',
  'text-[#A39E93]': 'text-slate-400',
  'font-serif': 'font-heading',
  'card-editorial': 'card-modern',
  'badge-editorial': 'badge-modern',
  'btn-editorial-primary': 'btn-modern-primary',
  'btn-editorial-secondary': 'btn-modern-secondary',
  'editorial-divider': 'modern-divider'
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let updated = false;
      
      for (const [key, value] of Object.entries(map)) {
        if (content.includes(key)) {
          content = content.replaceAll(key, value);
          updated = true;
        }
      }
      
      if (updated) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir('c:/jualonline/app');
processDir('c:/jualonline/components');
processDir('c:/jualonline/lib');
