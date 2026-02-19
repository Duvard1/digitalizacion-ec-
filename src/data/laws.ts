// Leyes y metadatos usados por la aplicación
// Exporta un arreglo `laws` con la metadata mínima para la vista de landing/timeline.

export type Law = {
  year: string
  shortTitle: string
  title: string
  entity: string
  summary: string
  focus: string
}

export const laws: Law[] = [
  {
    year: '2002',
    shortTitle: 'Ley de Comercio Electrónico',
    title: 'Ley de Comercio Electrónico, Firmas Electrónicas y Mensajes de Datos',
    entity: 'Congreso Nacional del Ecuador',
    summary:
      "Se aprueba la Ley de Comercio Electrónico, estableciendo el marco jurídico con el principio de 'equivalencia funcional', otorgando a la firma electrónica el mismo valor legal que la firma manuscrita.",
    focus:
      'Reconocimiento legal de la firma electrónica, validez probatoria de los mensajes de datos y regulación básica del comercio electrónico.',
  },
  {
    year: '2008-2009',
    shortTitle: 'Operatividad Firma Electrónica',
    title: 'Operatividad de la Firma Electrónica y certificación',
    entity: 'Banco Central / SRI / MINTEL',
    summary:
      'Se consolida la operatividad de la firma electrónica en el país: el Banco Central se acredita como entidad de certificación y el SRI comienza la emisión de comprobantes electrónicos.',
    focus:
      'Implementación técnica de la infraestructura de certificación y adopción de comprobantes electrónicos por entidades públicas y privadas. (Agosto 2009: Creación del MINTEL; Mayo 2009: SRI inicia emisión de comprobantes electrónicos)',
  },
  {
    year: '2004',
    shortTitle: 'Ley de Transparencia',
    title: 'Ley de Transparencia y Acceso a la Información Pública',
    entity: 'Asamblea Nacional del Ecuador',
    summary:
      'Regula el derecho de acceso a la información pública y establece obligaciones de transparencia y publicación de datos por parte de las instituciones del Estado.',
    focus:
      'Mecanismos de acceso a la información, plazos de respuesta, excepciones por seguridad o privacidad y obligaciones de publicación activa.',
  },
  {
    year: '2010',
    shortTitle: 'Gobierno Electrónico',
    title: 'Política Nacional de Gobierno Electrónico',
    entity: 'Gobierno del Ecuador',
    summary:
      'Define lineamientos para la prestación de servicios públicos en línea y la modernización de la administración pública mediante TIC.',
    focus:
      'Servicios en línea, ventanilla única, interoperabilidad inicial entre instituciones y mejora de la experiencia ciudadana.',
  },
  {
    year: '2016',
    shortTitle: 'Código Ingenios',
    title: 'Código Orgánico de la Economía Social de los Conocimientos (Código Ingenios)',
    entity: 'Asamblea Nacional del Ecuador',
    summary:
      'Se expide el Código Orgánico de la Economía Social de los Conocimientos. Priorizó el uso de tecnologías libres en el Estado y declaró el acceso a internet como un servicio básico.',
    focus:
      'Datos abiertos, innovación, transferencia tecnológica y uso estratégico de los conocimientos y tecnologías.',
  },
  {
    year: '2021',
    shortTitle: 'Protección de Datos',
    title: 'Ley Orgánica de Protección de Datos Personales',
    entity: 'Asamblea Nacional del Ecuador',
    summary:
      "Tras filtraciones masivas de datos (caso Novaestrat), se aprueba esta ley que introduce derechos como el 'derecho al olvido' y la 'portabilidad de datos'.",
    focus:
      'Derechos de los titulares, bases de licitud para el tratamiento de datos, responsabilidad de los responsables y encargados, y creación de la autoridad de control.',
  },
  {
    year: '2022',
    shortTitle: 'Ley Fintech',
    title:
      'Ley Orgánica para el Desarrollo, Regulación y Control de los Servicios Financieros Tecnológicos (Ley Fintech)',
    entity: 'Asamblea Nacional del Ecuador',
    summary:
      'Regula los modelos de negocio Fintech y promueve la innovación financiera bajo principios de seguridad, inclusión y estabilidad del sistema.',
    focus:
      'Sandboxes regulatorios, proveedores de servicios de pago, crowdfunding, open banking y protección de usuarios financieros digitales.',
  },
  {
    year: '2022',
    shortTitle: 'Defensa al Cliente Financiero',
    title: 'Ley de Defensa al Cliente Financiero',
    entity: 'Asamblea Nacional del Ecuador',
    summary:
      'Establece derechos y mecanismos para la protección de las personas usuarias de servicios financieros, incluyendo canales de atención y procedimientos de reclamo electrónicos y presenciales.',
    focus:
      'Obligatoriedad de canales electrónicos y físicos eficientes para reclamos, transparencia en comisiones y obligaciones de información al cliente.',
  },
  {
    year: '2023',
    shortTitle: 'Transformación Digital',
    title: 'Ley / Agenda de Transformación Digital y Audiovisual',
    entity: 'Gobierno del Ecuador',
    summary:
      'Normativa que ofrece incentivos tributarios para inversiones en el sector audiovisual y tecnológico, y facilita la constitución y operación de empresas 100% digitales.',
    focus:
      'Incentivos, infraestructura, y marcos regulatorios para el crecimiento de la industria digital y audiovisual.',
  },
  {
    year: '2024',
    shortTitle: 'Norma Medios y Sistemas de Pago',
    title: 'Norma de Medios y Sistemas de Pago',
    entity: 'Superintendencia / Banca',
    summary:
      'Se emite la norma que regula los medios y sistemas de pago, operacionalizando las disposiciones de la Ley Fintech con reglas prácticas para interoperabilidad y seguridad.',
    focus:
      'Reglas operativas para medios de pago, interoperabilidad entre proveedores y requisitos de seguridad y prevención de fraude.',
  },
  {
    year: '2025',
    shortTitle: 'Agenda 2025-2030',
    title: 'Agenda de Transformación Digital 2025-2030',
    entity: 'MINTEL',
    summary:
      'El MINTEL publica la Agenda orientada a reducir la brecha digital, fortalecer el sector público y promover una cultura digital, con objetivos y metas para 2025-2030.',
    focus:
      'Políticas públicas para conectividad, capacitación digital, identidad digital e impulso a servicios públicos digitales.',
  },
]

export default laws
