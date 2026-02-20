type GlobalNavProps = {
  onGoHome: () => void
  onGoDashboard: () => void
  onGoLotaip: () => void
  onGoCase1: () => void
  onGoCase2: () => void
  className?: string
}

export default function GlobalNav({
  onGoHome,
  onGoLotaip,
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
        <a
          className="nav-link-button"
          href="https://claude.ai/public/artifacts/5b8835de-addb-4944-b64b-b90ce9e67a48"
          target="_blank"
        >
          Indicadores
        </a>
        <button type="button" className="nav-link-button" onClick={onGoLotaip}>
          LOTAIP
        </button>
        <button type="button" className="nav-link-button" onClick={onGoCase1}>
          Caso 1: Pagos
        </button>
        <button type="button" className="nav-link-button" onClick={onGoCase2}>
          Caso 2: Transporte
        </button>
        <a
          className="nav-link-button"
          href="https://uceedu-my.sharepoint.com/:f:/g/personal/bcmalla_uce_edu_ec/IgD2bm69Iqh5SYGNmVnz1tV8ASvx1mbvIaJ0sMG2BOvrTL0?e=M2VKGg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fuentes
        </a>
      </nav>
    </header>
  )
}
