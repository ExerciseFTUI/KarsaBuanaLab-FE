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
import { Sampling } from "@/lib/models/sampling.model"
import Link from "next/link"
import { saveSample } from "@/lib/actions/lab.actions"

export default function VerifikasiSampling({
  data,
}: {
  data: SamplingRequestData
}) {
  const { project, files, user } = data

  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const canSave =
    project.sampling_list.filter((s) => s.status == "ACCEPTED").length ==
    project.sampling_list.length

  async function submitSample(sample_id: string, status: string) {
    setIsLoading(true)
    console.log("status : ", status);
    

    if (status == "REVISION BY SPV") {
      const response = await saveSample(project._id, status);
      console.log("resp : ", response);
      

      setIsLoading(false);

      if (!response) {
        toast({
          title: "Failed to reanalisa data",
          description: "Please Try Again",
          variant: "destructive",
        });

        return;
      }

      toast({
        title: "Data Has Been Verified",
        description: "Please check again if its correct",
      });

      router.refresh();
      return;
    }

    const response = await verifySample(project._id, status, sample_id)
    
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
    <div className="flex flex-col relative w-full max-w-lg">
      {isLoading && <LoadingScreen />}

      <h1 className="text-black_brown text-2xl font-semibold pb-8">
        Hasil Pengujian
      </h1>

      <div className="flex flex-col gap-4 w-full">
        {project.sampling_list.map((s: Sampling, i: number) => {
          const assignedUser = s.lab_assigned_to.flatMap((u) =>
            user.filter((k) => k._id === u)
          )

          console.log(assignedUser)

          return (
            <div key={i} className="w-full flex flex-col justify-between gap-4">
              <div className="flex gap-2">
                <h1 className="font-bold">{s.sample_name}</h1>

                <Link href={files.sampling_list[i].url || "/"} className="">
                  ⇲
                </Link>
              </div>

              <div className="flex gap-2">
                {assignedUser.map((u) => (
                  <>
                    <h1 className="text-base">{u.username}</h1>
                  </>
                ))}
              </div>

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
                        onClick={(e) => submitSample(s._id, "REVISION BY SPV")}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )
        })}

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
                <AlertDialogAction>Save</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  )
}
