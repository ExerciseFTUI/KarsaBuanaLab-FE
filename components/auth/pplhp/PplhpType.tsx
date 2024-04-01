export type PplhpDetail = {
  project_name: string;
  projectID: string;
  sampling_list: any;
  lab_files: LabFile[];
  lhp: Lhp;
};

export type LabFile = {
  file_name: string;
  file_type: string;
  file_id: string;
  file_extension: string;
  _id: string;
};

export type SamplingPplhp = {
  lab_assigned_to: string[];
  sample_name: string;
  fileId: string;
  param: string[];
};

export type Lhp = {
  name: string;
  url: string;
  type: string;
};
