import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"

import { sampleData } from "@/constants/samplingData"

export async function GET(_req: NextApiRequest) {
  return NextResponse.json(JSON.stringify(sampleData))
}
