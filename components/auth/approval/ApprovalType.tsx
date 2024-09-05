import { NotesFromAdmin } from "@/lib/models/project.model";
import { Sampling } from "@/lib/models/sampling.model";

export interface ApprovalProject {
  TM_status: string;
  no_penawaran: string;
  no_sampling: string;
  client_name: string;
  project_name: string;
  alamat_kantor: string;
  alamat_sampling: string;
  surel: string;
  contact_person: string;
  status: string;
  current_division: string;
  folder_id: string;
  password: string;
  jumlah_revisi: number;
  valuasi_proyek: number;
  surat_penawaran: string;
  surat_fpp: string;
  created_year: string;
  sampling_list: Sampling[];
  file: File[];
  lab_file: File[];
  created_at: string;
  jadwal_sampling: { from: string; to: string };
  project_assigned_to: string[];
  is_paid: boolean;
  desc_failed: string;
  _id: string;
  __v: number;
  lab_status: string;
  notes: NotesFromAdmin[];
  lab_sample_status: string;
}
