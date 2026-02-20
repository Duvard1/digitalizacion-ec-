import { CreditCard, Users, Zap, ShieldCheck, FileText, Info, HeartHandshake } from 'lucide-react';
import GlobalNav from './GlobalNav';
import GlobalFooter from './GlobalFooter';
import './transporte.css';

interface TransporteCasoProps {
  onGoHome: () => void;
  onOpenDashboard: () => void;
}

export function TransporteCaso({ onGoHome, onOpenDashboard }: TransporteCasoProps) {
  return (
    <div className="page case-detail-page">
      <GlobalNav
        onGoHome={onGoHome}
        onGoDashboard={onOpenDashboard}
        onGoCase1={() => {}}
        onGoCase2={() => {}}
      />

      <main className="case-content-v2">

        {/* ── HEADER ── */}
        <header className="story-header-v2">
          <span className="header-eyebrow">Sistema Integrado SIR · Quito</span>
          <h1 className="case-title-v2">
            Trolebús & Ecovía
            <span className="text-gradient"> Impacto Social de la Digitalización</span>
          </h1>
          <p className="case-subtitle-v2">Priorizando a las personas en la modernización de Quito</p>
        </header>

        {/* ── GRID PRINCIPAL ── */}
        <div className="case-grid-v2">

          {/* LEFT: tarjetas de impacto */}
          <aside className="metrics-column-v2">
            <div className="metric-card-v2 accent-zap">
              <span className="section-label-v2"><Zap size={16} /> Experiencia de Viaje</span>
              <h3>Infraestructura para el Tiempo</h3>
              <p className="metric-caption-v2">
                Validadores inteligentes reducen la espera en paradas un <strong>15 %</strong> mediante
                accesos 100 % electrónicos, devolviendo tiempo valioso al ciudadano.
              </p>
            </div>

            <div className="metric-card-v2 accent-blue">
              <span className="section-label-v2"><CreditCard size={16} /> Conectividad Total</span>
              <h3>Un solo pasaje, una sola ciudad</h3>
              <p className="metric-caption-v2">
                Tarjeta Ciudad o QR: el usuario integra su viaje entre el Metro y el transporte en
                superficie sin necesidad de portar efectivo.
              </p>
            </div>

            <div className="metric-card-v2 accent-warning">
              <span className="section-label-v2"><Info size={16} /> Reto de la Brecha</span>
              <h3>Protección al Adulto Mayor</h3>
              <p className="metric-caption-v2">
                La modernización incluye medidas para eliminar el estrés tecnológico y garantizar
                el derecho a la movilidad de quienes enfrentan barreras digitales.
              </p>
            </div>

            <div className="metric-card-v2 accent-success">
              <span className="section-label-v2"><HeartHandshake size={16} /> Inclusión Humana</span>
              <h3>Garantía de Acceso Social</h3>
              <p className="metric-caption-v2">
                Taquillas humanas y recargas de barrio aseguran que las tarifas preferenciales lleguen
                a quienes más lo necesitan, sin exclusión tecnológica.
              </p>
            </div>
          </aside>

          {/* RIGHT: imagen + beneficios */}
          <section className="main-story-v2">
            <div className="metro-image-container">
              <img
                src="/images/Transporte.png"
                alt="Digitalización Transporte Quito"
                className="metro-image"
              />
              <div className="image-overlay-v2">
                <div className="overlay-badge">Sistema Integrado SIR</div>
              </div>
            </div>

            <div className="impact-check-list-v2">
              <h3>Beneficios Estratégicos</h3>

              <div className="check-item-v2">
                <ShieldCheck size={24} className="icon-neon" />
                <div>
                  <strong>Eficiencia Operativa</strong>
                  <p>Reducción drástica de costos logísticos en toda la red.</p>
                </div>
              </div>

              <div className="check-item-v2">
                <ShieldCheck size={24} className="icon-neon" />
                <div>
                  <strong>Seguridad Bancaria</strong>
                  <p>Integración de recaudo digital con el Metro de Quito.</p>
                </div>
              </div>

              <div className="check-item-v2">
                <Users size={24} className="icon-neon" />
                <div>
                  <strong>Cobertura Ciudadana</strong>
                  <p>Más de 800 000 usuarios beneficiados diariamente.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── FUENTES ── */}
        <section className="case-sources-v2">
          <FileText size={18} className="text-gradient" />
          <p>
            Datos basados en la <em>Encuesta de Percepción de Calidad</em> y el{' '}
            <em>Plan de Inclusión</em> de la Secretaría de Movilidad DMQ.
          </p>
        </section>

      </main>
      <GlobalFooter />
    </div>
  );
}
