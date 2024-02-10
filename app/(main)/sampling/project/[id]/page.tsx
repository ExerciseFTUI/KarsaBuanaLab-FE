import Project from "@/components/sampling/projectDetail"
import getSessionServer from "@/lib/actions/getSessionServer"
import { getProject } from "@/lib/actions/marketing.actions"
import { getAllUser, getLinkFiles } from "@/lib/actions/sampling.actions"
import { User } from "@/lib/models/user.model"
import { SamplingRequestData } from "@/lib/type"
import { redirect } from "next/navigation"

export default async function SamplingProject({
  params,
}: {
  params: { id: string }
}) {
  const session = await getSessionServer()
  if (session?.user.role == "USER") redirect("/sampling/sample")

  const resProject = await getProject(params.id)
  const resFiles = await getLinkFiles(params.id)
  const resUser = await getAllUser("USER")

  const samplingUser = resUser.result.filter(
    (u) => u.division == null || u.division == "Sampling"
  )

  const data: SamplingRequestData = {
    project: resProject.result || null,
    user: samplingUser || [],
    files: resFiles.result || null,
  }

  return (
    <div className="border-t-light_brown border-t-2 pt-4 h-fit">
      <Project data={data} className="flex-wrap h-full" />
    </div>
  )
}
