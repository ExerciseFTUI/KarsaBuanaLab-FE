"use client"

import React from "react"
import ProjectDetails from "../ProjectDetails"
import DocumentList from "../DokumentList"
import TabSampleStaff from "./TabSampleStaff"
import TabSampleAdmin from "./TabSampleAdmin"
import { Sampling } from "@/lib/models/sampling.model"
import { useSession } from "next-auth/react"

export default function Project({data}: {data: Sampling}) {
  const currentUser = useSession().data?.user
  
  const role = /* currentUser?.name || */ "staff"

  if (data == null) return <div className="w-full h-full flex justify-center items-center font-bold">Sample not found!</div>
  return (
    <div className="flex gap-6 max-md:flex-col max-md:items-center">
      <div className="flex flex-col flex-1 sm:border-r-light_brown sm:border-r-2 border-b-2 border-b-light_brown sm:border-b-0">
        <ProjectDetails data={data} className="flex-none border-none" />

        <DocumentList data={data} className="w-full sm:w-56" />
      </div>

      {role == "staff" ? (
        <TabSampleStaff data={data} />
      ) : (
        <TabSampleAdmin data={data} />
      )}
    </div>
  )
}
