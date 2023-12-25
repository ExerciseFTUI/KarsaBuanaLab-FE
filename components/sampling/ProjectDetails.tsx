"use client"

import React from "react"
import { object } from "zod"
import { cn, rupiah } from "@/lib/utils"
import { Sampling } from "@/lib/models/sampling.model"
import { Regulation } from "@/lib/models/regulation.model"

interface pdType {
  data: Sampling
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
      <h1 className="text-2xl font-semibold mb-5">{data.sample_name}</h1>

      <div className="">
        {[
          { val: "Nomor Sampling", acc: "_id" },
          { val: "Harga", acc: "harga" },
          { val: "Lokasi", acc: "location" },
          { val: "Jadwal", acc: "jadwal" },
          { val: "Regulasi", acc: "regulation" },
        ].map((d, i) => {
          const key = d.acc as keyof typeof object

          return (
            <div className="mb-4" key={i}>
              <p className="text-dark_brown font-medium">{d.val} </p>

              <p className="ml-4 text-light_brown">
                {
                  d.acc == "valuasi_proyek" ? rupiah(data[key]) : 
                  d.acc == "jadwal" ? new Date(data[key]).toUTCString() : 
                  d.acc == "regulation" ? (data[key] as Regulation).regulation_name : data[key]
                }
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
