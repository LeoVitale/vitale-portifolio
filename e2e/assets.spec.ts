import { expect, test } from '@playwright/test'
import { readFile } from 'node:fs/promises'

interface AssetManifestItem {
  project: string
  originalPath: string
  optimizedPath: string
  width: number
  height: number
}

const manifest = JSON.parse(
  await readFile(new URL('../public/assets/projects/manifest.json', import.meta.url), 'utf8'),
) as { assets: AssetManifestItem[] }

test('@T2 publishes an 80-image manifest with stable geometry', async () => {
  expect(manifest.assets).toHaveLength(80)
  expect(new Set(manifest.assets.map(({ originalPath }) => originalPath)).size).toBe(80)
  expect(new Set(manifest.assets.map(({ optimizedPath }) => optimizedPath)).size).toBe(80)

  for (const asset of manifest.assets) {
    expect(asset.width).toBeGreaterThan(0)
    expect(asset.height).toBeGreaterThan(0)
  }
})

for (const project of ['microsoft-gpa', 'net-now', 'sky-online', 'xbox-one']) {
  test(`@T2 serves an original and WebP asset for ${project}`, async ({ request }) => {
    const asset = manifest.assets.find((item) => item.project === project)
    if (!asset) {
      throw new Error(`Manifest has no asset for ${project}`)
    }

    const original = await request.get(asset.originalPath)
    const optimized = await request.get(asset.optimizedPath)

    expect(original.status()).toBe(200)
    expect(optimized.status()).toBe(200)
    expect(optimized.headers()['content-type']).toBe('image/webp')
  })
}

test('@T2 serves the approved English resume PDF', async ({ request }) => {
  const response = await request.get('/resume/leonardo-vitale-resume-en.pdf')

  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toBe('application/pdf')
})
