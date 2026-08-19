import { expect, test } from '@playwright/test'

test('@T1 loads the Vite React application in Chromium', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveURL(/\/(en|pt-br)$/)
  const mainHeading = page.getByRole('heading', { level: 1 })
  await expect(mainHeading).toBeVisible()
  await expect(mainHeading).not.toHaveText('')
})
