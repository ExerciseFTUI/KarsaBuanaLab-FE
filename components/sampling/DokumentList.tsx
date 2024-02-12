"use client"

import React from "react"
import HyperLinkButton from "./HyperlinkButton"
import { Project } from "@/lib/models/project.model"

interface docParams {
  data: any
  className?: string
}

export default function DocumentList({ data, className = "" }: docParams) {
  const { file } = data

  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-5">Dokumen</h1>

      <div className="flex flex-wrap gap-4">
        {[
          { title: "Surat Penawaran" },
          { title: "Daftar Parameter" },
          { title: "DP Chain of Custody" },
          // { title: "Sertifikat Akreditasi" },
          { title: "Form Kaji Ulang" },
        ].map((o, i) => (
          <HyperLinkButton
            key={i}
            title={o.title}
            href={
              file.find((f: any) => f.name == o.title) != null
                ? file.find((f: any) => f.name == o.title).url
                : "/"
            }
            className={className}
          />
        ))}
      </div>
    </div>
  )
}
