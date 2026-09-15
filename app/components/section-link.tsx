"use client";

import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import type { SiteLocale } from "./marketing-home";

export function SectionLink({
  locale,
  section,
  className,
  children,
  onActivate,
}: {
  locale: SiteLocale;
  section: string;
  className?: string;
  children: ReactNode;
  onActivate?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const homePath = `/${locale}`;

  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    onActivate?.();
    const target = document.getElementById(section);

    if ((pathname === homePath || pathname === `${homePath}/`) && target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(
        history.state,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
      return;
    }

    sessionStorage.setItem("blackpolar:target-section", section);
    router.push(homePath);
  };

  return (
    <a className={className} href={homePath} onClick={navigate}>
      {children}
    </a>
  );
}
