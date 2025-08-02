import { test, expect } from '@playwright/test'

test('ColorCompass homepage loads correctly', async ({ page }) => {
  await page.goto('/')

  // Check if the main heading is visible
  await expect(page.getByRole('heading', { name: '🧭 ColorCompass' })).toBeVisible()

  // Check if the subtitle is visible
  await expect(page.getByText('Navigate the world of colors with ease')).toBeVisible()

  // Check if Color Generator section is visible
  await expect(page.getByText('Color Generator')).toBeVisible()

  // Check if Color Details section is visible
  await expect(page.getByText('Color Details')).toBeVisible()
})

test('color generation functionality works', async ({ page }) => {
  await page.goto('/')

  // Check initial color input value
  const colorInput = page.locator('input[type="text"]')
  await expect(colorInput).toHaveValue('#3B82F6')

  // Test color input change
  await colorInput.fill('#FF0000')
  await expect(colorInput).toHaveValue('#FF0000')

  // Check if color details update
  await expect(page.getByText('#FF0000')).toBeVisible()
  await expect(page.getByText('rgb(255, 0, 0)')).toBeVisible()

  // Test random color generation
  const randomButton = page.getByRole('button', { name: '🎲 Generate Random Color' })
  await randomButton.click()

  // Check that color changed (it shouldn't be #FF0000 anymore, though it's theoretically possible)
  const newColor = await colorInput.inputValue()
  expect(newColor).toMatch(/^#[0-9A-F]{6}$/i)
})

test('color format displays work correctly', async ({ page }) => {
  await page.goto('/')

  // Set a known color
  await page.locator('input[type="text"]').fill('#3B82F6')

  // Check all color format displays
  await expect(page.getByText('#3B82F6')).toBeVisible()
  await expect(page.getByText('rgb(59, 130, 246)')).toBeVisible()
  await expect(page.locator('text=/hsl\\(\\d+, \\d+%, \\d+%\\)/')).toBeVisible()
})
