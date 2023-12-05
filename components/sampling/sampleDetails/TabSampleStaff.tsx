"use client"

import React from "react"
import { SamplingType } from "@/lib/type"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HyperLinkButton from "../HyperlinkButton"
import { SampleStaffDataTable } from "./SampleStaffDataTable"
import { userAssistantData } from "@/constants/samplingData"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { groupUserStaffColumns } from "../DataTableColumns"
import { UserDataTable } from "../UserDataTable"

const data = userAssistantData.slice(0, 5)

// prettier-ignore
export default function TabSampleStaff({ samples }: { samples: SamplingType[] }) {

  const table = useReactTable({
    data,
    columns: groupUserStaffColumns,
    getCoreRowModel: getCoreRowModel(),
  })

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
          value="grup"
        >
          Grup
        </TabsTrigger>
      </TabsList>

      <TabsContent className="py-4" value="sampel">
        <div className="flex gap-4 flex-wrap">
          {samples.map((s, i) => (
            <HyperLinkButton key={i} title={s.sample_name} href={s.fileId} />
          ))}
        </div>

        <div>
          <h1 className="text-lg font-semibold mt-5 mb-2">Deadline Sampel</h1>

          <p className="ml-4 text-light_brown text-lg">29 Desember 2024</p>
        </div>

        <div>
          <h1 className="text-lg font-semibold my-5">Sampel</h1>

          <SampleStaffDataTable />
        </div>
      </TabsContent>

      <TabsContent className="py-4" value="grup">
        <UserDataTable table={table} />
      </TabsContent>
    </Tabs>
  )
}
