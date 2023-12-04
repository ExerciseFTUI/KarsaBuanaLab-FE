"use client"

import React from "react"
import useSWR from "swr"
import { ProjectType } from "@/lib/type"
import ProjectDetails from "../ProjectDetails"
import { cn, fetcher } from "@/lib/utils"
import SampleProjectTab from "./SampleProjectTab"

type fetched = {
  data: ProjectType
  error: any
  isLoading: any
}

interface projectParams {
  params: { np: string }
  className?: string
}

export default function Project({ params, className = "" }: projectParams) {
  const { data, error, isLoading }: fetched = useSWR(
    "/api/sampling/project/" + params.np,
    fetcher
  )

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>Loading...</div>

  const { status } = data

  return (
    <div className={cn("flex", className)}>
      <ProjectDetails data={data} />

      <SampleProjectTab data={data} status={status} />
    </div>
  )
}
