# Guardia AI - UI/UX Bridge

This document bridges the gap between Product Requirements (PRD), App Flow, and the frontend implementation. It outlines the design tokens, visual hierarchy, animation guidelines, and component patterns used across Guardia AI.

## 1. Core Philosophy
Guardia AI is positioned as a premium "Cybersecurity x Fintech" application. The UI must invoke trust, security, and enterprise-grade sophistication while remaining highly accessible to everyday users.

- **Trust through Tactility:** Every interaction (button press, navigation) provides immediate visual feedback.
- **System Status Visibility:** Ongoing background processes (like scanning, syncing, and auditing) are made visible through staggered lists and shimmering skeletons to reassure the user.
- **Glassmorphism & Depth:** Instead of flat colors, we use blurred radial gradients and semi-transparent layers to establish a modern aesthetic.

## 2. Design System & Tokens

A robust and scalable design system is used to maintain visual consistency across all view controllers.

### 2.1 Typography
- **Primary Font:** `Plus Jakarta Sans` (Used for headers, body text, and UI labels for its highly legible, modern geometry)
- **Secondary/Monospace Font:** `JetBrains Mono` (Used for sensitive technical data like account numbers `(*4321)`, IPs, error logs, and status chips to evoke a "cyber-secure" aesthetic)

### 2.2 Color Palette & Theming
The application supports both Light and Dark mode, utilizing semantic color mapping via Tailwind CSS. Dark mode uses deep slates to reduce eye strain, while Light mode relies on crisp whites and subtle grays.

**Core Tokens:**
- **Primary Accents:** `cyan-400` / `sky-500` (Used for active navigation, primary buttons, and tech-forward highlights)
- **Security/Success (Verified/Protected):** `emerald-400` / `emerald-500`
- **Warning/Danger (Scam/Freeze):** `red-500` / `amber-500`
- **Backgrounds (Dark Mode):** Base is `slate-950`, floating cards are `slate-900` or `slate-900/40`.

**Ambient Lighting & Depth:**
- Instead of pure flat backgrounds, global radial gradients (`bg-cyan-500/10 blur-[100px]`) are placed at the root level to create ambient "glows" that react as users navigate, adding a premium 3D feel.

### 2.3 Layout & Spacing
- **Standard Padding:** Main screen containers use standard `p-4` or `p-5`.
- **Corner Radii:** We use extremely exaggerated radii for a modern "bubble" aesthetic:
  - Standard Cards: `rounded-2xl`
  - Primary Action Buttons: `rounded-xl`
  - Large Highlight Containers: `rounded-3xl` or `rounded-[24px]`

## 3. Motion & Animation (Framer Motion)

Animations are driven by physics-based `spring` transitions rather than linear CSS easing.

### Page Transitions
- **AnimatePresence:** Applied via React Router location keys.
- **In/Out Flow:** Screens scale down slightly (`0.98`) and fade out, then the new screen scales up from `0.98` and fades in (`duration: 0.15`).

### Micro-Interactions (Universal Tactility)
- **Buttons:** All interactive elements use `whileTap={{ scale: 0.95 }}`.
- **Destructive Actions:** Buttons that involve high risk (e.g., Freeze Accounts, Delete Account) utilize infinite "Warning Shakes" (`x: [-5, 5, -5, 5, 0]`) to convey urgency.
- **Active Navigation:** The bottom navigation bar uses a fluid "Dynamic Pill" approach. The active tab's background uses `layoutId="navTabBg"` to seamlessly glide under the icon.

## 4. Key Component Archetypes

### Skeletons (Loading States)
Instead of a simple fade-in/out pulse, skeletons are designed to mimic real data structure (lists, avatars) while using gradients. They maintain the layout so there are zero Cumulative Layout Shifts (CLS) when data arrives.

### The Dynamic Navigation Pill
- **Location:** Absolute bottom center, restricted width `max-w-[320px]`.
- **Behavior:** Inactive tabs show only an icon. The active tab expands (`width: 'auto'`) to reveal bold text.

## 5. Recruiter Persona & Architecture (React Router + Zustand)

The app is built to showcase a highly polished MVP frontend tailored for UI/UX Reviewers, Interviewers, and Recruiters.

### 5.1 Architecture Setup
- **React Router:** Handles all navigation paths (e.g., `/home`, `/vault`). The bottom navigation links and FAB are globally available across main tabs.
- **Back Navigation:** Use `navigate(-1)` instead of hardcoded paths. This guarantees the user correctly jumps back through the history stack without jarring teleportations.
- **Zustand Store (Persisted State):** Global state (user profile, subscription data, auth status) is managed by Zustand and persisted using `localStorage`. This allows a recruiter to refresh the app without losing their place or having to log in again.

### 5.2 Recruiter Bypass & Demo Data
- **Frictionless Auth:** The login and OTP forms visually enforce constraints (like 4-digit PINs) but will accept dummy data (like `123456`) universally to unblock the reviewer.
- **Skip Paths:** Every tedious setup screen (Permissions, Bank Linking) contains an easily visible "Skip for now" button.
- **Demo Mode Initialization:** The Zustand store defaults to heavily populated dummy data (Fake subscriptions, blocked scams) so the reviewer immediately experiences the UI's full capability.
- **Reset Button:** The Profile page contains a "Reset Demo State" button. This clears local storage and allows the reviewer to restart the flow to test edge cases (like Empty States).

## 6. Edge Case Guidelines (The 10 Edge Cases Rule)

A premium UI must gracefully handle failures and missing data. Follow these rules for every screen:

1. **Empty States:** If a list is empty (e.g., 0 subscriptions), do not show a blank screen. Render a premium glassmorphic container with an illustration and reassuring copy (e.g., "No hidden subscriptions found! Your money is safe.").
2. **Offline Detection:** Wrap network-dependent UI chunks in Offline placeholders. If offline, the UI should gracefully degrade to show cached local data and explicitly state "Offline Mode - Local AI Active".
3. **Skeleton Loaders:** Every fetch request must have a localized skeleton state.
4. **Missing Images:** If a bank or merchant logo fails to load, fallback to a generic `Building` or `Store` Lucide icon inside a colored circle. Never show a broken image link.
