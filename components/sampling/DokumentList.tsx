"use client"

import { ProjectSamplingType } from "@/lib/type"
import React from "react"
import HyperLinkButton from "./projectDetails/HyperlinkButton"

export default function DocumentList({ data }: { data: ProjectSamplingType }) {
  return (
    <div className="max-h-screen overflow-auto custom-scrollbar">
      <h1 className="text-xl font-semibold mb-5">Dokumen</h1>

      <div className="flex flex-wrap max-w-3xl gap-4">
        {[
          { title: "Surat Penawaran", href: "" },
          { title: "Daftar Parameter", href: "" },
          { title: "Chain of Custody", href: "" },
          { title: "Sertifikat Akreditasi", href: "" },
          { title: "Form KUPTK", href: "" },
        ].map((o, i) => (
          <HyperLinkButton key={i} title={o.title} href={o.href} />
        ))}
      </div>
    </div>
  )
}
