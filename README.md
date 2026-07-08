<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# 🛡️ Guardia AI — Live Showcase App

This repository contains the interactive prototype of **Guardia AI** — a premium cybersecurity & subscription protection mobile app built with React, TypeScript, and TailwindCSS.

---

## 🚀 Live Showcase URL Parameters

When deploying this app on Vercel or running locally, you can use the following URL query parameters to showcase the app in different layout styles:

### 1. Default Showcase Mode (No parameters)
* **Desktop Link:** `https://guardia-ai.vercel.app/`
* **Layout:** Hides the Screen Explorer panels. Displays ONLY the beautiful centered physical **Phone Simulator Device Mockup** (bezel chasis, status bars, and floating glowing backdrops).
* **Mobile Link (Actual phone browser):** Automatically detects mobile user-agent/viewport, bypasses the simulator frame entirely, and stretches the app to **100% full-screen** with native-like response.

### 2. Full-Screen Viewport Mode (`?pure=true` or `?mobile=true`)
* **URL:** `https://guardia-ai.vercel.app/?pure=true`
* **Layout:** Renders the screen layouts directly into the browser window (filling 100vw and 100dvh). There is no phone border, status bar overlays, or speaker notch. Great for actual mobile browser testing.

### 3. Developer/Debug Explorer Mode (`?dev=true` or `?debug=true`)
* **URL:** `https://guardia-ai.vercel.app/?dev=true`
* **Layout:** Displays the left **Screen Explorer (Flow Navigator)** panel alongside the phone simulator, allowing you to instantly force-switch between all 28 simulated screen states.

---

## 🛠️ Run Locally

**Prerequisites:** Node.js (v18+)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the local development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000/` in your browser.

---

## 📸 Automated Screenshot Capture Script

To export retina-quality screenshots of all 28 screen views without status bar overlays, battery icons, or camera notches:

1. Ensure the dev server is active (`npm run dev` running on port 3000).
2. Execute the Playwright export script:
   ```bash
   node scripts/capture-screens.js
   ```
3. Fresh screenshots will be exported to the `figma-screenshots/` directory.

