"use client"

import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ProjectType } from "@/lib/type"
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
import { format } from "date-fns"
import React from "react"
import SamplingTabsList from "../tab/SamplingTabsList"
import { GroupUnassignedTable } from "./GroupUnassignedTable"
import {
  RowSelectionState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { groupUserSelectableColumns } from "../DataTableColumns"
import { userAssistantData } from "@/constants/samplingData"
import { GroupAssignedTable } from "./GroupAssignedTable"

const handleSubmit = (e: any) => e.preventDefault()

const userData = userAssistantData.slice(0, 5)

export default function SampleProjectTab({
  data,
  status,
}: {
  data: ProjectType
  status: string
}) {
  const [date, setDate] = React.useState<Date>()
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const table = useReactTable({
    data: userData,
    columns: groupUserSelectableColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  return (
    <Tabs defaultValue="dokumen" className="flex-1">
      <SamplingTabsList value1="dokumen" value2="grup" />

      <TabsContent className="py-4 w-full" value="dokumen">
        <div className="px-4 py-2 flex flex-col flex-1">
          <DocumentList data={data} />

          <div className="">
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
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <span className="text-light_brown">Pilih tanggal</span>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            className="w-48 py-4 self-center mt-8 bg-light_brown hover:bg-dark_brown disabled:bg-transparent disabled:text-dark_brown disabled:font-bold disabled:border-2 disabled:border-dark_brown"
            onClick={(e) => handleSubmit(e)}
            disabled={status == "On Discuss"}
          >
            {status == "Need Schedule" || status == "Revision"
              ? "Save"
              : "Waiting"}
          </Button>
        </div>
      </TabsContent>

      <TabsContent className="py-4 w-full" value="grup">
        <GroupUnassignedTable table={table} />

        <GroupAssignedTable table={table} />
      </TabsContent>
    </Tabs>
  )
}
