import { SamplingSampleDataTables } from "@/components/sampling/sampleListDataTables"
import { getProjectByDivision, getSampleByAccount } from "@/lib/actions/sampling.actions"
import { Sampling } from "@/lib/models/sampling.model"

export default async function SamplingProject() {
  let role = "ADMIN"
  let res = null
  
  if (role == "STAFF")
    res = await getSampleByAccount("2023", "2")
  else
    res = await getProjectByDivision("sampling")
  
  let data: Sampling[] = []

  if (res.result)
    data = res.result.flatMap((p) => p.sampling_list.map(s => s)).filter(s => s.status == "VERIFYING" || s.status == "FINISHED")

  return (
    <div className="flex flex-col w-full ">
      <SamplingSampleDataTables role={role} data={data} />
    </div>
  )
}
