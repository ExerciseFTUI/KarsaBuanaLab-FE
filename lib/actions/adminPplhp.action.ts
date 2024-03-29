"use server";

import axios from "axios";

const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000";

export const getProjectAdminPplhp = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/projects/get-all-lhp`);

    if (response.data) {
      return response.data.projectList;
    }
  } catch (error: any) {
    console.error(`Error getProjectAdminPplhp :`, error.message);
    console.error(`Error getProjectAdminPplhp :`, error?.response?.data);
    return null;
  }
};

export const getSingleProjectAdminPplhp = async (id: string) => {
  try {
    //TODO: CHANGE THE URL
    const response = await axios.get(`${apiBaseUrl}/projects/get-lhp/${id}`);

    if (response.data) {
      return response.data.project;
    }
  } catch (error: any) {
    console.error(`Error getSingleProjectAdminPplhp :`, error.message);
    console.error(`Error getSingleProjectAdminPplhp :`, error?.response?.data);
    return null;
  }
};

export const revisionPplhp = async (id: string, body: any, note: string) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/projects/change-to-draft/${id}`,
      body
    );

    if (response.data) {
      return response.data;
    }
  } catch (error: any) {
    console.error(`Error revisionPplhp :`, error.message);
    console.error(`Error revisionPplhp :`, error?.response?.data);
    return null;
  }
};

export const finishPplhp = async (id: string, body: any, note: string) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/projects/change-to-finished/${id}`,
      body
    );

    if (response.data) {
      return response.data;
    }
  } catch (error: any) {
    console.error(`Error revisionPplhp :`, error.message);
    console.error(`Error revisionPplhp :`, error?.response?.data);
    return null;
  }
};
