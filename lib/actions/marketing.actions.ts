"use server";

import axios from "axios";
import { Project } from "../models/project.model";
import { BaseApiResponse } from "../models/baseApiResponse.model";
import { BaseSample } from "../models/baseSample.model";
import { ProjectMarketingType, ProjectType } from "../type";
import { revalidatePath } from "next/cache";
import { string } from "zod";

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
  offerPerMonth: {
    offerPerMonth: Array<{ month: string; sales: number }[]>;
    totalValuation: number;
  };
  forPie: {
    totalForRunning: number;
    totalForCancelled: number;
    totalForFinished: number;
    totalProjectReal: number;
  };
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
    console.error(error.response?.data?.message);
    console.error("Error creating project:", error.message);
    return null as unknown as BaseApiResponse<ProjectResult>;
  }
};

export const createProjectJson = async (body: any) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/projects/createJSON`,
      body
    );
    revalidatePath("/marketing/running");
    return response.data as Project;
  } catch (error: any) {
    console.error(error.response?.data?.message);
    console.error("Error creating project:", error.message);
    return null;
  }
};

export const updateProject = async (
  body: any,
  files?: any // Assuming files is a File or an array of File objects
) => {
  try {
    var bodyFormData = new FormData();

    // Convert valuasi_proyek to integer
    if (body.valuasi_proyek !== undefined) {
      body.valuasi_proyek = parseInt(body.valuasi_proyek, 10);
    }

    // Auto increment while update the project
    body.jumlah_revisi += 1;

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

export const getDashboard = async (): Promise<
  BaseApiResponse<DashboardResult>
> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/marketing/dashboard`);

    // Calculate total sales for projectRunning
    const totalForRunning = response.data.result.projectRunning.reduce(
      (totalMonth: any, monthData: any) => totalMonth + monthData.sales,
      0
    );

    // Calculate total sales for projectFinished
    const totalForFinished = response.data.result.projectFinished.reduce(
      (totalMonth: any, monthData: any) => totalMonth + monthData.sales,
      0
    );

    // Calculate total sales for projectCancelled
    const totalForCancelled = response.data.result.projectCancelled.reduce(
      (totalMonth: any, monthData: any) => totalMonth + monthData.sales,
      0
    );

    // Calculate total project real
    const totalProjectReal =
      totalForCancelled + totalForFinished + totalForRunning;

    // Add the calculated totals to the response
    const updatedResponse = {
      ...response.data,
      result: {
        ...response.data.result,
        forPie: {
          totalForRunning,
          totalForFinished,
          totalForCancelled,
          totalProjectReal,
        },
      },
    };

    return updatedResponse as BaseApiResponse<DashboardResult>;
  } catch (error: any) {
    console.error("Error getting api because : ", error.message);
    return null as unknown as BaseApiResponse<DashboardResult>;
  }
};

//Berhasil
export const getProject = async (
  projectId: string
): Promise<BaseApiResponse<Project>> => {
  try {
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

//Update Project Info
export const updateProjectInfo = async (body: any) => {
  try {
    //Call API
    const response = await axios.put(`${apiBaseUrl}/projects/edit`, body);
    if (response.data.result) {
      //Refetch
      revalidatePath("/marketing/running");
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.error(`Error update projectInfo :`, error.message);
    return false;
  }
};

//Update Project Sample
export const updateProjectSample = async (body: any, projectId: string) => {
  try {
    //Call API
    const response = await axios.put(
      `${apiBaseUrl}/projects/editSamples/${projectId}`,
      body
    );
    if (response.data.result) {
      //Refetch
      revalidatePath("/marketing/running");
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.error(`Error update projectSample :`, error.message);
    return false;
  }
};

//Update Project file
// export const updateProjectFile = async (id: string, files: any) => {
//   var bodyFormData = new FormData();
//   bodyFormData.append("_id", id);

//   // Append each file to the FormData object
//   for (let i = 0; i < files.length; i++) {
//     bodyFormData.append("files", files[i]);
//   }

//   console.log(bodyFormData);

//   try {
//     //Call API
//     const response = await axios.put(
//       `${apiBaseUrl}/projects/editFiles`,
//       bodyFormData,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );
//     if (response.data.result) {
//       //Refetch
//       revalidatePath("/marketing/running");
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error: any) {
//     console.error(`Error update projectFile :`, error.message);
//     return false;
//   }
// };

// export const testing = async () => {
//   try {
//     const body = {
//       title: "foo",
//       body: "bar",
//       userId: 1,
//     };

//     const response = await axios.post(
//       "https://jsonplaceholder.typicode.com/posts",
//       body
//     );

//     // console.log(response.data);
//     revalidatePath("/marketing/running");
//     return body;
//   } catch (error: any) {
//     console.error(`Error getting project`, error.message);
//   }
// };
