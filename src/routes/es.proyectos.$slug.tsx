import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Container, Eyebrow } from "@/components/layout/Container";
import { projects } from "@/data/projects";
import { getDict, type Locale } from "@/content/i18n";
import { FinalCta } from "@/components/home/FinalCta";
import { StatusDot } from "@/components/system/primitives";

export const Route = createFileRoute("/es/proyectos/$slug")({
  loader: ({ params }) => {
    const proj = projects.find((p) => p.slug === params.slug);
    if (!proj) throw notFound();
    return { proj };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.proj.title.es} — MK CODE` },
          { name: "description", content: loaderData.proj.description.es },
          { property: "og:title", content: `${loaderData.proj.title.es} — MK CODE` },
          { property: "og:description", content: loaderData.proj.description.es },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Proyecto — MK CODE" }, { name: "robots", content: "noindex" }],
  }),
  component: () => <ProjectDetail locale="es" />,
  notFoundComponent: () => <NotFoundProject locale="es" />,
});

export function ProjectDetail({ locale }: { locale: Locale }) {
  const data = Route.useLoaderData();
  const dict = getDict(locale);
  if (!data) return null;
  const p = data.proj;
  return (
    <>
      <section className="pt-40">
        <Container>
          <Link
            to={locale === "es" ? "/es/proyectos" : "/pt/projetos"}
            className="font-mono text-[11px] tracking-[0.22em] text-ink-3 hover:text-ink"
          >
            ← {dict.nav.projects.toUpperCase()}
          </Link>
          <div className="mt-8 flex items-center gap-2">
            <StatusDot color="cyan" />
            <Eyebrow>{p.category}</Eyebrow>
          </div>
          <h1
            className="mt-6 max-w-4xl font-display font-semibold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.2rem, 4.8vw, 4.4rem)" }}
          >
            {p.title[locale]}
          </h1>
          <p className="mt-6 max-w-2xl text-ink-2">{p.description[locale]}</p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="mk-label mb-6">MODULES / ARCHITECTURE</div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {p.modules.map((m: string, i: number) => (
              <div
                key={m}
                className="rounded-md border border-line bg-surface/40 p-5 font-mono text-[12px] tracking-[0.14em] text-ink-2"
              >
                <div className="mb-2 flex items-center justify-between text-[10px] text-ink-3">
                  <span>MODULE / {String(i + 1).padStart(2, "0")}</span>
                  <StatusDot color="cyan" />
                </div>
                <div className="text-[14px] tracking-normal text-ink">{m}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}

function NotFoundProject({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  return (
    <section className="pt-40">
      <Container>
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-4 font-display text-3xl">Route not found.</h1>
        <Link
          to={locale === "es" ? "/es/proyectos" : "/pt/projetos"}
          className="mt-6 inline-block font-mono text-[11px] tracking-[0.22em] text-cyan"
        >
          ← {dict.nav.projects.toUpperCase()}
        </Link>
      </Container>
    </section>
  );
}
