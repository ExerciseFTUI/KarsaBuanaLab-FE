import { Sampling } from "./sampling.model"
import { File } from "./file.model"

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
  folder_id: string
  password: string
  jumlah_revisi: number
  surat_penawaran: string
  valuasi_proyek: number
  created_year: string // Tahun
  sampling_list: Sampling[]
  file: File[]
  created_at: string // Tahun
  _id: string
  __v: number
}
