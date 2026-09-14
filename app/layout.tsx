import type { Metadata } from "next";
import "./globals.css";
import "./styles/main.css";
import "./styles/shell-pages.css";
import "./styles/ecosystem.css";
import { PageMotion } from "./components/page-motion";

export const metadata: Metadata = {
  metadataBase: new URL("https://blackpolar.org"),
  title: "Black Polar",
  description: "Servicios tecnológicos diseñados con precisión.",
  openGraph: {
    type: "website",
    siteName: "Black Polar",
    title: "Black Polar",
    description: "Servicios tecnológicos diseñados con precisión.",
    url: "https://blackpolar.org",
  },
  icons: { icon: "/assets/main/image/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('bp-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t}catch(e){}})()`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Shared app layout applies this stylesheet to every route. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Manrope:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PageMotion />
        {children}
      </body>
    </html>
  );
}
