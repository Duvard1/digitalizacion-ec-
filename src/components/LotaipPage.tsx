import GlobalFooter from './GlobalFooter'
import GlobalNav from './GlobalNav'
import './lotaip.css'

type LotaipPageProps = {
  onGoHome: () => void
  onOpenDashboard: () => void
  onOpenLotaip: () => void
  onOpenCase1: () => void
  onOpenCase2: () => void
}

type GaugeRingProps = {
  value: number
  scoreLabel: string
  metricLabel: string
  footerTag: string
  tone: 'cyan' | 'blue'
}

const pillars = [
  {
    icon: 'TR',
    title: 'Transparencia Activa',
    description:
      'Portales web y articulo 7 obligan legalmente la creacion de infraestructura digital en todas las instituciones.',
  },
  {
    icon: 'SD',
    title: 'Solicitudes Digitales',
    description:
      'Canales de atencion virtual y sistemas de gestion documental eficiente para procesar requerimientos ciudadanos.',
  },
  {
    icon: 'DA',
    title: 'Datos Abiertos',
    description:
      'Reforma 2023: implementacion de formatos reutilizables, abiertos y legibles por maquinas como estandar de ley.',
  },
  {
    icon: 'AR',
    title: 'Archivos Digitales',
    description:
      'Migracion masiva de expedientes fisicos a la nube y servidores locales para garantizar disponibilidad perpetua.',
  },
]

function GaugeRing({ value, scoreLabel, metricLabel, footerTag, tone }: GaugeRingProps) {
  const safeValue = Math.min(Math.max(value, 0), 1)
  const radius = 68
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - safeValue)

  return (
    <div className="lotaip-gauge">
      <div className={`lotaip-gauge-ring ${tone}`}>
        <svg viewBox="0 0 180 180" role="img" aria-label={`${metricLabel} ${scoreLabel}`}>
          <circle className="gauge-track" cx="90" cy="90" r={radius} />
          <circle
            className="gauge-progress"
            cx="90"
            cy="90"
            r={radius}
            style={{
              strokeDasharray: `${circumference}`,
              strokeDashoffset: `${dashOffset}`,
            }}
          />
        </svg>
        <div className="lotaip-gauge-center">
          <strong>{scoreLabel}</strong>
          <span>{metricLabel}</span>
        </div>
      </div>
      <p className="lotaip-gauge-caption">{metricLabel}</p>
      <span className={`lotaip-gauge-tag ${tone}`}>{footerTag}</span>
    </div>
  )
}

export default function LotaipPage({
  onGoHome,
  onOpenDashboard,
  onOpenLotaip,
  onOpenCase1,
  onOpenCase2,
}: LotaipPageProps) {
  return (
    <div className="page lotaip-page">
      <GlobalNav
        className="dashboard-topbar"
        onGoHome={onGoHome}
        onGoDashboard={onOpenDashboard}
        onGoLotaip={onOpenLotaip}
        onGoCase1={onOpenCase1}
        onGoCase2={onOpenCase2}
      />

      <main className="lotaip-main">
        <section className="lotaip-hero">
          <div className="lotaip-shell">
            <div className="lotaip-hero-badges">
              <span className="lotaip-chip">2004: PROMULGACION</span>
              <span className="lotaip-chip lotaip-chip-highlight">2023: LOTAIP 2.0 (REFORMA INTEGRAL)</span>
            </div>

            <h1>
              La LOTAIP: El Motor
              <br />
              del <span>Gobierno Abierto</span> y Digital
            </h1>

            <p>
              Garantizando el derecho ciudadano a la informacion y
              <br />
              forzando la modernizacion del Estado hacia una gestion mas
              <br />
              transparente y eficiente.
            </p>

            <a
              className="lotaip-hero-button"
              href="https://www.educacionsuperior.gob.ec/wp-content/uploads/downloads/2014/09/LOTAIP.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leer Ley
            </a>
          </div>
        </section>

        <section className="lotaip-pillars" id="lotaip-pillars">
          <div className="lotaip-shell">
            <h2>Los 4 pilares de la modernizacion</h2>
            <p className="lotaip-pillars-subtitle">
              La LOTAIP ha sido uno de los motores historicos y actuales para la digitalizacion del Estado
              por las siguientes razones:
            </p>

            <div className="lotaip-pillars-grid">
              {pillars.map((pillar) => (
                <article key={pillar.title} className="lotaip-pillar-card">
                  <div className="lotaip-pillar-icon" aria-hidden="true">
                    {pillar.icon}
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lotaip-impact" id="lotaip-impact-dashboard">
          <div className="lotaip-shell lotaip-impact-shell">
            <h2>Global & National Impact Dashboard</h2>
            <p className="lotaip-impact-subtitle">
              Impacto de la transparencia en los índices digitales del Ecuador (ONU/EGDI)
            </p>

            <article className="lotaip-impact-card">
              <header>
                <h3>Impacto Global (ONU)</h3>
                <span>REPORTE 2024</span>
              </header>

              <div className="lotaip-gauges-row">
                <GaugeRing
                  value={0.8851}
                  scoreLabel="0.8851"
                  metricLabel="OSI SCORE"
                  footerTag="Muy Alto"
                  tone="cyan"
                />
                <GaugeRing
                  value={0.8767}
                  scoreLabel="0.8767"
                  metricLabel="EPI SCORE"
                  footerTag="Puesto 27 Mundial"
                  tone="blue"
                />
              </div>
            </article>

            <aside className="lotaip-impact-note">
              <h4>Impacto de la Transparencia</h4>
              <p>
                Existe una correlacion directa entre la apertura de datos y el posicionamiento en rankings
                internacionales. La mejora en el indice OSI (servicios en linea) y E-Participation refleja
                un ecosistema digital mas robusto, lo que incrementa la confianza ciudadana y atrae
                inversion extranjera en tecnologia.
              </p>
            </aside>
          </div>
        </section>

        <section className="lotaip-conclusion">
          <div className="lotaip-shell">
            <h2>Conclusion: Estado Tecnologico vs. Estado Abierto</h2>
            <p>
              El analisis de la LOTAIP nos permite entender una diferencia fundamental: no es lo mismo
              tener tecnologia que ser transparente.
            </p>

            <blockquote>
              Si una institucion publica cuenta con alta infraestructura tecnologica y gran volumen de pagos
              electronicos, pero no publica sus contratos ni responde solicitudes ciudadanas, su indice de
              digitalizacion real y etico debe ser menor. La LOTAIP asegura que la tecnologia funcione a
              favor de la rendicion de cuentas, penalizando a un Estado que es "tecnologico pero cerrado".
            </blockquote>

            <small>
              <a
                href="https://publicadministration.un.org/egovkb/en-us/Data/Country-Information/id/52-Ecuador"
                target="_blank"
                rel="noopener noreferrer"
              >
                Referencia: UN E-Government Survey 2024
              </a>
            </small>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  )
}
