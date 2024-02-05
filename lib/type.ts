import { File } from "./models/file.model"
import { Project } from "./models/project.model"
import { Regulation } from "./models/regulation.model"
import { User } from "./models/user.model"

export type ProjectType = {
  id: string
  noPenawaran: string
  judul: string
  namaCustomer: string
  lokasi: string
  cp: string
  nilaiPenawaran: number
  createdAt: string
}

export type ProjectMarketingType = {
  _id: string
  no_penawaran: string
  project_name: string
  client_name: string
  alamat_sampling: string
  contact_person: string
  created_at: string
  status: string
  valuasi_proyek: number
  desc_failed: string
}

export type BaseSampleType = {
  sample_name: string
  amount: number
}

export type SampleType = {
  sample_name: string
  harga: string
  fileId: string
  regulation: string
  location: string
}

export type FileType = {
  file_name: string
  file_id: string
}

export type UserType = {
  username: string
  email: string
  password: string
  // phone: string
  role: string
  division: string
}

export type RegulationType = {
  regulation_name: string
  file: FileType[]
  param: string[]
}

export type ReceiveSamplingType = {
  _id: string
  no_penawaran: string
  project_name: string
  alamat_sampling: string
  alamat_kantor: string
  contact_person: string
}

export type ProjectLHPType = {
  _id: string
  no_penawaran: string
  project_name: string
  alamat_sampling: string
  alamat_kantor: string
  contact_person: string
}

export type LabDataType = {
  _id: string
  no_penawaran: string
  project_name: string
  alamat_sampling: string
  alamat_kantor: string
  contact_person: string
}

export type ProjectSamplingType = {
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
  valuasi_proyek: number
  surat_penawaran: string
  created_year: string
  sampling_list: SampleType[]

  file: { file_nama: string; file_id: string }
}

export type SamplingRequestData = {
  project: Project
  user: User[]
  files: any
}
