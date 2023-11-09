"use client"

import { ProjectSamplingType } from "@/lib/type"
import React from "react"
import HyperLinkButton from "./projectDetail/HyperlinkButton"

interface docParams {
  data: ProjectSamplingType
  className?: string
}

export default function DocumentList({ data, className = "" }: docParams) {
  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-5">Dokumen</h1>

      <div className="flex flex-wrap gap-4">
        {[
          { title: "Surat Penawaran", href: data.file.file_nama },
          { title: "Daftar Parameter", href: data.file.file_nama },
          { title: "Chain of Custody", href: data.file.file_nama },
          { title: "Sertifikat Akreditasi", href: data.file.file_nama },
          { title: "Form KUPTK", href: data.file.file_nama },
        ].map((o, i) => (
          <HyperLinkButton
            key={i}
            title={o.title}
            href={o.href}
            className={className}
          />
        ))}
      </div>
    </div>
  )
}
