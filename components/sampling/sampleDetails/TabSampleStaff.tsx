"use client"

import React from "react"
import { SampleType } from "@/lib/type"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HyperLinkButton from "../projectDetail/HyperlinkButton"
import { Button } from "@/components/ui/button"

export default function TabSampleStaff({ samples }: { samples: SampleType[] }) {
  return (
    <Tabs defaultValue="sampel" className="flex-1">
      <TabsList className="grid w-full grid-cols-2 shadow-none bg-transparent">
        <TabsTrigger
          className="rounded-none data-[state=active]:shadow-none border-b-2 data-[state=active]:border-b-light_brown data-[state=active]:bg-transparent data-[state=active]:text-dark_brown data-[state=active]:font-bold text-base data-[state=inactive]:text-moss_green data-[state=inactive]:opacity-50 data-[state=inactive]:border-b-moss_green"
          value="sampel"
        >
          Sampel
        </TabsTrigger>
        <TabsTrigger
          className="rounded-none data-[state=active]:shadow-none border-b-2 data-[state=active]:border-b-light_brown data-[state=active]:bg-transparent data-[state=active]:text-dark_brown data-[state=active]:font-bold text-base data-[state=inactive]:text-moss_green data-[state=inactive]:opacity-50 data-[state=inactive]:border-b-moss_green"
          value="tugas"
        >
          Tugas
        </TabsTrigger>
      </TabsList>

      <TabsContent className="py-4" value="sampel">
        <div className="flex gap-4 flex-wrap">
          {samples.map((s, i) => (
            <HyperLinkButton key={i} title={s.sample_name} href={s.fileId} />
          ))}
        </div>
      </TabsContent>

      <TabsContent className="py-4" value="tugas">
        <div className="flex gap-4 flex-wrap">
          {samples.map((s, i) => (
            <div key={i} className="w-full flex items-center gap-4">
              <HyperLinkButton title={s.sample_name} href={s.fileId} />

              <Button
                className="bg-light_brown hover:bg-dark_brown"
                title="Save"
              >
                Save
              </Button>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
