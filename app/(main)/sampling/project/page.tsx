import { SamplingProjectDataTables } from "@/components/sampling/sampleListDataTables"
import { getProjectByDivision } from "@/lib/actions/sampling.actions";
import { BaseApiResponse } from "@/lib/models/baseApiResponse.model";
import { Project } from "@/lib/models/project.model";

export default async function SamplingProject() {
  const res = await getProjectByDivision("sampling")
  
  const data = res ? res.result : []

  return (
    <div className="flex flex-col w-full ">
      <SamplingProjectDataTables data={data} />
    </div>
  )
}
