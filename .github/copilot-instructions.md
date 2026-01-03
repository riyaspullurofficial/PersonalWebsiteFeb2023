# Copilot Instructions for this project

## Quick summary 🚀
This is a small, static personal-portfolio site (no build system):
- Single-page HTML/CSS/JS app: `index.html`, `styles.css`, `script.js`
- No package.json, no test harness, no CI configuration
- Production preview: open `index.html` in a browser or use a Live Server extension

## What to know (big picture) 🔍
- The site is organized as discrete sections (hero, about, skills, experience, projects, contact) in `index.html`. Section IDs are used as anchors for navigation (e.g. `#hero`, `#projects`).
- UI behavior is implemented in `script.js` with modular init functions: `initNavigation()`, `initScrollAnimations()`, `initSkillsCarousel()`, `initButtonRipple()`, `initStickyCTA()`, `initSmoothScroll()`.
- Styling uses design tokens defined in `:root` of `styles.css` (colors, spacing, typography). Reuse those tokens for consistent look-and-feel.

## Conventions & patterns to follow ✅
- Keep changes small and focused (this is a tiny site). One change = one commit + descriptive message.
- Prefer using existing CSS variables from `styles.css` instead of adding new hard-coded colors.
- JavaScript: follow the existing pattern of adding a new `initX()` function and calling it from `DOMContentLoaded` if you add features.
- Use semantic HTML and the existing section structure; add ARIA attributes where appropriate (e.g., `aria-label` on interactive elements).

## Files / examples to reference ✏️
- `index.html`: navigation + section layout, social links, meta description
  - Example: mobile menu toggle uses `#navToggle` and toggles `.active` on `.nav-menu`.
- `script.js`: dom-ready initializers and IntersectionObserver-based reveal animations
  - Example: update nav active links in `updateActiveNavLink()` (search by section offsets)
- `styles.css`: tokens in `:root`, `.reveal` animation helpers, `.btn` styles, and responsive behaviors
  - Example: animation classes `animate-fade-up` + `.delay-*` are used for staged reveals

## Developer workflows / testing 🧪
- Local preview: open `index.html` in a browser (or use Live Server). Test on desktop and mobile widths; exercise the mobile menu, skills carousel (touch swipe), sticky CTA, and button ripple.
- Performance & accessibility: run a Lighthouse audit in Chrome; check `prefers-reduced-motion` behavior and keyboard navigation for focus states.
- If adding JS features, include a small manual test section in the PR description describing steps to validate.

## Things to avoid / watchouts ⚠️
- Do not add a heavy build toolchain unless there's a clear need (create and document `package.json` if you do).
- There is no test framework yet—avoid adding tests that require new infra without discussing the change.
- External dependencies: Google Fonts are loaded from `fonts.googleapis.com`; prefer inlining small SVGs (current approach) rather than adding a dependency.

## Example PR checklist ✅
- Describe the change and why it was needed
- Provide manual test steps (desktop + mobile) referencing relevant IDs/classes (e.g., `#navToggle`, `.skills-track`)
- Include before/after screenshots for visual changes
- Use CSS tokens for new colors and avoid duplicating styles

---

If anything is missing or you'd like more detail (e.g., preferred commit message format, test steps for a specific change), tell me what to emphasize and I'll update this file. Thanks!