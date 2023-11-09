import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"

import { projectData } from "@/constants/samplingData"

export async function GET(
  request: NextApiRequest,
  { params }: { params: { np: string } }
) {
  const data = projectData.find((p) => p.no_penawaran == params.np)

  return NextResponse.json(JSON.stringify(data))
}
