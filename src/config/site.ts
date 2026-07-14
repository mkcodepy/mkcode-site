export const siteConfig = {
  name: "MK CODE",
  legalName: "MK CODE",
  descriptor: "Software & IA",
  domain: "https://www.mkcode.com.py",
  founder: "Marcos",
  founderTitle: "Founder & Software Engineer",
  location: "Encarnación, Itapúa, Paraguay",
  whatsapp: "595XXXXXXXXX",
  email: "contacto@mkcode.com.py",
  instagram: "https://instagram.com/mkcodepy",
} as const;

export function whatsappUrl(message: string): string {
  const num = siteConfig.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(subject: string, body: string): string {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
