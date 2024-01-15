import { SamplingSampleDataTables } from "@/components/sampling/sampleListDataTables"
import { getSampleByAccount, getSampleByYear } from "@/lib/actions/sampling.actions"

export default async function SamplingProject() {
  let role = "ADMIN"
  let res
  
  if (role == "STAFF")
    res = await getSampleByAccount("2023", "2")
  else
    res = await getSampleByYear("2023", "sample")
  
  const data = res && res.result ? res.result : [];

  return (
    <div className="flex flex-col w-full ">
      <SamplingSampleDataTables role={role} data={data} />
    </div>
  )
}
