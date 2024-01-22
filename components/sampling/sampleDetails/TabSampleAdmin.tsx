"use client"

import React from "react"
import { Sampling } from "@/lib/models/sampling.model"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HyperLinkButton from "../HyperlinkButton"
import { Button } from "@/components/ui/button"

const simpanDokumen = (e: any) => e.preventDefault()

export default function TabSampleAdmin({ data }: { data: Sampling }) {
  return (
    <Tabs defaultValue="buatDokumen" className="flex-1">
      <TabsList className="grid w-full grid-cols-2 shadow-none bg-transparent">
        <TabsTrigger
          className="rounded-none data-[state=active]:shadow-none border-b-2 data-[state=active]:border-b-light_brown data-[state=active]:bg-transparent data-[state=active]:text-dark_brown data-[state=active]:font-bold text-base data-[state=inactive]:text-moss_green data-[state=inactive]:opacity-50 data-[state=inactive]:border-b-moss_green"
          value="buatDokumen"
        >
          Buat Dokumen
        </TabsTrigger>
        <TabsTrigger
          className="rounded-none data-[state=active]:shadow-none border-b-2 data-[state=active]:border-b-light_brown data-[state=active]:bg-transparent data-[state=active]:text-dark_brown data-[state=active]:font-bold text-base data-[state=inactive]:text-moss_green data-[state=inactive]:opacity-50 data-[state=inactive]:border-b-moss_green"
          value="verifikasiSampel"
        >
          Verifikasi Sampel
        </TabsTrigger>
      </TabsList>

      <TabsContent className="py-4" value="verifikasiSampel">
        <div className="flex flex-wrap gap-8">
          {data.assigned_to.map((n, j) => (
            <div key={j} className="">
              <h1 className="text-xl font-semibold mb-5">{n.username}</h1>

              <div className="flex gap-4 flex-wrap">
                {data.param.map((s, i) => (
                  <div key={i} className="w-full flex items-center gap-4">
                    <HyperLinkButton title={s} href={""} />

                    <div className="flex gap-2">
                      <Button
                        className="bg-light_brown hover:bg-dark_brown"
                        title="Accept"
                      >
                        Accept
                      </Button>

                      <Button
                        disabled
                        className="bg-light_brown hover:bg-dark_brown"
                        title="Revisi"
                      >
                        Revisi
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent
        className="py-4 space-y-8 flex flex-col items-center"
        value="buatDokumen"
      >
        <div className="w-full">
          <h1 className="text-xl font-semibold mb-5">Logbook Rekaman Sampel</h1>

          <HyperLinkButton
            title="Logbook Rekaman Sampel"
            href=""
            className=""
          />
        </div>

        <div className="w-full">
          <h1 className="text-xl font-semibold mb-5">Berita Acara</h1>

          <HyperLinkButton title="Berita Acara" href="" className="" />
        </div>

        <Button
          title="Simpan"
          className="bg-light_brown hover:bg-dark_brown"
          onClick={simpanDokumen}
        >
          Simpan
        </Button>
      </TabsContent>
    </Tabs>
  )
}
