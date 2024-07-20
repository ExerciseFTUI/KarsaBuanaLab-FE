"use server";

import axios from "axios";
import { BaseApiResponse } from "../models/baseApiResponse.model";
import { DashboardSampling, Sampling } from "../models/sampling.model";
import { Project } from "../models/project.model";
import { revalidatePath } from "next/cache";
import { User } from "../models/user.model";
import { DateRange } from "react-day-picker";

const apiBaseUrl = process.env.API_BASE_URL;

export const getSampleById = async (
  year: string,
  sampleId: string
): Promise<BaseApiResponse<Sampling>> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/sampling/get/${year}/${sampleId}`
    );

    return response.data as BaseApiResponse<Sampling>;
  } catch (error: any) {
    console.error(
      "Error getting sample sampling/get/year/sampleId",
      error.message
    );
    return {
      message: "Failed to get sample",
      result: null,
    } as unknown as BaseApiResponse<Sampling>;
  }
};

export const getProjectByDivision = async (
  division: string
): Promise<BaseApiResponse<[Project]>> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/projects/get-project-by-division/`,
      // `http://localhost:8080/projects/get-project-by-division/`,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: { division: division, status: "RUNNING" },
      }
    );

    return response.data as BaseApiResponse<[Project]>;
  } catch (error: any) {
    console.error(
      "Error getting sample /projects/get-project-by-division/",
      error.message
    );
    return null as unknown as BaseApiResponse<[Project]>;
  }
};

export const getLinkFiles = async (
  projectId: string
): Promise<BaseApiResponse<File[]>> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/projects/get-link-files/${projectId}`
    );

    return response.data as BaseApiResponse<File[]>;
  } catch (error: any) {
    console.error(
      "Error getting sample /projects/get-link-files/${projectId}",
      error.message
    );
    return null as unknown as BaseApiResponse<File[]>;
  }
};

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
    );

    return response.data as BaseApiResponse<[Project]>;
  } catch (error: any) {
    console.error(
      "Error getting sample /projects/get-project-by-acc",
      error.message
    );
    return null as unknown as BaseApiResponse<[Project]>;
  }
};

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
    );

    revalidatePath(`/sampling/project/${sampleId}`); // path sekarang

    return response.data as BaseApiResponse<Project>;
  } catch (error: any) {
    console.error(
      "Error getting sample /sampling/assign/${sampleId}",
      error.message
    );
    return null as unknown as BaseApiResponse<Project>;
  }
};

export const getDashboardSampling = async (): Promise<
  BaseApiResponse<DashboardSampling[]>
> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/sampling/get-dashboard-sampling/`
      // `http://localhost:8080/sampling/get-dashboard-sampling/`
    );

    revalidatePath(`/sampling`);

    return response.data as BaseApiResponse<DashboardSampling[]>;
  } catch (error: any) {
    console.error(
      "Error getting sample /sampling/get-dashboard-sampling/",
      error.message
    );
    return null as unknown as BaseApiResponse<DashboardSampling[]>;
  }
};

export const verifySample = async (
  projectId: string,
  status: string,
  sample_id: string
): Promise<BaseApiResponse<Project>> => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/sampling/change`,
      // `http://localhost:8080/sampling/change`,
      {
        projectId,
        status,
        sample_id,
      }
    );

    revalidatePath(`/sampling/sample/${projectId}`); // path sekarang

    return response.data as BaseApiResponse<Project>;
  } catch (error: any) {
    console.error("Error getting sample /sampling/change", error.message);
    return null as unknown as BaseApiResponse<Project>;
  }
};

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
    });

    revalidatePath(`/sampling/project`); // path sekarang

    return response.data as BaseApiResponse<Project>;
  } catch (error: any) {
    console.error(
      "Error getting sample /projects/assign-project",
      error.response.data
    );
    return null as unknown as BaseApiResponse<Project>;
  }
};

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
    );

    return response.data as BaseApiResponse<Project>;
  } catch (err: any) {
    console.error(err.res);
    return null as unknown as BaseApiResponse<Project>;
  }
};

export const getAllUser = async (
  division: string,
  role: string = "USER"
): Promise<BaseApiResponse<User[]>> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/sampling/get-all-user/`, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: { role: role },
    });

    return response.data as BaseApiResponse<User[]>;
  } catch (error: any) {
    console.error("Error getting user data", error.message);
    return null as unknown as BaseApiResponse<User[]>;
  }
};

export const getLabDashboardProject = async (
  projectId: string,
  userId: string
): Promise<any> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/sampling/get-sampling-details`,
      // `http://localhost:8080/sampling/get-sampling-details`,
      {
        data: {
          projectId: projectId,
          userId: userId,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.result; // Access 'result' field
  } catch (error: any) {
    console.error(`Error getting project with ID ${projectId}:`, error.message);
    return null as unknown;
  }
};

export const getChoiceParams = async (
  projectId: string,
  userId: string
): Promise<any> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/sampling/get-parameter`,
      // `http://localhost:8080/sampling/get-parameter`,
      {
        data: {
          projectId: projectId,
          userId: userId,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.result; // Access 'result' field
  } catch (error: any) {
    console.error(`Error getting project with ID ${projectId}:`, error.message);
    return null as unknown;
  }
};

export const getChoiceParamsRev = async (
  projectId: string,
  sampleId: string
): Promise<any> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/sampling/get-parameter-rev`,
      // `http://localhost:8080/sampling/get-parameter-rev`,
      {
        data: {
          projectId: projectId,
          sampleId: sampleId,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.result; // Access 'result' field
  } catch (error: any) {
    console.error(`Error getting project with ID ${projectId}:`, error.message);
    return null as unknown;
  }
};

export const getSampleForLab = async (
  projectId: string,
  sampleId: string
): Promise<any> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/sampling/get-input-sample-for-lab`,
      // `http://localhost:8080/sampling/get-input-sample-for-lab`,
      {
        data: {
          projectId: projectId,
          sampleId: sampleId,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.result; // Access 'result' field
  } catch (error: any) {
    console.error(`Error getting project with ID ${projectId}:`, error.message);
    return null as unknown;
  }
};
