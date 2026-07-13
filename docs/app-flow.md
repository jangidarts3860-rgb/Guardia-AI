# App Flow Document
## Guardia AI — Complete Recruiter-Ready Flow
**Version:** 2.0 (React Router & Recruiter Focus) | **Navigation:** Bottom Tabs (4) + Floating Action Button (FAB)

---

## Overview

```
Total Screens: 28
Architecture: React Router + Zustand (Global State)
Target Persona for MVP: UI/UX Interviewers & Recruiters
Core Tabs: Home | Subs | [VERIFY FAB] | Vault
Auth Focus: Seamless standard patterns with bypass for recruiters
```

---

## Stage 1 — The Welcome & Auth Gate

> **Recruiter Note:** This flow mimics production apps perfectly. Fake numbers and OTPs (e.g. `123456`) are accepted instantly to prevent recruiter friction.

```
[/splash] SPLASH SCREEN
├── Logo: "🛡️ Guardia AI"
├── Tagline: "Your Financial Bodyguard"
├── Electric AI pulse animation on logo
└── Auto-jump after 2 seconds → /login

[/login] LOGIN PAGE
├── Header: "Welcome back"
├── Input: Mobile Number (+91)
├── Input: Security PIN (6-digit)
├── CTA: "Login" (Primary button) → /home
├── Bottom Links:
│   ├── "Forgot PIN?" → /welcome-back
│   └── "New user? Create Account" → /create-account
└── Note: Accepts any dummy input for recruiters.

[/create-account] SIGNUP — Identity
├── Title: "Create Account"
├── Input: Full Name
├── Input: Mobile Number (+91)
├── CTA: "Send OTP"
└── → /verify-otp

[/verify-otp] SIGNUP — OTP Verification
├── Title: "Enter OTP sent to +91 XXXXX"
├── OTP: 6 boxes (accepts 123456)
├── Timer: "Resend in 0:42"
└── → /create-pin

[/create-pin] SIGNUP — Security PIN Setup
├── Title: "Create your 6-digit Guardian PIN"
├── PIN: 6 dot inputs
├── Confirm PIN: Re-enter
└── → /onboarding (For new users only)

[/onboarding] ONBOARDING WALKTHROUGH (3 slides)
├── SLIDE 1 — "We stop fraud before it happens"
├── SLIDE 2 — "See where every rupee goes"
├── SLIDE 3 — "Your data stays on your phone"
├── CTA: "Next / Skip" 
└── → /permissions

[/permissions] OS PERMISSIONS
├── Title: "Give Guardia AI its superpowers"
├── Requests: Camera, SMS, Notifications
├── Recruiter Bypass: "Skip for now" button available
├── CTA: "Grant Permissions"
└── → /link-bank

[/link-bank] BANK LINKING (Account Aggregator)
├── Title: "Securely connecting via RBI's AA Framework"
├── Search popular banks
├── Recruiter Bypass: "Do this later" button available
└── → /home
```

---

## Stage 2 — The Command Center (Main Tabs)

> 4 main tabs always visible at bottom via React Router layout.

```
[/home] HOME DASHBOARD ← Default tab
├── Top Bar: "Good morning 👋" + Avatar
├── AI Shield Status: Active pulse
├── The Leak Meter: "₹850 wasted this month"
├── Smart Nudges: AI Cards (Horizontal scroll)
├── Recent Actions
└── Dev Feature: "Reset App" in profile resets dummy data for recruiters.

[/subs-dashboard] SUBSCRIPTIONS HUB
├── Toggle: "My Spends" | "Family Spends"
├── The Flow Map (Donut chart visual)
├── Active Subscriptions List
└── Unknown Charges Queue

[/scan-qr] VERIFY (QR Scanner) ← Center FAB
├── Opens as an overlay/modal on top of current path
├── Full camera viewfinder with animated corners
├── Bottom sheet: "Or paste a link / SMS"
└── Action: Scan triggers → /analyzing-merchant

[/vault] VAULT (Bank & Security)
├── Top: "🚨 FREEZE EVERYTHING" (Big red button)
├── Linked Accounts list
├── Privacy & AI Controls (Toggles)
└── Privacy Dashboard stats
```

---

## Stage 3 — Feature Flows

```
[/analyzing-merchant] AI ANALYZING (Loading)
├── Pulsing Shield animation
├── Text cycling: Scanning... Checking... Calculating...
└── Routes to either ?result=scam or ?result=safe

[/scam-detected] RED ALERT — SCAM FOUND
├── Full screen: danger red background
├── Trust Score: 12 / 100
├── CTA: "Block & Report" (danger)
└── CTA: "I'll be careful, proceed anyway" (ghost)

[/merchant-verified] GREEN ALERT — VERIFIED SAFE
├── Full screen: success tint
├── Trust Score: 96 / 100
├── Primary CTA: "Pay via GPay →"
└── Action → /receipt-dark (Payment Success)

[/sub-detail] SUBSCRIPTION DETAIL PAGE
├── Shows cost, usage stats, and AI insights.
├── Action: "Cancel Subscription" → /cancel-success
└── Recruiter Note: Pressing "Back" calls navigate(-1).

[/cancel-success] CANCELLATION SUCCESS
├── Money floating animation
├── Savings calculation shown
└── Recruiter Note: Triggering this reveals the "Empty State" on /subs-dashboard

[/activity-log] TRANSACTION & SAFETY LOGS
├── Filterable timeline of blocked scams and safe payments.
└── Share action → /your-win

[/emergency] CYBER SOS — HELP
├── Emergency Help dialer (1930)
└── Quick steps for cybercrime reporting.
```

---

## Stage 4 — Edge Cases & Recruiter Enhancements

```
[/offline] OFFLINE / ERROR STATE
├── Glassmorphic offline overlay.
├── Shows "Local AI Active, Cloud Sync paused".
└── Allows emergency "Freeze Accounts" offline.

[EMPTY STATES] 
├── When no subscriptions: "No hidden subscriptions found!"
├── When no banks linked: "Your vault is empty."
└── Visually premium illustrations (not just blank text).

[DEMO DATA vs RESET]
├── App initializes with populated dummy data to show UI capabilities.
└── /me-profile contains a "Reset Demo" button for recruiter to test empty states.
```

---

## Navigation Connections Map

```
BOTTOM NAV (Global Layout):
/home ←→ /subs-dashboard ←→ /vault ←→ /me-profile

OVERLAYS:
/scan-qr (Opens over existing route)

BACK NAVIGATION:
Uses `useNavigate(-1)` to dynamically return to the exact previous route without jarring hard-coded jumps.
```