---
name: figma-design
description: >
  Elite Figma execution skill for creating professional, production-ready screens,
  components, and design systems inside Figma using MCP tools.
  Use when: "Figma mein design karo", "screen banao Figma mein", "component banao",
  "wireframe", "Figma se design karo", "UI spec chahiye", "design system Figma mein",
  "design review", "UI improve karo Figma mein", "auto-layout", "design tokens Figma".
  Focuses on: Auto-layout, Design tokens, Component architecture, Figma MCP execution.
  NOTE: UX law decisions come from ux-thinking (Tier 1). This skill executes in Figma.
  Always check ux-thinking laws before making design decisions in Figma.
---

# Figma Design — Elite Execution Skill

> HIERARCHY: Tier 1 = UX Brain (ux-thinking) | Tier 2 = design-taste-frontend | Tier 3 = THIS SKILL
> UX laws and psychology → ux-thinking is the authority.
> This skill executes those decisions inside Figma.
> If a Figma decision violates a ux-thinking law → FLAG IT before proceeding.

---

## AUTHORITY NOTE

```
references/ux-laws.md in this skill = DEPRECATED.
Canonical UX law source = ux-thinking skill (37 Laws + 4 Frameworks).
When Q3 (Which UX Laws apply?) is answered below, cite ux-thinking laws by number.
Do NOT use internal ux-laws.md for law decisions.
```

---

## STEP ZERO — WEB SEARCH (Mandatory)

Before starting any design, search for current trends:
```
Query: "[product type] UI design [current year] trending"
Example: "fintech app UI design 2026" / "food delivery dark mode design 2026"
```
Then read `references/design-trends.md` to cross-reference.

---

## MANDATORY REFERENCE FILES

| File | When to Read |
|---|---|
| `references/design-trends.md` | ALWAYS — fonts, colors, icons, layouts |
| `references/aesthetic-system.md` | ALWAYS — personality + font pairing |
| `references/indian-patterns.md` | ALWAYS when product targets Indian users |
| `references/figma-architecture.md` | Spacing, tokens, components, grid setup |
| `references/motion-specs.md` | When interaction/animation specs needed |
| `references/design-pipeline.md` | Pipeline stage selection |

Note: `references/ux-laws.md` is deprecated. Use ux-thinking skill for all law decisions.

---

## PRE-EXECUTION PROTOCOL — 5 Questions Before Design

### Q1 — Who is this for?
> User: [age, city tier, tech literacy, primary device, language preference]
> Emotional goal: What should they FEEL? (Trusted / Excited / Safe / Empowered)

### Q2 — Aesthetic personality? (from aesthetic-system.md)
> ONE from: Minimal Premium / Dark Dramatic / Bold Editorial / Warm Indian /
> Soft Friendly / Vibrant Expressive / Clean Corporate / Luxury Refined
> Reason: "[Personality] because [product type + user emotional goal]"
> Commit fully. Never mix personalities.

### Q3 — Which 3 ux-thinking Laws are most critical here?
> Check ux-thinking Step 2 auto-activation for this screen type.
> Law 1: [Name + Number] — because [specific reason for this screen]
> Law 2: [Name + Number] — because [specific reason]
> Law 3: [Name + Number] — because [specific reason]
> FLAG any Figma decision that violates these laws.

### Q4 — Primary action on this screen?
> One screen = one job. State it: "User must [action] without friction."
> Everything else is secondary.

### Q5 — Indian market context? (from indian-patterns.md)
> Tier: [1/2/3] | Language: [Hindi/English/Bilingual]
> Special: [UPI flow / bilingual layout / trust signals / offline state]

Only after answering all 5 — begin execution.

---

## EXECUTION PROTOCOL

### Step 1 — Plan Structure (Write Before Figma)
1. Screen layout in words
2. Component list — every element named
3. Color palette — from aesthetic personality
4. Typography — from font pair of personality
5. Spacing tokens — all on 8pt grid

### Step 2 — Execute in Figma (MCP Tools)
```
1. figma_get_status         → Confirm connection
2. figma_get_file_data      → Understand file structure
3. figma_execute            → Build in this order:
   - Main frame (correct device size from figma-architecture.md)
   - Auto Layout on ALL containers (zero manual positioning)
   - Components with ALL 8 states (see below)
   - Semantic color tokens (never bare hex)
   - Typography from scale
   - Real microcopy (zero lorem ipsum — ever)
   - Accessibility + focus order
   - Edge case handling on all text containers
4. figma_capture_screenshot → Verify visually
5. Iterate from screenshot
```

### Step 3 — UX Law Compliance Check
Before delivering, verify against ux-thinking laws selected in Q3:
```
LAW COMPLIANCE CHECK:
□ Law 1 [name]: [How this design satisfies it]
□ Law 2 [name]: [How this design satisfies it]
□ Law 3 [name]: [How this design satisfies it]
□ Any violations? → FLAG before delivery, propose fix
```

---

## DESIGN SPECS DELIVERY FORMAT

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SPECS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AESTHETIC PERSONALITY: [Name]
FONT PAIR: [Display] + [Body]
PRIMARY ACTION: [One job of this screen]

TYPOGRAPHY:
  Heading:  [size]px / [weight] / [line-height]px
  Body:     [size]px / [weight] / [line-height]px
  Caption:  [size]px / [weight] / [line-height]px

COLORS (Semantic tokens only — no bare hex):
  surface-primary:   [hex]
  action-accent:     [hex]
  text-primary:      [hex]

SPACING: All values on 8pt grid
  Section gap:    [value]px
  Card padding:   [value]px
  Component gap:  [value]px

COMPONENT STATES (all 8):
  Default | Hover | Active/Pressed | Focus | Loading | Disabled | Error | Success

AUTO LAYOUT:
  [Frame]: Direction [Row/Col] | Gap [px] | Padding [T R B L] | Sizing [Hug/Fill]

ACCESSIBILITY:
  Contrast: [ratio]:1 (AA/AAA) ← must pass ux-thinking Layer 8
  Touch targets: [size]px minimum (44px floor)
  Focus order: [1→2→3...]

INDIAN MARKET:
  Tier: [1/2/3] | Language: [Hindi/English/Bilingual]
  Special patterns: [list]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN RATIONALE (ux-thinking Brain Notes)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Aesthetic: [Personality] — [Why: connect to user emotional goal]
Law 1 Applied: [Name] — [Specific UI decision made because of this law]
Law 2 Applied: [Name] — [Specific UI decision]
Law 3 Applied: [Name] — [Specific UI decision]
What makes this senior: [The one decision a junior would NOT have made]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## COMPONENT ARCHITECTURE

### Auto-Layout Rules (Non-Negotiable)
```
- EVERY container = Auto Layout. No exceptions.
- Nested Auto Layout: inner component → parent frame → page frame
- Sizing: Hug content for components, Fill container for layouts
- Min/Max width set on all responsive elements
- Resizing behavior defined for every text layer
```

### Design Token System (Figma Variables)
```
COLOR TOKENS (never bare hex):
  semantic/brand/primary
  semantic/brand/secondary
  semantic/status/success | warning | error | info
  semantic/text/primary | secondary | tertiary | disabled
  semantic/surface/primary | secondary | elevated

SPACING TOKENS (8pt grid):
  spacing/4 = 4px
  spacing/8 = 8px
  spacing/16 = 16px
  spacing/24 = 24px
  spacing/32 = 32px
  spacing/48 = 48px

RADIUS TOKENS:
  radius/sm = 4px   (badges, chips)
  radius/md = 8px   (buttons, inputs)
  radius/lg = 12px  (cards)
  radius/xl = 16px  (modals, sheets)
  radius/pill = 9999px
```

### Component States (Build All 8 — Always)
```
1. Default    — base resting state
2. Hover      — web only, subtle bg change
3. Active     — pressed/clicked, scale 0.98
4. Focus      — keyboard focus ring, 2-3px offset
5. Loading    — spinner inside button, content skeleton
6. Disabled   — 0.4 opacity, cursor not-allowed
7. Error      — red semantic token + icon + text
8. Success    — green semantic token + checkmark
```

---

## QUICK REFERENCE — Measurements

### Spacing (8pt Grid)
```
4px   Micro (icon + label gap)
8px   Small (list item gap)
16px  Component padding
24px  Card padding
32px  Between sections
48px  Hero padding
64px  Major section gaps
```

### Typography Scale
```
12/16px  Captions, labels
14/20px  Helper text
16/24px  Body (base)
20/28px  H4, subheadings
25/32px  H3
31/40px  H2
39/48px  H1
```

### Touch Targets
```
Minimum:   44x44px (ux-thinking Layer 8 requirement)
Preferred: 56x56px (India Tier 2/3)
```

---

## MICROCOPY RULES
```
- Zero lorem ipsum. Ever.
- CTA buttons: Verb + Noun ("Save Changes", "Pay ₹299", "आगे बढ़ें")
- Error: [What happened] + [Why] + [What to do next]
- Empty state: Explain + Encourage (never "No data")
- Indian: ₹ symbol, lakh/crore, DD/MM/YYYY dates
```

---

## PIPELINE REFERENCE

| Request | Start Stage | End Stage |
|---|---|---|
| "Just design the UI" | Stage 7 (Hi-Fi) | Stage 8 |
| "Design a screen" | Stage 6 (Mid-Fi) | Stage 9 |
| "Design a feature" | Stage 4 (Journey) | Stage 10 |
| "Design a product" | Stage 1 (Personas) | Stage 11 |
| "Create components" | Stage 9 | Stage 9 |
| "Fix/improve design" | Stage 7 | Stage 8 |

Full pipeline: `references/design-pipeline.md`