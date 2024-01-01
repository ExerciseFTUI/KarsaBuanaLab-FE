"use client"

import React from "react"
import HyperLinkButton from "./HyperlinkButton"
import { Project } from "@/lib/models/project.model"

interface docParams {
  data: any
  className?: string
}

export default function DocumentList({ data, className = "" }: docParams) {
  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-5">Dokumen</h1>

      <div className="flex flex-wrap gap-4">
        {[
          { title: "Surat Penawaran", href: "" },
          { title: "Daftar Parameter", href: "" },
          { title: "Chain of Custody", href: "" },
          { title: "Sertifikat Akreditasi", href: "" },
          { title: "Form KUPTK", href: "" },
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
