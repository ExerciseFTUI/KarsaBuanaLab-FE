"use server"

import axios from "axios"
import { BaseApiResponse } from "../models/baseApiResponse.model"
import { Sampling } from "../models/sampling.model"
import { Project } from "../models/project.model"
import { revalidatePath } from "next/cache"

const apiBaseUrl = process.env.API_BASE_URL

export const getSampleById = async (
  year: string,
  sampleId: string
): Promise<BaseApiResponse<Sampling>> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/sampling/get/${year}/${sampleId}`
    )

    return response.data as BaseApiResponse<Sampling>
  } catch (error: any) {
    console.error("Error getting sample", error.message)
    return {
      message: "Failed to get sample",
      result: null,
    } as unknown as BaseApiResponse<Sampling>
  }
}

export const getProjectByDivision = async (
  division: string
): Promise<BaseApiResponse<[Project]>> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/projects/get-project-by-division/${division}`
    )

    return response.data as BaseApiResponse<[Project]>
  } catch (error: any) {
    console.error("Error getting sample", error.message)
    return null as unknown as BaseApiResponse<[Project]>
  }
}

export const getSampleByAccount = async (
  year: string,
  accountId: string
): Promise<BaseApiResponse<[Project]>> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/sampling/sample/${year}`, {
      data: {
        accountId: accountId,
      },
    })

    return response.data as BaseApiResponse<[Project]>
  } catch (error: any) {
    console.error("Error getting sample", error.message)
    return null as unknown as BaseApiResponse<[Project]>
  }
}

export const sampleAssignment = async (
  sampleId: string,
  accountId: string
): Promise<BaseApiResponse<Project>> => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/sampling/assign/${sampleId}`,
      {
        accountId: accountId,
      }
    )

    revalidatePath(`/sampling/project/${sampleId}`) // path sekarang

    return response.data as BaseApiResponse<Project>
  } catch (error: any) {
    console.error("Error getting sample", error.message)
    return null as unknown as BaseApiResponse<Project>
  }
}

export const verifySample = async (
  projectId: string,
  status: string,
  sampleName: string
): Promise<BaseApiResponse<Project>> => {
  try {
    const response = await axios.post(`${apiBaseUrl}/sampling/change`, {
      projectId,
      status,
      sampleName,
    })

    revalidatePath(`/sampling/sample/${projectId}`) // path sekarang

    return response.data as BaseApiResponse<Project>
  } catch (error: any) {
    console.error("Error getting sample", error.message)
    return null as unknown as BaseApiResponse<Project>
  }
}

export const assignProject = async (
  projectId: string,
  accountId: string[],
  jadwalSampling: string
): Promise<BaseApiResponse<Project>> => {
  try {
    const response = await axios.post(`${apiBaseUrl}/projects/assign-project`, {
      projectId,
      accountId,
      jadwalSampling,
    })

    revalidatePath(`/sampling/project/${projectId}`) // path sekarang

    return response.data as BaseApiResponse<Project>
  } catch (error: any) {
    console.error("Error getting sample", error.message)
    return null as unknown as BaseApiResponse<Project>
  }
}
