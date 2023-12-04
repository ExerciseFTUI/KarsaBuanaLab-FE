import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

import { sampleLetterData } from "@/constants/samplingData"

export async function GET(
  _request: NextRequest | Request,
  { params }: { params: { np: string } }
) {
  const data = sampleLetterData.find((p) => p.no_penawaran == params.np)

  return NextResponse.json(JSON.stringify(data))
}
