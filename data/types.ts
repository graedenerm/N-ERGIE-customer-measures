export interface Location {
  id: number
  name: string
  city: string
  annualConsumption: string
  meanLoad: string
  peakLoad: string
  totalSavings: string
  totalSavingsKwh: string
  seasonal: string
  isPilot?: boolean
  energyManager?: string
  insightCount: number
  measureCount: number
}

export interface Insight {
  id: string
  locationId: number
  title: string
  category: "structural" | "anomaly"
  season: string
  savingsEur: string
  savingsKwh: string
  confidence: number
  urgency?: number
  summary: string
  whyNonObvious: string
  supportingContext: string
}

export interface Measure {
  locationId: number
  insightId: string
  title: string
  shortDescription: string
  description: string
  yearlySavingsRangeFrom: number
  yearlySavingsRangeTo: number
  investmentRangeFrom: number
  investmentRangeTo: number
  unit: string
  yearlySavingsEnergyRangeFrom: number
  yearlySavingsEnergyRangeTo: number
  evidences: string[]
  amortisationPeriodInMonths: number
  reasoning: string
  confidence: number
  category: string
  investmentType: string
  effortLevel: string
}
