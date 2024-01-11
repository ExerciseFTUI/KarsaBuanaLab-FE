"use client"

import React from "react"
import ProjectDetails from "../ProjectDetails"
import { cn } from "@/lib/utils"
import SampleProjectTab from "./SampleProjectTab"
import { Project } from "@/lib/models/project.model"
import { Sampling } from "@/lib/models/sampling.model"

interface projectParams {
  className: string,
  sampleData: Sampling
}

export default function Project({ className = "", sampleData }: projectParams) {
  if (sampleData == null) return <div className="w-full h-full flex justify-center items-center font-bold">Sample not found!</div>

  return (
    <div className={cn("flex", className)}>
      <ProjectDetails data={sampleData} />

      <SampleProjectTab data={sampleData} />
    </div>
  )
}
