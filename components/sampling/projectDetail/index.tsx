"use client"

import React from "react"
import ProjectDetails from "../ProjectDetails"
import { cn } from "@/lib/utils"
import SampleProjectTab from "./SampleProjectTab"
import { Project } from "@/lib/models/project.model"
import { SamplingRequestData } from "@/lib/type"

interface projectParams {
  className: string
  data: SamplingRequestData
  projects: Project[]
}

export default function ProjectD({
  className = "",
  data,
  projects,
}: projectParams) {
  if (data == null)
    return (
      <div className="w-full h-full flex justify-center items-center font-bold">
        Project not found!
      </div>
    )

  const { project } = data

  return (
    <div className={cn("flex", className)}>
      <ProjectDetails data={project} />

      <SampleProjectTab data={data} projects={projects} />
    </div>
  )
}
