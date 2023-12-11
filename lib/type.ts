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

export type SampleType = {
  sample_name: string
  harga: string
  fileId: string
  regulation: string
  location: string
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

export type ReceiveSamplingType = {
  id: string;
  noPenawaran: string;
  judulProject: string;
  lokasiSampel: string;
  lokasi: string;
  cp: string;
};

export type ProjectLHPType = {
  id: string;
  noPenawaran: string;
  judul: string;
  lokasiPengambilanSampel: string;
  lokasi: string;
  cp: string;
};

export type LabDataType = {
  id: string;
  noPenawaran: string;
  judul: string;
  lokasi: string;
  cp: string;
};