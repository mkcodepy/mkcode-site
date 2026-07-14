import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/brand/Wordmark";
import { useLocale, pathFor } from "@/lib/locale";
import { getDict } from "@/content/i18n";
import { siteConfig, whatsappUrl } from "@/config/site";
import { StatusDot } from "@/components/system/primitives";

export function Footer() {
  const locale = useLocale();
  const dict = getDict(locale);
  return (
    <footer className="relative mt-24 border-t border-line bg-bg-2">
      <div className="mk-container grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm text-ink-2">{dict.footer.tagline}</p>
          <div className="mt-6 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-ink-3">
            <StatusDot color="cyan" />
            MK SYSTEM / ONLINE
          </div>
        </div>
        <div>
          <div className="mk-label mb-4">{dict.footer.nav}</div>
          <ul className="space-y-2 text-sm text-ink-2">
            <li>
              <Link to={pathFor(locale, "capabilities")} className="hover:text-ink">
                {dict.nav.capabilities}
              </Link>
            </li>
            <li>
              <Link to={pathFor(locale, "projects")} className="hover:text-ink">
                {dict.nav.projects}
              </Link>
            </li>
            <li>
              <Link to={pathFor(locale, "studio")} className="hover:text-ink">
                {dict.nav.studio}
              </Link>
            </li>
            <li>
              <Link to={pathFor(locale, "contact")} className="hover:text-ink">
                {dict.nav.contact}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="mk-label mb-4">{dict.footer.contact}</div>
          <ul className="space-y-2 text-sm text-ink-2">
            <li>
              <a href={whatsappUrl("Hola MK CODE")} className="hover:text-ink">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-ink">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={siteConfig.instagram} className="hover:text-ink">
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="mk-label mb-4">BR → PY</div>
          <p className="text-sm text-ink-2">{dict.footer.location}</p>
          <div className="mt-6 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em]">
            <span className="inline-block h-2 w-3 bg-br-green" />
            <span className="inline-block h-2 w-3 bg-br-yellow" />
            <span className="mx-1 text-ink-3">→</span>
            <span className="inline-block h-2 w-3 bg-py-red" />
            <span className="inline-block h-2 w-3 bg-ink" />
            <span className="inline-block h-2 w-3 bg-py-blue" />
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mk-container flex flex-col items-start justify-between gap-3 py-6 font-mono text-[10px] tracking-[0.22em] text-ink-3 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} MK CODE · {dict.footer.rights.toUpperCase()}</div>
          <div>{siteConfig.domain.replace("https://", "")}</div>
        </div>
      </div>
    </footer>
  );
}
