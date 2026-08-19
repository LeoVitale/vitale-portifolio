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

## Handoff

