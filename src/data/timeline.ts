// Timeline data separated for modularity. Mantener aquí los hitos cronológicos.
export type TimelineEvent = {
  date: string
  title: string
  description: string
  category: 'legal' | 'tech' | 'fintech'
  details?: string[]
}

// Datos rellenados según petición del usuario: eventos legales y hitos relevantes.
export const timelineData: Record<string, TimelineEvent[]> = {
  '2002': [
    {
      date: 'Abril',
      title: 'Ley de Comercio Electrónico',
      description:
        "Se aprueba la Ley de Comercio Electrónico, estableciendo el marco jurídico con el principio de 'equivalencia funcional', otorgando a la firma electrónica el mismo valor legal que la firma manuscrita.",
      category: 'legal',
    },
  ],
  '2008-2009': [
    {
      date: '2008-2009',
      title: 'Operatividad de la Firma Electrónica',
      description:
        'El Banco Central del Ecuador se acredita como la primera entidad de certificación oficial, permitiendo que la Ley de 2002 cobrara vida real.',
      details: [
        'Agosto 2009: Creación del MINTEL',
        'Mayo 2009: El SRI inicia la emisión de comprobantes electrónicos',
      ],
      category: 'legal',
    },
  ],
  '2022': [
    {
      date: 'Febrero',
      title: 'Ley de Defensa al Cliente Financiero',
      description:
        'Se aprueba la ley que obliga a las entidades financieras a disponer de canales electrónicos y físicos eficientes para reclamos.',
      category: 'legal',
    },
  ],
  '2023': [
    {
      date: 'Febrero',
      title: 'Ley de Transformación Digital y Audiovisual',
      description:
        'Normativa que ofrece incentivos tributarios para inversiones en el sector audiovisual y tecnológico. Facilita la constitución de empresas 100% digitales.',
      category: 'legal',
    },
  ],
  '2024': [
    {
      date: 'Septiembre',
      title: 'Norma de Medios y Sistemas de Pago',
      description:
        'Se emite la norma que regula los medios y sistemas de pago, aterrizando la Ley Fintech en reglas operativas.',
      category: 'legal',
    },
  ],
  '2025': [
    {
      date: '8 de abril',
      title: 'Agenda de Transformación Digital 2025-2030',
      description:
        'El MINTEL publica la Agenda orientada a reducir la brecha digital, fortalecer el sector público y promover una cultura digital.',
      category: 'legal',
    },
  ],
}

export const orderedYears: string[] = [
  '2002',
  '2008-2009',
  '2022',
  '2023',
  '2024',
  '2025',
]

export default timelineData
