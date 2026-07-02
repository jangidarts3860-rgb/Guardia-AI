# Design System Reference
## Guardia AI — v0/Cursor/Lovable ke liye
**Base:** Revolut Design Language | **Override:** Guardia AI Brand Tokens

---

## Quick Copy — Colors (Paste directly in v0)

```css
/* GUARDIA AI — DESIGN TOKENS */
--canvas:       #0F172A;   /* page background */
--surface:      #1E293B;   /* cards, inputs */
--primary:      #38BDF8;   /* AI accent, CTAs */
--primary-hover:#0EA5E9;
--on-primary:   #0F172A;   /* text on blue buttons */

--success:      #22C55E;
--danger:       #EF4444;
--warning:      #F59E0B;

--text-primary: #FFFFFF;
--text-secondary:#9CA3AF;
--text-disabled: #4B5563;

--border:       rgba(255,255,255,0.10);
--border-soft:  rgba(255,255,255,0.06);
--glow-ai:      0 0 24px rgba(56,189,248,0.25);
```

---

## Typography (Inter font)

```
Display:  32px / 700 / lh 120% / ls -0.5px
H1:       24px / 600 / lh 130%
H2:       20px / 600 / lh 140%
H3:       18px / 500 / lh 140%
Body:     16px / 400 / lh 150%
Button:   14px / 600
Caption:  12px / 500
Price:    28px / 700 / tabular-nums
```

---

## Components Quick Ref

**Button Primary:** `bg #38BDF8, text #0F172A, h 48px, radius 9999px, glow`
**Button Danger:** `bg #EF4444, text #FFF, h 48px, radius 9999px`
**Button Outline:** `transparent, border 1.5px #38BDF8, text #38BDF8`
**Button Disabled:** `bg rgba(255,255,255,0.06), text #4B5563`

**Input:** `bg #1E293B, h 56px, radius 12px, border rgba(255,255,255,0.12)`
**Input Focus:** `border #38BDF8 2px, ring rgba(56,189,248,0.10)`
**Input Error:** `border #EF4444`

**Card:** `bg #1E293B, radius 20px, pad 24px, border rgba(255,255,255,0.10)`
**AI Card:** `gradient #1E293B→#0F172A, radius 20px, glow rgba(56,189,248,0.20)`

**Bottom Nav:** `bg #1E293B, border-top rgba(255,255,255,0.08), h 80px`
**FAB:** `bg #38BDF8, size 56px, circle, glow, position -16px top`

---

## Spacing

`4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 80px`

Mobile margin: 16-20px | Gutter: 16px | Safe area bottom: 34px (iOS)

---

## Radius

`sm:8 / md:12 / lg:20 / xl:28 / pill:9999px`

---

## DO's and DON'Ts (Revolut Rules)

✅ Color-blocking for depth (no drop shadows on cards)
✅ Pill buttons (radius 9999px) for all CTAs
✅ AI glow ONLY on Electric AI (#38BDF8) elements
✅ Single primary action per screen
✅ "Everything looks safe right now! ✨" for empty states

❌ No drop shadows on standard cards
❌ No filled icons (outline only, 2px stroke)
❌ No spinner (use pulsing shield animation)
❌ Never write "No Data" in empty states
❌ No more than 4 bottom navigation tabs
