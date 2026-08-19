# Leonardo Vitale Portfolio Design System

**Status:** Approved reference baseline  
**Source:** `/Users/vitale/Downloads/DESIGN-clickhouse.md`  
**Adaptation:** ClickHouse-inspired visual grammar applied to an editorial engineering portfolio

Page-specific files under `pages/` override this master only where they state an explicit difference.

## Design Intent

Build a curated digital exhibition on a near-black canvas. Electric yellow is the only brand accent. White type establishes hierarchy; gray type supports long-form reading. Historical product screenshots replace ClickHouse's SQL and product mockups as the main visual evidence.

The result must feel precise, technical, editorial, and confident. It must not look like a ClickHouse clone, a generic developer template, or an AI startup landing page.

## Design Dials

- Variance: 7/10. Use asymmetry and an editorial grid without sacrificing scanning.
- Motion: 3/10. Use restrained orientation cues only.
- Density: 4/10. Keep 96 px section rhythm on desktop and 64 px on mobile.

## Color Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--color-primary` | `#faff69` | Primary CTA, active indicator, selected metadata, supported stat numbers |
| `--color-primary-active` | `#e6eb52` | Pressed and hover state |
| `--color-primary-disabled` | `#3a3a1f` | Disabled primary surface |
| `--color-canvas` | `#0a0a0a` | Page background |
| `--color-surface-soft` | `#121212` | Alternating section band |
| `--color-surface-card` | `#1a1a1a` | Cards and image frames |
| `--color-surface-elevated` | `#242424` | Nested metadata surface |
| `--color-ink` | `#ffffff` | Headings and primary text |
| `--color-body` | `#cccccc` | Body text |
| `--color-body-strong` | `#e6e6e6` | Lead text |
| `--color-muted` | `#888888` | Captions and secondary metadata |
| `--color-hairline` | `#2a2a2a` | Structural borders |
| `--color-hairline-strong` | `#3a3a3a` | Active structural borders |
| `--color-on-primary` | `#0a0a0a` | Text and icons on yellow |
| `--color-success` | `#22c55e` | Semantic success only |
| `--color-warning` | `#f59e0b` | Semantic warning only |
| `--color-error` | `#ef4444` | Semantic error only |

Yellow is scarce at the element level. Do not use it for body copy, decorative borders, or every card. Semantic colors require text or icon reinforcement.

## Typography

Use Inter for display, body, navigation, labels, and buttons. Use the system sans-serif stack while Inter loads. Do not introduce a display serif.

| Role | Desktop | Mobile | Weight | Line height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Display XL | 72 px | 40 px | 700 | 1.05 | -2.5 px desktop, -1.5 px mobile |
| Display L | 56 px | 36 px | 700 | 1.1 | -2 px |
| Display M | 40 px | 30 px | 700 | 1.15 | -1.5 px |
| Display S | 32 px | 26 px | 700 | 1.2 | -1 px |
| Title L | 24 px | 22 px | 700 | 1.3 | -0.3 px |
| Title M | 18 px | 18 px | 600 | 1.4 | 0 |
| Body | 16 px | 16 px | 400 | 1.55 | 0 |
| Body small | 14 px | 14 px | 400 | 1.55 | 0 |
| Caption | 13 px | 13 px | 500 | 1.4 | 0 |
| Uppercase label | 12 px | 12 px | 600 | 1.4 | 1.5 px |
| Stat | 56 px | 40 px | 700 | 1 | -1.5 px |

Body lines use a maximum width of 65–75 characters. Stat figures use tabular numerals and yellow only when the metric is approved.

## Spacing and Grid

- Base unit: 4 px.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96 px.
- Maximum content width: 1280 px.
- Desktop grid: 12 columns.
- Hero: 7-column narrative and 5-column historical visual.
- Major section gap: 96 px desktop, 64 px mobile.
- Standard card padding: 32 px desktop, 24 px mobile.
- Content text column: maximum 720 px.

### Responsive Breakpoints

| Breakpoint | Behavior |
| --- | --- |
| `< 768 px` | Single-column hero and cards, 40 px hero title, mobile navigation, 24 px page gutters |
| `768–1023 px` | Two-column card grids where useful, reduced display scale |
| `1024–1440 px` | Full navigation, 12-column editorial grid |
| `> 1440 px` | Same grid centered within 1280 px maximum width |

Never shrink the selected-work mosaic into unreadable tiles. Stack the cards on mobile. Do not allow horizontal page scrolling.

## Page Composition

### Global Navigation

- 64 px tall, near-black, and structurally separated by a hairline.
- Name/wordmark on the left.
- Work, Timeline, About, Resume, Contact, and language control remain visible at desktop.
- Mobile uses one labeled menu control with a 44 × 44 px minimum target.
- Active route uses weight and a short yellow indicator, not yellow body text alone.

### Home

1. Hero: 7/5 grid with positioning and CTAs on the left; NET NOW historical imagery on the right.
2. Career signal strip: flat stat callouts on canvas, approved numbers in yellow.
3. Selected work: asymmetric 12-column mosaic; NET NOW is dominant.
4. Timeline: alternating near-black and soft-surface rhythm with yellow dates/markers.
5. Current chapter: dark architecture/leadership card, no fabricated product UI.
6. About preview: concise copy followed by one full yellow CTA band.

### Work Index

- Open editorial layout, not a uniform dashboard grid.
- Priority cases receive large screenshot-led cards.
- Xelix uses a typographic dark card.
- Metadata remains visible without hover; hover adds emphasis only.

### Case Study

- Large project title, period, role, tags, and thesis on black.
- Sticky metadata at desktop only when it does not obscure content.
- One short 50–90-word context block.
- Screenshots use generous widths, original ratios, subtle dark frames, and no fake devices.
- Alternate full-width image bands with restrained two-column details.
- Impact uses large typography rather than decorative charts.
- End with a yellow next-chapter CTA band.

### About and Resume

- Editorial two-column introduction: profile and contact beside career signal.
- Experience is a vertical chronology, not a dense card wall.
- Expertise uses compact dark badges.
- The resume download is the single primary yellow CTA.

## Components

### Primary Button

- Yellow background, black text.
- Inter 14 px/600.
- 40 px visual height and at least 44 px touch target.
- 8 px radius.
- Hover/active use `--color-primary-active`; no shadow.

### Secondary Button

- `--color-surface-card` background, white text, 1 px hairline border.
- Same dimensions as primary.
- Hover strengthens the border; no lift or shadow.

### Cards

- Dark cards use `--color-surface-card`, 12 px radius, and a 1 px hairline.
- Featured yellow cards use black text and no shadow.
- Historical screenshot cards prioritize the image over decorative chrome.
- Do not repeat identical card treatment across every section.

### Stat Callout

- Flat on canvas, no container.
- Approved number in yellow at stat scale.
- Localized label in body or caption style.

### Tags

- Dark pill only for concise technology/discipline labels.
- Yellow badges are reserved for exceptional state labels.

### Image Frame

- No fake browser or device mockup.
- Use `aspect-ratio` or intrinsic dimensions to reserve space.
- Below-fold images use lazy loading and optimized derivatives.
- Broken images retain localized alt text and readable case content.

## Elevation and Shape

- No box shadows.
- Depth comes from canvas, dark surfaces, hairlines, image contrast, and yellow bands.
- Buttons use 8 px radius.
- Content cards use 12 px radius.
- Pills are limited to badges.
- No gradients, glassmorphism, blur decoration, or soft floating cards.

## Interaction and Motion

- Motion duration: 150–300 ms.
- Animate only opacity and transform.
- Image hover zoom is limited to 1–2% and cannot shift layout.
- Scroll reveals use 8–12 px vertical movement and remain visible without JavaScript.
- Never block interaction during animation.
- `prefers-reduced-motion: reduce` removes reveal and transform effects.
- Primary actions work by click/tap and keyboard; hover is never required.

## Accessibility Contract

- Normal text contrast: at least 4.5:1.
- Large text and focus indicators: at least 3:1.
- Interactive targets: at least 44 × 44 px with 8 px separation.
- Visible 2–4 px focus treatment.
- Sequential heading hierarchy.
- Skip link to main content.
- Route changes move focus to the main heading.
- Informative images use localized alt text.
- Navigation and gallery order match DOM order.
- Text remains usable at 200% zoom without clipping or horizontal page scroll.

## Anti-Patterns

- No terminal UI, code rain, SQL mockups, or generic developer clichés.
- No blue accent from the automatic recommendation. Yellow is the single brand accent.
- No light mode in the MVP.
- No gradients, drop shadows, emoji icons, or decorative glass effects.
- No uniform wall of identical cards.
- No image interaction that depends on hover.
- No unsupported metrics or fabricated product screenshots.
- No copying ClickHouse product-specific pricing, database, or code-window components.

## Pre-Delivery Checklist

- [ ] Black/yellow visual contract is consistent across all pages.
- [ ] Yellow is reserved for primary actions, approved stats, active indicators, and deliberate CTA bands.
- [ ] Historical screenshots remain the primary evidence.
- [ ] Inter typography and negative display tracking follow the scale.
- [ ] No shadows, gradients, emojis, or generic developer motifs appear.
- [ ] All targets meet 44 × 44 px.
- [ ] Keyboard focus is visible and route focus is managed.
- [ ] Contrast meets WCAG 2.2 AA.
- [ ] Reduced motion is respected.
- [ ] Pages pass at 390, 768, 1024, and 1440 px.
- [ ] Portuguese labels wrap without clipping.
- [ ] No horizontal page scrolling occurs.
