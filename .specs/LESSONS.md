# LESSONS - auto-maintained by scripts/lessons.py

> Machine-owned. Do NOT hand-edit. Changes are overwritten on the next `lessons.py` write.
> Canonical state lives in `.specs/lessons.json`. Edit lessons only via the script.
> promote_threshold=2 distinct features · window_days=45 · quarantine_threshold=2

## Confirmed (load these at Specify/Design)

Corroborated across multiple features. Safe to apply as guidance.

_none_

## Candidates (under observation - do NOT load as guidance yet)

Seen once or not yet corroborated. Tracked, not trusted.

### L-001 - Enumerate every supported locale when asserting universal responsive behavior
- signal: `ac_gap` · recurrence: 1 feature(s) · scope: `e2e-responsive` · harmful: 0
- features: portfolio-v1
- evidence: PORT-41 (e2e-responsive)
- last seen: 2026-08-19T03:21:24Z

### L-002 - Enumerate every visible token pair when asserting universal contrast requirements
- signal: `ac_gap` · recurrence: 1 feature(s) · scope: `e2e-accessibility` · harmful: 0
- features: portfolio-v1
- evidence: PORT-46 (e2e-accessibility)
- last seen: 2026-08-19T03:21:24Z

### L-003 - Define an observable comprehension oracle for time-bounded portfolio messaging requirements
- signal: `spec_precision_gap` · recurrence: 1 feature(s) · scope: `spec-content` · harmful: 0
- features: portfolio-v1
- evidence: PORT-02 (spec-content)
- last seen: 2026-08-19T03:21:24Z

### L-004 - Map every WHEN/THEN to a file:line assertion; an implementation-only branch is not coverage.
- signal: `ac_gap` · recurrence: 1 feature(s) · scope: `e2e` · harmful: 0
- features: work-gallery-carousel
- evidence: CAR-02 (e2e)
- last seen: 2026-08-19T03:51:34Z

### L-005 - If an AC depends on a product fixture that is not published, add a harness or component fixture instead of leaving the criterion untested.
- signal: `spec_precision_gap` · recurrence: 1 feature(s) · scope: `e2e` · harmful: 0
- features: work-gallery-carousel
- evidence: CAR-02 (e2e)
- last seen: 2026-08-19T03:51:34Z

### L-006 - A singleton early-return that omits chrome must have a test that fails when that return is deleted.
- signal: `surviving_mutant` · recurrence: 1 feature(s) · scope: `src/components/work` · harmful: 0
- features: work-gallery-carousel
- evidence: mutant-3 CaseGallery.tsx:55-57 (src/components/work)
- last seen: 2026-08-19T03:51:34Z

## Quarantined (failed when applied - ignore)

A confirmed lesson that recurred alongside failure. Kept for the maintainer to review.

_none_
