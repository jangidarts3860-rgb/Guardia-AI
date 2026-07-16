# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.ts >> Guardia AI - Complete E2E Test Suite >> Performance >> Home screen loads within 3s
- Location: tests\e2e.spec.ts:233:5

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 3000
Received:   4774
```

# Page snapshot

```yaml
- generic [ref=e8]:
  - link "Skip to main content" [ref=e9] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e12]:
    - img "Guardia AI Logo" [ref=e14]
    - generic [ref=e23]: Shield ON
  - generic [ref=e28]: SHIELD ON
  - main [ref=e29]:
    - generic [ref=e32]:
      - img [ref=e34]
      - generic [ref=e41]:
        - generic [ref=e43]:
          - generic [ref=e44]:
            - paragraph [ref=e45]: Good morning, Rohan
            - generic [ref=e46]:
              - img "Guardia AI Logo" [ref=e48]
              - heading "Your Shield" [level=2] [ref=e57]
          - generic [ref=e58]:
            - button "Notifications" [ref=e59]:
              - img [ref=e60]
            - button "Profile" [ref=e64]:
              - generic [ref=e65]: R
        - switch "Protected AI Shield Active 3 scams blocked • No threats detected" [checked] [ref=e66] [cursor=pointer]:
          - img [ref=e71]
          - generic [ref=e74]:
            - generic [ref=e77]: Protected
            - heading "AI Shield Active" [level=3] [ref=e78]
            - paragraph [ref=e79]: 3 scams blocked • No threats detected
        - generic [ref=e80]:
          - text: Potential Monthly Savings
          - generic [ref=e81]:
            - generic [ref=e82]:
              - generic "₹948" [ref=e84]
              - text: possible savings
            - button "Review subscriptions" [ref=e85]:
              - generic [ref=e86]: Review subscriptions
              - img [ref=e87]
          - text: can be saved on 2 unused subscriptions
          - progressbar "Potential savings progress" [ref=e89]:
            - generic [ref=e91]: 45% potential savings identified
        - generic [ref=e92]:
          - generic [ref=e93]:
            - heading "Smart Nudges" [level=3] [ref=e94]
            - generic [ref=e95]: New Alerts
          - generic [ref=e96]:
            - generic [ref=e97] [cursor=pointer]:
              - img [ref=e100]
              - heading "Netflix Alert" [level=4] [ref=e104]
              - paragraph [ref=e105]: Not used in 47 days
              - paragraph [ref=e106]: Save ₹649/mo
            - generic [ref=e107] [cursor=pointer]:
              - img [ref=e109]
              - heading "Scam SMS" [level=4] [ref=e111]
              - paragraph [ref=e112]: Urgency phrase detected
              - paragraph [ref=e113]: High Risk Alert
        - generic [ref=e114]:
          - generic [ref=e115]:
            - heading "Recent Activity" [level=3] [ref=e116]
            - button "View all" [ref=e117]
          - generic [ref=e118]:
            - generic [ref=e119] [cursor=pointer]:
              - generic [ref=e123]:
                - paragraph [ref=e124]: 🍿 Scam blocked
                - paragraph [ref=e125]: Netflix fake login link • 2h ago
              - img [ref=e126]
            - generic [ref=e128] [cursor=pointer]:
              - generic [ref=e132]:
                - paragraph [ref=e133]: 🍔 Swiggy verified
                - paragraph [ref=e134]: Swiggy Instacart • ₹342 • 5h ago
              - img [ref=e135]
            - generic [ref=e137] [cursor=pointer]:
              - generic [ref=e141]:
                - paragraph [ref=e142]: 🎬 Hotstar cancelled
                - paragraph [ref=e143]: Saving ₹299/mo • Yesterday
              - img [ref=e144]
    - log "Notifications"
  - generic [ref=e148]:
    - button "Home" [ref=e149]:
      - generic [ref=e151]:
        - img [ref=e152]
        - generic [ref=e155]: Home
    - button "Subs" [ref=e156]:
      - generic [ref=e157]:
        - img [ref=e158]
        - generic [ref=e160]: Subs
    - button [ref=e161]:
      - img [ref=e164]
    - button "Security" [ref=e169]:
      - generic [ref=e170]:
        - img [ref=e171]
        - generic [ref=e174]: Security
    - button "Profile" [ref=e175]:
      - generic [ref=e176]:
        - img [ref=e177]
        - generic [ref=e180]: Profile
```

# Test source

```ts
  142 |     });
  143 | 
  144 |     test('Link bank account', async ({ page }) => {
  145 |       await page.goto('/link-bank');
  146 |       await expect(page.locator('[data-screen="link-bank"]')).toBeVisible();
  147 |       
  148 |       await page.click('[data-testid="bank-hdfc"]');
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
> 242 |       expect(loadTime).toBeLessThan(3000);
      |                        ^ Error: expect(received).toBeLessThan(expected)
  243 |     });
  244 | 
  245 |     test('No layout shift on home', async ({ page }) => {
  246 |       await page.goto('/login');
  247 |       for (const digit of '1234') {
  248 |         await page.click(`[data-testid="numpad-${digit}"]`);
  249 |       }
  250 |       
  251 |       const cls = await page.evaluate(() => {
  252 |         return new Promise(resolve => {
  253 |           let cls = 0;
  254 |           new PerformanceObserver(list => {
  255 |             for (const entry of list.getEntries()) {
  256 |               if (entry.entryType === 'layout-shift') {
  257 |                 cls += entry.value;
  258 |               }
  259 |             }
  260 |             resolve(cls);
  261 |           }).observe({ entryTypes: ['layout-shift'] });
  262 |           
  263 |           setTimeout(() => resolve(cls), 2000);
  264 |         });
  265 |       });
  266 |       
  267 |       expect(cls).toBeLessThan(0.1);
  268 |     });
  269 |   });
  270 | });
  271 | 
  272 | test.describe('Cross-browser/Device', () => {
  273 |   test.describe.configure({ retries: 1 });
  274 | 
  275 |   test('Works on mobile viewport', async ({ page }) => {
  276 |     await page.setViewportSize({ width: 375, height: 667 });
  277 |     await page.goto('/login');
  278 |     
  279 |     for (const digit of '1234') {
  280 |       await page.click(`[data-testid="numpad-${digit}"]`);
  281 |     }
  282 |     
  283 |     await expect(page.locator('[data-screen="home"]')).toBeVisible();
  284 |   });
  285 | 
  286 |   test('Works on tablet viewport', async ({ page }) => {
  287 |     await page.setViewportSize({ width: 768, height: 1024 });
  288 |     await page.goto('/login');
  289 |     
  290 |     for (const digit of '1234') {
  291 |       await page.click(`[data-testid="numpad-${digit}"]`);
  292 |     }
  293 |     
  294 |     await expect(page.locator('[data-screen="home"]')).toBeVisible();
  295 |   });
  296 | 
  297 |   test('Works on desktop viewport', async ({ page }) => {
  298 |     await page.setViewportSize({ width: 1440, height: 900 });
  299 |     await page.goto('/login');
  300 |     
  301 |     for (const digit of '1234') {
  302 |       await page.click(`[data-testid="numpad-${digit}"]`);
  303 |     }
  304 |     
  305 |     await expect(page.locator('[data-screen="home"]')).toBeVisible();
  306 |   });
  307 | });
  308 | 
  309 | test.describe('Regression Prevention', () => {
  310 |   test('No console errors on any screen', async ({ page }) => {
  311 |     const errors: string[] = [];
  312 |     page.on('console', msg => {
  313 |       if (msg.type() === 'error') {
  314 |         errors.push(msg.text());
  315 |       }
  316 |     });
  317 | 
  318 |     const screens = [
  319 |       '/login', '/home', '/subs-dashboard', '/security',
  320 |       '/me-profile', '/notifications'
  321 |     ];
  322 | 
  323 |     for (const screen of screens) {
  324 |       await page.goto(screen, { timeout: 15000 });
  325 |       await page.waitForLoadState('domcontentloaded');
  326 |       await page.waitForTimeout(300);
  327 |     }
  328 | 
  329 |     // Filter out known non-critical errors
  330 |     const criticalErrors = errors.filter(e => 
  331 |       !e.includes('favicon') && 
  332 |       !e.includes('api/security-status') &&
  333 |       !e.includes('net::ERR')
  334 |     );
  335 |     expect(criticalErrors).toHaveLength(0);
  336 |   });
  337 | 
  338 |   test('No duplicate IDs', async ({ page }) => {
  339 |     await page.goto('/home');
  340 |     
  341 |     const duplicateIds = await page.evaluate(() => {
  342 |       const ids = new Set();
```