export const pplhpSignEnum = [
  {
    label: "Direktur Lab",
    value: "DIRECTOR",
  },
  {
    label: "Manajer Teknis",
    value: "TM",
  },
];

export type PplhpDetail = {
  project_name: string;
  projectID: string;
  sampling_list: SamplingPplhp[];
  lab_files: LabFile[];
  lhp: Lhp;
  deadline_lhp: {
    from: string;
    to: string;
    _id: string;
  };
  ttd_type: "DIRECTOR" | "TM";
};

export type LabFile = {
  file_name: string;
  file_type: string;
  file_id: string;
  file_extension: string;
  _id: string;
};

export type SamplingPplhp = {
  sample_name: string;
  fileId: string;
  param: string[];
  regulation_name: any;
  lab_assigned_to: string[];
  status: string;
  _id: string;
};

export type PplhpParam = {
  param: string;
  method: string[];
  unit: string[];
  operator: string;
  baku_mutu: number;
  _id: string;
};

export type Lhp = {
  name: string;
  url: string;
  type: string;
};
