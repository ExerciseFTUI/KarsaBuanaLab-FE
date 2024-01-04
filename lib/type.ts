export type ProjectType = {
  //Lama
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
  valuasi_proyek: number;
};

export type SampleType = {
  sample_name: string;
  harga: string;
  fileId: string;
  regulation: string;
  location: string;
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

export type ReceiveSamplingType = {
  no_penawaran: string;
  project_name: string;
  alamat_sampling: string;
  alamat_kantor: string;
  contact_person: string;
};

export type ProjectLHPType = {
  no_penawaran: string;
  project_name: string;
  alamat_sampling: string;
  alamat_kantor: string;
  contact_person: string;
};

export type LabDataType = {
  id: string;
  noPenawaran: string;
  judul: string;
  lokasi: string;
  cp: string;
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
