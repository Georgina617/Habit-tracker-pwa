import { test, expect } from '@playwright/test';

test('full app flow', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page).toHaveURL(/login/);

  await page.goto('http://localhost:3000/signup');

  await page.fill('[data-testid="auth-signup-fullname"]', 'John Doe');
  await page.fill('[data-testid="auth-signup-email"]', 'test@example.com');
  await page.fill('[data-testid="auth-signup-password"]', 'password123');
  await page.fill(
    '[data-testid="auth-signup-confirm-password"]',
    'password123',
  );

  await page.click('[data-testid="auth-signup-submit"]');

  await expect(page).toHaveURL(/dashboard/);

  await page.click('text=Create Habit');

  await page.fill('[data-testid="habit-name-input"]', 'Read Book');
  await page.fill('[data-testid="habit-description-input"]', 'Daily reading');

  await page.click('[data-testid="habit-save-button"]');

  await expect(page.getByText('Read Book')).toBeVisible();

  await page.click('[data-testid^="habit-complete-"]');

  await expect(page.getByText(/Streak:/)).toBeVisible();

  page.on('dialog', (dialog) => dialog.accept());
  await page.click('[data-testid^="habit-delete-"]');

  await page.click('[data-testid="auth-logout-button"]');

  await expect(page).toHaveURL(/login/);
});
