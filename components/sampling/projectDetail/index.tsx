"use client"

import React, { MouseEventHandler } from "react"
import useSWR from "swr"
import { ProjectSamplingType } from "@/lib/type"
import { object } from "zod"
import ProjectDetails from "../ProjectDetails"
import { Separator } from "@/components/ui/separator"
import DocumentList from "../DokumentList"
import HyperLinkButton from "../HyperlinkButton"
import { Button } from "@/components/ui/button"
import { cn, fetcher } from "@/lib/utils"

type fetched = {
  data: ProjectSamplingType
  error: any
  isLoading: any
}

interface projectParams {
  params: { np: string }
  className?: string
}

const handleSubmit = (e: any) => e.preventDefault()

export default function Project({ params, className = "" }: projectParams) {
  const { data, error, isLoading }: fetched = useSWR(
    "/api/sampling/project/" + params.np,
    fetcher
  )

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>Loading...</div>

  const { status } = data

  return (
    <div className={cn("flex", className)}>
      <ProjectDetails data={data} />

      <Separator orientation="vertical" className="w-0.5 bg-light_brown" />

      <div className="px-4 py-2 flex flex-col flex-1">
        <DocumentList data={data} />
        <div className="">
          <h1 className="text-xl font-semibold my-5">Schedule</h1>

          <HyperLinkButton title="Schedule" href="" className="w-full " />
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
    </div>
  )
}
