# MK CODE desktop and tablet composition refinement

## Goal
Refine only the current one-page layout at tablet and desktop widths so the hero feels centered, compact, integrated, and editorial. Preserve the existing identity, content sections, character artwork, animations, mobile cards, language switcher, and mobile composition.

## Confirmed current issues
- At desktop widths, the hero has a `720px` minimum height even when its content needs less space.
- The character is positioned in an absolute layer tied to the right side of the hero rather than its visual column, creating excessive central space.
- The desktop headline is fixed at `7.7rem`, making the left side feel disconnected from the character.
- Main sections use a `1280px` content width, while the top bar uses `1360px`, slightly weakening alignment across the page.
- The “Acceso directo” section begins below a larger-than-needed hero boundary.

## Implementation

### 1. Recompose the hero for tablet and desktop
- Keep the current mobile layout and its absolute character treatment below the tablet breakpoint.
- From tablet upward, create a true centered two-column composition inside the existing maximum-width system.
- At desktop, use an approximately `55% / 45%` content-to-visual split with both columns participating in the same grid.
- Make the character column relative to the centered container, not the viewport edge.
- Keep the character’s original aspect ratio, cap its rendered size, and use controlled bottom cropping around the upper legs where needed.
- Position the character closer to the copy without allowing overlap or drift on ultrawide screens.

### 2. Tighten desktop hierarchy and height
- Reduce the desktop `MK CODE` headline to a strong but controlled responsive size.
- Preserve the existing system label, terminal line, identity line, disciplines, supporting copy, status, and location.
- Target a hero composition around `560–620px` tall on desktop, with a graceful tablet height rather than a full-screen presentation.
- Preserve the existing entrance, scramble, typewriter, pointer spotlight, and character parallax behaviors.

### 3. Add compact hero actions
- Add `VER PROYECTOS →` and `HABLAR CONMIGO` below the supporting copy using the existing projects route and contact email.
- Add equivalent Portuguese labels on `/pt`.
- Style them as compact MK CODE system controls using the current border, mono-label, cyan, focus, and motion language—not generic SaaS buttons.
- Keep their spacing and touch targets accessible without disturbing the mobile card system.

### 4. Integrate the character visually
- Reposition the existing halo, interface line, and `HUMAN / SYSTEM INTERFACE` detail inside the visual column.
- Use the line and glow to bridge the content and character subtly, without increasing neon intensity.
- Prevent the character from becoming oversized at 1440px and wider.

### 5. Unify page width and section transitions
- Align the hero, top bar, direct-access cards, tools, and footer to the same centered `1200–1280px` content system.
- Reduce the gap between the hero and `01 — ACCESO DIRECTO` so the next section enters naturally.
- Review tablet/desktop section spacing and card-grid rhythm only; preserve mobile card styling and content structure.

## Responsive rules
- **Below 768px:** preserve the current mobile composition and card layout.
- **768–1023px:** use a controlled transitional composition with balanced text and character sizing before space becomes cramped.
- **1024–1439px:** use the compact two-column hero with fluid typography and a bounded character.
- **1440px and above:** keep the entire composition centered and capped; no element may drift toward viewport edges.

## Validation
- Visually review at `320`, `375`, and `430px` to confirm no mobile regression.
- Review tablet and desktop at `768`, `834`, `1024`, `1280`, `1440`, and `1920px`.
- Confirm no horizontal overflow, text clipping, character stretching, action overlap, or giant transition gaps.
- Confirm the character remains proportional, the first section follows the hero naturally, and reduced-motion behavior still works.
- Check keyboard focus, touch target sizing, one-H1 structure, console errors, and image loading before completion.
