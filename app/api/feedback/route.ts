import { put, list } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

interface FeedbackEntry {
  itemType: 'insight' | 'measure'
  itemId: string
  vote: 'helpful' | 'not_helpful'
  comment?: string
  timestamp: string
  userAgent?: string
}

const FEEDBACK_FILE = 'waelzholz-feedback.json'

// GET - retrieve all feedback
export async function GET() {
  try {
    const { blobs } = await list({ prefix: FEEDBACK_FILE })
    
    if (blobs.length === 0) {
      return NextResponse.json({ feedback: [] })
    }

    // Get the latest feedback file
    const latestBlob = blobs[0]
    const response = await fetch(latestBlob.url)
    const feedback = await response.json()
    
    return NextResponse.json({ feedback })
  } catch (error) {
    console.error('Error reading feedback:', error)
    return NextResponse.json({ feedback: [], error: 'Failed to read feedback' })
  }
}

// POST - add new feedback
export async function POST(request: NextRequest) {
  try {
    const newFeedback: FeedbackEntry = await request.json()
    
    // Add timestamp and user agent
    newFeedback.timestamp = new Date().toISOString()
    newFeedback.userAgent = request.headers.get('user-agent') || undefined

    // Get existing feedback
    let existingFeedback: FeedbackEntry[] = []
    try {
      const { blobs } = await list({ prefix: FEEDBACK_FILE })
      if (blobs.length > 0) {
        const response = await fetch(blobs[0].url)
        existingFeedback = await response.json()
      }
    } catch {
      // No existing feedback, start fresh
      existingFeedback = []
    }

    // Add new feedback
    existingFeedback.push(newFeedback)

    // Save updated feedback
    await put(FEEDBACK_FILE, JSON.stringify(existingFeedback, null, 2), {
      access: 'public',
      addRandomSuffix: false,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving feedback:', error)
    return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 })
  }
}
