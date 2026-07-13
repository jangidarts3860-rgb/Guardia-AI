import { test, expect } from '@playwright/test';

test.describe('Settings & Profile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.waitForSelector('[data-screen="login"]', { state: 'visible' });
    for (const digit of '1234') {
      await page.click(`[data-testid="numpad-${digit}"]`);
    }
    await expect(page.locator('[data-screen="home"]')).toBeVisible({ timeout: 10000 });
  });

  test('Navigate to profile from home', async ({ page }) => {
    await page.click('[data-testid="profile-btn"]');
    await expect(page.locator('[data-screen="me-profile"]')).toBeVisible();
    await expect(page.locator('[data-testid="profile-name"]')).toBeVisible();
  });

  test('Edit profile name', async ({ page }) => {
    await page.goto('/me-profile');
    await page.click('[data-testid="edit-profile-btn"]');
    await expect(page.locator('[data-screen="edit-profile"]')).toBeVisible();

    await page.fill('[data-testid="name-input"]', 'New Name');
    await page.click('[data-testid="save-profile-btn"]');

    await expect(page.locator('text=Profile Updated')).toBeVisible();
  });

  test('Change language', async ({ page }) => {
    await page.goto('/me-profile');
    await page.click('[data-testid="language-btn"]');

    await page.click('[data-testid="lang-hi"]');
    await expect(page.locator('text=हिंदी')).toBeVisible();
  });

  test('Reset PIN flow', async ({ page }) => {
    await page.goto('/login');
    await page.click('[data-testid="forgot-pin-btn"]');

    await expect(page.locator('[data-screen="reset-pin"]')).toBeVisible();
    await page.fill('[data-testid="phone-input"]', '9876543210');
    await page.click('[data-testid="send-otp-btn"]');

    await expect(page.locator('[data-screen="verify-otp"]')).toBeVisible();
  });
});
