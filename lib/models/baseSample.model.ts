export interface BaseSample {
  _id: string;
  sample_name: string;
  file_id: string;
  file_safety_id: string;
  param: paramObject[];
  regulation: Regulation[];
  __v: number;
}

export interface Regulation {
  regulation_name: string;
  default_param: string[];
  _id: number;
}

export interface paramObject {
  param: string;
  method: string[];
  unit: string;
  operator: string;
  baku_mutu: number;
  _id: string;
}