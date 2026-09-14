import { WorldMap } from "@/components/ui/world-map";
import type { SiteLocale } from "./marketing-home";

const locations = {
  us: [14.8283, -88.5795] as [number, number],
  panama: [-9, -81.5199] as [number, number],
  colombia: [-12, -75.0721] as [number, number],
  argentina: [-54.6037, -56.3816] as [number, number],
};

export function NetworkMap({ locale }: { locale: SiteLocale }) {
  const isSpanish = locale === "es-lat";
  const labels = {
    us: isSpanish ? "Estados Unidos" : "United States",
    panama: "Panamá",
    colombia: "Colombia",
    argentina: "Argentina",
  };
  const point = (location: [number, number], label: string) => ({
    lat: location[0],
    lng: location[1],
    label,
  });
  const dots = [
    {
      start: point(locations.us, labels.us),
      end: point(locations.panama, labels.panama),
    },
    {
      start: point(locations.panama, labels.panama),
      end: point(locations.colombia, labels.colombia),
    },
    {
      start: point(locations.colombia, labels.colombia),
      end: point(locations.argentina, labels.argentina),
    },
  ];

  return (
    <section className="bp-network-section" aria-labelledby="network-title">
      <div className="bp-container bp-network-layout" data-reveal>
        <div className="bp-network-copy">
          <span>
            {isSpanish ? "Presencia conectada" : "Connected presence"}
          </span>
          <h2 id="network-title">
            {isSpanish ? "Todo en un mismo lugar." : "Everything in one place."}
          </h2>
          <p>
            {isSpanish
              ? "Estados Unidos, Panamá, Colombia y Argentina conectados sobre una misma red."
              : "The United States, Panama, Colombia, and Argentina connected across one network."}
          </p>
        </div>
        <div className="bp-network-map">
          <WorldMap
            dots={dots}
            lineColor="#86a7ff"
            mapColor="#ffffff"
            ariaLabel={
              isSpanish
                ? "Mapa mundial que conecta Estados Unidos, Panamá, Colombia y Argentina"
                : "World map connecting the United States, Panama, Colombia, and Argentina"
            }
          />
        </div>
      </div>
    </section>
  );
}
