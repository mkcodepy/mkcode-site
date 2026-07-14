import { Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/MkButton";
import { useLocale, pathFor } from "@/lib/locale";
import { getDict } from "@/content/i18n";
import { SystemNode, StatusDot } from "@/components/system/primitives";

export function FinalCta() {
  const locale = useLocale();
  const dict = getDict(locale);
  const c = dict.finalCta;
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 mk-grid-lines opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-t from-brand/[0.1] via-transparent to-transparent" />

      <Container>
        <div className="relative rounded-lg border border-line-2 bg-surface/40 p-8 backdrop-blur-md md:p-14">
          {/* incoming route */}
          <svg viewBox="0 0 800 40" className="absolute -top-6 left-0 h-6 w-full" aria-hidden>
            <path
              d="M0 20 L800 20"
              stroke="#69D5FF"
              strokeOpacity="0.6"
              strokeDasharray="2 8"
              style={{ animation: "mk-dash 4s linear infinite" }}
              fill="none"
            />
          </svg>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.22em] text-cyan">
                <StatusDot color="cyan" />
                FINAL / PRODUCTION NODE
              </div>
              <h2
                className="mt-5 font-display font-semibold leading-[1.05] tracking-[-0.02em]"
                style={{ fontSize: "clamp(1.85rem, 3.6vw, 3.2rem)" }}
              >
                {c.heading}
              </h2>
              <p className="mt-6 max-w-xl text-ink-2">{c.supporting}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={pathFor(locale, "contact")}>
                  <Button variant="primary" size="lg">
                    {c.primary}
                  </Button>
                </Link>
                <Link to={pathFor(locale, "contact")}>
                  <Button variant="secondary" size="lg">
                    {c.secondary}
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex flex-col gap-1 font-mono text-[10.5px] tracking-[0.22em] text-ink-3">
                <span>{c.location.toUpperCase()}</span>
                <span>{c.coverage.toUpperCase()}</span>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-4">
                <SystemNode code="PY" label="PRODUCTION" accent="py" size="lg" />
                <div className="rounded-md border border-line px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] text-ink-3">
                  DEPLOY / SUCCESS
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
