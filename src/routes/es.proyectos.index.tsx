import { createFileRoute, Link } from "@tanstack/react-router";
import { Container, Eyebrow } from "@/components/layout/Container";
import { projects } from "@/data/projects";
import { getDict, type Locale } from "@/content/i18n";
import { ArrowUpRight } from "lucide-react";
import { FinalCta } from "@/components/home/FinalCta";

export const Route = createFileRoute("/es/proyectos/")({
  head: () => ({
    meta: [
      { title: "Proyectos — MK CODE" },
      {
        name: "description",
        content:
          "Una selección de arquitecturas creadas para ventas, operaciones, atención y crecimiento.",
      },
      { property: "og:title", content: "Proyectos — MK CODE" },
      { property: "og:url", content: "/es/proyectos" },
    ],
    links: [{ rel: "canonical", href: "/es/proyectos" }],
  }),
  component: () => <ProjectsIndex locale="es" />,
});

export function ProjectsIndex({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  return (
    <>
      <section className="pt-40">
        <Container>
          <Eyebrow>{dict.projects.eyebrow}</Eyebrow>
          <h1
            className="mt-6 max-w-4xl font-display font-semibold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.2rem, 4.8vw, 4.4rem)" }}
          >
            {dict.projects.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-ink-2">{dict.projects.supporting}</p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="space-y-4">
            {projects.map((p) => {
              const slug = locale === "pt" ? "projetos" : "proyectos";
              return (
                <Link
                  key={p.slug}
                  to={locale === "es" ? "/es/proyectos/$slug" : "/pt/projetos/$slug"}
                  params={{ slug: p.slug }}
                  className="group grid gap-6 rounded-lg border border-line bg-surface/40 p-8 transition-colors hover:border-line-2 lg:grid-cols-[1fr_auto] lg:items-center"
                >
                  <div>
                    <div className="font-mono text-[10.5px] tracking-[0.22em] text-cyan">
                      {p.category}
                    </div>
                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.01em] lg:text-3xl">
                      {p.title[locale]}
                    </h2>
                    <p className="mt-3 max-w-2xl text-ink-2">{p.description[locale]}</p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-ink group-hover:text-cyan">
                    {dict.projects.viewCase.toUpperCase()}
                    <ArrowUpRight size={14} />
                  </div>
                  <span aria-hidden className="hidden">
                    {slug}
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
