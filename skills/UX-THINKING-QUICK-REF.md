# ux-thinking Skill — Quick Reference Card

**Status:** Tier 1 Authority — Read FIRST before any design decision

---

## Golden Rule

> "Every design decision must have a law. 'It looks good' is not a valid reason."

---

## 37 UX Laws (Quick Reference)

### PRIORITY 1 (Safety & Error Prevention)
1. **Nielsen H5 (Error Prevention)** — Prevent problems before they happen
2. **Don Norman Feedback** — System explains what happened + why + how to fix
3. **Postel's Law** — Accept user input gracefully (forgive mistakes)

### PRIORITY 2 (User Control & Trust)
4. **Nielsen H3 (User Control)** — Users must always have Undo/Cancel
5. **Dieter Rams (Honest)** — Never deceive. No dark patterns. Ever.
6. **Social Proof** — Show trust signals (ratings, verified badges, testimonials)
7. **Scarcity (Honest Only)** — Real urgency only, never fake FOMO

### PRIORITY 3 (Usability)
8. **Fitts's Law** — Big buttons in thumb zone (bottom 1/3)
9. **Hick's Law** — Max 5 choices = decision clarity
10. **Miller's Law** — Chunk info: max 7 items per section
11. **Doherty Threshold** — Feedback within 100ms or user leaves
12. **Zeigarnik Effect** — Show progress = reduced anxiety
13. **Jakob's Law** — Use patterns users already know (mobile nav at bottom)
14. **Goal Gradient** — Visual progress motivates completion
15. **Peak-End Rule** — Make the end memorable (user remembers last moment)
16. **Tesler's Law** — Move complexity to system, not user (auto-fill everything)

### PRIORITY 4 (Aesthetics & Delight)
17. **Aesthetic-Usability** — Polished design feels faster + more trustworthy
18. **Emotional Design (3 levels)** — Visceral (looks) + Behavioral (works) + Reflective (meaning)

---

## 8-Layer Audit Checklist

| Layer | Focus | Pass/Fail |
|-------|-------|-----------|
| **1** | Speed & Efficiency | Hick's, Fitts's, Doherty |
| **2** | Memory & Brain | Miller's, Zeigarnik, Dual Coding |
| **3** | Visual Organization | Gestalt (Proximity, Similarity, Closure) |
| **4** | Complexity Management | Tesler's, Occam's, Pareto, Progressive Disclosure |
| **5** | Psychology & Emotion | Aesthetic-Usability, Goal Gradient, Peak-End, Social Proof |
| **6** | Heuristics + Principles | Nielsen 10 + Don Norman 6 + Shneiderman 8 |
| **7** | Anti-Patterns | No dark patterns, no confirmshaming, no shame-based declines |
| **8** | Accessibility (WCAG) | **NON-NEGOTIABLE** — Contrast 4.5:1, 44px touch targets |

---

## Screen Type → Auto-Activated Laws

```
NAVIGATION/MENU       → Hick's + Jakob's + Serial Position + Progressive Disclosure
BUTTON/CTA            → Fitts's + Affordance + Von Restorff + Color Psychology
FORM                  → Miller's + Tesler's + Error Prevention + Cognitive Load
ONBOARDING            → Zeigarnik + Goal Gradient + Fogg + Peak-End
PRODUCT LISTING       → Proximity + Similarity + Social Proof + Paradox of Choice
CHECKOUT/PAYMENT      → Tesler's + Error Prevention + Doherty + Trust + Goal Gradient
EMPTY STATE           → Fogg Model + Zeigarnik + Affordance + Dual Coding
DASHBOARD             → Miller's + Proximity + F-pattern + Aesthetic-Usability
FINTECH SCREEN        → Trust signals + Tesler's + Error Prevention + Cognitive Load
ERROR SCREEN          → Nielsen H9 + Don Norman + Postel's + Empathy
```

---

## Conflict Resolution Priority

When 2 laws clash:

```
PRIORITY 1 > PRIORITY 2 > PRIORITY 3 > PRIORITY 4

Example:
Fitts's Law (big button, P3) vs. Aesthetic-Usability (minimal, P4)
→ FITTS'S WINS — make the big button anyway
→ Then polish it to feel minimal (apply P4 after P3 is met)

Example 2:
Scarcity (fake urgency, P4 if dishonest) vs. Dieter Rams (honest, P2)
→ DIETER RAMS WINS — never use fake urgency
→ Use real urgency or don't use urgency at all
```

---

## Fintech-Specific Rules (GUARDIA AI)

**These override generic advice:**

```
TRUST SIGNALS (non-negotiable):
- Security badge near money actions ("Your data is encrypted")
- Bank/RBI logos if licensed
- Real customer count ("50L+ users" — honest only)
- Clear fees shown BEFORE final confirm (never hidden after)

COGNITIVE LOAD RULES:
- Never show 2 money amounts without clear label
- Balance prominently visible — never hidden
- Transaction history = chronological (never randomized)
- "Are you sure?" confirm for amounts > ₹500

ERROR RECOVERY:
- Error message must have: What + Why + Exact Fix
- Add "Your money is safe" line if transaction fails mid-flow
- Never leave user on error screen without path forward

CLARITY RULES:
- Exchange rates with timestamp ("As of 2:34 PM")
- Estimated time for transfers — never "variable"
- All unit conversions explicit (₹500 = 6.25 USD, not hidden)
```

---

## Anti-Patterns (NEVER DO THESE)

```
❌ Color as only indicator (add icon + text)
❌ Icon-only nav without label
❌ Placeholder text as label
❌ Hidden costs ("Surprise! +₹50 tax")
❌ Pre-checked opt-in boxes
❌ Fake urgency ("Only 3 left!" when really 300)
❌ Shame-based decline ("No, I don't want to save money")
❌ Fake avatars / stock photos as trust signals
❌ Auto-play video with sound
❌ Password masking that prevents copy-paste
```

---

## Fast Decision-Making

**"Should we do X?"**

1. Which law does X satisfy?
2. Does X violate a higher-priority law?
3. If yes to #2 → DON'T DO X
4. If no to #2 → DO X + explain the law
5. Write it in design specs: "Following [Law Name] because [reason]"

---

## For Guardia AI Specifically

**Core Laws for Every Screen:**

1. **Tesler's Law** — Auto-fill everything possible (OTP, saved cards, phone prefix)
2. **Error Prevention** — Prevent wrong transactions (always confirm)
3. **Trust Signals** — Security, verified, bank logos visible
4. **Doherty Threshold** — Instant feedback on all actions (<100ms)
5. **Peak-End Rule** — End on success moment (celebrate completion)
6. **Goal Gradient** — Show progress through payment/verification flow

**Fintech Non-Negotiables:**

- Layer 8 (Accessibility) ALWAYS — contrast, readable numbers, error recovery
- Error Prevention > Conversion (never hide warnings to boost conversions)
- Undo where possible (for pending transfers, show "Cancel" while verifying)

---

**Next Step:** Load the full ux-thinking skill before designing any screen.
