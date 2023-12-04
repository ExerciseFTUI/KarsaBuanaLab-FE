import { FileType, ProjectType, SamplingType, UserType } from "@/lib/type"
import { randomInt, randomUUID } from "crypto"

import projectJson from "@/constants/data/projectData.json"
import userJson from "@/constants/data/userData.json"

function generateRandomData(length: number = 100): ProjectType[] {
  let data: ProjectType[] = []

  for (let i = 1; i <= length; i++) {
    let file: FileType = {
      file_id: randomUUID().slice(0, 8),
      file_name: "File " + i,
    }

    let samplingList: SamplingType[] = []

    for (let j = 1; j <= 5; j++) {
      let sample: SamplingType = {
        fileId: randomUUID().slice(0, 8),
        assigned_to: [],
        base_sample_list: [
          {
            sample_name: "Base Sample " + j,
            amount: randomInt(12),
          },
        ],
        harga: randomInt(750000).toString(),
        jadwal: new Date(),
        location: "Lokasi Sample " + j,
        param: [],
        regulation: {
          file: [file],
          param: [],
          regulation_name: "Regulation " + j,
        },
        sample_name: "Sample " + j,
        status: "Status",
      }

      samplingList.push(sample)
    }

    let temp: ProjectType = {
      no_penawaran: "PNW" + (i < 10 ? "0" + i : i + ""),
      no_sampling: randomUUID().slice(0, 8),
      client_name: "Client " + i,
      project_name: "Project " + i,
      alamat_kantor: "Kantor " + i,
      alamat_sampling: "Alamat Sample " + i,
      surel: "nama" + i + "@mail.com",
      contact_person: "Orang " + i,
      status: [
        "Get Sample",
        "Verifying",
        "Revision",
        "Letter",
        "Need Schedule",
        "On Discuss",
      ][randomInt(0, 7)],
      folder_id: "folderId" + i,
      password: "password" + i,
      jumlah_revisi: i,
      valuasi_proyek: randomInt(500000),
      surat_penawaran: "Surat Penawaran " + i,
      created_year: "2023-" + randomInt(1, 12) + "-" + randomInt(0, 31),
      sampling_list: samplingList,
      file: [file],
    }

    data.push(temp)
  }

  return data
}

const sampleProjectData: ProjectType[] = JSON.parse(
  JSON.stringify(projectJson)
).filter(
  (p: ProjectType) =>
    p.status == "Need Schedule" ||
    p.status == "On Discuss" ||
    p.status == "Revision"
)

const sampleSamplingData: ProjectType[] = JSON.parse(
  JSON.stringify(projectJson)
).filter(
  (p: ProjectType) =>
    p.status == "Verifying" ||
    p.status == "Get Sample" ||
    p.status == "Revision"
)

const sampleLetterData: ProjectType[] = JSON.parse(
  JSON.stringify(projectJson)
).filter((p: ProjectType) => p.status == "Letter")

const userMarketingData: UserType[] = JSON.parse(
  JSON.stringify(userJson)
).filter((p: UserType) => p.division == "Marketing")

const userAssistantData: UserType[] = JSON.parse(
  JSON.stringify(userJson)
).filter((p: UserType) => p.division == "Assistant")

export {
  sampleProjectData,
  sampleSamplingData,
  sampleLetterData,
  userMarketingData,
  userAssistantData,
}
