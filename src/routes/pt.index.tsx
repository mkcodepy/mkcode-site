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

export const Route = createFileRoute("/pt/")({
  head: () => ({
    meta: [
      { title: "MK CODE — Engenharia digital sob medida no Paraguai" },
      {
        name: "description",
        content:
          "Software, IA, automação e infraestrutura construídos ao redor da sua operação. Estúdio boutique em Encarnación, Paraguai.",
      },
      { property: "og:title", content: "MK CODE — Engenharia digital sob medida" },
      {
        property: "og:description",
        content: "O que a sua empresa precisa nem sempre vem pronto. Nós construímos.",
      },
      { property: "og:url", content: "/pt" },
    ],
    links: [{ rel: "canonical", href: "/pt" }],
  }),
  component: HomePT,
});

function HomePT() {
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
