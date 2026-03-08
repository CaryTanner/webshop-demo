import { Page } from '@playwright/test';
import { routes } from './artifacts/routes';

export async function login(page: Page, email: string, password: string, goToLogin = false) {
  if (goToLogin) {
    await page.goto(routes.angularDevServer + '/login');
  }
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.waitForSelector('button[type="submit"]', { state: 'visible' });
  const loginButton = page.locator('button[type="submit"]');
  await loginButton.click();
}
