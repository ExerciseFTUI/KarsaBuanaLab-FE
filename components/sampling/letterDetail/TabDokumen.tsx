"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HyperLinkButton from "../HyperlinkButton"
import { Button } from "@/components/ui/button"
import DocumentList from "../DokumentList"
import { rupiah } from "@/lib/utils"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import DropzoneLetter from "@/components/sampling/letterDetail/DropzoneLetter"
import { Sampling } from "@/lib/models/sampling.model"
import { Project } from "@/lib/models/project.model"

interface dokuParams {
  samples: Sampling[]
  data: Project
}

const handleSubmit = (e: any) => e.preventDefault()

export default function TabDokumen({ samples, data }: dokuParams) {
  const [date, setDate] = React.useState<Date>()
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([])

  const petugas = ["Luthfi", "Dio", "Eriqo"]

  return (
    <Tabs defaultValue="dokumen" className="flex-1">
      <TabsList className="grid w-full grid-cols-2 shadow-none bg-transparent">
        <TabsTrigger
          className="rounded-none data-[state=active]:shadow-none border-b-2 data-[state=active]:border-b-light_brown data-[state=active]:bg-transparent data-[state=active]:text-dark_brown data-[state=active]:font-bold text-base data-[state=inactive]:text-moss_green data-[state=inactive]:opacity-50 data-[state=inactive]:border-b-moss_green"
          value="dokumen"
        >
          Dokumen
        </TabsTrigger>

        <TabsTrigger
          className="rounded-none data-[state=active]:shadow-none border-b-2 data-[state=active]:border-b-light_brown data-[state=active]:bg-transparent data-[state=active]:text-dark_brown data-[state=active]:font-bold text-base data-[state=inactive]:text-moss_green data-[state=inactive]:opacity-50 data-[state=inactive]:border-b-moss_green"
          value="penugasanSampel"
        >
          Penugasan Sampel
        </TabsTrigger>
      </TabsList>

      <TabsContent className="py-4 w-full" value="dokumen">
        <div className="flex flex-wrap flex-col w-full">
          <DocumentList data={data} className="w-full" />

          <h1 className="text-xl font-semibold my-5">Assignment Letter</h1>

          <HyperLinkButton title="Assignment Letter" href="/" />

          <Button
            className="w-48 py-4 self-center mt-4 bg-light_brown hover:bg-dark_brown disabled:bg-transparent disabled:text-dark_brown disabled:font-bold disabled:border-2 disabled:border-dark_brown"
            onClick={(e) => handleSubmit(e)}
          >
            Save
          </Button>
        </div>
      </TabsContent>

      <TabsContent
        className="py-4 flex flex-col flex-wrap w-full"
        value="penugasanSampel"
      >
        <h1 className="text-lg font-semibold mb-4">Pilih Petugas</h1>

        <div className="flex flex-col gap-4 w-full">
          {samples.map((s, i) => (
            <div key={i} className="flex justify-between">
              <p className="text-dark_brown font-medium">
                {s.sample_name}/{rupiah(Number(s.harga))}
              </p>

              <Select>
                <SelectTrigger className="w-44 px-8 border-2 outline-none  border-light_brown focus:ring-dark_brown text-dark_brown">
                  <SelectValue placeholder="Pilih Petugas" />
                </SelectTrigger>

                <SelectContent className="-mt-1">
                  {petugas.map((p, j) => (
                    <SelectItem
                      key={j}
                      value={p.toLowerCase()}
                      className="text-dark_brown focus:bg-light_brown focus:text-ghost_white"
                    >
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        <div className="">
          <h1 className="text-lg font-semibold my-5">Deadline Sampel</h1>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left text-base font-medium",
                  "border-light_brown border-2 py-6",
                  "hover:bg-light_brown hover:bg-opacity-20",
                  !date && "text-muted-foreground"
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
          className="w-48 py-4 self-center mt-4 bg-light_brown hover:bg-dark_brown text-base"
          onClick={(e) => handleSubmit(e)}
        >
          Save
        </Button>
      </TabsContent>
    </Tabs>
  )
}
