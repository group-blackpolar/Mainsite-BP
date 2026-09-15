import Link from "next/link";
import { SiteFooter, SiteHeader } from "./site-shell";
import type { SiteLocale } from "./marketing-home";
import { SectionLink } from "./section-link";
import { SystemVisual } from "./system-visual";

export const productIds = ["north", "arcticfox", "ermine"] as const;
export type ProductId = (typeof productIds)[number];
export const products = {
  north: {
    name: "NORTH",
    motif: "north",
    label: ["01 / ESPACIO DE TRABAJO", "01 / WORKSPACE"],
    title: ["Tu trabajo. Tu espacio.", "Your work. Your workspace."],
    description: [
      "Una plataforma multiinquilino para organizaciones y personas. El espacio de trabajo reúne herramientas, datos y navegación alrededor de tu forma de trabajar.",
      "A multi-tenant platform for organizations and individuals. The Workspace brings tools, data, and navigation together around how you work.",
    ],
    features: [
      [
        "Paneles dinámicos",
        "Dynamic dashboards",
        "KPIs, reportes y tablas de datos en una vista configurable.",
        "KPI cards, reports, and data tables in a configurable view.",
      ],
      [
        "Archivos y navegación",
        "Files and navigation",
        "Organiza archivos y carpetas; configura cómo recorrer tu espacio.",
        "Organize files and folders; configure how you move through your space.",
      ],
      [
        "Organización y acceso",
        "Organization and access",
        "Experiencias personales y de equipo con roles y permisos.",
        "Personal and team experiences with roles and permissions.",
      ],
      [
        "Planes y licencias",
        "Plans and licenses",
        "Suscripciones y derechos de uso que acompañan a tu organización.",
        "Subscriptions and product access that grow with your organization.",
      ],
    ],
  },
  arcticfox: {
    name: "ARCTIC FOX",
    motif: "arctic",
    label: ["02 / FLUJO DE TRABAJO", "02 / WORKFLOW"],
    title: [
      "De una señal al siguiente paso.",
      "From a signal to the next step.",
    ],
    description: [
      "Una plataforma independiente de flujos de trabajo y automatización. Conecta herramientas, decisiones y personas en procesos que puedes comprender.",
      "An independent workflow and automation platform. Connect tools, decisions, and people in processes you can understand.",
    ],
    features: [
      [
        "Constructor de flujos de trabajo",
        "Workflow builder",
        "Diseña flujos con disparadores, acciones y lógica condicional.",
        "Design flows with triggers, actions, and conditional logic.",
      ],
      [
        "Integraciones",
        "Integrations",
        "Conecta sistemas y transforma datos entre cada paso.",
        "Connect systems and transform data between each step.",
      ],
      [
        "Ejecuciones visibles",
        "Visible executions",
        "Historial y registros para entender resultados y resolver fallos.",
        "Execution history and logs to understand results and investigate failures.",
      ],
      [
        "IA en el proceso",
        "AI in the process",
        "Creación asistida de flujos de trabajo y agentes de IA como participantes.",
        "AI-assisted workflow creation and AI agents as workflow participants.",
      ],
    ],
  },
  ermine: {
    name: "ERMINE",
    motif: "ermine",
    label: ["03 / OPERACIONES", "03 / OPERATIONS"],
    title: [
      "Una visión completa de tu operación.",
      "A complete view of your operation.",
    ],
    description: [
      "Una plataforma independiente de ERP y CRM avanzado para organizaciones. Conecta la relación con tus clientes con el trabajo que la hace posible.",
      "An independent advanced ERP and CRM platform for organizations. Connect customer relationships with the work that makes them possible.",
    ],
    features: [
      [
        "Relaciones con clientes",
        "Customer relationships",
        "Prospectos, oportunidades y procesos de venta para seguir cada relación.",
        "Leads, opportunities, and pipelines to follow every relationship.",
      ],
      [
        "Operaciones ERP",
        "ERP operations",
        "Pedidos, facturas, inventario y compras en procesos estructurados.",
        "Orders, invoices, inventory, and procurement in structured processes.",
      ],
      [
        "Proyectos y tareas",
        "Projects and tasks",
        "Coordina responsables, prioridades y trabajo pendiente.",
        "Coordinate owners, priorities, and the work ahead.",
      ],
      [
        "Inteligencia empresarial",
        "Business intelligence",
        "Reportes de negocio y operaciones asistidas por IA.",
        "Business reporting and AI-assisted operations.",
      ],
    ],
  },
} as const;

export function ProductPage({
  product,
  locale,
}: {
  product: ProductId;
  locale: SiteLocale;
}) {
  const p = products[product];
  const es = locale === "es-lat";
  const language = es ? 0 : 1;
  return (
    <div
      className={`bp-site bp-product-detail bp-detail-${product}`}
      lang={es ? "es-419" : "en-US"}
    >
      <SiteHeader locale={locale} />
      <main id="main-content">
        <section className="bp-product-hero bp-container">
          <div data-reveal>
            <SectionLink
              className="bp-overline"
              locale={locale}
              section="products"
            >
              Black Polar / {p.name}
            </SectionLink>
            <span className="bp-preview-badge">
              {es
                ? "En desarrollo · Vista conceptual"
                : "In development · Concept preview"}
            </span>
            <h1>{p.title[language]}</h1>
            <p>{p.description[language]}</p>
            <Link
              className="bp-button bp-button-dark"
              href={`/${locale}/contact`}
            >
              {es ? "Conversemos" : "Let’s talk"}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <figure
            className="bp-product-stage"
            data-reveal
            data-reveal-delay="1"
          >
            <span className="bp-overline">{p.label[language]}</span>
            <SystemVisual system={p.motif} locale={locale} />
            <figcaption>
              {es
                ? "Diseño conceptual con datos ilustrativos. No es una aplicación disponible."
                : "Concept design with illustrative data. This is not an available application."}
            </figcaption>
          </figure>
        </section>
        <section className="bp-section bp-product-capabilities">
          <div className="bp-container">
            <div className="bp-section-heading" data-reveal>
              <span className="bp-overline">
                {es ? "Diseñado para" : "Designed for"}
              </span>
              <h2>
                {es
                  ? "Cada pieza tiene un propósito."
                  : "Every part has a purpose."}
              </h2>
            </div>
            <div className="bp-service-grid">
              {p.features.map((f, i) => (
                <article className="bp-service-card" key={f[0]} data-reveal>
                  <span className="bp-overline">0{i + 1}</span>
                  <h3>{f[language]}</h3>
                  <p>{f[language + 2]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="bp-section bp-platform-inverse">
          <div className="bp-container">
            <span className="bp-overline">
              {es ? "Ecosistema Black Polar" : "Black Polar ecosystem"}
            </span>
            <h2>
              {es
                ? "Identidad propia. Base compartida."
                : "Independent identity. Shared foundation."}
            </h2>
            <p>
              {es
                ? `${p.name} es un producto independiente de Black Polar. CORECROW aporta identidad, acceso y servicios compartidos. NORTH, ARCTIC FOX y ERMINE tienen experiencias propias.`
                : `${p.name} is an independent Black Polar product. CORECROW provides identity, access, and shared services. NORTH, ARCTIC FOX, and ERMINE each own their experience.`}
            </p>
            <div className="bp-actions-row">
              {productIds
                .filter((id) => id !== product)
                .map((id) => (
                  <Link
                    className="bp-text-link"
                    href={`/${locale}/${id}`}
                    key={id}
                  >
                    {products[id].name} ↗
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
