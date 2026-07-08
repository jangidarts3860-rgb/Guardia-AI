import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTest() {
  console.log('🏁 Starting E2E user-flow and responsiveness test suite...');
  
  const browser = await chromium.launch({ headless: true });
  
  // Test both mobile viewport and desktop viewport responsiveness
  const devices = [
    { name: 'Mobile Viewport (iPhone 14 Pro size)', width: 393, height: 852, isMobile: true },
    { name: 'Desktop Viewport (Large screen)', width: 1440, height: 900, isMobile: false }
  ];

  for (const device of devices) {
    console.log(`\n📱 Testing on ${device.name}...`);
    const context = await browser.newContext({
      viewport: { width: device.width, height: device.height },
      deviceScaleFactor: 2,
      isMobile: device.isMobile,
      hasTouch: device.isMobile
    });
    
    const page = await context.newPage();
    const consoleErrors = [];
    
    // Log console errors to ensure 100% bug-free Javascript execution
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
        console.error(`🔴 Browser Console Error: ${msg.text()}`);
      }
    });

    page.on('pageerror', err => {
      consoleErrors.push(err.message);
      console.error(`🔴 Browser Page Crash: ${err.message}`);
    });

    // 1. Load the App
    console.log('🔗 Navigating to http://localhost:3000/');
    await page.goto('http://localhost:3000/');
    
    // 2. Splash screen test
    console.log('⚡ Verifying Splash Screen...');
    await page.waitForTimeout(1000);
    
    // Check if splash screen is visible or redirecting
    const bodyText = await page.textContent('body');
    if (bodyText.includes('Guardia AI')) {
      console.log('✅ Splash screen rendered successfully.');
    }

    // Wait for auto-redirect to Onboarding
    console.log('⏳ Waiting for auto-redirect to Onboarding (2.5s)...');
    await page.waitForTimeout(2000); // Wait out the timer

    // 3. Onboarding screen test
    console.log('👉 Navigating Onboarding...');
    await page.waitForSelector('text=Continue →', { timeout: 5000 });
    console.log('✅ Onboarding screen loaded.');
    await page.click('text=Continue →');

    // 4. Permissions screen test
    console.log('🔒 Verifying Permissions Screen...');
    await page.waitForSelector('text=Enable Shield Layers', { timeout: 5000 });
    console.log('✅ Permissions screen loaded.');
    await page.click('text=Grant & Activate Shield →');

    // 5. Create Profile screen test
    console.log('📝 Verifying Create Profile Screen & Button Glow...');
    await page.waitForSelector('text=Create Security Profile', { timeout: 5000 });
    
    // Verify prefilled name and email are active
    const nameVal = await page.inputValue('#full-name');
    const emailVal = await page.inputValue('#email-address');
    const phoneVal = await page.inputValue('#mobile-number');
    
    console.log(`   Prefilled - Name: "${nameVal}", Email: "${emailVal}", Phone: "+91 ${phoneVal}"`);
    
    // Verify Send OTP button is glowing (active)
    const sendOtpButton = page.locator('button:has-text("Send OTP Verification")');
    const isButtonDisabled = await sendOtpButton.isDisabled();
    if (!isButtonDisabled) {
      console.log('✅ Send OTP button is active/glowing by default!');
    } else {
      throw new Error('❌ Send OTP button is disabled on load despite complete fields!');
    }
    
    await sendOtpButton.click();

    // 6. Verify OTP screen test
    console.log('🔑 Verifying OTP Screen...');
    await page.waitForSelector('text=Enter OTP Code', { timeout: 5000 });
    console.log('✅ OTP screen loaded.');
    
    // Click verify (prefilled with mock fake OTP 123456)
    await page.click('text=Verify & Proceed →');

    // 7. Welcome Back (PIN Login) screen test
    console.log('🔐 Verifying PIN Login...');
    await page.waitForSelector('text=Welcome Back', { timeout: 5000 });
    console.log('✅ PIN Login screen loaded.');
    
    // Click digits 1-2-3-4 to log in
    await page.click('button:text-is("1")');
    await page.click('button:text-is("2")');
    await page.click('button:text-is("3")');
    await page.click('button:text-is("4")');

    // 8. Home Dashboard test
    console.log('🏠 Verifying Home Screen...');
    await page.waitForSelector('text=Your Shield', { timeout: 5000 });
    console.log('✅ Home Dashboard loaded successfully.');
    
    // Verify responsiveness of bottom tabs navigation
    console.log('📱 Testing bottom navigation tabs...');
    
    // Go to Subscriptions Dashboard
    console.log('   Navigating to Subscriptions tab...');
    await page.click('button:has-text("Subs")');
    await page.waitForSelector('text=Active Subscriptions', { timeout: 5000 });
    console.log('   ✅ Subscriptions tab loaded.');
    
    // Go to Vault Dashboard
    console.log('   Navigating to Vault tab...');
    await page.click('button:has-text("Vault")');
    await page.waitForSelector('text=Linked Bank Accounts', { timeout: 5000 });
    console.log('   ✅ Vault tab loaded.');
    
    // Go to Profile tab
    console.log('   Navigating to Profile tab...');
    await page.click('button:has-text("Profile")');
    await page.waitForSelector('text=Saved (Lifetime)', { timeout: 5000 });
    console.log('   ✅ Profile tab loaded.');

    // 9. Profile settings and editing test
    console.log('⚙️ Verifying Edit Profile Flow...');
    await page.click('button:has-text("Edit Profile")');
    await page.waitForSelector('text=Edit Profile', { timeout: 5000 });
    console.log('   ✅ Edit Profile screen loaded.');
    
    // Click Cancel to return
    await page.click('button:has-text("Cancel")');
    await page.waitForSelector('text=Profile', { timeout: 5000 });
    console.log('   ✅ Edit profile cancel works.');

    // 10. QR code scanner test
    console.log('📷 Verifying Scan QR Simulator...');
    await page.click('button:has-text("Done")'); // Return home
    await page.waitForSelector('text=Your Shield', { timeout: 5000 });
    
    // Click Scan QR button
    const scanButton = page.locator('#scan-qr-nav-btn').first();
    await scanButton.click();
    await page.waitForSelector('text=Scan QR Code', { timeout: 5000 });
    
    // Check if camera permission request is shown (click Allow)
    const allowButton = page.locator('button:has-text("Allow Access")');
    if (await allowButton.isVisible()) {
      await allowButton.click();
    }
    
    await page.waitForSelector('text=Scan Safe QR', { timeout: 5000 });
    console.log('   ✅ Scan QR viewfinder active.');
    
    // Verify Safe Scan outcome selection
    console.log('   Testing "Scan Safe QR" path...');
    await page.click('button:has-text("Scan Safe QR")');
    await page.waitForSelector('text=Security Audit In Progress', { timeout: 5000 });
    await page.waitForSelector('text=VERIFIED SAFE', { timeout: 10000 });
    console.log('   ✅ Safe scan path verified successfully.');
    
    // Go to receipt from merchant success screen
    await page.click('button:has-text("Pay ₹342 Securely")');
    await page.waitForSelector('text=safe transactions', { timeout: 5000 });
    
    // Go home from receipt screen
    await page.click('button:has-text("Go Home")');
    await page.waitForSelector('text=Your Shield', { timeout: 5000 });
    
    if (consoleErrors.length > 0) {
      throw new Error(`❌ Found console errors during navigation: ${consoleErrors.join(', ')}`);
    } else {
      console.log(`✅ Completed test suite for ${device.name} with 0 errors!`);
    }
    
    await context.close();
  }

  await browser.close();
  console.log('\n🏆 ALL E2E FLOWS AND RESPONSIVENESS VERIFIED SUCCESSFULLY WITH ZERO ERRORS!');
}

runTest().catch(err => {
  console.error('\n❌ E2E TEST RUN FAILED:', err);
  process.exit(1);
});
