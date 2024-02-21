export interface BaseSample {
  param: string[];
  regulation: Regulation[];
  _id: string;
  sample_name: string;
  file_id: string;
  __v: number;
}

export interface Regulation {
  regulation_name: string;
  _id: number;
  default_param: string[];
}
