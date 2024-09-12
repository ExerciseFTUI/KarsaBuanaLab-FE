import axios from "axios";
import { Project } from "../models/project.model";
import { BaseApiResponse } from "../models/baseApiResponse.model";
import { BaseSample } from "../models/baseSample.model";

const apiBaseUrl = process.env.API_BASE_URL || "";

export const getProject = async (projectId: string): Promise<Project[]> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/marketing/running`);
    return response.data.result; // Access 'result' field
  } catch (error: any) {
    console.error(`Error getting project with ID ${projectId}:`, error.message);
    return null as unknown as Project[];
  }
};

export const getDetailPPLHP = async (
  projectId: string,
  samplingId: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/sampling/get-project-sample-details`,
      // `http://localhost:8080/sampling/get-project-sample-details`,
      {
        projectId,
        samplingId,
      }
    );

    return response.data.result;
  } catch (error: any) {
    console.error(
      `Error getting detail for project with ID ${projectId} and sampling ID ${samplingId}:`,
      error.message
    );
    return null;
  }
};

export const getReceiveDetails = async (projectId: string): Promise<any> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/sampling/get-details-pplhp/${projectId}`
    );

    return response.data.result; // Access 'result' field
  } catch (error: any) {
    console.error(
      `Error getting detail for project with ID ${projectId}:`,
      error.message
    );
    return null;
  }
};

export const getLinkFiles = async (projectId: string): Promise<any> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/projects/get-link-files/${projectId}`
    );
    return response.data.result; // Access 'result' field
  } catch (error: any) {
    console.error(
      `Error getting link files for project with ID ${projectId}:`,
      error.message
    );
    return null;
  }
};
