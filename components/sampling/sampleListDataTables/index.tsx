"use client"

import {
  samplingLetterPageColumns,
  samplingProjectPageColumns,
  // samplingSamplePageColumns,
} from "./DataTableColumns"
import { DataTable } from "./DataTable"
import { Sampling } from "@/lib/models/sampling.model"

function SamplingProjectDataTables({data}: {data: Sampling[]}) {
  const status = ["NOT ASSIGNED"]

  return (
    <DataTable
      columns={samplingProjectPageColumns}
      status={status}
      page="project"
      data={data}
    />
  )
}

function SamplingLetterDataTables({data}: {data: Sampling[]}) {
  const status: string[] = ["ASSIGNED"]

  return (
    <DataTable
      data={data}
      columns={samplingLetterPageColumns}
      status={status}
      page="assignment-letter"
    />
  )
}

function SamplingSampleDataTables({data, role}: {data: Sampling[], role: string}) {
  const status = ["", "VERIFYING", "FINISHED"]

  return (
    <DataTable
      data={data}
      columns={samplingProjectPageColumns}
      status={status}
      page="sample"
    />
  )
}

export {
  SamplingProjectDataTables,
  SamplingLetterDataTables,
  SamplingSampleDataTables,
}
