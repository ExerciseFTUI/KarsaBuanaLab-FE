"use server";
import axios from "axios";
import { BaseApiResponse } from "../models/baseApiResponse.model";
import { Project } from "../models/project.model";
import { ApprovalProject } from "@/components/auth/approval/ApprovalType";
import { revalidatePath } from "next/cache";

const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000";

export const getAllApprovalProject = async (): Promise<
  BaseApiResponse<[ApprovalProject]>
> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/projects/get-project-by-division/`,
      // `http://localhost:8080/projects/get-project-by-division/`,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        //TODO: change division
        data: { division: "MARKETING" },
      }
    );

    return response.data as BaseApiResponse<[ApprovalProject]>;
  } catch (error: any) {
    console.error(
      "Error getting sample /projects/get-project-by-division/",
      error.message
    );
    return null as unknown as BaseApiResponse<[ApprovalProject]>;
  }
};

export const changeTMStatus = async (
  projectId: string,
  status: string,
  notes: string
) => {
  try {
    const body = {
      project_id: projectId,
      status: status,
      notes: notes,
    };

    const response = await axios.post(
      `${apiBaseUrl}/projects/change-TM-status`,
      body
    );

    //TODO: check respopnse from backend
    if (response) {
      revalidatePath("/admin/approval");
      return true;
    }

    return false;
  } catch (error: any) {
    console.error(error.message);
    console.error(error?.response?.data);
    return false;
  }
};
