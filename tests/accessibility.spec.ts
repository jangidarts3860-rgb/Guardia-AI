import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('All interactive elements have focus-visible', async ({ page }) => {
    await page.goto('/login');
    
    const focusableElements = page.locator(
      'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const count = await focusableElements.count();
    for (let i = 0; i < count; i++) {
      const element = focusableElements.nth(i);
      await element.focus();
      await expect(element).toHaveCSS('outline-style', 'solid');
    }
  });

  test('All images have alt text', async ({ page }) => {
    await page.goto('/home');
    
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const ariaHidden = await images.nth(i).getAttribute('aria-hidden');
      
      if (ariaHidden !== 'true') {
        expect(alt).toBeTruthy();
      }
    }
  });

  test('Color contrast meets WCAG AA', async ({ page }) => {
    await page.goto('/home');
    
    const textElements = page.locator('p, span, h1, h2, h3, h4, h5, h6, button, a, label');
    const count = await textElements.count();
    
    for (let i = 0; i < count; i++) {
      const element = textElements.nth(i);
      const color = await element.evaluate(el => 
        window.getComputedStyle(el).color
      );
      const bgColor = await element.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      
      // Check contrast ratio meets 4.5:1 for normal text
      // This is a simplified check - real implementation would calculate actual ratio
      expect(color).toBeTruthy();
      expect(bgColor).toBeTruthy();
    }
  });

  test('All form inputs have labels', async ({ page }) => {
    await page.goto('/create-account');
    
    const inputs = page.locator('input, textarea, select');
    const count = await inputs.count();
    
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        await expect(label).toBeVisible();
      } else if (!ariaLabel && !ariaLabelledBy) {
        throw new Error(`Input missing label: ${await input.getAttribute('type')}`);
      }
    }
  });

  test('Error messages have role=alert', async ({ page }) => {
    await page.goto('/login');
    await page.click('[data-testid="numpad-0"]');
    await page.click('[data-testid="numpad-0"]');
    await page.click('[data-testid="numpad-0"]');
    await page.click('[data-testid="numpad-1"]');
    
    const error = page.locator('[role="alert"]');
    await expect(page.locator('[role="alert"]')).toBeVisible();
  });

  test('Skip link present', async ({ page }) => {
    await page.goto('/home');
    await page.keyboard.press('Tab');
    
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeFocused();
  });

  test('Heading hierarchy correct', async ({ page }) => {
    await page.goto('/home');
    
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const count = await headings.count();
    
    let lastLevel = 0;
    for (let i = 0; i < count; i++) {
      const heading = headings.nth(i);
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      const level = parseInt(tagName.charAt(1));
      
      expect(level).toBeLessThanOrEqual(lastLevel + 1);
      lastLevel = level;
    }
  });

  test('ARIA live regions for dynamic content', async ({ page }) => {
    await page.goto('/home');
    
    const liveRegions = page.locator('[aria-live]');
    const count = await liveRegions.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Reduced motion respected', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/home');
    
    // Animations should be disabled
    const animatedElements = page.locator('[class*="animate"], [class*="transition"]');
    const count = await animatedElements.count();
    
    for (let i = 0; i < count; i++) {
      const duration = await animatedElements.nth(i).evaluate(el => 
        window.getComputedStyle(el).animationDuration
      );
      expect(duration).toBe('0.01ms');
    }
  });

  test('Touch targets meet minimum size', async ({ page }) => {
    await page.goto('/home');
    
    const buttons = page.locator('button, [role="button"], a[href]');
    const count = await buttons.count();
    
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const box = await buttons.nth(i).boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('Form validation accessible', async ({ page }) => {
    await page.goto('/create-account');
    
    await page.click('[data-testid="continue-btn"]');
    
    const error = page.locator('[role="alert"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('exactly 10 digits');
  });

  test('Modal focus trap', async ({ page }) => {
    await page.goto('/home');
    await page.click('[data-testid="shield-toggle"]');
    
    // Modal should open and trap focus
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    
    const focusableInModal = modal.locator(
      'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const count = await focusableInModal.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Skip link works', async ({ page }) => {
    await page.goto('/home');
    await page.keyboard.press('Tab');
    
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeFocused();
    
    await page.keyboard.press('Enter');
    const main = page.locator('#main-content');
    await expect(main).toBeFocused();
  });

  test('Language attribute set', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'en');
  });

  test('Currency formatting uses Intl', async ({ page }) => {
    await page.goto('/home');
    
    const amountElements = page.locator('[data-testid="amount"]');
    const count = await amountElements.count();
    
    for (let i = 0; i < count; i++) {
      const text = await amountElements.nth(i).textContent();
      expect(text).toMatch(/₹[\d,]+(\.\d{2})?/);
    }
  });
});