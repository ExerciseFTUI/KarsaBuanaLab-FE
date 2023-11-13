import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

import { sampleData } from "@/constants/samplingData"

export async function GET(_req: NextRequest | Request) {
  return NextResponse.json(JSON.stringify(sampleData))
}
