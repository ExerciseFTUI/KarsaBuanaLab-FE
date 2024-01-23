"use client"

import React, { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HyperLinkButton from "../HyperlinkButton"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { groupUserStaffColumns } from "../sampleListDataTables/DataTableColumns"
import { UserDataTable } from "../UserDataTable"
import { Project } from "@/lib/models/project.model"
import SamplingTabsList from "../tab/SamplingTabsList"
import { Button } from "@/components/ui/button"
import { verifySample } from "@/lib/actions/sampling.actions"
import { useRouter } from "next/navigation"
import LoadingScreen from "@/components/LoadingScreen"

export default function TabSampleStaff({ data }: { data: Project }) {
  const table = useReactTable({
    data: data.project_assigned_to,
    columns: groupUserStaffColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const submitSample = async (e: any, sampleName: string) => {
    setIsLoading(true)

    const response = await verifySample(data._id, "WAITING", sampleName)

    if (!response) {
      alert("Failed to submit sample!")
      return
    } else {
      alert("Success")
      router.push("/sampling/project/" + data._id)
    }

    setIsLoading(false)
  }

  return (
    <Tabs defaultValue="Sampel" className="flex-1">
      {isLoading && <LoadingScreen text="" />}
      <SamplingTabsList value1="Sampel" value2="Grup" />

      <TabsContent className="py-4" value="Sampel">
        <div className="flex gap-4 flex-col">
          {data.sampling_list.map((s, i) => (
            <div key={i} className="flex items-center gap-8">
              <HyperLinkButton title={s.sample_name} href={""} />
              <Button
                className="w-24 py-4 self-center bg-light_brown hover:bg-dark_brown disabled:bg-transparent disabled:text-dark_brown disabled:font-bold disabled:border-2 disabled:border-dark_brown"
                onClick={(e) => submitSample(e, s.sample_name)}
              >
                Save
              </Button>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent className="py-4" value="Grup">
        <UserDataTable table={table} />
      </TabsContent>
    </Tabs>
  )
}
