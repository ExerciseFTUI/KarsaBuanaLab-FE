import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"

import { projectData } from "@/constants/samplingData"

export async function GET(_req: NextApiRequest) {
  return NextResponse.json(JSON.stringify(projectData))
}
