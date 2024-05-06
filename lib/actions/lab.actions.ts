"use server";

import axios from "axios";
import { BaseApiResponse } from "../models/baseApiResponse.model";
import { Project } from "../models/project.model";
import { Sampling } from "../models/sampling.model";
import { revalidatePath } from "next/cache";

const apiBaseUrl = process.env.API_BASE_URL + "/lab/";

export async function getLabProjects(): Promise<BaseApiResponse<Project[]>> {
  try {
    const response = await axios.post(apiBaseUrl + "");

    return response.data as BaseApiResponse<Project[]>;
  } catch (error) {
    return [] as unknown as BaseApiResponse<Project[]>;
  }
}

export async function assignStaffDeadline(
  sample_id: string,
  user_id: string[],
  deadline: any,
  projectId: string
): Promise<BaseApiResponse<Project>> {
  try {
    const response = await axios.post(apiBaseUrl + "assign", {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      sample_id,
      user_id: user_id,
      deadline,
    });

    revalidatePath(`/lab/dashboard/${projectId}`);

    return response.data as BaseApiResponse<Project>;
  } catch (error: any) {
    return error.response.data as unknown as BaseApiResponse<Project>;
  }
}

export async function removeStaff(
  sample_id: string,
  user_id: string,
  projectId: string
): Promise<BaseApiResponse<Project>> {
  try {
    const response = await axios.post(apiBaseUrl + "remove", {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      sample_id,
      user_id,
    });

    revalidatePath(`/lab/dashboard/${projectId}`);

    return response.data as BaseApiResponse<Project>;
  } catch (error: any) {
    return error.response.data as unknown as BaseApiResponse<Project>;
  }
}

export async function saveSample(
  projectId: string,
  status: string
): Promise<BaseApiResponse<Project>> {
  try {
    
    const response = await axios.post(
      apiBaseUrl + "change-lab-status", 
      // `http://localhost:8080/lab/change-lab-status`,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      projectId,
      status,
    });

    revalidatePath(`/lab/dashboard/`);

    return response.data as BaseApiResponse<Project>;
  } catch (error: any) {
    return error.response.data as unknown as BaseApiResponse<Project>;
  }
}
