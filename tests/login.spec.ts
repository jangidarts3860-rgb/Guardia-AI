import { test, expect } from '@playwright/test';
import { LoginScreen, HomeScreen } from './pages/page-objects';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login screen
    await page.goto('/login');
    await page.waitForSelector('[data-screen="login"]', { state: 'visible', timeout: 10000 });
  });

  test('Login with correct PIN', async ({ page }) => {
    const login = new LoginScreen(page);
    await login.enterPin('1234');
    
    // Should navigate to home
    await expect(page.locator('[data-screen="home"]')).toBeVisible({ timeout: 10000 });
  });

  test('Login with wrong PIN shows error', async ({ page }) => {
    await page.click('[data-testid="numpad-0"]');
    await page.click('[data-testid="numpad-0"]');
    await page.click('[data-testid="numpad-0"]');
    await page.click('[data-testid="numpad-0"]');
    
    await expect(page.locator('text=Incorrect PIN')).toBeVisible();
  });

  test('3 wrong PIN attempts triggers panic mode', async ({ page }) => {
    // Enter wrong PIN 3 times
    for (let i = 0; i < 3; i++) {
      await page.click('[data-testid="numpad-0"]');
      await page.click('[data-testid="numpad-0"]');
      await page.click('[data-testid="numpad-0"]');
      await page.click('[data-testid="numpad-1"]');
      await page.waitForTimeout(500);
    }
    
    await expect(page.locator('text=Too many attempts')).toBeVisible();
    await expect(page.locator('text=Account temporarily locked')).toBeVisible();
  });

  test('Forgot PIN navigates to reset flow', async ({ page }) => {
    await page.click('[data-testid="forgot-pin-btn"]');
    await expect(page.locator('[data-screen="reset-pin"]')).toBeVisible();
  });

  test('Switch to phone login works', async ({ page }) => {
    await page.click('[data-testid="switch-to-phone-btn"]');
    await expect(page.locator('[data-screen="login"] >> text=Sign In')).toBeVisible();
  });

  test('Phone login flow works', async ({ page }) => {
    await page.click('[data-testid="switch-to-phone-btn"]');
    await page.fill('[data-testid="phone-input"]', '9876543210');
    await page.click('[data-testid="continue-btn"]');
    
    // Should navigate to OTP screen
    await expect(page.locator('[data-screen="verify-otp"]')).toBeVisible();
  });

  test('Face ID button accessible', async ({ page }) => {
    const faceIdBtn = page.locator('[data-testid="face-id-btn"]');
    await expect(faceIdBtn).toBeVisible();
    await expect(faceIdBtn).toHaveAttribute('aria-label', 'Login with Face ID');
  });
});