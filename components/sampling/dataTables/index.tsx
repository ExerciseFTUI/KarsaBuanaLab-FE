"use client"

import {
  samplingLetterPageColumns,
  samplingProjectPageColumns,
} from "../DataTableColumns"
import { DataTable } from "./DataTable"

function SamplingProjectDataTables() {
  const status = ["", "Need Schedule", "On Discuss", "Revision"]

  return (
    <DataTable
      columns={samplingProjectPageColumns}
      endpoint="project"
      status={status}
    />
  )
}

function SamplingLetterDataTables() {
  const status: string[] = []

  return (
    <DataTable
      columns={samplingLetterPageColumns}
      endpoint="assignment-letter"
      status={status}
    />
  )
}

function SamplingSampleDataTables() {
  const status = ["", "Get Sample", "Verifying", "Revision"]

  return (
    <DataTable
      columns={samplingProjectPageColumns}
      endpoint="sample"
      status={status}
    />
  )
}

export {
  SamplingProjectDataTables,
  SamplingLetterDataTables,
  SamplingSampleDataTables,
}
