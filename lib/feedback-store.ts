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

// Local storage functions (for immediate UI feedback)
export function getFeedback(): FeedbackEntry[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function getFeedbackForItem(itemType: ItemType, itemId: string): FeedbackEntry | null {
  const all = getFeedback()
  return all.find((e) => e.itemType === itemType && e.itemId === itemId) || null
}

// Save to both localStorage (for UI) and Blob (for central storage)
export async function saveFeedback(entry: FeedbackEntry): Promise<void> {
  if (typeof window === "undefined") return
  
  // Save to localStorage for immediate UI feedback
  const existing = getFeedback()
  const filtered = existing.filter(
    (e) => !(e.itemType === entry.itemType && e.itemId === entry.itemId)
  )
  filtered.push(entry)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  
  // Also send to API for central storage
  try {
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    })
  } catch (error) {
    console.error('Failed to save feedback to server:', error)
    // Silent fail - localStorage still has it
  }
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
