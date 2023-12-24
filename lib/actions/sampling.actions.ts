import axios from 'axios';
import {BaseApiResponse} from '../models/baseApiResponse.model'
import { Sampling } from '../models/sampling.model';
import { Project } from '../models/project.model';

const apiBaseUrl = process.env.API_BASE_URL || '';

export const getSampleById = async (year: string, sampleId : string) : Promise<BaseApiResponse<Sampling>> => {
  try {

    const response = await axios.get(`${apiBaseUrl}/sampling/get/${year}/${sampleId}`);

    return response.data as BaseApiResponse<Sampling>;

  } catch (error: any) {
    console.error('Error getting sample', error.message);
    throw new Error('Failed to get sample');
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
    throw new Error('Failed to get sample');
  }

}

export const sampleAssignment = async (year: string, sampleNumber: string, accountId: string) : Promise<BaseApiResponse<any>> => {
  try {
    const response = await axios.post(`${apiBaseUrl}/sampling/assign/${year}/${sampleNumber}`, {
      accountId: accountId,
    });

    return response.data as BaseApiResponse<any>;
  } catch (error: any) {
    console.error('Error assigning sample:', error.message);
    throw new Error('Failed to assign sample');
  }

}