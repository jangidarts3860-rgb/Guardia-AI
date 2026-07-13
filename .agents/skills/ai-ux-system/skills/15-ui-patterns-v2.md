---
name: ui-patterns-v2
description: UI Pattern Library — Visual styles, layout systems, component specs, animation rules, accessibility, performance. Use for: "component banao", "UI build karo", "layout fix karo", "responsive karo", "animation add karo", "dark mode", "glassmorphism", "bento grid", "accessibility check karo", "chart banana hai", "code review karo".
version: 2.0
---
# UI Patterns v2 — Visual Execution Database

> **Hierarchy:** Tier 1 = ux-thinking (laws) | Tier 2 = design-taste-frontend (code) | Tier 3 = THIS SKILL
> **This skill executes.** Laws come from ux-thinking. Code quality from design-taste-frontend.

---

## Style Database — 50+ Visual Personalities

| Style | Canvas | Primary | Radius | Shadow | Font Pair | Use Case |
|-------|--------|---------|--------|--------|-----------|----------|
| Minimal Premium | `#FFFFFF` | 1 accent | 8-12px | `shadow-sm` | Inter + Geist | Luxury, Portfolio |
| Dark Dramatic | `#0A0A0A` | Brand-400 | 12-16px | `shadow-lg` + glow | Geist Mono + Geist | Dev tools, Creative |
| Bold Editorial | `#FAFAFA` | High contrast | 0-4px | None | Clash Grotesk + Inter | Media, Brand |
| Warm Indian | `#FFFEF7` | Amber `#D97706` | 12-16px | Warm `shadow-sm` | Mukta + Inter | FinTech, Gov, Health |
| Soft Friendly | `#FEF7EE` | Orange `#EA580C` | 16-24px | Layered | Nunito + Inter | Kids, Education |
| Vibrant Expressive | `#FFFFFF` | Multi (Pink/Purple/Teal) | 12-16px | Colored | Display + Inter | Consumer, Social |
| Clean Corporate | `#F8FAFC` | Blue `#2563EB` | 8px | `shadow-sm` | Inter + Roboto | Enterprise, B2B |
| FinTech Dark | `#0F1117` | Green `#10B981` | 8-12px | Ring shadows | JetBrains Mono + Inter | Trading, Banking |
| Glassmorphism | Blur `20px` | White `0.1` | 16-24px | Multi-layer | Inter + SF Pro | Landing, Onboarding |
| Claymorphism | Pastel | Same | 24-32px | Inset/Outset | Quicksand + Inter | Playful, Kids |
| Brutalism | `#FFFFFF` | Black | 0px | Hard borders | Courier + System | Experimental, Art |
| Neumorphism | `#E0E5EC` | Same | 16-20px | Inset/Outset soft | Inter + SF Pro | Calm, Health |
| Flat 2.0 | `#FAFAFA` | 1 accent | 4-8px | Subtle `shadow-sm` | System fonts | Mobile Apps, Web |

---

## Layout Patterns

### Mobile (India-First)
```
- Max content width: 390px (iPhone base), test at 375px
- Bottom CTA: Fixed, full-width, 56px height, 16px from edge
- Tab bar: 4-5 items, icon + label, 83px height (iOS) / 80dp (Android)
- Cards: 16px horizontal margin, 12px gap between cards
- Section spacing: 24px between sections, 16px within section
- Safe area: Respect notch top, gesture bar bottom (34px iOS)
```

### Web (Responsive)
```
Breakpoints: 375 / 768 / 1024 / 1440
Container: max-w-7xl (1280px), centered, 16px mobile padding
Grid: CSS Grid preferred over flex-math
Sidebar: 240-280px fixed, collapsible at 768px
Header: 64px fixed, search + notifications + avatar
Hero: min-h-[100dvh] (not h-screen)
```

### Dashboard
```
- Metric cards: 2-4 cols, same height, 8px gap
- Sidebar: Left, 240px, collapsible to 72px (icons only)
- Header: 64px, search (Cmd+K), notifications, avatar
- Content: padding 24px, max-w-full
- Charts: 300-400px height, responsive width
```

---

## Component Specs

### Buttons
```
Primary:   56px mobile / 48px web | full-width mobile | min 120px web
Secondary: Same height | outlined | same touch target
Danger:    Red semantic | confirm dialog required before action
States:    Default | Hover | Active (scale 0.98) | Loading (spinner) | Disabled (0.4 opacity) | Success
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
Label:           Above input, never placeholder-only
Error:           Below field, red + icon + text (never color alone)
Helper text:     Below field, muted, 12px
Validation:      On blur (not keystroke)
Submit button:   Loading → Success → Error states
```

### Navigation
```
Mobile:  Bottom tab, max 5 items, icon + label always
Web:     Top nav OR Left sidebar — never both primary
Modal:   Close = X + swipe-down + Escape key
Drawer:  Left side, overlay dark bg, swipe-right to close
```

### Images
```
Product screenshots: 1px border `#E5E7EB`, radius 5-8px
Dashboard/workflow: Prominent in feature sections
Light gradient: Behind hero content
Distinctive:
  - Social icons: 14px radius, circular, 1px border
```

---

## Animation Rules

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

### Spring Personality Guide
```
Product Type         Stiffness  Damping  Mass  Feel
Banking/Medical      400        40       1     Zero bounce, serious
SaaS/Productivity    300        30       1     Snappy, minimal bounce
E-com/Fintech        260        26       1     Smooth, confident
Social/Consumer      220        22       1     Light bounce, friendly
Entertainment/Kids   180        15       1     Bouncy, playful
```

---

## Accessibility Implementation

```
Contrast (WCAG AA minimum):
  Normal text:  4.5:1
  Large text:   3:1 (≥18pt / ≥14pt bold)
  UI elements:  3:1

Touch targets:
  iOS:     44×44pt minimum
  Android: 48×48dp minimum
  India:   56×56px preferred (Tier 2/3)

Never color-only:
  ✅ Error = Icon + Text + Border
  ✅ Success = Icon + Text + Border
  ✅ Links = Underline + Color
  ❌ Red text only

Focus:
  Visible ring: 2px, 2px offset, brand color
  Order: Top-left → Bottom-right logical
  Skip link: First focusable element

Screen reader:
  aria-label on icon buttons
  aria-describedby on errors
  role="alert" on toasts
  lang="hi" / "en" per element

Motion:
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    .skeleton, .progress-bar, :focus-visible { animation-duration: 1s !important; }
  }
```

---

## Charts

```
Type Selection:
  Trend over time     → Line chart
  Comparison          → Bar chart
  Part of whole       → Donut (max 5 segments)
  Distribution        → Histogram
  Correlation         → Scatter

Rules:
- Legend always visible, near chart
- Tooltip on hover/tap with exact values
- Empty state: Message + guidance, not blank axes
- Accessible colors: Never red+green only
- Screen reader: aria-label describing key insight
```

---

## Performance Checklist

```
Images:    WebP/AVIF | lazy load | width/height set (prevent CLS)
Fonts:     font-display: swap | preload critical only
Animation: transform/opacity only | requestAnimationFrame for JS
Lists:     Virtualize at 50+ items
Bundle:    Route-level code splitting
Mobile:    Test on slow 3G + budget Android
```

---

## Pre-Delivery QA Checklist

```
VISUAL:
☐ Correct breakpoints tested (375 / 768 / 1024 / 1440)?
☐ Dark mode works without hardcoded colors?
☐ No emojis as icons (use SVG/Phosphor/Lucide)?
☐ Icon style consistent throughout?
☐ No lorem ipsum anywhere?

INTERACTION:
☐ All tap targets ≥44px? (56px India)
☐ Loading state on all async actions?
☐ Error states built (not just happy path)?
☐ Empty states designed?
☐ Back/cancel always available?

ACCESSIBILITY:
☐ Contrast 4.5:1 on all text?
☐ Labels on all inputs?
☐ Color + icon + text on errors?
☐ Focus order logical?
☐ prefers-reduced-motion handled?

PERFORMANCE:
☐ Images lazy loaded below fold?
☐ No layout shift on load?
☐ Animations on transform/opacity only?

UX LAW COMPLIANCE (from ux-thinking):
☐ Severity Critical issues addressed?
☐ No anti-patterns from Layer 7?
☐ Layer 8 (WCAG) fully passed?
```

---

## Quick Reference Cards

### Button Spec
```
Primary:   bg=action-primary, text=text-on-brand, radius=8px, h=56px/48px
Secondary: bg=transparent, border=action-secondary-border, text=action-primary
Ghost:     bg=transparent, text=action-primary
Danger:    bg=action-destructive, text=text-on-brand
Sizes:     sm=32px, md=40px, lg=48px, xl=56px
Min width: 80px
States:    8 (default, hover, active, focus, loading, disabled, success, error)
```

### Input Spec
```
Height:      48px mobile / 40px web
Padding:     12px 16px
Border:      1px border-default / 2px border-focus
Radius:      8px
Label:       14px medium, above, persistent
Error:       border-error (2px), icon + text below, 12px
Helper:      12px regular, text-tertiary, below field
Placeholder: text-tertiary, never as label
```

### Card Spec
```
Padding:     16px/24px/32px
Radius:      12px standard / 16px large / 8px small
Border:      1px border-subtle OR shadow-sm
Shadow:      0 1px 3px rgba(0,0,0,0.1)
Hover:       shadow-md (web)
Interactive: Whole card tappable, cursor pointer
```

### Spacing Scale (8pt)
```
space-1:  4px   (icon+label gap)
space-2:  8px   (list item gap, icon padding)
space-3:  12px  (compact padding)
space-4:  16px  (component padding — BASE)
space-5:  20px  (comfortable padding)
space-6:  24px  (card padding — STANDARD)
space-7:  32px  (xl section gap)
space-8:  40px  (2xl section gap)
space-10: 48px  (3xl hero padding)
space-12: 64px  (4xl major section)
space-16: 80px  (5xl page sections)
space-20: 96px  (6xl hero sections)
```

### Radius Scale
```
radius-none:  0px
radius-sm:    4px   (badges, tags, small chips)
radius-md:    8px   (buttons, inputs, small cards)
radius-lg:    12px  (cards, dropdowns, popovers)
radius-xl:    16px  (modals, drawers, bottom sheets)
radius-2xl:   24px  (hero cards, featured sections)
radius-3xl:   32px  (large feature cards)
radius-full:  9999px (pills, avatars, FABs, tags)
```