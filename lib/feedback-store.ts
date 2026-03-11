"use client"

export type FeedbackType = "helpful" | "not_helpful"
export type ItemType = "insight" | "measure"

export interface FeedbackEntry {
  itemType: ItemType
  itemId: string
  vote: FeedbackType
  comment?: string
  timestamp: string
}

const STORAGE_KEY = "ecoplanet_feedback"

export function getFeedback(): FeedbackEntry[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function saveFeedback(entry: FeedbackEntry): void {
  if (typeof window === "undefined") return
  const existing = getFeedback()
  // Remove any previous feedback for this item
  const filtered = existing.filter(
    (e) => !(e.itemType === entry.itemType && e.itemId === entry.itemId)
  )
  filtered.push(entry)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

export function getFeedbackForItem(itemType: ItemType, itemId: string): FeedbackEntry | null {
  const all = getFeedback()
  return all.find((e) => e.itemType === itemType && e.itemId === itemId) || null
}

export function getFeedbackStats(): {
  insights: { helpful: number; notHelpful: number }
  measures: { helpful: number; notHelpful: number }
} {
  const all = getFeedback()
  return {
    insights: {
      helpful: all.filter((e) => e.itemType === "insight" && e.vote === "helpful").length,
      notHelpful: all.filter((e) => e.itemType === "insight" && e.vote === "not_helpful").length,
    },
    measures: {
      helpful: all.filter((e) => e.itemType === "measure" && e.vote === "helpful").length,
      notHelpful: all.filter((e) => e.itemType === "measure" && e.vote === "not_helpful").length,
    },
  }
}
