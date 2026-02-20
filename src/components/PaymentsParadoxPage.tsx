import './PaymentsParadoxPage.css'
import GlobalNav from './GlobalNav'
import GlobalFooter from './GlobalFooter'

type PaymentsParadoxPageProps = {
  onGoHome: () => void
  onOpenDashboard: () => void
  onOpenCase2: () => void
}

function KpiCard({ title, value, caption }: { title: string; value: string; caption: string }) {
  return (
    <article className="pp-kpi-card">
      <p className="pp-kpi-title">{title}</p>
      <p className="pp-kpi-value">{value}</p>
      <p className="pp-kpi-caption">{caption}</p>
    </article>
  )
}

const CHANNEL_YEARS = [2019, 2020, 2021] as const

const CHANNEL_SERIES = [
  { key: 'Digital', color: '#2e5b9e', values: [109, 173, 285] },
  { key: 'Fisico', color: '#f08f1a', values: [245, 204, 258] },
  { key: 'Remoto', color: '#7a66ac', values: [157, 122, 151] },
] as const

type FinancialEntry = {
  year: number
  ventas: number
  perdida: number
  activo: number
  inventario: number
  pasivo: number
  patrimonio: number
}

const FINANCIAL_DATA: Record<'TUTI' | 'FAVORITA' | 'TIA', FinancialEntry[]> = {
  TUTI: [
    { year: 2019, ventas: 2.49, perdida: -3.53, activo: 2.12, inventario: 0, pasivo: 6.36, patrimonio: -3.52 },
    { year: 2020, ventas: 28.51, perdida: -5.92, activo: 14.34, inventario: 0, pasivo: 21.53, patrimonio: -7.19 },
    { year: 2021, ventas: 85.75, perdida: -6.77, activo: 28.3, inventario: 14.34, pasivo: 44.57, patrimonio: -16.27 },
    { year: 2022, ventas: 240.09, perdida: -6.75, activo: 99.49, inventario: 19.57, pasivo: 122.5, patrimonio: -23.01 },
    { year: 2023, ventas: 446.67, perdida: -6.05, activo: 161.8, inventario: 29.59, pasivo: 190.38, patrimonio: -28.58 },
    { year: 2024, ventas: 693.24, perdida: 0.63, activo: 261.96, inventario: 42.89, pasivo: 289.29, patrimonio: -27.33 },
  ],
  FAVORITA: [
    { year: 2019, ventas: 2103.83, perdida: 155.76, activo: 2051.46, inventario: 252.0, pasivo: 662.14, patrimonio: 1389.32 },
    { year: 2020, ventas: 2170.6, perdida: 147.5, activo: 2121.86, inventario: 246.04, pasivo: 638.89, patrimonio: 1482.97 },
    { year: 2021, ventas: 2178.78, perdida: 143.82, activo: 2343.21, inventario: 244.95, pasivo: 771.98, patrimonio: 1571.22 },
    { year: 2022, ventas: 2355.58, perdida: 152.68, activo: 2480.4, inventario: 295.5, pasivo: 800.38, patrimonio: 1680.02 },
    { year: 2023, ventas: 2483.06, perdida: 165.23, activo: 2564.38, inventario: 292.69, pasivo: 778.41, patrimonio: 1785.97 },
    { year: 2024, ventas: 2546.1, perdida: 157.78, activo: 2694.15, inventario: 314.09, pasivo: 826.48, patrimonio: 1867.67 },
  ],
  TIA: [
    { year: 2019, ventas: 707.46, perdida: 28.98, activo: 490.7, inventario: 68.3, pasivo: 390.15, patrimonio: 100.55 },
    { year: 2020, ventas: 701.58, perdida: 29.03, activo: 537.15, inventario: 74.57, pasivo: 439.17, patrimonio: 97.98 },
    { year: 2021, ventas: 705.02, perdida: 22.7, activo: 593.78, inventario: 88.85, pasivo: 497.31, patrimonio: 96.47 },
    { year: 2022, ventas: 776.16, perdida: 30.23, activo: 604.3, inventario: 95.26, pasivo: 515.98, patrimonio: 88.32 },
    { year: 2023, ventas: 787.98, perdida: 20.09, activo: 636.6, inventario: 92.22, pasivo: 561.01, patrimonio: 75.59 },
    { year: 2024, ventas: 754.41, perdida: 6.64, activo: 646.6, inventario: 76.22, pasivo: 543.91, patrimonio: 102.69 },
  ],
}

const FINANCIAL_YEARS = FINANCIAL_DATA.TUTI.map((d) => d.year)

const calculateMargin = (companyData: FinancialEntry[]) => companyData.map((d) => (d.perdida / d.ventas) * 100)

const MARKET_TOTALS = FINANCIAL_YEARS.map(
  (_, i) => FINANCIAL_DATA.TUTI[i].ventas + FINANCIAL_DATA.TIA[i].ventas + FINANCIAL_DATA.FAVORITA[i].ventas,
)

const calculateShare = (companyData: FinancialEntry[]) =>
  companyData.map((d, i) => (d.ventas / MARKET_TOTALS[i]) * 100)


type LineSeries = {
  key: string
  color: string
  values: number[]
  dashed?: boolean
  fillColor?: string
}

type MultiLineChartProps = {
  labels: number[]
  series: LineSeries[]
  minY: number
  maxY: number
  ticks: number[]
  yLabelFormatter?: (value: number) => string
  pointFormatter?: (value: number) => string
}

function MultiLineChart({
  labels,
  series,
  minY,
  maxY,
  ticks,
  yLabelFormatter = (value) => `${value}`,
  pointFormatter = (value) => value.toFixed(0),
}: MultiLineChartProps) {
  const width = 760
  const height = 330
  const margin = { top: 22, right: 20, bottom: 56, left: 58 }
  const plotWidth = width - margin.left - margin.right
  const plotHeight = height - margin.top - margin.bottom

  const xForIndex = (index: number) => margin.left + (plotWidth * index) / (labels.length - 1)
  const yForValue = (value: number) => {
    const normalized = (value - minY) / (maxY - minY)
    return margin.top + (1 - normalized) * plotHeight
  }

  const buildPath = (values: number[]) =>
    values.map((value, index) => `${index === 0 ? 'M' : 'L'} ${xForIndex(index)} ${yForValue(value)}`).join(' ')

  return (
    <div className="pp-data-chart-wrap" role="img" aria-label="Grafico comparativo">
      <svg viewBox={`0 0 ${width} ${height}`} className="pp-data-chart">
        {ticks.map((tick) => (
          <g key={`tick-${tick}`}>
            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={yForValue(tick)}
              y2={yForValue(tick)}
              className="pp-data-grid-line"
            />
            <text x={margin.left - 12} y={yForValue(tick) + 4} className="pp-data-axis-label pp-data-axis-left">
              {yLabelFormatter(tick)}
            </text>
          </g>
        ))}

        {minY < 0 && maxY > 0 && (
          <line
            x1={margin.left}
            x2={width - margin.right}
            y1={yForValue(0)}
            y2={yForValue(0)}
            className="pp-data-zero-line"
          />
        )}

        {labels.map((year, index) => (
          <text key={`year-${year}`} x={xForIndex(index)} y={height - 20} className="pp-data-axis-label pp-data-year-label">
            {year}
          </text>
        ))}

        {series.map((line) => {
          const linePath = buildPath(line.values)
          const baseline = yForValue(minY)
          const areaPath = `${linePath} L ${xForIndex(line.values.length - 1)} ${baseline} L ${xForIndex(0)} ${baseline} Z`

          return (
            <g key={line.key}>
              {line.fillColor && <path d={areaPath} fill={line.fillColor} opacity={1} />}
              <path
                d={linePath}
                className="pp-data-line"
                stroke={line.color}
                strokeDasharray={line.dashed ? '7 6' : undefined}
              />
              {line.values.map((value, index) => (
                <g key={`${line.key}-${labels[index]}`}>
                  <circle cx={xForIndex(index)} cy={yForValue(value)} r={3.8} fill={line.color} />
                  <text x={xForIndex(index)} y={yForValue(value) - 10} className="pp-data-value-label" fill={line.color}>
                    {pointFormatter(value)}
                  </text>
                </g>
              ))}
            </g>
          )
        })}
      </svg>

      <div className="pp-data-legend">
        {series.map((line) => (
          <div key={`legend-${line.key}`} className="pp-data-legend-item">
            <span className="pp-data-legend-swatch" style={{ backgroundColor: line.color }} />
            {line.key}
          </div>
        ))}
      </div>
    </div>
  )
}

function EfficiencyBarsChart() {
  const latest = FINANCIAL_DATA.TUTI.length - 1
  const data = [
    {
      label: 'Tuti (Rapido)',
      value: FINANCIAL_DATA.TUTI[latest].ventas / FINANCIAL_DATA.TUTI[latest].activo,
      color: '#8b5cf6',
    },
    {
      label: 'Tia (Medio)',
      value: FINANCIAL_DATA.TIA[latest].ventas / FINANCIAL_DATA.TIA[latest].activo,
      color: '#fbbf24',
    },
    {
      label: 'Favorita (Lento)',
      value: FINANCIAL_DATA.FAVORITA[latest].ventas / FINANCIAL_DATA.FAVORITA[latest].activo,
      color: '#f87171',
    },
  ]

  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="pp-efficiency-bars" role="img" aria-label="Rotacion de activos comparada">
      {data.map((item) => (
        <div key={item.label} className="pp-eff-row">
          <div className="pp-eff-label">{item.label}</div>
          <div className="pp-eff-track">
            <div
              className="pp-eff-fill"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color,
              }}
            />
          </div>
          <div className="pp-eff-value">{item.value.toFixed(2)}x</div>
        </div>
      ))}
    </div>
  )
}

type ShareLayer = {
  key: string
  fill: string
  stroke: string
  values: number[]
}

function StackedAreaShareChart({ labels, layers }: { labels: number[]; layers: ShareLayer[] }) {
  const width = 760
  const height = 340
  const margin = { top: 22, right: 24, bottom: 58, left: 54 }
  const plotWidth = width - margin.left - margin.right
  const plotHeight = height - margin.top - margin.bottom
  const ticks = [0, 20, 40, 60, 80, 100]

  const xForIndex = (index: number) => margin.left + (plotWidth * index) / (labels.length - 1)
  const yForValue = (value: number) => margin.top + ((100 - value) / 100) * plotHeight

  const computedLayers = layers.reduce<
    Array<ShareLayer & { top: number[]; bottom: number[] }>
  >((acc, layer) => {
    const previousTop = acc.length ? acc[acc.length - 1].top : labels.map(() => 0)
    const currentTop = layer.values.map((value, index) => previousTop[index] + value)
    acc.push({ ...layer, bottom: previousTop, top: currentTop })
    return acc
  }, [])

  return (
    <div className="pp-data-chart-wrap" role="img" aria-label="Cuota de mercado apilada">
      <svg viewBox={`0 0 ${width} ${height}`} className="pp-data-chart">
        {ticks.map((tick) => (
          <g key={`share-tick-${tick}`}>
            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={yForValue(tick)}
              y2={yForValue(tick)}
              className="pp-data-grid-line"
            />
            <text x={margin.left - 12} y={yForValue(tick) + 4} className="pp-data-axis-label pp-data-axis-left">
              {tick}%
            </text>
          </g>
        ))}

        {computedLayers.map((layer) => {
          const topPath = layer.top.map((value, index) => `${xForIndex(index)} ${yForValue(value)}`).join(' L ')
          const bottomPath = [...layer.bottom]
            .reverse()
            .map((value, idx) => {
              const originalIndex = layer.bottom.length - 1 - idx
              return `${xForIndex(originalIndex)} ${yForValue(value)}`
            })
            .join(' L ')
          const polygonPath = `M ${topPath} L ${bottomPath} Z`

          return (
            <g key={layer.key}>
              <path d={polygonPath} fill={layer.fill} />
              <path
                d={`M ${topPath}`}
                fill="none"
                stroke={layer.stroke}
                strokeWidth={2.2}
                strokeLinecap="round"
              />
            </g>
          )
        })}

        {labels.map((year, index) => (
          <text key={`share-year-${year}`} x={xForIndex(index)} y={height - 20} className="pp-data-axis-label pp-data-year-label">
            {year}
          </text>
        ))}
      </svg>

      <div className="pp-data-legend">
        {layers.map((layer) => (
          <div key={`share-legend-${layer.key}`} className="pp-data-legend-item">
            <span className="pp-data-legend-swatch" style={{ backgroundColor: layer.stroke }} />
            {layer.key}
          </div>
        ))}
      </div>
    </div>
  )
}

const SALES_SERIES: LineSeries[] = [
  {
    key: 'Tuti (Efectivo)',
    color: '#8b5cf6',
    values: FINANCIAL_DATA.TUTI.map((d) => d.ventas),
    fillColor: 'rgba(139, 92, 246, 0.12)',
  },
  {
    key: 'Tia (DeUna)',
    color: '#f59e0b',
    values: FINANCIAL_DATA.TIA.map((d) => d.ventas),
    dashed: true,
  },
  {
    key: 'Favorita (Digital)',
    color: '#ef4444',
    values: FINANCIAL_DATA.FAVORITA.map((d) => d.ventas),
  },
]

const MARGIN_SERIES: LineSeries[] = [
  {
    key: 'Margen Tia',
    color: '#f59e0b',
    values: calculateMargin(FINANCIAL_DATA.TIA),
  },
  {
    key: 'Margen Favorita',
    color: '#ef4444',
    values: calculateMargin(FINANCIAL_DATA.FAVORITA),
  },
  {
    key: 'Margen Tuti',
    color: '#8b5cf6',
    values: calculateMargin(FINANCIAL_DATA.TUTI),
    dashed: true,
  },
]

const SHARE_LAYERS: ShareLayer[] = [
  {
    key: 'Tuti (Hard Discount)',
    fill: 'rgba(139, 92, 246, 0.7)',
    stroke: '#8b5cf6',
    values: calculateShare(FINANCIAL_DATA.TUTI),
  },
  {
    key: 'Tia (Tradicional)',
    fill: 'rgba(245, 158, 11, 0.45)',
    stroke: '#f59e0b',
    values: calculateShare(FINANCIAL_DATA.TIA),
  },
  {
    key: 'Favorita (Premium)',
    fill: 'rgba(239, 68, 68, 0.35)',
    stroke: '#ef4444',
    values: calculateShare(FINANCIAL_DATA.FAVORITA),
  },
]

function TransactionsByChannelChart() {
  const width = 760
  const height = 340
  const margin = { top: 22, right: 24, bottom: 56, left: 54 }
  const plotWidth = width - margin.left - margin.right
  const plotHeight = height - margin.top - margin.bottom
  const maxY = 300
  const ticks = [0, 50, 100, 150, 200, 250, 300]

  const xForIndex = (index: number) => margin.left + (plotWidth * index) / (CHANNEL_YEARS.length - 1)
  const yForValue = (value: number) => margin.top + ((maxY - value) / maxY) * plotHeight

  const buildPath = (values: readonly number[]) =>
    values.map((value, index) => `${index === 0 ? 'M' : 'L'} ${xForIndex(index)} ${yForValue(value)}`).join(' ')

  return (
    <div className="pp-line-chart-wrap" role="img" aria-label="Evolucion de transacciones por canal 2019 a 2021">
      <svg viewBox={`0 0 ${width} ${height}`} className="pp-line-chart">
        {ticks.map((tick) => (
          <g key={`tick-${tick}`}>
            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={yForValue(tick)}
              y2={yForValue(tick)}
              className="pp-chart-grid-line"
            />
            <text x={margin.left - 12} y={yForValue(tick) + 4} className="pp-chart-axis-label pp-chart-axis-left">
              {tick}
            </text>
          </g>
        ))}

        {CHANNEL_YEARS.map((year, index) => (
          <text key={`year-${year}`} x={xForIndex(index)} y={height - 20} className="pp-chart-axis-label pp-chart-year-label">
            {year}
          </text>
        ))}

        {CHANNEL_SERIES.map((series) => (
          <g key={series.key}>
            <path d={buildPath(series.values)} fill="none" stroke={series.color} strokeWidth={4} strokeLinecap="round" />
            {series.values.map((value, index) => (
              <g key={`${series.key}-${CHANNEL_YEARS[index]}`}>
                <circle cx={xForIndex(index)} cy={yForValue(value)} r={4.5} fill={series.color} />
                <text
                  x={xForIndex(index)}
                  y={yForValue(value) - 10}
                  textAnchor="middle"
                  className="pp-chart-value-label"
                  fill={series.color}
                >
                  {value}
                </text>
              </g>
            ))}
          </g>
        ))}
      </svg>

      <div className="pp-chart-legend">
        {CHANNEL_SERIES.map((series) => (
          <div key={`legend-${series.key}`} className="pp-chart-legend-item">
            <span style={{ backgroundColor: series.color }} />
            {series.key}
          </div>
        ))}
      </div>
      <p className="pp-chart-source">Elaboracion y fuente: Asobanca</p>
    </div>
  )
}

export default function PaymentsParadoxPage({
  onGoHome,
  onOpenDashboard,
  onOpenCase2,
}: PaymentsParadoxPageProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const scrollToBattle = () => {
    const battleTitle = document.getElementById('pp-battle-title')
    battleTitle?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="pp-page">
      <GlobalNav
        className="dashboard-topbar"
        onGoHome={onGoHome}
        onGoDashboard={onOpenDashboard}
        onGoCase1={scrollToTop}
        onGoCase2={onOpenCase2}
      />

      <main>
        <section className="pp-hero">
          <div className="pp-hero-card">
            <p className="pp-badge">REPORTE ESPECIAL</p>
            <h1>
              La Paradoja de los <span>Pagos</span> en Ecuador
            </h1>
            <p className="pp-hero-copy">
              El efectivo vs. la billetera digital: Como el gigante del descuento frena la adopcion digital
              mientras las Fintech revolucionan la inclusion financiera.
            </p>
            <div className='pp-hero-metric-container'>
            <div className="pp-hero-metric">
              <span>Retiros cajero (avg)</span>
              <p className="pp-hero-compare">
                <s>$112</s>
                <span className="pp-hero-arrow"> - </span>
                <strong>$88.90</strong>
              </p>
            </div>
            <button type="button" className="pp-outline-btn" onClick={scrollToBattle}>
              Ver Graficas
            </button>

            </div>
          </div>
        </section>

        <section className="pp-grid-section" id="indicadores">
          <div className="pp-left-column">
            <h2>
              El Caso Tuti:
              <br />
              <span>El Freno a la Digitalizacion</span>
            </h2>
            <p>
              Tuti ha crecido exponencialmente, pasando de USD 2,4 millones en 2019 a facturar USD 693,2
              millones en 2024. Hoy, el 88% de los hogares ecuatorianos compra en este formato Hard
              Discount.
            </p>
            <div className="pp-photo-card">
              <img
                className="pp-photo-image"
                src="/images/tuti-case.png"
                alt="Contexto visual de pagos en efectivo en supermercados"
              />
            </div>
            <article className="pp-note">
              <h3>La Digitalizacion Invisible (Paradoja)</h3>
              <p>
              Aunque obligan al cliente a usar efectivo, su operaciÃ³n interna es 100% digital. Utilizan facturaciÃ³n electrÃ³nica masiva (SRI) para automatizar logÃ­stica y controlar inventarios sin necesidad de tarjetas de lealtad
              </p>
            </article>
          </div>

          <aside className="pp-right-column">
            <h3>Metricas de impacto clave</h3>
            <KpiCard title="Facturacion estimada" value="$693.2M" caption="AÃ±o 2024" />
            <KpiCard title="Incentivo principal" value="$13.8M" caption="Ahorro en comisiones (efectivo)" />

            <div className="pp-impact-list">
              <h4>Impacto Negativo</h4>
              <article>
                <strong>Mantiene la cultura del fisico</strong>
                <p>Refuerza el hÃ¡bito del retiro de efectivo en cajeros para compras diarias, estancando la adopciÃ³n digital.</p>
              </article>
              <article>
                <strong>Frena a la competencia</strong>
                <p>Obliga a competidores a bajar mÃ¡rgenes o adoptar estrategias similares de "solo efectivo" para competir en precio.</p>
              </article>
              <article>
                <strong>Perdida de trazabilidad</strong>
                <p>Reduce la visibilidad de datos transaccionales necesarios para anÃ¡lisis econÃ³mico y crediticio del sector.</p>
              </article>
            </div>
          </aside>
        </section>

        <section className="pp-grid-section pp-grid-section-alt" id="publicaciones">
          <div className="pp-phone-wrap">
            <img
              className="pp-phone-image"
              src="/images/deuna-phone.png"
              alt="Visual de caso Deuna y pago digital"
            />
          </div>

          <div className="pp-deuna-column">
            <p className="pp-badge">CASO DE EXITO</p>
            <h2>
              El Caso Deuna:
              <br />
              <span>El Motor de la Digitalizacion</span>
            </h2>
            <p>
              Deuna ha logrado penetrar el comercio informal, permitiendo que negocios pequenos y personas no
              bancarizadas acepten pagos digitales sin necesidad de terminales costosos.
            </p>
            <div className="pp-impact-positive">
              <h4>Impacto Positivo</h4>
              <article>
                <strong>Inclusion financiera masiva</strong>
                <p>Llegando a sectores no bancarizados e integrando a millones al sistema formal.</p>
              </article>
              <article>
                <strong>Reemplazo del efectivo</strong>
                <p>Facilitando micro-transacciones digitales seguras en pequenos comercios.</p>
              </article>
              <article>
                <strong>Adopcion de bajo costo</strong>
                <p>Eliminando barreras con comisiones transparentes y registro simplificado.</p>
              </article>
            </div>
            <div className="pp-inline-stats">
              <div>
                <span>Clientes activos</span>
                <strong>5 millones</strong>
              </div>
              <div>
                <span>Comercios afiliados</span>
                <strong>420,000</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="pp-battle" id="contacto">
          <div className="pp-battle-main">
            <p className="pp-badge danger">TENDENCIA CRITICA</p>
            <h2 id="pp-battle-title">La Batalla por el Pago: Efectivo vs Digital</h2>
            <p>
            La pandemia cambio las preferencias en las transacciones. En 2021, el mayor numero se
                realizo por canales digitales con 285 millones, 65,1% mas que en 2020 y 161% mas frente a
                2019.
            </p>
            <div className="pp-chart-panel">
              <h3 className="pp-chart-title">Grafico: Evolucion del numero de transacciones por tipo de canal</h3>
              <p className="pp-chart-subtitle">En millones de transacciones</p>
              <TransactionsByChannelChart />
            </div>

            <div className="pp-comparison-content" id="tuti-tab">
              <section className="pp-dashboard-section">
                <div className="pp-grid2 pp-grid2-equal">
                  <div className="pp-chart-section-modern">
                    <h4 className="pp-chart-title">Comparativa de Ventas por Año</h4>
                    <div className="pp-chart-container">
                      <MultiLineChart
                        labels={FINANCIAL_YEARS}
                        series={SALES_SERIES}
                        minY={0}
                        maxY={3000}
                        ticks={[0, 500, 1000, 1500, 2000, 2500, 3000]}
                        yLabelFormatter={(value) => `${value}`}
                        pointFormatter={(value) => value.toFixed(0)}
                      />
                    </div>
                    <p className="pp-chart-explanation">
                      La linea violeta (Tuti) muestra un crecimiento explosivo desde 2019. Mientras Tia y
                      Favorita crecen de forma gradual, Tuti avanza a velocidad record y se acerca a los
                      niveles de facturacion de gigantes ya establecidos.
                    </p>
                  </div>

                  <div className="pp-chart-section-modern">
                    <h4 className="pp-chart-title">La Velocidad del Dinero (Eficiencia)</h4>
                    <div className="pp-chart-container">
                      <EfficiencyBarsChart />
                    </div>
                    <p className="pp-chart-explanation">
                      Este grafico mide que tan rapido una cadena convierte activos en ventas.{' '}
                      <strong>Tuti funciona como una maquina de velocidad</strong>: rota su base operativa
                      mas rapido y recupera liquidez para reponer mercaderia sin esperar al banco.
                    </p>
                  </div>
                </div>

                <div className="pp-chart-section-modern pp-margin-block">
                  <h4 className="pp-chart-title">El Camino a la Rentabilidad</h4>
                  <div className="pp-chart-container">
                    <MultiLineChart
                      labels={FINANCIAL_YEARS}
                      series={MARGIN_SERIES}
                      minY={-150}
                      maxY={12}
                      ticks={[-150, -120, -90, -60, -30, 0, 10]}
                      yLabelFormatter={(value) => `${value}%`}
                      pointFormatter={(value) => `${value.toFixed(1)}%`}
                    />
                  </div>
                  <p className="pp-chart-explanation">
                    Al inicio, la linea de Tuti se ubicaba muy abajo por una estrategia agresiva de
                    expansion. Lo relevante es su subida progresiva hasta cruzar a positivo en 2024.{' '}
                    <strong>El modelo dejo de quemar caja y entro en zona de rentabilidad.</strong>
                  </p>
                </div>

                <div className="pp-chart-section-modern pp-margin-block">
                  <h4 className="pp-chart-title">Gráfico de Áreas Apiladas (Cuota de Mercado por año)</h4>
                  <div className="pp-chart-container pp-chart-container-tall">
                    <StackedAreaShareChart labels={FINANCIAL_YEARS} layers={SHARE_LAYERS} />
                  </div>
                  <p className="pp-chart-explanation">
                    Si el gasto total en supermercados fuera un solo pastel, el area violeta muestra como
                    Tuti gana espacio cada anio. Lo que captura Tuti, lo dejan de capturar los
                    supermercados tradicionales.
                  </p>
                </div>
              </section>

              <div className="pp-dashboard-conclusion">
                <h3>La Paradoja de la Digitalizacion</h3>
                <section className="pp-final-conclusion">
                  <h4>5. Conclusión: El Límite del Efectivo</h4>
                  <article>
                    <strong>El Choque de Modelos.</strong> Existe una tensión estructural: Tuti prioriza
                    rentabilidad al ahorrar comisiones bancarias (1% a 5%), pero eso mantiene al 88% de los
                    hogares usando efectivo. En paralelo, billeteras como Deuna aceleran inclusión financiera
                    con tecnología de costo cero para comercio informal.
                  </article>
                  <article>
                    <strong>Impacto en la Digitalización Macro.</strong> Esta resistencia afecta la dimensión
                    de Pagos Electrónicos (PAY), frena el hábito digital diario y reduce trazabilidad
                    económica. En contraste, Deuna impulsa microtransacciones cotidianas (de $3 a $20) de
                    forma eficiente.
                  </article>
                  <article>
                    <strong>El Futuro Inevitable.</strong> El ciudadano ecuatoriano carga menos efectivo: el
                    retiro promedio en cajeros cayó de $112 a $88.90. Los modelos anclados al papel moneda
                    se acercan a un techo de crecimiento; pagos interoperables (como QR) ya son condición de
                    supervivencia e inclusión financiera.
                  </article>
                </section>
                <div className="pp-conclusion-grid">
                  <article className="pp-conclusion-card">
                    <h4 className="pp-conclusion-danger">1. La Trampa Digital</h4>
                    <p>
                      Para cadenas como <strong>Tia</strong>, aceptar pagos digitales mejora experiencia,
                      pero erosiona margen por comisiones y costos tecnologicos.
                    </p>
                  </article>
                  <article className="pp-conclusion-card">
                    <h4 className="pp-conclusion-purple">2. Efectivo es Rey</h4>
                    <p>
                      <strong>Tuti</strong> demuestra que velocidad de caja y liquidez inmediata pueden
                      imponerse sobre la conveniencia en segmentos sensibles al precio.
                    </p>
                  </article>
                  <article className="pp-conclusion-card">
                    <h4 className="pp-conclusion-neutral">3. Mercado Dividido</h4>
                    <p>
                      El mercado se polariza entre consumidores que pagan por comodidad digital y quienes
                      priorizan el menor precio posible aun con friccion en el medio de pago.
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>


        </section>
      </main>
      <GlobalFooter />
    </div>
  )
}

