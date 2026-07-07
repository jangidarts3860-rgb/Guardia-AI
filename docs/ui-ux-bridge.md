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
- **Hierarchy Rules:** 
  - Main Page Headers: `text-2xl font-black tracking-tight`
  - Sub-headers: `text-xs font-bold uppercase tracking-wider text-slate-500`
  - Body Text: `text-xs text-slate-400 leading-normal`

### 2.2 Color Palette & Theming
The application supports both Light and Dark mode, utilizing semantic color mapping via Tailwind CSS. Dark mode uses deep slates to reduce eye strain, while Light mode relies on crisp whites and subtle grays.

**Core Tokens:**
- **Primary Accents:** `cyan-400` / `sky-500` (Used for active navigation, primary buttons, and tech-forward highlights)
- **Security/Success (Verified/Protected):** `emerald-400` / `emerald-500`
- **Warning/Danger (Scam/Freeze):** `red-500` / `amber-500`
- **Backgrounds (Dark Mode):** Base is `slate-950`, floating cards are `slate-900` or `slate-900/40`.
- **Backgrounds (Light Mode):** Base is `slate-50`, floating cards are `white`.

**Ambient Lighting & Depth:**
- Instead of pure flat backgrounds, global radial gradients (`bg-cyan-500/10 blur-[100px]`) are placed at the root level to create ambient "glows" that react as users navigate, adding a premium 3D feel.

### 2.3 Layout & Spacing (Grid System)
- **Standard Padding:** Main screen containers use standard `p-4` or `p-5`.
- **Vertical Rhythm:** Main content sections are spaced using Tailwind's `space-y-4` or `space-y-5`.
- **Component Spacing:** Inner-card elements use tighter spacing `space-y-2` or `space-x-3`.
- **Corner Radii:** We use extremely exaggerated radii for a modern "bubble" aesthetic:
  - Standard Cards: `rounded-2xl`
  - Primary Action Buttons: `rounded-xl`
  - Large Highlight Containers: `rounded-3xl` or `rounded-[24px]`
  - Avatars/Icons: `rounded-full`

### 2.4 Shadows & Elevations (Glassmorphism)
Elevation is achieved through a combination of shadows, borders, and backdrop blurs, avoiding flat opacities.
- **Glassmorphism Borders:** All cards have a subtle inner rim (`border-white/10` or `border-slate-800/80`) to catch the light.
- **Dynamic Shadows:** Floating elements (like the QR Scanner) use colored drop shadows `shadow-[0_0_25px_rgba(6,182,212,0.7)]` rather than generic black drop shadows, making them look like glowing LED buttons.
- **Backdrop Blurs:** The bottom navigation pill and overlay modals utilize `backdrop-blur-xl` and `bg-opacity-70` to let the ambient background glow bleed through naturally.

## 3. Motion & Animation (Framer Motion)

Animations are driven by physics-based `spring` transitions rather than linear CSS easing.

### Page Transitions
- **AnimatePresence:** Applied to the main screen wrapper in `Screens.tsx`.
- **In/Out Flow:** Screens scale down slightly (`0.98`) and fade out, then the new screen scales up from `0.98` and fades in (`duration: 0.15`).

### Micro-Interactions (Universal Tactility)
- **Buttons:** All interactive elements use `whileTap={{ scale: 0.95 }}` and `whileHover={{ scale: 1.05 }}` (where appropriate).
- **Destructive Actions:** Buttons that involve high risk (e.g., Freeze Accounts, Delete Account) utilize infinite "Warning Shakes" (`x: [-5, 5, -5, 5, 0]`) to convey urgency.
- **Active Navigation:** The bottom navigation bar uses a fluid "Dynamic Pill" approach. The active tab's background uses `layoutId="navTabBg"` to seamlessly glide under the icon.

### Dopamine Effects
- Screens celebrating user wins (e.g., saving money from subscriptions) use pronounced spring-pops and infinite floating cards (`y: [0, -5, 0]`) to trigger positive reinforcement.

## 4. Key Component Archetypes

### Skeletons (Loading States)
Instead of a simple fade-in/out pulse, skeletons are designed to mimic real data structure (lists, avatars) while using gradients. They maintain the layout so there are zero Cumulative Layout Shifts (CLS) when data arrives.

### The Dynamic Navigation Pill
- **Location:** Absolute bottom center, restricted width `max-w-[320px]`.
- **Behavior:** Inactive tabs show only an icon. The active tab expands (`width: 'auto'`) to reveal bold text.
- **Central Action:** The QR Scanner button acts as a floating glowing orb inside the nav bar, leveraging deep shadows and gradients to look like a physical jewel.

### Bento Grid Layouts
- Complex settings and statistical data are arranged in "Bento Grids" (masonry-like distinct blocks) rather than long scrolling lists. This reduces cognitive overload.

## 5. View Controller (`Screens.tsx`)
The app uses a faux-routing system driven by the `currentScreen` state. 
- The `App.tsx` component handles the outer chrome (Phone Simulator, Bottom Nav, Top status bar).
- `Screens.tsx` is an orchestration file that houses all 26+ individual screen UI implementations inside a vast switch statement, enabling extremely rapid prototyping without standard router overhead.

## 6. Implementation Checklist for New Screens
When adding a new screen to Guardia AI, ensure the following:
1. Add the screen to the `ScreenId` type in `types.ts`.
2. Create the layout inside `Screens.tsx` switch statement.
3. Wrap all intractable elements in `motion.button` or `motion.div`.
4. Define a loading state if data fetching is simulated.
5. Apply the standard padding `p-4` or `p-5` and use `space-y-4` for consistent vertical rhythm.
