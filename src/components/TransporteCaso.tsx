import GlobalNav from './GlobalNav';
import GlobalFooter from './GlobalFooter';
import './transporte.css';

interface TransporteCasoProps {
  onGoHome: () => void;
  onOpenDashboard: () => void;
}

interface IconProps {
  size?: number;
  className?: string;
}

function FallbackIcon({ size = 16, className, label }: IconProps & { label: string }) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        border: '1px solid currentColor',
        fontSize: Math.max(9, Math.floor(size * 0.5)),
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {label}
    </span>
  );
}

const CreditCard = (props: IconProps) => <FallbackIcon {...props} label="CC" />;
const Users = (props: IconProps) => <FallbackIcon {...props} label="US" />;
const Zap = (props: IconProps) => <FallbackIcon {...props} label="Z" />;
const ShieldCheck = (props: IconProps) => <FallbackIcon {...props} label="S" />;
const FileText = (props: IconProps) => <FallbackIcon {...props} label="F" />;
const Info = (props: IconProps) => <FallbackIcon {...props} label="I" />;
const HeartHandshake = (props: IconProps) => <FallbackIcon {...props} label="H" />;

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
                La implementación de validadores electrónicos elimina los cuellos de botella generados por el pago con monedas, permitiendo un flujo de pasajeros más rápido y eficiente, especialmente en horas pico.
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
  <span className="section-label-v2"><Info size={16} /> El Impacto</span>
  <h3>Lo positivo y los beneficios</h3>
  <p className="metric-caption-v2">
    <strong>• Experiencia de Viaje:</strong> Abordaje más rápido y sin filas, eliminando el retraso que genera el pago con monedas sueltas.
    <br /><br />
    <strong>• Conectividad Total:</strong> Comodidad absoluta al integrar el pasaje del Trolebús y el Metro mediante una sola tarjeta o código QR.
    <br /><br />
    <strong>• Beneficios Estratégicos:</strong> Mayor seguridad y reducción de costos operativos para la ciudad al minimizar el manejo de dinero en efectivo en las estaciones.
  </p>
</div>

            <div className="metric-card-v2 accent-success">
              <span className="section-label-v2"><HeartHandshake size={16} /> La Afectación</span>
              <h3>La brecha y los perjudicados</h3>
              <p className="metric-caption-v2">
    <strong>• El Reto de la Brecha:</strong> El uso obligatorio de herramientas digitales genera estrés tecnológico y limita la autonomía de movilidad en los adultos mayores.
    <br /><br />
    <strong>• Inclusión Humana:</strong> Un sistema 100% digital excluye a quienes dependen del efectivo (estudiantes y sectores vulnerables), haciendo vital conservar taquillas físicas para garantizar sus tarifas preferenciales.
  </p>
</div>
          </aside>

          {/* RIGHT: imagen + beneficios */}
          <section className="main-story-v2">
            <div className="metro-image-container">
              <img
                src="images/Transporte.png"
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
