"use server";

import axios from "axios";
import { BaseApiResponse } from "../models/baseApiResponse.model";
import { Project } from "../models/project.model";
import { Sampling } from "../models/sampling.model";
import { revalidatePath } from "next/cache";
import {
  LabDashboardPageColumnsType,
  LabDashboardType,
  LabInputDokumenAnswerType,
  sampleAnswer,
} from "../type";

const apiBaseUrl =
  process.env.API_BASE_URL + "/lab/" || "http://localhost:5000/lab/";
const clientBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function getLabProjects(): Promise<BaseApiResponse<Project[]>> {
  try {
    const response = await axios.post(apiBaseUrl + "");

    return response.data as BaseApiResponse<Project[]>;
  } catch (error) {
    return [] as unknown as BaseApiResponse<Project[]>;
  }
}

export async function labDashboard(): Promise<
  BaseApiResponse<LabDashboardPageColumnsType[]>
> {
  try {
    const response = await axios.get(apiBaseUrl + "get-spv-dashboard");
    console.log("resp", response.data.result);

    return response.data as BaseApiResponse<LabDashboardPageColumnsType[]>;
  } catch (error) {
    return [] as unknown as BaseApiResponse<LabDashboardPageColumnsType[]>;
  }
}

export async function staffDashboard(): Promise<
  BaseApiResponse<LabDashboardPageColumnsType[]>
> {
  try {
    const response = await axios.get(apiBaseUrl + "get-staff-dashboard");
    return response.data as BaseApiResponse<LabDashboardPageColumnsType[]>;
  } catch (error) {
    return [] as unknown as BaseApiResponse<LabDashboardPageColumnsType[]>;
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

    revalidatePath(`/lab/dashboard/${projectId}/${sample_id}`);

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
      }
    );

    revalidatePath(`/lab/dashboard/`);

    return response.data as BaseApiResponse<Project>;
  } catch (error: any) {
    return error.response.data as unknown as BaseApiResponse<Project>;
  }
}

export const getProjectLab = async (): Promise<Project[]> => {
  try {
    const response = await axios.get(apiBaseUrl);

    return response.data.result; // Access 'result' field
  } catch (error: any) {
    console.error(`Error getting project :`, error.message);
    return null as unknown as Project[];
  }
};

export const getProjectBy = async (userId: string): Promise<any> => {
  try {
    const response = await axios.get(apiBaseUrl + "get-project-by-lab", {
      data: {
        userId: userId,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data.labAssignedProjects;
  } catch (error: any) {
    console.error(`Error getting project with ID ${userId}:`, error.message);
    return null as unknown;
  }
};

export const submitLab = async (
  projectId: string,
  samples: sampleAnswer[]
): Promise<any> => {
  try {
    const response = await axios.post(
      apiBaseUrl + "submit-lab",
      // `http://localhost:8080/lab/submit-lab`,
      {
        projectId,
        samples,
      }
    );

    revalidatePath(`/lab/dashboard/${projectId}`);

    return response.data;
  } catch (error: any) {
    console.error(`Error submitting input document:`, error.message);
    return null as unknown;
  }
};

export const submitLabRev = async (
  sampleId: string,
  samples: sampleAnswer
): Promise<any> => {
  try {
    const response = await axios.post(
      apiBaseUrl + "submit-lab-rev",
      // `http://localhost:8080/lab/submit-lab-rev`,
      {
        sampleId,
        samples,
      }
    );

    revalidatePath(`/lab/dashboard/${sampleId}`);

    return response.data;
  } catch (error: any) {
    console.error(`Error submitting input document:`, error.message);
    return null as unknown;
  }
};
