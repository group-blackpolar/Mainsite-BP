"use client";

import DottedMap from "dotted-map";
import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

type Point = { lat: number; lng: number; label?: string };

interface WorldMapProps {
  dots?: Array<{ start: Point; end: Point }>;
  lineColor?: string;
  mapColor?: string;
  ariaLabel?: string;
}

const projectPoint = (lat: number, lng: number) => ({
  x: (lng + 180) * (800 / 360),
  y: (90 - lat) * (400 / 180),
});

const createCurvedPath = (
  start: { x: number; y: number },
  end: { x: number; y: number },
) => {
  const midX = (start.x + end.x) / 2;
  const distance = Math.hypot(end.x - start.x, end.y - start.y);
  const midY =
    Math.min(start.y, end.y) - Math.min(54, Math.max(22, distance * 0.28));
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
};

export function WorldMap({
  dots = [],
  lineColor = "#8aa4ff",
  mapColor = "#ffffff",
  ariaLabel = "Connected world map",
}: WorldMapProps) {
  const reduceMotion = useReducedMotion();
  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: mapColor,
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, [mapColor]);
  const points = useMemo(() => {
    const unique = new Map<string, Point>();
    dots.forEach(({ start, end }) => {
      unique.set(`${start.lat}:${start.lng}`, start);
      unique.set(`${end.lat}:${end.lng}`, end);
    });
    return [...unique.values()];
  }, [dots]);

  return (
    <div className="bp-world-map">
      {/* Generated SVG data URI: a Next image optimization request is unnecessary. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="bp-world-map-dots"
        alt=""
        width="1056"
        height="495"
        draggable={false}
      />
      <svg
        viewBox="0 0 800 400"
        className="bp-world-map-routes"
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <linearGradient
            id="bp-route-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={lineColor} stopOpacity=".1" />
            <stop offset="8%" stopColor={lineColor} />
            <stop offset="92%" stopColor={lineColor} />
            <stop offset="100%" stopColor={lineColor} stopOpacity=".1" />
          </linearGradient>
        </defs>
        {dots.map((dot, index) => {
          const start = projectPoint(dot.start.lat, dot.start.lng);
          const end = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <motion.path
              key={`${dot.start.lat}-${dot.end.lat}`}
              d={createCurvedPath(start, end)}
              fill="none"
              stroke="url(#bp-route-gradient)"
              strokeWidth="1.6"
              strokeLinecap="round"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: reduceMotion ? 0 : 1.25,
                delay: reduceMotion ? 0 : index * 0.35,
                ease: "easeOut",
              }}
            />
          );
        })}
        {points.map((point) => {
          const projected = projectPoint(point.lat, point.lng);
          const labelY =
            point.label === "Colombia" ? projected.y + 17 : projected.y - 8;
          return (
            <g key={`${point.lat}:${point.lng}`}>
              <circle
                cx={projected.x}
                cy={projected.y}
                r="3.2"
                fill={lineColor}
              />
              <circle
                className="bp-world-map-pulse"
                cx={projected.x}
                cy={projected.y}
                r="3.2"
                fill="none"
                stroke={lineColor}
                strokeWidth="1"
              >
                <animate
                  attributeName="r"
                  from="3.2"
                  to="11"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from=".7"
                  to="0"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </circle>
              {point.label && (
                <text
                  x={projected.x + 8}
                  y={labelY}
                  className="bp-world-map-label"
                >
                  {point.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default WorldMap;
