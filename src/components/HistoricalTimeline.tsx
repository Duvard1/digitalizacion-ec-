import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'

type TimelineEvent = {
  id: string
  anio: string
  fecha: string
  titulo: string
  descripcion: string
  categoria: string
}

const CSV_REGEX = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/

const normalizeCategory = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()

const getCategoryKey = (rawCategory: string) => {
  const normalized = normalizeCategory(rawCategory)

  if (normalized.includes('legal')) return 'legal'
  if (normalized.includes('fintech') || normalized.includes('financiera')) return 'fintech'
  return 'tecnologia'
}

const parseTimelineCsv = (csvText: string): TimelineEvent[] => {
  const lines = csvText.split(/\r?\n/).filter((line) => line.trim() !== '')
  const events: TimelineEvent[] = []

  for (let i = 1; i < lines.length; i += 1) {
    const values = lines[i].split(CSV_REGEX).map((val) => val.replace(/^"|"$/g, '').trim())
    if (values.length < 6) continue

    events.push({
      id: values[0],
      anio: values[1],
      fecha: values[2],
      titulo: values[3],
      descripcion: values[4],
      categoria: values[5],
    })
  }

  return events
}

type HistoricalTimelineProps = {
  onOpenLotaipPage: () => void
}

export default function HistoricalTimeline({ onOpenLotaipPage }: HistoricalTimelineProps) {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const dragStateRef = useRef<{ startX: number; scrollLeft: number }>({ startX: 0, scrollLeft: 0 })

  useEffect(() => {
    const loadData = async () => {
      const csvUrl = `${import.meta.env.BASE_URL}data/linea_tiempo.csv`
      try {
        const response = await fetch(csvUrl)
        if (!response.ok) {
          throw new Error(`No se pudo cargar CSV (${response.status})`)
        }

        const csvText = await response.text()
        setEvents(parseTimelineCsv(csvText))
        setError(null)
      } catch (loadError) {
        console.error(`Error al cargar ${csvUrl}`, loadError)
        setError('Error al cargar el archivo linea_tiempo.csv')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return
    setIsDragging(true)
    trackRef.current.setPointerCapture(event.pointerId)
    dragStateRef.current = {
      startX: event.clientX - trackRef.current.offsetLeft,
      scrollLeft: trackRef.current.scrollLeft,
    }
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return

    event.preventDefault()
    const x = event.clientX - trackRef.current.offsetLeft
    const walk = (x - dragStateRef.current.startX) * 2
    trackRef.current.scrollLeft = dragStateRef.current.scrollLeft - walk
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return
    if (trackRef.current.hasPointerCapture(event.pointerId)) {
      trackRef.current.releasePointerCapture(event.pointerId)
    }
    setIsDragging(false)
  }

  const legend = useMemo(
    () => [
      { key: 'tecnologia', label: 'Tecnología', className: 'dot-tech' },
      { key: 'legal', label: 'Legal', className: 'dot-legal' },
      { key: 'fintech', label: 'Fintech', className: 'dot-fintech' },
    ],
    [],
  )

  return (
    <section className="timeline-v2-section" id="timeline-section">
      <div className="timeline-v2-container">
        <div className="timeline-v2-header">
          <div>
            <h2>Hitos de la Digitalización</h2>
            <p>Evolución histórica</p>
          </div>
          <div className="timeline-v2-legend">
            {legend.map((item) => (
              <span key={item.key} className="timeline-v2-legend-item">
                <span className={`timeline-v2-legend-dot ${item.className}`} />
                {item.label}
              </span>
            ))}
          </div>
        </div>





        <div
          id="timeline-canvas"
          ref={trackRef}
          className={`timeline-v2-canvas${isDragging ? ' dragging' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {loading && <div className="timeline-v2-message">Cargando datos históricos...</div>}
          {!loading && error && <div className="timeline-v2-message error">{error}</div>}
          {!loading &&
            !error &&
            events.map((event) => {
              const categoryKey = getCategoryKey(event.categoria)
              const dateLabel = event.fecha ? `${event.anio} - ${event.fecha}` : event.anio

              return (
                <article key={`${event.id}-${event.titulo}`} className="timeline-v2-item">
                  <div className="timeline-v2-track">
                    <div className={`timeline-v2-point ${categoryKey}`} />
                    <span className="timeline-v2-date">{dateLabel}</span>
                    <h3>{event.titulo}</h3>
                    <p>{event.descripcion}</p>
                    <span className={`timeline-v2-chip ${categoryKey}`}>
                      {event.categoria || 'Tecnología'}
                    </span>
                  </div>
                </article>
              )
            })}
        </div>

        <div className="timeline-lotaip-wrapper">
          <article className="timeline-lotaip-card" aria-label="LOTAIP y Digitalizacion del Estado Ecuatoriano">
            <h3>LOTAIP y Digitalizaci&oacute;n del Estado Ecuatoriano</h3>
            <p className="timeline-lotaip-subtitle">
              Ley Org&aacute;nica de Transparencia y Acceso a la Informaci&oacute;n P&uacute;blica
            </p>
            <p className="timeline-lotaip-description">
              Garantizando el derecho ciudadano a la informaci&oacute;n y
              <br />
              forzando la modernizaci&oacute;n del Estado hacia una gesti&oacute;n m&aacute;s
              <br />
              transparente y eficiente.
            </p>
            <button type="button" className="timeline-lotaip-button" onClick={onOpenLotaipPage}>
              Ir a la p&aacute;gina 
            </button>
          </article>
        </div>

      </div>
    </section>
  )
}
