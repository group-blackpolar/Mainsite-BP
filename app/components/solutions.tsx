import Link from "next/link";
import type { SiteLocale } from "./marketing-home";

export const services = {
  "en-us": [
    [
      "Landing Pages & Web Presence",
      "A clear home for your business or personal brand.",
      "Custom design · Responsive websites · SEO",
    ],
    [
      "AI Microservices",
      "Focused intelligence, connected to the tools you use.",
      "AI analytics · Assistants · Backend integrations",
    ],
    [
      "Desktop Applications",
      "Purpose-built software for work on your desktop.",
      "Native experiences · Cross-platform · System integration",
    ],
    [
      "Mobile Applications",
      "Your service, wherever your customers are.",
      "iOS · Android · Cross-platform experiences",
    ],
    [
      "Workflow & Automation Consulting",
      "Connect processes without adopting an entire platform.",
      "Process mapping · Triggers and actions · Integrations",
    ],
    [
      "Data & Analytics / BI",
      "Turn scattered data into a useful view of your business.",
      "Dashboards · Reporting · Data integration",
    ],
    [
      "APIs & Platform Integrations",
      "Make your systems work together through clear interfaces.",
      "Backend services · Versioned APIs · Platform connections",
    ],
  ],
  "es-lat": [
    [
      "Páginas de aterrizaje y presencia web",
      "Un lugar claro para tu negocio o marca personal.",
      "Diseño a medida · Sitios adaptables · SEO",
    ],
    [
      "Microservicios de IA",
      "Inteligencia enfocada, conectada a tus herramientas.",
      "Analítica con IA · Asistentes · Integraciones de servidor",
    ],
    [
      "Aplicaciones de escritorio",
      "Software a medida para trabajar desde tu escritorio.",
      "Experiencias nativas · Multiplataforma · Integración de sistemas",
    ],
    [
      "Aplicaciones móviles",
      "Tu servicio, donde estén tus clientes.",
      "iOS · Android · Experiencias multiplataforma",
    ],
    [
      "Consultoría de flujos de trabajo y automatización",
      "Conecta procesos sin adoptar una plataforma completa.",
      "Mapeo de procesos · Disparadores y acciones · Integraciones",
    ],
    [
      "Datos, analítica y BI",
      "Convierte datos dispersos en una visión útil de tu negocio.",
      "Paneles · Reportes · Integración de datos",
    ],
    [
      "APIs e integraciones de plataformas",
      "Conecta tus sistemas mediante interfaces claras.",
      "Servicios de servidor · APIs versionadas · Conexiones entre plataformas",
    ],
  ],
} as const;

function SolutionIcon({ index }: { index: number }) {
  const paths = [
    <>
      <rect key="a" x="3" y="5" width="18" height="14" rx="2" />
      <path key="b" d="M3 9h18M7 7h.01M10 7h.01" />
    </>,
    <>
      <path
        key="a"
        d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z"
      />
      <path
        key="b"
        d="m18.5 15 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z"
      />
    </>,
    <>
      <rect key="a" x="3" y="4" width="18" height="13" rx="2" />
      <path key="b" d="M8 21h8M12 17v4" />
    </>,
    <>
      <rect key="a" x="7" y="2" width="10" height="20" rx="2" />
      <path key="b" d="M11 18h2" />
    </>,
    <>
      <circle key="a" cx="5" cy="12" r="2" />
      <circle key="b" cx="19" cy="5" r="2" />
      <circle key="c" cx="19" cy="19" r="2" />
      <path key="d" d="m7 11 10-5M7 13l10 5" />
    </>,
    <>
      <path key="a" d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </>,
    <>
      <path key="a" d="M8 9 4 12l4 3M16 9l4 3-4 3M14 5l-4 14" />
    </>,
  ];

  return (
    <span className="bp-service-icon" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths[index]}
      </svg>
    </span>
  );
}

export function Solutions({ locale }: { locale: SiteLocale }) {
  const es = locale === "es-lat";
  return (
    <section className="bp-section" id="solutions">
      <div className="bp-container">
        <div className="bp-section-heading bp-solutions-heading" data-reveal>
          <span className="bp-overline">
            {es
              ? "Soluciones / Servicios a medida"
              : "Solutions / Custom services"}
          </span>
          <h2>
            {es
              ? "Tecnología para lo que necesitas resolver."
              : "Technology for the work ahead."}
          </h2>
          <p>
            {es
              ? "Servicios para personas y empresas. Un proyecto a medida, independiente de nuestros productos."
              : "Services for individuals and businesses. Custom engagements, separate from our product lineup."}
          </p>
        </div>
        <div className="bp-service-grid bp-solutions-grid">
          {services[locale].map(([name, description, capabilities], i) => (
            <article className="bp-service-card" key={name} data-reveal>
              <div className="bp-service-card-head">
                <SolutionIcon index={i} />
                <span className="bp-overline">0{i + 1}</span>
              </div>
              <h3>{name}</h3>
              <p>{description}</p>
              <small>{capabilities}</small>
            </article>
          ))}
        </div>
        <Link
          className="bp-button bp-button-dark bp-service-cta"
          href={`/${locale}/contact`}
        >
          {es ? "Hablemos de tu proyecto" : "Let’s talk about your project"}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
