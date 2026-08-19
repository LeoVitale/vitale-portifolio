import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const localesRoot = path.join(root, 'src', 'locales')
const referenceLocale = 'en'
const comparedLocale = 'pt-BR'

function flattenLeaves(value, prefix = '') {
  if (typeof value === 'string') {
    if (!value.trim()) {
      throw new Error(`Empty translation at ${prefix}`)
    }
    return [prefix]
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flattenLeaves(item, `${prefix}.${index}`))
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) =>
      flattenLeaves(item, prefix ? `${prefix}.${key}` : key),
    )
  }

  throw new Error(`Invalid translation leaf at ${prefix}`)
}

async function namespaceFiles(locale) {
  return (await readdir(path.join(localesRoot, locale)))
    .filter((file) => file.endsWith('.json'))
    .sort()
}

async function loadNamespace(locale, file) {
  const source = await readFile(path.join(localesRoot, locale, file), 'utf8')
  return JSON.parse(source)
}

const referenceFiles = await namespaceFiles(referenceLocale)
const comparedFiles = await namespaceFiles(comparedLocale)

if (JSON.stringify(referenceFiles) !== JSON.stringify(comparedFiles)) {
  throw new Error(
    `Namespace mismatch: ${referenceLocale}=${referenceFiles.join(',')} ${comparedLocale}=${comparedFiles.join(',')}`,
  )
}

for (const file of referenceFiles) {
  const referenceKeys = flattenLeaves(await loadNamespace(referenceLocale, file)).sort()
  const comparedKeys = flattenLeaves(await loadNamespace(comparedLocale, file)).sort()

  if (JSON.stringify(referenceKeys) !== JSON.stringify(comparedKeys)) {
    const missing = referenceKeys.filter((key) => !comparedKeys.includes(key))
    const unexpected = comparedKeys.filter((key) => !referenceKeys.includes(key))
    throw new Error(
      `${file} parity failed. Missing: ${missing.join(', ') || 'none'}. Unexpected: ${unexpected.join(', ') || 'none'}.`,
    )
  }
}

console.log(`Translation parity passed for ${referenceFiles.length} namespaces.`)
