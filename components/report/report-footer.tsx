export function ReportFooter() {
  return (
    <footer style={{ backgroundColor: "#00095B" }}>
      <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-3 px-6 py-10 text-center md:px-12">
        <img
          src="/images/ecoplanet-logo-white.png"
          alt="ecoplanet"
          className="h-5 w-auto"
        />
        <p className="max-w-lg text-sm leading-relaxed" style={{ color: "#AEAEAE" }}>
          Dieser Report wurde auf Basis statistischer Lastganganalyse und 
          KI-gestützter Kontextanreicherung erstellt. Die dargestellten 
          Einsparpotenziale sind Schätzungen und bedürfen der Validierung 
          im Rahmen einer Detailanalyse.
        </p>
        <div className="mt-2 h-px w-16" style={{ backgroundColor: "rgba(26,47,238,0.3)" }} />
        <p className="text-xs" style={{ color: "#737373" }}>
          {"M\u00e4rz 2026 \u2014 Vertraulich"}
        </p>
      </div>
    </footer>
  )
}
