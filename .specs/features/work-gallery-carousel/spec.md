# Work Gallery Carousel Specification

## Problem Statement

Priority case pages currently stack every historical screenshot in Visual Story. NET NOW, SKY Online, Microsoft/GPA, and Xbox One therefore become long image sequences, with Xbox One reaching 24 frames. Visitors need a compact way to inspect those screens without losing order, grouping, alternative text, or keyboard access.

## Goals

- [ ] A visitor on a multi-image case page sees one current screenshot at a time and can reach every other approved image in the documented order.
- [ ] Keyboard, tap, and swipe produce the same slide sequence. Reduced motion still updates the current image without nonessential animation.

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
| --- | --- |
| Work index (`/{locale}/work`) card visuals | Cards already show a single featured asset. |
| Xelix leadership chapter | Xelix has no case route (AD-003). |
| Home mosaic and Current Chapter | Those surfaces are not case Visual Story galleries. |
| Lightbox, zoom, or fullscreen viewer | Separate interaction; not requested. |
| Thumbnail-strip navigation | Declined in favor of previous/next plus position indicator. |
| Autoplay | Declined; the visitor controls pace. |
| Archive case pages | Still unpublished (portfolio-v1 P2). |

---

## Assumptions & Open Questions

Every ambiguity is resolved or recorded here - nothing is left silently unclear.

| Assumption / decision | Chosen default | Rationale | Confirmed? |
| --- | --- | --- | --- |
| Navigation chrome | Previous/next controls plus localized `n of m` position text | Matches the ClickHouse flat editorial look and keeps PORT-43 gallery controls real. | y |
| Thumbnail strip | None | Extra chrome fights the visual contract and becomes noisy on 24 Xbox frames. | y |
| Autoplay | Off | Editorial inspection should be visitor-paced; autoplay conflicts with reduced motion. | y |
| Touch | Horizontal swipe changes the current slide | Case pages must work at 390 px without depending on hover. | y |
| Wrap | Last next → first; first previous → last | The set is closed and finite; wrapping avoids a dead-end control. | y |
| Reduced motion | Instant slide change; no transform/opacity animation | PORT-45 and MASTER.md require removing nonessential transforms. | y |
| Xbox brand groups | One carousel per brand group; group headings stay | Preserves the approved GloboSat / SKY / Telecine / Vivo narrative. | n |
| Visible slides | Exactly one image visible per carousel | Classic carousel; adjacent peek was undiscussed. | n |
| Index persistence | Ephemeral; resets on leaving the case | No product need to restore a slide across visits. | n |
| Single-image gallery | Render a static figure with no carousel chrome | Controls are meaningless for one image. | n |
| Remaining implicit dimensions | N/A because this feature has no forms, remote writes, auth, or stored visitor data beyond ephemeral UI index | Failure of an image still follows PORT-21. | n |

**Open questions:** none - all resolved or logged above.

---

## User Stories

### P1: Inspect a multi-image case gallery ⭐ MVP

**User Story**: As a hiring manager on a priority case page, I want to move through the Visual Story screenshots one at a time so that I can inspect the work without scrolling a long stack.

**Why P1**: This is the requested product change. The stacked gallery is what currently fails on multi-image cases.

**Acceptance Criteria**:

1. **CAR-01** — WHEN a Visual Story gallery or brand group contains two or more images THEN the system SHALL present that set as a carousel with exactly one image visible.
2. **CAR-02** — WHEN a Visual Story gallery or brand group contains exactly one image THEN the system SHALL render that image as a static figure without previous, next, or position controls.
3. **CAR-03** — WHILE a carousel is rendered the system SHALL keep previous and next controls and a localized position indicator in the form `n of m` visible and operable.
4. **CAR-04** — WHEN a visitor activates next THEN the system SHALL show the following image in the approved gallery order, wrapping from the last image to the first.
5. **CAR-05** — WHEN a visitor activates previous THEN the system SHALL show the preceding image in the approved gallery order, wrapping from the first image to the last.
6. **CAR-06** — WHILE Xbox One brand groups are rendered the system SHALL provide one independent carousel per group and SHALL keep each group heading.
7. **CAR-07** — WHILE a carousel is rendered the system SHALL preserve each image's source aspect ratio, intrinsic width and height attributes, lazy loading for images below the first viewport, and localized alternative text.
8. **CAR-08** — IF a carousel image fails to load THEN the system SHALL keep meaningful alternative text and the localized unavailable-image status, and SHALL keep the case narrative readable.

**Independent Test**: Open NET NOW, SKY Online, Microsoft/GPA, and Xbox One in both locales. Confirm one visible image, walk the full set with next, confirm wrap, and confirm Xbox still has four headed groups.

---

### P1: Control the carousel without a pointer ⭐ MVP

**User Story**: As a visitor using keyboard, touch, or reduced motion, I want equivalent access to every gallery image so that Visual Story stays usable beyond mouse hover.

**Why P1**: PORT-43 and PORT-45 already require gallery controls and reduced motion. A carousel that only works on click would regress them.

**Acceptance Criteria**:

1. **CAR-09** — WHEN a carousel has keyboard focus THEN the system SHALL move to the previous image on ArrowLeft and to the next image on ArrowRight, using the same wrap rules as the buttons.
2. **CAR-10** — WHEN a visitor swipes horizontally on a carousel THEN the system SHALL change the current image in the swipe direction using the same wrap rules as the buttons.
3. **CAR-11** — WHEN `prefers-reduced-motion: reduce` is active THEN the system SHALL update the visible image without transform or opacity animation.
4. **CAR-12** — WHILE carousel controls are rendered the system SHALL expose localized accessible names, keep the controls reachable in DOM order, and SHALL show a 2–4 px focus indicator with at least 3:1 contrast.
5. **CAR-13** — WHEN the viewport width is 390 px THEN the system SHALL keep the carousel and its controls readable without horizontal page scrolling.

**Independent Test**: Tab to a NET NOW carousel, change slides with arrows, swipe at 390 px, and repeat with `prefers-reduced-motion: reduce`.

---

## Edge Cases

- IF a gallery has one image THEN the system SHALL omit carousel chrome.
- WHEN the visitor reaches the last image and activates next THEN the system SHALL show the first image in that carousel.
- WHEN the visitor is on the first image and activates previous THEN the system SHALL show the last image in that carousel.
- IF one image in a carousel fails to load THEN the system SHALL keep the other slides reachable and SHALL not fabricate a replacement screenshot.
- WHILE two Xbox brand carousels are on the same page the system SHALL keep their indices independent.

---

## Requirement Traceability

Each requirement gets a unique ID for tracking across design, tasks, and validation.

| Requirement ID | Story | Phase | Status |
| --- | --- | --- | --- |
| CAR-01 | P1: Inspect gallery | Execute | Verified |
| CAR-02 | P1: Inspect gallery | Execute | Implementing |
| CAR-03 | P1: Inspect gallery | Execute | Verified |
| CAR-04 | P1: Inspect gallery | Execute | Verified |
| CAR-05 | P1: Inspect gallery | Execute | Verified |
| CAR-06 | P1: Inspect gallery | Execute | Verified |
| CAR-07 | P1: Inspect gallery | Execute | Verified |
| CAR-08 | P1: Inspect gallery | Execute | Verified |
| CAR-09 | P1: Control without pointer | Execute | Verified |
| CAR-10 | P1: Control without pointer | Execute | Verified |
| CAR-11 | P1: Control without pointer | Execute | Verified |
| CAR-12 | P1: Control without pointer | Execute | Verified |
| CAR-13 | P1: Control without pointer | Execute | Verified |

**ID format:** `CAR-NN`

**Status values:** Pending → In Design → In Tasks → Implementing → Verified

**Coverage:** 13 total, 0 mapped to tasks, 13 unmapped

---

## Success Criteria

How we know the feature is successful:

- [ ] Every priority case with two or more Visual Story images uses a carousel instead of a stacked sequence.
- [ ] Every approved screenshot remains reachable in the documented order, including all 24 Xbox One frames across four groups.
- [ ] Keyboard, swipe, wrap, reduced motion, and 390 px overflow gates pass without weakening PORT-19, PORT-20, PORT-21, PORT-43, PORT-45, or PORT-47.
