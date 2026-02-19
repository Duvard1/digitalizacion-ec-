import { useState } from 'react'
import laws, { type Law } from '../data/laws'
import timelineDataModule, { orderedYears } from '../data/timeline'

// LandingPage: interfaz principal de la aplicación.
// Está separada para mantener `App.tsx` minimal y facilitar pruebas.
export default function LandingPage({ onOpenDashboard }: { onOpenDashboard: () => void }) {
  const [selectedLaw, setSelectedLaw] = useState<Law | null>(null)
  const [selectedTimelineYear, setSelectedTimelineYear] = useState<string | null>(null)
  const [startIndex, setStartIndex] = useState(0)

  const openLawModal = (law: Law) => setSelectedLaw(law)
  const closeLawModal = () => setSelectedLaw(null)
  const openTimelineModal = (year: string) => setSelectedTimelineYear(year)
  const closeTimelineModal = () => setSelectedTimelineYear(null)

  const showPrevious = () => setStartIndex((prev) => (prev - 1 + laws.length) % laws.length)
  const showNext = () => setStartIndex((prev) => (prev + 1) % laws.length)

  const visibleLaws = Array.from({ length: 5 }).map((_, idx) => laws[(startIndex + idx) % laws.length])

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-left">
          <div className="logo-mark">IDE-EC</div>
        </div>
        <nav className="nav-links">
          <a href="#">Inicio</a>
          <a href="#">Dashboard</a>
          <a href="#">Metodología</a>
          <a href="#">Fuentes</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-badge">POSICIÓN GLOBAL: #67</div>
          <div className="hero-main">
            <div className="hero-number">69.6%</div>
            <div className="hero-text">
              <h1>Monitoreando la transición hacia una economía digital (2022-2026)</h1>
              <p>
                Analizamos el progreso de la infraestructura, capital humano y adopción tecnológica en el
                sector productivo del Ecuador.
              </p>
              <div className="hero-actions">
                <button className="btn-primary" onClick={onOpenDashboard}>
                  Ver Dashboard →
                </button>
                <button className="btn-secondary">Leer Metodología</button>
              </div>
            </div>
          </div>
        </section>

        <section className="timeline-section">
          <div className="timeline-header">
            <div>
              <h2>Evolución Normativa</h2>
              <p>Hitos clave en la legislación digital ecuatoriana</p>
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
                key={law.year}
                type="button"
                className={`timeline-item as-button${law.shortTitle === 'Ley Fintech' ? ' active' : ''}`}
                onClick={() =>
                  openLawModal({
                    year: law.year,
                    shortTitle: law.shortTitle,
                    title: law.title,
                    entity: law.entity,
                    summary: law.summary,
                    focus: law.focus,
                  } as Law)
                }
              >
                <div className="timeline-icon">{law.year}</div>
                <p className="timeline-title">{law.shortTitle}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="detailed-timeline-section">
          <div className="detailed-timeline-container">
            <div className="detailed-timeline-scroll">
              <div className="detailed-timeline-flex">
                {orderedYears.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => openTimelineModal(year)}
                    className="detailed-timeline-button"
                  >
                    <span className="detailed-timeline-year">{year}</span>
                    <span className="detailed-timeline-dots">
                      {['legal', 'tech', 'fintech'].map(
                        (category) =>
                          (timelineDataModule[year] || []).some((e) => e.category === category) && (
                            <span
                              key={category}
                              className={`detailed-timeline-dot ${
                                category === 'legal' ? 'dot-legal' : category === 'tech' ? 'dot-tech' : 'dot-fintech'
                              }`}
                            />
                          ),
                      )}
                    </span>
                    <span className="detailed-timeline-hover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-left">IDE-EC - Universidad Central del Ecuador</div>
        <div className="footer-left">Legislación Informática</div>
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
                ✕
              </button>
            </header>
            <h3 className="law-modal-title">{selectedLaw.title}</h3>
            <p className="law-modal-entity">
              <strong>Ente emisor:</strong> {selectedLaw.entity}
            </p>
            <p className="law-modal-summary">{selectedLaw.summary}</p>
            <div className="law-modal-focus">
              <h4>¿Qué regula?</h4>
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

      {selectedTimelineYear && timelineDataModule[selectedTimelineYear] && (
        <div className="timeline-modal-overlay" onClick={closeTimelineModal}>
          <div
            className="timeline-modal"
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            <header className="timeline-modal-header">
              <h3 className="timeline-modal-year">{selectedTimelineYear}</h3>
              <button type="button" className="timeline-modal-close" onClick={closeTimelineModal}>
                ✕
              </button>
            </header>
            <div className="timeline-modal-content">
              {timelineDataModule[selectedTimelineYear].map((event, idx) => (
                <div key={idx} className="timeline-modal-event">
                  <div className="timeline-modal-event-header">
                    <span className={`timeline-modal-category ${event.category}`}>
                      {event.category === 'legal' ? 'Legal' : event.category === 'tech' ? 'Tech' : 'Fintech'}
                    </span>
                    <span className="timeline-modal-date">{event.date}</span>
                  </div>
                  <h4 className="timeline-modal-event-title">{event.title}</h4>
                  <p className="timeline-modal-event-description">{event.description}</p>
                  {event.details && (
                    <ul className="timeline-modal-event-details">
                      {event.details.map((detail, detailIdx) => (
                        <li key={detailIdx}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <footer className="timeline-modal-footer">
              <button type="button" className="timeline-modal-secondary" onClick={closeTimelineModal}>
                Cerrar
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}
