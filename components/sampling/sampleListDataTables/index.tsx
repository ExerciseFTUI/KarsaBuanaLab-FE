"use client"

import {
  samplingLetterPageColumns,
  samplingProjectPageColumns,
  // samplingSamplePageColumns,
} from "./DataTableColumns"
import { DataTable } from "./DataTable"
import { Project } from "@/lib/models/project.model"

function SamplingProjectDataTables({data}: {data: Project[]}) {
  const status = ["", "NOT ASSIGNED", "FINISHED"]

  return (
    <DataTable
      columns={samplingProjectPageColumns}
      status={status}
      page="project"
      data={data}
    />
  )
}

function SamplingLetterDataTables({data}: {data: Project[]}) {
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

function SamplingSampleDataTables({data, role}: {data: Project[], role: string}) {
  const status = ["", "Get Sample", "Verifying", "Revision"]

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
