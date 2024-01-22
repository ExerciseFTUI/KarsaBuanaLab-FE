import { generateRandomData, sampleProjectData } from '@/constants/samplingData'
import { BaseApiResponse } from '@/lib/models/baseApiResponse.model'
import { Sampling } from '@/lib/models/sampling.model'
import { NextRequest, NextResponse } from 'next/server'
 

export async function GET(request: NextRequest | Request, { params }: { params: {year: string, sampleId: string }}) { 
  const data: BaseApiResponse<Sampling | null> = {
    message: "Success",
    result: sampleProjectData.filter(p => p.created_year == params.year).flatMap(p => p.sampling_list.map(s => s)).find(s => s._id == params.sampleId) || null
  }
  
  return NextResponse.json(data)
}