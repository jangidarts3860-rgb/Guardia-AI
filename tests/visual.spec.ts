import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.describe.configure({ retries: 2 });

  test.describe('Home Screen', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
      await page.waitForSelector('[data-screen="login"]', { state: 'visible' });
      for (const digit of '1234') {
        await page.click(`[data-testid="numpad-${digit}"]`);
      }
      await expect(page.locator('[data-screen="home"]')).toBeVisible({ timeout: 10000 });
    });

    test('Home screen - shield active', async ({ page }) => {
      await expect(page).toHaveScreenshot('home-shield-active.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test('Home screen - shield paused', async ({ page }) => {
      await page.click('[data-testid="shield-toggle"]');
      await expect(page.locator('[data-testid="shield-toggle"]')).toHaveAttribute('aria-checked', 'false');
      
      await expect(page).toHaveScreenshot('home-shield-paused.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test('Home screen - smart nudges', async ({ page }) => {
      await expect(page.locator('[data-testid="smart-nudges"]')).toBeVisible();
      
      await expect(page).toHaveScreenshot('home-smart-nudges.png', {
        fullPage: false,
        clip: { x: 0, y: 0, width: 390, height: 400 },
        threshold: 0.2,
      });
    });
  });

  test.describe('Login Screen', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
    });

    test('Login screen - has PIN', async ({ page }) => {
      await expect(page.locator('[data-screen="login"]')).toBeVisible();
      
      await expect(page).toHaveScreenshot('login-has-pin.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test('Login screen - no PIN (phone input)', async ({ page }) => {
      // Clear localStorage to simulate no PIN
      await page.evaluate(() => localStorage.clear());
      await page.reload();
      
      await expect(page.locator('[data-screen="login"]')).toBeVisible();
      
      await expect(page).toHaveScreenshot('login-no-pin.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test('Login screen - PANIC mode', async ({ page }) => {
      // Trigger panic mode by entering wrong PIN 3 times
      for (let i = 0; i < 3; i++) {
        await page.click('[data-testid="numpad-0"]');
        await page.click('[data-testid="numpad-0"]');
        await page.click('[data-testid="numpad-0"]');
        await page.click('[data-testid="numpad-1"]');
      }
      
      await expect(page.locator('[data-screen="login"]')).toBeVisible();
      
      await expect(page).toHaveScreenshot('login-panic-mode.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });
  });

  test.describe('Onboarding Flow', () => {
    test('Splash screen', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('[data-screen="splash"]')).toBeVisible();
      
      await expect(page).toHaveScreenshot('splash-screen.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test('Create account screen', async ({ page }) => {
      await page.goto('/create-account');
      await expect(page.locator('[data-screen="create-account"]')).toBeVisible();
      
      await expect(page).toHaveScreenshot('create-account.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test('Verify OTP screen', async ({ page }) => {
      await page.goto('/verify-otp');
      await expect(page.locator('[data-screen="verify-otp"]')).toBeVisible();
      
      await expect(page).toHaveScreenshot('verify-otp.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test('Create PIN screen', async ({ page }) => {
      await page.goto('/create-pin');
      await expect(page.locator('[data-screen="create-pin"]')).toBeVisible();
      
      await expect(page).toHaveScreenshot('create-pin.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });
  });

  test.describe('Settings Screens', () => {
    test('Profile screen - light mode', async ({ page }) => {
      await page.goto('/me-profile');
      await expect(page.locator('[data-screen="me-profile"]')).toBeVisible();
      
      await expect(page).toHaveScreenshot('profile.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test('Security screen', async ({ page }) => {
      await page.goto('/security');
      await expect(page.locator('[data-screen="security"]')).toBeVisible();
      
      await expect(page).toHaveScreenshot('security.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test('Profile - dark mode', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto('/me-profile');
      await expect(page.locator('[data-screen="me-profile"]')).toBeVisible();
      
      await expect(page).toHaveScreenshot('settings-dark.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });
  });

  test.describe('Error States', () => {
    test('Error screen - network', async ({ page }) => {
      await page.route('**/api/**', route => route.abort());
      await page.goto('/home');
      
      await expect(page.locator('[data-screen="error"]')).toBeVisible();
      
      await expect(page).toHaveScreenshot('error-network.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test('Error screen - server', async ({ page }) => {
      await page.route('**/api/**', route => route.fulfill({ status: 500 }));
      await page.goto('/home');
      
      await expect(page.locator('[data-screen="error"]')).toBeVisible();
      
      await expect(page).toHaveScreenshot('error-server.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test('Empty state - no subscriptions', async ({ page }) => {
      await page.goto('/subs-dashboard');
      await expect(page.locator('[data-screen="subs-dashboard"]')).toBeVisible();
      
      await expect(page).toHaveScreenshot('empty-subscriptions.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test('Empty state - no activity', async ({ page }) => {
      await page.goto('/activity-log');
      await expect(page.locator('[data-screen="activity-log"]')).toBeVisible();
      
      await expect(page).toHaveScreenshot('empty-activity.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test('Empty state - no notifications', async ({ page }) => {
      await page.goto('/notifications');
      await expect(page.locator('[data-screen="notifications"]')).toBeVisible();
      
      await expect(page).toHaveScreenshot('empty-notifications.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });
  });

  test.describe('Responsive Design', () => {
    const viewports = [
      { name: 'mobile-small', width: 320, height: 568 },
      { name: 'mobile-standard', width: 375, height: 667 },
      { name: 'mobile-large', width: 414, height: 896 },
      { name: 'tablet-portrait', width: 768, height: 1024 },
      { name: 'tablet-landscape', width: 1024, height: 768 },
      { name: 'desktop', width: 1440, height: 900 },
    ];

    for (const viewport of viewports) {
      test(`Home screen - ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/login');
        
        for (const digit of '1234') {
          await page.click(`[data-testid="numpad-${digit}"]`);
        }
        
        await expect(page.locator('[data-screen="home"]')).toBeVisible();
        
        await expect(page).toHaveScreenshot(`home-${viewport.name}.png`, {
          fullPage: true,
          threshold: 0.3,
        });
      });
    }
  });

  test.describe('Dark/Light Mode', () => {
    test('Light mode - home', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'light' });
      await page.goto('/login');
      
      for (const digit of '1234') {
        await page.click(`[data-testid="numpad-${digit}"]`);
      }
      
      await expect(page.locator('[data-screen="home"]')).toBeVisible();
      
      await expect(page).toHaveScreenshot('home-light.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test('Dark mode - home', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto('/login');
      
      for (const digit of '1234') {
        await page.click(`[data-testid="numpad-${digit}"]`);
      }
      
      await expect(page.locator('[data-screen="home"]')).toBeVisible();
      
      await expect(page).toHaveScreenshot('home-dark.png', {
        fullPage: true,
        threshold: 0.2,
      });
    });

    test('System preference respected', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto('/home');
      
      const bgColor = await page.evaluate(() => 
        window.getComputedStyle(document.body).backgroundColor
      );
      
      expect(bgColor).toContain('rgb(0, 0, 0)');
    });
  });
});