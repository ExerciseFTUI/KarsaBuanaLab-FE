"use client"

import React from "react"
import { object } from "zod"
import { cn } from "@/lib/utils"
import { Project } from "@/lib/models/project.model"
import LoadingScreen from "../LoadingScreen"

interface pdType {
  data: Project
  className?: string
}

export default function ProjectDetails({ data, className = "" }: pdType) {
  return (
    <div
      className={cn(
        "px-4 py-2 flex-1 border-r-light_brown border-b-2 sm:border-r-2 sm:border-b-0",
        className
      )}
    >
      <h1 className="text-2xl font-semibold mb-5">{data.project_name}</h1>

      <div className="">
        {[
          { val: "No Penawaran", acc: "no_penawaran" },
          { val: "Nama Project", acc: "project_name" },
          { val: "Nomor Sampling", acc: "no_sampling" },
          { val: "Alamat Sampling", acc: "alamat_sampling" },
          { val: "Jadwal", acc: "jadwal" },
        ].map((d, i) => {
          const key = d.acc as keyof typeof object

          return (
            <div className="mb-4" key={i}>
              <p className="text-dark_brown font-medium">{d.val} </p>

              <p className="ml-4 text-light_brown">
                {
                  (d.acc == "jadwal") ? data[key] != null ? new Date(data[key]).toUTCString() : "Jadwal belum ada." : data[key]
                }
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
