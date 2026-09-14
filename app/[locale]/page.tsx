import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingHome, type SiteLocale } from "../components/marketing-home";

const locales: SiteLocale[] = ["es-lat", "en-us"];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const spanish = locale === "es-lat";
  return {
    title: "Black Polar",
    description: spanish ? "Tecnología precisa y especializada" : "Precision-engineered technology services.",
    alternates: { canonical: `/${locale}`, languages: { "es-419": "/es-lat", "en-US": "/en-us" } },
    openGraph: { url: `/${locale}`, locale: spanish ? "es_419" : "en_US" },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalizedHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as SiteLocale)) notFound();
  return <MarketingHome locale={locale as SiteLocale} />;
}
