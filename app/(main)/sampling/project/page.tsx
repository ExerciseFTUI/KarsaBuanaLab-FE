import { SamplingProjectDataTables } from "@/components/sampling/sampleListDataTables"
import { getSampleByYear } from "@/lib/actions/sampling.actions";

export default async function SamplingProject() {
  const res = await getSampleByYear("2023", "project")
  const data = res.result

  return (
    <div className="flex flex-col w-full ">
      <SamplingProjectDataTables data={data} />
    </div>
  )
}
