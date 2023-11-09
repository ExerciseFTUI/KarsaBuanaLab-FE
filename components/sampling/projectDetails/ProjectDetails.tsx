"use client"

import React from "react"
import { ProjectSamplingType } from "@/lib/type"
import { object } from "zod"

export default function ProjectDetails({
  data,
}: {
  data: ProjectSamplingType
}) {
  return (
    <div className="w-[450px] max-sm:w-[400px] max-h-screen overflow-auto custom-scrollbar px-4 py-2 border-r-2 border-r-light_brown">
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

              <p className="ml-4 text-light_brown">{data[key]}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
