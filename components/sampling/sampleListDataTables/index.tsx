"use client"

import {
  samplingLetterPageColumns,
  samplingProjectPageColumns,
  // samplingSamplePageColumns,
} from "./DataTableColumns"
import { DataTable } from "./DataTable"

function SamplingProjectDataTables() {
  const status = ["", "NOT ASSIGNED", "FINISHED"]

  return (
    <DataTable
      columns={samplingProjectPageColumns}
      year="2023"
      status={status}
      page="project"
    />
  )
}

function SamplingLetterDataTables() {
  const status: string[] = ["ASSIGNED"]

  return (
    <DataTable
      columns={samplingLetterPageColumns}
      year="2023"
      status={status}
      page="assignment-letter"
    />
  )
}

function SamplingSampleDataTables() {
  const status = ["", "Get Sample", "Verifying", "Revision"]

  return (
    <DataTable
      columns={samplingProjectPageColumns}
      year="2023"
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
