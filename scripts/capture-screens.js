import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const screens = [
  { id: 'splash', file: '01_splash.png' },
  { id: 'onboarding', file: '02_onboarding.png' },
  { id: 'permissions', file: '03_permissions.png' },
  { id: 'create-account', file: '04_create-account.png' },
  { id: 'verify-otp', file: '05_verify-otp.png' },
  { id: 'welcome-back', file: '06_welcome-back.png' },
  { id: 'home', file: '07_home.png' },
  { id: 'analyzing-merchant', file: '08_analyzing-merchant.png' },
  { id: 'merchant-verified', file: '09_merchant-verified.png' },
  { id: 'scam-detected', file: '10_scam-detected.png' },
  { id: 'receipt-dark', file: '11_receipt-dark.png' },
  { id: 'subs-dashboard', file: '12_subs-dashboard.png' },
  { id: 'sub-detail', file: '13_sub-detail.png' },
  { id: 'cancel-success', file: '14_cancel-success.png' },
  { id: 'vault', file: '15_vault.png' },
  { id: 'link-bank', file: '16_link-bank.png' },
  { id: 'scan-qr', file: '17_scan-qr.png' },
  { id: 'notifications', file: '18_notifications.png' },
  { id: 'activity-log', file: '19_activity-log.png' },
  { id: 'offline', file: '20_offline.png' },
  { id: 'emergency', file: '21_emergency.png' },
  { id: 'safe-report', file: '22_safe-report.png' },
  { id: 'your-win', file: '23_your-win.png' },
  { id: 'me-profile', file: '24_me-profile.png' },
  { id: 'edit-profile', file: '25_edit-profile.png' },
  { id: 'delete-account-confirm', file: '26_delete-account-confirm.png' },
  { id: 'freeze-accounts-confirm', file: '27_freeze-accounts-confirm.png' },
  { id: 'link-bank-progress', file: '28_link-bank-progress.png' }
];

async function capture() {
  const outputDir = path.join(__dirname, '../figma-screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🚀 Starting screenshot capture session...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    deviceScaleFactor: 3 // 3x High-DPI resolution for super crisp screenshots
  });
  const page = await context.newPage();
  
  // Set viewport size
  await page.setViewportSize({ width: 1280, height: 960 });

  for (let i = 0; i < screens.length; i++) {
    const screen = screens[i];
    console.log(`📸 [${i + 1}/${screens.length}] Navigating to: ${screen.id}`);
    await page.goto(`http://localhost:3000/${screen.id}?screenshot=1`);
    await page.waitForTimeout(800);
    
    // Locate the pure screen container (excludes bezels, status bar overlays, battery wifi time, etc)
    const frame = page.locator('#pure-screen-container');
    
    if (await frame.count() > 0) {
      const outputPath = path.join(outputDir, screen.file);
      await frame.screenshot({ path: outputPath });
      console.log(`   Saved screenshot to: ${screen.file}`);
    } else {
      console.error(`   ❌ Failed to locate #pure-screen-container on screen: ${screen.id}`);
    }
  }

  await browser.close();
  console.log('✅ Screenshot capture completed successfully!');
}

capture().catch(err => {
  console.error('❌ Error during capture process:', err);
  process.exit(1);
});
