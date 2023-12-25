"use client"

import React, { MouseEventHandler } from "react"
import useSWR from "swr"
import { fetcher } from "@/lib/utils"
import ProjectDetails from "../ProjectDetails"
import DocumentList from "../DokumentList"
import { Separator } from "@/components/ui/separator"
import TabSampleStaff from "./TabSampleStaff"
import TabSampleAdmin from "./TabSampleAdmin"
import { usePathname } from "next/navigation"
import { getSampleById } from "@/lib/actions/sampling.actions"

export default function Project() {
  const sampleId = usePathname().split("/")[3]

  const { data, error, isLoading } = useSWR(["2023", sampleId], ([year, sampleId]) => getSampleById(year, sampleId))

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>Loading...</div>
  if (!data?.result) return <div>Sample not found!</div>
  
  let ACCOUNT_ROLE = "STAFF"

  const { result } = data

  return (
    <div className="flex gap-6 max-md:flex-col max-md:items-center">
      <div className="flex flex-col flex-1 sm:border-r-light_brown sm:border-r-2 border-b-2 border-b-light_brown sm:border-b-0">
        <ProjectDetails data={result} className="flex-none border-none" />

        <DocumentList data={data} className="w-full sm:w-56" />
      </div>

      {ACCOUNT_ROLE == "STAFF" ? (
        <TabSampleStaff data={result} />
      ) : (
        <TabSampleAdmin data={result} />
      )}
    </div>
  )
}
