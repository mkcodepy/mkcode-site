import { esPY } from "./es-PY";
import { ptBR } from "./pt-BR";

export type Locale = "es" | "pt";
export type Dictionary = typeof esPY;

const dictionaries: Record<Locale, Dictionary> = {
  es: esPY,
  pt: ptBR,
};

export function getDict(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.es;
}

export const LOCALES: Locale[] = ["es", "pt"];

export function isLocale(v: string | undefined): v is Locale {
  return v === "es" || v === "pt";
}

/** hreflang codes per locale */
export const HREFLANG: Record<Locale, string> = {
  es: "es-PY",
  pt: "pt-BR",
};

/** HTML lang attribute */
export const HTML_LANG: Record<Locale, string> = {
  es: "es-PY",
  pt: "pt-BR",
};

/** Route slugs differ per locale for content pages */
export const SLUGS = {
  es: {
    home: "",
    capabilities: "capacidades",
    projects: "proyectos",
    studio: "mk-code",
    contact: "contacto",
  },
  pt: {
    home: "",
    capabilities: "capacidades",
    projects: "projetos",
    studio: "mk-code",
    contact: "contato",
  },
} as const;

export function pathFor(locale: Locale, page: keyof typeof SLUGS.es): string {
  const slug = SLUGS[locale][page];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}
