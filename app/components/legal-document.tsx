import Link from "next/link";
import type { SiteLocale } from "./marketing-home";
import { SiteFooter, SiteHeader } from "./site-shell";

type LegalKind = "privacy" | "terms";
const titles = {
  privacy: { "es-lat": "Política de privacidad", "en-us": "Privacy Policy" },
  terms: { "es-lat": "Términos de servicio", "en-us": "Terms of Service" },
} as const;

export function LegalDocument({ locale, kind }: { locale: SiteLocale; kind: LegalKind }) {
  const es = locale === "es-lat";
  return (
    <div className="bp-site bp-inner-site" lang={es ? "es-419" : "en-US"}>
      <SiteHeader locale={locale} />
      <main className="bp-legal-page">
        <div className="bp-legal-gridlines" aria-hidden="true" />
        <div className="bp-legal-shell">
          <aside className="bp-legal-sidebar">
            <span>Legal</span>
            <nav aria-label={es ? "Documentos legales" : "Legal documents"}>
              <Link className={kind === "privacy" ? "is-current" : ""} href={`/${locale}/legal/privacy`}>{es ? "Privacidad" : "Privacy"}</Link>
              <Link className={kind === "terms" ? "is-current" : ""} href={`/${locale}/legal/terms`}>{es ? "Términos de servicio" : "Terms of Service"}</Link>
            </nav>
          </aside>
          <article className="bp-legal-document">
            <div className="bp-legal-kicker"><span>{es ? "EN PREPARACIÓN" : "IN PREPARATION"}</span></div>
            <h1>{titles[kind][locale]}</h1>
            <p className="bp-legal-intro">{es ? "El documento completo está pendiente de publicación." : "The complete document is awaiting publication."}</p>
            <section>
              <h2>{es ? "Habla con Black Polar" : "Contact Black Polar"}</h2>
              <p>{es ? "Para consultas sobre privacidad o condiciones de los servicios, escribe a nuestro equipo. No incluyas contraseñas, datos de pago ni información sensible." : "For questions about privacy or service terms, contact our team. Please do not include passwords, payment details, or sensitive information."}</p>
              <a href="mailto:contact@blackpolar.org">contact@blackpolar.org ↗</a>
            </section>
          </article>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
