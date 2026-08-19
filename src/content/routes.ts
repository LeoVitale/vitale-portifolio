import type { Locale, ProjectId } from './types'

export type RouteId =
  | 'home'
  | 'work'
  | 'about'
  | `case.${Exclude<ProjectId, 'xelix'>}`
  | 'not-found'

export const localeSegments: Record<Locale, string> = {
  'pt-BR': 'pt-br',
  en: 'en',
}

export const routePaths: Record<Exclude<RouteId, 'not-found'>, string> = {
  home: '',
  work: 'work',
  about: 'about',
  'case.net-now': 'work/net-now',
  'case.xbox-one': 'work/xbox-one',
  'case.sky-online': 'work/sky-online',
  'case.microsoft-gpa': 'work/microsoft-gpa',
}

export function localizedPath(locale: Locale, routeId: Exclude<RouteId, 'not-found'>) {
  const routePath = routePaths[routeId]
  return `/${localeSegments[locale]}${routePath ? `/${routePath}` : ''}`
}
