import { expect, test } from '@playwright/test'

test('@T10 renders the direct English Work route', async ({ page }) => {
  await page.goto('/en/work')

  await expect(page).toHaveURL(/\/en\/work$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Selected product chapters')
  await expect(page.locator('.work-index .project-card')).toHaveCount(5)
})

test('@T10 renders complete localized Portuguese Work content', async ({ page }) => {
  await page.goto('/pt-br/work')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Capítulos de produto selecionados',
  )
  await expect(page.getByText('Casos prioritários', { exact: true })).toBeVisible()
  await expect(page.getByText('Liderança atual', { exact: true })).toBeVisible()
})

test('@T10 exposes four case links while Xelix remains non-detail content', async ({ page }) => {
  await page.goto('/en/work')

  for (const slug of ['net-now', 'xbox-one', 'sky-online', 'microsoft-gpa']) {
    await expect(page.locator(`[data-project="${slug}"]`).getByRole('link')).toHaveAttribute(
      'href',
      `/en/work/${slug}`,
    )
  }
  await expect(page.locator('[data-project="xelix"]').getByRole('link')).toHaveCount(0)
})

test('@T10 does not present deferred archive work as completed P1 routes', async ({ page }) => {
  await page.goto('/en/work')
  const main = page.getByRole('main')

  await expect(main).not.toContainText('CNA Prototype')
  await expect(main).not.toContainText('Video Commerce')
  await expect(main).not.toContainText('Xbox 360')
  await expect(main).toContainText(
    'Additional historical work remains in the archive and is not published as a V1 case study.',
  )
})
