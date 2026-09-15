"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Activates visual sequences only when their section enters the viewport.
 * Content remains visible when reduced motion is enabled or observers are unavailable.
 */
export function PageMotion() {
  const pathname = usePathname();
  useEffect(() => {
    if (!("scrollRestoration" in history)) return;

    history.scrollRestoration = "manual";
    const storageKey = `blackpolar:scroll:${pathname}`;
    const savePosition = () => {
      sessionStorage.setItem(storageKey, String(window.scrollY));
    };

    if (!window.location.hash) {
      const savedPosition = Number(sessionStorage.getItem(storageKey));
      if (Number.isFinite(savedPosition) && savedPosition > 0) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const previousBehavior =
              document.documentElement.style.scrollBehavior;
            document.documentElement.style.scrollBehavior = "auto";
            window.scrollTo(0, savedPosition);
            requestAnimationFrame(() => {
              document.documentElement.style.scrollBehavior = previousBehavior;
            });
          });
        });
      }
    }

    window.addEventListener("pagehide", savePosition);
    return () => window.removeEventListener("pagehide", savePosition);
  }, [pathname]);

  useEffect(() => {
    const targetSection = sessionStorage.getItem("blackpolar:target-section");
    if (targetSection) {
      sessionStorage.removeItem("blackpolar:target-section");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document
            .getElementById(targetSection)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(
            history.state,
            "",
            `${window.location.pathname}${window.location.search}`,
          );
        });
      });
    }

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
