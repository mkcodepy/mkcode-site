import { createFileRoute } from "@tanstack/react-router";
import { CapabilitiesPage } from "./es.capacidades";

export const Route = createFileRoute("/pt/capacidades")({
  head: () => ({
    meta: [
      { title: "Capacidades — MK CODE" },
      {
        name: "description",
        content:
          "Software sob medida, IA, automação, DevOps e produtos digitais construídos ao redor de operações reais.",
      },
      { property: "og:title", content: "Capacidades — MK CODE" },
      { property: "og:url", content: "/pt/capacidades" },
    ],
    links: [{ rel: "canonical", href: "/pt/capacidades" }],
  }),
  component: () => <CapabilitiesPage locale="pt" />,
});
