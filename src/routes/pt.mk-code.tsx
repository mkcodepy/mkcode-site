import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "./es.mk-code";

export const Route = createFileRoute("/pt/mk-code")({
  head: () => ({
    meta: [
      { title: "MK CODE — Estúdio de engenharia digital" },
      {
        name: "description",
        content:
          "Estúdio boutique fundado por um engenheiro de software brasileiro no Paraguai. Acesso direto, projetos selecionados, arquitetura própria.",
      },
      { property: "og:title", content: "MK CODE — Estúdio de engenharia digital" },
      { property: "og:url", content: "/pt/mk-code" },
    ],
    links: [{ rel: "canonical", href: "/pt/mk-code" }],
  }),
  component: () => <StudioPage locale="pt" />,
});
