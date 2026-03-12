"use client"

import { useState, useEffect } from "react"
import { Lock } from "lucide-react"

const CORRECT_PASSWORD = "waelzholz2026"
const STORAGE_KEY = "ecoplanet_auth"

interface PasswordGateProps {
  children: React.ReactNode
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => {
    // Check if already authenticated
    const stored = localStorage.getItem(STORAGE_KEY)
    setIsAuthenticated(stored === "true")
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true")
      setIsAuthenticated(true)
      setError(false)
    } else {
      setError(true)
      setPassword("")
    }
  }

  // Still checking auth status
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#00095B" }}>
        <div className="animate-pulse text-white">Laden...</div>
      </div>
    )
  }

  // Not authenticated - show password form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#00095B" }}>
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex flex-col items-center mb-6">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(26, 47, 238, 0.1)" }}
              >
                <Lock className="size-8" style={{ color: "#1A2FEE" }} />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Geschützter Bereich</h1>
              <p className="text-sm text-gray-500 mt-1 text-center">
                Bitte geben Sie das Passwort ein, um fortzufahren.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError(false)
                  }}
                  placeholder="Passwort eingeben"
                  className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error 
                      ? "border-red-300 bg-red-50" 
                      : "border-gray-200 bg-gray-50 focus:bg-white"
                  }`}
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">
                    Falsches Passwort. Bitte versuchen Sie es erneut.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg text-white font-medium text-sm transition-colors hover:opacity-90"
                style={{ backgroundColor: "#1A2FEE" }}
              >
                Zugang erhalten
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-2">
              <img src="/ecoplanet-logo.svg" alt="ecoplanet" className="h-5 opacity-50" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Authenticated - show children
  return <>{children}</>
}
