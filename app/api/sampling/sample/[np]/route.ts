import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

import { sampleSamplingData } from "@/constants/samplingData"

export async function GET(
  _request: NextRequest | Request,
  { params }: { params: { np: string } }
) {
  const data = sampleSamplingData.find((p) => p.no_penawaran == params.np)

  return NextResponse.json(JSON.stringify(data))
}
