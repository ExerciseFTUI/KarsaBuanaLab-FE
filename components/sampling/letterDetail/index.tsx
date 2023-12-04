"use client"

import React from "react"
import useSWR from "swr"
import { ProjectType } from "@/lib/type"
import ProjectDetails from "../ProjectDetails"
import { Separator } from "@/components/ui/separator"
import DocumentList from "../DokumentList"
import HyperLinkButton from "../HyperlinkButton"
import { Button } from "@/components/ui/button"
import { cn, fetcher } from "@/lib/utils"
import TabDokumen from "./TabDokumen"

type fetched = {
  data: ProjectType
  error: any
  isLoading: any
}

interface projectParams {
  params: { np: string }
}

const handleSubmit = (e: any) => e.preventDefault()

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

      <div className="flex flex-wrap flex-col max-w-xl">
        <DocumentList data={data} className="" />

        <h1 className="text-xl font-semibold my-5">Assignment Letter</h1>

        <HyperLinkButton title="Assignment Letter" href="" />

        <Button
          className="w-48 py-4 self-center mt-4 bg-light_brown hover:bg-dark_brown disabled:bg-transparent disabled:text-dark_brown disabled:font-bold disabled:border-2 disabled:border-dark_brown"
          onClick={(e) => handleSubmit(e)}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
