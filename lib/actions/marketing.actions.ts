"use server";

import axios from "axios";
import { Project } from "../models/project.model";
import { BaseApiResponse } from "../models/baseApiResponse.model";
import { BaseSample } from "../models/baseSample.model";
import { ProjectMarketingType, ProjectType } from "../type";
import { revalidatePath } from "next/cache";

const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000";

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
  body: any,
  files?: any // Assuming files is a File or an array of File objects
) => {
  try {
    if (
      !body.client_name ||
      !body.project_name ||
      !body.alamat_kantor ||
      !body.alamat_sampling ||
      !body.surel ||
      !body.contact_person ||
      !body.regulation_list ||
      !body.sampling_list
      //      || !body.assigned_to
    ) {
      throw new Error("Please provide all required fields");
    }

    var bodyFormData = new FormData();

    // Append all fields from the body object to bodyFormData
    Object.keys(body).forEach((key) => {
      // Check if the current key is an array
      if (Array.isArray(body[key])) {
        // If array, iterate and append each item to bodyFormData
        body[key].forEach((item: any, index: any) => {
          bodyFormData.append(`${key}[${index}]`, item);
        });
      } else {
        // If not an array, append as usual
        bodyFormData.append(key, body[key]);
      }
    });

    // Append files to bodyFormData
    if (files && files.length > 0) {
      if (Array.isArray(files)) {
        files.forEach((file, index) => {
          bodyFormData.append(`file${index}`, file);
        });
      } else {
        bodyFormData.append("file", files);
      }
    }

    console.log(bodyFormData);

    const response = await axios.post(
      `${apiBaseUrl}/projects/create`,
      bodyFormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    revalidatePath("/marketing/running");

    // return response.data as BaseApiResponse<ProjectResult>;
    return "Success";
  } catch (error: any) {
    console.error("Error creating project:", error.message);
    return null as unknown as BaseApiResponse<ProjectResult>;
  }
};

export const updateProject = async (
  body: any,
  files?: any // Assuming files is a File or an array of File objects
) => {
  try {
    // if (
    //   !body.client_name ||
    //   !body.project_name ||
    //   !body.alamat_kantor ||
    //   !body.alamat_sampling ||
    //   !body.surel ||
    //   !body.contact_person ||
    //   !body.regulation ||
    //   !body.sampling_list
    //   //      || !body.assigned_to
    // ) {
    //   throw new Error("Please provide all required fields");
    // }

    var bodyFormData = new FormData();

    // Append all fields from the body object to bodyFormData
    Object.keys(body).forEach((key) => {
      bodyFormData.append(key, body[key]);
    });

    // Append files to bodyFormData
    if (files || files.length > 0) {
      if (Array.isArray(files)) {
        files.forEach((file, index) => {
          bodyFormData.append(`file${index}`, file);
        });
      } else {
        bodyFormData.append("file", files);
      }
    }

    console.log("Masuk sini");

    const response = await axios.put(
      `${apiBaseUrl}/projects/edit`,
      bodyFormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    revalidatePath("/marketing/running");

    // return response.data as BaseApiResponse<ProjectResult>;
    return "Success";
  } catch (error: any) {
    console.error("Error updating project:", error.message);
    return null as unknown as BaseApiResponse<ProjectResult>;
  }
};

export const getSample = async (): Promise<BaseApiResponse<[BaseSample]>> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/marketing/getSample`);

    return response.data as BaseApiResponse<[BaseSample]>;
  } catch (error: any) {
    console.error("Error getting sample:", error.message);
    return null as unknown as BaseApiResponse<[BaseSample]>;
  }
};

// export const getDashboard = async (): Promise<
//   BaseApiResponse<DashboardResult>
// > => {
//   try {
//     const response = await axios.get(`${apiBaseUrl}/marketing/dashboard`);

//     return response.data as BaseApiResponse<DashboardResult>;
//   } catch (error: any) {
//     console.error("Error getting Dashboard:", error.message);
//     throw new Error("Failed to get dashboard");
//   }
// };

//Berhasil
export const getProject = async (
  projectId: string
): Promise<BaseApiResponse<Project>> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/marketing/project/${projectId}`
    );
    return response.data as BaseApiResponse<Project>;
  } catch (error: any) {
    console.error(`Error getting project with ID ${projectId}:`, error.message);
    return null as unknown as BaseApiResponse<Project>;
  }
};

//Berhasil
export const getbyStatus = async (
  status: string
): Promise<BaseApiResponse<[ProjectMarketingType]>> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/marketing/${status}`);
    return response.data as BaseApiResponse<[ProjectMarketingType]>;
  } catch (error: any) {
    console.error(`Error getting project  ${status}:`, error.message);
    // throw new Error(`Failed to get project  ${status}`);
    return null as unknown as BaseApiResponse<[ProjectMarketingType]>;
  }
};

export const testing = async () => {
  try {
    const body = {
      title: "foo",
      body: "bar",
      userId: 1,
    };

    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      body
    );

    // console.log(response.data);
    revalidatePath("/marketing/running");
    return body;
  } catch (error: any) {
    console.error(`Error getting project`, error.message);
  }
};
