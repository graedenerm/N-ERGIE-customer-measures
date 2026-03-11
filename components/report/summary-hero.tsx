"use client"

import { motion } from "framer-motion"
import { MapPin, Zap, TrendingDown, Lightbulb, Wrench } from "lucide-react"
import { companyInfo, locations } from "@/data/company-data"

const stats = [
  {
    label: "Standorte analysiert",
    value: `${locations.length}`,
    icon: MapPin,
  },
  {
    label: "Identifizierte Insights",
    value: `${companyInfo.totalInsights}`,
    icon: Lightbulb,
  },
  {
    label: "Abgeleitete Maßnahmen",
    value: `${companyInfo.totalMeasures}`,
    icon: Wrench,
  },
  {
    label: "Gesamteinsparpotenzial",
    value: companyInfo.totalSavings + "/a",
    icon: TrendingDown,
  },
]

export function SummaryHero() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#00095B" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,47,238,0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-screen-xl px-6 pb-14 pt-16 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="size-4" style={{ color: "#E2EC2B" }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#E2EC2B" }}
            >
              Energieanalyse-Report
            </span>
          </div>

          <h1
            className="text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem]"
            style={{ color: "#FFFFFF" }}
          >
            Statistische Insights &{" "}
            <span style={{ color: "#E2EC2B" }}>{"Ma\u00dfnahmen"}</span>
          </h1>

          <p
            className="mt-4 max-w-2xl text-pretty text-base leading-relaxed"
            style={{ color: "#AEAEAE" }}
          >
            {companyInfo.description}. KI-{"gest\u00fctzte"} Analyse von Lastgangdaten
            zur Identifikation struktureller {"Einsparm\u00f6glichkeiten"} und
            konkreter {"Ma\u00dfnahmenempfehlungen"} {"\u2014"} aufbereitet {"f\u00fcr"} Ihr Energiemanagement-Team.
          </p>

          <p className="mt-2 text-sm" style={{ color: "#737373" }}>
            Energiepreis: {companyInfo.energyPriceLabel}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="rounded-lg border px-4 py-4"
                style={{
                  backgroundColor: "rgba(13,17,102,0.5)",
                  borderColor: "rgba(26,47,238,0.2)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="size-3.5" style={{ color: "#E2EC2B" }} />
                  <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#AEAEAE" }}>
                    {stat.label}
                  </span>
                </div>
                <p className="text-2xl font-bold font-mono" style={{ color: "#FFFFFF" }}>
                  {stat.value}
                </p>
              </div>
            )
          })}
        </motion.div>
      </div>

      <div className="relative h-10">
        <svg viewBox="0 0 1440 40" fill="none" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0 20C360 40 720 40 1080 20C1260 10 1380 10 1440 20V40H0V20Z" fill="#F5F5F7" />
        </svg>
      </div>
    </section>
  )
}
