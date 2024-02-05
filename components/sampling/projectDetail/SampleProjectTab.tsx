"use client"

import { Tabs, TabsContent } from "@/components/ui/tabs"
import DocumentList from "../DokumentList"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { addDays, format } from "date-fns"
import React, { useState } from "react"
import SamplingTabsList from "../tab/SamplingTabsList"
import { GroupUnassignedTable } from "./GroupUnassignedTable"
import {
  RowSelectionState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { groupUserSelectableColumns } from "../sampleListDataTables/DataTableColumns"
import { GroupAssignedTable } from "./GroupAssignedTable"
import { User } from "@/lib/models/user.model"
import { Sampling } from "@/lib/models/sampling.model"
import { assignProject, sampleAssignment } from "@/lib/actions/sampling.actions"
import HyperLinkButton from "../HyperlinkButton"
import { Project } from "@/lib/models/project.model"
import { DateRange } from "react-day-picker"
import { useRouter } from "next/navigation"
import LoadingScreen from "@/components/LoadingScreen"
import { SamplingRequestData } from "@/lib/type"

interface Params {
  data: SamplingRequestData
}

export default function SampleProjectTab({ data }: Params) {
  const { files, user, project } = data

  const { jadwal_sampling } = project

  const from = (
    jadwal_sampling
      ? jadwal_sampling.from
        ? new Date(jadwal_sampling.from)
        : null
      : null
  ) as Date
  const to = (
    jadwal_sampling
      ? jadwal_sampling.to
        ? new Date(jadwal_sampling.to)
        : null
      : null
  ) as Date

  let initialState: RowSelectionState = {}

  if (project.project_assigned_to.length)
    user.forEach((u: User, i: number) => {
      if (project.project_assigned_to.includes(u._id) == true)
        initialState[`${i}`] = true
    })

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: from,
    to: to,
  })
  const [rowSelection, setRowSelection] =
    React.useState<RowSelectionState>(initialState)

  const table = useReactTable({
    data: !!user ? user : [],
    columns: groupUserSelectableColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // prettier-ignore
  async function addProjectDeadline(e: any) {
    const assigned = table
      .getSelectedRowModel()
      .rows.map((r) => user[r.index]._id)

    if (assigned.length == 0 || !date || !date.from ) return

    setIsLoading(true)

    const response = await assignProject(data.project._id, assigned, {from: date?.from.toString() || null, to: date?.to?.toString() || null})

    setIsLoading(false)

    if (!response) {
      alert("Failed to assign project!")
    } else {
      alert("Success")
    }
    
    router.refresh()
  }

  return (
    <Tabs defaultValue="dokumen" className="flex-1">
      {isLoading && <LoadingScreen text="" />}

      <SamplingTabsList value1="dokumen" value2="grup" />

      <TabsContent className="py-4 w-full" value="dokumen">
        <div className="px-4 py-2 flex flex-col flex-1">
          <DocumentList data={files} />

          <div className="flex flex-wrap flex-col max-w-xl">
            <h1 className="text-xl font-semibold my-5">Surat Tugas</h1>

            <HyperLinkButton
              title="Surat Tugas"
              href={files.file.find((f: any) => f.name == "Surat Tugas").url}
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent className="p-4 w-full" value="grup">
        <GroupUnassignedTable table={table} />

        <GroupAssignedTable table={table} />

        <div className="px-6 flex flex-col">
          <h1 className="text-lg font-semibold my-5">Deadline Sampel</h1>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left text-base font-medium",
                  "border-light_brown border-2 py-6",
                  "hover:bg-ghost_brown hover:bg-opacity-10",
                  !date && "text-muted-foreground",
                  "text-light_brown hover:text-light_brown"
                )}
              >
                <CalendarIcon className="mr-2 h-6 w-6 text-light_brown" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span className="text-light_brown">Pilih tanggal</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>

          <Button
            className="w-48 py-4 self-center mt-4 bg-light_brown hover:bg-dark_brown disabled:bg-transparent disabled:text-dark_brown disabled:font-bold disabled:border-2 disabled:border-dark_brown"
            onClick={(e) => addProjectDeadline(e)}
          >
            {date == null ? "Choose Deadline" : "Save"}
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}
