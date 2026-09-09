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
    <section className="relative py-14 sm:py-20 md:py-28 lg:py-36" id="projects">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2
            className="mt-3 font-display font-semibold leading-[1.05] tracking-[-0.02em] md:mt-4"
            style={{ fontSize: "clamp(1.75rem, 6.4vw, 3rem)" }}
          >
            {p.heading}
          </h2>
          <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.65] text-ink-2 md:mt-6 md:text-base">{p.supporting}</p>
        </div>

        <div className="mt-8 space-y-3 sm:space-y-4 md:mt-14">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group grid gap-5 rounded-lg border border-line bg-surface/40 p-5 transition-colors hover:border-line-2 sm:p-6 md:p-8 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-6"
            >
              <div>
                <div className="font-mono text-[10px] tracking-[0.22em] text-cyan sm:text-[10.5px]">
                  {proj.category}
                </div>
                <h3 className="mt-3 font-display text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.01em] text-ink sm:text-2xl md:mt-4 lg:text-3xl">
                  {proj.title[locale]}
                </h3>
                <p className="mt-3 max-w-lg text-[14.5px] leading-[1.65] text-ink-2 md:mt-4 md:text-base">{proj.description[locale]}</p>
                <Link
                  to={locale === "es" ? "/es/proyectos/$slug" : "/pt/projetos/$slug"}
                  params={{ slug: proj.slug }}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-ink transition-colors hover:text-cyan md:mt-6"
                >
                  {p.viewCase.toUpperCase()}
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              <ModuleGrid modules={proj.modules} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-line bg-bg-2 p-5 sm:p-6 md:mt-12 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
          <p className="max-w-xl font-display text-[1.05rem] leading-[1.3] tracking-[-0.01em] text-ink sm:text-base md:text-lg lg:text-xl">
            {p.confidentiality}
          </p>
          <Link to={pathFor(locale, "contact")} className="mt-4 block md:mt-0 md:inline-block">
            <Button variant="secondary" className="w-full md:w-auto">{p.confidentialityCta}</Button>
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
          className="relative rounded-md border border-line bg-bg-2/60 p-2.5 font-mono text-[10px] tracking-[0.14em] text-ink-2 sm:p-3 sm:text-[10.5px]"
        >
          <span className="mr-1.5 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
          {m}
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan/50" />
        </div>
      ))}
    </div>
  );
}
