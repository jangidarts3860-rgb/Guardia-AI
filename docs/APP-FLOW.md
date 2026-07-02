# App Flow Document
## Guardia AI — Complete 28-Screen Flow
**Version:** 1.0 | **Navigation:** Bottom Tabs (4) + Overlays

---

## Overview

```
Total Screens: 28
Navigation: 4 Bottom Tabs + Floating Action Button (FAB)
Core Tabs: Home | Subs | [VERIFY FAB] | Vault
Auth: Login/Signup + OTP + Security PIN
```

---

## Stage 1 — The Welcome Gate (Screens 5, 16, 17, 18, 6, 7)

> First-time user entry sequence

```
[Screen 5] SPLASH
├── Logo: "🛡️ Guardia AI"
├── Tagline: "Your Financial Bodyguard"
├── BG: Full dark canvas #0F172A
├── Electric AI pulse animation on logo
└── Auto-jump after 2 seconds →

[Screen 16] LOGIN PAGE
├── Header: "Welcome back"
├── Input: Mobile Number (+91)
├── Input: Security PIN (6-digit)
├── CTA: "Login" (Primary button)
├── Link: "Forgot PIN?" → Screen 24
├── Link: "New user? Create Account" → Screen 17
└── Biometric option (FaceID/Fingerprint)

[Screen 17] SIGNUP (3 steps)
│
├── STEP 1 — Identity
│   ├── Input: Full Name
│   ├── Input: Mobile Number (+91)
│   ├── CTA: "Send OTP"
│   └── → OTP Step
│
├── STEP 2 — OTP Verification
│   ├── Title: "Enter OTP sent to +91 XXXXX"
│   ├── OTP: 6 boxes (48×56px each)
│   ├── Timer: "Resend in 0:42"
│   └── → PIN Setup Step
│
└── STEP 3 — Security PIN Setup
    ├── Title: "Create your 6-digit Guardian PIN"
    ├── PIN: 6 dot inputs
    ├── Confirm PIN: Re-enter
    └── → Screen 18

[Screen 18] OS PERMISSIONS
├── Title: "Give Guardia AI its superpowers"
├── Permission 1: 📷 Camera — "To scan QR codes for fraud check"
├── Permission 2: 💬 SMS — "To detect scam messages before you click"
├── Permission 3: 🔔 Notifications — "For real-time fraud alerts"
├── Privacy note: "Your data never leaves your device. On-Device AI."
├── CTA: "Grant Permissions" (Primary)
└── → Screen 6

[Screen 6] ONBOARDING WALKTHROUGH (3 slides)
│
├── SLIDE 1 — The AI Shield
│   ├── Illustration: Shield with pulse
│   ├── Headline: "We stop fraud before it happens"
│   └── Body: "AI analyzes every QR code and payment link before you pay"
│
├── SLIDE 2 — The Subscription Map
│   ├── Illustration: Money flow graph
│   ├── Headline: "See where every rupee goes"
│   └── Body: "All your hidden subscriptions in one place. Cancel in 1 tap."
│
└── SLIDE 3 — Your Privacy Promise
    ├── Illustration: Lock on device
    ├── Headline: "Your data stays on your phone"
    ├── Body: "On-Device AI. RBI compliant. Zero data sold."
    └── CTA: "Link My Bank" → Screen 7

[Screen 7] BANK LINKING (3 steps)
│
├── STEP 1 — Select Bank
│   ├── Search bar: "Search your bank"
│   ├── Popular banks list (SBI, HDFC, ICICI, Axis...)
│   └── → Step 2
│
├── STEP 2 — Account Aggregator Auth
│   ├── Title: "Securely connecting via RBI's AA Framework"
│   ├── Progress: Step 2 of 3
│   ├── Animation: Bank vault opening
│   └── → Step 3
│
└── STEP 3 — Confirmation
    ├── ✅ "Bank linked successfully"
    ├── Shows: Bank name + masked account
    ├── AI scanning animation: "Analyzing your subscriptions..."
    └── → Screen 1 (Home Dashboard)
```

---

## Stage 2 — The Command Center (Screens 1, 2, 3, 4)

> 4 main tabs always visible at bottom

```
[Screen 1] HOME DASHBOARD ← Default tab
├── Top Bar
│   ├── Left: "Good morning, Rohan 👋"
│   └── Right: Profile avatar + notification bell
├── AI Shield Status
│   ├── Green glow = Protected
│   ├── Red pulse = Threat detected
│   └── Label: "AI Shield: Active"
├── The Leak Meter
│   ├── Big number: "₹850 wasted this month"
│   ├── Sub: "on 3 unused subscriptions"
│   └── CTA link: "View details →"
├── Smart Nudges (AI Cards — scrollable horizontal)
│   ├── Card 1: "Netflix not used in 2 months · Cancel? ✨"
│   ├── Card 2: "Urgency SMS detected · Check now →"
│   └── Card 3: "₹499 bill due tomorrow · Review →"
└── Recent Actions
    ├── "Hotstar cancelled ✓ · Saving ₹299/mo"
    └── "Scam link blocked ✓ · 2 mins ago"

[Screen 2] SUBSCRIPTIONS HUB
├── Toggle: "My Spends" | "Family Spends"
├── The Flow Map (Visual donut/graph)
│   └── Shows: OTT | SaaS | Fitness | Others
├── Monthly total: "₹3,200 / month"
├── Active Subscriptions List
│   ├── [Logo] Netflix ₹649 · Renews 15 Jul
│   │   └── Tap → Screen 10 (Detail)
│   ├── [Logo] Spotify ₹119 · Renews 22 Jul
│   └── [Logo] Unknown ₹299 · Source unclear ⚠
└── Bottom: "Unknown Charges" queue

[Screen 3] VERIFY (QR Scanner) ← Center FAB
├── Full camera viewfinder
├── Scan frame: Animated corners (Electric AI color)
├── Bottom sheet:
│   ├── "Or paste a link / SMS"
│   ├── Input: paste area
│   └── CTA: "Verify Now"
├── Recent scans: last 3 QR codes
└── → Screen 8 (AI Analyzing) on scan

[Screen 4] VAULT (Bank & Security)
├── Top: "🚨 FREEZE EVERYTHING" (Big red button)
│   └── Tap → Confirmation → All accounts frozen
├── Linked Accounts
│   ├── HDFC Savings •••• 4521 [Active ✓]
│   ├── SBI Savings •••• 8834 [Active ✓]
│   └── + Add new account → Screen 22
├── Privacy & AI Controls
│   ├── Toggle: SMS Scanning [ON]
│   ├── Toggle: Call Protection [ON]
│   └── Toggle: Auto-Cancel Trials [ON]
├── Privacy Dashboard
│   └── "0 data sent to cloud" · Tap for proof
└── SOS: "🆘 Call Cyber Cell" (Emergency helpline)
```

---

## Stage 3 — Feature Flows (Screens 8-14, 19-23, 28)

```
[Screen 8] AI ANALYZING (Loading)
├── Animation: Pulsing Shield (NOT spinner)
│   └── Shield scales 1→1.08→1, Electric AI glow, 800ms loop
├── Text cycling:
│   ├── "Scanning payment details..."
│   ├── "Checking fraud database..."
│   └── "Calculating Trust Score..."
└── Branches to → Screen 9A or Screen 9B

[Screen 9A] RED ALERT — SCAM FOUND
├── Full screen: danger red background (#1F0606)
├── Big icon: 🛡️ (red variant)
├── Score: "Trust Score: 12 / 100"
├── Headline: "HIGH RISK — Do Not Pay"
├── Detail: "This QR code matches known scam patterns"
├── Details block:
│   ├── "Payee: Unknown merchant"
│   ├── "Amount requested: ₹8,500"
│   └── "Flagged: 47 times today"
├── Primary CTA: "Block & Report" (danger button)
├── Secondary: "I'll be careful, proceed anyway" (ghost)
└── Bottom: "🆘 Need help? SOS" → Screen 14

[Screen 9B] GREEN ALERT — VERIFIED SAFE
├── Full screen: success tint
├── Big icon: ✅
├── Score: "Trust Score: 96 / 100"
├── Headline: "VERIFIED SAFE — Safe to Pay"
├── Detail: "Swiggy Instamart — Verified Merchant"
├── Details:
│   ├── "Amount: ₹342"
│   ├── "GST included: ₹52"
│   └── "Merchant verified since: 2019"
├── Primary CTA: "Pay via GPay →"
├── Secondary: "Pay via PhonePe →"
└── → Screen 28 (Payment Success) after payment

[Screen 10] SUBSCRIPTION DETAIL PAGE
├── Header: [App Logo + Name]
├── Status badge: "Active · Renewing in 3 days"
├── Monthly cost: "₹649 / month"
├── Annual projection: "₹7,788 / year"
├── Usage stats: "Last opened: 47 days ago"
├── AI Insight Card ✨:
│   └── "You haven't used Netflix in 47 days.
│        Cancel and save ₹7,788 this year."
├── Trial warning (if applicable):
│   └── "Free trial ends tomorrow!"
├── Actions:
│   ├── Primary: "Cancel Subscription" (danger)
│   ├── Secondary: "Pause for 1 month"
│   └── Ghost: "Keep subscription"
└── Cancel tap → Screen 11

[Screen 11] CANCELLATION SUCCESS
├── Animation: Money floating up 🎉
├── Big text: "Done! ₹649 saved this month"
├── Annual saving: "You'll save ₹7,788 this year"
├── Undo snackbar: "Cancelled Netflix · UNDO" (5 sec)
├── AI suggestion card:
│   └── "2 more unused apps detected → Review"
└── CTA: "Back to Subscriptions"

[Screen 12] FAMILY SPEND HUB
├── Toggle: "My Spends" ← | "Family Spends" (active)
├── Family members:
│   ├── 👤 Priya (Wife) — ₹1,200/mo
│   └── 👦 Arjun (Son) — ₹450/mo
├── Each member shows:
│   ├── Their active subscriptions
│   └── Monthly total
└── Tap member → their subscription list

[Screen 13] TRANSACTION & SAFETY LOGS
├── Filter: "All" | "Blocked" | "Cancelled" | "Verified"
├── Date picker tap → Screen 21 (overlay)
├── Log items:
│   ├── 🛡️ Scam blocked · Netflix fake link · 2h ago
│   ├── ✅ Safe verified · Swiggy payment · 5h ago
│   ├── ❌ Cancelled · Hotstar ₹299 · Yesterday
│   └── ⚠ Warning sent · Unknown charge ₹99 · 2d ago
├── Each item: tap for detail
└── Share button → Screen 23 (Victory Card)

[Screen 14] CYBER SOS — HELP
├── Header: "🆘 Emergency Help"
├── Big button: "📞 Call Cyber Cell 1930" (immediate)
├── Options:
│   ├── "Chat with Support" (WhatsApp)
│   ├── "Email incident report"
│   └── "Freeze all accounts now"
├── Quick steps:
│   ├── "1. Don't share OTP with anyone"
│   ├── "2. Freeze your cards immediately"
│   └── "3. File complaint at cybercrime.gov.in"
└── RBI helpline: 14440

[Screen 19] EMPTY STATE
├── Illustration: 🛡️ (shield, calm green)
├── Headline: "Everything looks safe right now! ✨"
├── Body: "No suspicious activity in 30 days.
│         Your finances are fully protected."
└── CTA: "View Full Report"

[Screen 21] DATE PICKER OVERLAY
├── Opens as overlay on top of Screen 13
├── Calendar component
├── Select range: Start → End date
├── CTA: "Apply Filter"
└── Close: tap outside or X

[Screen 22] ADD BANK ACCOUNT
├── Progress: "Step 1 of 3"
├── Search: "Search your bank"
├── Popular banks grid
└── → Bank linking flow (same as Screen 7)

[Screen 23] SHARE VICTORY CARD
├── Card preview:
│   ├── "🛡️ Guardia AI saved me ₹12,400 this year"
│   ├── "3 subscriptions cancelled"
│   ├── "2 scams blocked"
│   └── "Powered by Guardia AI"
├── Share options: WhatsApp, Instagram, Copy
└── Download as image
```

---

## Stage 4 — Account & Settings (Screens 15, 24, 25, 26, 27)

```
[Screen 15] PROFILE & SETTINGS
├── Avatar + Name + Phone
├── Quick stats: "₹24,400 saved | 5 scams blocked"
├── Menu:
│   ├── 🔔 Notifications → Screen 25
│   ├── ✏️ Edit Profile → Screen 27
│   ├── 🔐 Reset PIN → Screen 24
│   ├── 🏦 Manage Banks → Screen 4
│   ├── 🛡️ Privacy Controls
│   └── ❌ Delete Account → Screen 26
└── Version: v1.0.0 · RBI Compliant

[Screen 24] RESET PIN FLOW
├── Step 1: "Verify with OTP" (sent to mobile)
├── Step 2: OTP 6 boxes
├── Step 3: New PIN (6 dots)
├── Step 4: Confirm new PIN
└── → Success toast

[Screen 25] NOTIFICATION CENTER
├── Filter: "All" | "Fraud" | "Subscriptions" | "System"
├── Notification items (newest first):
│   ├── 🛡️ HIGH RISK · Scam link detected · now
│   ├── ⚠️ Netflix renews tomorrow · ₹649
│   ├── ✅ Bank linked successfully
│   └── ℹ️ AI Shield updated
├── Each: tap to see detail / take action
└── "Mark all as read" button

[Screen 26] FREEZE / DELETE ACCOUNT MODAL
├── Opens as overlay (bottom sheet)
├── FREEZE option:
│   ├── Icon: ❄️
│   ├── "Freeze All Accounts"
│   ├── "All linked cards and UPI will be blocked"
│   └── CTA: "Confirm Freeze" (danger)
├── DELETE option:
│   ├── Warning: "This cannot be undone"
│   ├── Type: "DELETE" to confirm
│   └── CTA: "Delete Account" (danger)
└── Cancel: "Go back" (ghost)

[Screen 27] EDIT PROFILE
├── Avatar (tap to change)
├── Input: Full Name
├── Input: Email (optional)
├── Input: Alternate Phone
├── Language preference
└── CTA: "Save Changes"
```

---

## Stage 5 — Error & Edge Cases (Screen 20, 28)

```
[Screen 20] ERROR / OFFLINE SCREEN
├── Illustration: Broken connection
├── Headline: "You're offline"
├── Body: "Some features unavailable. Emergency freeze still works."
├── Available offline:
│   └── ✅ "Freeze All Accounts" button (works offline)
└── Retry: "Try again" button

[Screen 28] PAYMENT SUCCESS FEEDBACK
├── Animation: Confetti / checkmark
├── Amount: "₹342 paid successfully"
├── To: "Swiggy Instamart · Verified ✓"
├── Trust Score: "96/100 — Safe Transaction"
├── Receipt:
│   ├── Transaction ID: #TXN847291
│   └── Time: 30 Jun 2026, 10:32 AM
├── Guardia insight: "You've done 12 safe transactions this month 🎉"
└── Actions: "Share Receipt" | "Go Home"
```

---

## Navigation Connections Map

```
BOTTOM NAV (always visible on Screens 1, 2, 3, 4):
Screen 1 ←→ Screen 2 ←→ Screen 3 ←→ Screen 4

OVERLAYS (open on top of current screen):
Screen 21 (Calendar) ← Screen 13
Screen 23 (Share) ← Screen 13
Screen 26 (Delete Modal) ← Screen 15

BACK NAVIGATION (< Back on all except main tabs):
Screen 10 → Screen 2
Screen 11 → Screen 2
Screen 9A → Screen 3
Screen 9B → Screen 3
Screen 14 → Screen 9A

EMERGENCY (from any screen):
Any → Screen 4 → FREEZE → Frozen state
Screen 9A → Screen 14 (SOS)
```

---

## Screen Count Summary

| Stage | Screens | Count |
|---|---|---|
| Welcome Gate | 5, 6, 7, 16, 17, 18 | 6 |
| Command Center | 1, 2, 3, 4 | 4 |
| Feature Flows | 8, 9A, 9B, 10, 11, 12, 13, 14, 19, 21, 22, 23, 28 | 13 |
| Account & Settings | 15, 24, 25, 26, 27 | 5 |
| Error States | 20 | 1 |
| **TOTAL** | | **29 screens** |
