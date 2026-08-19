import { expect, test, type Page } from '@playwright/test'

const p1Routes = [
  '/en',
  '/en/work',
  '/en/work/net-now',
  '/en/work/xbox-one',
  '/en/work/sky-online',
  '/en/work/microsoft-gpa',
  '/en/about',
] as const

for (const route of p1Routes) {
  test(`@T18 keeps ${route} readable without horizontal overflow at 390px`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(route)

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(
      await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
      })),
    ).toEqual({ documentWidth: 390, viewportWidth: 390 })
  })
}

test('@T18 centers every P1 category at 1440px and preserves the editorial grid rhythm', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 })

  for (const route of ['/en', '/en/work', '/en/work/net-now', '/en/about']) {
    await page.goto(route)
    const bounds = await page.locator('#main-content > *').boundingBox()
    expect(bounds).not.toBeNull()
    if (!bounds) throw new Error(`Missing page bounds for ${route}`)
    expect(bounds.width).toBeLessThanOrEqual(1280)
    expect(Math.abs(bounds.x - (1440 - bounds.width) / 2)).toBeLessThanOrEqual(1)
  }

  await page.goto('/en')
  await expect(page.locator('.home-page')).toHaveCSS('row-gap', '96px')
  expect(await gridColumnCount(page, '.home-hero')).toBe(12)

  await page.goto('/en/work/net-now')
  await expect(page.locator('.case-study')).toHaveCSS('row-gap', '96px')
  expect(
    await gridColumnCount(page, 'section[aria-labelledby="case-context-title"]'),
  ).toBe(12)
})

test('@T18 keeps global, case, resume, contact and locale controls keyboard reachable in DOM order', async ({
  page,
}) => {
  await page.goto('/en/about')

  const controls = page.locator(
    'a[href="/en/work"], .language-selector button:first-of-type, a[href="/resume/leonardo-vitale-resume-en.pdf"], a[href^="mailto:"], a[href^="tel:"]',
  )
  await expect(controls).toHaveCount(5)
  expect(await controls.evaluateAll((elements) => elements.every((element) => element.tabIndex === 0))).toBe(
    true,
  )
  expect(
    await controls.evaluateAll((elements) =>
      elements.every(
        (element, index) =>
          index === 0 ||
          Boolean(
            elements[index - 1].compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING,
          ),
      ),
    ),
  ).toBe(true)

  await page.goto('/en')
  await expect(page.locator('.project-card__link').first()).toHaveJSProperty('tabIndex', 0)
  await page.goto('/en/work/net-now')
  await expect(page.locator('.case-study__next-link')).toHaveJSProperty('tabIndex', 0)
})

test('@T18 maintains focus and text contrast above the specified thresholds', async ({ page }) => {
  await page.goto('/en')
  const workLink = page.getByRole('link', { name: 'Work', exact: true })
  await workLink.focus()

  const colors = await workLink.evaluate((element) => {
    const focus = getComputedStyle(element)
    const body = getComputedStyle(document.body)
    const primaryElement = document.querySelector('.button--primary')
    if (!primaryElement) throw new Error('Primary action is missing')
    const primary = getComputedStyle(primaryElement)
    return {
      outlineColor: focus.outlineColor,
      outlineWidth: focus.outlineWidth,
      canvas: body.backgroundColor,
      body: body.color,
      primaryBackground: primary.backgroundColor,
      primaryText: primary.color,
    }
  })

  expect(Number.parseFloat(colors.outlineWidth)).toBeGreaterThanOrEqual(2)
  expect(Number.parseFloat(colors.outlineWidth)).toBeLessThanOrEqual(4)
  expect(contrastRatio(colors.outlineColor, colors.canvas)).toBeGreaterThanOrEqual(3)
  expect(contrastRatio(colors.body, colors.canvas)).toBeGreaterThanOrEqual(4.5)
  expect(contrastRatio(colors.primaryText, colors.primaryBackground)).toBeGreaterThanOrEqual(3)
})

test('@T18 applies localized titles descriptions canonicals language and image alternatives', async ({
  page,
}) => {
  const expectations = [
    ['/en', 'Leonardo Vitale — Front-End Tech Lead', 'en'],
    ['/en/work', 'Selected Work — Leonardo Vitale', 'en'],
    ['/en/about', 'About and Resume — Leonardo Vitale', 'en'],
    ['/en/work/net-now', 'NET NOW — Case Study — Leonardo Vitale', 'en'],
    ['/pt-br', 'Leonardo Vitale — Front-End Tech Lead', 'pt-BR'],
    ['/pt-br/work', 'Trabalhos selecionados — Leonardo Vitale', 'pt-BR'],
    ['/pt-br/about', 'Sobre e currículo — Leonardo Vitale', 'pt-BR'],
    ['/pt-br/work/net-now', 'NET NOW — Estudo de caso — Leonardo Vitale', 'pt-BR'],
  ] as const

  for (const [route, title, lang] of expectations) {
    await page.goto(route)
    await expect(page).toHaveTitle(title)
    await expect(page.locator('html')).toHaveAttribute('lang', lang)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `http://127.0.0.1:4173${route}`,
    )
  }

  await page.goto('/en/work/net-now')
  const englishAlt = await page.locator('.case-gallery img').first().getAttribute('alt')
  await page.goto('/pt-br/work/net-now')
  const portugueseAlt = await page.locator('.case-gallery img').first().getAttribute('alt')
  expect(englishAlt).toBeTruthy()
  expect(portugueseAlt).toBeTruthy()
  expect(portugueseAlt).not.toBe(englishAlt)
})

test('@T18 removes nonessential transforms when reduced motion is requested', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/en')

  const image = page.locator('.project-card__visual img').first()
  await page.locator('.project-card').first().hover()
  await expect(image).toHaveCSS('transform', 'none')
  expect(
    await image.evaluate((element) =>
      getComputedStyle(element)
        .transitionDuration.split(',')
        .every((duration) => Number.parseFloat(duration) <= 0.001),
    ),
  ).toBe(true)
})

test('@T18 keeps Portuguese controls unclipped and excludes prohibited visual motifs', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/pt-br')
  await page.getByRole('button', { name: 'Menu' }).click()

  const navigation = page.getByRole('navigation', { name: 'Principal' })
  for (const label of ['Trabalhos', 'Trajetória', 'Sobre', 'Currículo', 'Contato']) {
    const link = navigation.getByRole('link', { name: label, exact: true })
    await expect(link).toBeVisible()
    expect(await link.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
  }

  const css = await page.evaluate(async () => {
    const urls = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')).map(
      (link) => link.href,
    )
    return (await Promise.all(urls.map((url) => fetch(url).then((response) => response.text())))).join(
      '\n',
    )
  })
  expect(css).not.toMatch(/box-shadow|gradient|backdrop-filter|\.terminal|\.sql/i)
})

async function gridColumnCount(page: Page, selector: string) {
  return page.locator(selector).evaluate((element) => {
    const columns = getComputedStyle(element).gridTemplateColumns
    return columns.split(' ').filter(Boolean).length
  })
}

function contrastRatio(foreground: string, background: string) {
  const [lighter, darker] = [relativeLuminance(foreground), relativeLuminance(background)].sort(
    (a, b) => b - a,
  )
  return (lighter + 0.05) / (darker + 0.05)
}

function relativeLuminance(color: string) {
  const channels = color.match(/\d+(?:\.\d+)?/g)?.slice(0, 3).map(Number)
  if (channels?.length !== 3) throw new Error(`Unsupported color: ${color}`)
  const linear = channels.map((channel) => {
    const value = channel / 255
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]
}
