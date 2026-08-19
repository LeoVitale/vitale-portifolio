import { expect, test } from '@playwright/test'

test('@T5 renders semantic shell landmarks on localized routes', async ({ page }) => {
  await page.goto('/en/work')

  await expect(page.getByRole('banner')).toBeVisible()
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible()
  await expect(page.getByRole('main')).toBeVisible()
  await expect(page.getByRole('contentinfo')).toBeVisible()
})

test('@T5 exposes global destinations in DOM order', async ({ page }) => {
  await page.goto('/en')
  const navigation = page.getByRole('navigation', { name: 'Primary' })

  await expect(navigation.getByRole('link')).toHaveText([
    'Work',
    'Timeline',
    'About',
    'Resume',
    'Contact',
  ])
  await expect(navigation.getByRole('link', { name: 'Timeline' })).toHaveAttribute(
    'href',
    '/en#timeline',
  )
  await expect(navigation.getByRole('link', { name: 'Contact' })).toHaveAttribute(
    'href',
    '/en/about#contact',
  )
})

test('@T5 keeps locale controls keyboard reachable', async ({ page }) => {
  await page.goto('/en')
  const english = page.getByRole('button', { name: 'English' })
  const portuguese = page.getByRole('button', { name: 'Português (Brasil)' })

  await expect(english).toHaveAttribute('aria-pressed', 'true')
  await portuguese.focus()
  await expect(portuguese).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/pt-br$/)
})

test('@T5 shows a high-contrast focus indicator', async ({ page }) => {
  await page.goto('/en')
  await page.keyboard.press('Tab')
  const skipLink = page.getByRole('link', { name: 'Skip to main content' })

  await expect(skipLink).toBeFocused()
  const focusStyle = await skipLink.evaluate((element) => {
    const style = getComputedStyle(element)
    return { color: style.outlineColor, width: style.outlineWidth }
  })
  expect(focusStyle.width).toBe('3px')
  expect(focusStyle.color).toBe('rgb(250, 255, 105)')
})

test('@T5 uses the fixed dark canvas and twelve-column desktop grid', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/en')

  const bodyStyle = await page.locator('body').evaluate((element) => {
    const style = getComputedStyle(element)
    return { background: style.backgroundColor, image: style.backgroundImage }
  })
  expect(bodyStyle).toEqual({ background: 'rgb(10, 10, 10)', image: 'none' })

  const columns = await page
    .locator('.site-grid')
    .first()
    .evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length)
  expect(columns).toBe(12)
})

test('@T5 provides a usable mobile menu without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/pt-br')
  const menu = page.getByRole('button', { name: 'Menu' })

  await expect(menu).toBeVisible()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await menu.click()
  await expect(menu).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByRole('navigation', { name: 'Principal' })).toBeVisible()

  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasOverflow).toBe(false)
})
