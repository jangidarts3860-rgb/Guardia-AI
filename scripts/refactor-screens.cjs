const fs = require('fs');
const path = require('path');

const dir = path.join('c:/Users/Dell/Downloads/guardia-ai', 'src/components/screens/individual');

const stateVars = `const navigate = useNavigate();
  const { 
    profile, setProfile, 
    subscriptions, setSubscriptions, 
    banks, setBanks, 
    notifications, setNotifications, 
    activities, setActivities, 
    selectedSub, setSelectedSub, 
    isOffline, setIsOffline, 
    isLightMode, setIsLightMode, 
    scanOutcome, setScanOutcome 
  } = useStore();`;

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add imports
    if (!content.includes("import { useNavigate }")) {
      content = `import { useNavigate } from 'react-router-dom';\nimport { useStore } from '../../../store';\n` + content;
    }

    // Remove interface definitions ending with 'Props'
    content = content.replace(/interface\s+[A-Za-z0-9_]+Props\s*\{[^}]+\}/g, '');

    // Replace the function signature
    // Match: export default function ScreenName( anything ) {
    // Note: some might have multi-line arguments.
    // We can use a regex that matches until the first '{' after the function name
    content = content.replace(/(export default function [A-Za-z0-9_]+)\s*\([^)]*\)\s*\{/g, `$1() {\n  ${stateVars}\n`);

    // In ScamDetectedScreen, the props might use "scanOutcome" which we provided.
    
    // Write back
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Refactored ${file}`);
  }
});
