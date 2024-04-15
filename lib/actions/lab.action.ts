"use server";

import axios from "axios";
import { Project } from "../models/project.model";
import {
  LabDashboardType,
  LabInputDokumenAnswerType,
  sampleAnswer,
} from "../type";
import ProjectD from "@/components/sampling/projectDetail";

const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000";
const clientBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const getProjectLab = async () : Promise<Project[]> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/lab/`);
    
    return response.data.result; // Access 'result' field
  } catch (error: any) {
    console.error(`Error getting project :`, error.message);
    return null as unknown as Project[];
  }
};

export const getProjectBy = async (userId: string): Promise<any> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/lab/get-project-by-lab`, {
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

export const getLabDashboardProject = async (
  projectId: string,
  userId: string
): Promise<any> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/sampling/get-sampling-details`,
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

export const submitLab = async (
  projectId: string,
  samples: sampleAnswer[]
): Promise<any> => {
  try {
    const response = await axios.post(`${clientBaseUrl}/lab/submit-lab`, {
      projectId,
      samples,
    });
    return response.data;
  } catch (error: any) {
    console.error(`Error submitting input document:`, error.message);
    console.log(error?.response?.data);
    return null as unknown;
  }
};
