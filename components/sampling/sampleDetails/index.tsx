"use client"

import React, { MouseEventHandler } from "react"
import useSWR from "swr"
import { ProjectType } from "@/lib/type"
import { fetcher } from "@/lib/utils"
import ProjectDetails from "../ProjectDetails"
import DocumentList from "../DokumentList"
import { Separator } from "@/components/ui/separator"
import TabSampleStaff from "./TabSampleStaff"
import TabSampleAdmin from "./TabSampleAdmin"

type fetched = {
  data: ProjectType
  error: any
  isLoading: any
}

export default function Project({ params }: { params: { np: string } }) {
  const { data, error, isLoading }: fetched = useSWR(
    "/api/sampling/sample/" + params.np,
    fetcher
  )

  let ACCOUNT_ROLE = "STAFF"

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>Loading...</div>

  const { status, sampling_list } = data

  return (
    <div className="flex gap-6 max-md:flex-col max-md:items-center">
      <div className="flex flex-col flex-1 sm:border-r-light_brown sm:border-r-2 border-b-2 border-b-light_brown sm:border-b-0">
        <ProjectDetails data={data} className="flex-none border-none" />

        <DocumentList data={data} className="w-full sm:w-56" />
      </div>

      {ACCOUNT_ROLE == "STAFF" ? (
        <TabSampleStaff samples={sampling_list} />
      ) : (
        <TabSampleAdmin samples={sampling_list} />
      )}
    </div>
  )
}
