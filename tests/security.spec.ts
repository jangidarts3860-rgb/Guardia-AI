import { test, expect } from '@playwright/test';

test.describe('Security & Shield', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.waitForSelector('[data-screen="login"]', { state: 'visible' });
    for (const digit of '1234') {
      await page.click(`[data-testid="numpad-${digit}"]`);
    }
    await expect(page.locator('[data-screen="home"]')).toBeVisible({ timeout: 10000 });
  });

  test('Shield toggle on home', async ({ page }) => {
    await expect(page.locator('[data-testid="shield-toggle"]')).toHaveAttribute('aria-checked', 'true');

    await page.click('[data-testid="shield-toggle"]');
    await expect(page.locator('[data-testid="shield-toggle"]')).toHaveAttribute('aria-checked', 'false');

    await page.click('[data-testid="shield-toggle"]');
    await expect(page.locator('[data-testid="shield-toggle"]')).toHaveAttribute('aria-checked', 'true');
  });

  test('Shield pauses correctly', async ({ page }) => {
    await page.click('[data-testid="shield-toggle"]');
    await expect(page.locator('[data-testid="shield-status"]')).toContainText('Paused');
    await expect(page.locator('text=Tap to resume active defense')).toBeVisible();
  });

  test('Navigate to vault from bottom nav', async ({ page }) => {
    await page.click('[data-testid="bottom-nav-security"]');
    await expect(page.locator('[data-screen="vault"]')).toBeVisible();
  });

  test('Navigate to emergency screen', async ({ page }) => {
    await page.goto('/emergency');
    await expect(page.locator('[data-screen="emergency"]')).toBeVisible();
    await expect(page.locator('[data-testid="call-police-btn"]')).toBeVisible();
    await expect(page.locator('[data-testid="sound-alarm-btn"]')).toBeVisible();
  });

  test('Navigate to freeze accounts confirm', async ({ page }) => {
    await page.goto('/freeze-accounts-confirm');
    await expect(page.locator('[data-screen="freeze-accounts-confirm"]')).toBeVisible();
  });
});
