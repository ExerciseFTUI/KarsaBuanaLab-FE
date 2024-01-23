import { SamplingLetterDataTables } from "@/components/sampling/sampleListDataTables"
import { getProjectByDivision } from "@/lib/actions/sampling.actions"
import { Project } from "@/lib/models/project.model"

export default async function SamplingProject() {
  const res = await getProjectByDivision("sampling")
  let data: Project[] = res ? res.result : []

  return (
    <div className="flex flex-col w-full ">
      <SamplingLetterDataTables data={data} />
    </div>
  )
}
