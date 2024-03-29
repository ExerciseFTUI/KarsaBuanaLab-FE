"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { verifySample } from "@/lib/actions/sampling.actions"
import HyperLinkButton from "../sampling/HyperlinkButton"
import { SamplingRequestData } from "@/lib/type"
import LoadingScreen from "../LoadingScreen"

export default function VerifikasiSampling({
  data,
}: {
  data: SamplingRequestData
}) {
  const router = useRouter()
  const { toast } = useToast()

  // console.log(data.project.sampling_list)

  const [isLoading, setIsLoading] = useState(false)

  const canSave =
    data.project.sampling_list.filter((s) => s.status == "ACCEPTED").length ==
    data.project.sampling_list.length

  const submitSample = async (sample_id: string, status: string) => {
    setIsLoading(true)

    const response = await verifySample(data.project._id, status, sample_id)

    setIsLoading(false)

    if (!response) {
      toast({
        title: "Failed to Verify Data",
        description: "Please Try Again",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Data Has Been Verified",
        description: "Please check again if its correct",
      })
    }

    router.refresh()
  }

  return (
    <div className="flex flex-col relative">
      {isLoading && <LoadingScreen text="" />}

      <h1 className="text-black_brown text-2xl font-semibold pb-8">
        Hasil Pengujian
      </h1>

      <div className="space-y-4">
        {data.project.sampling_list.map((s: any, i: number) => (
          <div key={i} className="w-full flex items-center gap-4">
            <HyperLinkButton
              className="w-72"
              title={s.sample_name}
              href={data.files.sampling_list[i].url || "/"}
            />

            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger title="Accept">
                  <div
                    className={cn(
                      "bg-light_brown hover:bg-dark_brown text-white px-8 pt-1 pb-2 rounded-lg",
                      s.status == "ACCEPTED" ? "hidden" : ""
                    )}
                  >
                    Accept
                  </div>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure to ACCEPT this data?
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
                <AlertDialogTrigger
                  className="border-light_brown border-2 bg-transparent text-dark_brown hover:bg-dark_brown hover:text-ghost_white px-4 pt-1 pb-2 rounded-lg"
                  title="Revisi"
                >
                  Reanalisa
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure to REANALISA this data?
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
          </div>
        ))}

        {canSave && (
          <AlertDialog>
            <AlertDialogTrigger
              className={cn(
                "bg-light_brown hover:bg-dark_brown text-white px-8 pt-1 pb-2 rounded-lg"
              )}
              title="Save"
            >
              Save
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure to save this project?
                </AlertDialogTitle>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={(e) => console.log("saved")}>
                  Save
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  )
}
