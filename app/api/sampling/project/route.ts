import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

import { projectData } from "@/constants/samplingData"

export async function GET(_req: NextRequest | Request) {
  return NextResponse.json(JSON.stringify(projectData))
}
