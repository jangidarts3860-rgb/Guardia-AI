const fs = require('fs');
const path = require('path');

const dir = path.join('c:/Users/Dell/Downloads/guardia-ai', 'src/components/screens/individual');

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find a lone ';' followed by some lines ending in ';' and eventually a '}' before any 'const ' or 'export '
    // Actually, any ';\n' followed by properties and ending in '}' that is NOT inside a function or object.
    // The easiest way is to match `;\r?\n(?:  [a-zA-Z]+: .*\r?\n)+\}\r?\n`
    
    // Let's use a simpler approach: any line that starts with "  " and has ":" and ends with ";" that appears before "export default function"
    // Wait, the rogue block starts with ";" and ends with "}"
    content = content.replace(/;\r?\n(\s+[A-Za-z0-9_]+:.*;\r?\n)+\}\r?\n/g, '');
    
    // Some might not start with ; if the regex cut it weirdly.
    // Let's just fix it by looking for the broken interfaces:
    // Regex to remove the residual interface bodies:
    // Match anything from the first `;\n  ` until the first `}\n`
    content = content.replace(/;\r?\n[\s\S]*?\r?\n\}\r?\n/g, (match) => {
      // Only remove if it looks like the broken interface
      if (match.includes('navigate:') || match.includes('setProfile:') || match.includes('subscriptions:')) {
        return '';
      }
      return match;
    });

    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log('Cleaned up rogue interface syntax errors.');
