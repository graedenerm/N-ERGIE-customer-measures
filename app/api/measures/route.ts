import { NextResponse } from "next/server"
import measuresData from "@/data/measures.json"

export async function GET() {
  return NextResponse.json(measuresData)
}
