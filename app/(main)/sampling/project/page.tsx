import { SamplingProjectDataTables } from "@/components/sampling/sampleListDataTables"
import getSessionServer from "@/lib/actions/getSessionServer"
import { getProjectByDivision } from "@/lib/actions/sampling.actions"
import { redirect } from "next/navigation"

export default async function SamplingProject() {
  const session = await getSessionServer()
  if (session?.user.role == "USER") redirect("/sampling/sample")

  const res = await getProjectByDivision("Sampling")

  const data = res ? (res as any).projects : []

  return (
    <div className="flex flex-col w-full ">
      <SamplingProjectDataTables data={data} />
    </div>
  )
}
