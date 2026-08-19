import { expect, test } from '@playwright/test'

test('@T6 presents the English positioning and approved contacts', async ({ page }) => {
  await page.goto('/en')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Designing interfaces. Building products. Leading front-end evolution.',
  )
  await expect(
    page.locator('.home-hero').getByText('Front-End Tech Lead', { exact: true }),
  ).toBeVisible()
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
  await expect(
    page.locator('.home-hero').getByText('Front-End Tech Lead', { exact: true }),
  ).toBeVisible()
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

test('@T7 renders the five selected projects in editorial order', async ({ page }) => {
  await page.goto('/en')
  const cards = page.locator('.project-card')

  await expect(cards.getByRole('heading', { level: 3 })).toHaveText([
    'NET NOW',
    'Xbox One Entertainment Apps',
    'SKY Online',
    'Microsoft / GPA',
    'Xelix',
  ])
  await expect(cards).toHaveCount(5)
})

test('@T7 keeps period, role and significance visible on every card', async ({ page }) => {
  await page.goto('/en')

  for (const card of await page.locator('.project-card').all()) {
    await expect(card.locator('.project-card__period')).not.toHaveText('')
    await expect(card.locator('.project-card__role')).not.toHaveText('')
    await expect(card.locator('.project-card__significance')).not.toHaveText('')
  }
})

test('@T7 links the four priority cards to localized case routes', async ({ page }) => {
  await page.goto('/pt-br')

  for (const slug of ['net-now', 'xbox-one', 'sky-online', 'microsoft-gpa']) {
    await expect(page.locator(`[data-project="${slug}"]`).getByRole('link')).toHaveAttribute(
      'href',
      `/pt-br/work/${slug}`,
    )
  }
  await expect(page.locator('[data-project="xelix"]').getByRole('link')).toHaveCount(0)
})

test('@T7 makes NET NOW the largest desktop mosaic item', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/en')

  const netNow = page.locator('[data-project="net-now"]')
  const xbox = page.locator('[data-project="xbox-one"]')
  await expect(netNow).toHaveCSS('grid-column-end', 'span 7')
  await expect(netNow).toHaveCSS('grid-row-end', 'span 2')
  const netNowBox = await netNow.boundingBox()
  const xboxBox = await xbox.boundingBox()
  if (!netNowBox || !xboxBox) throw new Error('Desktop project cards have no rendered boxes')
  expect(netNowBox.height).toBeGreaterThan(xboxBox.height)
})

test('@T7 stacks readable cards without mobile page overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/en')

  for (const card of await page.locator('.project-card').all()) {
    const box = await card.boundingBox()
    if (!box) throw new Error('Project card has no rendered box')
    expect(box.width).toBeLessThanOrEqual(342)
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    ),
  ).toBe(false)
})

test('@T7 preserves localized significance on flat card surfaces', async ({ page }) => {
  await page.goto('/pt-br')
  const netNow = page.locator('[data-project="net-now"]')

  await expect(netNow.locator('.project-card__significance')).toHaveText(
    'O ponto de virada da liderança em UX para a engenharia React.',
  )
  const style = await netNow.evaluate((element) => {
    const computed = getComputedStyle(element)
    return { background: computed.backgroundColor, shadow: computed.boxShadow }
  })
  expect(style).toEqual({ background: 'rgb(26, 26, 26)', shadow: 'none' })
})
