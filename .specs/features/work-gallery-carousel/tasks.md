# Work Gallery Carousel Tasks

## Execution Protocol (MANDATORY -- do not skip)

Implement these tasks with the `tlc-spec-driven` skill: **activate it by name and follow its Execute flow and Critical Rules.** Do not search for skill files by filesystem path. The skill is the source of truth for the full flow (per-task cycle, sub-agent delegation, adequacy review, Verifier, discrimination sensor).

**If the skill cannot be activated, STOP and tell the user - do not proceed without it.**

---

**Design**: skipped (existing `CaseGallery` on case pages; no new architecture)
**Status**: Done

---

## Test Coverage Matrix

> Generated from `package.json`, `e2e/*.spec.ts`, and the feature spec. Guidelines found: none beyond Playwright E2E scripts already used by portfolio-v1. Strong specification coverage defaults apply.

| Code Layer | Required Test Type | Coverage Expectation | Location Pattern | Run Command |
| --- | --- | --- | --- | --- |
| Case gallery behavior | e2e | Happy path, wrap, groups, keyboard, swipe, reduced motion, 390 px overflow, image-failure | `e2e/carousel.spec.ts`, `e2e/cases.spec.ts` | `pnpm test:e2e` |
| Translation resources | none | Key parity via `pnpm i18n:check` inside build | `src/locales/**` | build gate only |

## Gate Check Commands

> Generated from the current pnpm/Vite project and the existing Playwright-only strategy.

| Gate Level | When to Use | Command |
| --- | --- | --- |
| Quick | After a task with a tagged E2E slice | `pnpm test:e2e -- --grep @CAR` |
| Full | After existing case-suite adaptation | `pnpm test:e2e` |
| Build | After translation-only tasks and phase completion | `pnpm lint && pnpm build && pnpm test:e2e` |

---

## Execution Plan

Phases are ordered and run sequentially - each phase completes before the next begins, and tasks within a phase execute in order.

### Phase 1: Carousel

```
T1 → T2 → T3 → T4 → T5
```

---

## Task Breakdown

### T1: Add bilingual carousel copy

**What**: Add localized previous, next, position (`n of m`), and carousel name strings to the cases namespace in both locales.
**Where**: `src/locales/en/cases.json`
**Depends on**: None
**Reuses**: Existing `cases` namespace and `scripts/check-i18n.mjs` key-parity gate.
**Requirement**: CAR-03, CAR-12

**Tools**:

- MCP: NONE
- Skill: `tlc-spec-driven`

**Done when**:

- [x] English and Portuguese cases namespaces include `carousel.previous`, `carousel.next`, `carousel.position`, and `carousel.label`.
- [x] Position strings use `{{current}}` and `{{total}}`.
- [x] `pnpm i18n:check` passes.

**Tests**: none
**Gate**: build

---

### T2: Turn CaseGallery into a wrap-around carousel

**What**: Render each multi-image gallery or Xbox brand group as a carousel with one visible image, previous/next, localized `n of m`, keyboard arrows, swipe, wrap, and preserved image attributes.
**Where**: `src/components/work/CaseGallery.tsx`
**Depends on**: T1
**Reuses**: Current grouped `CaseGallery` structure, `cases` translations, PORT image-failure status.
**Requirement**: CAR-01, CAR-02, CAR-03, CAR-04, CAR-05, CAR-06, CAR-07, CAR-08, CAR-09, CAR-10

**Tools**:

- MCP: `user-playwright`
- Skill: `tlc-spec-driven`

**Done when**:

- [x] A gallery or group with two or more images shows exactly one image at a time.
- [x] A one-image set has no previous, next, or position controls.
- [x] Next and previous wrap the approved order.
- [x] Xbox One keeps four headed groups, each with its own carousel index.
- [x] Images keep width, height, lazy loading, WebP sources, and localized alt.
- [x] A failed image still shows the localized status and readable narrative.
- [x] ArrowLeft/ArrowRight and horizontal swipe change slides with the same wrap rules.
- [x] Tagged `@CAR` E2E tests cover the criteria above.

**Tests**: e2e
**Gate**: quick

---

### T3: Style carousel chrome for motion and 390 px

**What**: Add carousel layout, 44 px controls, and reduced-motion instant slide changes without shadows, gradients, or horizontal page overflow.
**Where**: `src/styles/pages.css`
**Depends on**: T2
**Reuses**: Existing case-gallery image rules, focus tokens, and `prefers-reduced-motion` contract.
**Requirement**: CAR-11, CAR-12, CAR-13

**Tools**:

- MCP: `user-playwright`
- Skill: `tlc-spec-driven`

**Done when**:

- [x] Carousel controls are at least 44 × 44 px and show the existing 2–4 px yellow focus treatment.
- [x] `prefers-reduced-motion: reduce` updates the visible image without transform or opacity animation.
- [x] The NET NOW case at 390 px has no horizontal page scroll.
- [x] Tagged `@CAR` E2E tests cover reduced motion and 390 px overflow.

**Tests**: e2e
**Gate**: quick

---

### T4: Keep existing case gallery assertions carousel-compatible

**What**: Update the shared case gallery aspect-ratio test so it still proves PORT-19/CAR-07 without requiring the retired stacked `--wide`/`--detail` layout.
**Where**: `e2e/cases.spec.ts`
**Depends on**: T3
**Reuses**: Existing NET NOW, Xbox, SKY, and GPA source-order and alt assertions.
**Requirement**: CAR-07

**Tools**:

- MCP: `user-playwright`
- Skill: `tlc-spec-driven`

**Done when**:

- [x] Source-order, count, alt, lazy-loading, and failure assertions still run.
- [x] The visible carousel image still matches its source aspect ratio.
- [x] The full Playwright suite passes.

**Tests**: e2e
**Gate**: build

---

### T5: Prove a one-image gallery has no carousel chrome

**What**: Add a one-image Visual Story fixture and an `@CAR` test that fails if previous, next, or `n of m` appear.
**Where**: `e2e/carousel.spec.ts`
**Depends on**: T4
**Reuses**: NET NOW first asset and `CaseGallery` singleton branch.
**Requirement**: CAR-02

**Tools**:

- MCP: `user-playwright`
- Skill: `tlc-spec-driven`

**Done when**:

- [x] A one-image Visual Story renders a static figure with no previous, next, or position controls.
- [x] Removing the singleton branch fails the tagged `@CAR` suite.

**Tests**: e2e
**Gate**: quick

---

## Phase Execution Map

```
Phase 1:  T1 ------→ T2 ------→ T3 ------→ T4 ------→ T5
```

---

## Task Granularity Check

| Task | Scope | Status |
| --- | --- | --- |
| T1: Bilingual carousel copy | translation resources | Granular |
| T2: CaseGallery carousel | one component | Granular |
| T3: Carousel CSS | one stylesheet | Granular |
| T4: Case suite adaptation | one spec file | Granular |

---

## Diagram-Definition Cross-Check

| Task | Depends On (task body) | Diagram Shows | Status |
| --- | --- | --- | --- |
| T1 | None | none | Match |
| T2 | T1 | T1 → T2 | Match |
| T3 | T2 | T2 → T3 | Match |
| T4 | T3 | T3 → T4 | Match |
| T5 | T4 | T4 → T5 | Match |

---

## Test Co-location Validation

| Task | Code Layer Created/Modified | Matrix Requires | Task Says | Status |
| --- | --- | --- | --- | --- |
| T1: Copy | Translation resources | none | none | OK |
| T2: CaseGallery | Case gallery behavior | e2e | e2e | OK |
| T3: CSS | Case gallery behavior | e2e | e2e | OK |
| T4: cases.spec | Case gallery behavior | e2e | e2e | OK |
| T5: CAR-02 fixture | Case gallery behavior | e2e | e2e | OK |
