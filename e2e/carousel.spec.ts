import { expect, test } from '@playwright/test'

const netNowSources = [
  '/assets/projects/net-now/home-web-mouse-over.webp',
  '/assets/projects/net-now/player-aovivo-web.webp',
  '/assets/projects/net-now/home-web-kids-personagem.webp',
  '/assets/projects/net-now/home-web-programas-tv.webp',
  '/assets/projects/net-now/grade-programacao.webp',
  '/assets/projects/net-now/detalhe-serie-web-03.webp',
]

function netNowCarousel(page: import('@playwright/test').Page) {
  return page.locator('.case-carousel').first()
}

function visibleCarouselImage(page: import('@playwright/test').Page) {
  return netNowCarousel(page).locator('img').locator('visible=true')
}

test('@CAR omits carousel chrome when Visual Story has exactly one image', async ({ page }) => {
  await page.goto('/en/work/net-now#carousel-static')

  await expect(page.locator('.case-gallery img')).toHaveCount(1)
  await expect(page.locator('.case-carousel')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Previous image' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Next image' })).toHaveCount(0)
  await expect(page.getByText('1 of 1')).toHaveCount(0)
})

test('@CAR shows exactly one NET NOW image at a time with localized controls', async ({
  page,
}) => {
  await page.goto('/en/work/net-now')

  const carousel = netNowCarousel(page)
  await expect(carousel.locator('img').locator('visible=true')).toHaveCount(1)
  await expect(carousel.getByRole('button', { name: 'Previous image' })).toBeVisible()
  await expect(carousel.getByRole('button', { name: 'Next image' })).toBeVisible()
  await expect(carousel.getByText('1 of 6')).toBeVisible()
  await expect(visibleCarouselImage(page)).toHaveAttribute('src', netNowSources[0])
})

test('@CAR localizes the position indicator in Portuguese', async ({ page }) => {
  await page.goto('/pt-br/work/net-now')

  await expect(page.locator('.case-carousel').first().getByText('1 de 6')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Imagem anterior' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Próxima imagem' })).toBeVisible()
})

test('@CAR advances NET NOW in approved order and wraps from last to first', async ({
  page,
}) => {
  await page.goto('/en/work/net-now')

  const carousel = netNowCarousel(page)
  const next = carousel.getByRole('button', { name: 'Next image' })

  await next.click()
  await expect(carousel.getByText('2 of 6')).toBeVisible()
  await expect(visibleCarouselImage(page)).toHaveAttribute('src', netNowSources[1])

  for (let step = 0; step < 4; step += 1) {
    await next.click()
  }
  await expect(carousel.getByText('6 of 6')).toBeVisible()
  await expect(visibleCarouselImage(page)).toHaveAttribute('src', netNowSources[5])

  await next.click()
  await expect(carousel.getByText('1 of 6')).toBeVisible()
  await expect(visibleCarouselImage(page)).toHaveAttribute('src', netNowSources[0])
})

test('@CAR wraps from the first NET NOW image to the last on previous', async ({ page }) => {
  await page.goto('/en/work/net-now')

  const carousel = netNowCarousel(page)
  await carousel.getByRole('button', { name: 'Previous image' }).click()

  await expect(carousel.getByText('6 of 6')).toBeVisible()
  await expect(visibleCarouselImage(page)).toHaveAttribute('src', netNowSources[5])
})

test('@CAR keeps one independent Xbox carousel per brand group', async ({ page }) => {
  await page.goto('/en/work/xbox-one')

  await expect(page.locator('.case-gallery__group > h3')).toHaveText([
    'GloboSat Play',
    'SKY Online',
    'Telecine Play',
    'Vivo Play',
  ])

  const globosat = page.locator('[data-gallery-group="globosat-play"]')
  const sky = page.locator('[data-gallery-group="sky-online"]')

  await expect(globosat.locator('.case-carousel')).toHaveCount(1)
  await expect(sky.locator('.case-carousel')).toHaveCount(1)
  await expect(globosat.getByText('1 of 7')).toBeVisible()
  await expect(sky.getByText('1 of 5')).toBeVisible()

  await globosat.getByRole('button', { name: 'Next image' }).click()
  await expect(globosat.getByText('2 of 7')).toBeVisible()
  await expect(sky.getByText('1 of 5')).toBeVisible()
})

test('@CAR preserves intrinsic dimensions lazy loading and alternative text', async ({
  page,
}) => {
  await page.goto('/en/work/net-now')

  const image = visibleCarouselImage(page)
  await expect(image).toHaveAttribute('src', /\.webp$/)
  await expect(image).toHaveAttribute('width', '1920')
  await expect(image).toHaveAttribute('height', '2953')
  await expect(image).toHaveAttribute('loading', 'lazy')
  await expect(image).toHaveAttribute('alt', /NET NOW/)
})

test('@CAR keeps alternative text and narrative after an image failure', async ({ page }) => {
  await page.route('**/assets/projects/net-now/*.webp', (route) => route.abort())
  await page.goto('/en/work/net-now')

  await expect(visibleCarouselImage(page)).toHaveAttribute('alt', /NET NOW/)
  await expect(page.getByRole('status')).toHaveText(
    'Historical image unavailable. The case narrative remains available.',
  )
  await expect(page.getByText(/defining transition from interface leadership/)).toBeVisible()
})

test('@CAR changes slides with arrow keys when the carousel is focused', async ({ page }) => {
  await page.goto('/en/work/net-now')

  const carousel = netNowCarousel(page)
  await carousel.focus()
  await page.keyboard.press('ArrowRight')
  await expect(carousel.getByText('2 of 6')).toBeVisible()
  await expect(visibleCarouselImage(page)).toHaveAttribute('src', netNowSources[1])

  await page.keyboard.press('ArrowLeft')
  await expect(carousel.getByText('1 of 6')).toBeVisible()
  await expect(visibleCarouselImage(page)).toHaveAttribute('src', netNowSources[0])
})

test('@CAR updates the slide instantly when reduced motion is requested', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/en/work/net-now')

  const carousel = netNowCarousel(page)
  await carousel.getByRole('button', { name: 'Next image' }).click()
  await expect(carousel.getByText('2 of 6')).toBeVisible()

  const image = visibleCarouselImage(page)
  await expect(image).toHaveAttribute('src', netNowSources[1])
  await expect(image).toHaveCSS('transform', 'none')
  expect(
    await image.evaluate((element) =>
      getComputedStyle(element)
        .transitionDuration.split(',')
        .every((duration) => Number.parseFloat(duration) <= 0.001),
    ),
  ).toBe(true)
})

test('@CAR keeps 44px controls, visible focus, and no 390px page overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/en/work/net-now')

  const next = netNowCarousel(page).getByRole('button', { name: 'Next image' })
  const box = await next.boundingBox()
  expect(box).toBeTruthy()
  expect(box?.width).toBeGreaterThanOrEqual(44)
  expect(box?.height).toBeGreaterThanOrEqual(44)

  await next.focus()
  const focusStyle = await next.evaluate((element) => {
    const style = getComputedStyle(element)
    return { color: style.outlineColor, width: style.outlineWidth }
  })
  expect(focusStyle.width).toBe('3px')
  expect(focusStyle.color).toBe('rgb(250, 255, 105)')

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)
})

test('@CAR changes slides on a horizontal swipe', async ({ page }) => {
  await page.goto('/en/work/net-now')

  const image = visibleCarouselImage(page)
  const box = await image.boundingBox()
  expect(box).toBeTruthy()
  if (!box) throw new Error('Visible carousel image has no box')

  await image.dragTo(image, {
    sourcePosition: { x: box.width * 0.8, y: box.height * 0.3 },
    targetPosition: { x: box.width * 0.15, y: box.height * 0.3 },
    force: true,
  })

  await expect(netNowCarousel(page).getByText('2 of 6')).toBeVisible()
  await expect(visibleCarouselImage(page)).toHaveAttribute('src', netNowSources[1])
})
