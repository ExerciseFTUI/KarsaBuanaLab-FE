"use server";
import axios from "axios";
import { Project } from "../models/project.model";
import { BaseApiResponse } from "../models/baseApiResponse.model";
import { BaseSample } from "../models/baseSample.model";
import { revalidatePath } from "next/cache";
import { PPLHPReceiveType } from "../type";

const apiBaseUrl = process.env.API_BASE_URL || "";

type ChangeStatusResponse = {
  message: string;
  data: Project;
};

export const getProject = async (projectId: string): Promise<Project[]> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/marketing/running`);
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
    return response.data.result; // Access 'result' field
  } catch (error: any) {
    console.error(
      `Error getting link files for project with ID ${projectId}:`,
      error.message
    );
    return null;
  }
};

export const getPPLHPDashboard = async (): Promise<PPLHPReceiveType[]> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/sampling/get-receive-dashboard`
    );

    return response.data.result;
  } catch (error: any) {
    console.error(`Error getting PPLHP dashboard:`, error.message);
    return null as unknown as PPLHPReceiveType[];
  }
};

export const getPplhpByStatus = async (status: string): Promise<Project[]> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/projects/get-pplhp-by-status/${status}`
    );
    return response.data.data;
  } catch (error: any) {
    console.error(`Error getting PPLHP by status ${status}:`, error.message);
    return null as unknown as Project[];
  }
};

export const submitDetailPPLHP = async (
  projectId: string,
  samplingId: string,
  sampling: any
): Promise<any> => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/sampling/update-samplestatus-and-date`,
      // `http://localhost:8080/sampling/update-samplestatus-and-date`,
      {
        projectId,
        samplingId,
        sampling,
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      `Error submitting detail for project with ID ${projectId} and sampling ID ${samplingId}:`,
      error.message
    );
    return null as unknown as any;
  }
};

export const changeToDraft = async (id: string): Promise<string> => {
  try {
    const response = await axios.post(
      `https://karsalab.netlabdte.com/projects/change-to-draft/${id}`
    );

    revalidatePath("/pplhp/receive");
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

    revalidatePath("/pplhp/draft");
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
    revalidatePath("/pplhp/review");
    return response.data;
  } catch (error: any) {
    console.error(
      `Error changing to finished for project with ID ${id}:`,
      error.message
    );
    return null as unknown as string;
  }
};

export const setDeadlineLHP = async (
  projectId: string,
  deadline: { from: string; to: string } // Specify type of deadline
): Promise<Project> => {
  try {
    const response = await axios.post(
      `https://karsalab.netlabdte.com/projects/set-deadline-lhp`,
      {
        projectId,
        deadline, // Pass the deadline object directly
      }
    );

    // Assuming the response contains the updated project object
    return response.data.message;
  } catch (error: any) {
    console.error(
      `Error setting deadline for project with ID ${projectId}:`,
      error.message
    );
    throw new Error(error.message);
  }
};

export const getProjectDetails = async (projectId: string): Promise<any> => {
  try {
    const response = await axios.get(
      `https://karsalab.netlabdte.com/projects/get-lhp/${projectId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      `Error fetching project details for ID ${projectId}:`,
      error.message
    );
    throw new Error(error.message);
  }
};
