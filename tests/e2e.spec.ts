import { test, expect } from '@playwright/test';

/**
 * Complete E2E Test Suite for Guardia AI
 * Run with: npx playwright test
 */

test.describe('Guardia AI - Complete E2E Test Suite', () => {
  test.describe('Critical User Flows', () => {
    test('Complete onboarding flow', async ({ page }) => {
      // Splash
      await page.goto('/');
      await expect(page.locator('[data-screen="splash"]')).toBeVisible();
      
      // Create Account
      await page.click('[data-testid="create-account-btn"]');
      await expect(page.locator('[data-screen="create-account"]')).toBeVisible();
      
      await page.fill('[data-testid="phone-input"]', '9876543210');
      await page.click('[data-testid="continue-btn"]');
      
      // Verify OTP
      await expect(page.locator('[data-screen="verify-otp"]')).toBeVisible();
      await page.fill('[data-testid="otp-input"]', '123456');
      
      // Create PIN
      await expect(page.locator('[data-screen="create-pin"]')).toBeVisible();
      for (const digit of '1234') {
        await page.click(`[data-testid="numpad-${digit}"]`);
      }
      
      // Confirm PIN
      for (const digit of '1234') {
        await page.click(`[data-testid="numpad-${digit}"]`);
      }
      
      // Should reach home
      await expect(page.locator('[data-screen="home"]')).toBeVisible({ timeout: 10000 });
    });

    test('Login with PIN', async ({ page }) => {
      await page.goto('/login');
      for (const digit of '1234') {
        await page.click(`[data-testid="numpad-${digit}"]`);
      }
      await expect(page.locator('[data-screen="home"]')).toBeVisible({ timeout: 10000 });
    });

    test('Login with Face ID', async ({ page }) => {
      await page.goto('/login');
      await page.click('[data-testid="face-id-btn"]');
      await expect(page.locator('[data-screen="home"]')).toBeVisible({ timeout: 10000 });
    });

    test('Forgot PIN flow', async ({ page }) => {
      await page.goto('/login');
      await page.click('[data-testid="forgot-pin-btn"]');
      await expect(page.locator('[data-screen="reset-pin"]')).toBeVisible();
      
      await page.fill('[data-testid="phone-input"]', '9876543210');
      await page.click('[data-testid="send-otp-btn"]');
      await expect(page.locator('[data-screen="verify-otp"]')).toBeVisible();
    });
  });

  test.describe('Subscription Management', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
      for (const digit of '1234') {
        await page.click(`[data-testid="numpad-${digit}"]`);
      }
      await expect(page.locator('[data-screen="home"]')).toBeVisible();
    });

    test('View subscriptions dashboard', async ({ page }) => {
      await page.click('[data-testid="bottom-nav-subs"]');
      await expect(page.locator('[data-screen="subs-dashboard"]')).toBeVisible();
      await expect(page.locator('[data-testid="subscriptions-list"]')).toBeVisible();
    });

    test('View subscription detail', async ({ page }) => {
      await page.goto('/subs-dashboard');
      await page.click('[data-testid="subscription-card"]:first-child');
      await expect(page.locator('[data-screen="sub-detail"]')).toBeVisible();
      await expect(page.locator('[data-testid="sub-name"]')).toBeVisible();
    });

    test('Cancel subscription', async ({ page }) => {
      await page.goto('/sub-detail?id=0');
      await page.click('[data-testid="cancel-sub-btn"]');
      
      await expect(page.locator('[role="dialog"]')).toBeVisible();
      await page.click('[data-testid="confirm-cancel-btn"]');
      
      await expect(page.locator('[data-screen="cancel-success"]')).toBeVisible();
    });

    test('Add new subscription', async ({ page }) => {
      await page.goto('/subs-dashboard');
      await page.click('[data-testid="add-sub-btn"]');
      
      await expect(page.locator('[data-screen="add-subscription"]')).toBeVisible();
      await page.fill('[data-testid="sub-name-input"]', 'Test Subscription');
      await page.fill('[data-testid="sub-cost-input"]', '999');
      await page.selectOption('[data-testid="sub-frequency-select"]', 'monthly');
      await page.click('[data-testid="save-sub-btn"]');
      
      await expect(page.locator('[data-screen="subs-dashboard"]')).toBeVisible();
    });
  });

  test.describe('Payment & UPI', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
      for (const digit of '1234') {
        await page.click(`[data-testid="numpad-${digit}"]`);
      }
      await expect(page.locator('[data-screen="home"]')).toBeVisible();
    });

    test('Scan QR code', async ({ page }) => {
      await page.click('[data-testid="scan-qr-btn"]');
      await expect(page.locator('[data-screen="scan-qr"]')).toBeVisible();
    });

    test('UPI payment flow', async ({ page }) => {
      await page.goto('/scan-qr');
      // Simulate QR scan
      await page.evaluate(() => {
        window.dispatchEvent(new CustomEvent('qr-scanned', { 
          detail: { upiId: 'merchant@upi', amount: 100 } 
        }));
      });
      
      await expect(page.locator('[data-screen="verify-otp"]')).toBeVisible();
    });

    test('Link bank account', async ({ page }) => {
      await page.goto('/link-bank');
      await expect(page.locator('[data-screen="link-bank"]')).toBeVisible();
      
      await page.click('[data-testid="bank-hdfc"]');
      await expect(page.locator('[data-screen="link-bank-progress"]')).toBeVisible();
    });
  });

  test.describe('Security & Emergency', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
      for (const digit of '1234') {
        await page.click(`[data-testid="numpad-${digit}"]`);
      }
      await expect(page.locator('[data-screen="home"]')).toBeVisible();
    });

    test('Shield toggle', async ({ page }) => {
      await expect(page.locator('[data-testid="shield-toggle"]')).toHaveAttribute('aria-checked', 'true');
      await page.click('[data-testid="shield-toggle"]');
      await expect(page.locator('[data-testid="shield-toggle"]')).toHaveAttribute('aria-checked', 'false');
    });

    test('Freeze accounts', async ({ page }) => {
      await page.goto('/security');
      await page.click('[data-testid="freeze-accounts-btn"]');
      
      await expect(page.locator('[data-screen="freeze-accounts-confirm"]')).toBeVisible();
      await page.click('[data-testid="confirm-freeze-btn"]');
      
      await expect(page.locator('[data-screen="freeze-success"]')).toBeVisible();
    });

    test('Emergency screen', async ({ page }) => {
      await page.goto('/emergency');
      await expect(page.locator('[data-screen="emergency"]')).toBeVisible();
      
      await expect(page.locator('[data-testid="call-police-btn"]')).toBeVisible();
      await expect(page.locator('[data-testid="sound-alarm-btn"]')).toBeVisible();
      await expect(page.locator('[data-testid="share-location-btn"]')).toBeVisible();
    });
  });

  test.describe('Edge Cases & Error Handling', () => {
    test('Offline mode', async ({ page }) => {
      await page.goto('/login');
      for (const digit of '1234') {
        await page.click(`[data-testid="numpad-${digit}"]`);
      }
      await expect(page.locator('[data-screen="home"]')).toBeVisible();
      
      // Go offline
      await page.setOfflineMode(true);
      await page.reload();
      
      await expect(page.locator('[data-screen="offline"]')).toBeVisible();
    });

    test('Network error recovery', async ({ page }) => {
      await page.route('**/api/**', route => route.abort());
      await page.goto('/home');
      
      await expect(page.locator('[role="alert"]')).toContainText('offline');
      await expect(page.locator('[data-testid="retry-btn"]')).toBeVisible();
      
      await page.unroute('**/api/**');
      await page.click('[data-testid="retry-btn"]');
      
      await expect(page.locator('[data-screen="home"]')).toBeVisible();
    });

    test('Invalid PIN lockout', async ({ page }) => {
      await page.goto('/login');
      
      // 3 wrong attempts
      for (let i = 0; i < 3; i++) {
        await page.click('[data-testid="numpad-0"]');
        await page.click('[data-testid="numpad-0"]');
        await page.click('[data-testid="numpad-0"]');
        await page.click('[data-testid="numpad-1"]');
      }
      
      await expect(page.locator('text=Too many attempts')).toBeVisible();
      await expect(page.locator('[data-screen="freeze-accounts-confirm"]')).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    test('Home screen loads within 3s', async ({ page }) => {
      const start = Date.now();
      await page.goto('/login');
      for (const digit of '1234') {
        await page.click(`[data-testid="numpad-${digit}"]`);
      }
      await expect(page.locator('[data-screen="home"]')).toBeVisible({ timeout: 3000 });
      
      const loadTime = Date.now() - start;
      expect(loadTime).toBeLessThan(3000);
    });

    test('No layout shift on home', async ({ page }) => {
      await page.goto('/login');
      for (const digit of '1234') {
        await page.click(`[data-testid="numpad-${digit}"]`);
      }
      
      const cls = await page.evaluate(() => {
        return new Promise(resolve => {
          let cls = 0;
          new PerformanceObserver(list => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === 'layout-shift') {
                cls += entry.value;
              }
            }
            resolve(cls);
          }).observe({ entryTypes: ['layout-shift'] });
          
          setTimeout(() => resolve(cls), 2000);
        });
      });
      
      expect(cls).toBeLessThan(0.1);
    });
  });
});

test.describe('Cross-browser/Device', () => {
  test.describe.configure({ retries: 1 });

  test('Works on mobile viewport', async ({ page }) => {
    await test.setViewportSize({ width: 375, height: 667 });
    await page.goto('/login');
    
    for (const digit of '1234') {
      await page.click(`[data-testid="numpad-${digit}"]`);
    }
    
    await expect(page.locator('[data-screen="home"]')).toBeVisible();
  });

  test('Works on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/login');
    
    for (const digit of '1234') {
      await page.click(`[data-testid="numpad-${digit}"]`);
    }
    
    await expect(page.locator('[data-screen="home"]')).toBeVisible();
  });

  test('Works on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/login');
    
    for (const digit of '1234') {
      await page.click(`[data-testid="numpad-${digit}"]`);
    }
    
    await expect(page.locator('[data-screen="home"]')).toBeVisible();
  });
});

test.describe('Regression Prevention', () => {
  test('No console errors on any screen', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    const screens = [
      '/login', '/home', '/subs-dashboard', '/security',
      '/me-profile', '/notifications'
    ];

    for (const screen of screens) {
      await page.goto(screen);
      await page.waitForLoadState('networkidle');
    }

    expect(errors).toHaveLength(0);
  });

  test('No duplicate IDs', async ({ page }) => {
    await page.goto('/home');
    
    const duplicateIds = await page.evaluate(() => {
      const ids = new Set();
      const duplicates = new Set();
      document.querySelectorAll('[id]').forEach(el => {
        if (ids.has(el.id)) {
          duplicates.add(el.id);
        } else {
          ids.add(el.id);
        }
      });
      return Array.from(duplicates);
    });

    expect(duplicateIds).toHaveLength(0);
  });

  test('All links have valid href', async ({ page }) => {
    await page.goto('/home');
    
    const links = await page.locator('a[href]').all();
    for (const link of links) {
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).not.toBe('#');
    }
  });
});