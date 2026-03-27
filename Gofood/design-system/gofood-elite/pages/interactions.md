# Interactions Page Overrides

> **PROJECT:** GoFood Elite
> **Generated:** 2026-03-26 23:22:01
> **Page Type:** General

> ⚠️ **IMPORTANT:** Rules in this file **override** the Master file (`design-system/MASTER.md`).
> Only deviations from the Master are documented here. For all other rules, refer to the Master.

---

## Page-Specific Rules

### Layout Overrides

- **Max Width:** 1200px (standard)
- **Layout:** Full-width sections, centered content
- **Sections:** 1. Intro (Vertical), 2. The Journey (Horizontal Track), 3. Detail Reveal, 4. Vertical Footer

### Spacing Overrides

- No overrides — use Master spacing

### Typography Overrides

- No overrides — use Master typography

### Color Overrides

- **Strategy:** Continuous palette transition. Chapter colors. Progress bar #000000.

### Component Overrides

- Avoid: Ignore accessibility motion settings
- Avoid: Animate everything that moves
- Avoid: Use linear for UI transitions

---

## Page-Specific Components

- No unique components for this page

---

## Recommendations

- Effects: Small hover (50-100ms), loading spinners, success/error state anim, gesture-triggered (swipe/pinch), haptic
- Animation: Check prefers-reduced-motion media query
- Animation: Animate 1-2 key elements per view maximum
- Animation: Use ease-out for entering ease-in for exiting
- CTA Placement: Floating Sticky CTA or End of Horizontal Track
