"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Header } from "@/components/report/header"
import { SummaryHero } from "@/components/report/summary-hero"
import { LocationCards } from "@/components/report/location-cards"
import { LocationDetail } from "@/components/report/location-detail"
import { ReportFooter } from "@/components/report/report-footer"
import { PasswordGate } from "@/components/password-gate"
import type { Measure } from "@/data/types"

export default function Page() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)
  const [measures, setMeasures] = useState<Measure[]>([])

  useEffect(() => {
    fetch("/api/measures")
      .then((res) => res.json())
      .then(setMeasures)
      .catch(() => {})
  }, [])

  const handleSelectLocation = (id: number) => {
    setSelectedLocation(id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBack = () => {
    setSelectedLocation(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <PasswordGate>
      <main className="min-h-screen" style={{ backgroundColor: "#F5F5F7" }}>
        <Header />

        <AnimatePresence mode="wait">
          {selectedLocation === null ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SummaryHero />
              <LocationCards onSelectLocation={handleSelectLocation} />
            </motion.div>
          ) : (
            <motion.div
              key={`location-${selectedLocation}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <LocationDetail
                locationId={selectedLocation}
                measures={measures}
                onBack={handleBack}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <ReportFooter />
      </main>
    </PasswordGate>
  )
}
