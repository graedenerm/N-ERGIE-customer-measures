"use client"

import { useState, useEffect } from "react"
import { ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react"

interface FeedbackEntry {
  itemType: "insight" | "measure"
  itemId: string
  vote: "helpful" | "not_helpful"
  comment?: string
  timestamp: string
  userAgent?: string
}

export default function FeedbackAdminPage() {
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadFeedback = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/feedback")
      const data = await res.json()
      setFeedback(data.feedback || [])
    } catch (err) {
      setError("Fehler beim Laden des Feedbacks")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFeedback()
  }, [])

  const stats = {
    total: feedback.length,
    insights: {
      helpful: feedback.filter((f) => f.itemType === "insight" && f.vote === "helpful").length,
      notHelpful: feedback.filter((f) => f.itemType === "insight" && f.vote === "not_helpful").length,
    },
    measures: {
      helpful: feedback.filter((f) => f.itemType === "measure" && f.vote === "helpful").length,
      notHelpful: feedback.filter((f) => f.itemType === "measure" && f.vote === "not_helpful").length,
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Feedback Ubersicht</h1>
          <button
            onClick={loadFeedback}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
            Aktualisieren
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500">Gesamt</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500">Insights</p>
            <div className="flex items-center gap-2">
              <span className="text-green-600 flex items-center gap-1">
                <ThumbsUp className="size-3" /> {stats.insights.helpful}
              </span>
              <span className="text-red-600 flex items-center gap-1">
                <ThumbsDown className="size-3" /> {stats.insights.notHelpful}
              </span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500">Massnahmen</p>
            <div className="flex items-center gap-2">
              <span className="text-green-600 flex items-center gap-1">
                <ThumbsUp className="size-3" /> {stats.measures.helpful}
              </span>
              <span className="text-red-600 flex items-center gap-1">
                <ThumbsDown className="size-3" /> {stats.measures.notHelpful}
              </span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500">Mit Kommentar</p>
            <p className="text-2xl font-bold">
              {feedback.filter((f) => f.comment).length}
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Feedback List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Alle Einträge</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-gray-500">Laden...</div>
          ) : feedback.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Noch kein Feedback vorhanden</div>
          ) : (
            <div className="divide-y">
              {feedback
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map((entry, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                              entry.itemType === "insight"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {entry.itemType === "insight" ? "Insight" : "Massnahme"}
                          </span>
                          <span
                            className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                              entry.vote === "helpful"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {entry.vote === "helpful" ? (
                              <><ThumbsUp className="size-3" /> Hilfreich</>
                            ) : (
                              <><ThumbsDown className="size-3" /> Nicht hilfreich</>
                            )}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 font-mono">{entry.itemId}</p>
                        {entry.comment && (
                          <p className="mt-2 text-sm text-gray-800 bg-gray-50 p-2 rounded">
                            &quot;{entry.comment}&quot;
                          </p>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 text-right">
                        {new Date(entry.timestamp).toLocaleString("de-DE")}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
