import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from 'react'
import './App.css'
import {
  DASHBOARD_YEARS,
  dashboardDataset,
  type TimelineYear,
  type TrendDirection,
} from './data/dashboardMetrics'
import PaymentsParadoxPage from './components/PaymentsParadoxPage'
import GlobalNav from './components/GlobalNav'
import GlobalFooter from './components/GlobalFooter'
import HistoricalTimeline from './components/HistoricalTimeline'

type View = 'landing' | 'dashboard' | 'payments-paradox'
type MetricKey = 'gov' | 'acc' | 'eco' | 'pay'
type DashboardScrollTarget = 'dashboard' | 'case2'

function LandingPage({
  onOpenDashboard,
  onOpenCase1,
  onOpenCase2,
}: {
  onOpenDashboard: () => void
  onOpenCase1: () => void
  onOpenCase2: () => void
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const heroStyle = {
    '--hero-bg-url': `url('${import.meta.env.BASE_URL}images/hero-bg.jpg')`,
  } as React.CSSProperties

  return (
    <div className="page">
      <GlobalNav
        className="dashboard-topbar"
        onGoHome={scrollToTop}
        onGoDashboard={onOpenDashboard}
        onGoCase1={onOpenCase1}
        onGoCase2={onOpenCase2}
      />

      <main>
        <section className="hero" style={heroStyle}>
          <div className="hero-badge">POSICIÓN GLOBAL: #67</div>

          <div className="hero-main">
            <div className="hero-number">69.6%</div>
            <div className="hero-text">
              <h1>Monitoreando la transición hacia una economía digital (2020-2024)</h1>
              <p>
                Analizamos el progreso de la infraestructura, capital humano y adopción tecnológica en el
                sector productivo del Ecuador.
              </p>

              <div className="hero-actions">
                <button className="btn-primary" onClick={onOpenDashboard}>
                  Ver Dashboard
                </button>
              </div>
            </div>
          </div>
        </section>

        <HistoricalTimeline />
      </main>

      <GlobalFooter />
    </div>
  )
}

function DashboardPage({
  onGoHome,
  onOpenPaymentsParadox,
  initialScrollTarget,
}: {
  onGoHome: () => void
  onOpenPaymentsParadox: () => void
  initialScrollTarget: DashboardScrollTarget
}) {
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

  const getInteroperabilityLabel = (level: string) => {
    if (level === 'High') return 'Alta'
    if (level === 'Medium') return 'Media'
    return 'Baja'
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
        'El índice GOV se calcula con promedio aritmético simple de OSI, TII y HCI.',
        `Para el año ${selectedYear}, el resultado del dashboard es ${getGovScore()}.`,
      ],
      sources: ['UN DESA - E-Government Survey (EGDI)', 'MINTEL - Estadísticas de gobierno digital', 'INEC - Datos de capital humano'],
    },
    acc: {
      title: 'ACC - Connectivity and Infrastructure Access',
      formula: `ACC = (IH + UI + SP + AI) / 4 = (${activeData.acc.ih} + ${activeData.acc.ui} + ${activeData.acc.sp} + ${activeData.acc.ai}) / 4 = ${getAccScore()}`,
      inputs: [
        { label: 'IH - Hogares con acceso a internet', value: activeData.acc.ih },
        { label: 'UI - Personas que utilizan internet', value: activeData.acc.ui },
        { label: 'SP - Teléfono inteligente', value: activeData.acc.sp },
        { label: 'AI - Analfabetismo digital', value: activeData.acc.ai },
      ],
      methodology: [
        'Se toman cuatro porcentajes de acceso y uso digital para el mismo periodo.',
        'Todos los indicadores pesan igual y se agregan mediante promedio simple.',
        `Para el año ${selectedYear}, el ACC calculado es ${getAccScore()}.`,
      ],
      sources: ['INEC - TIC en hogares y personas', 'ARCOTEL/MINTEL - Cobertura y acceso', 'Encuestas nacionales de habilidades digitales'],
    },
    eco: {
      title: 'ECO - Digital Economy',
      formula: '%Delta ECO = ((V_t - V_{t-1}) / V_{t-1}) x 100',
      inputs: [
        { label: 'Volumen transaccional digital (V_t)', value: activeData.eco.value },
        { label: 'Variación reportada del periodo', value: activeData.eco.trend.value },
      ],
      methodology: [
        'El indicador principal representa el volumen agregado de transacciones digitales del periodo.',
        'La tendencia muestra la variación porcentual frente al periodo anterior.',
        'El tablero publica valor principal, tendencia y su lectura operativa.',
      ],
      sources: ['Banco Central del Ecuador - Estadísticas monetarias', 'Superintendencia de Bancos - Reportes del sistema financiero'],
    },
    pay: {
      title: 'PAY - Digital Payments',
      formula: `PAY* = 0.50*Penetración + 0.30*AdopciónQR + 0.20*Interoperabilidad = ${formatPercent(getPayCompositeScore())}`,
      inputs: [
        { label: 'Penetración de pagos digitales', value: activeData.pay.value },
        { label: 'Adopción de QR', value: activeData.pay.qrAdoption },
        { label: 'Interoperabilidad (escala cualitativa)', value: getInteroperabilityLabel(activeData.pay.interoperability) },
      ],
      methodology: [
        'Se combina la penetración total de pagos digitales con adopción de QR.',
        'La interoperabilidad se transforma a puntaje (Baja=40, Media=65, Alta=85).',
        `La fórmula ponderada genera una referencia comparativa para el año ${selectedYear}.`,
      ],
      sources: ['Banco Central del Ecuador - Medios de pago', 'Asobanca / Superintendencia de Bancos', 'Reportes del ecosistema fintech'],
    },
  }

  const activeMethodology = selectedMetric ? metricMethodology[selectedMetric] : null

  const scrollToDashboardTitle = () => {
    const dashboardTitle = document.getElementById('dashboard-title')
    dashboardTitle?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToCase2 = () => {
    const case2Card = document.getElementById('case-study-2')
    case2Card?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const targetId = initialScrollTarget === 'case2' ? 'case-study-2' : 'dashboard-title'
    const targetElement = document.getElementById(targetId)
    targetElement?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [initialScrollTarget])

  return (
    <div className="page">
      <GlobalNav
        className="dashboard-topbar"
        onGoHome={onGoHome}
        onGoDashboard={scrollToDashboardTitle}
        onGoCase1={onOpenPaymentsParadox}
        onGoCase2={scrollToCase2}
      />

      <main className="dashboard-main">
        <section className="dashboard-hero">
          <div>
            <h1 id="dashboard-title">IDE-EC Dashboard Interactivo</h1>
            <p>
              Monitoreo en tiempo real de la transición de la economía digital del Ecuador en los ejes
              de gobierno, acceso, economía y pagos.
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
                <span className="card-label">GOV. GOBIERNO DIGITAL</span>
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
                <span className="card-label">ACC. CONECTIVIDAD E INFRAESTRUCTURA</span>
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
                    label: 'Teléfono inteligente',
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
                <span className="card-label">ECO. ECONOMÍA DIGITAL</span>
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
                <span className="card-label">PAY. PAGOS DIGITALES</span>
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
                  <span>Adopción QR</span>
                  <strong>{activeData.pay.qrAdoption}</strong>
                </div>
                <div>
                  <span>Interoperabilidad</span>
                  <strong>{getInteroperabilityLabel(activeData.pay.interoperability)}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="projection-section">
          <div className="projection-header">
            <div>
              <h2>Simulación de proyección 2018-2026</h2>
              <p>Ajusta la línea de tiempo para visualizar metas de crecimiento digital.</p>
            </div>
            <div className="scenario-pill">AÑO: {selectedYear}</div>
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
                  aria-label={`Seleccionar año ${year}`}
                />
              ))}
              <div
                className={`slider-thumb${isDragging ? ' dragging' : ''}`}
                style={{ left: `${progressPct}%` }}
                role="slider"
                tabIndex={0}
                aria-label="Control deslizante de año"
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
          <h2>Casos de Estudio</h2>
          <div className="stories-grid">
            <article className="story-card left-story">
              <div className="story-tag danger">Caso 1</div>
              <h3>La Paradoja de los Pagos en Ecuador</h3>
              <p>
                Cómo el gigante del descuento frena la adopción digital mientras las Fintech revolucionan
                la inclusión financiera en el sector informal.
              </p>
              <button className="story-button" onClick={onOpenPaymentsParadox}>
                Ver análisis completo -&gt;
              </button>
            </article>
            <article id="case-study-2" className="story-card right-story">
              <div className="story-tag success">Caso 2</div>
              <h3>Digitalización del Transporte Público</h3>
              <p>
                Soluciones Fintech como Deuna están cerrando brechas. Las transferencias P2P sin costo y
                los estándares QR unificados impulsan una adopción anual del 40% en micronegocios.
              </p>
              <button className="story-button">Ver Caso de Estudio</button>
            </article>
          </div>
        </section>
      </main>

      <GlobalFooter />

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
                <p className="metric-modal-kicker">Metodología y fórmula</p>
                <h3 className="metric-modal-title">{activeMethodology.title}</h3>
              </div>
              <button type="button" className="metric-modal-close" onClick={closeMetricModal}>
                x
              </button>
            </header>

            <div className="metric-modal-content">
              <section className="metric-modal-block">
                <h4>Fórmula de cálculo</h4>
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
                <h4>Metodología</h4>
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
  const [dashboardScrollTarget, setDashboardScrollTarget] = useState<DashboardScrollTarget>('dashboard')

  const openDashboard = (target: DashboardScrollTarget = 'dashboard') => {
    setDashboardScrollTarget(target)
    setView('dashboard')
  }

  const openCase1 = () => {
    setView('payments-paradox')
  }

  const openCase2 = () => {
    openDashboard('case2')
  }

  if (view === 'payments-paradox') {
    return (
      <PaymentsParadoxPage
        onGoHome={() => setView('landing')}
        onOpenDashboard={() => openDashboard('dashboard')}
        onOpenCase2={openCase2}
      />
    )
  }

  if (view === 'dashboard') {
    return (
      <DashboardPage
        onGoHome={() => setView('landing')}
        onOpenPaymentsParadox={openCase1}
        initialScrollTarget={dashboardScrollTarget}
      />
    )
  }

  return (
    <LandingPage
      onOpenDashboard={() => openDashboard('dashboard')}
      onOpenCase1={openCase1}
      onOpenCase2={openCase2}
    />
  )
}

export default App
