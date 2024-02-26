import axios from "axios";
import { Project } from "../models/project.model";
import { BaseApiResponse } from "../models/baseApiResponse.model";
import { BaseSample } from "../models/baseSample.model";

const apiBaseUrl = process.env.API_BASE_URL || "";

type ChangeStatusResponse = {
  message: string;
  data: Project;
};

export const getProject = async (projectId: string): Promise<Project[]> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/marketing/running`);
    console.log(response.data.result);
    return response.data.result; // Access 'result' field
  } catch (error: any) {
    console.error(`Error getting project with ID ${projectId}:`, error.message);
    return null as unknown as Project[];
  }
};

export const getLinkFiles = async (projectId: string): Promise<any> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/projects/get-link-files/${projectId}`
    );
    console.log(response.data.result);
    return response.data.result; // Access 'result' field
  } catch (error: any) {
    console.error(
      `Error getting link files for project with ID ${projectId}:`,
      error.message
    );
    return null;
  }
};

export const getPplhpByStatus = async (status: string): Promise<Project[]> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/projects/get-pplhp-by-status/${status}`
    );
    console.log(response.data);
    return response.data.data;
  } catch (error: any) {
    console.error(`Error getting PPLHP by status ${status}:`, error.message);
    return null as unknown as Project[];
  }
};

export const changeToDraft = async (id: string): Promise<string> => {
  try {
    const response = await axios.post(
      `https://karsalab.netlabdte.com/projects/change-to-draft/${id}`
    );
    console.log(response.data.message);
    return response.data.message;
  } catch (error: any) {
    console.error(
      `Error changing to draft for project with ID ${id}:`,
      error.message
    );
    return null as unknown as string;
  }
};

export const changeToReview = async (id: string): Promise<String> => {
  try {
    const response = await axios.post(
      `https://karsalab.netlabdte.com/projects/change-to-review/${id}`
    );
    console.log(response.data.message);
    return response.data.message;
  } catch (error: any) {
    console.error(
      `Error changing to review status for project with ID ${id}:`,
      error.message
    );
    return null as unknown as string;
  }
};

export const changeToFinished = async (id: string): Promise<String> => {
  try {
    const response = await axios.post(
      `https://karsalab.netlabdte.com/projects/change-to-finished/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      `Error changing to finished for project with ID ${id}:`,
      error.message
    );
    return null as unknown as string;
  }
};
