---
name: ui-ux-pro-max
description: >
  UI Visualizer — Execution-only UI database for web and mobile. Provides style
  database, layout patterns, component specs, animation rules, and implementation
  checklists. Use when building or reviewing UI components, pages, or apps.
  Actions: build, create, implement, review, fix, refactor UI code or components.
  Projects: website, landing page, dashboard, admin, e-commerce, SaaS, mobile app.
  Elements: button, modal, navbar, sidebar, card, table, form, chart.
  Trigger on: "component banao", "UI build karo", "layout fix karo", "responsive karo",
  "animation add karo", "dark mode", "glassmorphism", "bento grid",
  "accessibility check karo", "chart banana hai", "code review karo".
  NOTE: UX Laws and psychology decisions come from ux-thinking skill (Tier 1 authority).
  This skill handles execution — not strategy.
---

# UI Visualizer — Execution Database

> HIERARCHY: Tier 1 = UX Brain (ux-thinking) | Tier 2 = design-taste-frontend | Tier 3 = THIS SKILL
> This skill executes what UX Brain decides. Never override ux-thinking law decisions.
> For UX laws, psychology, Hook Model — read ux-thinking first.

---

## SCOPE — What This Skill Does

```
THIS SKILL DOES:
- Style selection (50+ styles)
- Font pairing lookup
- Layout patterns (responsive, bento, grid)
- Component specs (button, card, form, nav, chart)
- Animation timing rules
- Accessibility implementation checklist
- Performance checklist
- Pre-delivery QA checklist

THIS SKILL DOES NOT:
- UX law decisions → ux-thinking handles this
- Psychology / behavioral design → ux-thinking handles this
- Hook Model / Fogg Model → ux-thinking handles this
- Color palette as design law → color is approved by ux-thinking Layer 8 first
- Font as absolute rule → defer to design-taste-frontend for code context
```

---

## RULE: Colors & Fonts

```
COLOR AUTHORITY ORDER:
1. WCAG contrast requirement (Layer 8 ux-thinking) — always wins
2. design-taste-frontend bans (no purple/AI colors in code context)
3. This skill's palette database — use within constraints 1 + 2

FONT AUTHORITY ORDER:
1. design-taste-frontend (Geist/Satoshi mandate) — for code/dev output
2. figma-design aesthetic-system.md — for Figma/visual design output
3. This skill's font database — suggestions, not rules
```

---

## STYLE DATABASE — 50+ Styles Quick Reference

```
MINIMALIST     → Clean whites, generous space, 1 accent, Inter/Geist
DARK PREMIUM   → #0A0A0A base, subtle glow borders, Geist Mono accents
GLASSMORPHISM  → backdrop-filter blur, 0.1 opacity borders, layered depth
BENTO GRID     → Unequal grid cells, mixed sizes, info-dense, dark bg
CLAYMORPHISM   → Soft 3D shadows, rounded, pastel fills, playful
BRUTALISM      → Raw borders, black/white, exposed grid, typewriter fonts
NEUMORPHISM    → Inset/outset shadows from bg color, no hard borders
FLAT 2.0       → Flat + subtle shadows, clean icons, Material-ish
EDITORIAL      → Strong typography hierarchy, serif display, magazine feel
WARM NEUTRAL   → Sand/cream/terracotta, no pure white, earthy accents
CORPORATE BLUE → Navy base, trust signals, professional, serif/sans mix
FINTECH DARK   → Dark trust, green accents, monospace data, scan-friendly
```

---

## LAYOUT PATTERNS

### Mobile (Default — India mobile-first)
```
- Max content width: 390px (iPhone base), test at 375px
- Bottom CTA: fixed, full-width, 56px height, 16px from edge
- Tab bar: 4-5 items, icon + label, 83px height iOS / 80dp Android
- Cards: 16px horizontal margin, 12px gap between cards
- Section spacing: 24px between sections, 16px within section
- Safe area: respect notch top, gesture bar bottom
```

### Web (Responsive)
```
- Breakpoints: 375 / 768 / 1024 / 1440
- Container: max-w-7xl (1280px), centered, 16px mobile padding
- Grid: CSS Grid preferred over flex-math
- Sidebar: 240-280px fixed, collapsible at 768px
- Hero: min-h-[100dvh] — never h-screen
- F-pattern placement: logo top-left, nav top, CTA top-right
```

### Dashboard
```
- Metric cards: grid 2-4 cols, same height, 8px gap
- Sidebar: left, 240px, collapsible
- Header: 64px fixed, contains search + notifications + avatar
- Content area: padding 24px, max-w-full
- Charts: 300-400px height, responsive width
```

---

## COMPONENT SPECS

### Buttons
```
Primary:   56px height mobile / 48px web | full-width mobile | min 120px web
Secondary: Same height | outlined | same touch target
Danger:    Red semantic color | confirm dialog required before action
States:    Default | Hover | Active | Loading (spinner inside) | Disabled | Success
```

### Cards
```
Padding:       16px (compact) / 24px (standard) / 32px (featured)
Border radius: 12px standard / 16px large / 8px small
Border:        0.5px subtle OR no border + shadow
Shadow:        box-shadow: 0 1px 3px rgba(0,0,0,0.1) — never heavy
```

### Forms
```
Input height:    48px mobile / 40px web
Label:           above input, never placeholder-only
Error:           below field, red + icon + text (never color alone)
Helper text:     below field, muted, 12px
Real-time validate: on blur (not on keypress)
Submit button:   shows loading → success/error state
```

### Navigation
```
Mobile:  Bottom tab, max 5 items, icon + label always
Web:     Top nav OR left sidebar — never both primary
Modal:   Close = top-right X + swipe-down + Escape key
Drawer:  Left side, overlay dark bg, swipe-right to close
```

### Charts
```
Type selection:
  Trend over time    → Line chart
  Comparison         → Bar chart
  Part of whole      → Donut (max 5 segments)
  Distribution       → Histogram
  Correlation        → Scatter

Rules:
  - Legend always visible, near chart
  - Tooltip on hover/tap with exact values
  - Empty state: message + guidance, not blank axes
  - Accessible colors: never red+green only
  - Screen reader: aria-label on chart describing key insight
```

---

## ANIMATION RULES

```
Micro-interactions:  150-200ms ease-out
Screen transitions:  300-400ms
Skeleton screens:    Shimmer, 1.5s loop, never static grey
Spring physics:      Preferred over cubic-bezier for natural feel
Properties to animate: transform + opacity ONLY
Never animate:       width / height / top / left (causes reflow)
Reduced motion:      Always define prefers-reduced-motion fallback
Max simultaneous:    3 animations on budget Android
Exit faster:         Exit = 60-70% of enter duration
```

---

## ACCESSIBILITY IMPLEMENTATION

```
Contrast (WCAG AA minimum):
  Normal text:  4.5:1
  Large text:   3:1
  UI elements:  3:1

Touch targets:
  iOS:     44x44pt minimum
  Android: 48x48dp minimum
  Expand hitbox with padding/hitSlop if visual is smaller

Never:
  - Color as only indicator (add icon + text)
  - Icon-only nav without label
  - Placeholder as label
  - Disable zoom (user-scalable=no)
  - Focus ring removed

Always:
  - aria-label on icon buttons
  - role="alert" on error messages
  - heading hierarchy h1→h6
  - Skip link on web
  - prefers-reduced-motion respected
```

---

## PERFORMANCE CHECKLIST

```
Images:    WebP/AVIF | lazy load | declare width+height to prevent CLS
Fonts:     font-display: swap | preload critical only
Animation: transform/opacity only | requestAnimationFrame for JS
Lists:     Virtualize at 50+ items
Bundle:    Route-level code splitting
Mobile:    Test on slow 3G + budget Android
```

---

## PRE-DELIVERY QA CHECKLIST (Run Before Every Delivery)

```
VISUAL:
□ Correct breakpoints tested (375 / 768 / 1024)?
□ Dark mode works without hardcoded colors?
□ No emojis as icons (use SVG/Phosphor/Lucide)?
□ Icon style consistent throughout?
□ No lorem ipsum anywhere?

INTERACTION:
□ All tap targets ≥44px?
□ Loading state on all async actions?
□ Error states built (not just happy path)?
□ Empty states designed?
□ Back/cancel always available?

ACCESSIBILITY:
□ Contrast 4.5:1 on all text?
□ Labels on all inputs?
□ Color + icon + text on errors (not color alone)?
□ Focus order logical?
□ prefers-reduced-motion handled?

PERFORMANCE:
□ Images lazy loaded below fold?
□ No layout shift on load?
□ Animations on transform/opacity only?

UX LAW COMPLIANCE (from ux-thinking):
□ Severity Critical issues addressed?
□ No anti-patterns from Layer 7?
□ Layer 8 (WCAG) fully passed?
```

---

## HOW TO USE THIS SKILL WITH OTHER SKILLS

```
TYPICAL WORKFLOW:
1. ux-thinking → Laws, conflict resolution, severity priorities
2. define-ideate → User flow, IA, feature list
3. figma-design → Figma execution, aesthetic personality, specs
4. THIS SKILL → Component database, animation rules, QA checklist
5. design-taste-frontend → Code quality, React/Tailwind patterns
6. awesome-design-md → Brand inspiration (read-only, not law)
```