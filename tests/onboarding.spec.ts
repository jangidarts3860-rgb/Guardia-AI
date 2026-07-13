import { test, expect } from '@playwright/test';
import { 
  SplashScreen, 
  CreateAccountScreen, 
  VerifyOtpScreen, 
  CreatePinScreen,
  HomeScreen,
  LoginScreen,
} from './pages/page-objects';

test.describe('Onboarding Flow', () => {
  test('Splash -> Create Account -> Verify OTP -> Create PIN -> Home', async ({ page }) => {
    // Splash Screen
    const splash = new SplashScreen(page);
    await splash.waitForLoad();
    await splash.clickCreateAccount();

    // Create Account
    const createAccount = new CreateAccountScreen(page);
    await createAccount.waitForLoad();
    await createAccount.enterPhone('9876543210');
    await createAccount.clickContinue();

    // Verify OTP
    const verifyOtp = new VerifyOtpScreen(page);
    await verifyOtp.waitForLoad();
    await verifyOtp.enterOtp('123456');

    // Create PIN
    const createPin = new CreatePinScreen(page);
    await createPin.waitForLoad();
    await createPin.enterPin('1234');
    await createPin.confirmPin('1234');

    // Should land on Home
    await expect(page.locator('[data-screen="home"]')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('[data-testid="shield-toggle"]')).toBeVisible();
  });

  test('Create Account with invalid phone shows error', async ({ page }) => {
    const splash = new SplashScreen(page);
    await splash.waitForLoad();
    await splash.clickCreateAccount();

    const createAccount = new CreateAccountScreen(page);
    await createAccount.waitForLoad();
    await createAccount.enterPhone('123');
    await createAccount.clickContinue();
    await createAccount.expectPhoneError();
  });

  test('Resend OTP timer works', async ({ page }) => {
    const splash = new SplashScreen(page);
    await splash.waitForLoad();
    await splash.clickCreateAccount();

    const createAccount = new CreateAccountScreen(page);
    await createAccount.waitForLoad();
    await createAccount.enterPhone('9876543210');
    await createAccount.clickContinue();

    const verifyOtp = new VerifyOtpScreen(page);
    await verifyOtp.waitForLoad();
    
    // Wait for resend timer to complete
    await verifyOtp.waitForResend();
    
    // Resend button should be enabled
    const resendBtn = page.locator('[data-testid="resend-otp-btn"]');
    await expect(resendBtn).toBeEnabled();
  });
});