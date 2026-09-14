import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument } from "../../../components/legal-document";
import type { SiteLocale } from "../../../components/marketing-home";

const locales: SiteLocale[] = ["es-lat", "en-us"];
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; const spanish = locale === "es-lat"; return { title: spanish ? "Términos de servicio — Borrador" : "Terms of Service — Draft", description: spanish ? "Borrador de los términos de servicio de Black Polar." : "Draft Black Polar terms of service.", alternates: { canonical: `/${locale}/legal/terms`, languages: { "es-419": "/es-lat/legal/terms", "en-US": "/en-us/legal/terms" } }, openGraph: { url: `/${locale}/legal/terms` } }; }
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!locales.includes(locale as SiteLocale)) notFound(); return <LegalDocument locale={locale as SiteLocale} kind="terms" />; }
