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
  await expect(image).toHaveAttribute('height', '2953')
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
  expect(await galleryItems.count()).toBeGreaterThanOrEqual(2)
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

test('@T12 publishes equivalent NET NOW case content in both locales', async ({ page }) => {
  await page.goto('/en/work/net-now')
  await expect(page.getByText(/first major React project/)).toBeVisible()
  await expect(page.getByText(/I led front-end and UX work/)).toBeVisible()

  await page.goto('/pt-br/work/net-now')
  await expect(page.getByText(/primeiro grande projeto em React/)).toBeVisible()
  await expect(page.getByText(/Liderei o trabalho de front-end e UX/)).toBeVisible()
})

test('@T12 renders all six NET NOW images in the approved order', async ({ page }) => {
  await page.goto('/en/work/net-now')

  const images = page.locator('.case-gallery img')
  await expect(images).toHaveCount(6)
  const sources = await images.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute('src')),
  )
  expect(sources).toEqual([
    '/assets/projects/net-now/player-aovivo-web.webp',
    '/assets/projects/net-now/home-web-mouse-over.webp',
    '/assets/projects/net-now/home-web-kids-personagem.webp',
    '/assets/projects/net-now/home-web-programas-tv.webp',
    '/assets/projects/net-now/grade-programacao.webp',
    '/assets/projects/net-now/detalhe-serie-web-03.webp',
  ])
})

test('@T12 gives the supplied player image primary visual emphasis', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/en/work/net-now')

  const items = page.locator('.case-gallery__item')
  const firstWidth = await items.nth(0).evaluate((element) => element.getBoundingClientRect().width)
  const secondWidth = await items.nth(1).evaluate((element) => element.getBoundingClientRect().width)
  expect(firstWidth).toBeGreaterThan(secondWidth)
  await expect(items.nth(0).locator('img')).toHaveAttribute('alt', /live-player interface/)
})

test('@T12 keeps NET NOW claims attributed and every image alt localized', async ({ page }) => {
  await page.goto('/pt-br/work/net-now')

  await expect(page.locator('.case-study__impact')).toContainText('A equipe entregou a plataforma')
  await expect(page.locator('.case-study__impact')).not.toContainText('Eu entreguei a plataforma')
  const alternativeTexts = await page.locator('.case-gallery img').evaluateAll((images) =>
    images.map((image) => image.getAttribute('alt')),
  )
  expect(alternativeTexts).toHaveLength(6)
  expect(alternativeTexts.every((alternativeText) => Boolean(alternativeText?.trim()))).toBe(true)
  expect(alternativeTexts).toContain(
    'Interface inicial do NET NOW mostrando detalhes expandidos de um programa sobre o catálogo.',
  )
})

test('@T13 publishes supported Xbox One context and contribution in both locales', async ({
  page,
}) => {
  await page.goto('/en/work/xbox-one')
  await expect(page.getByText(/four VOD applications in parallel/)).toBeVisible()
  await expect(page.getByText(/I designed console-first catalog/)).toBeVisible()

  await page.goto('/pt-br/work/xbox-one')
  await expect(page.getByText(/quatro aplicativos de VOD em paralelo/)).toBeVisible()
  await expect(page.getByText(/Desenhei experiências de catálogo/)).toBeVisible()
})

test('@T13 renders four localized Xbox One brand groups', async ({ page }) => {
  await page.goto('/en/work/xbox-one')
  await expect(page.locator('.case-gallery__group > h3')).toHaveText([
    'GloboSat Play',
    'SKY Online',
    'Telecine Play',
    'Vivo Play',
  ])

  await page.goto('/pt-br/work/xbox-one')
  await expect(page.locator('.case-gallery__group > h3')).toHaveText([
    'GloboSat Play',
    'SKY Online',
    'Telecine Play',
    'Vivo Play',
  ])
})

test('@T13 renders all 24 supplied Xbox One images by documented brand count', async ({
  page,
}) => {
  await page.goto('/en/work/xbox-one')

  await expect(page.locator('.case-gallery img')).toHaveCount(24)
  for (const [group, count] of [
    ['globosat-play', 7],
    ['sky-online', 5],
    ['telecine-play', 3],
    ['vivo-play', 9],
  ] as const) {
    await expect(page.locator(`[data-gallery-group="${group}"] img`)).toHaveCount(count)
  }
})

test('@T13 localizes group labels and meaningful Xbox One alternative text', async ({ page }) => {
  await page.goto('/pt-br/work/xbox-one')

  const alternativeTexts = await page.locator('.case-gallery img').evaluateAll((images) =>
    images.map((image) => image.getAttribute('alt')),
  )
  expect(alternativeTexts).toHaveLength(24)
  expect(alternativeTexts.every((alternativeText) => Boolean(alternativeText?.trim()))).toBe(true)
  expect(alternativeTexts).toContain('Tela inicial do Vivo Play para Xbox One.')
})

test('@T13 avoids unsupported Xbox One launch and sole-ownership claims', async ({ page }) => {
  await page.goto('/en/work/xbox-one')

  const article = page.locator('.case-study')
  await expect(article).toContainText(
    'The suite demonstrates product-system breadth without claiming sole ownership',
  )
  await expect(article).not.toContainText('I launched')
  await expect(article).not.toContainText('I delivered all four applications')
})

test('@T14 publishes SKY Online as a complete screen system in both locales', async ({ page }) => {
  await page.goto('/en/work/sky-online')
  await expect(page.getByText(/complete interface direction/)).toBeVisible()
  await expect(page.getByText(/home, lists, genres, classification and content-detail/)).toBeVisible()

  await page.goto('/pt-br/work/sky-online')
  await expect(page.getByText(/direção completa de interface/)).toBeVisible()
  await expect(page.getByText(/início, listas, gêneros, classificação e detalhes/)).toBeVisible()
})

test('@T14 renders eight SKY Online images through normalized portable paths', async ({ page }) => {
  await page.goto('/en/work/sky-online')

  const images = page.locator('.case-gallery img')
  await expect(images).toHaveCount(8)
  const sources = await images.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute('src')),
  )
  expect(sources).toEqual([
    '/assets/projects/sky-online/home.webp',
    '/assets/projects/sky-online/home-classificacao.webp',
    '/assets/projects/sky-online/home-classificacao-faca9f44.webp',
    '/assets/projects/sky-online/details-aprovada.webp',
    '/assets/projects/sky-online/details-series-aprovada.webp',
    '/assets/projects/sky-online/filmes-lista-aprovada.webp',
    '/assets/projects/sky-online/generos-aprovada.webp',
    '/assets/projects/sky-online/labels-color.webp',
  ])
  expect(
    sources.every(
      (source) =>
        source !== null && Array.from(source).every((character) => character.charCodeAt(0) <= 127),
    ),
  ).toBe(true)
})

test('@T14 keeps SKY Online period and prototype-to-product status qualified', async ({ page }) => {
  await page.goto('/en/work/sky-online')

  await expect(page.locator('.case-study__metadata time')).toHaveText('2013–2017 era')
  await expect(page.locator('.case-study')).toContainText(
    'The prototype moved forward into a production initiative',
  )
  await expect(page.locator('.case-study')).toContainText('exact production dates remain qualified')
})

test('@T14 provides localized alternative text across the SKY Online gallery', async ({ page }) => {
  await page.goto('/pt-br/work/sky-online')

  const alternativeTexts = await page.locator('.case-gallery img').evaluateAll((images) =>
    images.map((image) => image.getAttribute('alt')),
  )
  expect(alternativeTexts).toHaveLength(8)
  expect(alternativeTexts.every((alternativeText) => Boolean(alternativeText?.trim()))).toBe(true)
  expect(alternativeTexts).toContain(
    'Tela do SKY Online com classificação de conteúdo e navegação do catálogo.',
  )
})

test('@T15 publishes Microsoft visibility and the GPA opportunity in both locales', async ({
  page,
}) => {
  await page.goto('/en/work/microsoft-gpa')
  await expect(page.getByText(/Microsoft technology events in Brazil/)).toBeVisible()
  await expect(page.getByText(/Microsoft-supported experience for GPA/)).toBeVisible()

  await page.goto('/pt-br/work/microsoft-gpa')
  await expect(page.getByText(/eventos de tecnologia da Microsoft no Brasil/)).toBeVisible()
  await expect(page.getByText(/experiência para o GPA apoiada pela Microsoft/)).toBeVisible()
})

test('@T15 renders all ten Microsoft GPA screens in the approved business-flow order', async ({
  page,
}) => {
  await page.goto('/en/work/microsoft-gpa')

  const images = page.locator('.case-gallery img')
  await expect(images).toHaveCount(10)
  const sources = await images.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute('src')),
  )
  expect(sources).toEqual([
    '/assets/projects/microsoft-gpa/01-inicio.webp',
    '/assets/projects/microsoft-gpa/01-inicio-clima.webp',
    '/assets/projects/microsoft-gpa/02-vendasonline.webp',
    '/assets/projects/microsoft-gpa/03-ri-evolucao.webp',
    '/assets/projects/microsoft-gpa/03-ri.webp',
    '/assets/projects/microsoft-gpa/04-configuracoes.webp',
    '/assets/projects/microsoft-gpa/05-planodeexpansao.webp',
    '/assets/projects/microsoft-gpa/06-orcamentobasezero.webp',
    '/assets/projects/microsoft-gpa/07-email.webp',
    '/assets/projects/microsoft-gpa/08-clima.webp',
  ])
})

test('@T15 keeps the Microsoft GPA period explicitly qualified', async ({ page }) => {
  await page.goto('/en/work/microsoft-gpa')
  await expect(page.locator('.case-study__metadata time')).toHaveText('circa 2010')

  await page.goto('/pt-br/work/microsoft-gpa')
  await expect(page.locator('.case-study__metadata time')).toHaveText('circa 2010')
})

test('@T15 avoids unsupported ownership and localizes every Microsoft GPA image', async ({
  page,
}) => {
  await page.goto('/pt-br/work/microsoft-gpa')

  const article = page.locator('.case-study')
  await expect(article).toContainText('Combinei design de interface e visão de implementação')
  await expect(article).not.toContainText('Liderei o projeto')
  await expect(article).not.toContainText('Entreguei sozinho')
  const alternativeTexts = await page.locator('.case-gallery img').evaluateAll((images) =>
    images.map((image) => image.getAttribute('alt')),
  )
  expect(alternativeTexts).toHaveLength(10)
  expect(alternativeTexts.every((alternativeText) => Boolean(alternativeText?.trim()))).toBe(true)
})
