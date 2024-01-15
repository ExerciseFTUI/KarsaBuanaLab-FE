"use client"

import React from "react"
import { ProjectSamplingType } from "@/lib/type"
import { object } from "zod"
import { cn, rupiah } from "@/lib/utils"

interface pdType {
  data: ProjectSamplingType
  className?: string
}

export default function ProjectDetails({ data, className = "" }: pdType) {
  return (
    <div className={cn("px-4 py-2 flex-1", className)}>
      <h1 className="text-2xl font-semibold mb-5">{data.project_name}</h1>

      <div className="">
        {[
          { val: "Nomor Projek", acc: "no_penawaran" },
          { val: "Nama Customer", acc: "client_name" },
          { val: "Lokasi Administrasi", acc: "alamat_kantor" },
          { val: "Surel", acc: "surel" },
          { val: "Contact Person", acc: "contact_person" },
          { val: "Lokasi Sampling", acc: "alamat_sampling" },
          { val: "Nilai Penawaran", acc: "valuasi_proyek" },
        ].map((d, i) => {
          const key = d.acc as keyof typeof object

          return (
            <div className="mb-4" key={i}>
              <p className="text-dark_brown font-medium">{d.val} </p>

              <p className="ml-4 text-light_brown">
                {d.acc == "valuasi_proyek" ? rupiah(data[key]) : data[key]}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
