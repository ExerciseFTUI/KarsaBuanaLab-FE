"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000";

//===============================PPLHP

export const getAllPplhp = async (): Promise<any> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/projects/get-all-pphlp-detail`
    );

    if (response.data?.message !== "success") {
      return null;
    }

    return response.data?.projectList;
  } catch (error: any) {
    console.error(`Error getting All PPLHP`, error.message);
    return null;
  }
};

export const getPplhpDetail = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/projects/get-pphlp-detail/${id}`
    );

    if (response.data?.message !== "success") {
      return null;
    }

    return response.data?.project;
  } catch (error: any) {
    console.error(`Error getting PPLHP with ID ${id}:`, error.message);
    return null;
  }
};

export const lhpRevision = async (body: any, id: string) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/projects/lhp-revision/${id}`,
      // `http://localhost:8080/projects/lhp-revision/${id}`,
      body
    );

    revalidatePath("/admin/pplhp");

    return response.data;
  } catch (error: any) {
    console.error(error.response?.data?.message);
    console.error("Error update PPLHP ", error.message);
    // throw new Error("Error update PPLHP ", error.message);
    return null;
  }
};

export const lhpAccept = async (body: any, id: string) => {
  try {
    const response = await axios.post(
      // `http://localhost:8080/projects/lhp-accept/${id}`,
      `${apiBaseUrl}/projects/lhp-accept/${id}`,
      body
    );

    revalidatePath("/admin/pplhp");

    return response.data;
  } catch (error: any) {
    console.error(error.response?.data?.message);
    console.error("Error update PPLHP ", error.message);
    // throw new Error("Error update PPLHP ", error.message);
    return null;
  }
};
