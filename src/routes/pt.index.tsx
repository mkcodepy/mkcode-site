import { createFileRoute } from "@tanstack/react-router";
import { IdentityHub } from "@/components/hub/IdentityHub";

export const Route = createFileRoute("/pt/")({
  head: () => ({
    meta: [
      { title: "MK CODE — Software, IA e produtos digitais" },
      {
        name: "description",
        content:
          "MK CODE por Marcos. Software, IA, automação e produtos digitais desde Encarnación, Paraguai.",
      },
      { property: "og:title", content: "MK CODE — Digital Identity Hub" },
      {
        property: "og:description",
        content: "Software, IA, automação e produtos digitais desde Encarnación, Paraguai.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/pt" },
    ],
    links: [{ rel: "canonical", href: "/pt" }],
  }),
  component: HomePT,
});

function HomePT() {
  return <IdentityHub />;
}
