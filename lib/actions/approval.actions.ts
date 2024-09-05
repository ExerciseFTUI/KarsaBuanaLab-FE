"use server";

import { BaseApiResponse } from "@/lib/models/baseApiResponse.model";
import { BaseSample } from "@/lib/models/baseSample.model";
import { Project } from "@/lib/models/project.model";
import { ProjectMarketingType } from "@/lib/type";
import axios from "axios";

const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000";

export const getbyStatus = async (
  status: string
): Promise<BaseApiResponse<[ProjectMarketingType]>> => {
  try {
    //TODO: Change the API
    const response = await axios.get(`${apiBaseUrl}/marketing/${status}`);

    // Sort the data by the newest createdAt
    const sortedData = response.data.result.sort(
      (a: ProjectMarketingType, b: ProjectMarketingType) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }
    );

    return {
      ...response.data,
      result: sortedData,
    } as BaseApiResponse<[ProjectMarketingType]>;
  } catch (error: any) {
    console.error(error?.response?.data);
    console.error(`Error getting project ${status}:`, error.message);
    return null as unknown as BaseApiResponse<[ProjectMarketingType]>;
  }
};

export const getProject = async (
  projectId: string
): Promise<BaseApiResponse<Project>> => {
  try {
    //TODO: Change the API
    const response = await axios.get(
      `${apiBaseUrl}/marketing/project/${projectId}`
    );

    // Convert valuasi proyek to string
    if (response.data && response.data.valuasi_proyek !== undefined) {
      // Convert to string explicitly
      const valuasiProyekAsString = String(response.data.valuasi_proyek);
      response.data.valuasi_proyek = valuasiProyekAsString;
    }

    return response.data as BaseApiResponse<Project>;
  } catch (error: any) {
    console.error(`Error getting project with ID ${projectId}:`, error.message);
    return null as unknown as BaseApiResponse<Project>;
  }
};

export const getSample = async (): Promise<BaseApiResponse<[BaseSample]>> => {
  try {
    //TODO: Change the API
    const response = await axios.get(`${apiBaseUrl}/marketing/getSample`);

    return response.data as BaseApiResponse<[BaseSample]>;
  } catch (error: any) {
    console.error("Error getting sample marketing/getSample:", error.message);
    return null as unknown as BaseApiResponse<[BaseSample]>;
  }
};
