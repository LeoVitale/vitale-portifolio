import { createHash } from 'node:crypto'
import { copyFile, mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceRoot = path.join(root, 'briefing', 'portifolio')
const destinationRoot = path.join(root, 'public', 'assets', 'projects')
const resumeSource = path.join(
  root,
  'briefing',
  'Leonardo_Vitale_-_Front_End_Engineer_-_Front_End_Engineer_NEW.pdf',
)
const resumeDestination = path.join(root, 'public', 'resume', 'leonardo-vitale-resume-en.pdf')

const approvedImageCount = 82

const projectFolders = new Map([
  ['Microsoft-WeFit', 'microsoft-gpa'],
  ['Net_Now', 'net-now'],
  ['Prototipo CNA', 'cna'],
  ['SkyOnline', 'sky-online'],
  ['Video Commerce', 'video-commerce'],
  ['Windows 8', 'sky-online-windows8'],
  ['Xbox 360', 'xbox-360'],
  ['Xbox One', 'xbox-one'],
  ['xelix', 'xelix'],
])

const imageExtensions = new Set(['.jpeg', '.jpg', '.png'])

function normalizeSegment(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function collisionSuffix(relativeSource) {
  return createHash('sha256').update(relativeSource).digest('hex').slice(0, 8)
}

async function collectImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const images = []

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      images.push(...(await collectImages(entryPath)))
    } else if (imageExtensions.has(path.extname(entry.name).toLowerCase())) {
      images.push(entryPath)
    }
  }

  return images
}

function destinationFor(sourcePath, usedPaths) {
  const relativeSource = path.relative(sourceRoot, sourcePath)
  const [sourceProject, ...nestedParts] = relativeSource.split(path.sep)
  const project = projectFolders.get(sourceProject)
  if (!project) {
    throw new Error(`Unknown asset project folder: ${sourceProject}`)
  }

  const extension = path.extname(nestedParts.at(-1)).toLowerCase()
  const normalizedParts = nestedParts.map((part, index) =>
    index === nestedParts.length - 1
      ? `${normalizeSegment(path.basename(part, path.extname(part)))}${extension}`
      : normalizeSegment(part),
  )

  let relativeDestination = path.join(project, ...normalizedParts)
  if (usedPaths.has(relativeDestination)) {
    const parsed = path.parse(relativeDestination)
    relativeDestination = path.join(
      parsed.dir,
      `${parsed.name}-${collisionSuffix(relativeSource)}${parsed.ext}`,
    )
  }
  usedPaths.add(relativeDestination)

  return { project, relativeDestination, relativeSource }
}

async function prepareAssets() {
  const sourceImages = await collectImages(sourceRoot)
  if (sourceImages.length !== approvedImageCount) {
    throw new Error(`Expected ${approvedImageCount} approved images, found ${sourceImages.length}`)
  }

  await rm(destinationRoot, { force: true, recursive: true })
  await mkdir(destinationRoot, { recursive: true })

  const usedPaths = new Set()
  const assets = []

  for (const sourcePath of sourceImages) {
    const { project, relativeDestination, relativeSource } = destinationFor(sourcePath, usedPaths)
    const originalDestination = path.join(destinationRoot, relativeDestination)
    const optimizedDestination = path.join(
      path.dirname(originalDestination),
      `${path.basename(originalDestination, path.extname(originalDestination))}.webp`,
    )
    const metadata = await sharp(sourcePath).metadata()

    if (!metadata.width || !metadata.height) {
      throw new Error(`Missing dimensions for ${relativeSource}`)
    }

    await mkdir(path.dirname(originalDestination), { recursive: true })
    await copyFile(sourcePath, originalDestination)
    await sharp(sourcePath).webp({ quality: 82 }).toFile(optimizedDestination)

    assets.push({
      id: `${project}-${path.basename(relativeDestination, path.extname(relativeDestination))}`,
      project,
      sourcePath: relativeSource.split(path.sep).join('/'),
      originalPath: `/assets/projects/${relativeDestination.split(path.sep).join('/')}`,
      optimizedPath: `/assets/projects/${path
        .relative(destinationRoot, optimizedDestination)
        .split(path.sep)
        .join('/')}`,
      width: metadata.width,
      height: metadata.height,
    })
  }

  await writeFile(
    path.join(destinationRoot, 'manifest.json'),
    `${JSON.stringify({ assets }, null, 2)}\n`,
  )
  await mkdir(path.dirname(resumeDestination), { recursive: true })
  await copyFile(resumeSource, resumeDestination)

  console.log(`Prepared ${assets.length} originals and ${assets.length} WebP derivatives.`)
}

await prepareAssets()
