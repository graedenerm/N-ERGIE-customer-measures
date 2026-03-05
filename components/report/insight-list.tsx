"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Calendar,
  Target,
  Shield,
  Info,
} from "lucide-react"
import { insights } from "@/data/company-data"
import type { Insight } from "@/data/types"

function confidenceColor(c: number) {
  if (c >= 0.9) return { bg: "rgba(5,150,105,0.1)", text: "#059669", label: "Sehr hoch" }
  if (c >= 0.8) return { bg: "rgba(5,150,105,0.08)", text: "#059669", label: "Hoch" }
  if (c >= 0.7) return { bg: "rgba(234,179,8,0.1)", text: "#b45309", label: "Mittel" }
  return { bg: "rgba(234,179,8,0.08)", text: "#b45309", label: "Moderat" }
}

function categoryBadge(cat: string) {
  return cat === "structural"
    ? { bg: "rgba(26,47,238,0.08)", text: "#1A2FEE", label: "Strukturell" }
    : { bg: "rgba(220,38,38,0.08)", text: "#dc2626", label: "Anomalie" }
}

function InsightCard({ insight, index }: { insight: Insight; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const conf = confidenceColor(insight.confidence)
  const cat = categoryBadge(insight.category)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-xl border overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E5E5" }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50/50"
      >
        <div
          className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: cat.bg }}
        >
          {insight.category === "structural" ? (
            <TrendingUp className="size-4" style={{ color: cat.text }} />
          ) : (
            <AlertTriangle className="size-4" style={{ color: cat.text }} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ backgroundColor: cat.bg, color: cat.text }}
            >
              {cat.label}
            </span>
            <span
              className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ backgroundColor: "rgba(0,0,0,0.04)", color: "#737373" }}
            >
              <Calendar className="size-2.5" />
              {insight.season}
            </span>
            <span
              className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ backgroundColor: conf.bg, color: conf.text }}
            >
              <Shield className="size-2.5" />
              Konfidenz: {conf.label}
            </span>
            {insight.urgency === 1.0 && (
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                style={{ backgroundColor: "rgba(220,38,38,0.1)", color: "#dc2626" }}
              >
                Dringlichkeit: Maximum
              </span>
            )}
          </div>
          <h3 className="text-sm font-bold leading-snug" style={{ color: "#00095B" }}>
            {insight.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed line-clamp-2" style={{ color: "#737373" }}>
            {insight.summary}
          </p>
        </div>

        <div className="shrink-0 flex flex-col items-end gap-1.5">
          <p className="text-base font-bold font-mono" style={{ color: "#059669" }}>
            {insight.savingsEur}
          </p>
          <p className="text-[10px] font-medium" style={{ color: "#AEAEAE" }}>
            {insight.savingsKwh}
          </p>
          {expanded ? (
            <ChevronUp className="size-4 mt-1" style={{ color: "#AEAEAE" }} />
          ) : (
            <ChevronDown className="size-4 mt-1" style={{ color: "#AEAEAE" }} />
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t px-5 py-4" style={{ borderColor: "#F0F0F0" }}>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Target className="size-3.5" style={{ color: "#1A2FEE" }} />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#1A2FEE" }}>
                      Warum nicht-offensichtlich
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed" style={{ color: "#444444" }}>
                    {insight.whyNonObvious}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Info className="size-3.5" style={{ color: "#737373" }} />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#737373" }}>
                      Kontext
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed" style={{ color: "#444444" }}>
                    {insight.supportingContext}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function InsightList({ locationId }: { locationId: number }) {
  const locationInsights = insights.filter((ins) => ins.locationId === locationId)

  if (locationInsights.length === 0) {
    return (
      <div className="py-12 text-center">
        <Lightbulb className="mx-auto size-10 mb-3" style={{ color: "#AEAEAE" }} />
        <p className="text-sm" style={{ color: "#737373" }}>
          {"Keine Insights f\u00fcr diesen Standort verf\u00fcgbar."}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {locationInsights.map((insight, i) => (
        <InsightCard key={insight.id} insight={insight} index={i} />
      ))}
    </div>
  )
}
