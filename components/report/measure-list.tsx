"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Wrench,
  Euro,
  Clock,
  Zap,
  ChevronRight,
  X,
  CheckCircle2,
  BarChart3,
  FileText,
  ArrowUpDown,
  Lightbulb,
  ArrowRight,
} from "lucide-react"
import { insights, locations } from "@/data/company-data"
import type { Measure } from "@/data/types"
import { FeedbackButtons } from "./feedback-buttons"

function effortLabel(level: string) {
  switch (level) {
    case "LOW": return { label: "Niedrig", color: "#059669", bg: "rgba(5,150,105,0.08)" }
    case "MEDIUM": return { label: "Mittel", color: "#b45309", bg: "rgba(234,179,8,0.08)" }
    case "HIGH": return { label: "Hoch", color: "#dc2626", bg: "rgba(220,38,38,0.08)" }
    default: return { label: level, color: "#737373", bg: "rgba(0,0,0,0.04)" }
  }
}

function categoryLabel(cat: string) {
  switch (cat) {
    case "OTHER": return "Sonstiges"
    case "PRESSURIZED_AIR": return "Druckluft"
    case "HEATING": return "Heizung"
    case "COOLING": return "K\u00e4lte"
    default: return cat
  }
}

function formatEur(val: number) {
  return val.toLocaleString("de-DE") + " \u20ac"
}

function formatKwh(val: number) {
  return val.toLocaleString("de-DE") + " kWh"
}

function MeasureDetailModal({
  measure,
  onClose,
  onNavigateToInsight,
}: {
  measure: Measure
  onClose: () => void
  onNavigateToInsight: (insightId: string) => void
}) {
  const effort = effortLabel(measure.effortLevel)
  const linkedInsight = insights.find((ins) => ins.id === measure.insightId)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{ backgroundColor: "rgba(0,9,91,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        className="relative mx-4 my-8 w-full max-w-3xl rounded-2xl border shadow-2xl md:my-16"
        style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E5E5" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b px-6 py-5" style={{ borderColor: "#F0F0F0" }}>
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{ backgroundColor: "rgba(0,0,0,0.04)", color: "#737373" }}
              >
                {categoryLabel(measure.category)}
              </span>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{ backgroundColor: effort.bg, color: effort.color }}
              >
                {"Aufwand: " + effort.label}
              </span>
            </div>
            <h2 className="text-lg font-bold leading-snug" style={{ color: "#00095B" }}>
              {measure.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
          >
            <X className="size-4" style={{ color: "#737373" }} />
          </button>
        </div>

        <div className="px-6 py-5">
          {/* Linked Insight Banner */}
          {linkedInsight && (
            <button
              onClick={() => {
                onClose()
                setTimeout(() => onNavigateToInsight(linkedInsight.id), 150)
              }}
              className="group mb-5 flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all hover:shadow-sm"
              style={{ backgroundColor: "rgba(26,47,238,0.03)", borderColor: "rgba(26,47,238,0.12)" }}
            >
              <div
                className="flex size-7 shrink-0 items-center justify-center rounded-md"
                style={{ backgroundColor: "rgba(26,47,238,0.08)" }}
              >
                <Lightbulb className="size-3.5" style={{ color: "#1A2FEE" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#1A2FEE" }}>
                  {"Basierend auf Insight"}
                </p>
                <p className="text-xs font-medium leading-snug truncate" style={{ color: "#00095B" }}>
                  {linkedInsight.title}
                </p>
              </div>
              <ArrowRight
                className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                style={{ color: "#1A2FEE" }}
              />
            </button>
          )}

          {/* KPI Grid */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-lg border px-3 py-3" style={{ borderColor: "#F0F0F0" }}>
              <div className="flex items-center gap-1.5 mb-1">
                <Euro className="size-3" style={{ color: "#059669" }} />
                <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "#AEAEAE" }}>
                  {"Gesch\u00e4tzte Einsparung/Jahr"}
                </span>
              </div>
              <p className="text-base font-bold font-mono" style={{ color: "#059669" }}>
                {formatEur(measure.yearlySavingsRangeFrom)} {"\u2013"} {formatEur(measure.yearlySavingsRangeTo)}
              </p>
            </div>
            <div className="rounded-lg border px-3 py-3" style={{ borderColor: "#F0F0F0" }}>
              <div className="flex items-center gap-1.5 mb-1">
                <Zap className="size-3" style={{ color: "#1A2FEE" }} />
                <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "#AEAEAE" }}>
                  Energieeinsparung/Jahr
                </span>
              </div>
              <p className="text-base font-bold font-mono" style={{ color: "#1A2FEE" }}>
                {formatKwh(measure.yearlySavingsEnergyRangeFrom)} {"\u2013"} {formatKwh(measure.yearlySavingsEnergyRangeTo)}
              </p>
            </div>
            <div className="rounded-lg border px-3 py-3" style={{ borderColor: "#F0F0F0" }}>
              <div className="flex items-center gap-1.5 mb-1">
                <ArrowUpDown className="size-3" style={{ color: "#b45309" }} />
                <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "#AEAEAE" }}>
                  {"Gesch\u00e4tzte Investition"}
                </span>
              </div>
              <p className="text-base font-bold font-mono" style={{ color: "#00095B" }}>
                {measure.investmentRangeFrom === 0 && measure.investmentRangeTo === 0
                  ? "Keine"
                  : `${formatEur(measure.investmentRangeFrom)} \u2013 ${formatEur(measure.investmentRangeTo)}`}
              </p>
            </div>
            <div className="rounded-lg border px-3 py-3" style={{ borderColor: "#F0F0F0" }}>
              <div className="flex items-center gap-1.5 mb-1">
                <Clock className="size-3" style={{ color: "#737373" }} />
                <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "#AEAEAE" }}>
                  {"Gesch\u00e4tzte Amortisation"}
                </span>
              </div>
              <p className="text-base font-bold font-mono" style={{ color: "#00095B" }}>
                {measure.amortisationPeriodInMonths} Monate
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="text-[13px] leading-relaxed" style={{ color: "#444444" }}>
              {measure.description}
            </p>
          </div>

          {/* AI Reasoning */}
          <div
            className="mt-5 rounded-lg border-l-2 px-4 py-3"
            style={{ backgroundColor: "#FAFAFA", borderLeftColor: "#1A2FEE" }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <FileText className="size-3.5" style={{ color: "#1A2FEE" }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#1A2FEE" }}>
                {"KI-Begr\u00fcndung"}
              </span>
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: "#444444" }}>
              {measure.reasoning}
            </p>
          </div>

          {/* Evidences */}
          <div className="mt-5">
            <div className="flex items-center gap-1.5 mb-3">
              <BarChart3 className="size-3.5" style={{ color: "#059669" }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#059669" }}>
                Relevante Datenpunkte
              </span>
            </div>
            <div
              className="rounded-lg border px-4 py-3"
              style={{ backgroundColor: "#FAFAFA", borderColor: "#F0F0F0" }}
            >
              <ul className="flex flex-col gap-2">
                {measure.evidences.map((ev, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-3 shrink-0" style={{ color: "#059669" }} />
                    <span className="text-[12px] leading-relaxed" style={{ color: "#444444" }}>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function MeasureCard({
  measure,
  index,
  onOpen,
  onNavigateToInsight,
}: {
  measure: Measure
  index: number
  onOpen: () => void
  onNavigateToInsight: (insightId: string) => void
}) {
  const effort = effortLabel(measure.effortLevel)
  const linkedInsight = insights.find((ins) => ins.id === measure.insightId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="rounded-xl border overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E5E5" }}
    >
      <button
        onClick={onOpen}
        className="group flex w-full items-start gap-3 px-4 py-4 text-left transition-all hover:bg-gray-50/40"
      >
        <div
          className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: "rgba(26,47,238,0.06)" }}
        >
          <Wrench className="size-4" style={{ color: "#1A2FEE" }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ backgroundColor: "rgba(0,0,0,0.04)", color: "#737373" }}
            >
              {categoryLabel(measure.category)}
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ backgroundColor: effort.bg, color: effort.color }}
            >
              {"Aufwand: " + effort.label}
            </span>
          </div>
          <h3 className="text-sm font-bold leading-snug" style={{ color: "#00095B" }}>
            {measure.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed line-clamp-2" style={{ color: "#737373" }}>
            {measure.shortDescription}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1">
              <Euro className="size-3" style={{ color: "#059669" }} />
              <span className="text-xs font-semibold font-mono" style={{ color: "#059669" }}>
                {formatEur(measure.yearlySavingsRangeFrom)} {"\u2013"} {formatEur(measure.yearlySavingsRangeTo)}/a
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="size-3" style={{ color: "#737373" }} />
              <span className="text-xs font-medium" style={{ color: "#737373" }}>
                {measure.amortisationPeriodInMonths} Mon. Amortisation
              </span>
            </div>
          </div>
        </div>

        <ChevronRight
          className="mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
          style={{ color: "#AEAEAE" }}
        />
      </button>
      
      {/* Feedback buttons outside button to avoid nesting */}
      <div className="px-4 pb-3 flex justify-end">
        <FeedbackButtons 
          itemType="measure" 
          itemId={`${measure.insightId}-${measure.title.slice(0, 30)}`}
          itemName={measure.title}
          locationName={locations.find(l => l.id === measure.locationId)?.name || "Unbekannt"}
        />
      </div>

      {/* Linked Insight Footer */}
      {linkedInsight && (
        <div className="border-t px-4 py-2.5" style={{ borderColor: "#F0F0F0", backgroundColor: "#FAFAFA" }}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNavigateToInsight(linkedInsight.id)
            }}
            className="group flex items-center gap-2 text-left w-full"
          >
            <Lightbulb className="size-3 shrink-0" style={{ color: "#1A2FEE" }} />
            <span className="text-[10px] font-semibold uppercase tracking-wider shrink-0" style={{ color: "#1A2FEE" }}>
              Insight:
            </span>
            <span className="text-[11px] truncate transition-opacity group-hover:opacity-70" style={{ color: "#444444" }}>
              {linkedInsight.title}
            </span>
            <ArrowRight
              className="size-3 shrink-0 ml-auto transition-transform group-hover:translate-x-0.5"
              style={{ color: "#1A2FEE" }}
            />
          </button>
        </div>
      )}
    </motion.div>
  )
}

export function MeasureList({
  locationId,
  measures,
  highlightInsightId,
  autoOpenInsightId,
  onAutoOpenConsumed,
  onNavigateToInsight,
}: {
  locationId: number
  measures: Measure[]
  highlightInsightId: string | null
  autoOpenInsightId: string | null
  onAutoOpenConsumed: () => void
  onNavigateToInsight: (insightId: string) => void
}) {
  const [selectedMeasure, setSelectedMeasure] = useState<Measure | null>(null)
  const locationMeasures = measures.filter((m) => m.locationId === locationId)

  // Group measures by insightId
  const groupedMeasures = useMemo(() => {
    const groups: { insightId: string; insightTitle: string; measures: Measure[] }[] = []
    const seen = new Set<string>()

    for (const m of locationMeasures) {
      if (!seen.has(m.insightId)) {
        seen.add(m.insightId)
        const insight = insights.find((ins) => ins.id === m.insightId)
        groups.push({
          insightId: m.insightId,
          insightTitle: insight?.title || m.insightId,
          measures: locationMeasures.filter((lm) => lm.insightId === m.insightId),
        })
      }
    }
    return groups
  }, [locationMeasures])

  // Handle auto-open when navigating from an insight
  useEffect(() => {
    if (autoOpenInsightId) {
      const firstMeasure = locationMeasures.find((m) => m.insightId === autoOpenInsightId)
      if (firstMeasure) {
        setSelectedMeasure(firstMeasure)
      }
      onAutoOpenConsumed()
    }
  }, [autoOpenInsightId, locationMeasures, onAutoOpenConsumed])

  if (locationMeasures.length === 0) {
    return (
      <div className="py-12 text-center">
        <Wrench className="mx-auto size-10 mb-3" style={{ color: "#AEAEAE" }} />
        <p className="text-sm" style={{ color: "#737373" }}>
          {"Keine Ma\u00dfnahmen f\u00fcr diesen Standort verf\u00fcgbar."}
        </p>
      </div>
    )
  }

  let globalIdx = 0

  return (
    <>
      <div className="flex flex-col gap-6">
        {groupedMeasures.map((group) => {
          const isHighlighted = highlightInsightId === group.insightId
          return (
            <div
              key={group.insightId}
              id={`measure-group-${group.insightId}`}
              className="rounded-2xl border p-4 transition-shadow"
              style={{
                backgroundColor: isHighlighted ? "rgba(26,47,238,0.02)" : "rgba(0,0,0,0.01)",
                borderColor: isHighlighted ? "rgba(26,47,238,0.25)" : "#E5E5E5",
                boxShadow: isHighlighted ? "0 0 0 2px rgba(26,47,238,0.12)" : "none",
              }}
            >
              <button
                onClick={() => onNavigateToInsight(group.insightId)}
                className="group flex items-center gap-2 mb-3 text-left"
              >
                <div
                  className="flex size-5 items-center justify-center rounded-md"
                  style={{ backgroundColor: "rgba(26,47,238,0.08)" }}
                >
                  <Lightbulb className="size-3" style={{ color: "#1A2FEE" }} />
                </div>
                <span className="text-xs font-bold truncate transition-opacity group-hover:opacity-70" style={{ color: "#1A2FEE" }}>
                  {group.insightTitle}
                </span>
                <ArrowRight
                  className="size-3 shrink-0 transition-transform group-hover:translate-x-0.5"
                  style={{ color: "#1A2FEE" }}
                />
              </button>

              <div className="flex flex-col gap-3">
                {group.measures.map((measure) => {
                  const idx = globalIdx++
                  return (
                    <MeasureCard
                      key={`${measure.title}-${idx}`}
                      measure={measure}
                      index={idx}
                      onOpen={() => setSelectedMeasure(measure)}
                      onNavigateToInsight={onNavigateToInsight}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <AnimatePresence>
        {selectedMeasure && (
          <MeasureDetailModal
            measure={selectedMeasure}
            onClose={() => setSelectedMeasure(null)}
            onNavigateToInsight={onNavigateToInsight}
          />
        )}
      </AnimatePresence>
    </>
  )
}
