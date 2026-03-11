import { put, list, get } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

interface FeedbackEntry {
  itemType: 'insight' | 'measure'
  itemId: string
  itemName?: string
  locationName?: string
  vote: 'helpful' | 'not_helpful'
  comment?: string
  timestamp: string
}

const FEEDBACK_FILE = 'waelzholz-feedback.json'

export async function GET() {
  try {
    const { blobs } = await list({ prefix: FEEDBACK_FILE })
    
    if (blobs.length === 0) {
      return NextResponse.json({ feedback: [] })
    }

    const latestBlob = blobs[0]
    const result = await get(latestBlob.pathname, { access: 'private' })
    
    if (!result) {
      return NextResponse.json({ feedback: [] })
    }
    
    const text = await new Response(result.stream).text()
    const feedback = JSON.parse(text)
    
    return NextResponse.json({ feedback })
  } catch (error) {
    console.error('Error reading feedback:', error)
    return NextResponse.json({ feedback: [], error: 'Failed to read feedback' })
  }
}

export async function POST(request: NextRequest) {
  try {
    const newFeedback: FeedbackEntry = await request.json()
    newFeedback.timestamp = new Date().toISOString()

    let existingFeedback: FeedbackEntry[] = []
    try {
      const { blobs } = await list({ prefix: FEEDBACK_FILE })
      if (blobs.length > 0) {
        const result = await get(blobs[0].pathname, { access: 'private' })
        if (result) {
          const text = await new Response(result.stream).text()
          existingFeedback = JSON.parse(text)
        }
      }
    } catch {
      existingFeedback = []
    }

    existingFeedback.push(newFeedback)

    await put(FEEDBACK_FILE, JSON.stringify(existingFeedback, null, 2), {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving feedback:', error)
    return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 })
  }
}
