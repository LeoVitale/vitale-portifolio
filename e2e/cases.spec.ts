import { expect, test } from '@playwright/test'

test('@T11 resolves a priority slug into the shared semantic case structure', async ({ page }) => {
  await page.goto('/en/work/net-now')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('NET NOW')
  await expect(page.locator('.case-study__metadata time')).toHaveText('circa 2015–2017')
  await expect(page.locator('.case-study__role')).toHaveText('Front-End Tech Lead + UX Lead')
  await expect(page.locator('.case-study__tags li')).toHaveCount(4)
  await expect(page.locator('.case-study__thesis')).toHaveText(
    'The project where UX leadership, player design and React engineering converged.',
  )
})

test('@T11 renders every required case section and deliberate next-chapter band', async ({
  page,
}) => {
  await page.goto('/en/work/net-now')

  for (const heading of [
    'Context',
    'My Role',
    'Visual Story',
    'Impact / Outcome',
    'What Changed Next',
  ]) {
    await expect(page.getByRole('heading', { name: heading })).toBeVisible()
  }
  await expect(page.locator('.case-study__next')).toHaveCSS(
    'background-color',
    'rgb(250, 255, 105)',
  )
  const impact = page.locator('.case-study__impact')
  expect(Number.parseFloat(await impact.locator('p').evaluate((element) => getComputedStyle(element).fontSize)))
    .toBeGreaterThan(Number.parseFloat(await impact.locator('h2').evaluate((element) => getComputedStyle(element).fontSize)))
  await expect(impact.locator('svg, canvas')).toHaveCount(0)
})

test('@T11 presents optimized gallery images with intrinsic dimensions and lazy loading', async ({
  page,
}) => {
  await page.goto('/en/work/net-now')

  const image = page.locator('.case-gallery img').first()
  await expect(image).toHaveAttribute('src', /\.webp$/)
  await expect(image).toHaveAttribute('width', '1920')
  await expect(image).toHaveAttribute('height', '1080')
  await expect(image).toHaveAttribute('loading', 'lazy')
  await expect(image).toHaveAttribute('alt', /NET NOW/)
})

test('@T11 keeps localized alt text and narrative readable after an image failure', async ({
  page,
}) => {
  await page.route('**/assets/projects/net-now/*.webp', (route) => route.abort())
  await page.goto('/en/work/net-now')

  const image = page.locator('.case-gallery img').first()
  await expect(image).toHaveAttribute('alt', /NET NOW/)
  await expect(page.getByRole('status')).toHaveText(
    'Historical image unavailable. The case narrative remains available.',
  )
  await expect(page.getByText(/defining transition from interface leadership/)).toBeVisible()
})

test('@T11 preserves source aspect ratio without fake device framing', async ({ page }) => {
  await page.goto('/en/work/net-now')

  const galleryItems = page.locator('.case-gallery__item')
  await expect(galleryItems).toHaveCount(2)
  await expect(galleryItems.nth(0)).toHaveClass(/case-gallery__item--wide/)
  await expect(galleryItems.nth(1)).toHaveClass(/case-gallery__item--detail/)

  const image = galleryItems.locator('img').first()
  const dimensions = await image.evaluate((element) => {
    const imageElement = element as HTMLImageElement
    return {
      renderedRatio: imageElement.getBoundingClientRect().width / imageElement.getBoundingClientRect().height,
      sourceRatio: Number(imageElement.getAttribute('width')) / Number(imageElement.getAttribute('height')),
    }
  })

  expect(dimensions.renderedRatio).toBeCloseTo(dimensions.sourceRatio, 1)
  await expect(page.locator('.case-gallery')).not.toHaveClass(/device|browser|mockup/)
})

test('@T11 keeps the shared case readable without horizontal overflow at 390px', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/pt-br/work/net-now')

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)
  await expect(page.getByRole('heading', { name: 'História visual' })).toBeVisible()
  await expect(page.locator('.case-gallery img').first()).toHaveAttribute('alt', /NET NOW/)
})
