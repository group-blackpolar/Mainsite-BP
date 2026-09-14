import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = "https://blackpolar.org";
  const routes = ["", "/north", "/arcticfox", "/ermine", "/contact", "/legal/privacy", "/legal/terms"];
  return (["es-lat", "en-us"] as const).flatMap((locale) => routes.map((route) => ({
    url: `${origin}/${locale}${route}`,
    lastModified: new Date("2026-09-13"),
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : route === "/contact" ? .8 : .4,
  })));
}
