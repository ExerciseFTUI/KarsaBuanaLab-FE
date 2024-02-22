"use server";
import axios from "axios";

const apiBaseUrl = process.env.API_BASE_URL;

export const getProjectDivision = async (
  projectId: string,
  password: string
) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/clients/login`, {
      projectId,
      password,
    });
    return response.data.result;
  } catch (error: any) {
    console.error("Error getting Project", error.message);
    return null as unknown;
  }
};

export const submitSurvey = async (projectId: string) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/clients/fill-survey`, {
      projectId,
    });
    return response.data.result;
  } catch (error: any) {
    console.error("Error getting Project", error.message);
    return null as unknown;
  }
};

export const getSampleById = async (projectId: string): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/clients/get-sample-status`,
      {
        data: {
          projectId: projectId,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.result; // Access 'result' field
  } catch (error: any) {
    console.error(`Error getting sample : ${projectId}:`, error.message);
    return [];
  }
};

export const getAnalysisById = async (projectId: string): Promise<any> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/clients/get-analysis-status`,
      {
        data: {
          projectId: projectId,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.result; // Access 'result' field
  } catch (error: any) {
    console.error(`Error getting sample : ${projectId}:`, error.message);
    return null as unknown;
  }
};

export const getReportById = async (projectId: string): Promise<any> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/clients/get-payment-status`,
      {
        data: {
          projectId: projectId,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.result; // Access 'result' field
  } catch (error: any) {
    console.error(`Error getting sample : ${projectId}:`, error.message);
    return null as unknown;
  }
};

export const getSurvey = async (): Promise<any> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/survey/get-survey`);
    return response.data.survey;
  } catch (error: any) {
    console.error(`Error getting survey}:`, error.message);
    return null as unknown;
  }
};
