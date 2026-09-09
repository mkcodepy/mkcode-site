import { createFileRoute } from "@tanstack/react-router";
import { IdentityHub } from "@/components/hub/IdentityHub";

export const Route = createFileRoute("/es/")({
  head: () => ({
    meta: [
      { title: "MK CODE — Software, IA y productos digitales" },
      {
        name: "description",
        content:
          "MK CODE por Marcos. Software, IA, automatización y productos digitales desde Encarnación, Paraguay.",
      },
      { property: "og:title", content: "MK CODE — Digital Identity Hub" },
      {
        property: "og:description",
        content: "Software, IA, automatización y productos digitales desde Encarnación, Paraguay.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/es" },
    ],
    links: [{ rel: "canonical", href: "/es" }],
  }),
  component: HomeES,
});

function HomeES() {
  return <IdentityHub />;
}
