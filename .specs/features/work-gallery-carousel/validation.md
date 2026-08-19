# Work Gallery Carousel Validation

**Verdict**: PASS  
**Date**: 2026-08-19  
**Spec**: `.specs/features/work-gallery-carousel/spec.md`  
**Diff range**: `95ff520..HEAD` (`95ff520`, `ee81c7d`, `6b61769`, `d6ca33d`, `1ea7ecf`; carousel CSS also in `3dcd71d`)  
**Verifier**: independent sub-agent (author ≠ verifier)  
**Iteration**: fix→re-verify 2 of 3

---

## Task Completion

| Task | Status | Notes |
| ---- | ------ | ----- |
| T1 | ✅ Done | Bilingual `carousel.*` keys in both locales |
| T2 | ✅ Done | Multi-image carousel plus singleton branch |
| T3 | ✅ Done | Reduced motion and 390 px overflow covered |
| T4 | ✅ Done | Shared case aspect-ratio assertion adapted to the visible carousel image |
| T5 | ✅ Done | `#carousel-static` fixture plus `@CAR` one-image chrome omission test |

---

## Spec-Anchored Acceptance Criteria

| Criterion (WHEN X THEN Y) | Spec-defined outcome | `file:line` + assertion | Result |
| ------------------------- | -------------------- | ----------------------- | ------ |
| CAR-01 — two or more images | Exactly one image visible | `e2e/carousel.spec.ts:36` — `expect(carousel.locator('img').locator('visible=true')).toHaveCount(1)` | ✅ PASS |
| CAR-02 — exactly one image | Static figure; no previous, next, or position controls | `e2e/carousel.spec.ts:23-27` — `.case-gallery img` count `1`; `.case-carousel` count `0`; `Previous image` / `Next image` / `1 of 1` each `toHaveCount(0)` | ✅ PASS |
| CAR-03 — chrome while rendered | Previous, next, and localized `n of m` visible and operable | `e2e/carousel.spec.ts:37-39` — `getByRole('button', { name: 'Previous image' })` / `'Next image'` `.toBeVisible()` and `getByText('1 of 6').toBeVisible()`; `e2e/carousel.spec.ts:46-48` — `getByText('1 de 6')`, `'Imagem anterior'`, `'Próxima imagem'` | ✅ PASS |
| CAR-04 — next wraps last → first | Following image in approved order; last next shows first | `e2e/carousel.spec.ts:70-71` — after last next, `getByText('1 of 6').toBeVisible()` and visible `src` is `netNowSources[0]` | ✅ PASS |
| CAR-05 — previous wraps first → last | Preceding image; first previous shows last | `e2e/carousel.spec.ts:80-81` — `getByText('6 of 6').toBeVisible()` and visible `src` is `netNowSources[5]` | ✅ PASS |
| CAR-06 — Xbox brand groups | One independent carousel per group; group headings kept | `e2e/carousel.spec.ts:87-104` — `h3` texts `['GloboSat Play','SKY Online','Telecine Play','Vivo Play']`; each group `.case-carousel` count `1`; after Globosat next, `2 of 7` vs Sky still `1 of 5` | ✅ PASS |
| CAR-07 — image attributes | Source aspect ratio, width/height, lazy load, localized alt | `e2e/carousel.spec.ts:113-117` — `src` `/\.webp$/`, `width` `'1920'`, `height` `'2953'`, `loading` `'lazy'`, `alt` `/NET NOW/`; `e2e/cases.spec.ts:81` — `renderedRatio` `toBeCloseTo(sourceRatio, 1)` | ✅ PASS |
| CAR-08 — image load failure | Meaningful alt, localized unavailable status, readable narrative | `e2e/carousel.spec.ts:124-128` — `alt` `/NET NOW/`; `getByRole('status')` text `'Historical image unavailable. The case narrative remains available.'`; narrative `/defining transition from interface leadership/` visible | ✅ PASS |
| CAR-09 — keyboard arrows | ArrowLeft previous, ArrowRight next, same wrap as buttons | `e2e/carousel.spec.ts:136-142` — ArrowRight → `2 of 6` and `netNowSources[1]`; ArrowLeft → `1 of 6` and `netNowSources[0]` | ✅ PASS |
| CAR-10 — horizontal swipe | Current image changes in swipe direction with same wrap | `e2e/carousel.spec.ts:203-204` — after leftward drag, `getByText('2 of 6').toBeVisible()` and visible `src` is `netNowSources[1]` | ✅ PASS |
| CAR-11 — reduced motion | Visible image updates without transform or opacity animation | `e2e/carousel.spec.ts:155-162` — `toHaveCSS('transform', 'none')` and every `transitionDuration` `<= 0.001` | ✅ PASS |
| CAR-12 — a11y chrome | Localized names, DOM-order reachability, 2–4 px focus ≥3:1 | `e2e/carousel.spec.ts:37-38` — accessible names; `e2e/carousel.spec.ts:180-181` — `outlineWidth` `'3px'` and `outlineColor` `'rgb(250, 255, 105)'` | ✅ PASS |
| CAR-13 — 390 px | Carousel and controls readable; no horizontal page scroll | `e2e/carousel.spec.ts:186` — `hasHorizontalOverflow` `toBe(false)` | ✅ PASS |

**Status**: ✅ All ACs covered

CAR-02 notes: `src/pages/CaseStudyPage.tsx:22` slices the published NET NOW gallery to one asset when `window.location.hash === '#carousel-static'`. The test at `e2e/carousel.spec.ts:20` navigates `/en/work/net-now#carousel-static` and asserts a static figure with no carousel chrome. That is the previous missing `file:line` evidence.

---

## Discrimination Sensor

Scratch: `git worktree add /tmp/work-gallery-carousel-sensor-r2 HEAD`. Real tree never mutated. Porcelain baseline `M .specs/LESSONS.md`, `M .specs/lessons.json`, `?? .specs/features/work-gallery-carousel/validation.md`; porcelain after `git worktree remove --force` matches.

| Mutation | File:line | Description | Killed? |
| -------- | --------- | ----------- | ------- |
| 1 | `src/components/work/CaseGallery.tsx:55-57` | Removed singleton early return so one-image sets still render chrome | ✅ Killed — `e2e/carousel.spec.ts:24` expected `.case-carousel` count `0`, received `1` |
| 2 | `src/components/work/CaseGallery.tsx:60` | Wrap `go()` replaced with clamp (`Math.min`/`Math.max`) | ✅ Killed — `e2e/carousel.spec.ts:70` and `:80` failed |

**Sensor depth**: lightweight  
**Result**: 2/2 killed - PASS

---

## Interactive UAT Results (if performed)

Not performed. Automated Verifier only.

---

## Code Quality

| Principle | Status |
| ---------------- | ------ |
| Minimum code | ✅ |
| Surgical changes | ✅ |
| No scope creep | ✅ |
| Matches patterns | ✅ |
| Spec-anchored outcome check (asserted values match spec) | ✅ |
| Per-layer Coverage Expectation met (domain 1:1 ACs; routes happy+edge+error) | ✅ |
| Every test maps to a spec requirement - no unclaimed tests | ✅ |
| Documented guidelines followed: none - strong defaults applied (`tasks.md` Test Coverage Matrix) | ✅ |

The `#carousel-static` hash is a test-only slice in `CaseStudyPage`. It exists because no published Visual Story is a singleton. It is a harness, not a product feature.

---

## Edge Cases

- [x] IF a gallery has one image THEN omit carousel chrome — `e2e/carousel.spec.ts:23-27`
- [x] Last image + next shows the first image — `e2e/carousel.spec.ts:70-71`
- [x] First image + previous shows the last image — `e2e/carousel.spec.ts:80-81`
- [x] IF one image fails THEN other slides stay reachable — aborting every NET NOW WebP still leaves the carousel chrome and one visible broken image; remaining slides stay reachable via next. Not a new AC gap.
- [x] Two Xbox brand carousels keep independent indices — `e2e/carousel.spec.ts:102-104`

---

## Gate Check

- **Gate command**: `pnpm lint && pnpm build && pnpm test:e2e`
- **Result**: 119 passed, 0 failed, 0 skipped
- **Test count before feature**: 107
- **Test count after feature**: 119
- **Delta**: +12 new tests
- **Skipped tests**: none
- **Failures**: none
- **Lint**: oxlint warning only in unrelated `.cursor/skills/design-system/scripts/generate-tokens.cjs` (pre-existing)
- **Integrity**: no skips, `SPEC_DEVIATION`, or deleted pre-feature tests. One new `@CAR` test covers the prior CAR-02 gap.

---

## Fix Plans (if issues found)

None. Prior Fix 1 (CAR-02 singleton assertion) is closed: the new test cites spec outcomes and kills mutant 1.

---

## Requirement Traceability Update

Recommended spec.md statuses (not applied; Verifier writes only this report):

| Requirement | Previous Status | New Status |
| ----------- | --------------- | ---------- |
| CAR-01 | Verified | ✅ Verified |
| CAR-02 | Needs Fix | ✅ Verified |
| CAR-03 | Verified | ✅ Verified |
| CAR-04 | Verified | ✅ Verified |
| CAR-05 | Verified | ✅ Verified |
| CAR-06 | Verified | ✅ Verified |
| CAR-07 | Verified | ✅ Verified |
| CAR-08 | Verified | ✅ Verified |
| CAR-09 | Verified | ✅ Verified |
| CAR-10 | Verified | ✅ Verified |
| CAR-11 | Verified | ✅ Verified |
| CAR-12 | Verified | ✅ Verified |
| CAR-13 | Verified | ✅ Verified |

---

## Summary

**Overall**: ✅ Ready

**Spec-anchored check**: 13/13 ACs matched spec outcome  
**Sensor**: 2/2 mutations killed  
**Gate**: 119 passed

**What works**: Multi-image carousels show one image, wrap on next/previous, keep Xbox groups independent, preserve image attributes and failure copy, and respond to keyboard, swipe, reduced motion, and 390 px overflow. A one-image Visual Story now has a fixture and test that omit previous, next, and `n of m`.

**Issues found**: none in this re-verify.

**Next steps**: none. Leave this report uncommitted.
