---
name: Clark Huang Portfolio
description: Night Bloom portfolio for a freelance design-to-code practice
colors:
  page: "#060605"
  card-surface: "#0b0b0b"
  frame-border: "#222"
  text-primary: "#fafafa"
  text-primary-soft: "rgba(250,250,250,0.85)"
  text-body: "rgba(228,228,230,0.78)"
  text-secondary: "rgba(228,228,230,0.55)"
  text-muted: "rgba(228,228,230,0.40)"
  navigation-over-photo: "rgba(235,235,236,0.75)"
  hairline: "rgba(255,255,255,0.14)"
  cta-surface-a: "rgba(6,6,5,0.25)"
  cta-surface-b: "rgba(6,6,5,0.35)"
  cta-hover: "rgba(255,255,255,0.06)"
typography:
  display:
    fontFamily: "Jost, sans-serif"
    fontSize: "84px"
    fontWeight: 200
    lineHeight: 1.15
    letterSpacing: "20px"
  headline:
    fontFamily: "Jost, sans-serif"
    fontSize: "42px"
    fontWeight: 200
    lineHeight: 1.2
    letterSpacing: "2px"
  title:
    fontFamily: "Jost, sans-serif"
    fontSize: "26px"
    fontWeight: 200
    lineHeight: 1.3
    letterSpacing: "0.5px"
  body:
    fontFamily: "Jost, sans-serif"
    fontSize: "17px"
    fontWeight: 200
    lineHeight: 2.05
    letterSpacing: "0.4px"
  label:
    fontFamily: "Jost, sans-serif"
    fontSize: "11px"
    fontWeight: 300
    letterSpacing: "5px"
  glyph:
    fontFamily: "Cormorant Garamond, serif"
    fontSize: "560px"
    fontWeight: 600
    lineHeight: 0.95
rounded:
  square: "0"
  pill: "999px"
spacing:
  xs: "20px"
  sm: "34px"
  md: "56px"
  lg: "88px"
  xl: "140px"
  2xl: "200px"
components:
  cta-primary:
    backgroundColor: "{colors.cta-surface-a}"
    textColor: "{colors.text-primary-soft}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "16px 46px"
  cta-closing:
    backgroundColor: "{colors.cta-surface-b}"
    textColor: "{colors.text-primary-soft}"
    rounded: "{rounded.pill}"
    padding: "15px 44px"
  cta-hover:
    backgroundColor: "{colors.cta-hover}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
  project-card:
    backgroundColor: "{colors.card-surface}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.square}"
    height: "520px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.square}"
    padding: "6px 9px"
---

# Design System: Clark Huang Portfolio

## Overview

**Creative North Star: "Night Bloom"**

The portfolio behaves like a nocturnal garden observed through an editorial frame. Near-black surfaces, pale type, photographic bloom, masks, and unusually wide letterspacing create atmosphere without adding ornamental interface chrome. The interface stays restrained so the authored projects and the design-to-code practice remain credible rather than theatrical.

The system is sparse and exact. Full-screen passages establish rhythm; hairlines, large insets, and long vertical intervals make each decision feel deliberate. The opening uses the flower as environmental atmosphere, while the closing compresses the same material into a monumental letter C, completing the visual loop.

**Key Characteristics:**

- Near-black canvas with cool near-white typography.
- Jost carries almost all interface and editorial copy through weight and letterspacing rather than multiple font families.
- Cormorant Garamond is reserved for the monumental closing glyph.
- Rectilinear cards, chips, frames, and controls; only primary CTAs are pill-shaped.
- Depth comes from real imagery, masking, vignette, opacity, and text shadow, never generic floating-card shadows.
- Motion is rare and structural: CTA state, project-card expansion, gallery paging, and the design/engineering collision band.

## Colors

The palette is a compressed night scale: a nearly black ground, cool porcelain text, and translucent silver roles. Color enters through photographic project evidence and the bloom asset rather than interface accents.

### Primary

- **Night Garden:** The normative page ground and the visual silence around every section.
- **Porcelain White:** Highest-emphasis headings, active states, and focus-visible communication.

### Neutral

- **Cool Mist:** Long-form body copy and primary descriptive information.
- **Dim Silver:** Secondary labels, technology chips, pagination, and quiet navigation roles.
- **Ash Frame:** Rectilinear borders that organize without creating cards-on-cards.
- **Silver Hairline:** Dividers and scroll indicators; never a substitute for readable text contrast.

**The Photographic Color Rule.** Interface color remains neutral; project covers and the Night Bloom asset carry chroma.

**The Quiet Is Not Invisible Rule.** Muted text may recede, but functional labels, links, and controls must still meet their accessibility role.

## Typography

**Display Font:** Jost (sans-serif fallback)
**Body Font:** Jost (sans-serif fallback)
**Glyph Font:** Cormorant Garamond (serif fallback)

**Character:** Jost is used at very light weights with extreme tracking, producing a precise editorial voice without becoming luxury-brand pastiche. Hierarchy comes from scale, spacing, case, and placement more than weight. Cormorant Garamond appears only as the image-filled closing glyph.

### Hierarchy

- **Display** (200, 84px, 1.15): Hero identity and other singular statements; responsive sizes preserve the wide-tracked character.
- **Headline** (200, 42px, 1.2): Section statements with restrained editorial tracking and substantial surrounding space.
- **Title** (200, 26px, 1.3): Project names and local section titles.
- **Body** (200, 17px, 2.05): Editorial copy, normally held to approximately 660px line width.
- **Label** (300, 11px, 5px tracking, uppercase): Eyebrows, navigation, paging, and structural metadata.

**The Weight Restraint Rule.** Use scale, spacing, and contrast for hierarchy; reserve heavier weight for small emphasis inside body copy.

**The Tracking Ladder Rule.** Tracking decreases with type size: monumental display, section headline, project title, navigation, then body copy.

## Layout

The desktop artboard is capped at 1280px. Navigation uses an 80px horizontal inset; content uses 88px, preserving a deliberate 8px offset between structure and editorial content. Full-screen passages have an 800px minimum height, and long-form bands follow the existing 20/34/56/88/140/200px spatial rhythm.

At 1180px, insets reduce to 48px and 56px while preserving the offset. At 820px, they reduce to 28px and 32px, display scales compress, and the project accordion becomes a six-item vertical stack with information always visible. At 520px, dense metadata grids become single-column.

The homepage alternates immersive full-screen atmosphere with bounded editorial bands. Project evidence should remain the dominant Experience-mode content; supporting biography and capability vocabulary must not outrank it.

## Elevation & Depth

The system has no box-shadow vocabulary. Depth comes from the Night Bloom photograph, mask gradients, vignette falloff, selective image dimming, opacity, and text shadows only when type sits on photography. Pure-color sections remain flat.

**The No Floating Cards Rule.** Do not introduce generic drop shadows, glass panels, or elevated rounded containers.

**The Photograph-Only Shadow Rule.** Text shadow exists to protect legibility over an image, not to decorate type on a solid surface.

## Shapes

The default form language is square and architectural. Project cards, chips, pagination controls, dividers, and content frames use straight edges and one-pixel borders. The single deliberate exception is the 999px CTA pill, whose softness stands apart from the surrounding rectilinear system.

Clipping and masks are signature forms: the opening bloom fades into the black canvas, while the closing flower is clipped inside the oversized C glyph.

**The One Curve Rule.** Pills belong to primary CTAs only; do not spread rounded rectangles across cards, tags, or content containers.

## Components

### Buttons

- **Shape:** A restrained pill with a one-pixel translucent porcelain border.
- **Primary:** Transparent night surface, pale text, 16px × 46px internal padding, and an inline arrow.
- **Closing:** Slightly denser 15px × 44px version over the closing glyph composition.
- **Hover / Focus:** Border and text move to full porcelain; the surface gains only a faint white wash. Preserve an obvious focus-visible treatment.

### Chips

- **Style:** Square, transparent, one-pixel light border, 12px uppercase text with 1.2px tracking.
- **Role:** Compact technology and project metadata, never a decorative tag cloud.

### Cards / Containers

- **Corner Style:** Square.
- **Background:** Near-black fallback under a real project cover.
- **Shadow Strategy:** None.
- **Border:** One-pixel translucent light frame.
- **Behavior:** Desktop cards share one accordion row and change width as a structural interaction. Essential project identity must remain discoverable without relying only on hover.

### Navigation

- **Style:** Uppercase Jost labels with wide tracking and generous spacing.
- **Over photography:** Cool near-white with a small protective text shadow.
- **Hover / Focus:** Full white. Navigation remains visually quiet but must provide adequate hit areas and focus indication.

### Project Pagination

- **Style:** Square 46px controls, thin frame, compact arrow glyph, and a two-digit current-page indicator.
- **Behavior:** Disabled states visibly recede. Inactive project pages must be removed from the keyboard and accessibility flow.

### Collision Band

- **Style:** Two counter-moving lines of outlined capability words, one for Design and one for Engineering.
- **Behavior:** The motion is semantic, not ambient decoration. Respect reduced motion, provide a non-pointer pause mechanism, and hide duplicated loop copies from assistive technology.

## Do's and Don'ts

### Do:

- **Do** preserve Night Bloom as one visual system across the opening atmosphere and closing glyph.
- **Do** use real project imagery and factual maturity labels as the main source of credibility.
- **Do** maintain the 8px navigation/content inset offset and the established wide spatial rhythm.
- **Do** keep project, navigation, and contact interactions keyboard-visible and touch-usable.
- **Do** use animation only when it communicates gallery structure, state, or the design/engineering thesis.

### Don't:

- **Don't** introduce generic glassmorphism, gradients, floating rounded cards, or box shadows.
- **Don't** hide essential project identity solely behind hover.
- **Don't** use muted text opacity where the content is required to understand or operate the page.
- **Don't** fabricate project outcomes, client claims, testimonials, or delivery status for visual impact.
- **Don't** let biography, technical vocabulary, or atmosphere become more prominent than the work itself.
