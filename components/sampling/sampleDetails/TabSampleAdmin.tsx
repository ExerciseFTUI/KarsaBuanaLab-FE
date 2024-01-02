"use client"

import React from "react"
import { SampleType } from "@/lib/type"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HyperLinkButton from "../HyperlinkButton"
import { Button } from "@/components/ui/button"

export default function TabSampleAdmin({ samples }: { samples: SampleType[] }) {
  const sampleStatus = ["Luthfi", "Dio", "Eriqo"]

  return (
    <Tabs defaultValue="statusSampel" className="flex-1">
      <TabsList className="grid w-full grid-cols-2 shadow-none bg-transparent">
        <TabsTrigger
          className="rounded-none data-[state=active]:shadow-none border-b-2 data-[state=active]:border-b-light_brown data-[state=active]:bg-transparent data-[state=active]:text-dark_brown data-[state=active]:font-bold text-base data-[state=inactive]:text-moss_green data-[state=inactive]:opacity-50 data-[state=inactive]:border-b-moss_green"
          value="statusSampel"
        >
          Status Sampel
        </TabsTrigger>
        <TabsTrigger
          className="rounded-none data-[state=active]:shadow-none border-b-2 data-[state=active]:border-b-light_brown data-[state=active]:bg-transparent data-[state=active]:text-dark_brown data-[state=active]:font-bold text-base data-[state=inactive]:text-moss_green data-[state=inactive]:opacity-50 data-[state=inactive]:border-b-moss_green"
          value="rekamanSampel"
        >
          Rekaman Sampel
        </TabsTrigger>
      </TabsList>

      <TabsContent className="py-4" value="statusSampel">
        <div className="flex flex-wrap gap-8">
          {sampleStatus.map((n, j) => (
            <div key={j} className="">
              <h1 className="text-xl font-semibold mb-5">{n}</h1>

              <div className="flex gap-4 flex-wrap">
                {samples.map((s, i) => (
                  <div key={i} className="w-full flex items-center gap-4">
                    <HyperLinkButton title={s.sample_name} href={s.fileId} />

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

      <TabsContent className="py-4 space-y-8" value="rekamanSampel">
        <div>
          <h1 className="text-xl font-semibold mb-5">Logbook Rekaman Sampel</h1>

          <HyperLinkButton
            title="Logbook Rekaman Sampel"
            href=""
            className=""
          />
        </div>

        <div>
          <h1 className="text-xl font-semibold mb-5">Berita Acara</h1>

          <HyperLinkButton title="Berita Acara" href="" className="" />
        </div>
      </TabsContent>
    </Tabs>
  )
}
