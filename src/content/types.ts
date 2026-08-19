export const locales = ['pt-BR', 'en'] as const
export type Locale = (typeof locales)[number]

export type ProjectId = 'net-now' | 'xbox-one' | 'sky-online' | 'microsoft-gpa' | 'xelix'
export type ProjectStatus = 'shipped' | 'prototype' | 'leadership'

export interface Project {
  id: ProjectId
  slug: string | null
  period: string
  role: string
  tags: readonly string[]
  status: ProjectStatus
  featuredAsset?: {
    src: string
    width: number
    height: number
    altKey: string
  }
  translationKey: `projects.${ProjectId}`
}

export interface CareerMilestone {
  id: string
  period: string
  labelKey: string
  descriptionKey: string
}

export interface ResumeExperience {
  id: string
  company: string
  period: string
  titleKey: string
  locationKey: string
  achievementKeys: readonly string[]
}
