import { expect, test } from '@playwright/test'

test('@T17 recovers an unknown English route with a localized Home action', async ({ page }) => {
  await page.goto('/en/unknown-route')

  const recovery = page.locator('article.not-found')
  await expect(recovery.getByRole('heading', { level: 1 })).toHaveText('Page not found')
  await expect(recovery.getByText('This address does not match a published portfolio page.')).toBeVisible()
  await expect(recovery.getByRole('link', { name: 'Back to Home' })).toHaveAttribute('href', '/en')
})

test('@T17 recovers an unknown Portuguese route with a localized Home action', async ({ page }) => {
  await page.goto('/pt-br/rota-inexistente')

  const recovery = page.locator('article.not-found')
  await expect(recovery.getByRole('heading', { level: 1 })).toHaveText('Página não encontrada')
  await expect(recovery.getByRole('link', { name: 'Voltar ao início' })).toHaveAttribute(
    'href',
    '/pt-br',
  )
})

test('@T17 resolves an unsupported locale prefix to the Portuguese equivalent route', async ({
  page,
}) => {
  await page.goto('/de/work/net-now')

  await expect(page).toHaveURL(/\/pt-br\/work\/net-now$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('NET NOW')
})

test('@T17 ignores an invalid stored locale and uses the supported browser locale', async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem('portfolio.locale', 'not-a-locale')
    Object.defineProperty(navigator, 'languages', { get: () => ['en-GB'] })
  })
  await page.goto('/work')

  await expect(page).toHaveURL(/\/en\/work$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Selected product')
})

test('@T17 keeps navigation usable when browser storage access is denied', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException('Denied', 'SecurityError')
    }
    Storage.prototype.setItem = () => {
      throw new DOMException('Denied', 'SecurityError')
    }
  })
  await page.goto('/en')
  await page.getByRole('link', { name: 'About', exact: true }).click()

  await expect(page).toHaveURL(/\/en\/about$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Front-end leadership')
})

test('@T17 keeps a localized case narrative readable after an integrated image failure', async ({
  page,
}) => {
  await page.route('**/assets/projects/net-now/*.webp', (route) => route.abort())
  await page.goto('/pt-br/work/net-now')

  await expect(page.getByRole('status')).toHaveText(
    'Imagem histórica indisponível. A narrativa do caso continua acessível.',
  )
  await expect(page.getByRole('heading', { name: 'Contexto' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Impacto' })).toBeVisible()
})

test('@T17 keeps the localized HTML resume readable after an integrated PDF failure', async ({
  page,
}) => {
  await page.route('**/resume/leonardo-vitale-resume-en.pdf', (route) => route.abort())
  await page.goto('/en/about')

  await expect(page.getByRole('status')).toHaveText(
    'The PDF is unavailable right now. The complete localized resume remains available on this page.',
  )
  await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible()
  await expect(page.locator('.resume-chronology article')).toHaveCount(5)
})
