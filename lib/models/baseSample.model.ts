export interface BaseSample {
  param: Param[];
  regulation: Regulation[];
  _id: string;
  sample_name: string;
  file_id: string;
  file_safety_id: string;
  __v: number;
}

export interface Regulation {
  regulation_name: string;
  _id: number;
  default_param: string[];
}

export interface Param {
  param: string;
  method: string[];
  unit: string[];
  operator: string;
  baku_mutu: number;
  _id: string;
}
