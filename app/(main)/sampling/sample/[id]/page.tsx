import ProjectDetail from "@/components/sampling/sampleDetails"
import getSessionServer from "@/lib/actions/getSessionServer"
import { getProject } from "@/lib/actions/marketing.actions"
import { getAllUser, getLinkFiles } from "@/lib/actions/sampling.actions"
import { User } from "@/lib/models/user.model"
import { SamplingRequestData } from "@/lib/type"

export default async function SamplingProject({
  params,
}: {
  params: { id: string }
}) {
  const resProject = await getProject(params.id)
  const resFiles = await getLinkFiles(params.id)
  const resUser = await getAllUser("USER")

  const session = await getSessionServer()

  const user = session?.user || ""
  const role = user ? user?.role.toUpperCase() : ""

  let samplingUser: User[] = []

  if (resProject.result.project_assigned_to.length)
    resUser.result.forEach((u: User) => {
      if (resProject.result.project_assigned_to.includes(u._id) == true)
        samplingUser.push(u)
    })

  const data: SamplingRequestData = {
    project: resProject.result || null,
    user: samplingUser || [],
    files: resFiles.result || null,
  }

  return (
    <div className="flex overflow-auto custom-scrollbar w-full border-t-light_brown border-t-2 py-4">
      <ProjectDetail role={role} data={data} />
    </div>
  )
}
