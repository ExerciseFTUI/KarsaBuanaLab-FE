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

export type BaseSampleType = {
  sample_name: string
  amount: number
}

export type FileType = {
  file_name: string
  file_id: string
}

export type UserType = {
  username: string
  email: string
  password: string
  phone: string
  role: string
  division: string
}

export type RegulationType = {
  regulation_name: string
  file: FileType[]
  param: string[]
}

export type ReceiveSamplingType = {
  id: string
  noPenawaran: string
  judulProject: string
  lokasiSampel: string
  lokasi: string
  cp: string
}

export type ProjectLHPType = {
  id: string
  noPenawaran: string
  judul: string
  lokasiPengambilanSampel: string
  lokasi: string
  cp: string
}

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
}
