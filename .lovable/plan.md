# Efeitos Matrix + terminal em todo o site

Objetivo: transformar o MK CODE numa experiência viva de "engenharia digital em execução". Chuva de código Matrix sutil de fundo, texto que se digita sozinho, glyphs que embaralham antes de assentar, cursores piscando, scanlines, e blocos que "bootam" ao entrar na viewport — sem virar cyberpunk cafona. Tudo respeita `prefers-reduced-motion`.

## Camadas de efeito

**1. Fundo global — Matrix Rain (canvas)**
- Componente `<MatrixRain />` em canvas, montado uma vez no `__root.tsx` atrás do `<main>`, `position: fixed`, `z-index: -1`.
- Glyphs: mix de katakana + `01` + símbolos `{ } < > / $ _`.
- Cores em duas camadas: azul MK (`--brand`) dominante + ciano (`--cyan`) para o "head" de cada coluna. Nada de verde neon padrão — mantém a identidade.
- Densidade baixa (~8% opacity), velocidade lenta, respira. Pausa quando a aba está oculta e quando `prefers-reduced-motion`.

**2. Hero — boot sequence**
- Eyebrow "INGENIERÍA BRASILEÑA · CONSTRUIDA EN PARAGUAY" entra com efeito **typewriter** + cursor `▋` piscando.
- H1 "Lo que tu empresa necesita / no siempre viene listo." usa **scramble/decrypt**: cada letra embaralha por glyphs aleatórios (~600ms) antes de assentar. A segunda linha assenta depois da primeira.
- Painel MK.SYS ganha uma **linha de boot** no topo que digita `> mk.sys init --region=py --status=online` antes do resto aparecer.
- Terminal box já existente ganha **cursor piscando** real depois do último caractere e as checks `✓` aparecem uma a uma, com delay staggered.
- Curva BR→PY: o path SVG desenha sozinho (`stroke-dasharray` animado) e o dot central percorre a curva em loop lento.

**3. Section reveal — "bootando" no scroll**
Cada seção principal (Manifesto, Capabilities, Selected Systems, Method, Bridge, Founder, Selectivity, FinalCta) recebe um wrapper `<SectionBoot>`:
- Ao entrar na viewport, mostra por ~250ms uma micro-headline mono `[ loading section: capabilities ]` que dá fade e some.
- Título da seção usa scramble reveal (mesma técnica do H1, mais rápido, ~350ms).
- Cards/itens internos entram em stagger vertical (translateY 12px → 0, opacity 0 → 1, 60ms entre itens).

**4. Signal strip — ticker vivo**
A faixa horizontal "01 ARQUITECTURA A MEDIDA / 02 ACCESO DIRECTO..." vira um marquee lento e contínuo, com um LED verde piscando à esquerda (`● live`).

**5. Selected Systems / cards**
- Ao hover: borda ganha um sweep de linha ciano (efeito de "scan"), o número do card conta rápido de 000 até o valor, e um `> open system_XX.md` aparece no rodapé do card com typewriter.
- Idle: leve grain/scanline sobreposta (usar a `mk-noise` utility que já existe).

**6. Bridge (BR → PY)**
- Path do SVG anima o desenho no scroll (scroll-linked, não só uma vez).
- Pacotes de dados (dots ciano) viajam da esquerda pra direita em loop, com trail curto.
- Labels BR/ORIGIN e PY/PROD piscam `● ONLINE` sincronizados.

**7. Founder / Manifesto**
Bloco de texto grande usa **word-by-word reveal** no scroll (cada palavra ganha opacity de 0.15 → 1 conforme entra no viewport central) — dá peso editorial sem virar animação genérica.

**8. Method (5 passos UNDERSTAND → EVOLVE)**
Cada passo é uma linha de terminal:
```
> 01_understand  ready
> 02_architect   ready
> 03_build       ▋
> 04_deploy      pending
> 05_evolve      pending
```
Ao scrollar, os status vão mudando de `pending` → `▋` (cursor ativo) → `ready` em cascata.

**9. Header**
- Wordmark `MK CODE` ganha um subtle glitch (offset RGB rápido) ao carregar a página.
- Nav links: hover mostra `> ` prefix animado em mono.
- Language switch ES/PT: transição com scramble curto do texto do idioma alvo.

**10. Footer**
Termina o site com um bloco terminal: `> connection stable · encarnación-py · [timestamp local]`, timestamp atualiza a cada segundo.

## Detalhes técnicos

- **Motor de animação:** framer-motion (já instalado) + hooks nativos para o canvas e para o typewriter/scramble.
- **Novo:** `src/lib/motion/useScramble.ts`, `useTypewriter.ts`, `useInView.ts` (wrapper leve), `MatrixRain.tsx`, `SectionBoot.tsx`, `TerminalLine.tsx`, `Cursor.tsx`.
- **Perf:** todas as animações desligam via `matchMedia('(prefers-reduced-motion: reduce)')`. O canvas usa `requestAnimationFrame`, pausa em `document.hidden`, limita a devicePixelRatio ≤ 2. Scramble e typewriter cancelam quando desmontam.
- **Sem novos pacotes.** Tudo com o que já existe.

## Diagrama do stacking global

```text
┌─ RootShell ────────────────────────────────┐
│  <MatrixRain />          (fixed, z:-1)     │
│  <Header />                                 │
│  <main>                                     │
│    <SectionBoot> Hero </SectionBoot>        │
│    <SectionBoot> Manifesto </SectionBoot>   │
│    ...                                      │
│  </main>                                    │
│  <Footer />                                 │
└─────────────────────────────────────────────┘
```

## Fora do escopo (evitar cair em cliché)

- Sem chuva verde clássica do filme — usar paleta MK.
- Sem áudio.
- Sem cursor customizado do mouse.
- Sem partículas flutuando aleatórias.
- Sem "hackerman" glitch violento no conteúdo — glitches só em micro-momentos (logo no load, hover de card).

## Aceite

- Home `/es` e `/pt` com todos os efeitos acima ativos e suaves em 60fps.
- `prefers-reduced-motion: reduce` desliga rain, scramble, typewriter, marquee — mantém apenas fades curtos.
- Sem regressão visual: layout, cores e tipografia atuais preservados.
