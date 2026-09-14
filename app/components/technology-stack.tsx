import type { CSSProperties } from "react";
import {
  siCloudflare,
  siCplusplus,
  siDocker,
  siGithub,
  siGnubash,
  siKubernetes,
  siLinux,
  siNginx,
  siPostgresql,
  siPython,
  siSharp,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import type { SiteLocale } from "./marketing-home";

const technologies: Array<{
  icon: SimpleIcon;
  name: string;
  role: { "es-lat": string; "en-us": string };
}> = [
  { icon: siTypescript, name: "TypeScript", role: { "es-lat": "Plataformas y servicios", "en-us": "Platforms and services" } },
  { icon: siPython, name: "Python", role: { "es-lat": "Datos y automatización", "en-us": "Data and automation" } },
  { icon: siCplusplus, name: "C++", role: { "es-lat": "Sistemas de alto rendimiento", "en-us": "High-performance systems" } },
  { icon: siSharp, name: "C#", role: { "es-lat": "Soluciones empresariales", "en-us": "Enterprise solutions" } },
  { icon: siGithub, name: "GitHub", role: { "es-lat": "Entrega y colaboración", "en-us": "Delivery and collaboration" } },
  { icon: siGnubash, name: "Bash", role: { "es-lat": "Automatización operativa", "en-us": "Operations automation" } },
  { icon: siLinux, name: "Linux", role: { "es-lat": "Infraestructura confiable", "en-us": "Reliable infrastructure" } },
  { icon: siDocker, name: "Docker", role: { "es-lat": "Entornos reproducibles", "en-us": "Reproducible environments" } },
  { icon: siPostgresql, name: "PostgreSQL", role: { "es-lat": "Datos transaccionales", "en-us": "Transactional data" } },
  { icon: siKubernetes, name: "Kubernetes", role: { "es-lat": "Orquestación de servicios", "en-us": "Service orchestration" } },
  { icon: siCloudflare, name: "Cloudflare", role: { "es-lat": "Red, entrega y seguridad", "en-us": "Network, delivery and security" } },
  { icon: siNginx, name: "NGINX", role: { "es-lat": "Tráfico y disponibilidad", "en-us": "Traffic and availability" } },
];

export function TechnologyStack({ locale }: { locale: SiteLocale }) {
  const es = locale === "es-lat";
  return (
    <section className="bp-section bp-stack-section" id="technology-stack">
      <div className="bp-container">
        <div className="bp-stack-heading" data-reveal>
          <span className="bp-overline">{es ? "CAPACIDADES TÉCNICAS" : "TECHNICAL CAPABILITIES"}</span>
          <h2>{es ? "Tecnología adecuada para cada problema." : "The right technology for each problem."}</h2>
          <p>{es ? "Combinamos lenguajes, sistemas e infraestructura probados según el contexto, sin imponer un framework único." : "We combine proven languages, systems and infrastructure for the context, without forcing a single framework."}</p>
        </div>
        <div className="bp-stack-grid">
          {technologies.map((technology, index) => (
            <article
              key={technology.icon.slug}
              data-reveal
              data-reveal-delay={String(index % 4)}
              style={{ "--stack-color": `#${technology.icon.hex}` } as CSSProperties}
            >
              <div className="bp-stack-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d={technology.icon.path} /></svg>
              </div>
              <div><h3>{technology.name}</h3><span>{technology.role[locale]}</span></div>
              <small>{String(index + 1).padStart(2, "0")}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
