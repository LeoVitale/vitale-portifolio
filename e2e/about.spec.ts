import { expect, test } from '@playwright/test'

test('@T16 renders complete semantic About and Resume sections in both locales', async ({ page }) => {
  await page.goto('/en/about')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Front-end leadership grounded in interface craft',
  )
  for (const heading of [
    'Selected accomplishments',
    'Experience',
    'Education',
    'Expertise',
    'Contact',
  ]) {
    await expect(page.getByRole('heading', { name: heading })).toBeVisible()
  }
  await expect(page.locator('.about-page__accomplishments li')).toHaveCount(4)

  await page.goto('/pt-br/about')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Liderança front-end com base no trabalho de interfaces',
  )
  await expect(page.getByRole('heading', { name: 'Principais realizações' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Formação' })).toBeVisible()
})

test('@T16 presents experience as an ordered vertical chronology', async ({ page }) => {
  await page.goto('/en/about')

  const experiences = page.locator('.resume-chronology article')
  await expect(experiences).toHaveCount(5)
  await expect(experiences.locator('h3')).toHaveText([
    'Xelix',
    'Tacx / Garmin',
    'CarNext.com',
    'Publicis Sapient',
    'Agile Content',
  ])
  await expect(page.locator('.resume-chronology')).toHaveCSS('display', 'grid')
})

test('@T16 exposes one primary resume CTA linked to the English PDF from both locales', async ({
  page,
}) => {
  for (const locale of ['en', 'pt-br']) {
    await page.goto(`/${locale}/about`)
    const primaryActions = page.locator('.about-page .button--primary')
    await expect(primaryActions).toHaveCount(1)
    await expect(primaryActions).toHaveAttribute('href', '/resume/leonardo-vitale-resume-en.pdf')
    await expect(primaryActions).toHaveAttribute('target', '_blank')
  }
})

test('@T16 publishes the approved email and phone destinations', async ({ page }) => {
  await page.goto('/en/about')

  await expect(page.getByRole('link', { name: 'leonardo.vitale@outlook.com' })).toHaveAttribute(
    'href',
    'mailto:leonardo.vitale@outlook.com',
  )
  await expect(page.getByRole('link', { name: '+55 11 99676-2153' })).toHaveAttribute(
    'href',
    'tel:+5511996762153',
  )
})

test('@T16 serves the approved PDF while keeping resume controls keyboard reachable', async ({
  page,
  request,
}) => {
  const response = await request.get('/resume/leonardo-vitale-resume-en.pdf')
  expect(response.status()).toBe(200)

  await page.goto('/en/about')
  const resumeLink = page.locator('a[href="/resume/leonardo-vitale-resume-en.pdf"]')
  await resumeLink.focus()
  await expect(resumeLink).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'leonardo.vitale@outlook.com' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: '+55 11 99676-2153' })).toBeFocused()
})

test('@T16 preserves localized HTML resume content when the PDF is unavailable', async ({
  page,
}) => {
  await page.route('**/resume/leonardo-vitale-resume-en.pdf', (route) => route.abort())
  await page.goto('/pt-br/about')

  await expect(page.getByRole('status')).toHaveText(
    'O PDF está indisponível no momento. O currículo completo e localizado continua acessível nesta página.',
  )
  await expect(page.getByRole('heading', { name: 'Experiência' })).toBeVisible()
  await expect(page.locator('.resume-chronology article')).toHaveCount(5)
})
