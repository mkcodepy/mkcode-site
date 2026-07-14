import { createFileRoute } from "@tanstack/react-router";
import { Container, Eyebrow } from "@/components/layout/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { getDict, type Locale } from "@/content/i18n";
import { siteConfig, whatsappUrl } from "@/config/site";

export const Route = createFileRoute("/es/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — MK CODE" },
      {
        name: "description",
        content:
          "Contanos qué querés construir, automatizar o mejorar. La primera conversación es para entender el problema.",
      },
      { property: "og:title", content: "Contacto — MK CODE" },
      { property: "og:url", content: "/es/contacto" },
    ],
    links: [{ rel: "canonical", href: "/es/contacto" }],
  }),
  component: () => <ContactPage locale="es" />,
});

export function ContactPage({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  return (
    <>
      <section className="pt-40 pb-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div>
              <Eyebrow>{dict.nav.contact.toUpperCase()}</Eyebrow>
              <h1
                className="mt-6 font-display font-semibold leading-[1.05] tracking-[-0.02em]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
              >
                {dict.contact.title}
              </h1>
              <p className="mt-6 text-ink-2">{dict.contact.subtitle}</p>

              <div className="mt-10 space-y-4 rounded-lg border border-line bg-surface/40 p-6">
                <ContactRow label="WhatsApp" href={whatsappUrl("Hola MK CODE")}>
                  MK CODE · direct
                </ContactRow>
                <ContactRow label="Email" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </ContactRow>
                <ContactRow label="Location">{siteConfig.location}</ContactRow>
                <ContactRow label="Instagram" href={siteConfig.instagram}>
                  @mkcodepy
                </ContactRow>
              </div>
            </div>
            <div className="rounded-lg border border-line bg-surface/40 p-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactRow({
  label,
  href,
  children,
}: {
  label: string;
  href?: string;
  children: React.ReactNode;
}) {
  const content = (
    <div className="flex items-center justify-between gap-4 border-b border-line py-3 last:border-0">
      <span className="mk-label">{label}</span>
      <span className="font-mono text-[13px] text-ink">{children}</span>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:text-cyan">
      {content}
    </a>
  ) : (
    content
  );
}
