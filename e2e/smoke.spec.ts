import { expect, test } from '@playwright/test'

test('@T1 loads the Vite React application in Chromium', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Get started')
})
