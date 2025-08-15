import { test, expect } from '@playwright/test';

test.describe('ColorCompass App', () => {
  test('has title and basic functionality', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring
    await expect(page).toHaveTitle(/ColorCompass/);

    // Expect the main heading to be visible
    await expect(page.getByRole('heading', { name: 'ColorCompass 🧭' })).toBeVisible();
    await expect(page.getByText('Navigate the world of colors with ease')).toBeVisible();

    // Expect Hello World content
    await expect(page.getByRole('heading', { name: 'Hello World!' })).toBeVisible();
    await expect(page.getByText('This is a mobile-first React app built with Vite.')).toBeVisible();

    // Test the counter button
    const button = page.getByRole('button', { name: 'Tapped 0 times' });
    await expect(button).toBeVisible();
    
    await button.click();
    await expect(page.getByRole('button', { name: 'Tapped 1 times' })).toBeVisible();
    
    await button.click();
    await expect(page.getByRole('button', { name: 'Tapped 2 times' })).toBeVisible();

    // Expect footer text
    await expect(page.getByText('Built with React, Vite, and ❤️')).toBeVisible();
  });

  test('is mobile-friendly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check that the app renders properly on mobile
    await expect(page.getByRole('heading', { name: 'ColorCompass 🧭' })).toBeVisible();
    const button = page.getByRole('button', { name: 'Tapped 0 times' });
    await expect(button).toBeVisible();
    
    // Test touch interaction
    await button.tap();
    await expect(page.getByRole('button', { name: 'Tapped 1 times' })).toBeVisible();
  });
});