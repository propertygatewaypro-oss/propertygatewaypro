# Design Taste Standards — Property Gateway
## Anti-Slop Frontend System & High-End Visual Execution

Based on **TasteSkill 2.5** (`Leonxlnx/taste-skill` / `tasteskill.dev`), this document establishes the art direction, visual taste, and layout execution rules to build **Property Gateway** at the caliber of modern benchmark websites (such as `figma.com` and `x.ai`).

---

## 1. Core House Rules for Property Gateway

1. **One Section Per Screen:**
   * At standard viewports (`1440×900` / `1280×800`), the hero section commands the entire initial screen. No secondary section header peeks in from the bottom.
2. **Equal Edges & Strict Grid Rhythm:**
   * Content margins must be perfectly aligned across headers, cards, content blocks, and footers (`max-w-7xl mx-auto px-6`).
3. **Restrained, Tactile Micro-Interactions:**
   * Linked property cards subtly lift **2px** on hover (`translate-y-[-2px]`).
   * Images subtly zoom **1.02× – 1.03×** inside a fixed `overflow-hidden` container.
   * Buttons feature a distinct press state (`active:scale-[0.98]`).
   * Strictly **no dizzying 3D card tilt**, and **no auto-sliding carousels** that snatch control away from the user.
4. **Real Architectural Photography Over Abstract Graphics:**
   * Because real estate is an authentic physical trade, use high-resolution photographs of real Chennai apartments, luxury villas, and commercial spaces.
   * Strictly avoid abstract 3D floating spheres, neon cyber shaders, or generic illustrations.
5. **Clear, Direct Copywriting (No Fluff):**
   * State plainly what is offered: *"Verified residential apartments, coastal villas, and commercial spaces across Chennai with direct builder pricing."*

---

## 2. Spatial Scale & 8pt Mathematical Grid

All padding, margins, and gaps must follow the 8px mathematical ladder:
* `xs`: 4px / 0.25rem (internal chip padding)
* `sm`: 8px / 0.5rem (input gap, badge padding)
* `md`: 16px / 1rem (card padding, mobile container padding)
* `lg`: 24px / 1.5rem (card grid gap, tablet container padding)
* `xl`: 32px / 2rem (section padding on mobile)
* `2xl`: 48px / 3rem (desktop grid gaps)
* `3xl`: 64px / 4rem (major section vertical rhythm)
* `4xl`: 96px / 6rem (hero vertical clearance)

---

## 3. Typographic Hierarchy & Measure

* **Display Headings:** Tight letter-spacing (`tracking-[-0.03em]`), semi-bold (600) to bold (700). Line-height capped at 1.1–1.15.
* **Body Text:** Standard tracking, relaxed line-height (`leading-relaxed`), comfortable reading measure (60–75 characters per line).
* **Numerical Data & Currency:** Tabular figures for prices (`₹1.25 Cr`), area (`1,850 sq.ft`), and BHK specifications to prevent layout jitter.
