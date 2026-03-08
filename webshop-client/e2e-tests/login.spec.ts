// e2e/login.spec.ts
import { test, expect } from '@playwright/test';
import { routes } from './artifacts/routes';
import { login } from './helpers';

test.describe('Login flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routes.angularDevServer + '/login');
  });

  test('should login with valid credentials', async ({ page }) => {
    await login(page, 'admin@email.com', 'admin123');

    // Wait for redirect after successful login
    await expect(page).toHaveURL(routes.angularDevServer + '/home');

    // Verify token was stored
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeTruthy();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await login(page, 'wrong@email.com', 'wrongpassword');

    await expect(page.getByText(/invalid email or password/i)).toBeVisible();
  });

  // auth guard test
  test('should redirect to login when accessing login protected route', async ({ page }) => {
    await page.goto(routes.angularDevServer + '/account');
    await expect(page).toHaveURL(routes.angularDevServer + '/login?redirectUrl=%2Faccount');
  });

  // redirect after auth guard login required
  test('should redirect after successful login when accessing login protected route', async ({
    page,
  }) => {
    await page.goto(routes.angularDevServer + '/account');
    await expect(page).toHaveURL(routes.angularDevServer + '/login?redirectUrl=%2Faccount');
    await login(page, 'admin@email.com', 'admin123');
    await expect(page).toHaveURL(routes.angularDevServer + '/account');
  });

  // admin guard test
  test('should redirect to home when accessing admin protected route', async ({ page }) => {
    await login(page, 'not.admin@email.com', 'notAdmin123');

    // Wait for redirect after successful login
    await expect(page).toHaveURL(routes.angularDevServer + '/home');

    // Try to access admin protected route
    await page.goto(routes.angularDevServer + '/products/manage/create');
    await expect(page).toHaveURL(routes.angularDevServer + '/home');
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await login(page, 'admin@email.com', 'admin123');
    await expect(page).toHaveURL(routes.angularDevServer + '/home');

    const loginLogoutButton = await page.locator(
      'button[aria-label="Login"], button[aria-label="Logout"]',
    );

    // Logout
    await loginLogoutButton.click();

    // Token should be cleared
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeNull();

    // Should redirect to home
    await expect(page).toHaveURL(routes.angularDevServer + '/home');
  });
});
