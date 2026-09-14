import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument } from "../../../components/legal-document";
import type { SiteLocale } from "../../../components/marketing-home";

const locales: SiteLocale[] = ["es-lat", "en-us"];
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; const spanish = locale === "es-lat"; return { title: spanish ? "Política de privacidad — Borrador" : "Privacy Policy — Draft", description: spanish ? "Borrador de la política de privacidad de Black Polar." : "Draft Black Polar privacy policy.", alternates: { canonical: `/${locale}/legal/privacy`, languages: { "es-419": "/es-lat/legal/privacy", "en-US": "/en-us/legal/privacy" } }, openGraph: { url: `/${locale}/legal/privacy` } }; }
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!locales.includes(locale as SiteLocale)) notFound(); return <LegalDocument locale={locale as SiteLocale} kind="privacy" />; }
