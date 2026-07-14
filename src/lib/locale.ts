import { useRouterState } from "@tanstack/react-router";
import { isLocale, type Locale, pathFor, SLUGS } from "@/content/i18n";

export function useLocale(): Locale {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const seg = pathname.split("/")[1];
  return isLocale(seg) ? seg : "es";
}

/** Given current pathname and target locale, return the equivalent path in that locale. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  const current = isLocale(parts[0]) ? (parts[0] as Locale) : "es";
  const rest = isLocale(parts[0]) ? parts.slice(1) : parts;
  if (rest.length === 0) return `/${target}`;
  // map first slug segment to equivalent in target locale
  const [first, ...tail] = rest;
  const currentSlugs = SLUGS[current];
  const key = (Object.keys(currentSlugs) as Array<keyof typeof currentSlugs>).find(
    (k) => currentSlugs[k] === first,
  );
  if (!key) return `/${target}`;
  const targetSlug = SLUGS[target][key];
  const base = targetSlug ? `/${target}/${targetSlug}` : `/${target}`;
  return tail.length ? `${base}/${tail.join("/")}` : base;
}

export { pathFor };
