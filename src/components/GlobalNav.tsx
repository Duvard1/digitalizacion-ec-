type GlobalNavProps = {
  onGoHome: () => void
  onGoDashboard: () => void
  onGoCase1: () => void
  onGoCase2: () => void
  className?: string
}

export default function GlobalNav({
  onGoHome,
  onGoDashboard,
  onGoCase1,
  onGoCase2,
  className = '',
}: GlobalNavProps) {
  return (
    <header className={`topbar ${className}`.trim()}>
      <div className="topbar-left">
        <div className="logo-mark">IDE-EC</div>
      </div>
      <nav className="nav-links" aria-label="Navegación principal">
        <button type="button" className="nav-link-button" onClick={onGoHome}>
          Inicio
        </button>
        <button type="button" className="nav-link-button" onClick={onGoDashboard}>
          Dashboards
        </button>
        <button type="button" className="nav-link-button" onClick={onGoCase1}>
          Caso 1: Pagos
        </button>
        <button type="button" className="nav-link-button" onClick={onGoCase2}>
          Caso 2: Transporte
        </button>
        <button type="button" className="nav-link-button nav-link-button-muted" disabled>
          Fuentes (pendiente)
        </button>
      </nav>
    </header>
  )
}
