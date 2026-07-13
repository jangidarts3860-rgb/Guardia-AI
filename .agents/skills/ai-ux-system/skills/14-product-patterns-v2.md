---
name: product-patterns-v2
description: Product Pattern Library — Real-world patterns by industry. FinTech, Food Delivery, E-commerce, SaaS, Social, Health, EdTech. Onboarding, checkout, search, settings, notifications, empty states, trust signals. Trigger: "financial app pattern", "checkout flow", "onboarding pattern", "search pattern", "notification pattern", "trust signals", "empty state pattern", "financial UX", "food delivery UX", "ecommerce pattern".
version: 2.0
---
# Product Patterns v2 — Industry Battle-Tested Patterns

> **Source:** 100+ product analyses, ux-thinking laws, Indian market reality.
> **Use:** Don't invent. Apply. Adapt only with evidence.

---

## FinTech Patterns (India Context)

### Onboarding (KYC + Trust)
```
FLOW: Splash → Language → Value Prop → Phone → OTP → KYC (PAN/Aadhaar) → MPIN → Success
PATTERNS:
- Progressive disclosure: One question per screen
- Auto-read OTP (SMS Retriever API) + manual fallback
- DigiLocker / CKYC integration for instant KYC
- MPIN creation: 6-digit, confirm, biometric opt-in
- Trust signals throughout: "RBI Licensed", "₹1L insurance", "10M+ users"
```

### Money Transfer (UPI-First)
```
FLOW: Amount → Recipient (UPI ID/Contact/QR) → Review → UPI PIN → Success
PATTERNS:
- UPI apps detected → show logos (GPay, PhonePe, Paytm, BHIM)
- Amount visible BEFORE UPI app switch
- Recipient verification: Name + last 4 of UPI ID
- "Request Money" as separate flow (not mixed)
- Failure: Specific error ("Insufficient balance" not "Failed") + retry
```

### Dashboard (Money Visibility)
```
PATTERNS:
- Balance: Large, top, real-time, color-coded (green + / red -)
- Quick actions: Send / Request / Scan / Bill Pay (4-icon grid)
- Recent transactions: List, infinite scroll, pull-to-refresh
- Spend insights: Category rings, monthly trend, budget alerts
- Hidden balance toggle (privacy in public)
```

### Trust Signals (Non-Negotiable)
```
PLACEMENT:
- Onboarding: "RBI Licensed", "₹1L insurance", "256-bit encryption"
- Payment screen: Lock icon, "Secured by NPCI", bank logos
- Settings: "Security", "Privacy", "Delete Account" (easy to find)
- Support: 24/7 chat, callback, WhatsApp, email — all visible
```

---

## Food Delivery Patterns

### Home / Discovery
```
PATTERNS:
- Hero: Search bar (prominent) + "Quick delivery" chips
- Categories: Horizontal scroll, 8-10 icons, veg/non-veg toggle
- Restaurant cards: Image (16:9), name, cuisine tags, rating, delivery time, offer badge
- Filters: Vegetarian, Rating 4.0+, Delivery time <30min, Offers
- Sort: Relevance / Delivery time / Rating / Cost / Promoted
```

### Restaurant Page
```
PATTERNS:
- Hero: Image carousel, name, rating, delivery time, min order
- Menu: Category tabs (sticky), items with image, name, desc, price, veg badge
- Cart: Persistent bottom bar (subtotal, item count, "View Cart")
- Customization: Modal — size, spice, add-ons, special instructions
```

### Checkout (Speed = Conversion)
```
FLOW: Cart → Address → Payment → Confirm → Track
PATTERNS:
- Address: Saved + "Add new" (map pin + manual), default marked
- Payment: UPI apps first → Wallets → Cards → COD (last)
- Offer auto-apply (coupon code field hidden until "Have a code?")
- Order summary: Itemized, delivery fee, packing, tax, total
- Confirm: Large "Place Order" (UPI deep link if UPI selected)
```

### Tracking (Anxiety Reduction)
```
PATTERNS:
- Live map: Driver avatar, real-time location, ETA countdown
- Status pills: Confirmed → Preparing → Picked → Nearby → Delivered
- Driver contact: Call / Chat (masked number)
- "Share live location" with family
- Delivered: Photo proof (doorstep) + "Rate experience"
```

---

## E-Commerce Patterns

### Product Listing (Discovery)
```
PATTERNS:
- Grid: 2-col mobile, 4-col desktop, 16:9 images
- Card: Image, name, price (strikethrough + current), rating, "X% OFF" badge
- Quick view: Tap → modal (image carousel, variants, add to cart)
- Filters: Sidebar (mobile: bottom sheet) — Category, Brand, Price, Rating, Discount
- Sort: Relevance / Price / Newest / Rating / Popular
- Infinite scroll + "Back to top" FAB
```

### Product Detail (Conversion)
```
PATTERNS:
- Image carousel: Thumbnails, pinch-zoom, video support
- Price: Large, strikethrough original, savings highlighted
- Variants: Size/Color as pills (not dropdown), stock indicator
- Ratings: Summary + breakdown + "Verified Purchase" filter
- Reviews: Photos, helpful votes, sort by recent/relevant
- Add to Cart: Sticky bottom bar (mobile) / Right rail (desktop)
- Trust: "Easy returns", "Authentic guarantee", "Ships in 24h"
```

### Checkout (Minimal Friction)
```
FLOW: Cart → Address → Payment → Review → Success
PATTERNS:
- Guest checkout default (account optional post-purchase)
- Address: Autofill (Google Places), save multiple, default
- Payment: Saved cards (tokenized), UPI, COD, EMI, PayLater
- Order summary: Sticky, editable quantities, promo code inline
- Success: Order ID, expected delivery, "Track" CTA, WhatsApp share
```

---

## SaaS / B2B Patterns

### Onboarding (Time-to-Value)
```
PATTERNS:
- Role-based: "I'm a [Designer / PM / Dev]" → tailored setup
- Interactive demo: "Try it now" with sample data
- Checklist: "3 steps to launch" — progress bar, celebrate completion
- Empty states: Templates ("Start with [Template]") not blank
- Tooltips: Contextual, dismissible, "Don't show again"
```

### Dashboard (Density OK)
```
PATTERNS:
- Left nav: Collapsible, icons + labels, active state clear
- Top bar: Search (Cmd+K), notifications, profile, help
- Metrics row: 3-4 KPIs (sparkline + trend), click → detail
- Tables: Sortable, filterable, column toggle, row actions
- Density toggle: Comfortable / Compact / Condensed
```

### Settings (Progressive Disclosure)
```
PATTERNS:
- Sections: Account / Team / Billing / Security / Integrations / Advanced
- Danger zone: "Delete account" at bottom, red, confirmation modal
- SSO/SCIM: Enterprise toggle, clear setup guides
- Webhooks: Test button, retry logic, delivery logs
```

---

## Social / Community Patterns

### Feed (Engagement)
```
PATTERNS:
- Algorithm: "Following" (chronological) + "For You" (algo) tabs
- Post types: Text, Image, Video, Link, Poll — unified card
- Actions: Like / Comment / Share / Save / Report (consistent order)
- Infinite scroll + "New posts" banner (not auto-refresh)
- Loading: Skeleton cards matching final layout
```

### Notifications (Relevance > Volume)
```
PATTERNS:
- Grouped: "5 likes on your post" not 5 separate
- Priority: High (mentions, DMs) → Medium (likes) → Low (suggestions)
- Channels: In-app + Push + Email (user controls each)
- Digest: Daily/Weekly summary opt-in
- Actions inline: "Reply", "View", "Dismiss" on notification
```

---

## Health / Fitness Patterns

### Onboarding (Motivation)
```
PATTERNS:
- Goal setting: "Lose 5kg" / "Run 5k" / "Build muscle" — visual
- Baseline: Current weight / steps / sleep → auto from HealthKit/Google Fit
- Plan: "3 workouts/week" → calendar integration
- Streak: Visual calendar, "Don't break the chain"
```

### Workout / Tracking
```
PATTERNS:
- Workout: Timer + sets/reps/weight + rest timer + video demo
- Auto-log: Apple Watch / Wear OS / manual fallback
- Progress: Charts (weight, volume, PRs), photos, body measurements
- Social: Share workout, challenge friends, leaderboards
```

---

## EdTech Patterns

### Learning Flow
```
PATTERNS:
- Course: Modules → Lessons (video + notes + quiz)
- Progress: Circle ring (module), bar (course), streak (daily)
- Spaced repetition: "Review today" queue (SRS algorithm)
- Notes: Timestamped, searchable, exportable
- Offline: Download modules, sync on connect
```

### Motivation
```
PATTERNS:
- XP / Levels / Badges (Duolingo-style)
- Streak freeze (paid/earned)
- Leaderboards: Friends / Global / Weekly
- Certificates: Shareable (LinkedIn), verifiable
```

---

## Universal Patterns (Cross-Industry)

### Empty States
```
TEMPLATE:
[Illustration] — Positive, not sad
[Headline] — "No orders yet"
[Body] — "Find something you'll love"
[Primary CTA] — "Explore Restaurants"
[Secondary] — "Browse categories"
```

### Error States
```
TEMPLATE:
[Icon] — Warning, not skull
[Headline] — "Couldn't load restaurants"
[Body] — "Check your connection and try again"
[Primary CTA] — "Retry"
[Secondary] — "Contact support"
```

### Loading States
```
RULES:
- Skeleton = exact content shape (not generic boxes)
- Shimmer: left→right, 1.5s loop, subtle
- Critical content first (hero, primary CTA)
- Never blank screen >400ms
```

### Permissions
```
TEMPLATE:
[Icon] — Friendly
[Headline] — "Allow location?"
[Body] — "We use location to show nearby restaurants"
[Primary] — "Allow" (triggers native prompt)
[Secondary] — "Not now" (respects, asks later contextually)
```

### Onboarding Carousel
```
RULES:
- Max 3 screens (Value → How → Action)
- Skip visible always
- Dots indicator (current highlighted)
- Last screen = Primary CTA to start
```

---

## Anti-Patterns by Industry

| Industry | Anti-Pattern | Why It Fails |
|----------|--------------|--------------|
| FinTech | Card-only payment | India = UPI-first |
| Food | No veg filter | 40%+ Indian users vegetarian |
| E-com | Guest checkout hidden | 30% drop-off |
| SaaS | No empty state templates | "Blank slate" paralysis |
| Social | Notification spam | Uninstall #1 reason |
| Health | No offline mode | Workout = no signal |
| EdTech | Video-only (no notes) | Can't review efficiently |

---

## Pattern Application Checklist

```
BEFORE USING A PATTERN:
☐ Does it solve MY user's problem? (Not "industry standard")
☐ Does it pass ux-thinking law audit?
☐ Does it work on ₹8k Android / 2G?
☐ Is it accessible (WCAG AA)?
☐ Is it bilingual-ready (Hindi + English)?
☐ Does it have error/empty/loading states?
☐ Can I measure if it works?
```