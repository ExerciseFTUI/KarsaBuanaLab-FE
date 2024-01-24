import { Project } from "@/lib/models/project.model"
import { File } from "@/lib/models/file.model"
import { randomInt, randomUUID } from "crypto"

import projectJson from "@/constants/data/projectData.json"
import userJson from "@/constants/data/userData.json"
import { Sampling } from "@/lib/models/sampling.model"
import { User } from "@/lib/models/user.model"
import { rupiah } from "@/lib/utils"
import { Regulation } from "@/lib/models/regulation.model"
// import { writeFile } from "fs"

export function generateRandomData(length: number = 100): void {
  let data: Project[] = []

  for (let i = 1; i <= length; i++) {
    let file: File = {
      file_id: randomUUID().slice(0, 8),
      file_name: "File " + i,
      _id: randomUUID(),
    }

    let samplingList: Sampling[] = []

    for (let j = 1; j <= 5; j++) {
      let regulation: Regulation = {
        regulation_name: "PP 2014",
        param: ["PH", "Kebeningan", "Kekentalan"],
        __v: i + j,
        _id: randomUUID(),
      }

      let sample: Sampling = {
        sample_name: "Sample " + j,
        harga: rupiah(randomInt(20000, 100000)),
        fileId: randomUUID(),
        param: ["Air Laut", "Tanah Liat", "Api Biru", "Angin Topan"],
        regulation_name: [regulation],
        location: "Location " + j,
        assigned_to: userAssistantData.slice(0, 3),
        status: [
          "ASSIGNED",
          "NOT ASSIGNED",
          "FINISHED",
          "Revision",
          "Get Sample",
          "Verifying",
        ][randomInt(0, 6)],
        jadwal: new Date(),
        _id: randomUUID(),
      }

      samplingList.push(sample)
    }

    let temp: Project = {
      no_penawaran: "PNW" + (i < 10 ? "0" + i : i + ""),
      no_sampling: randomUUID().slice(0, 8),
      client_name: "Client " + i,
      project_name: "Project " + i,
      alamat_kantor: "Kantor " + i,
      alamat_sampling: "Alamat Sample " + i,
      surel: "nama" + i + "@mail.com",
      contact_person: "Orang " + i,
      status: [
        "Letter",
        "Need Schedule",
        "On Discuss",
        "Revision",
        "Get Sample",
      ][randomInt(0, 5)],
      folder_id: "folderId" + i,
      password: "password" + i,
      jumlah_revisi: i,
      surat_penawaran: "Surat Penawaran " + i,
      valuasi_proyek: randomInt(500000),
      created_year: "" + new Date().getFullYear(),
      sampling_list: samplingList,
      file: [],
      created_at: "" + new Date().getFullYear(),
      _id: randomUUID(),
      __v: i,
    }

    data.push(temp)
  }

  // writeFile(
  //   "./constants/data/projectData.json",
  //   JSON.stringify(data),
  //   (err) => {
  //     if (err) throw err
  //   }
  // )
}

const sampleProjectData: Project[] = JSON.parse(JSON.stringify(projectJson))

const sampleLetterData: Project[] = JSON.parse(
  JSON.stringify(projectJson)
).filter((p: Project) => p.status == "Letter")

const sampleSamplingData: any[] = JSON.parse(JSON.stringify(projectJson))
  .filter((p: Project) => p.status == "Get Sample")
  .flatMap((p: Project) =>
    p.sampling_list.map((s) => ({
      no_penawaran: p.no_penawaran,
      project_name: p.project_name,
      ...s,
    }))
  )

const userMarketingData: User[] = JSON.parse(JSON.stringify(userJson)).filter(
  (p: User) => p.division == "Marketing"
)

const userAssistantData: User[] = JSON.parse(JSON.stringify(userJson)).filter(
  (p: User) => p.division == "Assistant"
)

export {
  sampleProjectData,
  sampleSamplingData,
  sampleLetterData,
  userMarketingData,
  userAssistantData,
}
