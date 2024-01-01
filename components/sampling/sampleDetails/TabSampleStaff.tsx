"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HyperLinkButton from "../HyperlinkButton"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { groupUserStaffColumns } from "../sampleListDataTables/DataTableColumns"
import { UserDataTable } from "../UserDataTable"
import { Sampling } from "@/lib/models/sampling.model"

export default function TabSampleStaff({ data }: { data: Sampling }) {
  const table = useReactTable({
    data: data.assigned_to,
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
          {data.param.map((s, i) => (
            <HyperLinkButton key={i} title={s} href={""} />
          ))}
        </div>
      </TabsContent>

      <TabsContent className="py-4" value="grup">
        <UserDataTable table={table} />
      </TabsContent>
    </Tabs>
  )
}
