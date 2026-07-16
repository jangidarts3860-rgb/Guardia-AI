# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.ts >> Guardia AI - Complete E2E Test Suite >> Critical User Flows >> Complete onboarding flow
- Location: tests\e2e.spec.ts:10:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-screen="home"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-screen="home"]')

```

```yaml
- link "Skip to main content":
  - /url: "#main-content"
- img "Guardia AI Logo"
- text: Shield ON
- main:
  - text: STEP 1 OF 3
  - button "Skip"
  - text: Feature 1 of 3
  - heading "Scam Defense" [level=3]
  - paragraph: Real merchant check results
  - heading "Know who you're paying" [level=1]
  - paragraph: Real-time merchant verification before you scan any QR or UPI ID.
  - tablist "Progress steps":
    - tab "Step 1 of 3" [selected]
    - tab "Step 2 of 3"
    - tab "Step 3 of 3"
  - button "Next →"
  - log "Notifications"
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | /**
  4   |  * Complete E2E Test Suite for Guardia AI
  5   |  * Run with: npx playwright test
  6   |  */
  7   | 
  8   | test.describe('Guardia AI - Complete E2E Test Suite', () => {
  9   |   test.describe('Critical User Flows', () => {
  10  |     test('Complete onboarding flow', async ({ page }) => {
  11  |       // Clear storage so splash doesn't redirect to login
  12  |       await page.goto('/splash');
  13  |       await page.evaluate(() => localStorage.clear());
  14  |       await page.reload();
  15  |       
  16  |       await expect(page.locator('[data-screen="splash"]')).toBeVisible();
  17  |       
  18  |       // Create Account
  19  |       await page.click('[data-testid="create-account-btn"]');
  20  |       await expect(page.locator('[data-screen="create-account"]')).toBeVisible();
  21  |       
  22  |       await page.fill('[data-testid="name-input"]', 'Rohan Sharma');
  23  |       await page.fill('[data-testid="phone-input"]', '9876543210');
  24  |       await page.click('[data-testid="continue-btn"]');
  25  |       
  26  |       // Verify OTP
  27  |       await expect(page.locator('[data-screen="verify-otp"]')).toBeVisible();
  28  |       await page.fill('[data-testid="otp-input"]', '123456');
  29  |       
  30  |       // Create PIN
  31  |       await expect(page.locator('[data-screen="create-pin"]')).toBeVisible();
  32  |       for (const digit of '1234') {
  33  |         await page.click(`[data-testid="numpad-${digit}"]`);
  34  |       }
  35  |       
  36  |       // Confirm PIN
  37  |       await expect(page.locator('h1')).toHaveText('Confirm Your PIN', { timeout: 10000 });
  38  |       for (const digit of '1234') {
  39  |         await page.click(`[data-testid="numpad-${digit}"]`);
  40  |       }
  41  |       
  42  |       // Should reach home
> 43  |       await expect(page.locator('[data-screen="home"]')).toBeVisible({ timeout: 10000 });
      |                                                          ^ Error: expect(locator).toBeVisible() failed
  44  |     });
  45  | 
  46  |     test('Login with PIN', async ({ page }) => {
  47  |       await page.goto('/login');
  48  |       for (const digit of '1234') {
  49  |         await page.click(`[data-testid="numpad-${digit}"]`);
  50  |       }
  51  |       await expect(page.locator('[data-screen="home"]')).toBeVisible({ timeout: 10000 });
  52  |     });
  53  | 
  54  |     test('Login with Face ID', async ({ page }) => {
  55  |       await page.goto('/login');
  56  |       await page.click('[data-testid="face-id-btn"]');
  57  |       await expect(page.locator('[data-screen="home"]')).toBeVisible({ timeout: 10000 });
  58  |     });
  59  | 
  60  |     test('Forgot PIN flow', async ({ page }) => {
  61  |       await page.goto('/login');
  62  |       await page.click('[data-testid="forgot-pin-btn"]');
  63  |       await expect(page.locator('[data-screen="reset-pin"]')).toBeVisible();
  64  |       
  65  |       await page.fill('[data-testid="phone-input"]', '9876543210');
  66  |       await page.click('[data-testid="send-otp-btn"]');
  67  |       await expect(page.locator('h1')).toHaveText('Enter OTP', { timeout: 10000 });
  68  |     });
  69  |   });
  70  | 
  71  |   test.describe('Subscription Management', () => {
  72  |     test.beforeEach(async ({ page }) => {
  73  |       await page.goto('/login');
  74  |       for (const digit of '1234') {
  75  |         await page.click(`[data-testid="numpad-${digit}"]`);
  76  |       }
  77  |       await expect(page.locator('[data-screen="home"]')).toBeVisible();
  78  |     });
  79  | 
  80  |     test('View subscriptions dashboard', async ({ page }) => {
  81  |       await page.click('[data-testid="bottom-nav-subs"]');
  82  |       await expect(page.locator('[data-screen="subs-dashboard"]')).toBeVisible();
  83  |       await expect(page.locator('[data-testid="subscriptions-list"]')).toBeVisible();
  84  |     });
  85  | 
  86  |     test('View subscription detail', async ({ page }) => {
  87  |       await page.goto('/subs-dashboard');
  88  |       await page.click('[data-testid="subscription-card"]:first-child');
  89  |       await expect(page.locator('[data-screen="sub-detail"]')).toBeVisible();
  90  |       await expect(page.locator('[data-testid="sub-name"]')).toBeVisible();
  91  |     });
  92  | 
  93  |     test('Cancel subscription', async ({ page }) => {
  94  |       await page.goto('/subs-dashboard');
  95  |       await page.click('[data-testid="subscription-card"]:first-child');
  96  |       await page.click('[data-testid="cancel-sub-btn"]');
  97  |       
  98  |       await expect(page.locator('[role="dialog"]')).toBeVisible();
  99  |       await page.click('[data-testid="confirm-cancel-btn"]');
  100 |       
  101 |       await expect(page.locator('[data-screen="cancel-success"]')).toBeVisible();
  102 |     });
  103 | 
  104 |     test('Add new subscription', async ({ page }) => {
  105 |       await page.goto('/subs-dashboard');
  106 |       await page.click('[data-testid="add-sub-btn"]');
  107 |       
  108 |       await expect(page.locator('[data-screen="add-subscription"]')).toBeVisible();
  109 |       await page.fill('[data-testid="sub-name-input"]', 'Test Subscription');
  110 |       await page.fill('[data-testid="sub-cost-input"]', '999');
  111 |       await page.selectOption('[data-testid="sub-frequency-select"]', 'monthly');
  112 |       await page.click('[data-testid="save-sub-btn"]');
  113 |       
  114 |       await expect(page.locator('[data-screen="subs-dashboard"]')).toBeVisible();
  115 |     });
  116 |   });
  117 | 
  118 |   test.describe('Payment & UPI', () => {
  119 |     test.beforeEach(async ({ page }) => {
  120 |       await page.goto('/login');
  121 |       for (const digit of '1234') {
  122 |         await page.click(`[data-testid="numpad-${digit}"]`);
  123 |       }
  124 |       await expect(page.locator('[data-screen="home"]')).toBeVisible();
  125 |     });
  126 | 
  127 |     test('Scan QR code', async ({ page }) => {
  128 |       await page.click('[data-testid="scan-qr-btn"]');
  129 |       await expect(page.locator('[data-screen="scan-qr"]')).toBeVisible();
  130 |     });
  131 | 
  132 |     test('UPI payment flow', async ({ page }) => {
  133 |       await page.goto('/scan-qr');
  134 |       // Simulate QR scan
  135 |       await page.evaluate(() => {
  136 |         window.dispatchEvent(new CustomEvent('qr-scanned', { 
  137 |           detail: { upiId: 'merchant@upi', amount: 100 } 
  138 |         }));
  139 |       });
  140 |       
  141 |       await expect(page.locator('[data-screen="verify-otp"]')).toBeVisible();
  142 |     });
  143 | 
```