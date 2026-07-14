import { createFileRoute } from "@tanstack/react-router";
import { ProjectsIndex } from "./es.proyectos.index";

export const Route = createFileRoute("/pt/projetos/")({
  head: () => ({
    meta: [
      { title: "Projetos — MK CODE" },
      {
        name: "description",
        content:
          "Uma seleção de arquiteturas criadas para vendas, operações, atendimento e crescimento.",
      },
      { property: "og:title", content: "Projetos — MK CODE" },
      { property: "og:url", content: "/pt/projetos" },
    ],
    links: [{ rel: "canonical", href: "/pt/projetos" }],
  }),
  component: () => <ProjectsIndex locale="pt" />,
});
