import type { Locale } from "@/content/i18n";

export type ProjectType = {
  slug: string;
  category: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  modules: string[];
};

export const projects: ProjectType[] = [
  {
    slug: "commercial-infrastructure",
    category: "COMMERCIAL INFRASTRUCTURE",
    title: {
      es: "Plataforma comercial multicanal",
      pt: "Plataforma comercial multicanal",
    },
    description: {
      es: "Una arquitectura para gestionar catálogos, niveles de precios, clientes, pedidos y operaciones desde una única estructura.",
      pt: "Uma arquitetura para gerenciar catálogos, níveis de preços, clientes, pedidos e operações em uma única estrutura.",
    },
    modules: [
      "Product catalog",
      "Price rules",
      "Customer levels",
      "Order pipeline",
      "Operational dashboard",
    ],
  },
  {
    slug: "premium-commerce",
    category: "PREMIUM COMMERCE",
    title: {
      es: "E-commerce diseñado alrededor de la operación",
      pt: "E-commerce projetado ao redor da operação",
    },
    description: {
      es: "Una experiencia de compra conectada con administración, pagos, atención y procesos internos, sin limitar el negocio a una plataforma genérica.",
      pt: "Uma experiência de compra conectada à administração, pagamentos, atendimento e processos internos, sem limitar o negócio a uma plataforma genérica.",
    },
    modules: ["Storefront", "Checkout", "Administration", "Payments", "Customer service", "Mobile"],
  },
  {
    slug: "operational-automation",
    category: "OPERATIONAL AUTOMATION",
    title: {
      es: "Automatización de atención y procesos",
      pt: "Automação de atendimento e processos",
    },
    description: {
      es: "Flujos que organizan conversaciones, priorizan demandas, conectan herramientas y reducen tareas repetitivas dentro de la operación.",
      pt: "Fluxos que organizam conversas, priorizam demandas, conectam ferramentas e reduzem tarefas repetitivas dentro da operação.",
    },
    modules: [
      "WhatsApp conversations",
      "Priority rules",
      "Status processing",
      "Automation events",
      "Integrations",
    ],
  },
];
