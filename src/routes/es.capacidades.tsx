import { createFileRoute } from "@tanstack/react-router";
import { Capabilities } from "@/components/home/Capabilities";
import { Bridge } from "@/components/home/Bridge";
import { FinalCta } from "@/components/home/FinalCta";
import { Container, Eyebrow } from "@/components/layout/Container";
import { getDict } from "@/content/i18n";

export const Route = createFileRoute("/es/capacidades")({
  head: () => ({
    meta: [
      { title: "Capacidades — MK CODE" },
      {
        name: "description",
        content:
          "Software a medida, IA, automatización, DevOps y productos digitales construidos alrededor de operaciones reales.",
      },
      { property: "og:title", content: "Capacidades — MK CODE" },
      { property: "og:url", content: "/es/capacidades" },
    ],
    links: [{ rel: "canonical", href: "/es/capacidades" }],
  }),
  component: () => <CapabilitiesPage locale="es" />,
});

function CapabilitiesPage({ locale }: { locale: "es" | "pt" }) {
  const dict = getDict(locale);
  return (
    <>
      <section className="pt-40">
        <Container>
          <Eyebrow>CAPABILITIES · {dict.hero.techLabel}</Eyebrow>
          <h1
            className="mt-6 max-w-4xl font-display font-semibold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.2rem, 4.8vw, 4.4rem)" }}
          >
            {dict.capabilities.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-ink-2">{dict.capabilities.supporting}</p>
        </Container>
      </section>
      <Capabilities />
      <Bridge />
      <FinalCta />
    </>
  );
}

export { CapabilitiesPage };
