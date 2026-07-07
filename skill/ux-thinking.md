---
name: ux-thinking
description: >
  Senior UX Thinking Layer — Deepak's complete UX Brain. ALWAYS load this skill FIRST
  before any design task. Do not skip. Mandatory for: design a screen, create UI,
  wireframe, UX audit, review design, onboarding, forms, navigation, design system,
  component design, case study, client presentation, design critique.
  Trigger: "design banao", "screen banao", "UI improve karo", "UX audit karo",
  "wireframe", "website banana hai", "landing page", "dark pattern check karo",
  "mobile app", "SaaS design", "e-commerce", "fintech", "food app", "kaunsa law lagega",
  "design decision", "component banao", "kaisa dikhna chahiye", "kya galat hai",
  "UX kya hona chahiye", "portfolio case study", "design justify karo",
  "layout suggest karo", "UI kaise honi chahiye", "client ko dikhana hai".
  Validates 37 UX Laws, Nielsen 10, Don Norman 6, Fogg, Hook, Shneiderman 8,
  Dieter Rams 10, Color Psychology, Platform rules, Industry patterns, WCAG
  Accessibility, Anti-patterns, and Law Conflict Resolution hierarchy.
---

# UX Brain v3 — Central Commander

> THIS SKILL IS THE SOURCE OF TRUTH.
> All other skills (figma-design, ui-ux-pro-max, design-taste-frontend, awesome-design-md,
> hooked-ux, interaction-prototyping-strategist) are execution tools.
> They follow UX Brain's decisions. UX Brain does NOT follow theirs.

---

## AUTHORITY HIERARCHY (Read First, Always)

```
TIER 1 — UX Brain (this skill)       ← FINAL AUTHORITY
  37 Laws + 4 Frameworks + Conflict Hierarchy

TIER 2 — Platform Rules              ← overrides aesthetics, not laws
  iOS/Android HIG, Web standards, WCAG

TIER 3 — Industry Patterns           ← overrides generic advice
  Fintech, Food, E-com, SaaS patterns (industry-patterns.md)

TIER 4 — Execution Skills            ← follow Tier 1-3 decisions
  figma-design → executes in Figma
  ui-ux-pro-max → provides style/component database
  design-taste-frontend → enforces code quality
  awesome-design-md → brand INSPIRATION only (not rules)
  hooked-ux → Hook Model depth reference
  interaction-prototyping-strategist → motion specs

TIER 5 — Brand References            ← inspiration only, never overrides laws
  awesome-design-md files (Stripe.md, Linear.md, etc.)
  If a brand pattern violates a UX law → LAW WINS, flag the conflict.
```

### Cross-Skill Conflict Rules

```
FONT/COLOR CONFLICT:
  design-taste-frontend bans purple/AI colors.
  ui-ux-pro-max recommends 161 palettes (some purple).
  awesome-design-md references brands using purple (Stripe).
  WINNER: If purple needed for WCAG contrast (Layer 8) → ACCESSIBILITY WINS (Priority 1).
           If purple is just aesthetic choice → design-taste-frontend ban applies.
  RULE: UX Brain decides color based on function, not aesthetic preference.

FONT CONFLICT:
  design-taste-frontend mandates Geist/Satoshi.
  ui-ux-pro-max has 57 font pairings.
  WINNER: If task is code/dev output → design-taste-frontend rules.
           If task is Figma/visual design → ui-ux-pro-max + awesome-design-md give options.
  RULE: Context determines winner. UX Brain calls it.

HOOK MODEL CONFLICT:
  hooked-ux and UX Brain behavioral layer (Step 6) both describe Hook Model.
  WINNER: UX Brain's Step 6 is the canonical summary. hooked-ux is extended depth.
  RULE: Use Step 6 first. Read hooked-ux only if deep engagement mechanics needed.

UX LAW CONFLICT:
  figma-design has its own ux-laws.md reference file.
  ui-ux-pro-max has 99 UX guidelines.
  WINNER: UX Brain's 37 Laws + 4 Frameworks = canonical. Other files are secondary.
  RULE: If a law from another skill contradicts UX Brain → UX Brain wins.
```

---

## ACTIVATION PROTOCOL

Jab bhi design task aaye, is sequence mein process karo:

1. AUTHORITY  → This skill loaded? Other skills may execute only after this runs.
2. CONTEXT    → Platform + Industry + User type identify karo
3. LAWS       → Relevant laws auto-activate karo (screen type se)
4. CONFLICT   → Agar 2 laws ya 2 skills conflict karein → hierarchy resolve karo
5. VALIDATE   → 8-layer checklist run karo
6. OUTPUT     → Law-backed recommendations (Severity + Effort + Brain Note)
7. WARN       → Anti-patterns flag karo agar present hain

---

## STEP 1: Context Identification

| Question | Options | Reference |
|----------|---------|-----------|
| Platform? | Mobile / Web / Tablet / Cross-platform | platform-specific.md |
| Industry? | Food / E-com / Fintech / SaaS / Social / Health / EdTech | industry-patterns.md |
| Screen type? | Home / Form / Onboarding / List / Checkout / Empty / Error / Dashboard | laws-by-screen.md |
| User type? | New beginner / Returning / Expert power user | Nielsen H7 |
| Goal? | Convert / Retain / Engage / Educate / Transact / Present/Justify | behavioral-design.md |

Platform default: Mobile-first (India mein 85%+ traffic mobile)

---

## STEP 2: Laws Auto-Activation by Screen Type

```
NAVIGATION/MENU    → Hick's + Serial Position + Jakob's + Progressive Disclosure + Paradox of Choice
BUTTON/CTA         → Fitts's + Affordance + Von Restorff + Color Psychology + Weber's Law
FORM               → Miller's + Tesler's + Error Prevention + Postel's + Cognitive Load
ONBOARDING         → Zeigarnik + Goal Gradient + Fogg + Doherty + Peak-End + Dual Coding
PRODUCT LISTING    → Proximity + Similarity + Common Region + Closure + Social Proof + Paradox of Choice
CHECKOUT/PAYMENT   → Tesler's + Error Prevention + Doherty + Shneiderman Closure + Trust + Goal Gradient
EMPTY STATE        → Fogg Model + Zeigarnik + Affordance + Dual Coding
NOTIFICATION       → Hook Model Trigger + Fogg Prompt + Scarcity (honest only)
DASHBOARD          → Miller's + Proximity + Figure-Ground + F-pattern + Aesthetic-Usability + Dual Coding
ERROR SCREEN       → Nielsen H9 + Don Norman Feedback + Postel's + Cognitive Load
LANDING PAGE       → Z-pattern + Fogg + Social Proof + Scarcity + Peak-End + Dual Coding
PROFILE/SETTINGS   → Pareto + Recognition>Recall + User Control + Progressive Disclosure
MODAL/OVERLAY      → Doherty + Nielsen H3 + Cognitive Load + Don Norman Constraints
ANIMATION/MOTION   → Weber's Law + Microinteractions + Doherty Threshold
FINTECH SCREEN     → Trust signals + Tesler's + Error Prevention + Cognitive Load + Scarcity (honest)
```

### STEP 2B: Law Conflict Resolution Hierarchy

Jab 2 laws clash karein, is priority order use karo:

```
PRIORITY 1 — Safety & Error Prevention  [HIGHEST — overrides everything]
  Nielsen H5 (Error Prevention) beats everything.
  Koi bhi law irreversible action prevent karne se zyada important nahi.
  Example: Security 2FA steps > Fogg Ability (fewer friction steps)

PRIORITY 2 — User Control & Trust
  Nielsen H3 (Control) + Dieter Rams (Honest) = second tier.
  User ka trust tod ke no law justify hota.
  Example: Honest scarcity > Conversion-boosting fake urgency

PRIORITY 3 — Usability (Core task completion)
  Fitts's + Hick's + Miller's + Doherty = third tier.
  Task complete hona aesthetic se zyada important.
  Example: Big full-width CTA > minimal aesthetic preference

PRIORITY 4 — Aesthetics & Delight  [LOWEST]
  Aesthetic-Usability + Peak-End + Emotional Design = last tier.
  Jab core UX solid ho tab delight add karo.

COMMON CONFLICTS:

Fitts's (big CTA) vs Aesthetic (minimal)          → FITTS'S WINS (P3 > P4)
Von Restorff (1 highlight) vs Client (3)           → VON RESTORFF WINS
Hick's (fewer) vs Business (show all)              → HICK'S WINS + progressive disclosure
Scarcity (urgency) vs Honest (Dieter Rams)         → HONEST WINS (P2)
Fogg Ability (less friction) vs Security           → SECURITY WINS (P1)
WCAG contrast need vs design-taste color ban       → WCAG WINS (P1 — accessibility)
Brand ref violates UX law                          → UX LAW WINS (Tier 1 > Tier 5)
```

---

## STEP 3: 8-Layer UX Audit Checklist

### Layer 1 — Speed & Efficiency
- [ ] Hick's Law: Nav items max 5? Progressive disclosure for more?
- [ ] Fitts's Law: Primary CTA = large, thumb zone (bottom 1/3), full-width?
- [ ] Doherty Threshold: Loading states for ALL async ops? No blank screens?
- [ ] Paradox of Choice: Too many options causing paralysis? Reduce to essentials.

### Layer 2 — Memory & Brain
- [ ] Miller's Law: Max 7 items per section? Forms broken into steps?
- [ ] Zeigarnik Effect: Progress visible if multi-step?
- [ ] Recognition > Recall: Suggestions/recents shown? No blank inputs?
- [ ] Cognitive Load: Extraneous complexity removed? Smart defaults set?
- [ ] Dual Coding: Important info = text + visual together? (2x retention)

### Layer 3 — Visual Organization (Gestalt)
- [ ] Proximity: Related elements grouped tightly?
- [ ] Similarity: Same function = same visual style?
- [ ] Common Region: Cards/borders define groups?
- [ ] Closure: Carousel last card half-visible?
- [ ] Continuity: Steps/flow visually connected?
- [ ] Figure-Ground: Foreground clear from background?
- [ ] Pragnanz: Icons simple (max 2-3 shapes)?
- [ ] F/Z Pattern: Important content in scan path?

### Layer 4 — Complexity Management
- [ ] Tesler's Law: Auto-fill used? Complexity moved to system?
- [ ] Occam's Razor: Every element necessary?
- [ ] Pareto: Top 20% features prominent?
- [ ] Von Restorff: Only 1 thing highlighted per view?
- [ ] Progressive Disclosure: Advanced options hidden until needed?

### Layer 5 — Psychology & Emotion
- [ ] Aesthetic-Usability: Design polished at visceral level?
- [ ] Goal Gradient: Progress/completion visible?
- [ ] Social Proof: Trust signals present?
- [ ] Peak-End Rule: Last state memorable/delightful?
- [ ] Emotional Design: All 3 levels addressed? (Visceral, Behavioral, Reflective)
- [ ] Color Psychology: Colors match semantic meaning? Indian context considered?
- [ ] Weber's Law: Feedback/change visible enough to perceive? (>14% change threshold)

### Layer 6 — Heuristics + Principles
- [ ] H1: System status visible?
- [ ] H2: Real-world language (no jargon)?
- [ ] H3: Undo/Cancel available?
- [ ] H4: Consistent design throughout?
- [ ] H5: Errors prevented before they happen?
- [ ] H6: Recognition > Recall?
- [ ] H7: Shortcuts for expert users?
- [ ] H8: Minimalist design?
- [ ] H9: Error = What + Why + How to fix?
- [ ] H10: Contextual help available?
- [ ] Don Norman: Visibility, Feedback, Constraints, Mapping, Consistency, Affordance?
- [ ] Shneiderman 8: All 8 golden rules met?
- [ ] Dieter Rams: Honest? Unobtrusive? Long-lasting? Thorough to the last detail?

### Layer 7 — Anti-Pattern Check
- [ ] No hidden costs?
- [ ] No pre-checked opt-in boxes?
- [ ] Cancellation as easy as signup?
- [ ] No fake urgency/scarcity?
- [ ] No shame-based decline options (confirmshaming)?
- [ ] Paste allowed in all inputs?
- [ ] Back button behaves expectedly?
- [ ] No notification bombing?
- [ ] No icon-only nav without labels?
- [ ] No multiple CTAs cannibalizing each other? (1 primary max per screen)
- [ ] No disguised ads (content that looks like UI)?
- [ ] Infinite scroll ethical? (not weaponized attention theft)

Read anti-patterns.md for complete dark pattern library.

### Layer 8 — Accessibility (WCAG) [NON-NEGOTIABLE — OVERRIDES AESTHETIC DECISIONS]
- [ ] Color contrast: Normal text 4.5:1 min, Large text 3:1 min?
- [ ] Touch targets: 44x44px min on mobile?
- [ ] Not color-only: Info conveyed by color also by shape/label?
- [ ] Font size: Min 14px body text on mobile, 16px ideal?
- [ ] Error states: Never only red — also icon + text?
- [ ] Screen reader: Interactive elements have labels?
- [ ] Motion: Animations reducible for motion-sensitive users?
- [ ] Tap targets: Enough spacing between targets (8px min gap)?

---

## STEP 4: Platform Layer

```
MOBILE:
- Touch targets min 44x44px (Fitts's)
- Primary CTA bottom 1/3 thumb zone
- Tab bar max 5 items (Hick's)
- Bottom sheets > top modals
- Skeleton screens for network (Doherty)
- Gesture affordance: Swipe/long-press must be discoverable

WEB:
- F-pattern: Key info top-left
- Z-pattern: For landing pages
- Hover states on all interactive elements
- Keyboard navigation support

TABLET:
- Master-detail layout
- Both portrait + landscape designed
- Same touch targets as mobile
```

Read platform-specific.md for complete rules.

---

## STEP 5: Industry Layer

```
FOOD DELIVERY → Veg/non-veg indicators, real delivery time, tracking
E-COMMERCE    → Product card structure, filter UX, checkout flow
FINTECH       → Trust signals + security indicators + error recovery +
                reduce cognitive load for financial decisions +
                NEVER ambiguous money states + clear confirmation always
SAAS          → Keyboard shortcuts, density OK, power user features
SOCIAL        → Hook model loop, engagement design, notifications
HEALTH        → Streak design, motivation, progress visualization
EDTECH        → Dual Coding (text+visual), spaced repetition, progress
```

Read industry-patterns.md for detailed patterns.

---

## STEP 6: Behavioral Design Layer

```
USER NOT TAKING ACTION?
Fogg: B = Motivation x Ability x Prompt
- M: Is value/motivation clear?
- A: Is friction minimal? (1-2 steps max)
- P: Is there a trigger at right moment?

USER NOT COMING BACK?
Hook: Trigger -> Action -> Variable Reward -> Investment
- Trigger: Internal emotion -> app
- Action: 1 tap, zero thought
- Variable Reward: Unpredictable positive content
- Investment: User builds something (posts, streaks, network)
[Deep mechanics: read hooked-ux skill]

TOO MANY OPTIONS — USER PARALYZED?
Paradox of Choice: Reduce options ruthlessly.
- More than 7 choices = decision fatigue
- Recommend 1 "best" option (Jakob's + Hick's combined)
- Default pre-selected = reduces cognitive burden

DESIGN CHANGE NOT NOTICED?
Weber's Law: Change must be proportional to be perceived.
- Button state change: Color shift >14% different
- Micro-feedback: Must be visually distinct to register
```

Read behavioral-design.md for full framework.

---

## STEP 7: Complete Law Reference (37 Laws)

| # | Law | Core Use Case |
|---|-----|--------------|
| 1 | Fitts's Law | CTA size + placement |
| 2 | Hick's Law | Navigation, choices |
| 3 | Miller's Law | Forms, info chunks |
| 4 | Jakob's Law | Familiar patterns |
| 5 | Doherty Threshold | Loading states |
| 6 | Zeigarnik Effect | Progress indicators |
| 7 | Goal Gradient Effect | Near-completion motivation |
| 8 | Von Restorff | Visual hierarchy |
| 9 | Pareto Principle | Feature prioritization |
| 10 | Serial Position Effect | List ordering |
| 11 | Tesler's Law | Auto-fill, friction removal |
| 12 | Aesthetic-Usability | Polished first impressions |
| 13 | Occam's Razor | Simplicity |
| 14 | Postel's Law | Input flexibility |
| 15 | Peak-End Rule | Memorable moments |
| 16 | Proximity (Gestalt) | Element grouping |
| 17 | Similarity (Gestalt) | Visual consistency |
| 18 | Common Region (Gestalt) | Card/border grouping |
| 19 | Closure (Gestalt) | Scroll affordance |
| 20 | Continuity (Gestalt) | Flow/step connection |
| 21 | Figure-Ground (Gestalt) | Content vs background |
| 22 | Pragnanz (Gestalt) | Icon simplicity |
| 23 | Social Proof | Trust signals |
| 24 | Scarcity Principle | Urgency (honest only) |
| 25 | Fogg Behavior Model | B = M x A x P |
| 26 | Hook Model | T -> A -> VR -> I |
| 27 | Krug's Law | Self-evident design |
| 28 | F-Pattern / Z-Pattern | Eye tracking, layout |
| 29 | Emotional Design (3 levels) | Visceral/Behavioral/Reflective |
| 30 | Progressive Disclosure | Hide complexity until needed |
| 31 | Color Psychology | Color = meaning |
| 32 | Microinteraction Design | Feedback through motion |
| 33 | Information Architecture | Structure, labels, navigation |
| 34 | Cognitive Load Theory | Reduce extraneous load |
| 35 | Paradox of Choice | Fewer options = more action |
| 36 | Weber's Law | Perceivable change threshold |
| 37 | Dual Coding Theory | Text + visual = 2x retention |

FRAMEWORKS:
- Nielsen's 10 Heuristics    → usability evaluation (canonical)
- Don Norman's 6 Principles  → interaction design (canonical)
- Shneiderman's 8 Rules      → interface design (canonical)
- Dieter Rams' 10 Principles → product philosophy (canonical)

---

## STEP 8: Output Format

Every design recommendation must use this exact format:

```
DESIGN DECISION: [What to change/design]

SEVERITY:  Critical (blocks task) | High (damages UX) | Nice-to-have (polish)
EFFORT:    Quick win (<1hr) | Medium (1 day) | Big change (1 week+)

LAW/PRINCIPLE: [Which law — be specific]
DO THIS: [Exactly what to do — no vague words]
EXAMPLE: [Indian app that does this right]
AVOID: [Specific anti-pattern]

BRAIN NOTE: [1-2 sentence psychology explanation — why user brain responds this way]
```

Sort output: Critical first -> High -> Nice-to-have.
Brain Note = the "why" behind the decision — makes designs defensible to clients.

---

## STEP 9: Fintech Special Layer

Fintech = highest cognitive load + highest trust stakes. Extra rules beyond standard:

```
TRUST SIGNALS (non-negotiable):
- Security badge visible near any money action
- "Your data is encrypted" near sensitive inputs
- Bank/RBI logos if licensed
- Real customer count ("50L+ users trust us") — honest only

COGNITIVE LOAD RULES:
- Never show 2 money amounts on same line without clear label
- Balance prominently shown — never hidden
- Transaction history = chronological, never random order
- "Are you sure?" confirmation for all transactions > ₹500

ERROR RECOVERY (fintech errors = money fear):
- Error message: What happened + Why + Exact fix + How long
- "Your money is safe" line if transaction fails mid-flow
- Never leave user on error screen without a path forward

CLARITY RULES:
- Fees shown BEFORE final confirm — never after
- Exchange rate shown with clear timestamp ("Rate as of 2:34 PM")
- Estimated time for transfers — never "variable"
```

---

## STEP 10: Portfolio / Case Study Mode

Jab design decisions ko client ya employer ko justify karna ho:

```
DECISION JUSTIFICATION FORMAT:
"Maine [design decision] choose kiya kyunki [Law Name] kehta hai [principle].
Research shows [user psychology reason].
[Indian app example] isse [result] ke liye use karta hai.
Alternative [other option] consider kiya tha lekin [why rejected — which law wins]."
```

---

## Reference Files — When to Read

| File | Read When |
|------|----------|
| laws-by-screen.md | Screen-type specific laws + checklists |
| platform-specific.md | Mobile/Web/Tablet complete rules |
| industry-patterns.md | Industry-specific patterns |
| behavioral-design.md | Engagement, retention, habit design |
| anti-patterns.md | Dark patterns + all anti-pattern categories |
| missing-laws.md | Laws 27-37 detailed explanations |
| audit-templates.md | Ready-made audit checklists |

---

## Golden Rules (v3)

1. Every decision needs a law — "Achha lagta hai" NAHI chalega
2. Mobile-first always — India = mobile dominant, one-handed use
3. Friction is the enemy — Remove every unnecessary step
4. User is not the problem — Bad design is the problem
5. Test edge cases — Error, empty, loading, offline states
6. Honest always — No dark patterns, ever. Dieter Rams > Business pressure.
7. Best UX is invisible — User completes goal without noticing design
8. Severity first — Fix Critical before polishing Nice-to-have
9. Conflict? Follow Authority Hierarchy — Tier 1 always wins
10. Accessibility = non-negotiable — Layer 8 runs on every project
11. Brain Note on every recommendation — design must be explainable
12. This skill is Source of Truth — no other skill overrides it