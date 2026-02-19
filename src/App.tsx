import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from 'react'
import './App.css'
import {
  DASHBOARD_YEARS,
  dashboardDataset,
  type TimelineYear,
  type TrendDirection,
} from './data/dashboardMetrics'

type View = 'landing' | 'dashboard'
type MetricKey = 'gov' | 'acc' | 'eco' | 'pay'

function LandingPage({ onOpenDashboard }: { onOpenDashboard: () => void }) {
  const [selectedLaw, setSelectedLaw] = useState<
    | {
        year: string
        title: string
        entity: string
        summary: string
        focus: string
      }
    | null
  >(null)

  const laws = [
    {
      year: '2002',
      shortTitle: 'Comercio Electronico',
      title: 'Ley de Comercio Electronico, Firmas Electronicas y Mensajes de Datos',
      entity: 'Congreso Nacional del Ecuador',
      summary:
        'Aprobada en el Registro Oficial Suplemento 557 (17-abr-2002), establece el marco juridico del comercio digital en Ecuador.',
      focus:
        'Introduce el principio de equivalencia funcional: la firma electronica y los mensajes de datos tienen validez legal y probatoria similar a sus equivalentes fisicos.',
    },
    {
      year: '2004',
      shortTitle: 'Ley de Transparencia',
      title: 'Ley Organica de Transparencia y Acceso a la Informacion Publica (LOTAIP)',
      entity: 'Congreso Nacional / Asamblea Nacional',
      summary:
        'Promulga obligaciones de transparencia activa y derecho de acceso a la informacion publica. Su marco fue actualizado con la nueva LOTAIP en 2023.',
      focus:
        'Publicacion obligatoria de informacion institucional, plazos de respuesta a solicitudes ciudadanas y control sobre reserva de informacion.',
    },
    {
      year: '2008',
      shortTitle: 'Operatividad e-Firma',
      title: 'Puesta en operacion de la firma electronica en Ecuador',
      entity: 'BCE, MINTEL y SRI',
      summary:
        'El Banco Central del Ecuador se consolida como primera entidad de certificacion y la institucionalidad digital se fortalece con la creacion del MINTEL (ago-2009).',
      focus:
        'La Ley de 2002 pasa de marco legal a aplicacion practica; en materia tributaria, el SRI inicia la ruta hacia comprobantes electronicos, que luego se formaliza en cronogramas obligatorios desde 2013-2014.',
    },
    {
      year: '2016',
      shortTitle: 'Codigo Ingenios',
      title: 'Codigo Organico de la Economia Social de los Conocimientos (Codigo Ingenios)',
      entity: 'Asamblea Nacional del Ecuador',
      summary:
        'Emitido en el Registro Oficial Suplemento 899 (09-dic-2016), reorganiza el sistema de conocimiento, innovacion y propiedad intelectual.',
      focus:
        'Promueve transferencia tecnologica, investigacion, innovacion y politicas de conocimiento abierto, incluyendo lineamientos para uso de tecnologias libres en el sector publico.',
    },
    {
      year: '2021',
      shortTitle: 'Proteccion de Datos',
      title: 'Ley Organica de Proteccion de Datos Personales',
      entity: 'Asamblea Nacional del Ecuador',
      summary:
        'Aprobada en 2021 tras filtraciones masivas (como el caso Novaestrat), crea el marco integral de privacidad y tratamiento de datos personales.',
      focus:
        "Incorpora derechos como acceso, rectificacion, eliminacion, oposicion, portabilidad y supresion ('derecho al olvido'), junto con obligaciones para responsables y encargados.",
    },
    {
      year: '2022',
      shortTitle: 'Cliente Financiero',
      title: 'Ley Organica de Defensa y Proteccion de los Derechos de los Usuarios Financieros',
      entity: 'Asamblea Nacional del Ecuador',
      summary:
        'Publicada en el Registro Oficial Suplemento 1 (11-feb-2022), fortalece la proteccion de usuarios del sistema financiero.',
      focus:
        'Obliga a entidades financieras a disponer de canales fisicos y electronicos eficaces para atencion, reclamos y mecanismos de reparacion.',
    },
    {
      year: '2022',
      shortTitle: 'Ley Fintech',
      title:
        'Ley Organica para el Desarrollo, Regulacion y Control de los Servicios Financieros Tecnologicos',
      entity: 'Asamblea Nacional del Ecuador',
      summary:
        'Publicada en el Segundo Suplemento del Registro Oficial 215 (22-dic-2022), establece el marco legal para servicios financieros tecnologicos.',
      focus:
        'Regula actores y servicios fintech, gobernanza operativa y mecanismos para innovacion financiera con control prudencial y proteccion a usuarios.',
    },
    {
      year: '2023',
      shortTitle: 'Transformacion Digital',
      title: 'Ley Organica de Transformacion Digital y Audiovisual',
      entity: 'Gobierno del Ecuador',
      summary:
        'Publicada en el Tercer Suplemento del Registro Oficial 245 (07-feb-2023), crea incentivos para inversion tecnologica y audiovisual.',
      focus:
        'Facilita tramites digitales y la constitucion de empresas 100% en linea, ademas de promover ecosistemas de innovacion y economia digital.',
    },
    {
      year: '2024',
      shortTitle: 'Norma de Pagos',
      title: 'Norma de Medios y Sistemas de Pago',
      entity: 'Junta de Politica y Regulacion Monetaria',
      summary:
        'La Resolucion JPRM-2024-018-M (RO Suplemento 645, 17-sep-2024) aterriza reglas operativas para medios y sistemas de pago.',
      focus:
        'Define criterios tecnicos y de gestion de riesgo para actores del ecosistema de pagos, reforzando interoperabilidad y seguridad.',
    },
    {
      year: '2025',
      shortTitle: 'Agenda 2025-2030',
      title: 'Politica Publica de Transformacion Digital 2025-2030',
      entity: 'MINTEL',
      summary:
        'Publicada mediante Acuerdo MINTEL-MINTEL-2025-0005 (RO Suplemento 15, 08-abr-2025), marca la hoja de ruta digital del Estado.',
      focus:
        'Prioriza reduccion de brecha digital, modernizacion del sector publico, gobernanza de datos y desarrollo de cultura y habilidades digitales.',
    },
  ]

  const [startIndex, setStartIndex] = useState(0)

  const openLawModal = (law: {
    year: string
    title: string
    entity: string
    summary: string
    focus: string
  }) => {
    setSelectedLaw(law)
  }

  const closeLawModal = () => {
    setSelectedLaw(null)
  }

  const showPrevious = () => {
    setStartIndex((prev) => (prev - 1 + laws.length) % laws.length)
  }

  const showNext = () => {
    setStartIndex((prev) => (prev + 1) % laws.length)
  }

  const visibleLaws = Array.from({ length: 5 }).map((_, idx) => {
    const index = (startIndex + idx) % laws.length
    return laws[index]
  })

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-left">
          <div className="logo-mark">IDE-EC</div>
        </div>
        <nav className="nav-links">
          <a href="#">Inicio</a>
          <a href="#">Dashboard</a>
          <a href="#" >MetodologÃƒÂ­Ã‚Â­a</a>
          <a href="#">Fuentes</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-badge">POSICIÃƒâ€œN GLOBAL: #67</div>

          <div className="hero-main">
            <div className="hero-number">69.6%</div>
            <div className="hero-text">
              <h1>Monitoreando la transiciÃƒÂ³n hacia una economÃƒÂ­Ã‚Â­a digital (2022-2026)</h1>
              <p>
                Analizamos el progreso de la infraestructura, capital humano y adopciÃƒÂ³n tecnolÃƒÂ³gica en el
                sector productivo del Ecuador.
              </p>

              <div className="hero-actions">
                <button className="btn-primary" onClick={onOpenDashboard}>
                  Ver Dashboard
                </button>
                <button className="btn-secondary">Leer MetodologÃƒÂ­Ã‚Â­a</button>
              </div>
            </div>
          </div>
        </section>

        <section className="timeline-section">
          <div className="timeline-header">
            <div>
              <h2>EvoluciÃƒÂ³n Normativa</h2>
              <p>Hitos clave en la legislaciÃƒÂ³n digital ecuatoriana</p>
            </div>
            <div className="timeline-controls">
              <button type="button" className="control-btn" onClick={showPrevious}>
                {'<'}
              </button>
              <button type="button" className="control-btn" onClick={showNext}>
                {'>'}
              </button>
            </div>
          </div>

          <div className="timeline">
            {visibleLaws.map((law) => (
              <button
                key={`${law.year}-${law.shortTitle}`}
                type="button"
                className="timeline-item as-button"
                onClick={() =>
                  openLawModal({
                    year: law.year,
                    title: law.title,
                    entity: law.entity,
                    summary: law.summary,
                    focus: law.focus,
                  })
                }
              >
                <div className="timeline-icon">{law.year}</div>
                <p className="timeline-title">{law.shortTitle}</p>
              </button>
            ))}
          </div>
        </section>


      </main>

      <footer className="footer">
        <div className="footer-left">IDE-EC - Universidad Central del Ecuador</div>
        <div className="footer-left">LegislaciÃƒÂ³n InformÃƒÂ¡tica</div>
      </footer>

      {selectedLaw && (
        <div className="law-modal-overlay" onClick={closeLawModal}>
          <div
            className="law-modal"
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            <header className="law-modal-header">
              <div className="law-modal-chip">{selectedLaw.year}</div>
              <button type="button" className="law-modal-close" onClick={closeLawModal}>
                Ã¢Å“â€¢
              </button>
            </header>
            <h3 className="law-modal-title">{selectedLaw.title}</h3>
            <p className="law-modal-entity">
              <strong>Ente emisor:</strong> {selectedLaw.entity}
            </p>
            <p className="law-modal-summary">{selectedLaw.summary}</p>
            <div className="law-modal-focus">
              <h4>Ã‚Â¿QuÃƒÂ© regula?</h4>
              <p>{selectedLaw.focus}</p>
            </div>
            <footer className="law-modal-footer">
              <button type="button" className="law-modal-secondary" onClick={closeLawModal}>
                Cerrar
              </button>
            </footer>
          </div>
        </div>
      )}

    </div>
  )
}

function DashboardPage({ onBackHome }: { onBackHome: () => void }) {
  const [selectedYear, setSelectedYear] = useState<TimelineYear>(2018)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState<MetricKey | null>(null)
  const sliderTrackRef = useRef<HTMLDivElement | null>(null)

  const yearIndex = DASHBOARD_YEARS.indexOf(selectedYear)
  const progressPct = (yearIndex / (DASHBOARD_YEARS.length - 1)) * 100
  const activeData = dashboardDataset[selectedYear]

  const openMetricModal = (metric: MetricKey) => {
    setSelectedMetric(metric)
  }

  const closeMetricModal = () => {
    setSelectedMetric(null)
  }

  useEffect(() => {
    if (!selectedMetric) return

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMetricModal()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedMetric])

  const clampIndex = (index: number) => Math.min(Math.max(index, 0), DASHBOARD_YEARS.length - 1)

  const setYearByIndex = (index: number) => {
    setSelectedYear(DASHBOARD_YEARS[clampIndex(index)])
  }

  const getIndexFromClientX = (clientX: number) => {
    if (!sliderTrackRef.current) return 0

    const rect = sliderTrackRef.current.getBoundingClientRect()
    if (rect.width === 0) return 0

    const relativeX = Math.min(Math.max(clientX - rect.left, 0), rect.width)
    const ratio = relativeX / rect.width

    return Math.round(ratio * (DASHBOARD_YEARS.length - 1))
  }

  const handleTrackClick = (event: MouseEvent<HTMLDivElement>) => {
    setYearByIndex(getIndexFromClientX(event.clientX))
  }

  const handleThumbPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsDragging(true)
  }

  const handleThumbPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setYearByIndex(getIndexFromClientX(event.clientX))
  }

  const handleThumbPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    setIsDragging(false)
  }

  const handleThumbKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      setYearByIndex(yearIndex + 1)
      return
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      setYearByIndex(yearIndex - 1)
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      setYearByIndex(0)
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      setYearByIndex(DASHBOARD_YEARS.length - 1)
    }
  }

  const handleMetricCardKeyDown = (event: KeyboardEvent<HTMLDivElement>, metric: MetricKey) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openMetricModal(metric)
    }
  }

  const getTrendClass = (direction: TrendDirection) => {
    if (direction === 'up') return 'positive'
    if (direction === 'down') return 'negative'
    return 'neutral'
  }

  const getTrendIcon = (direction: TrendDirection) => {
    if (direction === 'up') return '^'
    if (direction === 'down') return 'v'
    return '-'
  }

  const parsePercent = (value: string) => {
    const numeric = Number.parseFloat(value.replace('%', '').trim())
    if (Number.isNaN(numeric)) return 0
    return numeric
  }

  const getPercentWidth = (value: string) => {
    return Math.min(Math.max(parsePercent(value), 0), 100)
  }

  const formatPercent = (value: number) => `${value.toFixed(1)}%`

  const getGovScore = () => {
    const average = (parsePercent(activeData.gov.osi) + parsePercent(activeData.gov.tii) + parsePercent(activeData.gov.hci)) / 3
    return formatPercent(average)
  }

  const getAccScoreValue = () => {
    const values = [activeData.acc.ih, activeData.acc.ui, activeData.acc.sp, activeData.acc.ai]
      .map((value) => parsePercent(value))
      .filter((value) => !Number.isNaN(value))

    if (values.length === 0) return 0

    return values.reduce((sum, current) => sum + current, 0) / values.length
  }

  const getAccScore = () => formatPercent(getAccScoreValue())

  const getInteroperabilityScore = (level: string) => {
    if (level === 'High') return 85
    if (level === 'Medium') return 65
    return 40
  }

  const getPayCompositeScore = () => {
    const penetration = parsePercent(activeData.pay.value)
    const qr = parsePercent(activeData.pay.qrAdoption)
    const interoperability = getInteroperabilityScore(activeData.pay.interoperability)
    return penetration * 0.5 + qr * 0.3 + interoperability * 0.2
  }

  const metricMethodology: Record<
    MetricKey,
    {
      title: string
      formula: string
      inputs: Array<{ label: string; value: string }>
      methodology: string[]
      sources: string[]
    }
  > = {
    gov: {
      title: 'GOV - Digital Government Index (EGDI)',
      formula: `EGDI = (OSI + TII + HCI) / 3 = (${activeData.gov.osi} + ${activeData.gov.tii} + ${activeData.gov.hci}) / 3 = ${getGovScore()}`,
      inputs: [
        { label: 'Online Service Index (OSI)', value: activeData.gov.osi },
        { label: 'Telecommunication Infrastructure Index (TII)', value: activeData.gov.tii },
        { label: 'Human Capital Index (HCI)', value: activeData.gov.hci },
      ],
      methodology: [
        'Cada componente se expresa en porcentaje y se normaliza en la misma escala.',
        'El indice GOV se calcula con promedio aritmetico simple de OSI, TII y HCI.',
        `Para el anio ${selectedYear} el resultado del dashboard es ${getGovScore()}.`,
      ],
      sources: ['UN DESA - E-Government Survey (EGDI)', 'MINTEL - Estadisticas de gobierno digital', 'INEC - Datos de capital humano'],
    },
    acc: {
      title: 'ACC - Connectivity and Infrastructure Access',
      formula: `ACC = (IH + UI + SP + AI) / 4 = (${activeData.acc.ih} + ${activeData.acc.ui} + ${activeData.acc.sp} + ${activeData.acc.ai}) / 4 = ${getAccScore()}`,
      inputs: [
        { label: 'IH - Hogares con acceso a internet', value: activeData.acc.ih },
        { label: 'UI - Personas que utilizan internet', value: activeData.acc.ui },
        { label: 'SP - Telefono inteligente', value: activeData.acc.sp },
        { label: 'AI - Analfabetismo digital', value: activeData.acc.ai },
      ],
      methodology: [
        'Se toman cuatro porcentajes de acceso y uso digital para el mismo periodo.',
        'Todos los indicadores pesan igual y se agregan mediante promedio simple.',
        `Para el anio ${selectedYear}, el ACC calculado es ${getAccScore()}.`,
      ],
      sources: ['INEC - TIC en hogares y personas', 'ARCOTEL/MINTEL - Cobertura y acceso', 'Encuestas nacionales de habilidades digitales'],
    },
    eco: {
      title: 'ECO - Digital Economy',
      formula: '%Delta ECO = ((V_t - V_{t-1}) / V_{t-1}) x 100',
      inputs: [
        { label: 'Volumen transaccional digital (V_t)', value: activeData.eco.value },
        { label: 'Variacion reportada del periodo', value: activeData.eco.trend.value },
      ],
      methodology: [
        'El indicador principal representa el volumen agregado de transacciones digitales del periodo.',
        'La tendencia muestra la variacion porcentual frente al periodo anterior.',
        'El tablero publica valor principal, tendencia y su lectura operativa.',
      ],
      sources: ['Banco Central del Ecuador - Estadisticas monetarias', 'Superintendencia de Bancos - Reportes del sistema financiero'],
    },
    pay: {
      title: 'PAY - Digital Payments',
      formula: `PAY* = 0.50*Penetracion + 0.30*AdopcionQR + 0.20*Interoperabilidad = ${formatPercent(getPayCompositeScore())}`,
      inputs: [
        { label: 'Penetracion de pagos digitales', value: activeData.pay.value },
        { label: 'Adopcion de QR', value: activeData.pay.qrAdoption },
        { label: 'Interoperabilidad (escala cualitativa)', value: activeData.pay.interoperability },
      ],
      methodology: [
        'Se combina la penetracion total de pagos digitales con adopcion de QR.',
        'La interoperabilidad se transforma a puntaje (Low=40, Medium=65, High=85).',
        `La formula ponderada genera una referencia comparativa para el anio ${selectedYear}.`,
      ],
      sources: ['Banco Central del Ecuador - Medios de pago', 'Asobanca / Superintendencia de Bancos', 'Reportes del ecosistema fintech'],
    },
  }

  const activeMethodology = selectedMetric ? metricMethodology[selectedMetric] : null

  return (
    <div className="page">
      <header className="topbar dashboard-topbar">
        <div className="topbar-left">
          <div className="logo-mark">IDE-EC</div>
        </div>
        <nav className="nav-links">
          <button className="nav-link-button" onClick={onBackHome}>
            Inicio
          </button>
          <a href="#">Dashboard</a>
          <a href="#">Case Studies</a>
          <a href="#">Reports</a>
          <a href="#">Methodology</a>
        </nav>
        <div className="topbar-actions">
          <button className="icon-button">⚙</button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-hero">
          <div>
            <h1>IDE-EC Interactive Dashboard</h1>
            <p>
              Real-time monitoring of Ecuador&apos;s digital economy transition across Government, Access,
              Economy, and Payments sectors.
            </p>
          </div>
        </section>

        <section className="dashboard-cards">
          <div className="card-grid">
            <div
              className="metric-card gov-card metric-card-interactive"
              role="button"
              tabIndex={0}
              onClick={() => openMetricModal('gov')}
              onKeyDown={(event) => handleMetricCardKeyDown(event, 'gov')}
            >
              <header>
                <span className="card-label">GOV. DIGITAL GOVERNMENT</span>
                <span className="card-pill">{activeData.gov.pill}</span>
              </header>
              <div className="metric-main gov-main">
                <div className="gov-egdi-block">
                  <div className="gov-egdi-label">EGDI</div>
                  <div className="metric-value gov-egdi-value">{activeData.gov.value}</div>
                  <div className={`metric-trend ${getTrendClass(activeData.gov.trend.direction)}`}>
                    {getTrendIcon(activeData.gov.trend.direction)} {activeData.gov.trend.value}
                  </div>
                </div>
              </div>
              <div className="gov-breakdown">
                {[
                  { key: 'OSI', value: activeData.gov.osi, className: 'gov-bar-osi' },
                  { key: 'TII', value: activeData.gov.tii, className: 'gov-bar-tii' },
                  { key: 'HCI', value: activeData.gov.hci, className: 'gov-bar-hci' },
                ].map((item) => (
                  <div key={item.key} className="gov-bar-row">
                    <span className="gov-bar-label">{item.key}</span>
                    <div className="gov-bar-track">
                      <div
                        className={`gov-bar-fill ${item.className}`}
                        style={{ width: `${getPercentWidth(item.value)}%` }}
                      />
                    </div>
                    <span className="gov-bar-value">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="metric-caption">{activeData.gov.caption}</div>
            </div>

            <div
              className="metric-card access-card metric-card-interactive"
              role="button"
              tabIndex={0}
              onClick={() => openMetricModal('acc')}
              onKeyDown={(event) => handleMetricCardKeyDown(event, 'acc')}
            >
              <header>
                <span className="card-label">ACC. CONNECTIVITY &amp; INFRASTRUCTURE</span>
                <span className="card-pill">{activeData.acc.pill}</span>
              </header>
              <div className="metric-main access-main">
                <div className="access-score-block">
                  <div className="access-score-label">ACC</div>
                  <div className="metric-value access-score-value">{getAccScore()}</div>
                  <div className="metric-caption">Promedio de IH, UI, SP y AI</div>
                </div>
              </div>
              <div className="access-bars access-indicators">
                {[
                  {
                    key: 'IH',
                    label: 'Hogares con acceso a internet',
                    value: activeData.acc.ih,
                    className: 'acc-bar-ih',
                  },
                  {
                    key: 'UI',
                    label: 'Personas que utilizan internet',
                    value: activeData.acc.ui,
                    className: 'acc-bar-ui',
                  },
                  {
                    key: 'SP',
                    label: 'Telefono inteligente',
                    value: activeData.acc.sp,
                    className: 'acc-bar-sp',
                  },
                  {
                    key: 'AI',
                    label: 'Analfabetismo digital',
                    value: activeData.acc.ai,
                    className: 'acc-bar-ai',
                  },
                ].map((indicator) => (
                  <div key={indicator.key} className="bar-group indicator-row">
                    <span className="indicator-label">{indicator.label}</span>
                    <div className="access-bar-track indicator-track">
                      <div
                        className={`bar ${indicator.className}`}
                        style={{ width: `${getPercentWidth(indicator.value)}%` }}
                      />
                    </div>
                    <span className="bar-side-value">{indicator.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="metric-card eco-card metric-card-interactive"
              role="button"
              tabIndex={0}
              onClick={() => openMetricModal('eco')}
              onKeyDown={(event) => handleMetricCardKeyDown(event, 'eco')}
            >
              <header>
                <span className="card-label">ECO. DIGITAL ECONOMY</span>
              </header>
              <div className="metric-main eco-main">
                <div>
                  <div className="metric-value">{activeData.eco.value}</div>
                  <div className={`metric-trend ${getTrendClass(activeData.eco.trend.direction)}`}>
                    {getTrendIcon(activeData.eco.trend.direction)} {activeData.eco.trend.value}
                  </div>
                  <div className="metric-caption">{activeData.eco.caption}</div>
                </div>
              </div>
              <div className="eco-dots">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div
              className="metric-card pay-card metric-card-interactive"
              role="button"
              tabIndex={0}
              onClick={() => openMetricModal('pay')}
              onKeyDown={(event) => handleMetricCardKeyDown(event, 'pay')}
            >
              <header>
                <span className="card-label">PAY. DIGITAL PAYMENTS</span>
                <span className="card-pill">PAY</span>
              </header>
              <div className="metric-main">
                <div>
                  <div className="metric-value">{activeData.pay.value}</div>
                  <div className={`metric-trend ${getTrendClass(activeData.pay.trend.direction)}`}>
                    {getTrendIcon(activeData.pay.trend.direction)} {activeData.pay.trend.value}
                  </div>
                  <div className="metric-caption">{activeData.pay.caption}</div>
                </div>
              </div>
              <div className="pay-details">
                <div>
                  <span>QR adoption</span>
                  <strong>{activeData.pay.qrAdoption}</strong>
                </div>
                <div>
                  <span>Interoperability</span>
                  <strong>{activeData.pay.interoperability}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="projection-section">
          <div className="projection-header">
            <div>
              <h2>Proyeccion 2018-2026 Simulation</h2>
              <p>Adjust the timeline to forecast digitalization growth targets.</p>
            </div>
            <div className="scenario-pill">YEAR: {selectedYear}</div>
          </div>
          <div className="projection-slider">
            <div className="slider-labels">
              {DASHBOARD_YEARS.map((year) => (
                <button
                  key={year}
                  type="button"
                  className={`slider-label${year === selectedYear ? ' active' : ''}`}
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </button>
              ))}
            </div>
            <div className="slider-track" ref={sliderTrackRef} onClick={handleTrackClick}>
              <div className="slider-progress" style={{ width: `${progressPct}%` }} />
              {DASHBOARD_YEARS.map((year, index) => (
                <button
                  key={`mark-${year}`}
                  type="button"
                  className={`slider-mark${year === selectedYear ? ' active' : ''}`}
                  style={{ left: `${(index / (DASHBOARD_YEARS.length - 1)) * 100}%` }}
                  onClick={(event) => {
                    event.stopPropagation()
                    setSelectedYear(year)
                  }}
                  aria-label={`Select year ${year}`}
                />
              ))}
              <div
                className={`slider-thumb${isDragging ? ' dragging' : ''}`}
                style={{ left: `${progressPct}%` }}
                role="slider"
                tabIndex={0}
                aria-label="Timeline year slider"
                aria-valuemin={2018}
                aria-valuemax={2026}
                aria-valuenow={selectedYear}
                onPointerDown={handleThumbPointerDown}
                onPointerMove={handleThumbPointerMove}
                onPointerUp={handleThumbPointerUp}
                onPointerCancel={handleThumbPointerUp}
                onKeyDown={handleThumbKeyDown}
              />
            </div>
          </div>
        </section>

        <section className="stories-section">
          <h2>La Realidad en la Calle</h2>
          <div className="stories-grid">
            <article className="story-card left-story">
              <div className="story-tag danger">El Reto</div>
              <h3>La Cultura del Efectivo</h3>
              <p>
                High frequency, low ticket transactions define the &quot;Tuti&quot; phenomenon. 65% of daily
                purchases remain cash-based due to perceived fees and lack of digital trust.
              </p>
              <button className="story-button">Ver Analisis Completo -&gt;</button>
            </article>
            <article className="story-card right-story">
              <div className="story-tag success">La Solucion</div>
              <h3>Ecosistema QR Interoperable</h3>
              <p>
                Fintech solutions like Deuna are bridging the gap. Zero-fee P2P transfers and unified QR
                standards are driving a 40% YoY adoption rate in micro-businesses.
              </p>
              <button className="story-button">Ver Caso de Estudio -&gt;</button>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer dashboard-footer">
        <div className="footer-left">IDE-EC (c) 2024 Indice de Digitalizacion de Ecuador. All rights reserved.</div>
        <div className="footer-links">
          <span>Fuentes de Datos</span>
          <span>Legal</span>
          <button className="export-button">CSV</button>
          <button className="export-button primary">Export Excel</button>
        </div>
      </footer>

      {selectedMetric && activeMethodology && (
        <div className="metric-modal-overlay" onClick={closeMetricModal}>
          <div
            className="metric-modal"
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            <header className="metric-modal-header">
              <div>
                <p className="metric-modal-kicker">Metodologia y Formula</p>
                <h3 className="metric-modal-title">{activeMethodology.title}</h3>
              </div>
              <button type="button" className="metric-modal-close" onClick={closeMetricModal}>
                x
              </button>
            </header>

            <div className="metric-modal-content">
              <section className="metric-modal-block">
                <h4>Formula de calculo</h4>
                <code className="metric-formula">{activeMethodology.formula}</code>
              </section>

              <section className="metric-modal-block">
                <h4>Variables e insumos ({selectedYear})</h4>
                <div className="metric-input-grid">
                  {activeMethodology.inputs.map((input) => (
                    <div key={input.label} className="metric-input-item">
                      <span>{input.label}</span>
                      <strong>{input.value}</strong>
                    </div>
                  ))}
                </div>
              </section>

              <section className="metric-modal-block">
                <h4>Metodologia</h4>
                <ul>
                  {activeMethodology.methodology.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </section>

              <section className="metric-modal-block">
                <h4>Fuentes</h4>
                <ul>
                  {activeMethodology.sources.map((source) => (
                    <li key={source}>{source}</li>
                  ))}
                </ul>
              </section>
            </div>

            <footer className="metric-modal-footer">
              <button type="button" className="metric-modal-secondary" onClick={closeMetricModal}>
                Cerrar
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  const [view, setView] = useState<View>('landing')

  if (view === 'dashboard') {
    return <DashboardPage onBackHome={() => setView('landing')} />
  }

  return <LandingPage onOpenDashboard={() => setView('dashboard')} />
}

export default App
