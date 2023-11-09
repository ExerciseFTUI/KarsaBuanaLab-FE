"use client"

import React, { MouseEventHandler } from "react"
import useSWR from "swr"
import { ProjectSamplingType } from "@/lib/type"
import { object } from "zod"
import ProjectDetails from "./ProjectDetails"
import { Separator } from "@/components/ui/separator"
import DocumentList from "./DokumentList"
import HyperLinkButton from "./HyperlinkButton"
import { Button } from "@/components/ui/button"

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data)
  }
  return JSON.parse(data)
}

type fetched = {
  data: ProjectSamplingType
  error: any
  isLoading: any
}

const handleSubmit = (e: any) => e.preventDefault()

export default function Project({ params }: { params: { np: string } }) {
  const { data, error, isLoading }: fetched = useSWR(
    "/api/sampling/project/" + params.np,
    fetcher
  )

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>Loading...</div>

  const { status } = data

  return (
    <>
      <ProjectDetails data={data} />

      <div className="px-4 py-2 max-w-[35rem] flex flex-col">
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
    </>
  )
}
