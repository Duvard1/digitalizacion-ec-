export type TimelineYear = 2018 | 2020 | 2022 | 2024 | 2026

export const DASHBOARD_YEARS: TimelineYear[] = [2018, 2020, 2022, 2024, 2026]

export type TrendDirection = 'up' | 'down' | 'neutral'

export type MetricTrend = {
  value: string
  direction: TrendDirection
}

export type GovMetric = {
  value: string
  trend: MetricTrend
  caption: string
  pill: string
  osi: string
  tii: string
  hci: string
}

export type AccMetric = {
  pill: string
  ih: string
  ui: string
  sp: string
  ai: string
}

export type EcoMetric = {
  value: string
  trend: MetricTrend
  caption: string
}

export type PayMetric = {
  value: string
  trend: MetricTrend
  caption: string
  qrAdoption: string
  interoperability: string
}

export type DashboardYearData = {
  gov: GovMetric
  acc: AccMetric
  eco: EcoMetric
  pay: PayMetric
}

export type DashboardDataset = Record<TimelineYear, DashboardYearData>

export const dashboardDataset: DashboardDataset = {
  2018: {
    gov: {
      value: '62%',
      trend: { value: '+1.1%', direction: 'up' },
      caption: 'Línea base EGDI',
      pill: 'EGDI',
      osi: '58%',
      tii: '63%',
      hci: '65%',
    },
    acc: {
      pill: 'COBERTURA 4G',
      ih: '52%',
      ui: '59%',
      sp: '54%',
      ai: '42%',
    },
    eco: {
      value: '$1.9B',
      trend: { value: '+6.4%', direction: 'up' },
      caption: 'Volumen transaccional',
    },
    pay: {
      value: '21%',
      trend: { value: '+4.3%', direction: 'up' },
      caption: 'Penetración de pagos digitales',
      qrAdoption: '9%',
      interoperability: 'Low',
    },
  },
  2020: {
    gov: {
      value: '66%',
      trend: { value: '+2.3%', direction: 'up' },
      caption: 'Crecimiento EGDI',
      pill: 'EGDI',
      osi: '62%',
      tii: '67%',
      hci: '69%',
    },
    acc: {
      pill: 'COBERTURA 4G',
      ih: '58%',
      ui: '64%',
      sp: '60%',
      ai: '38%',
    },
    eco: {
      value: '$2.5B',
      trend: { value: '+9.8%', direction: 'up' },
      caption: 'Volumen transaccional',
    },
    pay: {
      value: '29%',
      trend: { value: '+6.1%', direction: 'up' },
      caption: 'Penetración de pagos digitales',
      qrAdoption: '15%',
      interoperability: 'Medium',
    },
  },
  2022: {
    gov: {
      value: '71%',
      trend: { value: '+3.4%', direction: 'up' },
      caption: 'Aceleración EGDI',
      pill: 'EGDI',
      osi: '68%',
      tii: '72%',
      hci: '73%',
    },
    acc: {
      pill: 'COBERTURA 4G',
      ih: '66%',
      ui: '72%',
      sp: '68%',
      ai: '31%',
    },
    eco: {
      value: '$3.3B',
      trend: { value: '+12.2%', direction: 'up' },
      caption: 'Volumen transaccional',
    },
    pay: {
      value: '38%',
      trend: { value: '+8.4%', direction: 'up' },
      caption: 'Penetración de pagos digitales',
      qrAdoption: '24%',
      interoperability: 'Medium',
    },
  },
  2024: {
    gov: {
      value: '74%',
      trend: { value: '+1.8%', direction: 'up' },
      caption: 'Consolidación EGDI',
      pill: 'EGDI',
      osi: '72%',
      tii: '75%',
      hci: '76%',
    },
    acc: {
      pill: 'COBERTURA 4G',
      ih: '73%',
      ui: '78%',
      sp: '75%',
      ai: '25%',
    },
    eco: {
      value: '$3.9B',
      trend: { value: '+10.5%', direction: 'up' },
      caption: 'Volumen transaccional',
    },
    pay: {
      value: '47%',
      trend: { value: '+7.6%', direction: 'up' },
      caption: 'Penetración de pagos digitales',
      qrAdoption: '35%',
      interoperability: 'High',
    },
  },
  2026: {
    gov: {
      value: '79%',
      trend: { value: '+2.1%', direction: 'up' },
      caption: 'Proyección EGDI',
      pill: 'EGDI',
      osi: '77%',
      tii: '80%',
      hci: '81%',
    },
    acc: {
      pill: 'COBERTURA 4G',
      ih: '79%',
      ui: '84%',
      sp: '82%',
      ai: '19%',
    },
    eco: {
      value: '$4.6B',
      trend: { value: '+11.4%', direction: 'up' },
      caption: 'Volumen transaccional',
    },
    pay: {
      value: '56%',
      trend: { value: '+9.2%', direction: 'up' },
      caption: 'Penetración de pagos digitales',
      qrAdoption: '45%',
      interoperability: 'High',
    },
  },
}
