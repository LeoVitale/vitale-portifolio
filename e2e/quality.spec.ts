import { expect, test, type Page } from '@playwright/test'

const p1Routes = [
  { locale: 'en', route: '/en' },
  { locale: 'en', route: '/en/work' },
  { locale: 'en', route: '/en/work/net-now' },
  { locale: 'en', route: '/en/work/xbox-one' },
  { locale: 'en', route: '/en/work/sky-online' },
  { locale: 'en', route: '/en/work/microsoft-gpa' },
  { locale: 'en', route: '/en/about' },
  { locale: 'pt-BR', route: '/pt-br' },
  { locale: 'pt-BR', route: '/pt-br/work' },
  { locale: 'pt-BR', route: '/pt-br/work/net-now' },
  { locale: 'pt-BR', route: '/pt-br/work/xbox-one' },
  { locale: 'pt-BR', route: '/pt-br/work/sky-online' },
  { locale: 'pt-BR', route: '/pt-br/work/microsoft-gpa' },
  { locale: 'pt-BR', route: '/pt-br/about' },
] as const

for (const { locale, route } of p1Routes) {
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

    if (locale === 'pt-BR') {
      const pageControls = page.locator('#main-content a:visible, #main-content button:visible')
      expect(await pageControls.count()).toBeGreaterThan(0)
      expect(
        await pageControls.evaluateAll((elements) =>
          elements.every(
            (element) =>
              element.textContent?.trim() &&
              element.scrollWidth <= element.clientWidth &&
              element.getBoundingClientRect().left >= 0 &&
              element.getBoundingClientRect().right <= document.documentElement.clientWidth,
          ),
        ),
      ).toBe(true)
    }
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

test('@T18 maintains visible semantic contrast pairs above the specified thresholds', async ({
  page,
}) => {
  const scenarios = [
    {
      route: '/en',
      pairs: [
        normalTextPair('ink wordmark on canvas', '.wordmark', '.site-header'),
        normalTextPair('body text on canvas', 'body', 'body'),
        normalTextPair('strong body text on canvas', '.home-hero__description', 'body'),
        normalTextPair('muted footer text on canvas', '.site-footer', 'body'),
        normalTextPair('muted metadata on card', '.project-card__metadata', '.project-card'),
        normalTextPair('body copy on card', '.project-card__significance', '.project-card'),
        normalTextPair('primary navigation on header', '.primary-navigation > a', '.site-header'),
        normalTextPair(
          'inactive locale control on canvas',
          '.language-selector button:not([aria-pressed="true"])',
          'body',
        ),
        normalTextPair(
          'active locale control on accent',
          '.language-selector button[aria-pressed="true"]',
          '.language-selector button[aria-pressed="true"]',
        ),
        normalTextPair('primary button text', '.button--primary', '.button--primary'),
        normalTextPair('secondary button text', '.button--secondary', '.button--secondary'),
        largeTextPair('large heading on canvas', 'h1', 'body'),
        controlPair(
          'secondary button border on its surface',
          '.button--secondary',
          '.button--secondary',
          'borderTopColor',
        ),
        controlPair('card hairline on canvas', '.project-card', 'body', 'borderTopColor'),
        controlPair('header hairline on canvas', '.site-header', '.site-header', 'borderBottomColor'),
      ],
    },
    {
      route: '/en/work/net-now',
      pairs: [
        normalTextPair('strong tag text on card', '.case-study__tags li', '.case-study__tags li'),
        normalTextPair('next action text on accent', '.case-study__next-link', '.case-study__next-link'),
        largeTextPair('large impact text on canvas', '.case-study__impact p', 'body'),
      ],
    },
  ] as const

  for (const scenario of scenarios) {
    await page.goto(scenario.route)
    for (const pair of scenario.pairs) {
      const colors = await renderedPairColors(page, pair)
      expect(
        contrastRatio(colors.foreground, colors.background),
        `${pair.name}: ${colors.foreground} on ${colors.background}`,
      ).toBeGreaterThanOrEqual(pair.minimum)
    }
  }

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/pt-br')
  const menu = page.getByRole('button', { name: 'Menu' })
  await menu.focus()
  const focus = await menu.evaluate((element) => {
    const style = getComputedStyle(element)
    return {
      background: style.backgroundColor,
      border: style.borderTopColor,
      color: style.color,
      outline: style.outlineColor,
      outlineWidth: style.outlineWidth,
    }
  })

  expect(Number.parseFloat(focus.outlineWidth)).toBeGreaterThanOrEqual(2)
  expect(Number.parseFloat(focus.outlineWidth)).toBeLessThanOrEqual(4)
  expect(contrastRatio(focus.color, focus.background)).toBeGreaterThanOrEqual(4.5)
  expect(contrastRatio(focus.outline, focus.background)).toBeGreaterThanOrEqual(3)
  expect(contrastRatio(focus.border, focus.background)).toBeGreaterThanOrEqual(3)
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

type ContrastPair = {
  backgroundProperty: 'backgroundColor'
  backgroundSelector: string
  foregroundProperty: 'borderBottomColor' | 'borderTopColor' | 'color'
  foregroundSelector: string
  minimum: 3 | 4.5
  name: string
}

function normalTextPair(
  name: string,
  foregroundSelector: string,
  backgroundSelector: string,
): ContrastPair {
  return {
    backgroundProperty: 'backgroundColor',
    backgroundSelector,
    foregroundProperty: 'color',
    foregroundSelector,
    minimum: 4.5,
    name,
  }
}

function largeTextPair(
  name: string,
  foregroundSelector: string,
  backgroundSelector: string,
): ContrastPair {
  return {
    ...normalTextPair(name, foregroundSelector, backgroundSelector),
    minimum: 3,
  }
}

function controlPair(
  name: string,
  foregroundSelector: string,
  backgroundSelector: string,
  foregroundProperty: 'borderBottomColor' | 'borderTopColor',
): ContrastPair {
  return {
    backgroundProperty: 'backgroundColor',
    backgroundSelector,
    foregroundProperty,
    foregroundSelector,
    minimum: 3,
    name,
  }
}

async function renderedPairColors(page: Page, pair: ContrastPair) {
  const foreground = page.locator(pair.foregroundSelector).first()
  const background = page.locator(pair.backgroundSelector).first()
  await expect(foreground, pair.name).toBeVisible()
  await expect(background, `${pair.name} background`).toBeVisible()
  return {
    foreground: await foreground.evaluate(
      (element, property) => getComputedStyle(element)[property],
      pair.foregroundProperty,
    ),
    background: await background.evaluate(
      (element, property) => getComputedStyle(element)[property],
      pair.backgroundProperty,
    ),
  }
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
