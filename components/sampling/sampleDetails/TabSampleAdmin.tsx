"use client"

import React, { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HyperLinkButton from "../HyperlinkButton"
import { Button } from "@/components/ui/button"
import { Project } from "@/lib/models/project.model"
import { UserDataTable } from "../UserDataTable"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { groupUserStaffColumns } from "../sampleListDataTables/DataTableColumns"
import { useRouter } from "next/navigation"
import { changeDivision, verifySample } from "@/lib/actions/sampling.actions"
import LoadingScreen from "@/components/LoadingScreen"
import { SamplingRequestData } from "@/lib/type"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function TabSampleAdmin({
  data,
}: {
  data: SamplingRequestData
}) {
  const { project, files, user } = data
  const sampling_list = project.sampling_list /* .filter(
    (s) =>
      s.status == "WAITING" || s.status == "ACCEPTED" || s.status == "REVISION"
  ) */
  const canSave =
    sampling_list.filter((s) => s.status == "ACCEPTED").length ==
    sampling_list.length

  const table = useReactTable({
    data: user,
    columns: groupUserStaffColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const submitSample = async (sample_id: string, status: string) => {
    setIsLoading(true)

    const response = await verifySample(project._id, status, sample_id)

    setIsLoading(false)

    if (!response) {
      toast({
        title: "Failed to Verify Sampling",
        description: "Please Try Again",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Sampling Has Been Verified",
        description: "Please check again if its correct",
      })
    }

    router.refresh()
  }

  const saveSample = async (project_id: string, division: string) => {
    setIsLoading(true)

    project.sampling_list.forEach(async (s) => {
      const response = await verifySample(project_id, "SUBMIT", s._id)

      if (!response) {
        toast({
          title: "Failed to Verify Sampling",
          description: "Please Try Again",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Sampling Has Been Verified",
          description: "Please check again if its correct",
        })
      }
    })

    const response = await changeDivision(project._id, division)

    if (!response)
      toast({
        title: "Failed to Save Project",
        description: "Please Try Again",
        variant: "destructive",
      })
    else
      toast({
        title: "Project has been moved to PPLHP Division!",
        // description: "Please check again if its correct",
      })

    setIsLoading(false)
    router.refresh()
  }

  console.log("sampling_list", sampling_list);
  

  return (
    <Tabs defaultValue="buatDokumen" className="flex-1">
      {isLoading && <LoadingScreen text="" />}
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
          Verifikasi Rekaman Sampel
        </TabsTrigger>
      </TabsList>

      <TabsContent className="py-4" value="verifikasiSampel">
        <div className="flex flex-wrap gap-8">
          <div className="flex gap-4 flex-wrap w-full">
            {sampling_list.map((s, i) => (
              <div key={i} className="w-full flex items-center gap-4">
                <HyperLinkButton
                  className="w-full"
                  title={s.sample_name}
                  href={files.sampling_list[i].url || "/"}
                />

                {/* Check s.status, if status == "WAITING" || "NOT ASSIGNET", just showing 1 disable button with text of "Waiting staff" */}
                {s.status == "REVISION" || s.status == "NOT ASSIGNED" ? (
                  <Button
                    className="bg-light_brown hover:bg-dark_brown"
                    title="Waiting Staff"
                    disabled
                  >
                    Waiting
                    </Button>
                    ) : (
                <div className="flex gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button
                        className={cn(
                          "bg-light_brown hover:bg-dark_brown",
                          s.status == "ACCEPTED" ? "hidden" : ""
                        )}
                        title="Accept"
                        disabled={s.status == "SUBMIT"}
                      >
                        {s.status == "SUBMIT" ? "Waiting" : "Accept"}
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure to ACCEPT this sampling?
                        </AlertDialogTitle>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={(e) => submitSample(s._id, "ACCEPTED")}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button
                        className={cn(
                          "bg-light_brown hover:bg-dark_brown",
                          s.status == "SUBMIT" ? "hidden" : ""
                        )}
                        title="Revisi"
                      >
                        Revisi
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure to REVISE this sampling?
                        </AlertDialogTitle>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={(e) => submitSample(s._id, "REVISION")}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                      )}
              </div>
            ))}
          </div>

          {canSave && (
            <div className="">
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    className={cn("bg-light_brown hover:bg-dark_brown")}
                    title="Save"
                  >
                    Save
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure to save this sampling?
                    </AlertDialogTitle>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => saveSample(project._id, "PPLHP")}
                    >
                      Save
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent
        className="py-4 space-y-8 flex flex-col items-center"
        value="buatDokumen"
      >
        <div className="w-full">
          <h1 className="text-xl font-semibold mb-2">Staff</h1>
          <UserDataTable table={table} />
        </div>

        <div className="w-full">
          <h1 className="text-xl font-semibold mb-5">Logbook Rekaman Sampel</h1>

          <HyperLinkButton
            title="Logbook Rekaman Sampel"
            href={
              files.file.find(
                (f: any) => f.name == "Logbook Jadwal Sampling"
              ) || "/"
            }
            className=""
          />
        </div>

        <div className="w-full">
          <h1 className="text-xl font-semibold mb-5">Berita Acara</h1>

          <HyperLinkButton
            title="Berita Acara"
            href={files.file.find((f: any) => f.name == "berita-acara") || "/"}
            className=""
          />
        </div>

        {/* <Button
          title="Simpan"
          className="bg-light_brown hover:bg-dark_brown"
          onClick={simpanDokumen}
        >
          Save
        </Button> */}
      </TabsContent>
    </Tabs>
  )
}
