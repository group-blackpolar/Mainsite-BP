"use client";

import { useState, type FormEvent } from "react";
import type { SiteLocale } from "./marketing-home";
import { SiteFooter, SiteHeader } from "./site-shell";

const copy = {
  "es-lat": {
    eyebrow: "HABLEMOS",
    title: "Construyamos algo esencial.",
    intro:
      "Cuéntanos qué necesita avanzar. Esta primera conversación nos ayuda a conectar tu proyecto con el equipo adecuado.",
    reasons: [
      [
        "Producto y plataformas",
        "Experiencias web y espacios de trabajo diseñados alrededor de cada organización.",
      ],
      [
        "Datos y operaciones",
        "Sistemas que convierten señales dispersas en decisiones claras.",
      ],
      [
        "Infraestructura segura",
        "Arquitectura, despliegue y operación de servicios mantenibles.",
      ],
    ],
    reach: "Escríbenos directamente",
    formTitle: "Cuéntanos sobre tu proyecto",
    first: "Nombre",
    last: "Apellido",
    email: "Correo de trabajo",
    company: "Organización",
    country: "País / Región",
    project: "¿Qué quieres construir?",
    message: "Contexto adicional",
    consent:
      "Acepto que Black Polar use estos datos para responder mi solicitud.",
    submit: "Preparar solicitud",
    note: "El envío a CoreCrow se habilitará cuando esté aprobado el contrato de la API.",
    success: "Solicitud preparada",
    successBody:
      "El formulario funciona localmente. Todavía no se ha transmitido información.",
    locations: "Panamá · Colombia · Argentina · Estados Unidos",
    countries: ["Argentina", "Colombia", "Panamá", "Estados Unidos", "Otro"],
    projects: [
      "NORTH",
      "ARCTIC FOX",
      "ERMINE",
      "Páginas de aterrizaje y presencia web",
      "Microservicios de IA",
      "Aplicaciones de escritorio",
      "Aplicaciones móviles",
      "Flujos de trabajo y automatización",
      "APIs e integraciones de plataformas",
      "Datos y operaciones",
      "Infraestructura",
      "Otro",
    ],
  },
  "en-us": {
    eyebrow: "LET'S TALK",
    title: "Let’s build something essential.",
    intro:
      "Tell us what needs to move forward. This first conversation helps us connect your project with the right team.",
    reasons: [
      [
        "Products and platforms",
        "Web experiences and workspaces designed around each organization.",
      ],
      [
        "Data and operations",
        "Systems that turn scattered signals into clear decisions.",
      ],
      [
        "Secure infrastructure",
        "Architecture, deployment, and operation of maintainable services.",
      ],
    ],
    reach: "Reach us directly",
    formTitle: "Tell us about your project",
    first: "First name",
    last: "Last name",
    email: "Work email",
    company: "Organization",
    country: "Country / Region",
    project: "What do you want to build?",
    message: "Additional context",
    consent:
      "I agree that Black Polar may use this information to respond to my request.",
    submit: "Prepare request",
    note: "Submission to CoreCrow will be enabled once the API contract is approved.",
    success: "Request prepared",
    successBody:
      "The form works locally. No information has been transmitted yet.",
    locations: "Panama · Colombia · Argentina · United States",
    countries: ["Argentina", "Colombia", "Panama", "United States", "Other"],
    projects: [
      "NORTH",
      "ARCTIC FOX",
      "ERMINE",
      "Landing Pages & Web Presence",
      "AI Microservices",
      "Desktop Applications",
      "Mobile Applications",
      "Workflow & Automation",
      "APIs & Platform Integrations",
      "Data & Operations",
      "Infrastructure",
      "Other",
    ],
  },
} as const;

export function ContactPage({ locale }: { locale: SiteLocale }) {
  const t = copy[locale];
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    const fields = new FormData(event.currentTarget);
    setPending(true);
    setError("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CORECROW_URL ?? "https://api.blackpolar.org"}/v1/contact`,
        {
          method: "POST",
          credentials: "omit",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(15000),
          body: JSON.stringify({
            name: `${fields.get("firstName")} ${fields.get("lastName")}`.trim(),
            email: fields.get("email"),
            organization: fields.get("organization"),
            country: fields.get("country"),
            project: fields.get("project"),
            message: fields.get("message"),
            locale,
            consent: true,
          }),
        },
      );
      if (response.status !== 201) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError(
        locale === "es-lat"
          ? "No pudimos confirmar el envío. Inténtalo de nuevo o escríbenos por correo."
          : "We couldn’t confirm delivery. Try again or contact us by email.",
      );
    } finally {
      setPending(false);
    }
  };
  return (
    <div
      className="bp-site bp-inner-site"
      lang={locale === "es-lat" ? "es-419" : "en-US"}
    >
      <SiteHeader locale={locale} />
      <main className="bp-contact-page">
        <div className="bp-contact-grid">
          <section className="bp-contact-story">
            <span className="bp-overline">{t.eyebrow}</span>
            <h1>{t.title}</h1>
            <p className="bp-contact-lead">{t.intro}</p>
            <div className="bp-contact-reasons">
              {t.reasons.map(([title, body]) => (
                <article key={title}>
                  <div>
                    <h2>{title}</h2>
                    <p>{body}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="bp-contact-direct">
              <small>{t.reach}</small>
              <a href="mailto:contact@blackpolar.org">contact@blackpolar.org</a>
              <span>{t.locations}</span>
            </div>
          </section>
          <section
            className="bp-contact-form-panel"
            aria-labelledby="contact-form-title"
          >
            {!submitted ? (
              <>
                <h2 id="contact-form-title">{t.formTitle}</h2>
                <form className="bp-contact-form" onSubmit={submit}>
                  <div className="bp-form-row">
                    <label>
                      <span>{t.first} *</span>
                      <input
                        name="firstName"
                        maxLength={49}
                        autoComplete="given-name"
                        required
                      />
                    </label>
                    <label>
                      <span>{t.last} *</span>
                      <input
                        name="lastName"
                        maxLength={49}
                        autoComplete="family-name"
                        required
                      />
                    </label>
                  </div>
                  <div className="bp-form-row">
                    <label>
                      <span>{t.email} *</span>
                      <input
                        type="email"
                        name="email"
                        maxLength={254}
                        autoComplete="email"
                        required
                      />
                    </label>
                    <label>
                      <span>{t.company} *</span>
                      <input
                        name="organization"
                        maxLength={150}
                        autoComplete="organization"
                        required
                      />
                    </label>
                  </div>
                  <label>
                    <span>{t.country} *</span>
                    <select name="country" defaultValue="" required>
                      <option value="" disabled>
                        —
                      </option>
                      {t.countries.map((country) => (
                        <option key={country}>{country}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>{t.project} *</span>
                    <select name="project" defaultValue="" required>
                      <option value="" disabled>
                        —
                      </option>
                      {t.projects.map((project) => (
                        <option key={project}>{project}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>{t.message}</span>
                    <textarea name="message" rows={6} maxLength={5000} />
                  </label>
                  <label className="bp-consent">
                    <input type="checkbox" required />
                    <span>{t.consent}</span>
                  </label>
                  {error && <p role="alert">{error}</p>}
                  <button
                    className="bp-button bp-button-dark bp-contact-submit"
                    type="submit"
                    disabled={pending}
                  >
                    {pending
                      ? locale === "es-lat"
                        ? "Enviando…"
                        : "Sending…"
                      : locale === "es-lat"
                        ? "Enviar solicitud"
                        : "Send request"}
                    <span aria-hidden="true">→</span>
                  </button>
                  <p className="bp-form-note">
                    {locale === "es-lat"
                      ? "Usaremos tus datos para responder a tu solicitud."
                      : "We’ll use your details to respond to your request."}
                  </p>
                </form>
              </>
            ) : (
              <div className="bp-contact-success" role="status">
                <span>✓</span>
                <h2>
                  {locale === "es-lat"
                    ? "Solicitud recibida"
                    : "Request received"}
                </h2>
                <p>
                  {locale === "es-lat"
                    ? "Gracias por contarnos sobre tu proyecto. Nuestro equipo revisará tu solicitud."
                    : "Thank you for telling us about your project. Our team will review your request."}
                </p>
                <button
                  className="bp-button bp-button-light"
                  type="button"
                  onClick={() => setSubmitted(false)}
                >
                  {locale === "es-lat"
                    ? "Volver al formulario"
                    : "Back to form"}
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
