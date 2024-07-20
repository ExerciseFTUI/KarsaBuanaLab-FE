import { Sampling } from "./sampling.model";
import { File } from "./file.model";
import { User } from "./user.model";

export interface Project {
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
  TM_status: string;
  TM_note: string;
}

export interface NotesFromAdmin {
  date: Date;
  content: string;
}

export const notesFromAdmin: NotesFromAdmin[] = [
  {
    date: new Date("2024-07-01T10:00:00Z"),
    content: "Reminder: Team meeting on July 5th at 10:00 AM.",
  },
  {
    date: new Date("2024-07-10T15:30:00Z"),
    content: "Update: New company policies have been updated on the intranet.",
  },
  {
    date: new Date("2024-07-15T09:00:00Z"),
    content: "Notice: The office will be closed on July 20th for maintenance.",
  },
  {
    date: new Date("2024-07-20T11:00:00Z"),
    content: "Reminder: Submit your project updates by July 25th.",
  },
  {
    date: new Date("2024-07-25T14:00:00Z"),
    content: "Announcement: Company picnic scheduled for August 1st.",
  },
];
