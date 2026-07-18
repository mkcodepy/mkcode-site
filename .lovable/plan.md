
# Auditoria mobile completa — MK CODE

Objetivo: revisar cada bloco do site em mobile (320–640px) garantindo hierarquia visual forte, harmonia tipográfica, respiração adequada, alvos de toque acessíveis e zero desproporção. Sem alterar desktop.

## Método

1. Capturar screenshots via Playwright em 320px, 375px, 414px e 640px de cada seção.
2. Comparar contra checklist de padrões abaixo.
3. Aplicar ajustes por componente em uma única passagem coordenada.
4. Reverificar com screenshots antes/depois.

## Padrões mobile a aplicar (checklist global)

- **Ritmo vertical**: seções `py-14` no mobile → `sm:py-20` → `md:py-28` → `lg:py-36`. Consistente entre todas as seções home.
- **Tipografia display (h2)**: `clamp(1.75rem, 6.4vw, 3rem)` com `leading-[1.05]` e `tracking-[-0.02em]`. Eyebrow com `mt-3` no mobile.
- **Parágrafos**: `text-[15px] leading-[1.65]` mobile, `md:text-base`. Largura máx `max-w-[52ch]`.
- **Cards**: `p-5` mobile, `md:p-8`. Border-radius consistente `rounded-lg`. Gap entre cards `gap-3` mobile, `md:gap-4`.
- **Eyebrows / mono labels**: `text-[10.5px] tracking-[0.22em]`. Nunca menor que 10px.
- **Alvos de toque**: mínimo 44px (`min-h-11`). Links inline mono com `py-1` para área tocável.
- **Grid → stack**: todos os grids 2/3 col colapsam para 1 col abaixo de 640px, exceto módulos de terminal (2 col).
- **Espaço horizontal**: Container `px-5` mobile, `sm:px-6`, `md:px-8`. Safe-area já aplicado.
- **Hierarquia dentro de cards**: número/tag → título → descrição → tags. Espaçamento `mt-5, mt-3, mt-5`.

## Ajustes por componente

### `Hero.tsx`
- Reduzir `pt-28` para `pt-24` no mobile (header não é tão alto).
- Heading: garantir `clamp(2rem, 8.5vw, 5rem)` para escalar melhor em 320px.
- Parágrafo: `text-[15.5px]` mobile, `max-w-[54ch]`.
- Techlabel row: quebrar melhor com `gap-y-1.5`, remover barra `/` quando empilhado.
- SystemVisualization: reduzir `p-4` → `p-4` mantém, mas ajustar internal spacing (mt-6 → mt-5); reduzir altura da rota vertical `h-[150px]` → `h-[130px]` em 320px.
- TechCards em grid-cols-3: forçar `grid-cols-3` com `text-[9.5px]` para caber sem quebra em 320px, ou empilhar em 2+1.
- Console terminal: fonte `text-[10.5px]` para legibilidade.

### `SignalStrip.tsx`
- Marquee: pausa se prefers-reduced-motion. Padding vertical `py-3` mobile.
- Fonte `text-[10.5px] tracking-[0.24em]`.

### `Manifesto.tsx`
- Padding seção padronizado.
- Steps: mobile `text-[1.35rem]` com `leading-[1.15]`; opacidade steps inativos `0.55`.
- Espaçamento vertical entre steps `space-y-6` mobile.

### `Capabilities.tsx`
- Header grid quebrar melhor: título full-width, supporting em bloco abaixo com `mt-4`.
- Cards: `p-5 md:p-8`. Título `text-[1.15rem] md:text-2xl`. VisualBadge menor no mobile (48x30) para não competir com número.
- Tags: `text-[10px]` com `px-2 py-1`, gap `gap-1.5`.

### `SelectedSystems.tsx`
- Header ok, mas parágrafo `mt-5` mobile.
- Cards projeto: mobile stack — texto primeiro, ModuleGrid depois com `mt-6`.
- ModuleGrid: `grid-cols-2` mobile com `text-[10px]`, `p-2.5`. Título projeto `text-[1.25rem]` em 320px.
- Confidentiality banner: stack vertical clean, CTA full width mobile.

### `Method.tsx`
- Já compactado; validar que terminal lines quebram sem overflow horizontal em 320px. Truncar filenames se necessário.

### `Bridge.tsx`
- Nodes já responsivos; garantir label sublabels não estouram — `text-[9.5px]` mobile.
- Rota SVG central: espessura consistente.

### `Founder.tsx`
- Portrait: full-width mobile com `aspect-[4/5]`. Monogram overlay proporcional (`h-14 w-14` mobile).
- Quote: `text-[1.15rem] leading-[1.35]` mobile.
- Bio meta list: `text-[11px]` mono, `space-y-2`.

### `Selectivity.tsx`
- Lista de critérios: cards empilhados com `p-5`. Número grande à esquerda `text-3xl` mobile.
- Espaço entre cards `space-y-3`.

### `FinalCta.tsx`
- Já com CTAs empilhados. Aumentar título mobile: `clamp(1.75rem, 7vw, 3.5rem)`.
- Adicionar `min-h-[60vh]` mobile para presença; reduzir `py-`.
- Botões `w-full` já ok, garantir gap `gap-3`.

### `Header.tsx` / `Footer.tsx`
- Header mobile: garantir nav drawer com padding e safe-area top.
- Footer: colunas empilham; separadores mais suaves; monogram + wordmark alinhados; language switch acessível (min 44px).

### Detalhes globais
- `src/styles.css`: adicionar `.mk-touch { min-height: 2.75rem; }` utility se necessário.
- Verificar `Container` para `px-5` mobile.
- Garantir que nenhuma seção causa overflow-x (adicionar `overflow-x-hidden` no `<body>` já em __root).

## Verificação

Após aplicar mudanças:
- Screenshots Playwright em 320, 375, 414, 640, 768px.
- Rolar página completa e comparar antes/depois de cada seção.
- Confirmar: zero overflow horizontal, títulos legíveis, cards com ar, botões ≥44px, hierarquia clara em cada bloco.

## Escopo

Somente CSS/JSX de apresentação nos componentes listados + `src/styles.css` e `Container.tsx` se necessário. Sem mudanças em conteúdo, i18n, rotas, ou lógica.
