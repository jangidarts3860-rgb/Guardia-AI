# PRD — Product Requirements Document
## Guardia AI: Your Financial Bodyguard
**Version:** 1.0 | **Platform:** Mobile (iOS + Android) | **Stage:** MVP

---

## 1. Problem Statement

India mein digital payments boom ke saath do bade problems emerge hue hain:

**Problem 1 — Subscription Fatigue (The Money Leak)**
Users multiple apps, OTT platforms, aur SaaS tools subscribe karte hain aur bhool jaate hain. Companies jaan-bujhkar "Cancel" button 4-5 layers andar chhupa deti hain (Dark Patterns / Interface Interference). Result: ₹15,000+ saal ka "Zombie Subscription" waste.

**Problem 2 — Financial Anxiety (The Fear Factor)**
- India mein 2025-26 mein digital fraud 24% badha hai → ₹22,495 Crore loss
- Sabse bade frauds: Investment Scams (76%), Fake UPI Collect Requests
- Current banking apps "Post-Mortem" karti hain — paisa katne ke BAAD alert deti hain
- Users UPI PIN dalte waqt constant anxiety feel karte hain

**The Root Gap:** Koi bhi existing app user ka haath transaction se PEHLE nahi pakadti.

---

## 2. Product Vision

> **"Guardia AI is an invisible financial bodyguard — it protects you before the damage is done, not after."**

An AI-powered financial security overlay that monitors subscriptions, verifies payments, and blocks fraud — all before the user makes a mistake.

---

## 3. Target Users

### Primary — "Forgetful Rohan" (Gen-Z / Millennial, 22-35)
- Tech-savvy, multiple subscriptions
- Falls for Free Trial traps
- Wants: Automation with control
- Pain: ₹1,200 kat gaye ek AI video editor ke liye jo 1 baar use kiya

### Secondary — "Cautious Rajesh" (Parent / Senior, 40-55)
- Digital payments se darta hai
- Family subscriptions manage karta hai
- Wants: Zero-risk security
- Pain: Beti ne TV par "Kids Game Pack" subscribe kar liya, cancel karna impossible laga

---

## 4. Core Features

### MUST-HAVE (MVP)

| Feature | Description | Priority |
|---|---|---|
| **AI Smart Dashboard** | Home screen with Leak Meter, AI Shield Status, Smart Nudges | P1 |
| **Subscription Map** | Visual graph of all active subscriptions + monthly spend | P1 |
| **1-Tap Cancel** | Cancel any subscription directly from the app | P1 |
| **QR / Link Trust Score** | 0-100 risk rating before any payment | P1 |
| **Fraud Alert (Pre-block)** | Block suspicious transactions BEFORE PIN entry | P1 |
| **Onboarding + Bank Link** | Account Aggregator (AA) framework integration | P1 |
| **Freeze Everything Button** | One tap to freeze all connected accounts | P1 |

### SHOULD-HAVE

| Feature | Description | Priority |
|---|---|---|
| **Auto-Cancel Toggle** | Auto cancel before free trial charges | P2 |
| **Family Spend Hub** | Track spouse/kids subscriptions separately | P2 |
| **SMS Scam Detector** | AI reads SMS and flags urgency-based fraud | P2 |
| **Offline Mode** | Basic freeze/unfreeze without internet | P2 |
| **Panic PIN** | Wrong PIN → auto freeze + alert | P2 |

### NICE-TO-HAVE (V2)

| Feature | Description |
|---|---|
| Call-Based Scam Detection | Live warning during suspicious calls |
| Behavior AI Lock | Auto-lock on unusual usage patterns |
| Dark Pattern Detector | Warn users about hidden cancel flows |
| Cyber Cell SOS Integration | Direct helpline connect |

---

## 5. App Flow (User Journey)

```
NEW USER:
Splash → Login/Signup → OTP Verify → PIN Setup →
OS Permissions → Onboarding (3 slides) → Bank Link (3 steps) →
HOME DASHBOARD

EXISTING USER:
Splash → Login → HOME DASHBOARD

FROM HOME:
├── Subscription Hub → Sub Detail → Cancel → Success
├── Verify (QR Scan) → AI Analyzing → Safe/Scam Result
├── Vault → Bank Accounts / Panic Freeze
└── Profile → Settings / Notifications / Edit Profile

EMERGENCY FLOW:
Any Screen → FREEZE EVERYTHING → Locked State
Scam Alert → SOS / Cyber Cell → Help Screen
```

---

## 6. Navigation Structure

**4 Bottom Tabs:**
1. 🏠 **Home** — AI Pulse, Leak Meter, Smart Nudges
2. 💸 **Subs** — Subscription Map, Family Hub, Cancel
3. 🔍 **Verify** (Center FAB) — QR Scanner, Trust Score
4. ⚙️ **Vault** — Bank accounts, Panic Button, Privacy

---

## 7. Success Metrics

| Metric | Target (3 months) |
|---|---|
| Subscriptions cancelled via app | 10,000+ |
| Fraud transactions blocked | 5,000+ |
| Average monthly savings per user | ₹800+ |
| App Store Rating | 4.5+ |
| D30 Retention | 40%+ |
| Trust Score accuracy | 92%+ |

---

## 8. Out of Scope (V1)

- ❌ Direct payment processing (we redirect to GPay/PhonePe)
- ❌ Credit/Debit card issuance
- ❌ Investment / Savings features
- ❌ Web version (Mobile only)
- ❌ International markets (India-first)

---

## 9. Competitive Positioning

| Competitor | Gap | Guardia AI Edge |
|---|---|---|
| GPay / PhonePe | No fraud prevention, just transaction | Pre-payment AI Trust Score |
| Rocket Money | Doesn't understand UPI / India SMS | India-specific UPI Autopay tracking |
| Revolut / Jupiter | Boring alerts users ignore | Critical visual alerts + 1-tap action |

---

## 10. Trust & Privacy Principles

1. **On-Device AI** — Data never leaves user's phone
2. **Explicit Consent** — Every permission explained with reason
3. **Human in the Loop** — SOS button for human help
4. **RBI + DPDP Act 2023 Compliant** — Mentioned in onboarding
