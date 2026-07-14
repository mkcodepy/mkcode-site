import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MatrixRain } from "@/components/fx/MatrixRain";
import { isLocale, HTML_LANG } from "@/content/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="max-w-md text-center">
        <div className="mk-eyebrow">404 · NODE NOT FOUND</div>
        <h1 className="mt-4 font-display text-4xl font-semibold text-ink">
          The route does not exist.
        </h1>
        <p className="mt-3 text-sm text-ink-2">
          This path is not connected to the MK CODE infrastructure.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-line-2 px-5 py-3 font-mono text-[11px] tracking-[0.22em] text-ink hover:bg-cyan/5"
          >
            RETURN HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="max-w-md text-center">
        <div className="mk-eyebrow">SYSTEM ERROR</div>
        <h1 className="mt-3 font-display text-2xl font-semibold text-ink">
          Something did not deploy.
        </h1>
        <p className="mt-2 text-sm text-ink-2">You can retry the route.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-brand px-5 py-3 font-mono text-[11px] tracking-[0.22em] text-ink"
          >
            RETRY
          </button>
          <a
            href="/"
            className="rounded-md border border-line px-5 py-3 font-mono text-[11px] tracking-[0.22em] text-ink hover:bg-cyan/5"
          >
            HOME
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MK CODE — Software, IA, Automatización y DevOps" },
      {
        name: "description",
        content:
          "Estudio de ingeniería digital en Encarnación, Paraguay. Software a medida, IA, automatización e infraestructura para operaciones que no aceptan límites genéricos.",
      },
      { name: "author", content: "MK CODE" },
      { property: "og:site_name", content: "MK CODE" },
      { property: "og:title", content: "MK CODE — Software & IA" },
      {
        property: "og:description",
        content:
          "Ingeniería brasileña construida en Paraguay. Software, IA, automatización y DevOps a medida.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "alternate", hrefLang: "es-PY", href: "/es" },
      { rel: "alternate", hrefLang: "pt-BR", href: "/pt" },
      { rel: "alternate", hrefLang: "x-default", href: "/es" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "MK CODE",
          url: "https://www.mkcode.com.py",
          founder: { "@type": "Person", name: "Marcos" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Encarnación",
            addressRegion: "Itapúa",
            addressCountry: "PY",
          },
          sameAs: ["https://instagram.com/mkcodepy"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es-PY">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const seg = pathname.split("/")[1];
  const showChrome = isLocale(seg);

  // sync <html lang> for client nav
  useEffect(() => {
    if (isLocale(seg)) {
      document.documentElement.lang = HTML_LANG[seg];
    }
  }, [seg]);

  return (
    <QueryClientProvider client={queryClient}>
      {showChrome ? <MatrixRain /> : null}
      {showChrome ? <Header /> : null}
      <main className="relative z-10 min-h-screen">
        <Outlet />
      </main>
      {showChrome ? <Footer /> : null}
    </QueryClientProvider>
  );
}
