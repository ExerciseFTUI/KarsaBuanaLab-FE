import { File } from "./models/file.model";
import { Project } from "./models/project.model";
import { Regulation } from "./models/regulation.model";
import { User } from "./models/user.model";

export type ProjectType = {
  id: string;
  noPenawaran: string;
  judul: string;
  namaCustomer: string;
  lokasi: string;
  cp: string;
  nilaiPenawaran: number;
  createdAt: string;
};

export type ProjectMarketingType = {
  _id: string;
  no_penawaran: string;
  project_name: string;
  client_name: string;
  alamat_sampling: string;
  contact_person: string;
  created_at: string;
  status: string;
  current_division: string;
  valuasi_proyek: number;
  jadwal_sampling: { from: string; to: string; _id: string };
  deadline_lhp: { from: string; to: string; _id: string };
  desc_failed: string;
};

export type ProjectAdminPplhpType = {
  project_name: string;
  lab_files: LabFileType[];
};

export type LabFileType = {
  _id: string;
  file_name: string;
  file_id: string;
  file_type: string;
  file_extension: string;
};

export type BaseSampleType = {
  sample_name: string;
  amount: number;
};

export type SampleType = {
  sample_name: string;
  harga: string;
  fileId: string;
  regulation: string;
  location: string;
};

export type FileType = {
  file_name: string;
  file_id: string;
};

export type UserType = {
  id?: string;
  name?: string;
  email?: string;
  // password: string;
  // phone: string
  role: string;
  division: string;
};

export type RegulationType = {
  regulation_name: string;
  file: FileType[];
  param: string[];
};

export type ReceiveSamplingType = {
  _id: string;
  no_penawaran: string;
  project_name: string;
  alamat_sampling: string;
  alamat_kantor: string;
  contact_person: string;
};

export type ProjectLHPType = {
  _id: string;
  no_penawaran: string;
  project_name: string;
  alamat_sampling: string;
  alamat_kantor: string;
  contact_person: string;
};

export type LabDataType = {
  _id: string;
  no_penawaran: string;
  project_name: string;
  alamat_sampling: string;
  alamat_kantor: string;
  contact_person: string;
  lab_status: string;
};

export type ProjectSamplingType = {
  no_penawaran: string;
  no_sampling: string;
  client_name: string;
  project_name: string;
  alamat_kantor: string;
  alamat_sampling: string;
  surel: string;
  contact_person: string;
  status: string;
  folder_id: string;
  password: string;
  jumlah_revisi: number;
  valuasi_proyek: number;
  surat_penawaran: string;
  created_year: string;
  sampling_list: SampleType[];

  file: { file_nama: string; file_id: string };
};

export type SamplingRequestData = {
  project: Project;
  user: User[];
  files: any;
};

export const Sampling = {
  samples: [
    {
      name: "sample 1",
      regulations: [
        {
          id: 5,
          name: "Regulation A",
          parameters: [
            {
              id: 1,
              name: "Parameter 1",
              limit: 10,
            },
            {
              id: 5,
              name: "Parameter 2",
              limit: 15,
            },
          ],
        },
        {
          id: 3,
          name: "Regulation B",
          parameters: [
            {
              id: 2,
              name: "Parameter 3",
              limit: 20,
            },
            {
              id: 21,
              name: "Parameter 4",
              limit: 25,
            },
          ],
        },
      ],
    },
    {
      name: "sample 2",
      regulations: [
        {
          id: 2,
          name: "Regulation X",
          parameters: [
            {
              id: 6,
              name: "Parameter 5",
              limit: 30,
            },
            {
              id: 62,
              name: "Parameter 6",
              limit: 35,
            },
          ],
        },
        {
          id: 1,
          name: "Regulation Y",
          parameters: [
            {
              id: 5,
              name: "Parameter 7",
              limit: 40,
            },
            {
              id: 7,
              name: "Parameter 8",
              limit: 45,
            },
          ],
        },
      ],
    },
  ],
};

//Client
export type ClientResponses = {
  sample_name: string;
  status: string;
};

export type FinishedData = {
  is_paid: boolean;
  report: string;
  is_survey_filled: boolean;
};

export type ClientDataType = {
  sample: ClientResponses[];
  analysis: ClientResponses[];
  finished: FinishedData;
};

export type SurveySchema = {
  _id: string;
  title: string;
  questions: QuestionType[];
};

export type QuestionType = {
  _id: string;
  text: string;
  type: "rating" | "essay" | "multiple_choice";
  choices: string[];
};

export type AnswerType = {
  questionId: string;
  value: string;
};

//Lab
export type LabDashboardType = {
  judul: string;
  deadline: string;
  dokumen: [DocumentType];
  input: [InputDocumentType];
};

export type DocumentType = {
  judul: string;
  url: string;
};

export type InputDocumentType = {
  sampleName: string;
  asignedTo: string;
  parameters: [ParameterType];
};

export type ParameterType = {
  name: string;
  unit: [string];
  method: [string];
  result: string;
};

export type labInputChoice = {
  param: string;
  unit: string[];
  method: string[];
}

export type sampleAnswer = {
  sample_name: string;
  param: {
    param: string;
    result: string;
    unit: string;
    method: string;
  }[];
};

export type LabInputDokumenAnswerType = {
  projectId: string;
  samples: sampleAnswer[];
};

export type InventoryType = {
  _id: string;
  tools_name: string;
  description: string;
  last_maintenance: Date;
  maintenance_history: Date[];
  maintenance_every: string;
  file_id: string;
  assigned_user: string;
  category: string;
};

export type InventoryPICType = {
  _id: string;
  name: string;
  role: string;
  phone: string;
};
