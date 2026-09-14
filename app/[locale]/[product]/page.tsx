import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage, productIds, products, type ProductId } from "../../components/product-page";
import type { SiteLocale } from "../../components/marketing-home";
type Params = { locale: string; product: string };
function valid(p: Params) { return ["es-lat", "en-us"].includes(p.locale) && productIds.includes(p.product as ProductId); }
export function generateStaticParams() { return ["es-lat", "en-us"].flatMap(locale => productIds.map(product => ({ locale, product }))); }
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = await params; if (!valid(p)) notFound(); const product = products[p.product as ProductId];
  return { title: `${product.name} | Black Polar`, description: product.description[p.locale === "es-lat" ? 0 : 1], alternates: { canonical: `/${p.locale}/${p.product}`, languages: { "es-419": `/es-lat/${p.product}`, "en-US": `/en-us/${p.product}` } } };
}
export default async function Page({ params }: { params: Promise<Params> }) { const p = await params; if (!valid(p)) notFound(); return <ProductPage product={p.product as ProductId} locale={p.locale as SiteLocale} />; }
