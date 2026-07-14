import { createFileRoute } from "@tanstack/react-router";
import { Founder } from "@/components/home/Founder";
import { Selectivity } from "@/components/home/Selectivity";
import { Bridge } from "@/components/home/Bridge";
import { FinalCta } from "@/components/home/FinalCta";
import { Container, Eyebrow } from "@/components/layout/Container";
import { getDict, type Locale } from "@/content/i18n";

export const Route = createFileRoute("/es/mk-code")({
  head: () => ({
    meta: [
      { title: "MK CODE — Estudio de ingeniería digital" },
      {
        name: "description",
        content:
          "Estudio boutique fundado por un ingeniero de software brasileño en Paraguay. Acceso directo, proyectos seleccionados, arquitectura propia.",
      },
      { property: "og:title", content: "MK CODE — Estudio de ingeniería digital" },
      { property: "og:url", content: "/es/mk-code" },
    ],
    links: [{ rel: "canonical", href: "/es/mk-code" }],
  }),
  component: () => <StudioPage locale="es" />,
});

export function StudioPage({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  return (
    <>
      <section className="pt-40">
        <Container>
          <Eyebrow>MK CODE / STUDIO</Eyebrow>
          <h1
            className="mt-6 max-w-4xl font-display font-semibold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.2rem, 4.8vw, 4.4rem)" }}
          >
            {dict.founder.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-ink-2">{dict.founder.bio}</p>
        </Container>
      </section>
      <Founder />
      <Selectivity />
      <Bridge />
      <FinalCta />
    </>
  );
}
