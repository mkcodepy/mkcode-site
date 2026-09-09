import type { Locale } from "@/content/i18n";

type LocalizedText = Record<Locale, string>;

export type HubLink = {
  id: "projects" | "github" | "contact" | "studio";
  title: LocalizedText;
  description: LocalizedText;
  href: Record<Locale, string>;
  external?: boolean;
};

export type HubTool = {
  name: string;
  category: string;
  href: string;
  badge?: "FEATURED" | "NEW" | "PARTNER" | "RECOMMENDED";
};

export const hubLinks: HubLink[] = [
  {
    id: "projects",
    title: { es: "Proyectos", pt: "Projetos" },
    description: { es: "Sistemas seleccionados", pt: "Sistemas selecionados" },
    href: { es: "/es/proyectos", pt: "/pt/projetos" },
  },
  {
    id: "github",
    title: { es: "GitHub", pt: "GitHub" },
    description: { es: "Código y experimentos", pt: "Código e experimentos" },
    href: { es: "", pt: "" },
    external: true,
  },
  {
    id: "contact",
    title: { es: "Hablar conmigo", pt: "Falar comigo" },
    description: { es: "Contacto directo", pt: "Contato direto" },
    href: { es: "mailto:contacto@mkcode.com.py", pt: "mailto:contacto@mkcode.com.py" },
    external: true,
  },
  {
    id: "studio",
    title: { es: "MK CODE", pt: "MK CODE" },
    description: { es: "Conocer el estudio", pt: "Conhecer o estúdio" },
    href: { es: "/es/mk-code", pt: "/pt/mk-code" },
  },
];

// Add, remove or reorder tools here. Empty href values stay visibly unavailable.
export const hubTools: HubTool[] = [
  { name: "Lovable", category: "BUILD", href: "https://lovable.dev" },
  { name: "Claude", category: "AI", href: "https://claude.ai" },
  { name: "Krea", category: "CREATE", href: "https://krea.ai" },
  { name: "Emergent", category: "BUILD", href: "https://emergent.sh" },
];

export const hubSocials = [
  { name: "Instagram", href: "https://instagram.com/mkcodepy" },
  { name: "GitHub", href: "" },
  { name: "X / Twitter", href: "" },
  { name: "Email", href: "mailto:contacto@mkcode.com.py" },
] as const;

export const hubCopy = {
  es: {
    role: "Marcos / MK CODE",
    disciplines: "Software · IA · Automatización",
    statement: "Building software, AI & digital products.",
    location: "Encarnación · Paraguay",
    online: "ONLINE",
    system: "MK SYSTEM / IDENTITY NODE",
    init: "> identity.init --owner=marcos --status=online",
    links: "Acceso directo",
    tools: "Tools / signals",
    toolsNote: "Plataformas que forman parte del radar MK CODE.",
    socials: "Conectar",
    unavailable: "LINK PENDIENTE",
    external: "ABRIR",
    footer: "Software · AI · Digital products",
  },
  pt: {
    role: "Marcos / MK CODE",
    disciplines: "Software · IA · Automação",
    statement: "Building software, AI & digital products.",
    location: "Encarnación · Paraguai",
    online: "ONLINE",
    system: "MK SYSTEM / IDENTITY NODE",
    init: "> identity.init --owner=marcos --status=online",
    links: "Acesso direto",
    tools: "Tools / signals",
    toolsNote: "Plataformas que fazem parte do radar MK CODE.",
    socials: "Conectar",
    unavailable: "LINK PENDENTE",
    external: "ABRIR",
    footer: "Software · AI · Digital products",
  },
} satisfies Record<Locale, Record<string, string>>;