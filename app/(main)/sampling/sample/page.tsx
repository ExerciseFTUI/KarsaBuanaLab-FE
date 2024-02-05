import { SamplingSampleDataTables } from "@/components/sampling/sampleListDataTables"
import {
  getProjectByDivision,
  getSampleByAccount,
} from "@/lib/actions/sampling.actions"
import { Project } from "@/lib/models/project.model"

export default async function SamplingProject() {
  let role = "ADMIN"
  let res = null

  if (role == "STAFF") res = await getSampleByAccount("2023", "2")
  else res = await getProjectByDivision("sampling")

  let data: Project[] =
    res && (res as any).projects ? (res as any).projects : []

  data = data.filter((p) => p.jadwal_sampling != null)

  return (
    <div className="flex flex-col w-full ">
      <SamplingSampleDataTables role={role} data={data} />
    </div>
  )
}
