"use client"

import { useState } from "react"
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
  MessageSquare,
  FileText,
  ArrowUpDown,
} from "lucide-react"
import type { Measure } from "@/data/types"

function effortLabel(level: string) {
  switch (level) {
    case "LOW": return { label: "Niedrig", color: "#059669", bg: "rgba(5,150,105,0.08)" }
    case "MEDIUM": return { label: "Mittel", color: "#b45309", bg: "rgba(234,179,8,0.08)" }
    case "HIGH": return { label: "Hoch", color: "#dc2626", bg: "rgba(220,38,38,0.08)" }
    default: return { label: level, color: "#737373", bg: "rgba(0,0,0,0.04)" }
  }
}

function investmentLabel(type: string) {
  switch (type) {
    case "NO_INTENSITY": return { label: "Keine Investition", color: "#059669" }
    case "MEDIUM_INTENSITY": return { label: "Mittlere Investition", color: "#b45309" }
    case "HIGH_INTENSITY": return { label: "Hohe Investition", color: "#dc2626" }
    default: return { label: type, color: "#737373" }
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

function MeasureDetailModal({ measure, onClose }: { measure: Measure; onClose: () => void }) {
  const effort = effortLabel(measure.effortLevel)
  const investment = investmentLabel(measure.investmentType)

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

          {/* Questions */}
          {measure.questions.length > 0 && (
            <div className="mt-5">
              <div className="flex items-center gap-1.5 mb-3">
                <MessageSquare className="size-3.5" style={{ color: "#b45309" }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#b45309" }}>
                  {"Ma\u00dfnahme pr\u00e4zisieren"}
                </span>
              </div>
              <p className="text-xs mb-3" style={{ color: "#737373" }}>
                {"Ihre Antworten helfen uns, die Empfehlung auf Ihre spezifische Situation zuzuschneiden."}
              </p>
              <div className="flex flex-col gap-3">
                {measure.questions.map((q, qi) => (
                  <div
                    key={qi}
                    className="rounded-lg border px-4 py-3"
                    style={{ borderColor: "#F0F0F0" }}
                  >
                    <p className="text-[12px] font-semibold mb-2" style={{ color: "#00095B" }}>
                      Frage {qi + 1} von {measure.questions.length}: {q.question}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {q.suggestedAnswers.map((a, ai) => (
                        <span
                          key={ai}
                          className="inline-block rounded-full border px-2.5 py-1 text-[11px]"
                          style={{ borderColor: "#E5E5E5", color: "#444444" }}
                        >
                          {a.answer}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function MeasureCard({
  measure,
  index,
  onOpen,
}: {
  measure: Measure
  index: number
  onOpen: () => void
}) {
  const effort = effortLabel(measure.effortLevel)

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      onClick={onOpen}
      className="group flex w-full items-start gap-3 rounded-xl border px-4 py-4 text-left transition-all hover:shadow-md"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E5E5" }}
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
    </motion.button>
  )
}

export function MeasureList({ locationId, measures }: { locationId: number; measures: Measure[] }) {
  const [selectedMeasure, setSelectedMeasure] = useState<Measure | null>(null)
  const locationMeasures = measures.filter((m) => m.locationId === locationId)

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

  return (
    <>
      <div className="flex flex-col gap-3">
        {locationMeasures.map((measure, i) => (
          <MeasureCard
            key={`${measure.title}-${i}`}
            measure={measure}
            index={i}
            onOpen={() => setSelectedMeasure(measure)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedMeasure && (
          <MeasureDetailModal
            measure={selectedMeasure}
            onClose={() => setSelectedMeasure(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
