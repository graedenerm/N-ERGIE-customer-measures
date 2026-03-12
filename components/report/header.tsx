"use client"

import { Building2 } from "lucide-react"

export function Header() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{ backgroundColor: "#00095B", borderBottom: "1px solid rgba(26,47,238,0.15)" }}
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-3 md:px-12">
        <div className="flex items-center gap-4">
          <img
            src="/images/ecoplanet-logo-white.png"
            alt="ecoplanet"
            className="h-5 w-auto"
          />
          <div className="h-4 w-px" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
          <div className="flex items-center gap-2">
            <Building2 className="size-3.5" style={{ color: "#AEAEAE" }} />
            <span className="text-xs font-medium" style={{ color: "#AEAEAE" }}>
              Waelzholz
            </span>
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
            style={{ backgroundColor: "rgba(226,236,43,0.12)", color: "#E2EC2B" }}
          >
            Kundenreport
          </span>
          <span className="text-xs" style={{ color: "#AEAEAE" }}>
            {"M\u00e4rz 2026"}
          </span>
        </div>
      </div>
    </header>
  )
}
