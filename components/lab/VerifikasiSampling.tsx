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
import { useState } from "react"
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

  const [isLoading, setIsLoading] = useState(false)

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
        {data.files.sampling_list.map((s: any, i: number) => (
          <div key={i} className="w-full flex items-center gap-4">
            <HyperLinkButton
              className="w-72"
              title={s.name}
              href={s.url || "/"}
            />

            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    className={cn(
                      "bg-light_brown hover:bg-dark_brown",
                      s.status == "ACCEPTED" ? "hidden" : ""
                    )}
                    title="Accept"
                  >
                    Accept
                  </Button>
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
                      onClick={(e) => submitSample(s._id, "ACCEPT")}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    className="border-light_brown border-2 bg-transparent text-dark_brown hover:bg-dark_brown hover:text-ghost_white"
                    title="Revisi"
                  >
                    Reanalisa
                  </Button>
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
                      onClick={(e) => submitSample(s._id, "REANALISA")}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row w-full justify-end gap-4 mt-6">
        <button className="text-dark_brown font-semibold px-3 pb-1 rounded-md border-2 border-dark_brown">
          Cancel
        </button>
        <button className="text-white bg-dark_brown font-semibold px-3 pb-1 rounded-md border-2 border-dark_brown">
          Save
        </button>
      </div>
    </div>
  )
}
