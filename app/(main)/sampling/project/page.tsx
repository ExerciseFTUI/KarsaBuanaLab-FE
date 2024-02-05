import { SamplingProjectDataTables } from "@/components/sampling/sampleListDataTables"
import { getProjectByDivision } from "@/lib/actions/sampling.actions"

export default async function SamplingProject() {
  const res = await getProjectByDivision("Sampling")

  const data = res ? (res as any).projects : []

  return (
    <div className="flex flex-col w-full ">
      <SamplingProjectDataTables data={data} />
    </div>
  )
}
