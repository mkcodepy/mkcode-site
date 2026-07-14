import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Monogram } from "@/components/brand/Monogram";
import { Button } from "@/components/ui/MkButton";
import { useLocale, switchLocalePath, pathFor } from "@/lib/locale";
import { getDict, type Locale } from "@/content/i18n";
import { whatsappUrl } from "@/config/site";

export function Header() {
  const locale = useLocale();
  const dict = getDict(locale);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { label: dict.nav.capabilities, to: pathFor(locale, "capabilities") },
    { label: dict.nav.projects, to: pathFor(locale, "projects") },
    { label: dict.nav.studio, to: pathFor(locale, "studio") },
    { label: dict.nav.contact, to: pathFor(locale, "contact") },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-line bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mk-container flex h-16 items-center gap-6">
          <Link to={pathFor(locale, "home")} className="flex items-center" aria-label="MK CODE">
            <Wordmark />
          </Link>

          <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md px-3 py-2 font-sans text-[13px] text-ink-2 transition-colors hover:text-ink"
                activeProps={{ className: "text-ink" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <LangSwitch pathname={pathname} current={locale} />
            <Link
              to={pathFor(locale, "contact")}
              className="hidden md:inline-flex"
            >
              <Button variant="primary">{dict.nav.cta}</Button>
            </Link>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-md border border-line text-ink lg:hidden"
              aria-label={dict.nav.commandHint}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <MobileMenu locale={locale} onClose={() => setMenuOpen(false)} pathname={pathname} />
      ) : null}
    </>
  );
}

function LangSwitch({ current, pathname }: { current: Locale; pathname: string }) {
  const other: Locale = current === "es" ? "pt" : "es";
  const otherPath = switchLocalePath(pathname, other);
  return (
    <div className="flex items-center gap-1 rounded-md border border-line bg-surface/60 p-0.5 font-mono text-[11px] tracking-[0.18em] backdrop-blur-sm">
      <button
        type="button"
        aria-current={current === "es" ? "true" : "false"}
        className={`rounded px-2.5 py-1 transition-colors ${
          current === "es" ? "bg-brand/20 text-ink" : "text-ink-3 hover:text-ink"
        }`}
        onClick={() => {
          try {
            localStorage.setItem("mk-lang", "es");
          } catch {}
          if (current !== "es") window.location.href = switchLocalePath(pathname, "es");
        }}
      >
        ES
      </button>
      <button
        type="button"
        aria-current={current === "pt" ? "true" : "false"}
        className={`rounded px-2.5 py-1 transition-colors ${
          current === "pt" ? "bg-brand/20 text-ink" : "text-ink-3 hover:text-ink"
        }`}
        onClick={() => {
          try {
            localStorage.setItem("mk-lang", "pt");
          } catch {}
          if (current !== "pt") window.location.href = otherPath;
        }}
      >
        PT
      </button>
    </div>
  );
}

function MobileMenu({
  locale,
  onClose,
  pathname,
}: {
  locale: Locale;
  onClose: () => void;
  pathname: string;
}) {
  const dict = getDict(locale);
  const links = [
    { label: dict.nav.home, to: pathFor(locale, "home") },
    { label: dict.nav.capabilities, to: pathFor(locale, "capabilities") },
    { label: dict.nav.projects, to: pathFor(locale, "projects") },
    { label: dict.nav.studio, to: pathFor(locale, "studio") },
    { label: dict.nav.contact, to: pathFor(locale, "contact") },
  ];
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur-xl"
    >
      <div className="flex h-16 items-center justify-between px-6">
        <Monogram size={28} />
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-md border border-line"
          onClick={onClose}
          aria-label="Close"
          autoFocus
        >
          <X size={18} />
        </button>
      </div>
      <nav className="mk-container flex flex-1 flex-col gap-2 pt-6">
        {links.map((l, i) => (
          <Link
            key={l.to}
            to={l.to}
            onClick={onClose}
            className="border-b border-line py-4 font-display text-2xl font-medium text-ink"
            style={{ animation: `mk-fade-up 0.4s ease-out ${i * 60}ms both` }}
          >
            <span className="font-mono text-[10px] text-ink-3 mr-3">
              0{i + 1}
            </span>
            {l.label}
          </Link>
        ))}
        <div className="mt-6">
          <Link to={pathFor(locale, "contact")} onClick={onClose}>
            <Button variant="primary" size="lg" className="w-full">
              {dict.nav.cta}
            </Button>
          </Link>
        </div>
        <div className="mt-6 space-y-1 font-mono text-[11px] tracking-[0.18em] text-ink-3">
          <div>{dict.footer.location}</div>
          <a href={whatsappUrl("Hola MK CODE")} className="block hover:text-ink">
            WHATSAPP
          </a>
        </div>
        <div className="pb-8 pt-6 font-mono text-[10px] tracking-[0.18em] text-ink-3">
          {pathname}
        </div>
      </nav>
    </div>
  );
}
