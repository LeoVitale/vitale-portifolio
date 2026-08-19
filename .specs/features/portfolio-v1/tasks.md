# Portfolio V1 Tasks

## Execution Protocol (MANDATORY -- do not skip)

Implement these tasks with the `tlc-spec-driven` skill: **activate it by name and follow its Execute flow and Critical Rules.** Do not search for skill files by filesystem path. The skill is the source of truth for the full flow, including the per-task cycle, atomic commits, sub-agent delegation, Verifier, and discrimination sensor.

**If the skill cannot be activated, STOP and tell the user. Do not proceed without it.**

---

**Design**: `.specs/features/portfolio-v1/design.md`  
**Status**: Approved

---

## Test Coverage Matrix

> Generated from `package.json`, `.oxlintrc.json`, the approved design, and the specification. No existing tests or repository testing guideline was found. The user selected Playwright E2E only; strong specification coverage defaults apply.

| Code Layer | Required Test Type | Coverage Expectation | Location Pattern | Run Command |
| --- | --- | --- | --- | --- |
| Locale routing and persistence | e2e | Every locale route, first-visit branch, stored-locale branch, unsupported locale, and storage failure | `e2e/locale.spec.ts` | `pnpm test:e2e` |
| Page and component behavior | e2e | Every P1 route, required semantic section, primary interaction, and listed UI failure | `e2e/**/*.spec.ts` | `pnpm test:e2e` |
| Responsive and accessibility behavior | e2e | All P1 routes at 390 px and 1440 px; keyboard path; focus; reduced motion; language and alt attributes | `e2e/accessibility.spec.ts` | `pnpm test:e2e` |
| Asset delivery | e2e | Representative original and optimized assets for each P1 case; dimensions, lazy loading, and failure behavior | `e2e/assets.spec.ts` | `pnpm test:e2e` |
| Translation resources and typed factual records | none | Recursive key parity, non-empty required values, valid project IDs, and supported locales enforced by build-time validation | `src/locales/**`, `src/content/**` | build gate only |
| Tooling and static configuration | none | TypeScript, Vite, Oxlint, and Playwright configuration compile and list tests | config files | build gate only |

## Gate Check Commands

> Generated from the current pnpm/Vite project and the user-selected Playwright-only strategy. These commands become authoritative when tasks are approved.

| Gate Level | When to Use | Command |
| --- | --- | --- |
| Quick | After a task with a tagged E2E slice | `pnpm test:e2e -- --grep @T<N>` |
| Full | After route, page, or cross-page integration | `pnpm test:e2e` |
| Build | After config/content/asset tasks and every phase | `pnpm lint && pnpm build && pnpm test:e2e` |

---

## Execution Plan

Phases are ordered and run sequentially. Each phase completes before the next begins, and tasks within a phase execute in order.

### Phase 1: Runtime and Quality Foundation

```text
T1 → T2 → T3 → T4 → T5
```

### Phase 2: Home and Work Narrative

```text
T6 → T7 → T8 → T9 → T10
```

### Phase 3: Priority Case Studies

```text
T11 → T12 → T13 → T14 → T15
```

### Phase 4: Resume and Cross-Page Quality

```text
T16 → T17 → T18
```

---

## Task Breakdown

### T1: Establish the Playwright E2E Gate

**What**: Add the Playwright configuration, browser dependency, pnpm script, and one tagged smoke test that proves the Vite app can be exercised in Chromium.
**Where**: `playwright.config.ts`
**Depends on**: None
**Reuses**: `package.json` scripts and the existing Vite development server.
**Requirement**: PORT-01 to PORT-48 verification infrastructure

**Tools**:

- MCP: NONE
- Skill: `tlc-spec-driven`

**Done when**:

- [ ] `pnpm test:e2e -- --grep @T1` runs one smoke test in Chromium.
- [ ] Playwright starts and stops the Vite web server automatically.
- [ ] Existing build and lint commands still pass.
- [ ] Test count is at least 1 and does not decrease.

**Tests**: e2e
**Gate**: build
**Commit**: `test(portfolio): establish Playwright E2E gate`

---

### T2: Prepare and Version Historical Assets

**What**: Add a repeatable asset preparation script that copies the 80 approved images into normalized public case folders, records dimensions, generates WebP derivatives, and copies the current English resume PDF.
**Where**: `scripts/prepare-assets.mjs`
**Depends on**: T1
**Reuses**: `briefing/portifolio/`, `briefing/ASSETS.md`, and the current resume PDF.
**Requirement**: PORT-19, PORT-20, PORT-21, PORT-22, PORT-29, PORT-47

**Tools**:

- MCP: NONE
- Skill: `tlc-spec-driven`

**Done when**:

- [ ] `pnpm assets:prepare` produces exactly 80 original image entries in the manifest.
- [ ] Destination names are normalized and stable across repeated runs.
- [ ] Each manifest item includes original path, optimized path, width, and height.
- [ ] Representative original and WebP files from each P1 case return HTTP 200 in at least 5 tagged E2E checks.
- [ ] The English resume PDF is available from the tracked public resume path.
- [ ] Re-running the script produces no duplicate files.
- [ ] Test count increases by at least 5 and does not decrease.

**Tests**: e2e
**Gate**: build
**Commit**: `feat(assets): prepare portfolio media archive`

---

### T3: Define Factual Content and Translation Resources

**What**: Create the typed project, timeline, route, and resume records plus complete `en` and `pt-BR` i18next namespaces with a recursive parity validator.
**Where**: `src/content/`
**Depends on**: T2
**Reuses**: `PRD.md`, `briefing/CONTENT.md`, `briefing/EDITORIAL.md`, `briefing/ASSETS.md`, and the current resume markdown.
**Requirement**: PORT-02, PORT-09, PORT-10, PORT-14, PORT-15, PORT-17, PORT-18, PORT-23 to PORT-27, PORT-28, PORT-39, PORT-40, PORT-47

**Tools**:

- MCP: NONE
- Skill: `tlc-spec-driven`

**Done when**:

- [ ] Typed records contain only supported facts, project IDs, periods, roles, statuses, and asset references.
- [ ] English resources preserve the approved editorial meaning.
- [ ] Portuguese resources provide complete adapted copy for every P1 namespace.
- [ ] `pnpm i18n:check` fails for missing, unexpected required, or empty translation leaves.
- [ ] The production build invokes the parity check.
- [ ] Build and lint pass.

**Tests**: none
**Gate**: build
**Commit**: `feat(content): define bilingual portfolio content`

---

### T4: Implement Locale-Prefixed Routing

**What**: Replace the template app with React Router and i18next initialization, locale resolution, persistence, equivalent-path switching, metadata language updates, and localized fallback routes.
**Where**: `src/app/AppRouter.tsx`
**Depends on**: T3
**Reuses**: Existing `src/main.tsx`, content route IDs, locale resources, and project decision AD-001.
**Requirement**: PORT-05, PORT-06, PORT-07, PORT-33 to PORT-40

**Tools**:

- MCP: NONE
- Skill: `tlc-spec-driven`

**Done when**:

- [ ] First locale-less visits select English for English browsers and `pt-BR` otherwise.
- [ ] Explicit locale selection persists for future locale-less visits.
- [ ] Switching locale preserves Home, Work, About, and each priority case identity.
- [ ] Unsupported and corrupt locale inputs resolve to localized fallback behavior.
- [ ] Storage denial does not break locale-prefixed navigation.
- [ ] Document `lang` follows the active locale.
- [ ] At least 9 tagged E2E tests cover all locale branches and edge cases.
- [ ] Test count increases by at least 9 and does not decrease.

**Tests**: e2e
**Gate**: full
**Commit**: `feat(i18n): add locale-aware portfolio routing`

---

### T5: Build the Semantic Editorial Shell

**What**: Implement the fixed dark design tokens, semantic site layout, global navigation, language selector, skip link, footer, focus treatment, and responsive mobile navigation.
**Where**: `src/components/layout/SiteLayout.tsx`
**Depends on**: T4
**Reuses**: Locale route helpers, i18next common namespace, and `briefing/DESIGN.md`.
**Requirement**: PORT-05, PORT-06, PORT-08, PORT-36, PORT-38, PORT-41, PORT-43 to PORT-48

**Tools**:

- MCP: `user-playwright`
- Skill: `ui-ux-pro-max`, `tlc-spec-driven`

**Done when**:

- [ ] Header, navigation, main, and footer landmarks render on every route.
- [ ] Work, Timeline, About, Resume, Contact, and both languages are keyboard reachable in DOM order.
- [ ] Focus indicators meet the specified 3:1 contrast requirement.
- [ ] The layout uses the fixed dark theme regardless of operating-system theme.
- [ ] Mobile navigation is usable at 390 px without horizontal page scrolling.
- [ ] At least 6 tagged E2E tests cover landmarks, navigation, language control, keyboard focus, and mobile behavior.
- [ ] Test count increases by at least 6 and does not decrease.

**Tests**: e2e
**Gate**: full
**Commit**: `feat(layout): build accessible portfolio shell`

---

### T6: Create the Home Positioning Section

**What**: Implement the Home hero and career-signal strip with the approved Front-End Tech Lead positioning, key messages, primary actions, email, and phone.
**Where**: `src/components/home/Hero.tsx`
**Depends on**: T5
**Reuses**: Home translation namespace, contact constants, and global action styles.
**Requirement**: PORT-01, PORT-02, PORT-03, PORT-04

**Tools**:

- MCP: `user-playwright`
- Skill: `ui-ux-pro-max`, `tlc-spec-driven`

**Done when**:

- [ ] The 1440 px first viewport contains headline, positioning, Work, Resume, and Contact actions.
- [ ] Public title is exactly “Front-End Tech Lead”.
- [ ] Email and phone render as `mailto:` and `tel:` links.
- [ ] Career signals include only supported facts and metrics.
- [ ] At least 4 tagged E2E tests cover both locales and primary actions.
- [ ] Test count increases by at least 4 and does not decrease.

**Tests**: e2e
**Gate**: quick
**Commit**: `feat(home): present portfolio positioning`

---

### T7: Create the Selected Work Mosaic

**What**: Implement the five-item editorial mosaic with NET NOW as the desktop hero item, localized metadata, responsive stacked cards, and links to the four priority cases.
**Where**: `src/components/home/SelectedWork.tsx`
**Depends on**: T6
**Reuses**: Typed project records, project asset manifest, and localized route helpers.
**Requirement**: PORT-09, PORT-10, PORT-11, PORT-12, PORT-13

**Tools**:

- MCP: `user-playwright`
- Skill: `ui-ux-pro-max`, `tlc-spec-driven`

**Done when**:

- [ ] NET NOW, Xbox One, SKY Online, Microsoft/GPA, and Xelix render in the required order and hierarchy.
- [ ] Every card shows project, period, role, and editorial significance.
- [ ] Four priority cards reach the equivalent localized case routes.
- [ ] NET NOW is the largest item at 1440 px.
- [ ] Cards stack without page overflow at 390 px.
- [ ] At least 6 tagged E2E tests cover content, links, and both viewports.
- [ ] Test count increases by at least 6 and does not decrease.

**Tests**: e2e
**Gate**: quick
**Commit**: `feat(home): add selected work mosaic`

---

### T8: Create the Career Timeline

**What**: Implement the eight-milestone career timeline and the stable localized Timeline navigation target.
**Where**: `src/components/home/CareerTimeline.tsx`
**Depends on**: T7
**Reuses**: Typed timeline records and localized descriptions.
**Requirement**: PORT-14, PORT-15, PORT-16

**Tools**:

- MCP: `user-playwright`
- Skill: `ui-ux-pro-max`, `tlc-spec-driven`

**Done when**:

- [ ] All eight required milestones render in chronological order.
- [ ] Every milestone shows a supported period and concise localized description.
- [ ] The global Timeline link reaches the section from Home, Work, About, and a case route.
- [ ] At least 4 tagged E2E tests cover order, bilingual copy, and cross-route navigation.
- [ ] Test count increases by at least 4 and does not decrease.

**Tests**: e2e
**Gate**: quick
**Commit**: `feat(home): add career evolution timeline`

---

### T9: Create the Current Chapter and About Preview

**What**: Implement the Xelix leadership chapter and About preview using authorized abstract visuals, supported metrics, and links to the localized About route.
**Where**: `src/components/home/CurrentChapter.tsx`
**Depends on**: T8
**Reuses**: Current resume facts, Xelix translations, and abstract visual tokens.
**Requirement**: PORT-02, PORT-24, PORT-25, PORT-26, PORT-27

**Tools**:

- MCP: `user-playwright`
- Skill: `ui-ux-pro-max`, `tlc-spec-driven`

**Done when**:

- [ ] Xelix content communicates architecture, leadership, and current technical direction.
- [ ] No internal or fabricated product screenshot appears.
- [ ] Only resume-supported metrics appear.
- [ ] Personal ownership and team outcomes use the correct attribution.
- [ ] About preview reaches the equivalent localized About route.
- [ ] At least 4 tagged E2E tests cover content integrity and navigation.
- [ ] Test count increases by at least 4 and does not decrease.

**Tests**: e2e
**Gate**: quick
**Commit**: `feat(home): present current leadership chapter`

---

### T10: Create the Work Index

**What**: Implement the localized Work page with priority-case cards and explicit separation from deferred archive content.
**Where**: `src/pages/WorkPage.tsx`
**Depends on**: T9
**Reuses**: Project records, card presentation, and route helpers from Home.
**Requirement**: PORT-06, PORT-09, PORT-10, PORT-11, PORT-39

**Tools**:

- MCP: `user-playwright`
- Skill: `ui-ux-pro-max`, `tlc-spec-driven`

**Done when**:

- [ ] The Work page renders directly in both locale URLs.
- [ ] Four priority cases are navigable and Xelix remains a non-detail leadership card.
- [ ] Deferred archive cases are not presented as completed P1 routes.
- [ ] At least 4 tagged E2E tests cover direct routes, bilingual content, and case links.
- [ ] Test count increases by at least 4 and does not decrease.

**Tests**: e2e
**Gate**: full
**Commit**: `feat(work): add selected work index`

---

### T11: Build the Shared Case Study Template

**What**: Implement the shared case metadata, section structure, responsive gallery, intrinsic dimensions, localized alt text, lazy loading, image-failure handling, and next-chapter link.
**Where**: `src/pages/CaseStudyPage.tsx`
**Depends on**: T10
**Reuses**: Typed project records, asset manifest, route helpers, and case translation namespace.
**Requirement**: PORT-17, PORT-18, PORT-19, PORT-20, PORT-21, PORT-22, PORT-43, PORT-47

**Tools**:

- MCP: `user-playwright`
- Skill: `ui-ux-pro-max`, `tlc-spec-driven`

**Done when**:

- [ ] A project slug resolves to the common case structure.
- [ ] Header shows title, supported period, role, three to five tags, and thesis.
- [ ] Context, My Role, Visual Story, Impact/Outcome, and What Changed Next render semantically.
- [ ] Images preserve dimensions, use WebP sources where available, and lazy-load below the first viewport.
- [ ] A failed image keeps alt text and narrative readable.
- [ ] Gallery controls are keyboard reachable when present.
- [ ] At least 6 tagged E2E tests cover shared structure and failure behavior.
- [ ] Test count increases by at least 6 and does not decrease.

**Tests**: e2e
**Gate**: full
**Commit**: `feat(cases): build shared case study template`

---

### T12: Populate the NET NOW Case

**What**: Add the complete bilingual NET NOW case, ordered six-image gallery, supported role, React transition narrative, and next-career connection.
**Where**: `src/locales/en/cases.json`
**Depends on**: T11
**Reuses**: NET NOW source records, six prepared assets, and shared case template.
**Requirement**: PORT-17 to PORT-27, PORT-39, PORT-47

**Tools**:

- MCP: `user-playwright`
- Skill: `ui-ux-pro-max`, `tlc-spec-driven`

**Done when**:

- [ ] Both locales contain equivalent NET NOW context, role, outcome, and transition copy.
- [ ] Player imagery receives primary visual emphasis.
- [ ] Claims match the current resume and briefing source precedence.
- [ ] Six supplied images render in the approved order with localized alt text.
- [ ] At least 4 tagged E2E tests cover both locale routes, gallery, and claims.
- [ ] Test count increases by at least 4 and does not decrease.

**Tests**: e2e
**Gate**: quick
**Commit**: `feat(cases): publish NET NOW story`

---

### T13: Populate the Xbox One Case

**What**: Add the complete bilingual Xbox One case with the 24-image gallery grouped by GloboSat Play, SKY Online, Telecine Play, and Vivo Play.
**Where**: `src/locales/en/cases.json`
**Depends on**: T12
**Reuses**: Xbox One source records, prepared brand assets, and shared case template.
**Requirement**: PORT-17 to PORT-27, PORT-39, PORT-47

**Tools**:

- MCP: `user-playwright`
- Skill: `ui-ux-pro-max`, `tlc-spec-driven`

**Done when**:

- [ ] Both locales explain the entertainment-platform context and Leonardo's supported contribution.
- [ ] Four brand groups render with all 24 supplied images.
- [ ] Group labels and alternative text are localized.
- [ ] No unsupported launch or ownership claim appears.
- [ ] At least 5 tagged E2E tests cover locales, brand groups, asset count, and attribution.
- [ ] Test count increases by at least 5 and does not decrease.

**Tests**: e2e
**Gate**: quick
**Commit**: `feat(cases): publish Xbox One suite`

---

### T14: Populate the SKY Online Case

**What**: Add the complete bilingual SKY Online Web case with its eight-image system gallery and qualified prototype-to-product narrative.
**Where**: `src/locales/en/cases.json`
**Depends on**: T13
**Reuses**: SKY Online source records, normalized duplicate-safe asset names, and shared case template.
**Requirement**: PORT-17 to PORT-27, PORT-39, PORT-47

**Tools**:

- MCP: `user-playwright`
- Skill: `ui-ux-pro-max`, `tlc-spec-driven`

**Done when**:

- [ ] Both locales show the complete-screen-system emphasis.
- [ ] Eight supplied images render using normalized portable paths.
- [ ] Date precision and prototype-to-product wording remain qualified.
- [ ] At least 4 tagged E2E tests cover locales, gallery breadth, dates, and status wording.
- [ ] Test count increases by at least 4 and does not decrease.

**Tests**: e2e
**Gate**: quick
**Commit**: `feat(cases): publish SKY Online system`

---

### T15: Populate the Microsoft/GPA Case

**What**: Add the complete bilingual Microsoft/GPA case with its ten-image gallery and supported Silverlight-era enterprise narrative.
**Where**: `src/locales/en/cases.json`
**Depends on**: T14
**Reuses**: Microsoft-WeFit source records, prepared assets, and shared case template.
**Requirement**: PORT-17 to PORT-27, PORT-39, PORT-47

**Tools**:

- MCP: `user-playwright`
- Skill: `ui-ux-pro-max`, `tlc-spec-driven`

**Done when**:

- [ ] Both locales explain the Microsoft visibility and GPA opportunity without unsupported ownership claims.
- [ ] Ten supplied images render in the approved business-flow order.
- [ ] The period uses qualified precision.
- [ ] At least 4 tagged E2E tests cover locales, asset sequence, period, and attribution.
- [ ] Test count increases by at least 4 and does not decrease.

**Tests**: e2e
**Gate**: full
**Commit**: `feat(cases): publish Microsoft GPA chapter`

---

### T16: Create About, Resume, and Contact

**What**: Implement the bilingual semantic About/Resume page with profile, accomplishments, experience, education, expertise, email, phone, English PDF download, and unavailable-PDF fallback.
**Where**: `src/pages/AboutPage.tsx`
**Depends on**: T15
**Reuses**: Typed resume records, about translations, public PDF, and global contact constants.
**Requirement**: PORT-28, PORT-29, PORT-30, PORT-31, PORT-32, PORT-39, PORT-43

**Tools**:

- MCP: `user-playwright`
- Skill: `ui-ux-pro-max`, `tlc-spec-driven`

**Done when**:

- [ ] Profile, accomplishments, experience, education, and expertise use semantic headings and lists.
- [ ] Both locale routes render complete equivalent content.
- [ ] Email and phone use the approved destinations.
- [ ] The English PDF download works from both locales.
- [ ] Simulated PDF failure keeps HTML resume usable and shows a localized message.
- [ ] At least 6 tagged E2E tests cover content, contacts, PDF, fallback, and keyboard access.
- [ ] Test count increases by at least 6 and does not decrease.

**Tests**: e2e
**Gate**: full
**Commit**: `feat(about): add bilingual resume and contact`

---

### T17: Complete Not-Found and Failure States

**What**: Implement localized unknown-route recovery and verify invalid locale, storage denial, image failure, and unavailable-resume behavior across the integrated app.
**Where**: `src/pages/NotFoundPage.tsx`
**Depends on**: T16
**Reuses**: Locale resolver, shared layout, case image fallback, and About PDF fallback.
**Requirement**: PORT-07, PORT-21, PORT-30, PORT-34, PORT-35, plus all listed edge cases

**Tools**:

- MCP: `user-playwright`
- Skill: `tlc-spec-driven`

**Done when**:

- [ ] Unknown routes show a localized message and localized Home action.
- [ ] Unsupported locale prefixes resolve to `pt-br`.
- [ ] Invalid stored locale and denied storage do not break navigation.
- [ ] Integrated image and PDF failures preserve readable content.
- [ ] At least 7 tagged E2E tests cover every listed failure branch.
- [ ] Test count increases by at least 7 and does not decrease.

**Tests**: e2e
**Gate**: full
**Commit**: `feat(routing): complete localized failure states`

---

### T18: Close Responsive and Accessibility Coverage

**What**: Apply the final cross-page responsive, keyboard, focus, reduced-motion, contrast, metadata, and bilingual overflow corrections required for every P1 route.
**Where**: `src/styles/pages.css`
**Depends on**: T17
**Reuses**: Existing token, layout, component, and page styles plus the full P1 route suite.
**Requirement**: PORT-01, PORT-08, PORT-12, PORT-13, PORT-19, PORT-38 to PORT-48

**Tools**:

- MCP: `user-playwright`
- Skill: `ui-ux-pro-max`, `tlc-spec-driven`

**Done when**:

- [ ] Every P1 route passes at 390 px without horizontal page scrolling.
- [ ] Home and cases preserve their required hierarchy at 1440 px.
- [ ] Keyboard navigation reaches all required controls in DOM order.
- [ ] Focus, contrast, `lang`, localized alt text, titles, descriptions, and canonical URLs meet the specification.
- [ ] Reduced motion removes nonessential transforms and reveal animations.
- [ ] Longer Portuguese labels do not clip navigation or controls.
- [ ] At least 12 tagged E2E checks cover all P1 route categories at both viewports and accessibility states.
- [ ] Full build, lint, translation parity, and E2E gates pass with no test-count reduction.

**Tests**: e2e
**Gate**: build
**Commit**: `fix(portfolio): close responsive accessibility gaps`

---

## Phase Execution Map

```text
Phase 1 → Phase 2 → Phase 3 → Phase 4

Phase 1: T1 → T2 → T3 → T4 → T5
Handoff: T5 → T6
Phase 2: T6 → T7 → T8 → T9 → T10
Handoff: T10 → T11
Phase 3: T11 → T12 → T13 → T14 → T15
Handoff: T15 → T16
Phase 4: T16 → T17 → T18
```

Execution is sequential. The first task of each phase depends on the final task of the preceding phase.

---

## Task Granularity Check

| Task | Atomic deliverable | Status |
| --- | --- | --- |
| T1 | E2E harness | Pass |
| T2 | Asset pipeline | Pass |
| T3 | Bilingual content contract | Pass |
| T4 | Locale routing | Pass |
| T5 | Site shell | Pass |
| T6 | Positioning section | Pass |
| T7 | Work mosaic | Pass |
| T8 | Timeline | Pass |
| T9 | Current chapter | Pass |
| T10 | Work index | Pass |
| T11 | Shared case template | Pass |
| T12 | NET NOW case | Pass |
| T13 | Xbox One case | Pass |
| T14 | SKY Online case | Pass |
| T15 | Microsoft/GPA case | Pass |
| T16 | About/Resume | Pass |
| T17 | Failure states | Pass |
| T18 | Cross-page accessibility closure | Pass |

## Diagram-Definition Cross-Check

| Task | Depends On | Diagram Shows | Status |
| --- | --- | --- | --- |
| T1 | None | Phase 1 start | Match |
| T2 | T1 | T1 → T2 | Match |
| T3 | T2 | T2 → T3 | Match |
| T4 | T3 | T3 → T4 | Match |
| T5 | T4 | T4 → T5 | Match |
| T6 | T5 | Phase 1 → Phase 2, T6 start | Match |
| T7 | T6 | T6 → T7 | Match |
| T8 | T7 | T7 → T8 | Match |
| T9 | T8 | T8 → T9 | Match |
| T10 | T9 | T9 → T10 | Match |
| T11 | T10 | Phase 2 → Phase 3, T11 start | Match |
| T12 | T11 | T11 → T12 | Match |
| T13 | T12 | T12 → T13 | Match |
| T14 | T13 | T13 → T14 | Match |
| T15 | T14 | T14 → T15 | Match |
| T16 | T15 | Phase 3 → Phase 4, T16 start | Match |
| T17 | T16 | T16 → T17 | Match |
| T18 | T17 | T17 → T18 | Match |

## Test Co-location Validation

| Task | Code Layer | Matrix Requires | Task Says | Status |
| --- | --- | --- | --- | --- |
| T1 | Tooling + smoke route | e2e | e2e | OK |
| T2 | Asset delivery | e2e | e2e | OK |
| T3 | Content/config | none, build gate | none | OK |
| T4 | Locale routing | e2e | e2e | OK |
| T5 | Layout/UI | e2e | e2e | OK |
| T6 | Home UI | e2e | e2e | OK |
| T7 | Home UI | e2e | e2e | OK |
| T8 | Home UI | e2e | e2e | OK |
| T9 | Home UI | e2e | e2e | OK |
| T10 | Route/page UI | e2e | e2e | OK |
| T11 | Route/page/gallery UI | e2e | e2e | OK |
| T12 | Case content UI | e2e | e2e | OK |
| T13 | Case content UI | e2e | e2e | OK |
| T14 | Case content UI | e2e | e2e | OK |
| T15 | Case content UI | e2e | e2e | OK |
| T16 | Route/page UI | e2e | e2e | OK |
| T17 | Failure behavior | e2e | e2e | OK |
| T18 | Responsive/accessibility UI | e2e | e2e | OK |
