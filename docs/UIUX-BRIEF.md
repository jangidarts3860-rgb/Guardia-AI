# UI/UX Design Brief
## Guardia AI — Financial Security App
**Version:** 1.0 | **Designer:** UI/UX Case Study

---

## 1. Design Vision

> **"An invisible bodyguard — present when needed, silent when not."**

Guardia AI should feel like a **premium security vault**, not a banking app. Every screen should communicate: *"Your money is safe. We are watching."*

---

## 2. Design Principles

| Principle | Application |
|---|---|
| **Trust First** | Every action explained before it happens |
| **Speed Breaker** | Slow users down before risky transactions |
| **Invisible AI** | AI works in background, surfaces only when needed |
| **Zero Cognitive Load** | One primary action per screen (Hick's Law) |
| **Progressive Disclosure** | Complex info revealed step-by-step (Vault section) |

---

## 3. Color System

> Base: **Revolut Design Language** | Override: **Guardia AI Brand Tokens**

### Brand Colors
| Token | Hex | Usage |
|---|---|---|
| `canvas-dark` | `#0F172A` | Page backgrounds, hero bands (Guardian Navy) |
| `surface-elevated` | `#1E293B` | Cards, input fields, elevated surfaces (Shield Blue) |
| `primary` | `#38BDF8` | AI elements, CTAs, focus states, icons (Electric AI) |

### Semantic Colors
| Token | Hex | Usage |
|---|---|---|
| `success` | `#22C55E` | Safe state, verified, savings (Profit Green) |
| `danger` | `#EF4444` | Scam alert, high risk, delete (Alert Red) |
| `warning` | `#F59E0B` | Upcoming renewal, caution (Caution Gold) |

### Text & Surface
| Token | Hex | Usage |
|---|---|---|
| `on-dark` | `#FFFFFF` | Primary text |
| `stone` | `#9CA3AF` | Secondary text, labels |
| `faint` | `#4B5563` | Disabled, placeholders |
| `hairline` | `rgba(255,255,255,0.10)` | Card borders |
| `divider` | `rgba(255,255,255,0.06)` | Section dividers |

### Color Psychology in App
- 🔴 **Red Screen** = Scam/Danger → Full-screen red for maximum urgency
- 🟢 **Green Screen** = Safe/Verified → Calm, confidence-building
- 🔵 **Blue Pulse** = AI Working → Electric AI (#38BDF8) glow animation
- ⚫ **Dark Canvas** = Default state → Premium, secure, focused

---

## 4. Typography

**Font Family:** Inter (Google Fonts)

| Style Name | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `Display/Hero` | 32px | 700 Bold | 120% | Splash, onboarding |
| `Heading/H1` | 24px | 600 SemiBold | 130% | Page titles |
| `Heading/H2` | 20px | 600 SemiBold | 140% | Card headers |
| `Heading/H3` | 18px | 500 Medium | 140% | Sub-sections |
| `Body/Regular` | 16px | 400 Regular | 150% | Body copy |
| `Body/Medium` | 16px | 500 Medium | 150% | Emphasized body |
| `Label/Button` | 14px | 600 SemiBold | 100% | All buttons |
| `Caption/Small` | 12px | 500 Medium | 160% | Dates, labels |
| `Price/Large` | 28px | 700 Bold | 100% | ₹ amounts |

---

## 5. Spacing & Layout

**System:** 8pt Grid

| Token | Value | Usage |
|---|---|---|
| `space/1` | 4px | Micro gaps, badge padding |
| `space/2` | 8px | List gaps, OTP spacing |
| `space/3` | 12px | — |
| `space/4` | 16px | Component padding, margins |
| `space/5` | 20px | — |
| `space/6` | 24px | Card padding, gutters |
| `space/7` | 32px | Section spacing |
| `space/8` | 48px | Large sections |
| `space/9` | 80px | Page padding |

**Mobile Layout:**
- Grid: 4-column
- Margin: 16-20px (left & right)
- Gutter: 16px
- Safe Area: iOS bottom = 34px, Android = variable

---

## 6. Border Radius

| Token | Value | Usage |
|---|---|---|
| `radius/sm` | 8px | Tags, chips, badges |
| `radius/md` | 12px | Input fields, small cards |
| `radius/lg` | 20px | Main cards (Revolut standard) |
| `radius/xl` | 28px | Large containers, modals |
| `radius/pill` | 9999px | All buttons, status pills |

---

## 7. Elevation (Revolut Rule — Color Blocking Only)

> ❌ No traditional drop shadows on cards
> ✅ Depth via luminance shift only

| Level | Color | Usage |
|---|---|---|
| Level 0 | `#0F172A` | Page background |
| Level 1 | `#1E293B` | Cards, surfaces |
| Level 2 | Gradient `#1E293B → #0F172A` | AI Insight Card |
| Level 3 | `#38BDF8` | Featured/CTA cards |

**Exception:** AI elements get Electric AI glow: `0 0 24px rgba(56,189,248,0.25)`

---

## 8. Component Specifications

### Buttons
```
Height: 48px
Radius: 9999px (pill)
Font: 14px SemiBold

Primary:   bg #38BDF8 | text #0F172A | glow: AI glow
White:     bg #FFFFFF | text #0F172A | hero bands only
Outline:   transparent | border 1.5px | text color = border
Danger:    bg #EF4444 | text #FFFFFF
Disabled:  bg rgba(255,255,255,0.06) | text #4B5563
```

### Input Fields
```
Height: 56px
Radius: 12px
BG: #1E293B
Padding: 0 16px

Default: border rgba(255,255,255,0.12) 1px
Focus:   border #38BDF8 2px + ring rgba(56,189,248,0.10)
Error:   border #EF4444 1px
Success: border #22C55E 1px
```

### OTP Input (6 boxes)
```
Each: 48×56px | Radius: 12px | BG: #1E293B
Gap: 8px between boxes
Active: border #38BDF8 2px
Filled: text #38BDF8
```

### Cards
```
Standard Card:
  BG: #1E293B | Radius: 20px | Padding: 24px
  Border: rgba(255,255,255,0.10) 1px

AI Insight Card:
  BG: gradient #1E293B → #0F172A (160deg)
  Border: rgba(255,255,255,0.10) 1px
  Radius: 20px | Padding: 24px
  Glow: 0 8px 32px rgba(56,189,248,0.20)
  Top: "✨ AI Insight" badge + sparkle icon
```

### Toast / Alert Banners
```
Height: ~80px | Radius: 12px | Padding: 16px 20px
Layout: Horizontal | Gap: 16px

Success: BG #0A1F12 | Border rgba(34,197,94,0.40)
Warning: BG #1F1506 | Border rgba(245,158,11,0.40)
Danger:  BG #1F0606 | Border rgba(239,68,68,0.40)
```

### Bottom Navigation
```
Height: 80px + safe area
BG: #1E293B
Border-top: rgba(255,255,255,0.08) 1px

FAB (Center Verify Button):
  Size: 56×56px | Shape: Circle
  BG: #38BDF8 | Icon: scan, #0F172A
  Glow: 0 0 24px rgba(56,189,248,0.35)
  Position: -16px from nav top
```

---

## 9. Icon System

- **Style:** Outline (Linear) ONLY — never filled
- **Source:** Lucide React or Phosphor Icons
- **Stroke:** 2px consistent
- **Sizes:** 20px / 24px / 32px / 40px only

---

## 10. Key Screen States

### Alert System (3 levels)
```
Info (Blue):    rgba(56,189,248,0.12) bg | #38BDF8 border
Warning (Gold): rgba(245,158,11,0.12) bg | #F59E0B border
Danger (Red):   rgba(239,68,68,0.12) bg  | #EF4444 border
                → Full-screen red for maximum fraud alerts
```

### Empty States
- Never write "No Data"
- Always: **"Everything looks safe right now! ✨"**
- Include shield icon + positive CTA

### Loading States
- Never use spinner
- Use **Pulsing Shield** animation
- Shield scales 1 → 1.08 → 1 with Electric AI glow
- Duration: 800ms loop

---

## 11. Interaction Rules (Developer Handoff)

| Rule | Spec |
|---|---|
| Button tap feedback | Scale 0.98 + haptic (Light impact) |
| Danger action feedback | Haptic Heavy impact |
| Destructive confirm | "Slide to Confirm" gesture |
| Loading | Pulsing Shield (not spinner) |
| Error message format | [What] · [Why] · [Fix] |
| Touch targets | Min 44×44px (India Tier 2/3: 56×56px) |
| Transition duration | 250ms ease-out (standard) |
| Alert dismiss | Swipe right or X tap |

---

## 12. UX Laws Applied

| Law | Application |
|---|---|
| **Hick's Law** | Max 4 bottom tabs, 1 primary CTA per screen |
| **Jakob's Law** | QR scanner familiar like GPay/Paytm |
| **Miller's Law** | Subscriptions chunked: My Spends / Family Spends |
| **Fitts's Law** | FAB 56px, Freeze button max size |
| **Von Restorff** | Red alert screen breaks dark pattern for urgency |
| **Aesthetic Usability** | Premium dark UI = users trust it more |
