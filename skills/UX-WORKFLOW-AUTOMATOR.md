# UX Workflow Automator
Master Orchestrator for UX structure. Takes User Interview Data, Journey Maps, and Constraints → outputs Sitemap, full Information Architecture, and Lo-fi Wireframes for every screen with [HAPPY PATH] + 5 mandatory [EDGE CASES]: Error, Empty, Zero Results, Loading, Drop-off. Output is Figma/FigJam-ready. Trigger: "sitemap banao", "IA banao", "wireframe banao", "lo-fi banao", "flow with edge cases", "user flow with errors", "UX blueprint", "interview data se wireframe", "journey map se IA", "complete UX structure", "information architecture", "design karna hai", "project structure". Orchestrates: ux-thinking (law validation), define-ideate (IA patterns), deep-thinking (edge case verification), ux-research-architect (research synthesis). ux-thinking remains Tier 1 authority. Output feeds into figma-design skill.
UX Workflow Automator — Master Orchestrator Skill

POSITION IN ECOSYSTEM:
ux-research-architect  →  define-ideate  →  [THIS SKILL]  →  figma-design
     (Research)              (Strategy)      (Structure)      (Execution)

ux-thinking  ←── validates every law decision made by THIS SKILL
deep-thinking ←── verifies logic, edge cases, and IA completeness
This skill is the automation bridge between strategy and execution.
It converts thinking into buildable blueprints — fast, complete, law-validated.


WHAT THIS SKILL PRODUCES
Given inputs (interview data + journey map + constraints), auto-generate:
OUTPUT 1 → SITEMAP           (Hierarchy tree, FigJam-ready)
OUTPUT 2 → INFORMATION ARCH  (Full IA table with labels, depth, grouping)
OUTPUT 3 → WIREFRAME SPECS   (Per-screen markdown lo-fi, Figma-pasteable)
           ├── [HAPPY PATH]   (Ideal user flow, step by step)
           └── [EDGE CASES]   (Min 5 per flow — all 5 mandatory types)

ACTIVATION PROTOCOL
When this skill activates, run stages in THIS order:
STAGE 0 → INPUT COLLECTION      Intake form — collect all required data
STAGE 1 → SKILL SYNC            Notify which sibling skills are being called
STAGE 2 → SYNTHESIS             Process inputs → extract signals
STAGE 3 → SITEMAP               Build logical hierarchy
STAGE 4 → IA BUILD              Create full Information Architecture
STAGE 5 → FLOW MAPPING          Map happy paths for all primary flows
STAGE 6 → EDGE CASE ENGINE      Generate minimum 5 edge cases per flow
STAGE 7 → WIREFRAME FACTORY     Build lo-fi wireframe specs per screen
STAGE 8 → LAW ANNOTATION        Tag every wireframe decision with UX law
STAGE 9 → FIGMA HANDOFF         Package output for direct paste into Figma

STAGE 0: INPUT COLLECTION FORM

If user has not provided structured input, show this form.
NEVER proceed with missing CRITICAL inputs. MEDIUM inputs can be inferred.

╔═══════════════════════════════════════════════════════════╗
║           UX WORKFLOW AUTOMATOR — INPUT FORM              ║
╚═══════════════════════════════════════════════════════════╝

SECTION A — PROJECT BRIEF        [CRITICAL]
A1. Product name:             _______________
A2. Product type:             App / Web / Both
A3. Industry:                 Food / Fintech / EdTech / E-com / SaaS / Health / Other
A4. Platform:                 Android / iOS / Web / Cross-platform
A5. Target market:            Indian Tier 1 / Tier 2 / Global
A6. Stage:                    New product / Feature addition / Redesign
A7. MVP scope:                [What ships in v1?]
A8. Primary user goal:        _______________

SECTION B — USER DATA            [CRITICAL]
B1. Persona (name, age, city, device, income):  _______________
B2. User interview insights (raw or summarized): _______________
B3. Top 3 user pain points:
    Pain 1: ___  Pain 2: ___  Pain 3: ___
B4. Top 3 user goals (goals not features):
    Goal 1: ___  Goal 2: ___  Goal 3: ___
B5. User journey map (describe or paste):  _______________

SECTION C — CONSTRAINTS          [CRITICAL]
C1. Features confirmed for MVP:   _______________
C2. Features OUT of scope:        _______________
C3. Technical constraints:        _______________
C4. Business constraints:         _______________
C5. Accessibility requirements:   _______________

SECTION D — DESIGN DIRECTION     [MEDIUM — can be inferred]
D1. Competitor apps user knows:   _______________
D2. Navigation pattern preference: Bottom Nav / Sidebar / Tab Bar / Auto-detect
D3. Existing brand guidelines:    _______________
D4. Wireframe fidelity target:    Lo-fi / Annotated Lo-fi / Mid-fi

Missing B2+B3+B4? → ASSUMPTION MODE. Every inferred decision flagged [ASSUMED].
Missing A1-A8 or C1-C3? → STOP. Ask before proceeding.


STAGE 1: SKILL SYNC
┌─────────────────────────────────────────────────┐
│  SKILL SYNC — ORCHESTRATING PIPELINE            │
├─────────────────────────────────────────────────┤
│  ux-thinking         → Law validation active    │
│  define-ideate       → IA + sitemap patterns    │
│  deep-thinking       → Edge case verification   │
│  ux-research-arch    → Interview data synthesis │
│  THIS SKILL          → Automation + Structure   │
│  NEXT SKILL          → figma-design (execution) │
└─────────────────────────────────────────────────┘

STAGE 2: INPUT SYNTHESIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SIGNAL BRIEF — [Product Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRIMARY USER GOAL:    [From B4 — the #1 goal]
CORE JTBD:            [Functional job, 1 sentence]
CRITICAL PAIN POINT:  [Biggest friction from B3]
DESIGN IMPLICATION:   [What this forces us to prioritize]

PERSONA SNAPSHOT:
  Name/Age/City: [B1]
  Device:        [B1 — affects touch target, screen size]
  Network:       [C3 — affects loading state design]
  Mental Model:  [D1 — what familiar apps they use → Jakob's Law baseline]

MVP BOUNDARY:
  IN:   [C1] | OUT: [C2]

ASSUMPTION LOG:
  [ASSUMED] A1: [Inferred assumption — must validate before hi-fi]
  [CONFIRMED] A2: [From input data]

NORTH STAR METRIC: [The ONE number that proves success]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STAGE 3: SITEMAP GENERATOR
RULE: Organized by USER mental model — NEVER by developer logic or database structure.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SITEMAP — [Product Name]
[FigJam: paste as sticky notes / Auto Layout frames]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LEVEL 0 — ENTRY POINTS
  [ Splash Screen ]
      │
      ├── [ Onboarding Flow ] ────────────────────┐
      │     (new user only)                        │
      └── [ Home / Dashboard ] ◄──────────────────┘

LEVEL 1 — MAIN NAVIGATION (tabs — max 5, Hick's Law)
  [ Tab 1: Home ]  [ Tab 2: ___ ]  [ Tab 3: ___ ]  [ Tab 4: Profile ]

LEVEL 2 — SECTIONS PER TAB
  Home Tab:
    ├── [Section A: Primary value]
    ├── [Section B: Secondary value]
    └── [Section C: Discovery]

  Tab 2:
    ├── [Section A]
    └── [Section B]

  Profile Tab:
    ├── [Account Settings]
    ├── [Preferences]
    ├── [Help & Support]
    └── [Logout]

LEVEL 3 — DETAIL / ACTION PAGES (max 2 levels from L1 for primary flows)
  Section A →
    ├── [Detail / Browse Page]
    ├── [Action / CTA Page]
    └── [Confirmation / Success]

MODALS & OVERLAYS (contextual, not in nav)
  ├── [Filter / Sort Bottom Sheet]
  ├── [Confirmation Dialog]
  ├── [Permission Ask Sheet]
  └── [Error Recovery Modal]

SYSTEM SCREENS (always required — never skip)
  ├── [Onboarding — Step 1, 2, 3]
  ├── [Login / OTP Screen]
  ├── [404 / Not Found]
  ├── [Network Error / Offline]
  ├── [Empty State — per section variant]
  ├── [Skeleton / Loading — per section]
  └── [Success / Completion]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UX LAWS APPLIED:
  Hick's Law:            Nav tabs ≤ 5 — no decision paralysis
  Jakob's Law:           Bottom nav on mobile — users expect it
  Progressive Disclosure: Deep features revealed only when needed
  Serial Position Effect: Most important tab = position 1 or 5
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STAGE 4: INFORMATION ARCHITECTURE TABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFORMATION ARCHITECTURE — [Product Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ID    Screen Name           Parent           Depth  Type         Priority
───   ─────────────────     ──────────────   ─────  ──────────── ────────
S00   Splash                —                L0     System       P0
S01   Onboarding-1          Splash           L1     Onboarding   P0
S02   Onboarding-2          Onboarding-1     L1     Onboarding   P0
S03   Onboarding-3          Onboarding-2     L1     Onboarding   P0
S04   Login / OTP           Onboarding       L1     Auth         P0
S05   Home                  Login            L1     Core         P0
S06   [Section A]           Home             L2     Core         P1
S07   [Section B]           Home             L2     Core         P1
S08   [Detail Page]         Section A        L3     Core         P1
S09   [Action / CTA Page]   Detail           L3     Transact     P0
S10   Success Screen        Action           L3     Feedback     P0
S11   [Tab 2 Home]          Nav              L1     Core         P1
S12   [Tab 2 Section]       Tab 2            L2     Core         P2
S13   Profile               Nav              L1     Settings     P2
S14   Account Settings      Profile          L2     Settings     P2
S15   Help & Support        Profile          L2     Support      P3
S16   Notification Center   Global           L2     System       P2
S17   Search                Global           L1     Utility      P1
S18   Filter / Sort Sheet   Search           L2     Overlay      P1
S19   Empty State           Each section     —      System       P0
S20   Skeleton / Loading    Each section     —      System       P0
S21   Error — Network       Global           —      System       P0
S22   Error — Server        Global           —      System       P0
S23   404 / Not Found       Global           —      System       P1

Priority: P0 = MVP must-have | P1 = v1 | P2 = v2 | P3 = v3
Type:      Core (main value) | System (UX infra) | Overlay | Auth | Feedback
RULE:      Every Core screen needs Empty + Loading + Error variants (S19-S22)

NAVIGATION MAP:
  Entry:       Splash → Onboarding (new) or Home (returning)
  Auth:        OTP → Home (pass) / Retry (fail) / Support (stuck)
  Core flow:   Home → Action → Confirm → Success
  Error:       Any error → Message + CTA → Retry or Go Back or Support
  Dead ends:   NONE ALLOWED — every screen has a minimum 1 exit
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STAGE 5 + 6: FLOW MAPPING ENGINE
MASTER FLOW TEMPLATE — Use for EVERY primary flow
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FLOW: [Name — e.g., "User places first order"]
User Goal:     [What user wants]
Entry:         [Where flow starts]
Success State: [What "done" looks like for user]
Business Goal: [What product needs from this flow]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ [HAPPY PATH] — Ideal Journey
──────────────────────────────────────────────────────────────────
Step 1 → [Screen: Home]
  User action:     [What user does]
  System response: [What app does — immediate feedback]
  UX Law:          [Which law governs this step]
  Time target:     [How long this step should take]
  Next:            [Where they go]

Step 2 → [Screen: ___]
  User action:     ___
  System response: ___
  UX Law:          ___
  Time target:     ___
  Next:            ___

Step 3 → [Screen: ___]
  User action:     ___
  System response: ___
  UX Law:          ___
  Time target:     ___
  Next: Success screen

HAPPY PATH COMPLETE
  Total steps:   [N — ideal ≤ 5 for primary flow]
  Total time:    [Estimated seconds]
  Primary law:   Goal Gradient — progress visible at every step
  Drop risk:     [Low / Medium / High + reason]

──────────────────────────────────────────────────────────────────
⚠️  [EDGE CASE 1] — ERROR STATE
──────────────────────────────────────────────────────────────────
Trigger: [What causes this — e.g., "Payment API fails mid-flow"]

Screen State:
  → What breaks / what error occurs
  → What data is preserved vs lost

UI Response:
  Headline:   [Specific — "Payment didn't go through"]
  Subtext:    [Specific reason — "Your bank declined the transaction"]
  NOT:        "Something went wrong" alone — NEVER acceptable
  Primary CTA: [Action that fixes — "Try Again"]
  Secondary:   [Escape — "Contact Support" or "Pay Later"]
  Progress:    [State if user's work is saved or lost]

Recovery Path:
  → [Step 1] → [Step 2] → [Back to where they were in flow]

UX Laws:
  → Nielsen H9: Help users recognize, diagnose, recover from errors
  → Don Norman Feedback: System explains what happened and why
  → Postel's Law: Be forgiving of user — give multiple recovery paths

Figma Note: [Icon type + copy position + CTA placement spec]

──────────────────────────────────────────────────────────────────
⚠️  [EDGE CASE 2] — EMPTY STATE
──────────────────────────────────────────────────────────────────
Trigger: [When section has no content — e.g., "No orders placed yet"]

Screen State:
  → Zero data returned — first-time or cleared state
  → First-time empty vs. returned-to-empty (design differently)

UI Response:
  Illustration: [Aspirational / positive — NOT broken/sad imagery]
  Headline:     [Future-oriented — "Your first order is one tap away"]
  Subtext:      [Brief value reminder — not just "Nothing here"]
  Primary CTA:  [Action that FILLS the empty state — "Explore Menu"]
  Secondary:    [Optional alt path]

Variants to design:
  → First-time empty:    "Welcome! Start by doing X"
  → Cleared/deleted:     "You removed everything — add more?"
  → Filtered to empty:   "No items match your filters — clear filter?"

UX Laws:
  → Fogg Behavior Model: Empty state IS a prompt — motivate action
  → Dual Coding: Illustration + text = 2x comprehension
  → Zeigarnik: If setup action exists, show progress bar

Figma Note: [Illustration size, CTA width, vertical centering spec]

──────────────────────────────────────────────────────────────────
⚠️  [EDGE CASE 3] — ZERO RESULTS (Search / Filter returns nothing)
──────────────────────────────────────────────────────────────────
Trigger: [User searches/filters — database returns 0 results]

Screen State:
  → Query executed — nothing found
  → User has invested effort — do NOT abandon them here

UI Response:
  Acknowledge:  "No results for '[search term]'" — show their query
  Suggest:      [2-3 related alternatives or popular items]
  Spell-check:  "Did you mean [correction]?" if typo detected
  Category:     "Try browsing [related category]"
  Popular:      "People also search for [A, B, C]"
  Escape:       Go back / Clear search / Browse all

NEVER show: blank screen, generic error, or unchanged layout

UX Laws:
  → Postel's Law: Accept typos + partial queries — fuzzy match
  → Jakob's Law: Follow Swiggy/Google zero-results pattern (familiar)
  → Fogg Ability: Give user a clear path to succeed — no dead ends

Figma Note: [Show their search query in header. Suggestions as cards.]

──────────────────────────────────────────────────────────────────
⚠️  [EDGE CASE 4] — LOADING STATE
──────────────────────────────────────────────────────────────────
Trigger: [Any async operation — API call, image load, data fetch]

Loading Type — choose based on expected duration:

TYPE A: Skeleton Screens (< 3 seconds expected)
  → Grey animated placeholders matching real content shape
  → RULE: Skeleton shape = actual content layout (not generic boxes)
  → Nav bar: always visible, never skeleton the nav
  → Animation: shimmer left → right (not pulse / bounce)

TYPE B: Progress Indicator (known duration — uploads, processing)
  → Linear bar at top OR percentage center
  → Show step: "Processing payment 2 of 3..."
  → Cancel option always visible (Nielsen H3 — User Control)

TYPE C: Optimistic UI (instant feedback, confirm later)
  → Show success immediately, revert if API fails
  → Best for: likes, bookmarks, cart add
  → Requires: visible "Undo" CTA if reverting

TYPE D: Full Screen Loader (first app load only)
  → Max 2 seconds before switching to skeleton
  → Brand + subtle animation — NOT generic spinner
  → If > 3s: show skeleton + "Still loading..." message

UX Laws:
  → Doherty Threshold: Any feedback within 400ms — no blank moments
  → Zeigarnik: Progress indicators reduce perceived wait time
  → Aesthetic-Usability: Polished skeleton feels faster than spinner

Figma Note: [Skeleton per content zone. Animation spec. Timeout state.]

──────────────────────────────────────────────────────────────────
⚠️  [EDGE CASE 5] — USER DROP-OFF POINTS
──────────────────────────────────────────────────────────────────
Trigger: [Steps where analytics would show highest abandonment]

Identify the 3 highest drop-off risks in this specific flow:

DROP-OFF RISK A — [Step N: e.g., "OTP screen — SMS delayed"]
  Why users leave:  [Specific friction reason]
  UX Intervention:
    → Auto-read OTP — remove manual copy-paste (Tesler's Law)
    → "Resend OTP" visible at 30s — not hidden at 60s
    → "WhatsApp OTP" as fallback option
    → Countdown timer visible — Zeigarnik reduces anxiety

DROP-OFF RISK B — [Step N: e.g., "Payment — trust concern"]
  Why users leave:  [Specific friction reason]
  UX Intervention:
    → Lock icon + "Secured by [Gateway]" near CTA
    → Amount shown BEFORE pay button — no surprises
    → Cancel always visible — Nielsen H3 Control
    → Familiar UPI-first UI — Jakob's Law

DROP-OFF RISK C — [Step N: e.g., "Long form / too many fields"]
  Why users leave:  [Specific friction reason]
  UX Intervention:
    → Break into steps with progress bar — Zeigarnik
    → Auto-fill wherever possible — Tesler's Law
    → Mark only REQUIRED fields — hide optional
    → "Progress saved" toast — don't punish for leaving

UX Laws:
  → Goal Gradient: Show progress as user nears completion
  → Tesler's Law: Transfer complexity to system — not user
  → Peak-End Rule: End even long flows on a positive moment

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FLOW SUMMARY — [Flow Name]
  Happy Path Steps:   [N]
  Edge Cases:         ✅ Error / ✅ Empty / ✅ Zero Results / ✅ Loading / ✅ Drop-off
  Highest Drop Risk:  [Step N — reason]
  Primary Laws:       [Top 3]
  Figma Priority:     P0 / P1 / P2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RULE: Every primary flow gets FULL template.
Secondary flows: minimum Happy Path + Edge Cases 1, 4, 5.
There is NO flow with only a Happy Path. EVER.


STAGE 7: WIREFRAME FACTORY
Default Screen Template
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCREEN: [S05] Home Screen              ID: S05 | Priority: P0
Flow: Happy Path Step 1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────┐
│  ████ STATUS BAR                    │  System
├─────────────────────────────────────┤
│  [☰ / ←]   SCREEN TITLE   [🔔][👤] │  Header nav
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐    │
│  │  [HERO / SEARCH BAR]        │    │  Zone A — Primary action
│  │  [Supporting subtext]       │    │
│  └─────────────────────────────┘    │
│                                     │
│  ── Section Label ──────────────    │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──   │
│  │[img] │ │[img] │ │[img] │ │...  │  Zone B — Cards (H-scroll)
│  │Label │ │Label │ │Label │ │     │
│  └──────┘ └──────┘ └──────┘ └──   │
│                                     │
│  ── Section Label ──────────────    │
│  ┌─────────────────────────────┐    │
│  │  [List Item 1]      [›]     │    │  Zone B — List (V-scroll)
│  │  [List Item 2]      [›]     │    │
│  │  [List Item 3]      [›]     │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │     [ PRIMARY ACTION ]      │    │  Zone C — Full-width CTA
│  └─────────────────────────────┘    │
│                                     │
├─────────────────────────────────────┤
│  [🏠 Home][🔍 Search][📦 Orders][👤]│  Bottom Nav (4 tabs)
└─────────────────────────────────────┘

ZONES:
  Zone A (Hero):    [Search / banner / prompt] → primary motivation
  Zone B (Content): [N sections] [scroll: H for cards, V for lists]
  Zone C (CTA):     [Label] → [Destination S09]

COMPONENT SPECS:
  Header:       Left: [logo/back] | Center: title | Right: [bell + avatar]
  Cards:        ~120×140px | Image + Label + Meta | Horizontal scroll
  CTA Button:   Full-width | Min 48px height | Primary color | Bottom thumb zone
  Bottom Nav:   4 items | Active: filled icon + colored label | Inactive: outline
  List Items:   Full-width | Left: icon/image | Right: chevron | 56px row height

UX LAW ANNOTATIONS:
  Fitts's Law:    CTA full-width, bottom — largest target, thumb reach
  Hick's Law:     [N] sections max — no overload
  F-Pattern:      Most important content top-left per zone
  Proximity:      Related items grouped in cards / sections
  Doherty:        Skeleton version of this screen required (see S05-EC4)

STATES REQUIRED:
  ✅ Default (content loaded)
  ✅ Loading — S05-EC4 (skeleton version)
  ✅ Empty   — S05-EC2 (no content yet)
  ✅ Error   — S05-EC1 (content failed to load)

CONNECTIONS:
  Enters from: Splash / Login / Back from any detail screen
  Exits to:    [Card tap → S08] [Search → S17] [Profile → S13] [CTA → S09]
  Modal from:  [Filter → S18]

FIGMA NOTES:
  Frame:   390×844 (iOS) or 360×800 (Android)
  Group:   "[S05] Home — Default"
  Copies:  Duplicate for Loading / Empty / Error (rename each)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Error State Wireframe Template
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCREEN: [S05-EC1] Home — ERROR STATE      ID: S05-EC1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────┐
│  STATUS BAR                         │
├─────────────────────────────────────┤
│  [←]    SCREEN TITLE    [🔔][👤]    │
├─────────────────────────────────────┤
│                                     │
│                                     │
│        [🔌 Error Illustration]      │  Neutral/informative — not sad
│          (network plug / wifi)       │
│                                     │
│      Couldn't load your content     │  Calm, honest headline
│   Check your connection and retry   │  Specific direction — not vague
│                                     │
│  ┌─────────────────────────────┐    │
│  │         [ Try Again ]       │    │  Primary — full-width
│  └─────────────────────────────┘    │
│                                     │
│          Contact Support ↗          │  Secondary — text link
│                                     │
│                                     │
├─────────────────────────────────────┤
│  [🏠][🔍][📦][👤]                   │  Nav always visible
└─────────────────────────────────────┘

COPY RULES — MANDATORY:
  Headline: What happened (no blame, no "Oops!")
  Subtext:  Why (network / server) — honest
  Primary:  Fix action ("Try Again")
  Secondary: Escape if primary fails ("Contact Support")
  NEVER: "Something went wrong" alone / "Error 500" / "Oops!"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Empty State Wireframe Template
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCREEN: [S05-EC2] Home — EMPTY STATE      ID: S05-EC2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────┐
│  STATUS BAR                         │
├─────────────────────────────────────┤
│  [←]    SCREEN TITLE    [🔔][👤]    │
├─────────────────────────────────────┤
│                                     │
│                                     │
│      [✨ Positive Illustration]     │  Aspirational — NOT broken imagery
│        (open box / starting line)    │
│                                     │
│    Your [section] is waiting! ✨    │  Future-oriented — not "Nothing here"
│  [Start doing X to see Y appear]    │  Explains value — not just absence
│                                     │
│  ┌─────────────────────────────┐    │
│  │     [ [Primary Action] ]    │    │  CTA that FILLS the empty state
│  └─────────────────────────────┘    │
│                                     │
│        Browse Popular [X] ↗         │  Alt path
│                                     │
├─────────────────────────────────────┤
│  [🏠][🔍][📦][👤]                   │
└─────────────────────────────────────┘

EMPTY STATE VARIANTS (design all that apply):
  → First-time:     "Welcome! Start by doing X"
  → Cleared:        "You cleared everything — add more?"
  → Filter-empty:   "No results for this filter — Clear filter?"
  → Searched-empty: → Use S17-EC3 Zero Results template instead
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Skeleton / Loading Wireframe Template
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCREEN: [S05-EC4] Home — SKELETON/LOADING  ID: S05-EC4
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────┐
│  STATUS BAR                         │
├─────────────────────────────────────┤
│  [←]   ░░░░░░░░░░░░░   [🔔][👤]   │  Title: shimmer
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐    │
│  │  ░░░░░░░░░░░░░░░░░░░░░░░░  │    │  Hero skeleton
│  │  ░░░░░░░░░░░░░░            │    │
│  └─────────────────────────────┘    │
│                                     │
│  ░░░░░ Section Label ░░░░░░░        │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │░░░░░░│ │░░░░░░│ │░░░░░░│        │  Card skeletons (match real shape)
│  │░░░░░░│ │░░░░░░│ │░░░░░░│        │
│  └──────┘ └──────┘ └──────┘        │
│                                     │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  List item skeletons
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                     │
├─────────────────────────────────────┤
│  [🏠][🔍][📦][👤]                   │  Nav ALWAYS visible — never skeleton
└─────────────────────────────────────┘

SKELETON RULES:
  Shape:    Must match actual content layout exactly
  Animation: Shimmer left → right | NOT pulse/bounce
  Nav:      Always visible — nav never goes into skeleton state
  Timeout:  > 3 seconds → show partial content + "Still loading..."
  Spinner:  NEVER alone on content page — always skeleton first
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STAGE 8: LAW ANNOTATION LAYER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LAW ANNOTATION REPORT — [Product Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DESIGN DECISION                LAW APPLIED          WHY
─────────────────────────────  ──────────────────── ───────────────────────────
Bottom nav — 4 tabs            Hick's Law           ≤5 options / no paralysis
CTA full-width at bottom       Fitts's Law          Largest target / thumb zone
Skeleton screens on all async  Doherty Threshold    400ms feedback — always
Progress bar in onboarding     Zeigarnik Effect     Incomplete tasks stay top-of-mind
OTP auto-read                  Tesler's Law         Complexity moved to system
Empty state has action CTA     Fogg Behavior Model  Motivation + Ability + Prompt
Error shows specific message   Nielsen H9           Diagnose + recover — not just notify
Home tab is position 1         Serial Position      First item = highest recall
Carousel card half-visible     Gestalt Closure      Implies horizontal scrollability
Empty state has illustration   Dual Coding          Image + text = 2x comprehension
Search in global nav           Jakob's Law          Placed where users expect it
Success screen — positive end  Peak-End Rule        Last moment = strongest memory
Input shows recent suggestions Recognition > Recall Don't make user type from memory
Form broken into 3 steps       Miller's Law         7±2 chunks max per decision
Trust badge near payment CTA   Cognitive Load       Reduce anxiety = reduce abandonment

LAW CONFLICTS (resolved by ux-thinking hierarchy):
  [Conflict]: [Law A] vs [Law B]
  Resolution: [Which wins + why — per Priority 1-4 from ux-thinking]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STAGE 9: FIGMA HANDOFF PACKAGE
╔═══════════════════════════════════════════════════════════════╗
║          FIGMA HANDOFF PACKAGE — [Product Name]               ║
╚═══════════════════════════════════════════════════════════════╝

FIGMA FILE STRUCTURE (create pages in this order):

  PAGE 1 → "📐 Sitemap"
    Content: Sitemap tree from Stage 3
    Tool:    FigJam stickies or Auto Layout frames
    Colors:
      Blue   = Core user screens
      Green  = Auth + Onboarding
      Red    = Error + System screens
      Yellow = Modals + Overlays

  PAGE 2 → "🗂 IA Table"
    Content: IA Table from Stage 4
    Tool:    FigJam Table or embedded
    Include: Screen IDs for cross-reference

  PAGE 3 → "🔀 User Flows"
    One diagram per primary flow
    Tool:    FigJam connector arrows
    Colors:
      Green  arrow = Happy Path
      Red    arrow = Error / Edge Case
      Orange arrow = Recovery / Retry

  PAGE 4 → "📱 Lo-fi Wireframes"
    Frames: 390×844 (iOS) or 360×800 (Android)
    Naming: "[S05] Home — Default" / "[S05-EC1] Home — Error"
    Group: All states of one screen together
    Order: P0 first → P1 → P2

  PAGE 5 → "📋 Annotations + Laws"
    Law annotation table from Stage 8
    Assumption log with validation status

DESIGN HANDOFF → figma-design SKILL:
─────────────────────────────────────
  PRODUCT:           [Name]
  PRIMARY PERSONA:   [Name, age, city, device]
  NORTH STAR METRIC: [One metric]

  MVP SCREENS (design in this order):
    P0: [S00] [S01-S03] [S04] [S05] [S09] [S10] [S19-S22]
    P1: [S06] [S07] [S08] [S11] [S17]
    P2: [S12] [S13] [S14] [S16] [S18]
    NOTE: S19-S22 (system screens) are NEVER optional

  EDGE CASES TO DESIGN:
    Every P0 screen: Error + Empty + Loading variant (3 frames each)
    Every P1 screen: Loading + Empty minimum (2 frames)
    Every P2+ screen: Loading state minimum (1 frame)

  VALIDATED FLOWS: [List with ✅ or ⚠️ ASSUMED]

  COMPONENT NEEDS:
    → Bottom nav (4-5 items, active/inactive states)
    → Card component (image + label + meta, hover/pressed)
    → CTA Button (primary/secondary/disabled/loading states)
    → Input field (default/active/error/filled/disabled)
    → Skeleton loader (per card type, per list type)
    → Toast / Snackbar (success/error/info)
    → Modal bottom sheet (header + content + CTA)
    → Empty state template (illustration + headline + CTA)
    → Error state template (illustration + copy + CTA)

  ACCESSIBILITY:
    → Touch targets: 48px minimum all interactive elements
    → Font: 14px caption / 16px body / 20px sub / 24px+ heading
    → Contrast: 4.5:1 minimum (WCAG AA)
    → Color-alone: Never — always add shape/label/pattern
    → Hindi/regional: [Which scripts per persona B1]

╔═══════════════════════════════════════════════════════════════╗
║  PIPELINE COMPLETE → HAND TO: figma-design skill              ║
╚═══════════════════════════════════════════════════════════════╝

QUALITY GATE — Verify Before Delivering
CHECKLIST — DO NOT HAND OFF UNTIL ALL CHECKED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SITEMAP
  ☐ Every screen has a screen ID (S00, S01...)
  ☐ System screens present: Empty, Loading, Error, 404
  ☐ Every node has an entry AND exit path
  ☐ Primary flows max 3 levels deep
  ☐ Nav tabs ≤ 5 (Hick's Law)
  ☐ No dead-end screens anywhere

INFORMATION ARCHITECTURE
  ☐ Labels use user vocabulary (not dev/business terms)
  ☐ Priority assigned to every screen (P0/P1/P2/P3)
  ☐ Every Core screen has Error + Empty + Loading pairs flagged
  ☐ Navigation map complete — no orphan screens

FLOWS
  ☐ Every primary flow has a Happy Path
  ☐ EVERY flow has minimum 5 edge cases
  ☐ All 5 types covered: Error / Empty / Zero Results / Loading / Drop-off
  ☐ Every edge case has a Recovery Path (not just problem statement)
  ☐ Drop-off risks have specific UX interventions assigned

WIREFRAMES
  ☐ Every P0 screen has a wireframe spec
  ☐ Every wireframe has: Zones / Components / Connections
  ☐ Error wireframe: specific copy (no "Something went wrong" alone)
  ☐ Empty wireframe: positive framing + action CTA
  ☐ Skeleton wireframe: shape matches real content
  ☐ States named correctly: "[SID] Name — State"

LAW ANNOTATIONS
  ☐ Every design decision has minimum 1 law
  ☐ Conflicts identified and resolved per ux-thinking hierarchy
  ☐ No dark patterns introduced
  ☐ Fintech screens: trust + error recovery + money clarity

HANDOFF
  ☐ Figma page structure defined (5 pages)
  ☐ Naming convention consistent
  ☐ Assumption log complete — unvalidated items [ASSUMED]
  ☐ figma-design skill brief ready to paste

ANY UNCHECKED BOX = DO NOT HAND OFF. COMPLETE IT FIRST.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ECOSYSTEM AUTHORITY MAP
┌────────────────────────────────────────────────────────────────┐
│                    SKILL ECOSYSTEM MAP                          │
│                                                                 │
│  TIER 1 → ux-thinking       ← LAW AUTHORITY (never override)   │
│  TIER 2 → Platform + WCAG   ← Accessibility + platform rules   │
│  TIER 3 → Industry patterns ← Food / Fintech / EdTech etc.     │
│                                                                 │
│  ORCHESTRATOR → [THIS SKILL]  ← Workflow Automation            │
│    ├── calls: ux-research-architect  (interview synthesis)      │
│    ├── calls: define-ideate          (IA + sitemap patterns)    │
│    ├── calls: deep-thinking          (edge case verification)   │
│    └── outputs to: figma-design      (execution)               │
│                                                                 │
│  VALIDATION CHAIN:                                              │
│    Wireframe decision → verified by ux-thinking laws            │
│    IA decision → verified by define-ideate patterns             │
│    Edge case completeness → verified by deep-thinking engine    │
└────────────────────────────────────────────────────────────────┘

ANTI-PATTERNS — THIS SKILL NEVER DOES THESE
❌  Happy-path-only wireframes — EVERY flow gets all 5 edge cases. No exceptions.
❌  Generic error copy ("Something went wrong") — always specific + recovery path
❌  Empty states without a CTA — if empty, guide user to fill it with action
❌  Spinner-only loading — skeleton screens matching real content shape always
❌  Dead-end screens — every screen has minimum 1 exit path always
❌  IA by developer logic — always organized by user mental model
❌  Sitemap > 3 levels deep for primary flows — flatten or use progressive disclosure
❌  Wireframes without screen IDs — every screen is indexed (S00, S01...)
❌  Design decisions without law justification — every choice needs a law
❌  Skipping system screens (Empty/Loading/Error) — these are NOT optional
❌  Drop-off risks without interventions — identify AND solve them
❌  Skipping the input collection form — garbage in = garbage wireframes out
❌  Assumption mode without flagging [ASSUMED] — hidden assumptions kill projects

UX Workflow Automator — V1.0
Orchestrates: ux-research-architect → define-ideate → [this skill] → figma-design
Validates via: ux-thinking (laws) + deep-thinking (verification)
"A wireframe without edge cases is not a wireframe — it's a fantasy."