import { Page, Locator, expect } from '@playwright/test';

/**
 * Splash Screen
 */
export class SplashScreen {
  readonly page: Page;
  readonly createAccountBtn = () => this.page.locator('[data-testid="create-account-btn"]');
  readonly logo = () => this.page.locator('[data-testid="splash-logo"]');

  constructor(page: Page) {
    this.page = page;
  }

  async waitForLoad() {
    await this.page.waitForSelector('[data-screen="splash"]', { state: 'visible', timeout: 10000 });
  }

  async clickCreateAccount() {
    await this.createAccountBtn().click();
  }
}

/**
 * Create Account Screen
 */
export class CreateAccountScreen {
  readonly page: Page;
  readonly phoneInput = () => this.page.locator('[data-testid="phone-input"]');
  readonly continueBtn = () => this.page.locator('[data-testid="continue-btn"]');
  readonly phoneError = () => this.page.locator('[data-testid="phone-error"]');

  constructor(page: Page) {
    this.page = page;
  }

  async waitForLoad() {
    await this.page.waitForSelector('[data-screen="create-account"]', { state: 'visible', timeout: 10000 });
  }

  async enterPhone(phone: string) {
    await this.phoneInput().fill(phone);
  }

  async clickContinue() {
    await this.continueBtn().click();
  }

  async expectPhoneError() {
    await expect(this.phoneError()).toBeVisible();
  }
}

/**
 * Verify OTP Screen
 */
export class VerifyOtpScreen {
  readonly page: Page;
  readonly otpInputs = () => this.page.locator('[data-testid="otp-input"]');
  readonly pasteBtn = () => this.page.locator('[data-testid="paste-otp-btn"]');
  readonly resendBtn = () => this.page.locator('[data-testid="resend-otp-btn"]');
  readonly resendTimer = () => this.page.locator('[data-testid="resend-timer"]');

  constructor(page: Page) {
    this.page = page;
  }

  async waitForLoad() {
    await this.page.waitForSelector('[data-screen="verify-otp"]', { state: 'visible', timeout: 10000 });
  }

  async enterOtp(otp: string) {
    const inputs = this.otpInputs();
    await expect(inputs).toHaveCount(6);
    for (let i = 0; i < otp.length; i++) {
      await inputs.nth(i).fill(otp[i]);
    }
  }

  async clickPaste() {
    await this.pasteBtn().click();
  }

  async waitForResend() {
    await expect(this.resendTimer()).toHaveText('0s', { timeout: 35000 });
  }

  async clickResend() {
    await this.resendBtn().click();
  }
}

/**
 * Create PIN Screen
 */
export class CreatePinScreen {
  readonly page: Page;
  readonly step = () => this.page.locator('[data-testid="pin-step"]');
  readonly pinDots = () => this.page.locator('[data-testid="pin-dot"]');
  readonly errorMessage = () => this.page.locator('[data-testid="pin-error"]');
  readonly numpad = () => this.page.locator('[data-testid="numpad"]');

  constructor(page: Page) {
    this.page = page;
  }

  async waitForLoad() {
    await this.page.waitForSelector('[data-screen="create-pin"]', { state: 'visible', timeout: 10000 });
  }

  async enterPin(pin: string) {
    for (const digit of pin) {
      await this.page.click(`[data-testid="numpad-${digit}"]`);
    }
  }

  async confirmPin(pin: string) {
    await this.enterPin(pin);
  }

  async expectError(message: string) {
    await expect(this.page.locator(`[data-testid="pin-error"] >> text=${message}`)).toBeVisible();
  }
}

/**
 * Login Screen
 */
export class LoginScreen {
  readonly page: Page;
  readonly pinDots = () => this.page.locator('[data-testid="pin-dot"]');
  readonly numpad = () => this.page.locator('[data-testid="numpad"]');
  readonly faceIdBtn = () => this.page.locator('[data-testid="face-id-btn"]');
  readonly forgotPinBtn = () => this.page.locator('[data-testid="forgot-pin-btn"]');
  readonly switchToPhoneBtn = () => this.page.locator('[data-testid="switch-to-phone-btn"]');
  readonly phoneInput = () => this.page.locator('[data-testid="phone-input"]');
  readonly continueBtn = () => this.page.locator('[data-testid="continue-btn"]');
  readonly wrongPhoneError = () => this.page.locator('[data-testid="phone-error"]');

  constructor(page: Page) {
    this.page = page;
  }

  async waitForLoad() {
    await this.page.waitForSelector('[data-screen="login"]', { state: 'visible', timeout: 10000 });
  }

  async enterPin(pin: string) {
    for (const digit of pin) {
      await this.page.click(`[data-testid="numpad-${digit}"]`);
    }
  }

  async clickForgotPin() {
    await this.forgotPinBtn().click();
  }

  async switchToPhoneInput() {
    await this.switchToPhoneBtn().click();
  }

  async enterPhone(phone: string) {
    await this.phoneInput().fill(phone);
  }

  async clickContinue() {
    await this.continueBtn().click();
  }

  async clickFaceId() {
    await this.faceIdBtn().click();
  }

  async expectWrongAttempts(remaining: number) {
    await expect(this.page.locator(`text=${remaining} attempt${remaining !== 1 ? 's' : ''} remaining`)).toBeVisible();
  }

  async expectPanicMode() {
    await expect(this.page.locator('text=Too many attempts. Account temporarily locked')).toBeVisible();
  }
}

/**
 * Home Screen
 */
export class HomeScreen {
  readonly page: Page;
  readonly shieldToggle = () => this.page.locator('[data-testid="shield-toggle"]');
  readonly shieldStatus = () => this.page.locator('[data-testid="shield-status"]');
  readonly wastedAmount = () => this.page.locator('[data-testid="wasted-amount"]');
  readonly smartNudges = () => this.page.locator('[data-testid="smart-nudges"]');
  readonly activityList = () => this.page.locator('[data-testid="activity-list"]');
  readonly bottomNav = () => this.page.locator('[data-testid="bottom-nav"]');
  readonly profileBtn = () => this.page.locator('[data-testid="profile-btn"]');
  readonly notificationsBtn = () => this.page.locator('[data-testid="notifications-btn"]');
  readonly scanQrBtn = () => this.page.locator('[data-testid="scan-qr-btn"]');
  readonly pullToRefresh = () => this.page.locator('[data-testid="pull-to-refresh"]');

  constructor(page: Page) {
    this.page = page;
  }

  async waitForLoad() {
    await this.page.waitForSelector('[data-screen="home"]', { state: 'visible', timeout: 10000 });
  }

  async toggleShield() {
    await this.shieldToggle().click();
  }

  async getShieldStatus(): Promise<string> {
    return await this.shieldStatus().textContent() || '';
  }

  async getWastedAmount(): Promise<string> {
    return await this.wastedAmount().textContent() || '';
  }

  async clickNudge(index: number) {
    await this.smartNudges().locator('[data-testid="nudge-card"]').nth(index).click();
  }

  async clickActivity(index: number) {
    await this.activityList.locator('[data-testid="activity-item"]').nth(index).click();
  }

  async clickBottomNav(label: string) {
    await this.page.click(`[data-testid="bottom-nav-${label.toLowerCase()}"]`);
  }

  async pullToRefresh() {
    await this.pullToRefresh().evaluate(el => el.dispatchEvent(new Event('refresh')));
  }

  async expectShieldActive() {
    await expect(this.shieldToggle()).toHaveAttribute('aria-checked', 'true');
  }

  async expectShieldPaused() {
    await expect(this.shieldToggle()).toHaveAttribute('aria-checked', 'false');
  }
}

/**
 * Scan QR Screen
 */
export class ScanQrScreen {
  readonly page: Page;
  readonly cameraView = () => this.page.locator('[data-testid="camera-view"]');
  readonly flashToggle = () => this.page.locator('[data-testid="flash-toggle"]');
  readonly galleryBtn = () => this.page.locator('[data-testid="gallery-btn"]');
  readonly manualEntryBtn = () => this.page.locator('[data-testid="manual-entry-btn"]');

  constructor(page: Page) {
    this.page = page;
  }

  async waitForLoad() {
    await this.page.waitForSelector('[data-screen="scan-qr"]', { state: 'visible', timeout: 10000 });
  }

  async toggleFlash() {
    await this.flashToggle().click();
  }

  async clickGallery() {
    await this.galleryBtn().click();
  }

  async clickManualEntry() {
    await this.manualEntryBtn().click();
  }
}

/**
 * Link Bank Screen
 */
export class LinkBankScreen {
  readonly page: Page;
  readonly bankList = () => this.page.locator('[data-testid="bank-list"]');
  readonly searchInput = () => this.page.locator('[data-testid="bank-search"]');
  readonly manualEntryBtn = () => this.page.locator('[data-testid="manual-entry-btn"]');

  constructor(page: Page) {
    this.page = page;
  }

  async waitForLoad() {
    await this.page.waitForSelector('[data-screen="link-bank"]', { state: 'visible', timeout: 10000 });
  }

  async selectBank(bankName: string) {
    await this.bankList.locator(`[data-testid="bank-${bankName.toLowerCase()}"]`).click();
  }

  async searchBank(query: string) {
    await this.searchInput().fill(query);
  }
}

/**
 * Link Bank Progress Screen
 */
export class LinkBankProgressScreen {
  readonly page: Page;
  readonly progressSteps = () => this.page.locator('[data-testid="progress-step"]');
  readonly currentStep = () => this.page.locator('[data-testid="current-step"]');

  constructor(page: Page) {
    this.page = page;
  }

  async waitForLoad() {
    await this.page.waitForSelector('[data-screen="link-bank-progress"]', { state: 'visible', timeout: 10000 });
  }

  async expectStepComplete(stepIndex: number) {
    await expect(this.progressSteps.nth(stepIndex)).toHaveClass(/completed/);
  }
}
