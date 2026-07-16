# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.ts >> Guardia AI - Complete E2E Test Suite >> Payment & UPI >> Link bank account
- Location: tests\e2e.spec.ts:144:5

# Error details

```
TimeoutError: page.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('[data-testid="bank-hdfc"]')

```

# Page snapshot

```yaml
- generic [ref=e8]:
  - link "Skip to main content" [ref=e9] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e12]:
    - img "Guardia AI Logo" [ref=e14]
    - generic [ref=e23]: Shield ON
  - main [ref=e25]:
    - generic [ref=e28]:
      - generic [ref=e29]:
        - generic [ref=e30]:
          - button "Go back" [ref=e31]:
            - img [ref=e32]
          - generic [ref=e34]: Link Your Bank
        - generic [ref=e35]:
          - heading "Select your bank" [level=2] [ref=e36]
          - paragraph [ref=e37]: We use RBI-approved secure channels to connect your bank.
        - generic [ref=e38]:
          - generic [ref=e39]:
            - img [ref=e40]
            - generic [ref=e43]:
              - paragraph [ref=e44]: "Data Shared:"
              - paragraph [ref=e45]: Read-only access to subscription bills.
          - generic [ref=e46]:
            - img [ref=e47]
            - generic [ref=e50]:
              - paragraph [ref=e51]: "Consent Period:"
              - paragraph [ref=e52]: 12 months (Revocable anytime in Settings).
        - generic [ref=e53]:
          - img [ref=e54]
          - textbox "Search bank name" [ref=e57]:
            - /placeholder: Search bank name...
        - generic [ref=e58]:
          - generic "SBI - Already linked" [ref=e59]:
            - img [ref=e62]
            - generic [ref=e66]:
              - paragraph [ref=e67]: SBI
              - paragraph [ref=e68]:
                - generic [ref=e70]: Linked • 14 min ago
          - generic "HDFC Bank - Already linked" [ref=e71]:
            - generic [ref=e76]: HDFC
            - generic [ref=e77]:
              - paragraph [ref=e78]: HDFC Bank
              - paragraph [ref=e79]:
                - generic [ref=e81]: Linked • 2 min ago
          - button "Select ICICI Bank" [ref=e82]:
            - generic [ref=e84]:
              - generic [ref=e85]: i
              - generic [ref=e86]: ICICI
            - generic [ref=e87]:
              - paragraph [ref=e88]: ICICI Bank
              - paragraph [ref=e89]: Tap to connect
          - button "Select Axis Bank" [ref=e90]:
            - img [ref=e94]
            - generic [ref=e96]:
              - paragraph [ref=e97]: Axis Bank
              - paragraph [ref=e98]: Tap to connect
          - button "Select Kotak Mahindra" [ref=e99]:
            - generic [ref=e101]:
              - generic [ref=e102]: K
              - generic [ref=e103]: KOTAK
            - generic [ref=e104]:
              - paragraph [ref=e105]: Kotak Mahindra
              - paragraph [ref=e106]: Tap to connect
          - button "Select IDFC First Bank" [ref=e107]:
            - generic [ref=e112]: 1st
            - generic [ref=e113]:
              - paragraph [ref=e114]: IDFC First Bank
              - paragraph [ref=e115]: Tap to connect
          - button "Select Yes Bank" [ref=e116]:
            - generic [ref=e119]: "YES"
            - generic [ref=e121]:
              - paragraph [ref=e122]: Yes Bank
              - paragraph [ref=e123]: Tap to connect
          - button "Select Punjab National Bank" [ref=e124]:
            - generic [ref=e128]: PNB
            - generic [ref=e129]:
              - paragraph [ref=e130]: Punjab National Bank
              - paragraph [ref=e131]: Tap to connect
      - generic [ref=e132]:
        - button "Select a bank" [disabled] [ref=e133]
        - button "Do this later / Skip" [ref=e134]
        - paragraph [ref=e135]: Bank-grade encryption • Regulated by RBI
    - log "Notifications"
```

# Test source

```ts
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
  144 |     test('Link bank account', async ({ page }) => {
  145 |       await page.goto('/link-bank');
  146 |       await expect(page.locator('[data-screen="link-bank"]')).toBeVisible();
  147 |       
> 148 |       await page.click('[data-testid="bank-hdfc"]');
      |                  ^ TimeoutError: page.click: Timeout 10000ms exceeded.
  149 |       await expect(page.locator('[data-screen="link-bank-progress"]')).toBeVisible();
  150 |     });
  151 |   });
  152 | 
  153 |   test.describe('Security & Emergency', () => {
  154 |     test.beforeEach(async ({ page }) => {
  155 |       await page.goto('/login');
  156 |       for (const digit of '1234') {
  157 |         await page.click(`[data-testid="numpad-${digit}"]`);
  158 |       }
  159 |       await expect(page.locator('[data-screen="home"]')).toBeVisible();
  160 |     });
  161 | 
  162 |     test('Shield toggle', async ({ page }) => {
  163 |       await expect(page.locator('[data-testid="shield-toggle"]')).toHaveAttribute('aria-checked', 'true');
  164 |       await page.click('[data-testid="shield-toggle"]');
  165 |       await expect(page.locator('[data-testid="shield-toggle"]')).toHaveAttribute('aria-checked', 'false');
  166 |     });
  167 | 
  168 |     test('Freeze accounts', async ({ page }) => {
  169 |       await page.goto('/security');
  170 |       await page.click('[data-testid="freeze-accounts-btn"]');
  171 |       
  172 |       await expect(page.locator('[data-screen="freeze-accounts-confirm"]')).toBeVisible();
  173 |       await page.click('[data-testid="confirm-freeze-btn"]');
  174 |       
  175 |       await expect(page.locator('[data-screen="freeze-success"]')).toBeVisible();
  176 |     });
  177 | 
  178 |     test('Emergency screen', async ({ page }) => {
  179 |       await page.goto('/emergency');
  180 |       await expect(page.locator('[data-screen="emergency"]')).toBeVisible();
  181 |       
  182 |       await expect(page.locator('[data-testid="call-police-btn"]')).toBeVisible();
  183 |       await expect(page.locator('[data-testid="sound-alarm-btn"]')).toBeVisible();
  184 |       await expect(page.locator('[data-testid="share-location-btn"]')).toBeVisible();
  185 |     });
  186 |   });
  187 | 
  188 |   test.describe('Edge Cases & Error Handling', () => {
  189 |     test('Offline mode', async ({ page }) => {
  190 |       await page.goto('/login');
  191 |       for (const digit of '1234') {
  192 |         await page.click(`[data-testid="numpad-${digit}"]`);
  193 |       }
  194 |       await expect(page.locator('[data-screen="home"]')).toBeVisible();
  195 |       
  196 |       // Go offline
  197 |       await page.context().setOfflineMode(true);
  198 |       await page.reload();
  199 |       
  200 |       await expect(page.locator('[data-screen="offline"]')).toBeVisible();
  201 |     });
  202 | 
  203 |     test('Network error recovery', async ({ page }) => {
  204 |       await page.route('**/api/**', route => route.abort());
  205 |       await page.goto('/home');
  206 |       
  207 |       await expect(page.locator('[role="alert"]')).toContainText('offline');
  208 |       await expect(page.locator('[data-testid="retry-btn"]')).toBeVisible();
  209 |       
  210 |       await page.unroute('**/api/**');
  211 |       await page.click('[data-testid="retry-btn"]');
  212 |       
  213 |       await expect(page.locator('[data-screen="home"]')).toBeVisible();
  214 |     });
  215 | 
  216 |     test('Invalid PIN lockout', async ({ page }) => {
  217 |       await page.goto('/login');
  218 |       
  219 |       // 3 wrong attempts
  220 |       for (let i = 0; i < 3; i++) {
  221 |         await page.click('[data-testid="numpad-0"]');
  222 |         await page.click('[data-testid="numpad-0"]');
  223 |         await page.click('[data-testid="numpad-0"]');
  224 |         await page.click('[data-testid="numpad-1"]');
  225 |       }
  226 |       
  227 |       await expect(page.locator('text=Too many attempts')).toBeVisible();
  228 |       await expect(page.locator('[data-screen="freeze-accounts-confirm"]')).toBeVisible();
  229 |     });
  230 |   });
  231 | 
  232 |   test.describe('Performance', () => {
  233 |     test('Home screen loads within 3s', async ({ page }) => {
  234 |       const start = Date.now();
  235 |       await page.goto('/login');
  236 |       for (const digit of '1234') {
  237 |         await page.click(`[data-testid="numpad-${digit}"]`);
  238 |       }
  239 |       await expect(page.locator('[data-screen="home"]')).toBeVisible({ timeout: 3000 });
  240 |       
  241 |       const loadTime = Date.now() - start;
  242 |       expect(loadTime).toBeLessThan(3000);
  243 |     });
  244 | 
  245 |     test('No layout shift on home', async ({ page }) => {
  246 |       await page.goto('/login');
  247 |       for (const digit of '1234') {
  248 |         await page.click(`[data-testid="numpad-${digit}"]`);
```