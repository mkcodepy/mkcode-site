import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Container, Eyebrow } from "@/components/layout/Container";
import { useLocale, pathFor } from "@/lib/locale";
import { getDict } from "@/content/i18n";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/MkButton";
import { ArrowUpRight } from "lucide-react";

export function SelectedSystems() {
  const locale = useLocale();
  const dict = getDict(locale);
  const p = dict.projects;
  return (
    <section className="relative py-28 md:py-36" id="projects">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2
            className="mt-4 font-display font-semibold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.85rem, 3.4vw, 3rem)" }}
          >
            {p.heading}
          </h2>
          <p className="mt-6 text-ink-2">{p.supporting}</p>
        </div>

        <div className="mt-14 space-y-4">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group grid gap-6 rounded-lg border border-line bg-surface/40 p-8 transition-colors hover:border-line-2 lg:grid-cols-[1fr_1.2fr] lg:items-center"
            >
              <div>
                <div className="font-mono text-[10.5px] tracking-[0.22em] text-cyan">
                  {proj.category}
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.01em] text-ink lg:text-3xl">
                  {proj.title[locale]}
                </h3>
                <p className="mt-4 max-w-lg text-ink-2">{proj.description[locale]}</p>
                <Link
                  to="/$lang/proyectos/$slug"
                  params={{ lang: locale, slug: proj.slug }}
                  className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-ink transition-colors hover:text-cyan"
                >
                  {p.viewCase.toUpperCase()}
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              <ModuleGrid modules={proj.modules} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-line bg-bg-2 p-8 md:flex md:items-center md:justify-between md:gap-8">
          <p className="max-w-xl font-display text-lg leading-snug tracking-[-0.01em] text-ink md:text-xl">
            {p.confidentiality}
          </p>
          <Link to={pathFor(locale, "contact")} className="mt-6 inline-block md:mt-0">
            <Button variant="secondary">{p.confidentialityCta}</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

function ModuleGrid({ modules }: { modules: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
      {modules.map((m, i) => (
        <div
          key={m}
          className="relative rounded-md border border-line bg-bg-2/60 p-3 font-mono text-[10.5px] tracking-[0.14em] text-ink-2"
        >
          <span className="mr-1.5 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
          {m}
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan/50" />
        </div>
      ))}
    </div>
  );
}
