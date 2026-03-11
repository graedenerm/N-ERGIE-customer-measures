"use client"

import { useState, useEffect } from "react"
import { ThumbsUp, ThumbsDown, Send } from "lucide-react"
import { saveFeedback, getFeedbackForItem, type ItemType, type FeedbackType } from "@/lib/feedback-store"

interface FeedbackButtonsProps {
  itemType: ItemType
  itemId: string
}

export function FeedbackButtons({ itemType, itemId }: FeedbackButtonsProps) {
  const [vote, setVote] = useState<FeedbackType | null>(null)
  const [comment, setComment] = useState("")
  const [showComment, setShowComment] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const existing = getFeedbackForItem(itemType, itemId)
    if (existing) {
      setVote(existing.vote)
      setComment(existing.comment || "")
      setSubmitted(true)
    }
  }, [itemType, itemId])

  const handleVote = async (newVote: FeedbackType) => {
    setVote(newVote)
    setShowComment(true)
    // Save immediately with just the vote
    await saveFeedback({
      itemType,
      itemId,
      vote: newVote,
      comment: comment || undefined,
      timestamp: new Date().toISOString(),
    })
  }

  const handleSubmitComment = async () => {
    if (vote) {
      await saveFeedback({
        itemType,
        itemId,
        vote,
        comment: comment || undefined,
        timestamp: new Date().toISOString(),
      })
      setSubmitted(true)
      setShowComment(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleVote("helpful")}
        className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
          vote === "helpful"
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-gray-100 text-gray-500 hover:bg-gray-200 border border-transparent"
        }`}
        title="Hilfreich"
      >
        <ThumbsUp className="size-3" />
      </button>
      <button
        onClick={() => handleVote("not_helpful")}
        className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
          vote === "not_helpful"
            ? "bg-red-100 text-red-700 border border-red-300"
            : "bg-gray-100 text-gray-500 hover:bg-gray-200 border border-transparent"
        }`}
        title="Nicht hilfreich"
      >
        <ThumbsDown className="size-3" />
      </button>

      {showComment && !submitted && (
        <div className="flex items-center gap-1 ml-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Kommentar (optional)"
            className="text-xs px-2 py-1 border rounded w-40 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmitComment}
            className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            title="Absenden"
          >
            <Send className="size-3" />
          </button>
        </div>
      )}

      {submitted && vote && (
        <span className="text-xs text-gray-400 ml-2">
          Danke!
        </span>
      )}
    </div>
  )
}
