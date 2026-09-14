/** Product-specific operational previews replace static marketing imagery. */
export function SystemVisual({
  system,
  locale,
}: {
  system: "north" | "arctic" | "ermine";
  locale: "es-lat" | "en-us";
}) {
  const es = locale === "es-lat";
  if (system === "north") {
    return (
      <div
        className="bp-system-dashboard bp-north-dashboard"
        aria-hidden="true"
      >
        <div className="bp-system-toolbar">
          <span>{es ? "Espacio de trabajo / Proyectos" : "Workspace / Projects"}</span>
          <i />
        </div>
        <div className="bp-system-kpis">
          <div>
            <small>{es ? "Paneles" : "Dashboards"}</small>
            <strong>08</strong>
            <em>{es ? "Activos" : "Active"}</em>
          </div>
          <div>
            <small>KPIs</small>
            <strong>24</strong>
            <em>+12%</em>
          </div>
        </div>
        <div className="bp-system-list">
          <span>
            <i />
            {es ? "Renovación del sitio" : "Website refresh"}<b>72%</b>
          </span>
          <span>
            <i />
            {es ? "Espacio de API" : "API workspace"}<b>54%</b>
          </span>
          <span>
            <i />
            {es ? "Incorporación del equipo" : "Team onboarding"}<b>91%</b>
          </span>
        </div>
      </div>
    );
  }

  if (system === "arctic") {
    return (
      <div
        className="bp-system-dashboard bp-arctic-dashboard"
        aria-hidden="true"
      >
        <div className="bp-system-toolbar">
          <span>{es ? "Flujo / Automatizaciones" : "Workflow / Automations"}</span>
          <i />
        </div>
        <div className="bp-workflow-lane">
          <span>
            <i />
            {es ? "Disparador" : "Trigger"}<small>Webhook</small>
          </span>
          <b aria-hidden="true">→</b>
          <span>
            <i />
            {es ? "Proceso" : "Process"}<small>{es ? "Transformar" : "Transform"}</small>
          </span>
          <b aria-hidden="true">→</b>
          <span>
            <i />
            {es ? "Integración" : "Integration"}<small>{es ? "Entregado" : "Delivered"}</small>
          </span>
        </div>
        <div className="bp-signal-row">
          <div>
            <small>{es ? "Ejecuciones" : "Runs"}</small>
            <strong>1,284</strong>
          </div>
          <div>
            <small>{es ? "Éxito" : "Success"}</small>
            <strong>98.4%</strong>
          </div>
          <div>
            <small>{es ? "Integraciones" : "Integrations"}</small>
            <strong>12</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bp-system-dashboard bp-ermine-dashboard" aria-hidden="true">
      <div className="bp-system-toolbar">
        <span>ERP / CRM</span>
        <i />
      </div>
      <div className="bp-erp-summary">
        <div>
          <small>{es ? "Ingresos" : "Revenue"}</small>
          <strong>$248K</strong>
          <em>+8.2%</em>
        </div>
        <div>
          <small>{es ? "Clientes" : "Customers"}</small>
          <strong>124</strong>
          <em>{es ? "Activos" : "Active"}</em>
        </div>
      </div>
      <div className="bp-erp-pipeline">
        <span>
          <i />
          {es ? "Prospectos calificados" : "Qualified leads"}<b>48</b>
        </span>
        <span>
          <i />
          {es ? "Propuestas" : "Proposals"}<b>16</b>
        </span>
        <span>
          <i />
          {es ? "Cuentas activas" : "Active accounts"}<b>92</b>
        </span>
      </div>
    </div>
  );
}
