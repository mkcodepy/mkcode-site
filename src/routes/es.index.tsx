import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { SignalStrip } from "@/components/home/SignalStrip";
import { Manifesto } from "@/components/home/Manifesto";
import { Capabilities } from "@/components/home/Capabilities";
import { SelectedSystems } from "@/components/home/SelectedSystems";
import { Method } from "@/components/home/Method";
import { Bridge } from "@/components/home/Bridge";
import { Founder } from "@/components/home/Founder";
import { Selectivity } from "@/components/home/Selectivity";
import { FinalCta } from "@/components/home/FinalCta";

export const Route = createFileRoute("/es/")({
  head: () => ({
    meta: [
      { title: "MK CODE — Ingeniería digital a medida en Paraguay" },
      {
        name: "description",
        content:
          "Software, IA, automatización e infraestructura construida alrededor de tu operación. Estudio boutique en Encarnación, Paraguay.",
      },
      { property: "og:title", content: "MK CODE — Ingeniería digital a medida" },
      {
        property: "og:description",
        content: "Lo que tu empresa necesita no siempre viene listo. Nosotros lo construimos.",
      },
      { property: "og:url", content: "/es" },
    ],
    links: [{ rel: "canonical", href: "/es" }],
  }),
  component: HomeES,
});

function HomeES() {
  return (
    <>
      <Hero />
      <SignalStrip />
      <Manifesto />
      <Capabilities />
      <SelectedSystems />
      <Method />
      <Bridge />
      <Founder />
      <Selectivity />
      <FinalCta />
    </>
  );
}
