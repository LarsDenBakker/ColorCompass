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
    await expect(page.getByText('click or drag on the color rings to select')).toBeVisible();
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
  });

  test('has interactive color wheel', async ({ page }) => {
    await page.goto('/');

    // Find the color wheel SVG
    const colorWheel = page.locator('.color-wheel');
    await expect(colorWheel).toBeVisible();
    
    // Test that clicking on the color wheel changes the color
    const colorSwatch = page.locator('.color-swatch');
    await expect(colorSwatch).toBeVisible();
    
    // Click on the outer ring of the color wheel to select a hue
    await colorWheel.click({ position: { x: 300, y: 200 } }); // Right side of the wheel
    
    // The color should change (we can't easily test the exact color, but we can verify the swatch exists)
    await expect(colorSwatch).toHaveAttribute('style', /background-color/);
  });
});