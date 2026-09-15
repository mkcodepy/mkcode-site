# MK CODE — second pass premium completion

## Goal
Complete the current bilingual one-page experience without redesigning it. Preserve the approved dark technical identity, cyan system language, typography, character artwork, content, routes, cards, two-column hero, Matrix ambience, and existing motion primitives while strengthening composition, interaction, continuity, and finish across mobile, tablet, desktop, and ultrawide.

## Art-direction constraints
- Preserve current copy and destinations unless a technical correction is necessary; do not add marketing copy to fill space.
- Keep Direct Access, Tools, Connect, and Footer visually distinct while sharing one MK CODE interaction and typography language; do not convert every section into the same card pattern.
- On mobile, protect text and CTA legibility by repositioning or resizing the character before compressing typography or content.
- Treat `768–912px` as a dedicated tablet composition; controls may stack when translated labels need width.
- Add no decorative effect unless it improves hierarchy, interaction, or spatial integration. No added neon intensity, particles, animated blur, HUD clutter, or gratuitous grids.

## Confirmed audit findings
- The current page already has one H1, loaded character artwork, working ES/PT routes, no horizontal overflow or console errors across `320–2560px`, and tap targets generally at least `44px`.
- Hero height is now controlled at roughly `552–614px` from tablet through ultrawide, and all principal areas use the same capped `1280px` system.
- At `375–430px`, the absolute character crosses the action area; this creates the intended depth but weakens control contrast and legibility.
- At `768px`, the hero technically splits into two columns, but the controls stack while the upper visual column carries unused space, so tablet still reads as a transition rather than a fully composed layout.
- At `1024px`, four direct-access cards fit but secondary text truncates aggressively; at larger widths the sections are structurally sound yet visually understated compared with the hero.
- The hero reveal is only partially sequenced: status, headline, actions, and character have independent delays, while identity, supporting copy, status/location, and interface details do not share one deliberate boot rhythm.
- Direct-access, tools, social endpoints, section labels, and footer use consistent tokens but remain visually basic. Missing GitHub and X destinations are correctly left inactive and must stay uninvented.
- Matrix Rain already handles reduced motion, constrained connections, DPR, resizing, and hidden tabs; it should be tuned only if visual review shows competition with content.

## Implementation

### 1. Finish the hero composition
- Keep the existing two-column structure and compact height, but refine the grid gap, copy width, headline clamp, and visual-column alignment at `768`, `834`, `912`, `1024`, `1280`, `1440`, `1600`, `1920`, and `2560px`.
- Replace brittle mobile character offsets with controlled responsive positioning that preserves the current crop and identity while protecting CTA legibility.
- Keep the character proportional and capped; tune vertical position, halo, interface line, and label as one visual assembly anchored to the shared container.
- Use the interface line and local light as a subtle bridge toward the text so the two columns read as one composition, without stronger neon or animated blur.
- Preserve the mobile composition, correcting only proven overlap, crop, or readability problems.

### 2. Orchestrate a fast system-boot sequence
- Define one short sequence: system status → terminal signal → headline → identity/disciplines → description → controls → character → interface signal.
- Coordinate the existing Framer Motion, scramble, typewriter, glitch, cursor, line scan, and parallax effects instead of adding a second animation system.
- Keep the full reveal fast and immediately usable; use opacity and small transforms, reserve continuous motion for subtle line/signal/parallax life, and avoid scale spectacle, shake, particles, layout animation, or animated blur.
- Provide a stable reduced-motion state with content visible immediately and no continuous movement; retain constrained-connection safeguards.

### 3. Turn hero actions into signature MK CODE controls
- Preserve the current compact size, labels, project routes, and email action.
- Add restrained corner markers, active signal state, border/data-line travel, arrow movement, tactile press feedback, and a strong keyboard focus treatment using semantic tokens.
- Choose side-by-side or stacked presentation by available measured width and translated label length, not by one blanket tablet breakpoint.
- Ensure the character can never lower the controls' contrast or block their pointer area.

### 4. Refine Direct Access modules
- Preserve the four existing destinations and mobile reading order.
- Improve card proportion, internal grid, title/description hierarchy, index placement, icon housing, endpoint state, and arrow alignment.
- Give available links a precise border response, small positional lift, line sweep, signal activation, and arrow travel; keep inactive links visually supported but clearly pending and non-interactive.
- At tablet/laptop widths, prevent awkward description truncation by adjusting grid density and card internals rather than shrinking text.
- Keep static cards premium and readable without depending on hover.

### 5. Strengthen Tools as a runtime inventory
- Keep the real four tools and their existing destinations; do not invent products, categories, logos, or recommendations.
- Recompose the section as a compact technical inventory using the existing category data, stronger metadata rhythm, consistent icon/index treatment, and purposeful open/external feedback.
- Use BUILD, AI, and current configured categories only; introduce broader grouping only if supported by actual content.
- Match Direct Access interaction language while retaining a distinct, denser inventory character.

### 6. Unify social endpoints and footer
- Present Instagram, email, and unavailable GitHub/X as compact system endpoints rather than generic social cards.
- Make active, external, and pending states immediately understandable without adding explanatory copy or invented URLs.
- Refine the footer into a deliberate compact closing band with current identity, system metadata, bilingual copy, and a clear visual endpoint.
- Preserve the email action and external-link behavior, adding consistent focus, hover, and touch feedback.

### 7. Connect sections into one interface
- Normalize vertical rhythm from Hero → Direct Access → Tools → Connect → Footer across mobile, tablet, laptop, and desktop.
- Upgrade section labels with a consistent index, rule, signal marker, and restrained mono metadata treatment.
- Use existing grid lines, borders, and small interface details to close and open sections; remove arbitrary blank bands without turning page sections into floating cards.
- Tune the background hierarchy so grid, Matrix Rain, pointer spotlight, local halo, and separators support content rather than compete with it.

### 8. Typography and interaction polish
- Review display/mono contrast, line lengths, metadata legibility, translated label fit, paragraph widths, and heading hierarchy at every target width.
- Unify navigation, language switch, cards, tools, social links, arrows, status dots, and focus states into one engineered interaction language.
- Animate only meaningful state changes and in-view entrances; preserve stable dimensions to avoid layout shift.
- Keep implementation within the current dependencies and semantic design tokens.

## Technical scope
- Create a private recovery checkpoint of the current successful source state before implementation.
- Primary work: `src/components/hub/IdentityHub.tsx`, `src/styles.css`, and localized hub configuration where interface metadata must be translated.
- Reuse current `framer-motion`, motion preference hooks, route links, character asset, Matrix Rain, and design tokens.
- Split focused internal hub primitives if the main component becomes difficult to maintain; do not alter unrelated institutional pages or routes.
- Do not replace artwork, add Canvas/WebGL, add packages, invent external destinations, or expand the page's content scope.

## Validation and final review
- Test Spanish and Portuguese at `320`, `360`, `375`, `390`, `430`, `768`, `820`, `834`, `912`, `1024`, `1280`, `1440`, `1600`, `1920`, and `2560px` where practical.
- Verify no horizontal overflow, clipping, unintended overlap, stretched artwork, broken routes, failed images, dead email action, console errors, or layout shifts.
- Confirm one H1, visible keyboard focus, logical tab order, adequate tap areas, non-interactive pending endpoints, reduced-motion behavior, and lightweight continuous effects.
- Capture and critically review final screenshots at `375`, `430`, `768`, `1024`, `1440`, and `1920px`; correct remaining spacing, alignment, hierarchy, character integration, tablet compromise, generic modules, and weak section endings before completion.
- Judge each screenshot as art direction, not only technical correctness: every viewport must feel intentional, no area should read as a generic developer/AI template, no supporting section should feel unfinished beside the hero, and the page must remain one coherent interface through the footer.
