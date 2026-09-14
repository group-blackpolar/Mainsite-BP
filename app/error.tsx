"use client";

import "./styles/main.css";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "40px",
        background: "#ffffff",
        color: "#0f1115",
      }}
    >
      <p
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(15,17,21,0.45)",
          marginBottom: "16px",
        }}
      >
        Error 500
      </p>

      <h1
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(4rem,12vw,10rem)",
          lineHeight: 0.9,
          marginBottom: "24px",
        }}
      >
        Server Error
      </h1>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: "0.95rem",
          color: "rgba(15,17,21,0.58)",
          maxWidth: "420px",
          marginBottom: "40px",
        }}
      >
        {error.message || "Ocurrió un error inesperado."}
      </p>

      <button
        onClick={() => reset()}
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#ffffff",
          background: "#0f1115",
          padding: "14px 32px",
          border: "none",
          cursor: "pointer",
        }}
      >
        ← Try Again
      </button>
    </div>
  );
}
