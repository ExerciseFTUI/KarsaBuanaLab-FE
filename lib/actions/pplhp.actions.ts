import axios from "axios";
import { Project } from "../models/project.model";
import { BaseApiResponse } from "../models/baseApiResponse.model";
import { BaseSample } from "../models/baseSample.model";

const apiBaseUrl = process.env.API_BASE_URL || "";

export const getProject = async (projectId: string): Promise<Project[]> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/marketing/running`);
    console.log(response.data.result)
    return response.data.result; // Access 'result' field
  } catch (error: any) {
    console.error(`Error getting project with ID ${projectId}:`, error.message);
    return null as unknown as Project[]
  }
};
