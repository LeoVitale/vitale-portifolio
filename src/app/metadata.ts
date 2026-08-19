import { projects } from '../content/portfolio'
import type { Locale } from '../content/types'
import i18n from '../i18n/config'

export interface PageMetadata {
  canonicalPath: string
  description: string
  lang: Locale
  title: string
}

export function metadataForRoute(locale: Locale, pathname: string): PageMetadata {
  const t = i18n.getFixedT(locale)
  const [, page, projectSlug] = pathname.split('/').filter(Boolean)
  const canonicalPath = pathname

  if (!page) {
    return {
      canonicalPath,
      description: t('metadata.description', { ns: 'home' }),
      lang: locale,
      title: t('metadata.title', { ns: 'home' }),
    }
  }

  if (page === 'work' && !projectSlug) {
    return {
      canonicalPath,
      description: t('metadata.description', { ns: 'work' }),
      lang: locale,
      title: t('metadata.title', { ns: 'work' }),
    }
  }

  if (page === 'about') {
    return {
      canonicalPath,
      description: t('metadata.description', { ns: 'about' }),
      lang: locale,
      title: t('metadata.title', { ns: 'about' }),
    }
  }

  const project = projects.find((candidate) => candidate.slug === projectSlug)
  if (page === 'work' && project?.slug) {
    return {
      canonicalPath,
      description: t('metadata.description', { ns: 'cases' }),
      lang: locale,
      title: `${t(`projects.${project.slug}.title`, { ns: 'cases' })} — ${t(
        'metadata.titleSuffix',
        {
          ns: 'cases',
        },
      )}`,
    }
  }

  return {
    canonicalPath,
    description: t('notFound.description', { ns: 'common' }),
    lang: locale,
    title: `${t('notFound.title', { ns: 'common' })} — Leonardo Vitale`,
  }
}

export function applyPageMetadata(metadata: PageMetadata): () => void {
  document.documentElement.lang = metadata.lang
  document.title = metadata.title

  const description = getOrCreateHeadElement<HTMLMetaElement>(
    'meta[name="description"]',
    () => document.createElement('meta'),
  )
  description.name = 'description'
  description.content = metadata.description

  const canonical = getOrCreateHeadElement<HTMLLinkElement>('link[rel="canonical"]', () =>
    document.createElement('link'),
  )
  canonical.rel = 'canonical'
  canonical.href = new URL(metadata.canonicalPath, window.location.origin).href

  return () => undefined
}

function getOrCreateHeadElement<ElementType extends HTMLElement>(
  selector: string,
  create: () => ElementType,
): ElementType {
  const existing = document.head.querySelector<ElementType>(selector)
  if (existing) return existing

  const element = create()
  document.head.append(element)
  return element
}
