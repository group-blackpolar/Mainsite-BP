"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle({ locale }: { locale: "es-lat" | "en-us" }) {
  const [theme, setTheme] = useState<Theme>("light");
  const labels = locale === "es-lat"
    ? { control: "Apariencia", light: "Claro", dark: "Oscuro" }
    : { control: "Appearance", light: "Light", dark: "Dark" };

  useEffect(() => {
    const stored = window.localStorage.getItem("bp-theme") as Theme | null;
    const initial = stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("bp-theme", next);
  };

  return (
    <button
      type="button"
      className="bp-theme-toggle"
      onClick={toggle}
      aria-label={`${labels.control}: ${theme === "light" ? labels.light : labels.dark}`}
      title={theme === "light" ? labels.dark : labels.light}
    >
      <span className={theme === "light" ? "is-active" : ""} aria-hidden="true">☼</span>
      <i aria-hidden="true" />
      <span className={theme === "dark" ? "is-active" : ""} aria-hidden="true">☾</span>
    </button>
  );
}
