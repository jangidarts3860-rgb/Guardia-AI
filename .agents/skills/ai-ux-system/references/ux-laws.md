# UX Laws — Canonical Reference (37 Laws + Conflict Hierarchy)

> **Source of Truth** for all UX law decisions. Other skills reference this file.
> Version: 3.0 | Updated: 2026-07-12

---

## 37 Canonical UX Laws

| # | Law | Core Use Case | Key Principle |
|---|-----|--------------|---------------|
| 1 | **Fitts's Law** | CTA size + placement | Larger, closer targets = faster acquisition. Primary CTA = full-width, thumb zone. |
| 2 | **Hick's Law** | Navigation, choices | Decision time ∝ log₂(choices). Max 5 nav items; progressive disclosure for more. |
| 3 | **Miller's Law** | Forms, info chunks | Working memory ~7±2. Chunk info; break forms into steps of ≤7 fields. |
| 4 | **Jakob's Law** | Familiar patterns | Users expect conventions. Follow platform/category norms unless evidence supports change. |
| 5 | **Doherty Threshold** | Loading states | <400ms feedback sustains attention. Skeleton screens for all async ops. |
| 6 | **Zeigarnik Effect** | Progress indicators | Incomplete tasks stay top-of-mind. Show progress in multi-step flows. |
| 7 | **Goal Gradient Effect** | Near-completion motivation | Motivation ↑ near completion. Visual progress bar on checkout/onboarding. |
| 8 | **Von Restorff Effect** | Visual hierarchy | One distinct element attracts attention. Only ONE highlight per view. |
| 9 | **Pareto Principle** | Feature prioritization | 20% features drive 80% value. Surface top tasks; hide the rest. |
| 10 | **Serial Position Effect** | List ordering | First & last items recalled best. Critical actions = position 1 or 5 (nav). |
| 11 | **Tesler's Law** | Auto-fill, friction removal | Irreducible complexity exists. Move it to system (auto-fill, smart defaults). |
| 12 | **Aesthetic-Usability Effect** | First impressions | Polished UI feels easier. Visceral polish matters — but can't fix broken UX. |
| 13 | **Occam's Razor** | Simplicity | Simplest solution usually correct. Every element must justify existence. |
| 14 | **Postel's Law** | Input flexibility | Be liberal in what you accept, conservative in what you send. Flexible inputs, clear errors. |
| 15 | **Peak-End Rule** | Memorable moments | Memory = peak moment + end. Design delightful peak + successful completion. |
| 16 | **Proximity (Gestalt)** | Element grouping | Nearby = related. Tight groups for related controls; space between sections. |
| 17 | **Similarity (Gestalt)** | Visual consistency | Same function = same style. Consistent button variants, card styles, icon weights. |
| 18 | **Common Region (Gestalt)** | Card/border grouping | Boundaries define groups. Cards, fieldsets, background regions. |
| 19 | **Closure (Gestalt)** | Scroll affordance | Partial content implies more. Last carousel card half-visible. |
| 20 | **Continuity (Gestalt)** | Flow/step connection | Aligned paths guide eye. Stepper lines, wizard progress bars. |
| 21 | **Figure-Ground (Gestalt)** | Content vs background | Foreground must separate clearly. Contrast, elevation, focus states. |
| 22 | **Prägnanz (Gestalt)** | Icon simplicity | Simplest interpretable form. Icons ≤3 shapes; avoid decorative complexity. |
| 23 | **Social Proof** | Trust signals | Verified evidence builds trust. Real reviews, user counts, trust badges. |
| 24 | **Scarcity Principle** | Urgency (honest only) | Genuine scarcity motivates. Fake scarcity destroys trust (Dieter Rams). |
| 25 | **Fogg Behavior Model** | B = M × A × P | Action needs Motivation × Ability × Prompt. All three must align. |
| 26 | **Hook Model** | T → A → VR → I | Trigger → Action → Variable Reward → Investment. Ethical retention only. |
| 27 | **Krug's Law** | Self-evident design | "Don't make me think." Clear labels > clever ones. Obvious affordances. |
| 28 | **F-Pattern / Z-Pattern** | Eye tracking, layout | F-pattern: content-heavy. Z-pattern: landing pages. Place key info in scan path. |
| 29 | **Emotional Design (3 levels)** | Visceral/Behavioral/Reflective | Visceral (look), Behavioral (use), Reflective (meaning). All three needed. |
| 30 | **Progressive Disclosure** | Hide complexity | Advanced options hidden until needed. "More options" pattern. |
| 31 | **Color Psychology** | Color = meaning | Red=error/danger, Green=success, Blue=trust, Orange=warning. Indian context: Green=UPI/money. |
| 32 | **Microinteraction Design** | Feedback through motion | Trigger → Rules → Feedback → Loops. Motion communicates function. |
| 33 | **Information Architecture** | Structure, labels, nav | User mental model > developer logic. Card sorting, tree testing. |
| 34 | **Cognitive Load Theory** | Reduce extraneous load | Intrinsic (task), Extraneous (UI), Germane (learning). Minimize extraneous. |
| 35 | **Paradox of Choice** | Fewer options = more action | >7 choices = paralysis. Defaults + recommendations reduce friction. |
| 36 | **Weber's Law** | Perceivable change threshold | Change must be >~14% to be noticed. State changes = distinct visual shift. |
| 37 | **Dual Coding Theory** | Text + visual = 2x retention | Pair critical info with icon/illustration. Empty states, errors, onboarding. |

---

## Four Canonical Frameworks

### Nielsen's 10 Heuristics (Usability Evaluation)
1. Visibility of system status
2. Match with real world
3. User control and freedom
4. Consistency and standards
5. **Error prevention** (Priority 1)
6. Recognition rather than recall
7. Flexibility and efficiency
8. Aesthetic and minimalist design
9. Recognize, diagnose, recover from errors
10. Help and documentation

### Don Norman's 6 Principles (Interaction Design)
1. Visibility
2. Feedback
3. Constraints
4. Mapping
5. Consistency
6. Affordance/Signifiers

### Shneiderman's 8 Golden Rules (Interface Design)
1. Strive for consistency
2. Enable frequent users to use shortcuts
3. Offer informative feedback
4. Design dialogs to yield closure
5. Offer simple error handling
6. Permit easy reversal of actions
7. Support internal locus of control
8. Reduce short-term memory load

### Dieter Rams' 10 Principles (Product Philosophy)
1. Innovative
2. Useful
3. Aesthetic
4. Understandable
5. Unobtrusive
6. **Honest** (Priority 2)
7. Long-lasting
8. Thorough to the last detail
9. Environmentally friendly
10. As little design as possible

---

## Law Conflict Resolution Hierarchy

When laws conflict, apply this priority order (highest wins):

### PRIORITY 1 — Safety & Error Prevention
> **Nielsen H5 (Error Prevention) overrides everything.**
> Preventing irreversible actions > minimizing friction.
> **Example:** Security 2FA steps > Fogg Ability (fewer steps)

### PRIORITY 2 — User Control & Trust
> **Nielsen H3 (Control) + Dieter Rams (Honest)** = second tier.
> User trust is non-negotiable.
> **Example:** Honest scarcity > Conversion-boosting fake urgency

### PRIORITY 3 — Usability (Core Task Completion)
> **Fitts's + Hick's + Miller's + Doherty** = third tier.
> Task completion > aesthetic preference.
> **Example:** Big full-width CTA > minimal aesthetic preference

### PRIORITY 4 — Aesthetics & Delight
> **Aesthetic-Usability + Peak-End + Emotional Design** = lowest tier.
> Delight only after core UX is solid.

---

## Common Conflict Resolutions

| Conflict | Winner | Reason |
|----------|--------|--------|
| Fitts's (big CTA) vs Aesthetic (minimal) | **Fitts's** | P3 > P4 |
| Von Restorff (1 highlight) vs Client (3 highlights) | **Von Restorff** | Cognitive clarity |
| Hick's (fewer) vs Business (show all) | **Hick's + Progressive Disclosure** | P3 + pattern |
| Scarcity (urgency) vs Honest (Dieter Rams) | **Honest** | P2 > conversion |
| Fogg Ability (less friction) vs Security | **Security** | P1 irreversible risk |
| WCAG contrast need vs design-taste color ban | **WCAG** | P1 — accessibility |
| Brand ref violates UX law | **UX Law** | Tier 1 > Tier 5 |

---

## Cross-Skill Authority Rules

```
FONT/COLOR CONFLICT:
  design-taste-frontend bans purple/AI colors.
  ui-ux-pro-max recommends palettes (some purple).
  awesome-design-md references brands using purple (Stripe).
  WINNER: If purple needed for WCAG contrast (Layer 8) → ACCESSIBILITY WINS (P1).
           If purple is just aesthetic choice → design-taste-frontend ban applies.

FONT CONFLICT:
  design-taste-frontend mandates Geist/Satoshi for code output.
  ui-ux-pro-max has 57 font pairings for visual design.
  WINNER: Code/dev task → design-taste-frontend. Figma/visual task → ui-ux-pro-max options.

HOOK MODEL CONFLICT:
  hooked-ux and UX Brain Step 6 both describe Hook Model.
  WINNER: UX Brain Step 6 = canonical summary. hooked-ux = extended depth.

UX LAW CONFLICT:
  figma-design has ux-laws.md reference.
  ui-ux-pro-max has 99 UX guidelines.
  WINNER: This file (37 Laws + 4 Frameworks + Hierarchy) = canonical.
```

---

## Reference Files — When to Read

| File | Purpose |
|------|---------|
| **ux-audit-checklist.md** | 8-Layer audit checklist with checkboxes |
| **laws-by-screen.md** | Screen-type auto-activation table + screen-specific checklists |
| **platform-specific.md** | Mobile/Web/Tablet complete rules |
| **industry-patterns.md** | Fintech, Food, E-com, SaaS, Social, Health, EdTech patterns |
| **behavioral-design.md** | Engagement, retention, habit design (Fogg, Hook deep dive) |
| **anti-patterns.md** | Complete dark pattern library + anti-pattern categories |
| **accessibility.md** | WCAG 2.2 AA/AAA, touch targets, color-blind, screen reader, motion |
| **indian-patterns.md** | UPI flows, bilingual layouts, Tier 2/3 constraints, trust signals |