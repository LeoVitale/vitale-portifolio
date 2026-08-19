# STATE

## Decisions

### AD-001
- **Decision**: Use React Router in declarative mode with i18next/react-i18next for locale-prefixed navigation and bilingual interface content.
- **Reason**: The portfolio needs directly addressable equivalent routes, remembered locale selection, and complete `pt-BR`/`en` content. Leonardo selected the library-based i18n approach over custom typed dictionaries and duplicated page trees.
- **Trade-off**: This adds runtime dependencies and requires an explicit translation-parity gate.
- **Scope**: All portfolio routes, page content, navigation, metadata, and future localized features.
- **Date**: 2026-08-18
- **Status**: active

## Handoff

