import { ProjectSamplingType, SampleType } from "@/lib/type"
import { randomInt, randomUUID } from "crypto"
import projectJson from "@/constants/projectData.json"

function generateRandomData(length: number = 100): ProjectSamplingType[] {
  let data: ProjectSamplingType[] = []

  for (let i = 1; i <= length; i++) {
    let temp: ProjectSamplingType = {
      no_penawaran: "PNW" + (i < 10 ? "0" + i : i + ""),
      no_sampling: randomUUID().slice(0, 8),
      client_name: "Client " + i,
      project_name: "Project " + i,
      alamat_kantor: "Kantor " + i,
      alamat_sampling: "Alamat Sample " + i,
      surel: "domain" + i + "@mail.com",
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
      surat_penawaran: "Surat Penawaran" + i,
      created_year: "2023-" + randomInt(1, 12) + "-" + randomInt(0, 31),
      sampling_list: [],
      file: { file_nama: "File " + i, file_id: "fileId" + i },
    }

    for (let j = 1; j <= 5; j++) {
      temp.sampling_list.push({
        sample_name: "Sample " + j,
        harga: randomInt(500000) + "",
        fileId: "fileId" + j,
        regulation: "Regulation " + ["A", "B", "C", "D"][randomInt(0, 4)],
        location: "Lokasi Sampel " + j,
      })
    }

    data.push(temp)
  }

  return data
}

const projectData: ProjectSamplingType[] = JSON.parse(projectJson).filter(
  (p: ProjectSamplingType) =>
    p.status == "Need Schedule" ||
    p.status == "On Discuss" ||
    p.status == "Revision"
)

const sampleData: ProjectSamplingType[] = JSON.parse(projectJson).filter(
  (p: ProjectSamplingType) =>
    p.status == "Verifying" ||
    p.status == "Get Sample" ||
    p.status == "Revision"
)

const assignmentLetterData: ProjectSamplingType[] = JSON.parse(
  projectJson
).filter((p: ProjectSamplingType) => p.status == "Letter")

export { projectData, sampleData, assignmentLetterData }
