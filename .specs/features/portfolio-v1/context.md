# Portfolio V1 Context

**Gathered:** 2026-08-18  
**Spec:** `.specs/features/portfolio-v1/spec.md`  
**Status:** Ready for design

---

## Feature Boundary

The feature delivers the bilingual portfolio MVP in React, TypeScript, and Vite. It includes Home, Work, a career timeline, four priority case pages, About/Resume, global navigation, locale handling, responsive behavior, and accessibility. It excludes backend capabilities, archive case pages, analytics, Telenor, and unapproved Xelix material.

---

## Implementation Decisions

### Public identity and contact

- The public title is “Front-End Tech Lead”.
- Publish `leonardo.vitale@outlook.com`.
- Publish `+5511996762153`.
- Use the current resume as the source for these details.

### Historical assets

- The 80 historical images are available under `briefing/portifolio/`.
- Copy the images into a tracked public asset structure for the portfolio.
- Generate optimized derivatives where practical while preserving the supplied originals as source material.
- Leonardo approved versioning and publishing these supplied assets in the portfolio.
- Do not fabricate screenshots.

### Locale behavior

- Support `pt-BR` and `en`.
- On the first locale-less visit, use a supported browser language and fall back to `pt-BR`.
- After an explicit language selection, remember it for future locale-less visits.
- Use locale-prefixed, directly addressable routes.
- Preserve the equivalent current page when changing locale.
- Offer the supplied English resume PDF in both locales.
- Render the resume HTML in the active locale.

### Visual theme

- Use one fixed editorial dark theme.
- Do not adapt the theme to the operating-system color scheme.
- Do not add a theme switcher.
- Preserve accessible contrast and visible keyboard focus.

### Agent's Discretion

- Exact dark-theme palette, typography choices, spacing scale, and restrained accent color within the briefing constraints.
- Component boundaries and content-data organization.
- The minimum deterministic test tooling required by the spec-driven workflow.
- Exact image-derivative format and asset naming convention.

### Declined / Undiscussed Gray Areas → Assumptions

None. The user selected and resolved every proposed gray area.

---

## Specific References

- `PRD.md` defines product scope and traceable requirements.
- `briefing/EDITORIAL.md` defines narrative, tone, hierarchy, and attribution rules.
- `briefing/CONTENT.md` supplies the English editorial source.
- `briefing/DESIGN.md` defines the exhibition-like visual direction.
- `briefing/ASSETS.md` maps the expected historical image archive.
- `briefing/SPEC.md` and `briefing/CURSOR.md` define the React/TypeScript/Vite constraints.
- The current resume in `briefing/Leonardo_Vitale_-_Front_End_Engineer_NEW.md` is the primary source for public title history, contact details, experience, and supported metrics.

---

## Deferred Ideas

- Archive case pages for Xbox 360, Windows 8 / SKY Online, CNA, and Video Commerce.
- Abstract Xelix case beyond the Home chapter.
- Xbox gallery filtering by brand.
- Analytics, contact form, production monitoring, and publication operations.
- Portuguese resume PDF.
- Theme selection.
