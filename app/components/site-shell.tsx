"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { SiteLocale } from "./marketing-home";
import { ThemeToggle } from "./theme-toggle";

type MenuId = "products" | "solutions";

const shellCopy = {
  "es-lat": {
    nav: {
      products: "Productos",
      solutions: "Soluciones",
      technology: "Tecnologías",
      enterprise: "Empresa",
    },
    login: "Iniciar sesión",
    contact: "Contacto",
    menuIntro: "Sistemas que trabajan juntos.",
    productMenu: [
      ["North", "Espacios de trabajo configurables"],
      ["Arctic Fox", "Flujos de trabajo y automatización"],
      ["Ermine", "ERP y CRM avanzado"],
    ],
    solutionMenu: [
      ["Web y aplicaciones", "Web, escritorio y móvil"],
      ["Datos y operaciones", "Señales y automatización"],
      ["APIs y microservicios de IA", "Integraciones a medida"],
    ],
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    mainNavigation: "Navegación principal",
    home: "Inicio de Black Polar",
    language: "Idioma",
    tagline: "Servicios tecnológicos diseñados con precisión.",
    privacy: "Privacidad",
    terms: "Términos",
    status: "Estado",
    footer: {
      products: "Productos",
      solutions: "Soluciones",
      resources: "Recursos",
      legal: "Legal",
    },
  },
  "en-us": {
    nav: {
      products: "Products",
      solutions: "Solutions",
      technology: "Technology",
      enterprise: "Company",
    },
    login: "Log in",
    contact: "Contact",
    menuIntro: "Systems that work together.",
    productMenu: [
      ["North", "Configurable workspaces"],
      ["Arctic Fox", "Workflows and automation"],
      ["Ermine", "Advanced ERP and CRM"],
    ],
    solutionMenu: [
      ["Web and applications", "Web, desktop, and mobile"],
      ["Data and operations", "Signals and automation"],
      ["APIs and AI microservices", "Custom integrations"],
    ],
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNavigation: "Main navigation",
    home: "Black Polar home",
    language: "Language",
    tagline: "Precision-engineered technology services.",
    privacy: "Privacy",
    terms: "Terms",
    status: "Status",
    footer: {
      products: "Products",
      solutions: "Solutions",
      resources: "Resources",
      legal: "Legal",
    },
  },
} as const;

const Arrow = () => <span aria-hidden="true">↗</span>;

export function SiteHeader({ locale }: { locale: SiteLocale }) {
  const t = shellCopy[locale];
  const pathname = usePathname();
  const pagePath = pathname.replace(/^\/(es-lat|en-us)(?=\/|$)/, "");
  const alternateLocale = locale === "es-lat" ? "en-us" : "es-lat";
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuId | null>(null);
  const [pinnedMenu, setPinnedMenu] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 56);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setActiveMenu(null);
        setPinnedMenu(null);
        setMobileOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        headerRef.current
          ?.querySelector<HTMLButtonElement>(
            ".bp-menu.is-open .bp-menu-trigger, .bp-mobile-trigger.is-open",
          )
          ?.focus();
        setActiveMenu(null);
        setPinnedMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    setActiveMenu(null);
    setPinnedMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  const showMenu = (menu: MenuId) => setActiveMenu(menu);
  const hideMenu = () => setActiveMenu(pinnedMenu);
  const togglePinnedMenu = (menu: MenuId) => {
    const next = pinnedMenu === menu ? null : menu;
    setPinnedMenu(next);
    setActiveMenu(next);
  };
  const closeMenus = () => {
    setActiveMenu(null);
    setPinnedMenu(null);
  };

  const renderMenu = (menu: MenuId) => {
    const items = menu === "products" ? t.productMenu : t.solutionMenu;
    return (
      <div
        className={`bp-mega-menu ${menu === "solutions" ? "bp-mega-menu-compact" : ""}`}
      >
        {menu === "products" && (
          <div className="bp-menu-intro">
            <strong>{t.menuIntro}</strong>
            <small>Black Polar 2026</small>
          </div>
        )}
        <div className="bp-menu-items">
          {items.map(([title, body], index) => (
            <Link
              href={
                menu === "products"
                  ? `/${locale}/${["north", "arcticfox", "ermine"][index]}`
                  : `/${locale}/#solutions`
              }
              className="bp-menu-link"
              key={title}
              onClick={closeMenus}
            >
              <span>
                <strong>{title}</strong>
                <small>{body}</small>
              </span>
              <Arrow />
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <header
      ref={headerRef}
      className={`bp-header ${scrolled ? "is-condensed" : ""}`}
    >
      <div className="bp-nav-frame">
        <Link
          className="bp-brand"
          href={`/${locale}`}
          aria-label={t.home}
        >
          <span className="bp-brand-mark">
            <Image
              src="/assets/main/image/blackpolar1.png"
              alt=""
              width={46}
              height={46}
              priority
            />
          </span>
          <span className="bp-brand-name">BLACK POLAR</span>
        </Link>

        <nav className="bp-nav bp-nav-centered" aria-label={t.mainNavigation}>
          {(["products", "solutions"] as MenuId[]).map((menu) => {
            const open = activeMenu === menu;
            return (
              <div
                className={`bp-menu ${open ? "is-open" : ""} ${pinnedMenu === menu ? "is-pinned" : ""}`}
                key={menu}
                onMouseEnter={() => showMenu(menu)}
                onMouseLeave={hideMenu}
              >
                <button
                  className="bp-menu-trigger"
                  type="button"
                  aria-expanded={open}
                  aria-haspopup="true"
                  onClick={() => togglePinnedMenu(menu)}
                  onFocus={() => showMenu(menu)}
                >
                  {t.nav[menu]}
                  <span aria-hidden="true" />
                </button>
                {open && renderMenu(menu)}
              </div>
            );
          })}
          <Link href={`/${locale}/#technology-stack`}>{t.nav.technology}</Link>
          <Link href={`/${locale}/#enterprise`}>{t.nav.enterprise}</Link>
        </nav>

        <div className="bp-nav-actions">
          <ThemeToggle locale={locale} />
          <Link
            className="bp-locale"
            href={`/${alternateLocale}${pagePath}`}
            aria-label={`${t.language}: ${locale === "es-lat" ? "English" : "Español"}`}
          >
            <span className={locale === "es-lat" ? "is-active" : ""}>ES</span>
            <i aria-hidden="true" />
            <span className={locale === "en-us" ? "is-active" : ""}>EN</span>
          </Link>
          <a className="bp-login" href="https://north.blackpolar.org">
            {t.login}
          </a>
          <Link
            className="bp-button bp-button-dark bp-nav-cta"
            href={`/${locale}/contact`}
          >
            {t.contact}
          </Link>
          <button
            className={`bp-mobile-trigger ${mobileOpen ? "is-open" : ""}`}
            type="button"
            aria-label={mobileOpen ? t.closeMenu : t.openMenu}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="bp-mobile-panel">
          {["north", "arcticfox", "ermine"].map((id, i) => (
            <Link
              href={`/${locale}/${id}`}
              key={id}
              onClick={() => setMobileOpen(false)}
            >
              {t.productMenu[i]?.[0]}
            </Link>
          ))}
          <Link
            href={`/${locale}/#products`}
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.products}
          </Link>
          <Link
            href={`/${locale}/#solutions`}
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.solutions}
          </Link>
          <Link
            href={`/${locale}/#technology-stack`}
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.technology}
          </Link>
          <Link
            href={`/${locale}/#enterprise`}
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.enterprise}
          </Link>
          <a href="https://north.blackpolar.org">{t.login}</a>
          <Link
            className="bp-mobile-locale"
            href={`/${alternateLocale}${pagePath}`}
            onClick={() => setMobileOpen(false)}
          >
            {t.language}: {locale === "es-lat" ? "English" : "Español"}
          </Link>
          <Link className="bp-mobile-contact" href={`/${locale}/contact`}>
            {t.contact}
          </Link>
        </div>
      )}
    </header>
  );
}

export function SiteFooter({ locale }: { locale: SiteLocale }) {
  const t = shellCopy[locale];
  return (
    <footer className="bp-footer">
      <div className="bp-container bp-footer-grid">
        <div>
          <Link className="bp-wordmark" href={`/${locale}`}>
            <Image
              src="/assets/main/image/blackpolar1.png"
              alt=""
              width={38}
              height={38}
            />
            <span>BLACK POLAR</span>
          </Link>
          <p>{t.tagline}</p>
        </div>
        <div>
          <strong>{t.footer.products}</strong>
          <Link href={`/${locale}/north`}>North</Link>
          <Link href={`/${locale}/arcticfox`}>Arctic Fox</Link>
          <Link href={`/${locale}/ermine`}>Ermine</Link>
        </div>
        <div>
          <strong>{t.footer.solutions}</strong>
          <Link href={`/${locale}/#solutions`}>{t.solutionMenu[0][0]}</Link>
          <Link href={`/${locale}/#solutions`}>{t.solutionMenu[1][0]}</Link>
          <Link href={`/${locale}/#solutions`}>{t.solutionMenu[2][0]}</Link>
        </div>
        <div>
          <strong>{t.footer.legal}</strong>
          <Link href={`/${locale}/legal/privacy`}>{t.privacy}</Link>
          <Link href={`/${locale}/legal/terms`}>{t.terms}</Link>
          <Link href={`/${locale}/contact`}>{t.contact}</Link>
        </div>
      </div>
      <div className="bp-container bp-footer-bottom">
        <span>© 2026 Group Black Polar</span>
        <span>
          <Link href={`/${locale}/legal/privacy`}>{t.privacy}</Link> ·{" "}
          <Link href={`/${locale}/legal/terms`}>{t.terms}</Link> ·{" "}
          <a href="https://api.blackpolar.org">{t.status}</a>
        </span>
      </div>
    </footer>
  );
}
