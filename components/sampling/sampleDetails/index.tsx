"use client"

import React from "react"
import ProjectDetails from "../ProjectDetails"
import DocumentList from "../DokumentList"
import TabSampleStaff from "./TabSampleStaff"
import TabSampleAdmin from "./TabSampleAdmin"
import { useSession } from "next-auth/react"
import { Project } from "@/lib/models/project.model"
import LoadingScreen from "@/components/LoadingScreen"
import { SamplingRequestData } from "@/lib/type"

export default function Project({ data }: { data: SamplingRequestData }) {
  const { project, files, user } = data

  const currentUser = useSession().data?.user

  const role = currentUser?.role.toUpperCase()

  if (role == null) return

  if (data == null)
    return (
      <div className="w-full h-full flex justify-center items-center font-bold">
        Sample not found!
      </div>
    )
  return (
    <div className="flex gap-6 max-md:flex-col max-md:items-center">
      <div className="flex flex-col flex-1 sm:border-r-light_brown sm:border-r-2 border-b-2 border-b-light_brown sm:border-b-0">
        <ProjectDetails data={project} className="flex-none border-none" />

        <DocumentList data={files} className="w-full sm:w-56" />
      </div>

      {role == "USER" ? (
        <TabSampleStaff data={data} />
      ) : (
        <TabSampleAdmin data={data} />
      )}
    </div>
  )
}
