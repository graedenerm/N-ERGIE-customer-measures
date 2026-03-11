"use client"

import { motion } from "framer-motion"
import { MapPin, Zap, Lightbulb, Wrench, FlaskConical, ChevronRight } from "lucide-react"
import { locations } from "@/data/company-data"

export function LocationCards({ onSelectLocation }: { onSelectLocation: (id: number) => void }) {
  return (
    <section className="py-12 md:py-16" style={{ backgroundColor: "#F5F5F7" }}>
      <div className="mx-auto max-w-screen-xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold" style={{ color: "#00095B" }}>
            {"Standort\u00fcbersicht"}
          </h2>
          <p className="mt-1.5 text-sm" style={{ color: "#737373" }}>
            {"W\u00e4hlen"} Sie einen Standort, um die detaillierten Insights und {"Ma\u00dfnahmen"} einzusehen.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc, i) => (
            <motion.button
              key={loc.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              onClick={() => onSelectLocation(loc.id)}
              className="group relative flex flex-col rounded-xl border text-left transition-all hover:shadow-md"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E5E5",
              }}
            >
              {loc.isPilot && (
                <div
                  className="absolute -top-2.5 right-4 flex items-center gap-1 rounded-full px-2.5 py-0.5"
                  style={{ backgroundColor: "#1A2FEE" }}
                >
                  <FlaskConical className="size-2.5" style={{ color: "#FFFFFF" }} />
                  <span className="text-[10px] font-semibold" style={{ color: "#FFFFFF" }}>
                    Pilotstandort
                  </span>
                </div>
              )}

              <div className="flex-1 px-5 pt-5 pb-4">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="flex size-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "rgba(26,47,238,0.08)" }}
                  >
                    <MapPin className="size-4" style={{ color: "#1A2FEE" }} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold" style={{ color: "#00095B" }}>
                      {loc.name}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mt-4">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "#AEAEAE" }}>
                      Jahresverbrauch
                    </p>
                    <p className="mt-0.5 text-sm font-semibold font-mono" style={{ color: "#00095B" }}>
                      {loc.annualConsumption}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "#AEAEAE" }}>
                      Mittlere Last
                    </p>
                    <p className="mt-0.5 text-sm font-semibold font-mono" style={{ color: "#00095B" }}>
                      {loc.meanLoad}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "#AEAEAE" }}>
                      Spitzenlast
                    </p>
                    <p className="mt-0.5 text-sm font-semibold font-mono" style={{ color: "#00095B" }}>
                      {loc.peakLoad}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "#AEAEAE" }}>
                      Saisonal
                    </p>
                    <p className="mt-0.5 text-sm font-medium" style={{ color: "#00095B" }}>
                      {loc.seasonal.split(" ")[0]}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="flex items-center justify-between border-t px-5 py-3"
                style={{ borderColor: "#F0F0F0" }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Lightbulb className="size-3" style={{ color: "#1A2FEE" }} />
                    <span className="text-xs font-medium" style={{ color: "#737373" }}>
                      {loc.insightCount} Insights
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wrench className="size-3" style={{ color: "#1A2FEE" }} />
                    <span className="text-xs font-medium" style={{ color: "#737373" }}>
                      {loc.measureCount} {"Ma\u00dfnahmen"}
                    </span>
                  </div>
                </div>
                <ChevronRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  style={{ color: "#1A2FEE" }}
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
