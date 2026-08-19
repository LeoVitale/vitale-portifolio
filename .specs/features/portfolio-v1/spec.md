# Portfolio V1 Specification

## Problem Statement

Recruiters and engineering leaders need to understand Leonardo Vitale's seniority, career progression, and impact without reconstructing that story from a linear resume. The portfolio must present the progression from UX and rich-media interfaces to React architecture and technical leadership, supported by factual content and historical visual evidence.

The first release must work for Brazilian and international audiences. It must present complete equivalent experiences in Portuguese (Brazil) and English while preserving editorial accuracy, accessibility, and the distinction between shipped products and prototypes.

## Goals

- [ ] A first-time visitor can identify Leonardo's role, career evolution, major historical cases, and current leadership focus within 30 seconds on the Home page.
- [ ] The Home, Work, four priority case pages, and About/Resume are complete in `pt-BR` and `en`.
- [ ] Every published claim follows the source precedence and content-integrity rules defined in the PRD and briefing.
- [ ] The experience is usable at 390 px and 1440 px, by keyboard, and with reduced motion enabled.
- [ ] The implementation uses the existing React, TypeScript, and Vite foundation without backend, CMS, authentication, or unnecessary runtime dependencies.

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
| --- | --- |
| Backend, database, authentication, or CMS | The first release validates narrative, content, and visual direction. |
| Contact form or personal-data collection | This requires privacy, spam prevention, and operations decisions outside this release. |
| Analytics and production monitoring | These are publication concerns after the prototype is validated. |
| Telenor case | Leonardo's role and the source material are not confirmed. |
| Internal Xelix screenshots or unapproved metrics | They may expose confidential information. |
| Xbox 360, Windows 8, CNA, and Video Commerce detail pages | These archive cases are P2 after the priority cases. |
| Theme selector or automatic light theme | The MVP uses one fixed editorial dark theme. |
| ClickHouse product-specific UI, SQL mockups, or database motifs | The reference supplies visual grammar, not product content to copy. |
| Gradients, drop shadows, glass effects, and generic developer motifs | They conflict with the approved flat black/yellow editorial direction. |
| Portuguese resume PDF | The supplied PDF is English; Portuguese resume content is provided as HTML. |
| P3 Xbox brand filtering | It is optional and not needed to validate the portfolio narrative. |

---

## Assumptions & Open Questions

Every ambiguity is resolved or recorded here. Nothing is left silently unclear.

| Assumption / decision | Chosen default | Rationale | Confirmed? |
| --- | --- | --- | --- |
| Public title | Front-End Tech Lead | Leonardo selected this title for the MVP. | y |
| Public contact | Publish the current resume email and phone number | Leonardo selected both current contact channels. | y |
| Historical assets | Copy the 80 source images from `briefing/portifolio/` into a tracked public asset structure and generate optimized derivatives | Leonardo approved versioning and publishing the supplied historical screenshots. | y |
| First locale visit | Use the browser language when supported, then fall back to `pt-BR` | Leonardo selected browser-based first-visit localization. | y |
| Locale persistence | Store the visitor's explicit language choice and use locale-prefixed URLs | Leonardo selected remembered language behavior and the PRD requires shareable locale URLs. | y |
| Resume download | Offer the supplied English PDF in both locales; render localized resume content in HTML | Only the English PDF exists and Leonardo approved using it in both locales. | y |
| Visual theme | Use the black/electric-yellow system adapted from `/Users/vitale/Downloads/DESIGN-clickhouse.md` | Leonardo selected this visual reference for the portfolio layout. | y |
| Exact title wording in historical roles | Use the latest resume and briefing source precedence | This prevents the older resume from overriding current facts. | y |
| Asset usage rights | Treat Leonardo's approval to copy and version the supplied assets as authorization for this portfolio | Leonardo explicitly selected the versioned public-assets option. | y |
| Automated verification | Add only the minimum deterministic tests required to prove specification outcomes | The spec-driven execution contract requires executable gates; test infrastructure must stay proportional to the prototype. | n |
| Input validation and bounds | N/A because the MVP has no form or user-authored input | Only navigation, locale choice, and galleries accept interaction. | y |
| Failure and partial-failure states | Cover missing routes, missing translations, missing images, and unavailable PDF | These are the only meaningful local failure states in a static client application. | y |
| Idempotency, retry, and duplicate handling | N/A because the MVP performs no mutations or remote writes | Repeating navigation and locale selection has no external side effects. | y |
| Authentication boundaries and rate limits | N/A because all published content is public and no API is exposed | The MVP has no protected operation. | y |
| Concurrency and ordering | N/A because there are no concurrent writes or ordered background jobs | UI state is local and synchronous from the visitor's perspective. | y |
| Data lifecycle and expiry | Locale preference persists until cleared by the visitor | No other visitor data is stored. | y |
| Observability | N/A because analytics and production monitoring are out of scope | Build and validation failures remain visible through local gates. | y |
| External-dependency failure | The content experience remains readable when an image or resume PDF is unavailable | Assets are local but can still fail to load. | y |
| State-transition integrity | Locale changes preserve the equivalent current page and update document language | This is the only persistent user-facing state transition. | y |

**Open questions:** none. Public deployment remains blocked on asset-rights confirmation, which is an explicit release assumption rather than an implementation ambiguity.

---

## User Stories

### P1: Understand Leonardo's Positioning ⭐ MVP

**User Story**: As a recruiter, I want to understand Leonardo's seniority, specialty, and career progression on the first visit so that I can decide whether to explore his work.

**Why P1**: The portfolio fails its primary purpose if the value proposition is unclear.

**Acceptance Criteria**:

1. **PORT-01** — WHEN a visitor opens the Home page at 1440 px THEN the system SHALL show a 7/5-column hero with headline, positioning, and actions for Work, Resume, and Contact on the left and supplied NET NOW imagery on the right within the first viewport.
2. **PORT-02** — WHEN a visitor reviews the Home page for 30 seconds THEN the system SHALL communicate Leonardo's design and front-end background, technology evolution, NET NOW/Xbox/SKY chapters, and current leadership focus.
3. **PORT-03** — WHILE the Home page is rendered the system SHALL identify Leonardo publicly as “Front-End Tech Lead”.
4. **PORT-04** — WHILE the Home page is rendered the system SHALL expose the current resume email and phone as contact links.

**Independent Test**: Open the Home page without prior context and identify the title, four career messages, and three primary destinations within 30 seconds.

---

### P1: Navigate the Portfolio ⭐ MVP

**User Story**: As a visitor, I want direct navigation to work, timeline, resume, and contact so that I can reach relevant information without searching.

**Why P1**: Every primary destination must remain discoverable across the site.

**Acceptance Criteria**:

1. **PORT-05** — WHILE a portfolio page is rendered the system SHALL expose global destinations for Work, Timeline, About, Resume, and Contact.
2. **PORT-06** — WHEN a visitor activates a global navigation item THEN the system SHALL navigate to the corresponding destination in the active locale.
3. **PORT-07** — WHEN a visitor opens an unknown portfolio route THEN the system SHALL present a localized not-found state with an action back to the localized Home page.
4. **PORT-08** — WHILE a page is rendered the system SHALL expose semantic landmarks for header, navigation, main content, and footer.

**Independent Test**: Traverse every global destination in each locale and verify the unknown-route recovery.

---

### P1: Explore Selected Work ⭐ MVP

**User Story**: As a hiring manager, I want to scan the strongest cases and their significance so that I can assess the breadth of Leonardo's experience.

**Why P1**: Selected work provides the evidence behind the positioning.

**Acceptance Criteria**:

1. **PORT-09** — WHEN a visitor reaches the selected-work mosaic THEN the system SHALL show NET NOW, Xbox One, SKY Online, Microsoft/GPA, and Xelix.
2. **PORT-10** — WHILE a selected-work card is visible the system SHALL show its project name, supported period, role, and one-sentence editorial significance.
3. **PORT-11** — WHEN a visitor activates NET NOW, Xbox One, SKY Online, or Microsoft/GPA THEN the system SHALL open the corresponding localized detail page.
4. **PORT-12** — WHILE the selected-work mosaic is rendered at 1440 px the system SHALL use a 12-column asymmetric grid and present NET NOW as its largest visual item.
5. **PORT-13** — WHEN the selected-work mosaic is rendered at 390 px THEN the system SHALL present readable stacked cards without horizontal page scrolling.

**Independent Test**: Inspect the mosaic at 1440 px and 390 px, then open each priority case in both locales.

---

### P1: Follow the Career Evolution ⭐ MVP

**User Story**: As a visitor, I want a concise career timeline so that I can understand how Leonardo moved from design into architecture and leadership.

**Why P1**: The evolution across technology transitions is the core editorial thesis.

**Acceptance Criteria**:

1. **PORT-14** — WHEN a visitor reaches the timeline THEN the system SHALL present Web Design, Silverlight, Streaming, Xbox, React, Global Engineering, Architecture, and AI in chronological order.
2. **PORT-15** — WHILE a timeline milestone is rendered the system SHALL show a supported period and concise description of the transition.
3. **PORT-16** — WHEN the visitor activates the Timeline navigation item from another page THEN the system SHALL reach the localized timeline content.

**Independent Test**: Read the timeline in each locale and verify the eight ordered milestones and navigation target.

---

### P1: Evaluate Priority Cases ⭐ MVP

**User Story**: As an engineering or product leader, I want structured case studies with visual evidence so that I can understand Leonardo's role and the outcome of each project.

**Why P1**: The four priority cases substantiate the portfolio's historical and technical claims.

**Acceptance Criteria**:

1. **PORT-17** — WHEN a visitor opens a priority case THEN the system SHALL show its title, supported period, role, three to five tags, and one-sentence thesis.
2. **PORT-18** — WHILE a priority case is rendered the system SHALL include Context, My Role, Visual Story, Impact/Outcome, and What Changed Next sections.
3. **PORT-19** — WHILE a historical image is visible the system SHALL preserve the source aspect ratio.
4. **PORT-20** — WHEN an image appears below the first viewport THEN the system SHALL declare intrinsic dimensions and use lazy loading.
5. **PORT-21** — IF a case image fails to load THEN the system SHALL preserve meaningful alternative text and readable case content.
6. **PORT-22** — WHILE a priority case is published the system SHALL use only supplied historical assets or approved abstract material and SHALL not present fabricated product imagery.

**Independent Test**: Open all four priority cases, inspect required sections, and verify image behavior with one intentionally unavailable asset.

---

### P1: Trust the Editorial Content ⭐ MVP

**User Story**: As a visitor, I want claims to distinguish personal work, team outcomes, prototypes, and shipped products so that I can trust the portfolio.

**Why P1**: Incorrect attribution or unsupported claims create professional and legal risk.

**Acceptance Criteria**:

1. **PORT-23** — IF an exact date is not supported by the source hierarchy THEN the system SHALL use a year range or “circa” equivalent in the active locale.
2. **PORT-24** — IF a numeric metric lacks resume support or explicit approval THEN the system SHALL omit that metric.
3. **PORT-25** — WHERE Xelix content is rendered the system SHALL use authorized abstract material and SHALL omit unapproved internal screenshots.
4. **PORT-26** — WHILE content describes personal ownership the system SHALL use first-person ownership language only for responsibilities supported by the source hierarchy.
5. **PORT-27** — WHILE content describes a collective outcome the system SHALL attribute the outcome to the team.

**Independent Test**: Compare rendered claims against the PRD, current resume, `EDITORIAL.md`, and `CONTENT.md`.

---

### P1: Review About, Resume, and Contact ⭐ MVP

**User Story**: As a recruiter, I want to review Leonardo's experience and contact details so that I can continue with an opportunity.

**Why P1**: The visitor needs a complete conversion path from evidence to contact.

**Acceptance Criteria**:

1. **PORT-28** — WHEN a visitor opens About/Resume THEN the system SHALL show profile, accomplishments, experience, education, and expertise as semantic HTML.
2. **PORT-29** — WHEN a visitor activates the resume download THEN the system SHALL open the supplied English resume PDF from either locale.
3. **PORT-30** — IF the resume PDF is unavailable THEN the system SHALL keep the localized HTML resume accessible and show a localized unavailable-download message.
4. **PORT-31** — WHEN a visitor activates the email contact THEN the system SHALL open a `mailto:` destination for `leonardo.vitale@outlook.com`.
5. **PORT-32** — WHEN a visitor activates the phone contact THEN the system SHALL open a `tel:` destination for `+5511996762153`.

**Independent Test**: Review all semantic resume sections in both locales and activate the PDF, email, and phone links.

---

### P1: Use the Portfolio in Portuguese or English ⭐ MVP

**User Story**: As a Brazilian or international visitor, I want the complete portfolio in my language so that I can understand its content.

**Why P1**: Both audiences are primary audiences for the portfolio.

**Acceptance Criteria**:

1. **PORT-33** — WHEN a first-time visitor opens a route without a locale and the browser language begins with `en` THEN the system SHALL navigate to the equivalent `en` route.
2. **PORT-34** — WHEN a first-time visitor opens a route without a locale and the browser language is not supported THEN the system SHALL navigate to the equivalent `pt-br` route.
3. **PORT-35** — WHEN a returning visitor opens a route without a locale THEN the system SHALL use the visitor's last explicitly selected supported locale.
4. **PORT-36** — WHEN a visitor selects Português (Brasil) or English THEN the system SHALL preserve the equivalent current page in the selected locale.
5. **PORT-37** — WHEN a visitor selects a supported locale THEN the system SHALL persist that locale for future locale-less visits.
6. **PORT-38** — WHILE a page is rendered in `pt-BR` or `en` the system SHALL set the document `lang` attribute to the corresponding locale.
7. **PORT-39** — WHILE a P1 page is published the system SHALL provide complete interface, content, metadata, and accessibility strings in both locales.
8. **PORT-40** — IF a required locale entry is absent at validation time THEN the system SHALL fail the publication gate for that page.

**Independent Test**: Test first visits with English and unsupported browser languages, select each locale, revisit a locale-less route, and compare every P1 page in both languages.

---

### P1: Access the Portfolio Across Devices and Abilities ⭐ MVP

**User Story**: As a visitor using desktop, mobile, keyboard, or reduced motion, I want equivalent access to content and controls.

**Why P1**: Accessibility and responsive behavior are product requirements, not optional polish.

**Acceptance Criteria**:

1. **PORT-41** — WHEN the viewport width is 390 px THEN the system SHALL render every P1 page without horizontal page scrolling.
2. **PORT-42** — WHEN the viewport width is 1440 px THEN the system SHALL use a centered content area no wider than 1280 px, a 12-column editorial grid, and 96 px rhythm between major sections.
3. **PORT-43** — WHEN a visitor navigates with a keyboard THEN the system SHALL make global navigation, locale controls, case links, resume links, contact links, and gallery controls reachable in DOM order.
4. **PORT-44** — WHILE an interactive element has keyboard focus the system SHALL show a 2–4 px visible focus indicator with at least 3:1 contrast against adjacent colors.
5. **PORT-45** — WHEN `prefers-reduced-motion: reduce` is active THEN the system SHALL remove nonessential transforms and reveal animations.
6. **PORT-46** — WHILE text and interactive controls are visible the system SHALL provide at least 4.5:1 contrast for normal text and 3:1 for large text and graphical controls.
7. **PORT-47** — WHILE an informative image is rendered the system SHALL provide meaningful localized alternative text.
8. **PORT-48** — WHILE the fixed dark theme is rendered the system SHALL use near-black `#0a0a0a` as the page canvas, electric yellow `#faff69` as the sole brand accent, flat surfaces without shadows or gradients, and legible content independent of the operating-system color scheme.

**Independent Test**: Review every P1 page at 390 px and 1440 px, navigate by keyboard, enable reduced motion, and run contrast checks.

---

## Edge Cases

- IF a visitor requests an unsupported locale prefix THEN the system SHALL present the localized fallback route in `pt-BR`.
- IF stored locale data contains a value other than `pt-BR` or `en` THEN the system SHALL ignore it and use browser language with `pt-BR` fallback.
- IF JavaScript storage is unavailable THEN the system SHALL keep locale-prefixed navigation functional without persisted preference.
- IF a required historical asset fails to load THEN the system SHALL preserve the case narrative and meaningful alternative text without fabricating replacement evidence.
- IF the English resume PDF is unavailable THEN the system SHALL preserve localized HTML resume content.
- WHEN translated text is longer than its English equivalent THEN the system SHALL keep navigation and controls readable without clipping at 390 px.
- IF reduced motion is enabled before page load THEN the system SHALL render content without waiting for a reveal animation.
- WHILE the portfolio uses the ClickHouse-inspired visual grammar the system SHALL use historical portfolio screenshots instead of SQL, database, terminal, or fabricated product mockups.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| --- | --- | --- | --- |
| PORT-01 | P1: Positioning | Execute | Complete |
| PORT-02 | P1: Positioning | Tasks | In Tasks |
| PORT-03 | P1: Positioning | Execute | Complete |
| PORT-04 | P1: Positioning | Execute | Complete |
| PORT-05 | P1: Navigation | Execute | Complete |
| PORT-06 | P1: Navigation | Execute | Complete |
| PORT-07 | P1: Navigation | Execute | Complete |
| PORT-08 | P1: Navigation | Execute | Complete |
| PORT-09 | P1: Selected Work | Execute | Complete |
| PORT-10 | P1: Selected Work | Execute | Complete |
| PORT-11 | P1: Selected Work | Execute | Complete |
| PORT-12 | P1: Selected Work | Execute | Complete |
| PORT-13 | P1: Selected Work | Execute | Complete |
| PORT-14 | P1: Timeline | Execute | Complete |
| PORT-15 | P1: Timeline | Execute | Complete |
| PORT-16 | P1: Timeline | Execute | Complete |
| PORT-17 | P1: Priority Cases | Tasks | In Tasks |
| PORT-18 | P1: Priority Cases | Tasks | In Tasks |
| PORT-19 | P1: Priority Cases | Tasks | In Tasks |
| PORT-20 | P1: Priority Cases | Tasks | In Tasks |
| PORT-21 | P1: Priority Cases | Tasks | In Tasks |
| PORT-22 | P1: Priority Cases | Tasks | In Tasks |
| PORT-23 | P1: Editorial Integrity | Tasks | In Tasks |
| PORT-24 | P1: Editorial Integrity | Tasks | In Tasks |
| PORT-25 | P1: Editorial Integrity | Tasks | In Tasks |
| PORT-26 | P1: Editorial Integrity | Tasks | In Tasks |
| PORT-27 | P1: Editorial Integrity | Tasks | In Tasks |
| PORT-28 | P1: About, Resume, Contact | Tasks | In Tasks |
| PORT-29 | P1: About, Resume, Contact | Tasks | In Tasks |
| PORT-30 | P1: About, Resume, Contact | Tasks | In Tasks |
| PORT-31 | P1: About, Resume, Contact | Tasks | In Tasks |
| PORT-32 | P1: About, Resume, Contact | Tasks | In Tasks |
| PORT-33 | P1: Bilingual Experience | Execute | Complete |
| PORT-34 | P1: Bilingual Experience | Execute | Complete |
| PORT-35 | P1: Bilingual Experience | Execute | Complete |
| PORT-36 | P1: Bilingual Experience | Execute | Complete |
| PORT-37 | P1: Bilingual Experience | Execute | Complete |
| PORT-38 | P1: Bilingual Experience | Execute | Complete |
| PORT-39 | P1: Bilingual Experience | Tasks | In Tasks |
| PORT-40 | P1: Bilingual Experience | Tasks | In Tasks |
| PORT-41 | P1: Responsive Accessibility | Tasks | In Tasks |
| PORT-42 | P1: Responsive Accessibility | Tasks | In Tasks |
| PORT-43 | P1: Responsive Accessibility | Tasks | In Tasks |
| PORT-44 | P1: Responsive Accessibility | Execute | Complete |
| PORT-45 | P1: Responsive Accessibility | Execute | Complete |
| PORT-46 | P1: Responsive Accessibility | Tasks | In Tasks |
| PORT-47 | P1: Responsive Accessibility | Tasks | In Tasks |
| PORT-48 | P1: Responsive Accessibility | Execute | Complete |

**Coverage:** 48 total, 48 mapped to tasks, 0 unmapped.

---

## Success Criteria

- [ ] A first-time reviewer identifies Leonardo's title, career evolution, major cases, and current leadership focus within 30 seconds.
- [ ] Home, Work, four priority cases, and About/Resume pass content-parity validation in `pt-BR` and `en`.
- [ ] Every P1 route remains directly addressable and locale switching preserves the equivalent page.
- [ ] No unsupported metric, fabricated screenshot, or incorrect shipped-product claim appears.
- [ ] Every P1 page passes the 390 px, 1440 px, keyboard, reduced-motion, and WCAG 2.2 AA checks defined above.
- [ ] The 80 supplied historical images are copied into the tracked public asset structure, with optimized derivatives used where practical.
- [ ] Build, lint, specification-derived tests, and manual visual validation pass before completion.
