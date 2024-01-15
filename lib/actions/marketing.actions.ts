import axios from "axios";
import { Project } from "../models/project.model";
import { BaseApiResponse } from "../models/baseApiResponse.model";
import { BaseSample } from "../models/baseSample.model";
import { revalidatePath } from "next/cache";

interface APIProject {
  client_name: string;
  project_name: string;
  alamat_kantor: string;
  alamat_sampling: string;
  surel: string;
  contact_person: string;
  regulation: string;
  sampling_list: string;
  assigned_to: string;
}

interface ProjectResult {
  id: string;
  url: string;
  project: Project;
}

interface DashboardResult {
  approvedOffer: number;
  totalProject: number;
  totalClient: number;
  projectCancelled: number;
  projectRunning: number;
  projectFinished: number;
  offerPerMonth: number;
}

export const createProject = async (
  files: any,
  body: APIProject
): Promise<BaseApiResponse<ProjectResult>> => {
  try {
    if (
      !body.client_name ||
      !body.project_name ||
      !body.alamat_kantor ||
      !body.alamat_sampling ||
      !body.surel ||
      !body.contact_person ||
      !body.regulation ||
      !body.sampling_list ||
      !body.assigned_to
    ) {
      throw new Error("Please provide all required fields");
    }

    const response = await axios.post("/api/createProject", { files, body });

    return response.data as BaseApiResponse<ProjectResult>;
  } catch (error: any) {
    console.error("Error creating project:", error.message);
    throw new Error("Failed to create project");
  }
};

export const getSample = async (): Promise<BaseApiResponse<[BaseSample]>> => {
  try {
    const response = await axios.get(`/api/getSample`);

    return response.data as BaseApiResponse<[BaseSample]>;
  } catch (error: any) {
    console.error("Error getting sample:", error.message);
    throw new Error("Failed to get sample");
  }
};

export const getDashboard = async (): Promise<
  BaseApiResponse<DashboardResult>
> => {
  try {
    const response = await axios.get(`/api/Dashboard`);

    return response.data as BaseApiResponse<DashboardResult>;
  } catch (error: any) {
    console.error("Error getting Dashboard:", error.message);
    throw new Error("Failed to get dashboard");
  }
};
