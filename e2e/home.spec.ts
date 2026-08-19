import { expect, test } from '@playwright/test'

test('@T6 presents the English positioning and approved contacts', async ({ page }) => {
  await page.goto('/en')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Designing interfaces. Building products. Leading front-end evolution.',
  )
  await expect(page.getByText('Front-End Tech Lead', { exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'leonardo.vitale@outlook.com' })).toHaveAttribute(
    'href',
    'mailto:leonardo.vitale@outlook.com',
  )
  await expect(page.getByRole('link', { name: '+55 11 99676-2153' })).toHaveAttribute(
    'href',
    'tel:+5511996762153',
  )
})

test('@T6 presents equivalent Portuguese positioning', async ({ page }) => {
  await page.goto('/pt-br')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Desenhando interfaces. Construindo produtos. Liderando a evolução do front-end.',
  )
  await expect(page.getByText('Front-End Tech Lead', { exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Explorar trabalhos selecionados' })).toHaveAttribute(
    'href',
    '/pt-br/work',
  )
})

test('@T6 uses a seven-five hero with primary actions in the first desktop viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/en')

  const narrative = page.locator('.home-hero__narrative')
  const visual = page.locator('.home-hero__visual')
  await expect(narrative).toHaveCSS('grid-column-start', '1')
  await expect(narrative).toHaveCSS('grid-column-end', 'span 7')
  await expect(visual).toHaveCSS('grid-column-start', '8')
  await expect(visual).toHaveCSS('grid-column-end', 'span 5')

  for (const name of ['Explore selected work', 'About / Resume', 'Contact']) {
    const action = narrative.getByRole('link', { name })
    await expect(action).toBeVisible()
    const actionBox = await action.boundingBox()
    if (!actionBox) throw new Error(`${name} has no rendered box`)
    expect(actionBox.y).toBeLessThan(900)
  }
  const visualBox = await visual.boundingBox()
  if (!visualBox) throw new Error('Hero visual has no rendered box')
  expect(visualBox.y).toBeLessThan(900)
})

test('@T6 renders only the four supported career signals', async ({ page }) => {
  await page.goto('/en')
  const signals = page.locator('.career-signals strong')

  await expect(signals).toHaveText(['20+ years', 'React since 2015', '6 engineers', '~30% faster'])
})
