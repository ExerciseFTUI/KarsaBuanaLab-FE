import { Sampling } from "./sampling.model"
import { File } from "./file.model"
import { User } from "./user.model"

export interface Project {
  no_penawaran: string
  no_sampling: string
  client_name: string
  project_name: string
  alamat_kantor: string
  alamat_sampling: string
  surel: string
  contact_person: string
  status: string
  current_division: string
  folder_id: string
  password: string
  jumlah_revisi: number
  valuasi_proyek: number
  surat_penawaran: string
  surat_fpp: string
  created_year: string
  sampling_list: Sampling[]
  file: File[]
  created_at: string
  jadwal_sampling: string
  project_assigned_to: User[]
  isPaid: boolean
  descFailed: string
  _id: string
  __v: number
}
