import { test, expect } from '@playwright/test';

test.describe('Subscription Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.waitForSelector('[data-screen="login"]', { state: 'visible' });
    for (const digit of '1234') {
      await page.click(`[data-testid="numpad-${digit}"]`);
    }
    await expect(page.locator('[data-screen="home"]')).toBeVisible({ timeout: 10000 });
  });

  test('View subscriptions dashboard', async ({ page }) => {
    await page.goto('/subs-dashboard');
    
    await expect(page.locator('[data-screen="subs-dashboard"]')).toBeVisible();
    await expect(page.locator('text=Subscriptions')).toBeVisible();
    await expect(page.locator('[data-testid="subscription-card"]')).toHaveCount(0); // or more if mock data
  });

  test('Navigate to subscription detail', async ({ page }) => {
    await page.goto('/subs-dashboard');
    await page.click('[data-testid="subscription-card-0"]');
    
    await expect(page.locator('[data-screen="sub-detail"]')).toBeVisible();
    await expect(page.locator('[data-testid="cancel-sub-btn"]')).toBeVisible();
  });

  test('Cancel subscription flow', async ({ page }) => {
    await page.goto('/sub-detail?id=0');
    await page.click('[data-testid="cancel-sub-btn"]');
    
    await expect(page.locator('[data-screen="cancel-success"]')).toBeVisible();
    await expect(page.locator('text=Subscription Cancelled')).toBeVisible();
  });

  test('View subscription details', async ({ page }) => {
    await page.goto('/sub-detail?id=0');
    await expect(page.locator('[data-testid="sub-name"]')).toBeVisible();
    await expect(page.locator('[data-testid="sub-cost"]')).toBeVisible();
    await expect(page.locator('[data-testid="sub-next-charge"]')).toBeVisible();
    await expect(page.locator('[data-testid="sub-category"]')).toBeVisible();
  });

  test('Manage subscription - change payment method', async ({ page }) => {
    await page.goto('/sub-detail?id=0');
    await page.click('[data-testid="manage-payment-btn"]');
    
    // Should show payment method options
    await expect(page.locator('[data-testid="payment-methods-list"]')).toBeVisible();
  });
});