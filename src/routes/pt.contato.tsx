import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "./es.contacto";

export const Route = createFileRoute("/pt/contato")({
  head: () => ({
    meta: [
      { title: "Contato — MK CODE" },
      {
        name: "description",
        content:
          "Conte o que você precisa construir, automatizar ou melhorar. A primeira conversa é para entender o problema.",
      },
      { property: "og:title", content: "Contato — MK CODE" },
      { property: "og:url", content: "/pt/contato" },
    ],
    links: [{ rel: "canonical", href: "/pt/contato" }],
  }),
  component: () => <ContactPage locale="pt" />,
});
