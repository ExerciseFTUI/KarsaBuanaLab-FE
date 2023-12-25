import axios from 'axios';
import {BaseApiResponse} from '../models/baseApiResponse.model'
import { Sampling } from '../models/sampling.model';
import { Project } from '../models/project.model';

const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000/api';

export const getSampleById = async (year: string, sampleId : string) : Promise<BaseApiResponse<Sampling>> => {
  try {

    const response = await axios.get(`${apiBaseUrl}/sampling/get/${year}/${sampleId}`);

    return response.data as BaseApiResponse<Sampling>;

  } catch (error: any) {
    console.error('Error getting sample', error.message);
    throw new Error('Failed to get sample');
  }

}

export const getSampleByYear = async (year: string, page: string) : Promise<BaseApiResponse<Sampling[]>> => {
  try {

    const response = await axios.get(`${apiBaseUrl}/sampling/get/${year}`);

    const result: Sampling[] = response.data.result.filter((s: Sampling) => {
      if (page == "project")
        return s.status == "FINISHED" || s.status == "NOT ASSIGNED"
      else if (page == "assignment-letter")
        return s.status == "ASSIGNED"
      else
        return s.status == "Get Sample" || s.status == "Verifying" || s.status == "Revision"
    })

    const data: BaseApiResponse<Sampling[]> = {
      message: "Success",
      result
    }

    return data;

  } catch (error: any) {
    console.error('Error getting sample list', error.message);
    throw new Error('Failed to get sample list');
  }

}

export const getSampleByAccount = async (year: string, accountId : string) : Promise<BaseApiResponse<[Sampling]>> => {
  try {

    const response = await axios.get(`${apiBaseUrl}/sampling/sample/${year}`, {
      data: {
        accountId: accountId,
      },
    });

    return response.data as BaseApiResponse<[Sampling]>;

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