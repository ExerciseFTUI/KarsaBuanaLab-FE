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

export type ProjectSamplingType = {
  id: string;
  noPenawaran: string;
  judul: string;
  namaCustomer: string;
  lokasi: string;
  cp: string;
  nilaiPenawaran: number;
  createdAt: string;
  status: string;
};

export type ProjectLHPType = {
  id: string;
  noPenawaran: string;
  judul: string;
  lokasiPengambilanSampel: string;
  lokasi: string;
  cp: string;
};
