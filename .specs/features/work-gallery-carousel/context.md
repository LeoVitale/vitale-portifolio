# Work Gallery Carousel Context

**Gathered:** 2026-08-19  
**Spec:** `.specs/features/work-gallery-carousel/spec.md`  
**Status:** Ready for design

---

## Feature Boundary

Replace the stacked Visual Story gallery on priority case pages (`/{locale}/work/{slug}`) with a carousel whenever that gallery, or a brand group inside it, has more than one image. The work index, Xelix leadership card, Home mosaic, and lightbox/fullscreen viewing stay out of scope.

---

## Implementation Decisions

### Navigation (discussed, Quick defaults accepted)

- Previous and next controls plus a localized position indicator (`n of m`).
- No thumbnail strip.
- Keyboard Left and Right change the current slide when the carousel has focus.
- Controls are reachable in DOM order and have localized accessible names.

### Motion (discussed, Quick defaults accepted)

- No autoplay.
- Touch swipe changes the current slide.
- Slide changes wrap from last to first and from first to last.
- `prefers-reduced-motion: reduce` removes slide transforms; the current image still updates immediately.

### Agent's Discretion

- Exact control chrome (icon vs text, indicator as text or dots) within the ClickHouse black/yellow contract.
- Whether non-current slides stay in the DOM while hidden, as long as every approved asset remains reachable in the documented order.

### Declined / Undiscussed Gray Areas → Assumptions

- **Xbox brand groups:** one carousel per brand group, headings unchanged.
- **Viewport:** one image visible at a time; no peek of adjacent slides.
- **Index persistence:** carousel index is ephemeral and resets when the visitor leaves the case.

---

## Specific References

- Existing `CaseGallery` on `CaseStudyPage` is the only gallery to change.
- PORT-19, PORT-20, PORT-21, PORT-43, PORT-45, and PORT-47 remain in force.
- `design-system/leonardo-vitale-portfolio/MASTER.md` Interaction, Accessibility, and Anti-Patterns sections constrain motion, focus, and chrome.

---

## Deferred Ideas

- Lightbox / fullscreen image viewer.
- Carousel on the Work index or Xelix leadership card.
- Thumbnail-strip navigation.
