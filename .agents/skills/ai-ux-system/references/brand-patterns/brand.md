# Guardia AI Brand Identity Guidelines

This document outlines the design language, color scales, cards, and styling systems for the Guardia AI mobile and web interfaces.

---

## 1. Color Palette

Guardia AI uses a single source of truth color scheme.

*   **Primary Brand:** Sky Blue (`#0ea5e9` for `brand.500`)
*   **Scale mapping:**
    *   `brand.50` -> `#f0f9ff`
    *   `brand.100` -> `#e0f2fe`
    *   `brand.200` -> `#bae6fd`
    *   `brand.300` -> `#7dd3fc`
    *   `brand.400` -> `#38bdf8`
    *   `brand.500` -> `#0ea5e9` (Primary Brand color)
    *   `brand.600` -> `#0284c7`
    *   `brand.700` -> `#0369a1`
    *   `brand.800` -> `#075985`
    *   `brand.900` -> `#0c4a6e`

---

## 2. Typography

We use **Inter** / **Plus Jakarta Sans** as our primary font. All interfaces must inherit from this scale.
Avoid mixing multiple serif or display styles.

---

## 3. Card Elements

Cards should never use arbitrary backgrounds or ad-hoc custom styles. Use the defined utility classes:

1.  `.card-surface`: Standard information container (subtle grey borders, backdrop blur, dark background).
2.  `.card-ai`: Artificial intelligence insight indicators (subtle sky blue borders and cyan glow shadows).
3.  `.card-danger`: Risk alert and system warning containers (crimson borders and warning red shadows).
4.  `.card-success`: Verified secure and safe-to-use indicators (emerald-green borders and shadow reflections).

---

## 4. Spacing & Safe Areas

Mobile devices have varying bottom bezel curves and camera holes. Always use safe area parameters:
*   Use `env(safe-area-inset-bottom)` or calculate dynamic pad: `pb-[calc(6rem+env(safe-area-inset-bottom))]` for scroll containers.
*   Do not hardcode static pixel values (like `pb-24`) that clip or overlap bottom navigation panels.

---

## 5. Tone & Copywriting

*   **Human First:** Express details in plain, concise English.
*   **Actionable:** State exactly what actions are recommended.
*   **Uniform Language:** Do not inject multi-language translations into individual strings unless fully requested (keep labels consistent).
