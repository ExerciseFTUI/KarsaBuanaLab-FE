"use client";
import axios from "axios";
import { Project } from "../models/project.model";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const createProjectJsonClient = async (body: any) => {
  try {
    const response = await axios.post(
      // `http://localhost:8080/projects/createJSON`,
      `${apiBaseUrl}/projects/createJSON`,
      body
    );

    return response.data.result.project as Project;
  } catch (error: any) {
    console.error(error.response?.data?.message);
    console.error("Error creating project:", error.message);
    throw new error("Error creating project:", error.message);
    // return null;
  }
};

export const addBaseSample = async (
  sampleName: string,
  file1: any,
  file2: any
) => {
  var bodyFormData = new FormData();
  bodyFormData.append("sample_name", sampleName);

  //Add JSA File
  bodyFormData.append("files", file1);
  //Add template file
  bodyFormData.append("files", file2);

  try {
    // throw new Error("Error update projectFile :");
    //Call API
    const response = await axios.post(
      `${apiBaseUrl}/base-sample/addBaseSample`,
      bodyFormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (response.data.result) {
      return response.data.result;
    } else {
      return null;
    }
  } catch (error: any) {
    {
      error.response.data
        ? console.error(error.response.data)
        : console.error(`Error update projectFile :`, error.message);
    }
    // throw new Error(error.message);
    return null;
  }
};

export const getProjectClient = async (projectId: string) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/marketing/project/65b75f8dc0bdd92b29e81ad0`
    );

    // Convert valuasi proyek to string
    if (response.data && response.data.valuasi_proyek !== undefined) {
      // Convert to string explicitly
      const valuasiProyekAsString = String(response.data.valuasi_proyek);
      response.data.valuasi_proyek = valuasiProyekAsString;
    }

    return response.data;
  } catch (error: any) {
    console.error(`Error getting project with ID ${projectId}:`, error.message);
    return null;
  }
};

//Update Project file
export const updateProjectFile = async (id: string, files: any) => {
  var bodyFormData = new FormData();
  bodyFormData.append("_id", id);

  // Append each file to the FormData object
  for (let i = 0; i < files.length; i++) {
    bodyFormData.append("files", files[i]);
  }

  try {
    const response = await axios.put(
      `${apiBaseUrl}/projects/addFiles`,
      bodyFormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (response.data.result) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.error(error?.response?.data);
    console.error(`Error update projectFile :`, error.message);
    throw new Error(error.message);
  }
};

//Update Project file
export const deleteProjectFile = async (id: string, file_id: string) => {
  const body = {
    _id: id,
    file_id: file_id,
  };

  try {
    const response = await axios.put(`${apiBaseUrl}/projects/removeFile`, body);
    if (response.data.result) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.error(error.response.data);
    console.error(`Error delete projectFile :`, error.message);
  }
};
