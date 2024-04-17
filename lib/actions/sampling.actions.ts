"use server"

import axios from "axios"
import { BaseApiResponse } from "../models/baseApiResponse.model"
import { Sampling } from "../models/sampling.model"
import { Project } from "../models/project.model"
import { revalidatePath } from "next/cache"
import { User } from "../models/user.model"
import { DateRange } from "react-day-picker"

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
      `${apiBaseUrl}/projects/get-project-by-division/`,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: { division: division, status: "RUNNING" },
      }
    )

    return response.data as BaseApiResponse<[Project]>
  } catch (error: any) {
    console.error("Error getting sample", error.message)
    return null as unknown as BaseApiResponse<[Project]>
  }
}

export const getLinkFiles = async (
  projectId: string
): Promise<BaseApiResponse<File[]>> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/projects/get-link-files/${projectId}`
    )

    return response.data as BaseApiResponse<File[]>
  } catch (error: any) {
    console.error("Error getting sample", error.message)
    return null as unknown as BaseApiResponse<File[]>
  }
}

export const getProjectsByAcc = async (
  accountId: string
): Promise<BaseApiResponse<[Project]>> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/projects/get-project-by-acc`,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          accountId: accountId,
        },
      }
    )

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

export const getDashboardSampling = async (): Promise<
  BaseApiResponse<Project>
> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/sampling/get-dashboard-sampling/`
    )

    revalidatePath(`/sampling`)

    return response.data as BaseApiResponse<Project>
  } catch (error: any) {
    console.error("Error getting sample", error.message)
    return null as unknown as BaseApiResponse<Project>
  }
}

export const verifySample = async (
  projectId: string,
  status: string,
  sample_id: string
): Promise<BaseApiResponse<Project>> => {
  try {
    const response = await axios.post(`${apiBaseUrl}/sampling/change`, {
      projectId,
      status,
      sample_id,
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
  jadwalSampling: any
): Promise<BaseApiResponse<Project>> => {
  try {
    const response = await axios.post(`${apiBaseUrl}/projects/assign-project`, {
      projectId,
      accountId,
      jadwal_sampling: jadwalSampling,
    })

    revalidatePath(`/sampling/project`) // path sekarang

    return response.data as BaseApiResponse<Project>
  } catch (error: any) {
    console.error("Error getting sample", error.response.data)
    return null as unknown as BaseApiResponse<Project>
  }
}

export const changeDivision = async (
  projectId: string,
  division: string
): Promise<BaseApiResponse<Project>> => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/projects/change-division`,
      {
        projectId,
        division,
      }
    )

    return response.data as BaseApiResponse<Project>
  } catch (err: any) {
    console.error(err.res)
    return null as unknown as BaseApiResponse<Project>
  }
}

export const getAllUser = async (
  division: string,
  role: string = "USER"
): Promise<BaseApiResponse<User[]>> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/sampling/get-all-user/`, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: { role: role },
    })

    return response.data as BaseApiResponse<User[]>
  } catch (error: any) {
    console.error("Error getting user data", error.message)
    return null as unknown as BaseApiResponse<User[]>
  }
}
