const fs = require('fs');
const path = require('path');

const dir = path.join('c:/Users/Dell/Downloads/guardia-ai', 'src/components/screens/individual');

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    content = content.replace(/import \{ ([^}]+) \} from '\.\.\/Screens';/g, "import { $1 } from '../../../utils/helpers';");
    content = content.replace(/import \{ ([^}]+) \} from '\.\.\/\.\.\/Screens';/g, "import { $1 } from '../../../utils/helpers';");
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log('Fixed helper imports.');
