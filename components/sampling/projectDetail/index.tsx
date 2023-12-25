"use client"

import React from "react"
import useSWR from "swr"
import ProjectDetails from "../ProjectDetails"
import { cn, fetcher } from "@/lib/utils"
import SampleProjectTab from "./SampleProjectTab"
import { getSampleById } from "@/lib/actions/sampling.actions"
import { Project } from "@/lib/models/project.model"
import { usePathname } from "next/navigation"

interface projectParams {
  className: string
}

export default function Project({ className = "" }: projectParams) {
  const sampleId = usePathname().split("/")[3]

  const { data, error, isLoading } = useSWR(["2023", sampleId], ([year, sampleId]) => getSampleById(year, sampleId))

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>Loading...</div>
  if (!data?.result) return <div>Sample not found!</div>

  const { result } = data

  return (
    <div className={cn("flex", className)}>
      <ProjectDetails data={data.result} />

      <SampleProjectTab data={result} />
    </div>
  )
}
