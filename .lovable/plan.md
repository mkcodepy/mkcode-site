
# Hero — Bloco BR → PY: hierarquia e animação mobile

Alvo: o painel `SystemVisualization` do `Hero.tsx` (linhas 122–216) — hoje os nós ORIGIN/PROD ficam pequenos, apertados nas laterais e com a curva de deploy espremida no mobile.

## Diagnóstico

- `SystemNode size="sm"` = 64×64 px — pequeno demais como elemento-herói do painel no mobile.
- Layout horizontal `BR ── curva ── PY` só funciona bem em ≥ 480 px; abaixo disso a curva encolhe e some a hierarquia.
- Sem "peso" visual: falta halo, pulso e anel giratório mais expressivo.
- Labels ORIGIN/PROD com `text-[10px]` desaparecem no meio do ruído.

## Mudanças (só no bloco selecionado)

### 1. Layout responsivo em duas variantes

- **< 640 px (mobile):** rota vertical BR → ↓ → PY, ocupando toda a largura do painel.
  - Nós grandes `size="lg"` (128 px) centralizados.
  - Linha animada vertical (SVG) entre eles, com "packet" descendo em loop.
  - Labels ORIGIN / PROD promovidos: `text-[11px] tracking-[0.28em]` + subrótulo em display font ("BRASIL — SÃO PAULO" / "PARAGUAY — ENCARNACIÓN").
  - Distância mínima entre nós = 96 px para dar respiro.
- **≥ 640 px (sm+):** mantém a rota horizontal atual, mas com nós `size="md"` (era `sm`) e curva mais alta.

### 2. Novo `SystemNode` — variante "hero"

Prop opcional `emphasis?: "hero"` no `primitives.tsx` que adiciona:
- Anel cônico girando lentamente (12 s) com máscara para virar traço fino.
- Halo pulsante externo (box-shadow em `mk-pulse-dot` mais forte).
- Núcleo com gradiente radial sutil (bandeira BR ou PY em `mix-blend-overlay` a 15% opacidade — referência sem cafonice).
- Micro-selo abaixo do código: `MK.NODE / 01` estilo terminal.
- `will-change: transform` só quando visível.

Fallback quando `prefers-reduced-motion`: sem giro, mantém halo estático.

### 3. Rota animada mais rica (mobile)

SVG vertical 2×140 (px) entre os nós:
- Linha base tracejada com gradiente BR-green → cyan → PY-red.
- 3 packets (`animateMotion`) descendo em cascata (offset 0 s / 1.2 s / 2.4 s).
- Ticks laterais a cada 20 % com labels curtinhos: `HANDSHAKE`, `TRANSIT`, `LANDING`.
- Texto "DEPLOY ROUTE" com `ScrambleText` on-view.

### 4. Hierarquia tipográfica

Ordem clara no mobile de cima para baixo:
1. `BR` (128 px node) + `ORIGIN` + `BRASIL — SP`
2. rota vertical animada + label da rota
3. `PY` (128 px node) + `PROD` + `PARAGUAY — ENCARNACIÓN`
4. divisor
5. blocos existentes (boot line, TechCard grid, TerminalBox, footer)

### 5. Padding e safe-area

- Painel externo: `p-4` no mobile (era `p-5`), com `px-6` interno na área dos nós para não colar nas bordas.
- Gap vertical entre seções internas ajustado com `space-y-6` mobile / `space-y-5` desktop.

## Performance

- Um único SVG por variante (mobile/desktop), condicional via `useIsMobile()`.
- `animateMotion` é GPU-friendly; sem canvas novo.
- Reutiliza tokens/keyframes existentes (`mk-dash`, `mk-blink`, `mk-pulse-dot`); nenhum keyframe global novo.
- Sem impacto no bundle — apenas markup.

## Arquivos a editar

- `src/components/home/Hero.tsx` — `SystemVisualization` (novo layout + branch mobile/desktop).
- `src/components/system/primitives.tsx` — `SystemNode` ganha prop `emphasis` e ajustes de anel/halo.

Nenhuma mudança de conteúdo/i18n, nenhum efeito fora do painel.

## Entregável

Screenshots Playwright em 320 / 375 / 414 / 640 / 1024 px comparando antes/depois, confirmando que a hierarquia BR → PY vira o herói visual do painel no mobile.
