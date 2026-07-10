const fs = require('fs');
const path = require('path');

const dir = path.join('c:/Users/Dell/Downloads/guardia-ai', 'src/components/screens/individual');

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace navigate('screen') with navigate('/screen')
    // but not navigate(-1) etc.
    content = content.replace(/navigate\('([a-z0-9-]+)'\)/g, "navigate('/$1')");

    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log('Fixed navigate paths');
