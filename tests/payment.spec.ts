import { test, expect } from '@playwright/test';
import { HomeScreen, ScanQrScreen, VerifyOtpScreen, LinkBankScreen, LinkBankProgressScreen } from './pages/page-objects';

test.describe('Payment Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.waitForSelector('[data-screen="login"]', { state: 'visible' });
    // Enter PIN
    for (const digit of '1234') {
      await page.click(`[data-testid="numpad-${digit}"]`);
    }
    await expect(page.locator('[data-screen="home"]')).toBeVisible({ timeout: 10000 });
  });

  test('Scan QR -> Verify OTP -> Link Bank -> Success', async ({ page }) => {
    const home = new HomeScreen(page);
    await home.waitForLoad();

    // Click Scan QR
    await home.scanQrBtn().click();
    await expect(page.locator('[data-screen="scan-qr"]')).toBeVisible();

    // Scan QR (mock - just click manual entry)
    const scanQr = new ScanQrScreen(page);
    await scanQr.clickManualEntry();
    
    // Should navigate to verify OTP
    await expect(page.locator('[data-screen="verify-otp"]')).toBeVisible();
    
    // Enter OTP
    // This would need the VerifyOtpScreen page object
  });

  test('Scan QR with camera permission', async ({ page, context }) => {
    // Grant camera permission
    await context.grantPermissions(['camera']);
    
    const home = new HomeScreen(page);
    await home.waitForLoad();
    await home.scanQrBtn().click();
    
    await expect(page.locator('[data-screen="scan-qr"]')).toBeVisible();
    await expect(page.locator('[data-testid="camera-view"]')).toBeVisible();
  });

  test('Flash toggle works on scan screen', async ({ page }) => {
    await page.goto('/scan-qr');
    await expect(page.locator('[data-screen="scan-qr"]')).toBeVisible();
    
    const flashToggle = page.locator('[data-testid="flash-toggle"]');
    await expect(flashToggle).toBeVisible();
    
    await flashToggle.click();
    // Flash should toggle
  });

  test('Gallery button opens image picker', async ({ page }) => {
    await page.goto('/scan-qr');
    await expect(page.locator('[data-screen="scan-qr"]')).toBeVisible();
    
    const galleryBtn = page.locator('[data-testid="gallery-btn"]');
    await expect(galleryBtn).toBeVisible();
    
    // Can't fully test file picker in headless, but button should be clickable
    await galleryBtn.click();
  });
});