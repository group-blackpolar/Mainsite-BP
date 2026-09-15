import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { NetworkMap } from "./network-map";
import { SectionLink } from "./section-link";
import { SiteFooter, SiteHeader } from "./site-shell";
import { Solutions } from "./solutions";
import { SystemVisual } from "./system-visual";
import { TechnologyStack } from "./technology-stack";

export type SiteLocale = "es-lat" | "en-us";

const copy = {
  "es-lat": {
    title: "Tecnología que conecta tu próximo paso.",
    intro:
      "Diseñamos productos, plataformas y sistemas seguros que convierten operaciones complejas en experiencias claras.",
    primary: "Explorar productos",
    secondary: "Explorar soluciones",
    trusted: "Un ecosistema diseñado y operado por Black Polar",
    productTitle: "Una base sólida. Experiencias que se adaptan.",
    northBody:
      "Plataforma empresarial y de usuarios para crear y operar espacios de trabajo, paneles, reportes, datos, archivos y experiencias personalizadas, con acceso y permisos centralizados.",
    arcticBody:
      "Plataforma independiente para construir, ejecutar y administrar flujos de trabajo, procesos automáticos e integraciones entre sistemas.",
    ermineBody:
      "Plataforma independiente de ERP y CRM avanzado para centralizar operaciones, recursos, clientes, procesos y datos internos.",
    solutionsTitle: "Tecnología conectada con el trabajo real.",
    platformTitle: "De una idea a una operación conectada.",
    platformBody:
      "Black Polar construye plataformas, automatización, sistemas empresariales y servicios a medida. Productos independientes, conectados por la base compartida de CORECROW.",
  },
  "en-us": {
    title: "Technology for your next move.",
    intro:
      "We design secure products, platforms, and systems that turn complex operations into clear experiences.",
    primary: "Explore products",
    secondary: "Explore solutions",
    trusted: "One ecosystem, designed and operated by Black Polar",
    productTitle: "A strong foundation. Experiences that adapt.",
    northBody:
      "An enterprise and user platform for creating and operating workspaces, dashboards, reports, data, files, and tailored experiences with centralized access and permissions.",
    arcticBody:
      "An independent platform for building, running, and managing workflows, automated processes, and integrations between systems.",
    ermineBody:
      "An independent advanced ERP and CRM platform for centralizing operations, resources, customers, processes, and internal data.",
    solutionsTitle: "Technology connected to real work.",
    platformTitle: "From an idea to a connected operation.",
    platformBody:
      "Black Polar builds platforms, automation, enterprise systems, and custom services. Independent products, connected through the shared CORECROW foundation.",
  },
} as const;

const Arrow = () => <span aria-hidden="true">↗</span>;

export function MarketingHome({ locale }: { locale: SiteLocale }) {
  const t = copy[locale];
  const isSpanish = locale === "es-lat";
  const systems = [
    {
      id: "north" as const,
      name: "North",
      title: isSpanish
        ? "El espacio donde ocurre el trabajo."
        : "The space where work happens.",
      body: t.northBody,
      link: isSpanish ? "Explorar North" : "Explore North",
    },
    {
      id: "arctic" as const,
      name: "Arctic Fox",
      title: isSpanish
        ? "Automatización para procesos que avanzan."
        : "Automation for processes that move forward.",
      body: t.arcticBody,
      link: isSpanish ? "Conocer Arctic Fox" : "Meet Arctic Fox",
    },
    {
      id: "ermine" as const,
      name: "Ermine",
      title: isSpanish
        ? "La operación empresarial en un solo sistema."
        : "Enterprise operations in one system.",
      body: t.ermineBody,
      link: isSpanish ? "Conocer Ermine" : "Meet Ermine",
    },
  ];

  return (
    <div className="bp-site" lang={isSpanish ? "es-419" : "en-US"}>
      <SiteHeader locale={locale} />
      <main id="main-content">
        <section className="bp-hero">
          <div className="bp-hero-grid" aria-hidden="true" />
          <div className="bp-container bp-hero-layout">
            <div className="bp-hero-copy" data-reveal>
              <h1>{t.title}</h1>
              <p>{t.intro}</p>
              <div className="bp-actions-row">
                <SectionLink
                  className="bp-button bp-button-dark"
                  locale={locale}
                  section="products"
                >
                  {t.primary}
                  <Arrow />
                </SectionLink>
                <SectionLink
                  className="bp-button bp-button-light"
                  locale={locale}
                  section="solutions"
                >
                  {t.secondary}
                </SectionLink>
              </div>
            </div>
            <div
              className="bp-hero-visual"
              data-reveal
              data-reveal-delay="1"
              aria-label={
                isSpanish
                  ? "Vista general de la plataforma Black Polar"
                  : "Black Polar platform overview"
              }
            >
              <div className="bp-orbit bp-orbit-one" />
              <div className="bp-orbit bp-orbit-two" />
              <div className="bp-platform-window">
                <div className="bp-window-bar">
                  <span />
                  <span />
                  <span />
                  <small>
                    North / {isSpanish ? "Operaciones" : "Operations"}
                  </small>
                </div>
                <div className="bp-window-body">
                  <aside>
                    <b>BP</b>
                    <i />
                    <i />
                    <i />
                    <i />
                  </aside>
                  <div className="bp-dashboard">
                    <div className="bp-dashboard-head">
                      <div>
                        <small>
                          {isSpanish ? "Espacio de trabajo" : "Workspace"}
                        </small>
                        <strong>
                          {isSpanish
                            ? "Resumen de operaciones"
                            : "Operations overview"}
                        </strong>
                      </div>
                      <span>{isSpanish ? "Este mes" : "This month"}</span>
                    </div>
                    <div className="bp-metric-row">
                      <div>
                        <small>
                          {isSpanish ? "Sistemas activos" : "Active systems"}
                        </small>
                        <strong>12</strong>
                        <em>+2.4%</em>
                      </div>
                      <div>
                        <small>
                          {isSpanish ? "Disponibilidad" : "Availability"}
                        </small>
                        <strong>99.98%</strong>
                        <em>{isSpanish ? "Estable" : "Stable"}</em>
                      </div>
                    </div>
                    <div className="bp-chart-card">
                      <div className="bp-chart-label">
                        <span>{isSpanish ? "Actividad" : "Activity"}</span>
                        <small>
                          {isSpanish ? "Últimos 30 días" : "Last 30 days"}
                        </small>
                      </div>
                      <svg
                        viewBox="0 0 420 112"
                        role="img"
                        aria-label={
                          isSpanish
                            ? "Gráfico de actividad creciente del sistema"
                            : "Rising system activity chart"
                        }
                      >
                        <defs>
                          <linearGradient
                            id="bp-chart-fill"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0"
                              stopColor="#111827"
                              stopOpacity=".13"
                            />
                            <stop
                              offset="1"
                              stopColor="#111827"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                        <path
                          className="bp-chart-area"
                          d="M0 90 C40 82 56 87 92 68 S150 79 185 49 S240 56 275 36 S332 44 365 22 S395 17 420 8 L420 112 L0 112 Z"
                        />
                        <path
                          className="bp-chart-line"
                          d="M0 90 C40 82 56 87 92 68 S150 79 185 49 S240 56 275 36 S332 44 365 22 S395 17 420 8"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bp-floating-card bp-status-card">
                <span className="bp-check">✓</span>
                <div>
                  <small>North</small>
                  <strong>
                    {isSpanish ? "Vista conceptual" : "Concept preview"}
                  </strong>
                </div>
              </div>
              <div className="bp-floating-card bp-access-card">
                <small>{isSpanish ? "Acceso seguro" : "Secure access"}</small>
                <strong>
                  {isSpanish
                    ? "Identidad · Políticas · Auditoría"
                    : "Identity · Policy · Audit"}
                </strong>
              </div>
            </div>
          </div>
          <div className="bp-container bp-trust-line" data-reveal>
            <span>{t.trusted}</span>
            <div>
              <b>North</b>
              <b>Arctic Fox</b>
              <b>Ermine</b>
            </div>
          </div>
        </section>

        <section className="bp-section bp-products-section" id="products">
          <div className="bp-container">
            <div className="bp-section-heading" data-reveal>
              <h2>{t.productTitle}</h2>
            </div>
            <p className="bp-concept-note">
              {isSpanish
                ? "Productos independientes en desarrollo. Vistas conceptuales con datos ilustrativos."
                : "Independent products in development. Concept previews with illustrative data."}
            </p>
            <div className="bp-product-grid">
              {systems.map((system, index) => (
                <article
                  className={`bp-product-card bp-product-${system.id}`}
                  key={system.name}
                  data-reveal
                  data-reveal-delay={String(index)}
                >
                  <SystemVisual system={system.id} locale={locale} />
                  <div className="bp-card-copy">
                    <span className="bp-product-label">{system.name}</span>
                    <h3>{system.title}</h3>
                    <p>{system.body}</p>
                    <Link
                      href={`/${locale}/${system.id === "arctic" ? "arcticfox" : system.id}`}
                    >
                      {system.link}
                      <Arrow />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <aside className="bp-planned-product" data-reveal>
              <span className="bp-overline">
                SNOWY OWL / {isSpanish ? "Planificado" : "Planned"}
              </span>
              <p>
                {isSpanish
                  ? "Nuestra dirección futura en operaciones de seguridad: visibilidad, alertas e investigación con enfoque SOC."
                  : "Our future direction in security operations: visibility, alerts, and investigation through a SOC experience."}
              </p>
            </aside>
          </div>
        </section>

        <Solutions locale={locale} />

        <section
          className="bp-section bp-platform-section bp-platform-inverse"
          id="enterprise"
        >
          <div className="bp-container bp-platform-layout">
            <div className="bp-platform-copy" data-reveal>
              <h2>{t.platformTitle}</h2>
              <p>{t.platformBody}</p>
              <SectionLink
                className="bp-text-link"
                locale={locale}
                section="technology-stack"
              >
                {isSpanish ? "Ver nuestras tecnologías" : "See our technology"}
                <Arrow />
              </SectionLink>
            </div>
            <div
              className="bp-live-dashboard"
              data-reveal
              data-reveal-delay="1"
              aria-label={
                isSpanish
                  ? "Panel animado de rendimiento"
                  : "Animated performance dashboard"
              }
            >
              <div className="bp-live-head">
                <div>
                  <small>
                    {isSpanish ? "Operación conectada" : "Connected operation"}
                  </small>
                  <strong>
                    {isSpanish
                      ? "Rendimiento en tiempo real"
                      : "Illustrative performance"}
                  </strong>
                </div>
              </div>
              <div className="bp-live-metrics">
                <div>
                  <small>{isSpanish ? "Disponibilidad" : "Availability"}</small>
                  <strong>99.98%</strong>
                  <em>+0.08%</em>
                </div>
                <div>
                  <small>
                    {isSpanish ? "Automatizaciones" : "Automations"}
                  </small>
                  <strong>1,284</strong>
                  <em>+12.4%</em>
                </div>
                <div>
                  <small>{isSpanish ? "Tiempo medio" : "Average time"}</small>
                  <strong>184 ms</strong>
                  <em>-8.2%</em>
                </div>
              </div>
              <div className="bp-live-chart">
                <div className="bp-live-bars">
                  {[36, 52, 44, 68, 61, 82, 74, 92, 78, 100, 88, 106].map(
                    (height, index) => (
                      <i
                        key={index}
                        style={
                          {
                            "--bar-height": `${height}px`,
                            "--bar-delay": `${index * 70}ms`,
                          } as CSSProperties
                        }
                      />
                    ),
                  )}
                </div>
                <div className="bp-chart-scale">
                  <span>00</span>
                  <span>06</span>
                  <span>12</span>
                  <span>18</span>
                  <span>24</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TechnologyStack locale={locale} />
        <section className="bp-brand-banner" aria-label="Group Black Polar">
          <Image
            src="/assets/brand/group-black-polar-banner.png"
            alt="Group Black Polar"
            width={1280}
            height={720}
            sizes="100vw"
          />
        </section>
        <NetworkMap locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
