import { test, expect } from '@playwright/test';

test.describe('ColorCompass App', () => {
  test('has title and color compass interface', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring
    await expect(page).toHaveTitle(/ColorCompass/);

    // Expect the main heading to be visible
    await expect(page.getByText('COLOR')).toBeVisible();
    await expect(page.getByText('Compass')).toBeVisible();

    // Expect navigation tabs
    await expect(page.getByRole('button', { name: 'HOME' })).toBeVisible();
    await expect(page.getByRole('button', { name: /SKIN/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /PAINT/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /MOODBOARD/ })).toBeVisible();

    // Expect color selection interface
    await expect(page.getByText('SELECTED')).toBeVisible();
    await expect(page.getByText('main color')).toBeVisible();
    await expect(page.getByText('complementary color')).toBeVisible();

    // Test navigation tab switching
    const homeTab = page.getByRole('button', { name: 'HOME' });
    const skinTab = page.getByRole('button', { name: /SKIN/ });
    
    await expect(homeTab).toHaveClass(/active/);
    await skinTab.click();
    await expect(skinTab).toHaveClass(/active/);
  });

  test('has color options and checkboxes', async ({ page }) => {
    await page.goto('/');

    // Test checkboxes
    const skinToneCheckbox = page.getByRole('checkbox', { name: 'skin tone' });
    const paintColorCheckbox = page.getByRole('checkbox', { name: 'paint color' });
    const exportCheckbox = page.getByRole('checkbox', { name: 'export to moodboard' });

    await expect(skinToneCheckbox).toBeChecked();
    await expect(paintColorCheckbox).toBeChecked();
    await expect(exportCheckbox).not.toBeChecked();

    // Test checkbox interaction
    await exportCheckbox.click();
    await expect(exportCheckbox).toBeChecked();

    // Expect instruction text
    await expect(page.getByText('double tap or hold to select colors')).toBeVisible();
  });

  test('is mobile-friendly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check that the app renders properly on mobile
    await expect(page.getByText('COLOR')).toBeVisible();
    await expect(page.getByText('Compass')).toBeVisible();
    
    // Check navigation tabs are accessible on mobile
    await expect(page.getByRole('button', { name: 'HOME' })).toBeVisible();
    await expect(page.getByRole('button', { name: /SKIN/ })).toBeVisible();
    
    // Test touch interaction on navigation
    const skinTab = page.getByRole('button', { name: /SKIN/ });
    await skinTab.tap();
    await expect(skinTab).toHaveClass(/active/);

    // Check color selection interface is visible on mobile
    await expect(page.getByText('main color')).toBeVisible();
    await expect(page.getByText('complementary color')).toBeVisible();
  });
});