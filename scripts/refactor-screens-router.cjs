const fs = require('fs');
const path = require('path');

const filePath = path.join('c:/Users/Dell/Downloads/guardia-ai', 'src/components/screens/Screens.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the renderScreen switch statement with Routes
const routeMappings = {
  'splash': 'SplashScreen',
  'login': 'LoginScreen',
  'onboarding': 'OnboardingScreen',
  'permissions': 'PermissionsScreen',
  'create-account': 'CreateAccountScreen',
  'verify-otp': 'VerifyOtpScreen',
  'welcome-back': 'WelcomeBackScreen',
  'home': 'HomeScreen',
  'analyzing-merchant': 'AnalyzingMerchantScreen',
  'merchant-verified': 'MerchantVerifiedScreen',
  'scam-detected': 'ScamDetectedScreen',
  'receipt-light': 'ReceiptScreen',
  'receipt-dark': 'ReceiptScreen',
  'subs-dashboard': 'SubsDashboardScreen',
  'sub-detail': 'SubDetailScreen',
  'cancel-success': 'CancelSuccessScreen',
  'vault': 'VaultScreen',
  'link-bank': 'LinkBankScreen',
  'link-bank-progress': 'LinkBankProgressScreen',
  'scan-qr': 'ScanQRScreen',
  'notifications': 'NotificationsScreen',
  'activity-log': 'ActivityLogScreen',
  'offline': 'OfflineScreen',
  'emergency': 'EmergencyScreen',
  'safe-report': 'SafeReportScreen',
  'your-win': 'YourWinScreen',
  'me-profile': 'MeProfileScreen',
  'edit-profile': 'EditProfileScreen',
  'delete-account-confirm': 'DeleteAccountConfirmScreen',
  'account-deleted': 'AccountDeletedScreen',
  'freeze-accounts-confirm': 'FreezeAccountsConfirmScreen',
  'create-pin': 'CreatePinScreen'
};

let routesString = '';
for (const [route, component] of Object.entries(routeMappings)) {
  if (route === 'receipt-dark' || route === 'receipt-light') {
     routesString += `          <Route path="/${route}" element={<${component} />} />\n`;
  } else {
     routesString += `          <Route path="/${route}" element={<${component} />} />\n`;
  }
}
// Add root route pointing to splash
routesString += `          <Route path="/" element={<SplashScreen />} />\n`;
// Add catch all pointing to splash
routesString += `          <Route path="*" element={<SplashScreen />} />\n`;

const newScreensTsx = `
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useStore } from '../../store';

${Object.values(routeMappings).filter((v, i, a) => a.indexOf(v) === i).map(comp => `const ${comp} = React.lazy(() => import('./individual/${comp}'));`).join('\n')}

export default function Screens() {
  const location = useLocation();
  const showBiometric = false; // from mock data previously, we can ignore or re-implement if needed, but it was just a local state in Screens.tsx earlier? Wait, Screens.tsx had \`showBiometric\` local state. We'll add it back.

  const [showBiometricState, setShowBiometricState] = React.useState(false);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <React.Suspense fallback={<div className="flex flex-col h-full items-center justify-center bg-slate-950"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div></div>}>
            <Routes location={location} key={location.pathname}>
${routesString}
            </Routes>
          </React.Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
`;

fs.writeFileSync(filePath, newScreensTsx, 'utf8');
console.log('Screens.tsx completely refactored to React Router.');
