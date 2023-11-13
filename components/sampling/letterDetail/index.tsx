"use client"

import React from "react"
import useSWR from "swr"
import { ProjectSamplingType } from "@/lib/type"
import ProjectDetails from "../ProjectDetails"
import { Separator } from "@/components/ui/separator"
import DocumentList from "../DokumentList"
import HyperLinkButton from "../HyperlinkButton"
import { Button } from "@/components/ui/button"
import { cn, fetcher } from "@/lib/utils"
import TabDokumen from "./TabDokumen"

type fetched = {
  data: ProjectSamplingType
  error: any
  isLoading: any
}

interface projectParams {
  params: { np: string }
}

export default function Project({ params }: projectParams) {
  const { data, error, isLoading }: fetched = useSWR(
    "/api/sampling/assignment-letter/" + params.np,
    fetcher
  )

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>Loading...</div>

  const { status, sampling_list } = data

  return (
    <div className="flex w-full gap-6 max-md:flex-col max-md:items-center">
      <ProjectDetails data={data} className="w-full max-w-[32rem]" />

      <Separator orientation="vertical" className="bg-light_brown w-0.5" />

      <TabDokumen data={data} samples={sampling_list} />
    </div>
  )
}
