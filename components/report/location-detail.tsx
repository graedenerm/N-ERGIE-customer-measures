"use client"

import { useState, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  MapPin,
  Zap,
  TrendingDown,
  Lightbulb,
  Wrench,
  FlaskConical,
  Activity,
} from "lucide-react"
import { locations, insights } from "@/data/company-data"
import { InsightList } from "./insight-list"
import { MeasureList } from "./measure-list"
import type { Measure } from "@/data/types"

type Tab = "insights" | "measures"

export function LocationDetail({
  locationId,
  measures,
  onBack,
}: {
  locationId: number
  measures: Measure[]
  onBack: () => void
}) {
  const [activeTab, setActiveTab] = useState<Tab>("insights")
  const [highlightInsightId, setHighlightInsightId] = useState<string | null>(null)
  const [highlightMeasureInsightId, setHighlightMeasureInsightId] = useState<string | null>(null)
  const [openMeasureForInsightId, setOpenMeasureForInsightId] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const location = locations.find((l) => l.id === locationId)

  if (!location) return null

  const locationInsights = insights.filter((ins) => ins.locationId === locationId)
  const locationMeasures = measures.filter((m) => m.locationId === locationId)

  const navigateToInsight = useCallback((insightId: string) => {
    setActiveTab("insights")
    setHighlightInsightId(insightId)
    setTimeout(() => {
      const el = document.getElementById(`insight-${insightId}`)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" })
      setTimeout(() => setHighlightInsightId(null), 2000)
    }, 100)
  }, [])

  const navigateToMeasures = useCallback((insightId: string) => {
    setActiveTab("measures")
    setHighlightMeasureInsightId(insightId)
    setTimeout(() => {
      const el = document.getElementById(`measure-group-${insightId}`)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" })
      setTimeout(() => setHighlightMeasureInsightId(null), 2000)
    }, 100)
  }, [])

  const openMeasureDetail = useCallback((insightId: string) => {
    setActiveTab("measures")
    setOpenMeasureForInsightId(insightId)
    setTimeout(() => {
      const el = document.getElementById(`measure-group-${insightId}`)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 100)
  }, [])

  const tabs: { id: Tab; label: string; icon: typeof Lightbulb; count: number }[] = [
    { id: "insights", label: "Insights", icon: Lightbulb, count: locationInsights.length },
    { id: "measures", label: "Ma\u00dfnahmen", icon: Wrench, count: locationMeasures.length },
  ]

  return (
    <div style={{ backgroundColor: "#F5F5F7" }}>
      {/* Location header */}
      <div style={{ backgroundColor: "#00095B" }}>
        <div className="mx-auto max-w-screen-xl px-6 py-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={onBack}
              className="mb-4 flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: "#AEAEAE" }}
            >
              <ArrowLeft className="size-3.5" />
              {"Zur\u00fcck zur \u00dcbersicht"}
            </button>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="flex size-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "rgba(26,47,238,0.15)" }}
                  >
                    <MapPin className="size-5" style={{ color: "#E2EC2B" }} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
                      {location.name}
                    </h1>
                    <div className="flex items-center gap-2">
                      {location.isPilot && (
                        <span
                          className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                          style={{ backgroundColor: "rgba(226,236,43,0.15)", color: "#E2EC2B" }}
                        >
                          <FlaskConical className="size-2.5" />
                          Pilotstandort
                        </span>
                      )}
                      {location.energyManager && (
                        <span className="text-xs" style={{ color: "#AEAEAE" }}>
                          Energiemanager: {location.energyManager}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="rounded-lg border px-4 py-2.5"
                style={{ backgroundColor: "rgba(5,150,105,0.1)", borderColor: "rgba(5,150,105,0.2)" }}
              >
                <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "#059669" }}>
                  Gesamteinsparpotenzial
                </p>
                <p className="text-xl font-bold font-mono" style={{ color: "#FFFFFF" }}>
                  {location.totalSavings}
                </p>
                <p className="text-xs" style={{ color: "#AEAEAE" }}>
                  {location.totalSavingsKwh}
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-5">
              {[
                { label: "Jahresverbrauch", value: location.annualConsumption, icon: Zap },
                { label: "Mittlere Last", value: location.meanLoad, icon: Activity },
                { label: "Spitzenlast", value: location.peakLoad, icon: TrendingDown },
                { label: "Insights", value: `${locationInsights.length}`, icon: Lightbulb },
                { label: "Ma\u00dfnahmen", value: `${locationMeasures.length}`, icon: Wrench },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="flex items-center gap-2 rounded-lg border px-3 py-2"
                    style={{ backgroundColor: "rgba(13,17,102,0.5)", borderColor: "rgba(26,47,238,0.15)" }}
                  >
                    <Icon className="size-3" style={{ color: "#E2EC2B" }} />
                    <div>
                      <p className="text-[9px] font-medium uppercase tracking-wider" style={{ color: "#AEAEAE" }}>
                        {stat.label}
                      </p>
                      <p className="text-sm font-bold font-mono" style={{ color: "#FFFFFF" }}>
                        {stat.value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs + content */}
      <div ref={contentRef} className="mx-auto max-w-screen-xl px-6 py-8 md:px-12">
        <div className="mb-6 flex gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors"
                style={{
                  backgroundColor: isActive ? "#00095B" : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "#00095B",
                  borderColor: isActive ? "#00095B" : "#D4D4D4",
                }}
              >
                <Icon className="size-4" />
                {tab.label}
                <span
                  className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                  style={{
                    backgroundColor: isActive ? "rgba(226,236,43,0.2)" : "rgba(0,0,0,0.05)",
                    color: isActive ? "#E2EC2B" : "#737373",
                  }}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "insights" ? (
            <InsightList
              locationId={locationId}
              measures={measures}
              highlightId={highlightInsightId}
              onNavigateToMeasures={navigateToMeasures}
              onOpenMeasure={openMeasureDetail}
            />
          ) : (
            <MeasureList
              locationId={locationId}
              measures={measures}
              highlightInsightId={highlightMeasureInsightId}
              autoOpenInsightId={openMeasureForInsightId}
              onAutoOpenConsumed={() => setOpenMeasureForInsightId(null)}
              onNavigateToInsight={navigateToInsight}
            />
          )}
        </motion.div>
      </div>
    </div>
  )
}
