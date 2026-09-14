import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactPage } from "../../components/contact-page";
import type { SiteLocale } from "../../components/marketing-home";

const locales: SiteLocale[] = ["es-lat", "en-us"];
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; const spanish = locale === "es-lat"; return { title: spanish ? "Contacto" : "Contact", description: spanish ? "Conversemos sobre tu próximo proyecto." : "Start a conversation about your next project.", alternates: { canonical: `/${locale}/contact`, languages: { "es-419": "/es-lat/contact", "en-US": "/en-us/contact" } }, openGraph: { url: `/${locale}/contact` } }; }
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!locales.includes(locale as SiteLocale)) notFound(); return <ContactPage locale={locale as SiteLocale} />; }
