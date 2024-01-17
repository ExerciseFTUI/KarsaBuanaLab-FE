"use server"

import axios from 'axios';
import {BaseApiResponse} from '../models/baseApiResponse.model'
import { Sampling } from '../models/sampling.model';
import { Project } from '../models/project.model';
import { revalidatePath } from 'next/cache';

const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000/api';

export const getSampleById = async (year: string, sampleId : string) : Promise<BaseApiResponse<Sampling>> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/sampling/get/${year}/${sampleId}`);

    return response.data as BaseApiResponse<Sampling>;
  } catch (error: any) {
    console.error('Error getting sample', error.message);
    return {message: "Failed to get sample", result: null} as unknown as BaseApiResponse<Sampling>
  }
}

export const getProjectByDivision = async (division: string) : Promise<BaseApiResponse<[Project]>> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/projects/get-project-by-division/${division}`);
    
    return response.data as BaseApiResponse<[Project]>;
  } catch (error: any) {
    console.error('Error getting sample', error.message);
    return null as unknown as BaseApiResponse<[Project]>
  }
}

export const getSampleByAccount = async (year: string, accountId : string) : Promise<BaseApiResponse<[Project]>> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/sampling/sample/${year}`, {
      data: {
        accountId: accountId,
      },
    });

    return response.data as BaseApiResponse<[Project]>;

  } catch (error: any) {
    console.error('Error getting sample', error.message);
    return null as unknown as BaseApiResponse<[Project]>
  }
}

export const sampleAssignment = async (sampleId: string, accountId: string) : Promise<BaseApiResponse<Project>> => {
  try {
    const response = await axios.post(`${apiBaseUrl}/sampling/assign/${sampleId}`, {
      accountId: accountId,
    });

    revalidatePath(`/sampling/project/${sampleId}`) // path sekarang
    
    return response.data as BaseApiResponse<Project>;
  } catch (error: any) {
    console.error('Error getting sample', error.message);
    return null as unknown as BaseApiResponse<Project>
  }
}

export const verifySample = async (projectId: string, sampleName: string, status: string, sampleId: string) : Promise<BaseApiResponse<Project>> => {
  try {
    const response = await axios.post(`${apiBaseUrl}/sampling/change`, {
      projectId,
      sampleName,
      status
    });

    revalidatePath(`/sampling/sample/${sampleId}`) // path sekarang
    
    return response.data as BaseApiResponse<Project>;
  } catch (error: any) {
    console.error('Error getting sample', error.message);
    return null as unknown as BaseApiResponse<Project>
  }
}