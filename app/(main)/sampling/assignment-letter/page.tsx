import { SamplingLetterDataTables } from "@/components/sampling/sampleListDataTables"
import { getProjectByDivision } from "@/lib/actions/sampling.actions"
import { Sampling } from "@/lib/models/sampling.model"

export default async function SamplingProject() {
  const res = await getProjectByDivision("sampling")
  let data: Sampling[] = []

  if (res.result)
    data = res.result.flatMap((p) => p.sampling_list.map(s => s)).filter(s => s.status == "ASSIGNED")

  return (
    <div className="flex flex-col w-full ">
      <SamplingLetterDataTables data={data} />
    </div>
  )
}
