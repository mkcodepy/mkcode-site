# MK CODE Digital Identity Hub

## Objetivo
Transformar as homes `/es` e `/pt` em uma one page curta, premium e mobile-first para tráfego do Instagram, preservando a identidade visual e as páginas internas existentes.

## Experiência
- Hero de impacto imediato com MK CODE, Marcos, especialidades, status online e localização.
- Personagem original integrado à composição, sem card/círculo/avatar, com enquadramento próprio para mobile e desktop.
- Links essenciais como módulos de sistema interativos, não como lista de botões.
- Faixa compacta de ferramentas recomendadas, alimentada por configuração centralizada.
- Redes sociais discretas e footer mínimo.
- Interação marcante: campo de luz/grid responde suavemente ao toque ou cursor e conecta visualmente os módulos ao personagem.

## Implementação
1. Subir exatamente a imagem enviada para os assets do projeto e reservar dimensões estáveis para evitar CLS.
2. Criar configuração centralizada para links principais, redes e ferramentas; preservar URLs reais existentes e marcar dados ausentes como placeholders editáveis, sem inventar parcerias.
3. Criar a nova experiência one page bilíngue usando os componentes e efeitos atuais: Matrix, scramble, typewriter, status e Framer Motion.
4. Adaptar o layout de verdade por largura: links prioritários aparecem cedo no mobile; personagem usa enquadramento parcial e seguro; desktop ganha composição lateral e mais profundidade.
5. Exibir header/footer compactos somente nesta experiência, mantendo as páginas internas existentes acessíveis.
6. Refinar fundo técnico, spotlight, linhas de dados e microinterações sem excesso visual.

## Qualidade e performance
- Safe areas para notch e barra inferior; alvos de toque mínimos de 44px.
- Zero overflow horizontal entre 320px e 1440px.
- `prefers-reduced-motion`, animações apenas com transform/opacity e canvas reduzido em conexões lentas.
- Estados de foco, teclado, contraste e sem dependência de hover.
- Metadados próprios por idioma.
- Auditoria final visual em 320, 375, 430, 768, 1024 e 1440px, com correção de hierarquia, enquadramento, espaçamento, CLS e console.

## Conteúdo não inventado
- Projetos existentes continuam apontando para a área real do projeto.
- Instagram e e-mail usam os dados atuais.
- WhatsApp permanece configurável porque o número atual é placeholder.
- GitHub, X e ferramentas sem URL serão mantidos em uma configuração simples e identificados como pendentes, sem alegar parcerias ou recomendações inexistentes.
