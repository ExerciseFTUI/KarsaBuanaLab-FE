"use client"

import React, { MouseEventHandler } from "react"
import useSWR from "swr"
import { ProjectSamplingType } from "@/lib/type"
import { fetcher } from "@/lib/utils"
import ProjectDetails from "../ProjectDetails"
import DocumentList from "../DokumentList"

type fetched = {
  data: ProjectSamplingType
  error: any
  isLoading: any
}

const handleSubmit = (e: any) => e.preventDefault()

export default function Project({ params }: { params: { np: string } }) {
  const { data, error, isLoading }: fetched = useSWR(
    "/api/sampling/sample/" + params.np,
    fetcher
  )

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>Loading...</div>

  const { status } = data

  return (
    <>
      <div className="max-w-lg">
      <ProjectDetails data={data} />
      <DocumentList data={data} />
      </div>
    </>
  )
}
