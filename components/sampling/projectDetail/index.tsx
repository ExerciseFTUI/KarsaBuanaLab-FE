"use client"

import React from "react"
import ProjectDetails from "../ProjectDetails"
import { cn } from "@/lib/utils"
import SampleProjectTab from "./SampleProjectTab"
import { Project } from "@/lib/models/project.model"

interface projectParams {
  className: string,
  data: Project
}

export default function ProjectD({ className = "", data }: projectParams) {
  if (data == null) return <div className="w-full h-full flex justify-center items-center font-bold">Project not found!</div>

  return (
    <div className={cn("flex", className)}>
      <ProjectDetails data={data} />

      <SampleProjectTab data={data} />
    </div>
  )
}
