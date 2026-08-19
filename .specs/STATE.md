# STATE

## Decisions

### AD-001
- **Decision**: Use React Router in declarative mode with i18next/react-i18next for locale-prefixed navigation and bilingual interface content.
- **Reason**: The portfolio needs directly addressable equivalent routes, remembered locale selection, and complete `pt-BR`/`en` content. Leonardo selected the library-based i18n approach over custom typed dictionaries and duplicated page trees.
- **Trade-off**: This adds runtime dependencies and requires an explicit translation-parity gate.
- **Scope**: All portfolio routes, page content, navigation, metadata, and future localized features.
- **Date**: 2026-08-18
- **Status**: active

### AD-002
- **Decision**: Use the adapted ClickHouse black/electric-yellow visual grammar recorded in `design-system/leonardo-vitale-portfolio/MASTER.md`.
- **Reason**: Leonardo selected `/Users/vitale/Downloads/DESIGN-clickhouse.md` as the layout and visual-system reference for the portfolio.
- **Trade-off**: The MVP is intentionally fixed to one dark theme and one accent; light mode, gradients, shadows, and secondary brand colors are excluded.
- **Scope**: All portfolio pages, visual components, responsive layouts, interactions, and future visual extensions.
- **Date**: 2026-08-18
- **Status**: active

### AD-003
- **Decision**: Publish the two Xelix product screens Leonardo placed in `briefing/portifolio/xelix/` — Helpdesk and Reconciliation — on the selected-work mosaic and current-chapter visual. Keep Xelix as a non-detail leadership card with no case route.
- **Reason**: Leonardo supplied the screenshots as authorized portfolio material, replacing the earlier abstract-only constraint for this chapter.
- **Trade-off**: The leadership chapter now shows product UI instead of typographic tokens; any further Xelix screens remain unpublished until similarly supplied.
- **Scope**: Home mosaic, Work leadership card, current-chapter visual, asset pipeline, and PORT-25.
- **Date**: 2026-08-19
- **Status**: active

## Handoff

