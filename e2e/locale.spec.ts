import { expect, test } from '@playwright/test'

async function setBrowserLanguage(page: import('@playwright/test').Page, language: string) {
  await page.addInitScript((value) => {
    Object.defineProperty(navigator, 'languages', { get: () => [value] })
    Object.defineProperty(navigator, 'language', { get: () => value })
  }, language)
}

test('@T4 selects English for an English first visit', async ({ page }) => {
  await setBrowserLanguage(page, 'en-US')
  await page.goto('/')

  await expect(page).toHaveURL(/\/en$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
})

test('@T4 falls back to pt-BR for an unsupported browser language', async ({ page }) => {
  await setBrowserLanguage(page, 'fr-FR')
  await page.goto('/')

  await expect(page).toHaveURL(/\/pt-br$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
})

test('@T4 uses a stored explicit locale on a locale-less route', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('portfolio.locale', 'en'))
  await page.goto('/work')

  await expect(page).toHaveURL(/\/en\/work$/)
})

test('@T4 ignores corrupt stored locale data', async ({ page }) => {
  await setBrowserLanguage(page, 'en-GB')
  await page.addInitScript(() => localStorage.setItem('portfolio.locale', 'invalid'))
  await page.goto('/')

  await expect(page).toHaveURL(/\/en$/)
})

test('@T4 preserves Work and persists an explicit locale switch', async ({ page }) => {
  await page.goto('/pt-br/work')
  await page.getByRole('button', { name: 'English' }).click()

  await expect(page).toHaveURL(/\/en\/work$/)
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('portfolio.locale')))
    .toBe('en')
})

for (const route of [
  'about',
  'work/net-now',
  'work/xbox-one',
  'work/sky-online',
  'work/microsoft-gpa',
]) {
  test(`@T4 preserves ${route} while switching locale`, async ({ page }) => {
    await page.goto(`/en/${route}`)
    await page.getByRole('button', { name: 'Português (Brasil)' }).click()

    await expect(page).toHaveURL(new RegExp(`/pt-br/${route}$`))
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  })
}

test('@T4 redirects an unsupported locale prefix to pt-BR', async ({ page }) => {
  await page.goto('/fr/work')

  await expect(page).toHaveURL(/\/pt-br\/work$/)
})

test('@T4 keeps locale-prefixed navigation working when storage is denied', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException('Denied', 'SecurityError')
    }
    Storage.prototype.setItem = () => {
      throw new DOMException('Denied', 'SecurityError')
    }
  })
  await page.goto('/en/work')

  await expect(page).toHaveURL(/\/en\/work$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Selected product')
})

test('@T4 renders a localized not-found route', async ({ page }) => {
  await page.goto('/pt-br/rota-inexistente')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Página não encontrada')
  await expect(page.getByRole('link', { name: 'Voltar ao início' })).toHaveAttribute(
    'href',
    '/pt-br',
  )
})
