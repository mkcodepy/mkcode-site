
# MK CODE — Plan

## 1. Brand interpretation

MK CODE is a **selective digital engineering studio**, not an agency. Brazilian engineering executed from Encarnación, Paraguay. The site must feel like the headquarters of a boutique studio that ships production software — precise, dark, architectural, confident without being loud. The conversion is a **qualified WhatsApp conversation**, not a lead funnel.

## 2. Creative concept — "BR → PY / Digital Infrastructure Bridge"

A continuous digital route runs across the site: originates at a BR node in the hero, threads through every section as a subtle infrastructure line, and terminates at a PY production node in the final CTA. National colors appear only as micro-signal accents on nodes; electric blue dominates. No flags, no maps, no handshakes — represented through nodes, routes, packets, deployment states, and technical coordinates.

## 3. Visual direction

- **Dark cinematic editorial.** Backgrounds `#05070B` / `#080D15` / `#0B1320`. Electric blue `#1677FF` dominant, cyan `#69D5FF` for highlights.
- **Asymmetry over centered stacks.** Alternating editorial left-aligned blocks, technical grids, horizontal tracks, vertical timelines, and full-width statements.
- **Restrained radius** (6/10/16), thin borders, controlled glows, no pill everything.
- **Type:** Sora Variable (display), Manrope Variable (body), JetBrains Mono (labels). Fluid `clamp()` sizing.
- **Motion:** slow data pulses, staggered reveals, scroll-linked timeline, no particle storms / WebGL / video backgrounds. Full `prefers-reduced-motion` support.

## 4. Page architecture

Routes (Spanish primary, Portuguese secondary):

```
/                     → redirect to /es
/es                   → Home
/es/capacidades       → Capabilities
/es/proyectos         → Selected systems index
/es/proyectos/:slug   → Project detail
/es/mk-code           → Founder / studio
/es/contacto          → Contact
/pt, /pt/capacidades, /pt/projetos, /pt/projetos/:slug, /pt/mk-code, /pt/contato
```

Home section flow (matches the visitor journey in §13):
1. Header (transparent → translucent on scroll)
2. Hero (asymmetric 55/45 with system visualization + BR node origin)
3. Positioning signal strip
4. Manifesto (editorial 01→05 sequence, scroll-active)
5. Capabilities (4 modules, each with its own technical composition)
6. Selected systems (3 project archetypes + confidentiality statement)
7. Method (5-stage horizontal timeline / vertical on mobile)
8. BR → PY bridge (hero visual moment, dual nodes)
9. Founder / direct responsibility
10. Selectivity statement
11. Final conversion (route terminates at PY production node)
12. Footer

## 5. Component system

Design tokens in `src/styles.css` (`@theme` + `:root`): color, spacing, container, radius, shadow, blur, motion duration/easing, z-index, focus rings.

Reusable components under `src/components/`:
- `brand/` — `Monogram.tsx`, `Wordmark.tsx`, `Favicon` sources
- `layout/` — `Header.tsx`, `MobileMenu.tsx`, `Footer.tsx`, `Container.tsx`, `SectionEyebrow.tsx`
- `system/` — `SystemNode.tsx`, `RouteLine.tsx`, `DataPulse.tsx`, `Console.tsx`, `StatusIndicator.tsx`, `ArchitectureDiagram.tsx` (the reusable BR→PY visual primitives)
- `home/` — `Hero.tsx`, `SignalStrip.tsx`, `Manifesto.tsx`, `Capabilities.tsx`, `SelectedSystems.tsx`, `Method.tsx`, `BridgeSection.tsx`, `Founder.tsx`, `Selectivity.tsx`, `FinalCTA.tsx`
- `ui/` — `Button.tsx` (primary/secondary/ghost), `Tag.tsx`, `LangSwitch.tsx`, `CommandHint.tsx`
- `contact/` — `ContactForm.tsx` (Zod validated, WhatsApp handoff)

## 6. Bilingual content strategy

- Typed dictionary at `src/content/i18n.ts` with namespaces (`nav`, `hero`, `manifesto`, `capabilities`, `projects`, `method`, `bridge`, `founder`, `selectivity`, `finalCTA`, `contact`, `footer`).
- Two locale files: `src/content/es-PY.ts`, `src/content/pt-BR.ts`. Strictly typed — TS enforces parity.
- Voseo enforced in Spanish. Natural Brazilian Portuguese, not literal translations.
- Locale resolved from URL segment via a route param `$lang` (`/$lang/...`) with a validated union `"es" | "pt"`. `useLocale()` hook wraps `Route.useParams()`.
- Language selector preserves current path when switching; saves preference to `localStorage` (read in `useEffect`, not in SSR).
- `<html lang>`, canonical, `hreflang="es-PY" / "pt-BR" / "x-default"` set per route via `head()`.

## 7. Mobile strategy

- Hero: copy first, then a recomposed (not scaled) system visualization with fewer animated lines.
- Header collapses to monogram + lang + menu; full-panel menu with focus trap, ESC close, ARIA.
- Method timeline pivots to vertical.
- Capabilities become vertical cards with all detail visible (no hover-only content).
- BR → PY bridge remains centerpiece but simplified.
- Fluid type via `clamp()`; no horizontal overflow anywhere.

## 8. Animation strategy

- **Framer Motion** for reveals, staggered text, scroll-linked timeline progress.
- **SVG-based** system visualizations (BR→PY route, nodes, pulses) — no WebGL.
- Data pulses via animated SVG `strokeDashoffset` on route lines.
- Scroll-active method stage using `useScroll` / `useTransform`.
- All motion honors `prefers-reduced-motion` with a static fallback.

## 9. Technical architecture

- **TanStack Start + Tailwind v4** (existing stack). No backend for v1.
- Routes reorganized under `src/routes/$lang/...` with a `$lang` layout that validates the segment, sets `<html lang>`, and provides locale context.
- Root `/` route redirects to `/es`.
- **Config**: `src/config/site.ts` with the provided `siteConfig` object (WhatsApp placeholder `595XXXXXXXXX` kept until user provides real number).
- **Data**: `src/data/projects.ts` with typed representative projects (no fake clients).
- **Contact form**: Zod validation → formats a bilingual project brief → opens `wa.me/<number>?text=...` with `encodeURIComponent`. `mailto:` fallback. No fake success states.
- **SEO**: per-route `head()` with unique title/description/og, JSON-LD Organization on root, hreflang alternates, canonical self-references.
- **Assets**: `src/assets/` for future founder photo and social preview; MK monogram as reusable SVG component; `favicon.svg` generated from the same monogram.
- **Accessibility**: semantic landmarks, visible focus rings, keyboard-navigable capabilities, ARIA on menu/form, contrast checked in dark palette.

## 10. Milestones (post-approval)

1. **Foundation** — tokens, typography, brand SVG (monogram/wordmark/favicon), layout primitives, locale routing + i18n dictionary, header/footer/mobile menu, language switch.
2. **Home part A** — hero (asymmetric + system visualization), signal strip, manifesto with scroll-active sequence.
3. **Home part B** — capabilities (4 distinct compositions), selected systems (3 archetypes + confidentiality), method timeline.
4. **Home part C** — BR → PY bridge section, founder, selectivity, final CTA with route terminus.
5. **Inner pages** — `/capacidades`, `/proyectos` + `/proyectos/:slug`, `/mk-code`, `/contacto` with WhatsApp handoff.
6. **Polish** — SEO metadata per route, hreflang, JSON-LD, reduced-motion pass, responsive QA, accessibility audit.

## 11. Assumptions (no blocking questions)

- **WhatsApp number**: using the `595XXXXXXXXX` placeholder from your `siteConfig`; you can drop the real number into `src/config/site.ts` at any time and every CTA updates.
- **Founder photo**: monogram + directional lighting placeholder in `Founder.tsx` with a single import point to swap for the real photo later.
- **Representative projects**: three archetypes exactly as specified — no invented clients, logos, or metrics.
- **Social preview**: a monogram-based OG image will be generated for the root; leaf routes omit `og:image` until real imagery exists.

If you approve, I'll switch to build mode and start with Milestone 1.
