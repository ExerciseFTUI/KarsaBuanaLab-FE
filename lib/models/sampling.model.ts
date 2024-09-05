import { User } from "./user.model";
import { Regulation } from "./regulation.model";

export interface SamplingParam {
  param: string;
  ld_file_id?: string;
  ld_name?: string;
  method?: string[];
  unit?: string;
  operator?: "<" | ">" | "=";
  baku_mutu?: number;
  result?: number;
  history_result?: {
    result: number;
    date: Date;
    count: number;
    method: string;
    unit: string;
  }[];
  CRM?: "DITERIMA" | "DITOLAK";
  CVS?: "DITERIMA" | "DITOLAK";
  RPD?: "DITERIMA" | "DITOLAK";
  Recovery?: "DITERIMA" | "DITOLAK";
  analysis_status?: "WAITING" | "SUBMIT" | "ACCEPTED" | "REVISION";
}

export interface Sampling {
  sample_name: string;
  sample_number?: number;
  harga?: string;
  fileId: string;
  param: SamplingParam[];
  regulation_name: Regulation[];
  location?: string;
  lab_assigned_to: string[];
  status:
    | "ASSIGNED"
    | "NOT ASSIGNED"
    | "VERIFYING"
    | "FINISHED"
    | "SUBMIT"
    | "WAITING"
    | "ACCEPTED"
    | "REVISION"
    | "LAB_RECEIVE"
    | "LAB_ASSIGNED"
    | "LAB_DONE";
  jadwal?: Date;
  receive_date?: Date;
  deadline?: { from: string; to: string };
  unit?: string;
  method?: string;
  _id: string;
}

export interface CalendarSample {
  _id: string;
  title: string;
  start: string;
  end: string;
  person: string[];
}

export interface DashboardSampling {
  _id: string;
  title: string;
  start: string;
  end: string;
  location: string;
  person: string[];
}
