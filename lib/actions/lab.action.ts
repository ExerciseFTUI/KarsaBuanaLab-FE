"use server";

import axios from "axios";
import { Project } from "../models/project.model";
import { BaseApiResponse } from "../models/baseApiResponse.model";
import { BaseSample } from "../models/baseSample.model";
import { ProjectMarketingType, ProjectType } from "../type";
import { revalidatePath } from "next/cache";
import { string } from "zod";

const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000";

export const getProjectLab = async () : Promise<Project[]> => {
    try {
      const response = await axios.get(`${apiBaseUrl}/lab/`);
      
      return response.data.result; // Access 'result' field
    } catch (error: any) {
      console.error(`Error getting project :`, error.message);
      return null as unknown as Project[];
    }
  };